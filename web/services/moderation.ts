import { createAdminClient } from '@/lib/admin/supabase-admin';
import { awardReputation } from '@/services/gamification';
import { createNotification } from '@/services/notifications-server';
import { 
  IssueModeration, 
  ModerationAction, 
  ModerationStatus, 
  ModerationRecord, 
  ModerationHistory, 
  ModerationSummary 
} from '@/types/moderation';

export interface GetPendingIssuesOptions {
  page?: number;
  limit?: number;
}

/**
 * Retrieves a paginated list of all issues currently awaiting administrative review.
 * 
 * @returns An array of IssueModeration objects sorted by newest first
 * @throws Error if the database query fails
 */
export async function getPendingIssues(options?: GetPendingIssuesOptions): Promise<{ issues: IssueModeration[], count: number }> {
  const supabase = await createAdminClient();

  const page = Math.max(1, options?.page || 1);
  const limit = Math.max(1, Math.min(100, options?.limit || 20));
  const offset = (page - 1) * limit;

  try {
    const { data, count, error } = await supabase
      .from('issues')
      .select('id, title, category, severity, status, created_at', { count: 'exact' })
      .eq('status', 'Reported')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('[Moderation Service] Error fetching pending issues:', error.message);
      throw new Error('Failed to retrieve pending issues.');
    }

    const issues = (data || []).map((row: { id: string; title: string; category: string; severity: string; status: string; created_at: string }) => ({
      issueId: row.id,
      title: row.title,
      category: row.category,
      severity: row.severity,
      status: (row.status === 'Reported' ? 'PENDING' : 
               row.status === 'Verified' ? 'VERIFIED' :
               row.status === 'Resolved' ? 'RESOLVED' :
               row.status === 'Rejected' ? 'REJECTED' : row.status.toUpperCase()) as ModerationStatus,
      reportedAt: row.created_at
    }));

    return { issues, count: count || 0 };
  } catch (err: unknown) {
    console.error('[Moderation Service] Unexpected error in getPendingIssues:', err);
    throw new Error('An unexpected error occurred while fetching pending issues.');
  }
}

/**
 * Executes a moderation action against a specific issue, updating its status
 * and securely logging the action to the audit history table.
 * 
 * @param issueId The ID of the issue being moderated
 * @param adminId The ID of the administrator performing the action
 * @param action The specific moderation action to apply
 * @param newStatus The resulting status of the issue
 * @param notes Optional context for the action
 * @returns boolean indicating success
 */
async function performModerationAction(
  issueId: string,
  adminId: string,
  action: ModerationAction,
  newStatus: ModerationStatus,
  notes?: string
): Promise<boolean> {
  if (!issueId || !adminId) {
    throw new Error('Missing required identifiers for moderation action.');
  }

  const supabase = await createAdminClient();

  try {
    // 1. Update the authoritative issue status
    const { error: updateError, data: updatedIssue } = await supabase
      .from('issues')
      .update({ status: newStatus })
      .eq('id', issueId)
      .select('user_id')
      .single();

    if (updateError) {
      console.error(`[Moderation Service] Error updating issue status to ${newStatus}:`, updateError.message);
      return false;
    }

    // 2. Append to the immutable moderation history ledger
    const { error: logError } = await supabase
      .from('moderation_history')
      .insert({
        issue_id: issueId,
        admin_id: adminId,
        action: action,
        status: newStatus,
        notes: notes || null
      });

    if (logError) {
      // We log the error but don't fail the overall operation if only the audit log fails,
      // though in a stricter financial system we would use an RPC transaction here.
      console.error('[Moderation Service] Error writing to moderation history:', logError.message);
    }

    if (updatedIssue?.user_id) {
      if (newStatus === 'VERIFIED') {
        awardReputation(updatedIssue.user_id, 'ISSUE_VERIFIED').catch(e => console.error(e));
        createNotification(updatedIssue.user_id, 'ISSUE_VERIFIED', `Your issue has been verified by the administration.`).catch(e => console.error(e));
      } else if (newStatus === 'RESOLVED') {
        awardReputation(updatedIssue.user_id, 'ISSUE_RESOLVED').catch(e => console.error(e));
        createNotification(updatedIssue.user_id, 'ISSUE_RESOLVED', `Your issue has been successfully resolved!`).catch(e => console.error(e));
      } else if (newStatus === 'REJECTED') {
        createNotification(updatedIssue.user_id, 'ISSUE_REJECTED', `Your issue was rejected. Reason: ${notes || 'Not specified'}`).catch(e => console.error(e));
      }
    }

    return true;
  } catch (err: unknown) {
    console.error('[Moderation Service] Unexpected error performing moderation action:', err);
    return false;
  }
}

/**
 * Transitions an issue from PENDING to VERIFIED, confirming its validity.
 * 
 * @param issueId The ID of the issue being verified
 * @param adminId The ID of the administrator performing the verification
 * @param notes Optional verification context
 * @returns boolean indicating success
 */
export async function verifyIssue(issueId: string, adminId: string, notes?: string): Promise<boolean> {
  return performModerationAction(issueId, adminId, 'VERIFY', 'VERIFIED', notes);
}

/**
 * Transitions an issue to RESOLVED, indicating the underlying problem has been fixed.
 * 
 * @param issueId The ID of the issue being resolved
 * @param adminId The ID of the administrator performing the resolution
 * @param notes Optional resolution context or proof
 * @returns boolean indicating success
 */
export async function resolveIssue(issueId: string, adminId: string, notes?: string): Promise<boolean> {
  return performModerationAction(issueId, adminId, 'RESOLVE', 'RESOLVED', notes);
}

/**
 * Transitions an issue to REJECTED, indicating it is invalid or Unaionable.
 * 
 * @param issueId The ID of the issue being rejected
 * @param adminId The ID of the administrator performing the rejection
 * @param notes Optional rejection reasoning
 * @returns boolean indicating success
 */
export async function rejectIssue(issueId: string, adminId: string, notes?: string): Promise<boolean> {
  return performModerationAction(issueId, adminId, 'REJECT', 'REJECTED', notes);
}

/**
 * Assigns an issue to a department with priority and ETA, logging it in history.
 */
export async function assignIssue(
  issueId: string, 
  adminId: string, 
  department: string, 
  officer: string,
  priority: string,
  eta: string
): Promise<boolean> {
  const supabase = await createAdminClient();

  try {
    // 1. Update the authoritative issue status and department
    const { error: updateError, data: updatedIssue } = await supabase
      .from('issues')
      .update({ 
        department: department,
        officer: officer,
        priority: priority,
        assigned_at: new Date().toISOString(),
        status: 'IN_PROGRESS' 
      })
      .eq('id', issueId)
      .select('user_id')
      .single();

    if (updateError) {
      console.error(`[Moderation Service] Error assigning issue to ${department}:`, updateError.message);
      return false;
    }

    // 2. Append to the immutable moderation history ledger with assignment details in notes
    const assignmentDetails = JSON.stringify({ department, officer, priority, eta });
    const { error: logError } = await supabase
      .from('moderation_history')
      .insert({
        issue_id: issueId,
        admin_id: adminId,
        action: 'ASSIGN',
        status: 'IN_PROGRESS',
        notes: assignmentDetails
      });

    if (logError) {
      console.error('[Moderation Service] Error writing to moderation history:', logError.message);
    }

    if (updatedIssue?.user_id) {
      createNotification(updatedIssue.user_id, 'ISSUE_ASSIGNED', `Your issue has been assigned to ${department} (Officer: ${officer}). Priority: ${priority}.`).catch(e => console.error(e));
    }

    return true;
  } catch (err: unknown) {
    console.error('[Moderation Service] Unexpected error performing assignment:', err);
    return false;
  }
}

/**
 * Retrieves the complete chronological audit trail of administrative actions
 * performed on a specific civic issue.
 * 
 * @param issueId The ID of the issue to query
 * @returns ModerationHistory containing all historical records
 * @throws Error if the database query fails
 */
export async function getModerationHistory(issueId: string): Promise<ModerationHistory> {
  if (!issueId) {
    throw new Error('Issue ID is required to fetch moderation history.');
  }

  const supabase = await createAdminClient();

  try {
    const { data, error } = await supabase
      .from('moderation_history')
      .select('id, issue_id, admin_id, action, status, notes, created_at')
      .eq('issue_id', issueId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('[Moderation Service] Error fetching moderation history:', error.message);
      throw new Error('Failed to retrieve moderation history.');
    }

    const records: ModerationRecord[] = (data || []).map((row: { id: string; issue_id: string; admin_id: string; action: string; status: string; notes: string | null; created_at: string }) => ({
      id: row.id,
      issueId: row.issue_id,
      adminId: row.admin_id,
      action: row.action as ModerationAction,
      status: (row.status === 'Reported' ? 'PENDING' : 
               row.status === 'Verified' ? 'VERIFIED' :
               row.status === 'Resolved' ? 'RESOLVED' :
               row.status === 'Rejected' ? 'REJECTED' : row.status.toUpperCase()) as ModerationStatus,
      notes: row.notes,
      createdAt: row.created_at
    }));

    return {
      issueId,
      records
    };
  } catch (err: unknown) {
    console.error('[Moderation Service] Unexpected error fetching moderation history:', err);
    throw new Error('An unexpected error occurred while fetching moderation history.');
  }
}

/**
 * Calculates a high-level statistical overview of the current moderation workload.
 * Executes concurrent COUNT queries for optimal performance.
 * 
 * @returns ModerationSummary detailing counts for all issue statuses
 * @throws Error if the database queries fail
 */
export async function getModerationSummary(): Promise<ModerationSummary> {
  const supabase = await createAdminClient();

  try {
    // Execute multiple lightweight count queries concurrently to prevent waterfall delays
    const [
      { count: pending },
      { count: verified },
      { count: resolved },
      { count: rejected }
    ] = await Promise.all([
      supabase.from('issues').select('*', { count: 'exact', head: true }).eq('status', 'Reported'),
      supabase.from('issues').select('*', { count: 'exact', head: true }).eq('status', 'Verified'),
      supabase.from('issues').select('*', { count: 'exact', head: true }).eq('status', 'Resolved'),
      supabase.from('issues').select('*', { count: 'exact', head: true }).eq('status', 'Rejected')
    ]);

    return {
      pending: pending || 0,
      verified: verified || 0,
      resolved: resolved || 0,
      rejected: rejected || 0
    };
  } catch (err: unknown) {
    console.error('[Moderation Service] Error fetching moderation summary:', err);
    throw new Error('Failed to generate moderation summary.');
  }
}
