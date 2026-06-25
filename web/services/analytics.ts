import { createClient } from '@/lib/supabase-browser';
import { 
  DashboardStatistics, 
  CategoryAnalytics, 
  SeverityAnalytics, 
  DailyAnalytics, 
  UserAnalytics, 
  AnalyticsSummary 
} from '@/types/analytics';

/**
 * Aggregates high-level platform statistics for the dashboard overview.
 * Executes concurrent COUNT queries to maximize performance.
 * 
 * @returns A fully populated DashboardStatistics object
 * @throws Error if database queries fail
 */
export async function getDashboardStatistics(): Promise<DashboardStatistics> {
  const supabase = createClient();

  try {
    // Execute multiple lightweight count queries concurrently to prevent waterfall delays
    const [
      { count: totalIssues },
      { count: pendingIssues },
      { count: verifiedIssues },
      { count: resolvedIssues },
      { count: rejectedIssues },
      { count: totalUsers },
      { count: totalSupports },
      { count: totalComments }
    ] = await Promise.all([
      supabase.from('issues').select('*', { count: 'exact', head: true }),
      supabase.from('issues').select('*', { count: 'exact', head: true }).eq('status', 'PENDING'),
      supabase.from('issues').select('*', { count: 'exact', head: true }).eq('status', 'VERIFIED'),
      supabase.from('issues').select('*', { count: 'exact', head: true }).eq('status', 'RESOLVED'),
      supabase.from('issues').select('*', { count: 'exact', head: true }).eq('status', 'REJECTED'),
      supabase.from('users').select('*', { count: 'exact', head: true }),
      supabase.from('verifications').select('*', { count: 'exact', head: true }).eq('verification_type', 'UPVOTE'),
      supabase.from('comments').select('*', { count: 'exact', head: true })
    ]);

    return {
      totalIssues: totalIssues || 0,
      pendingIssues: pendingIssues || 0,
      verifiedIssues: verifiedIssues || 0,
      resolvedIssues: resolvedIssues || 0,
      rejectedIssues: rejectedIssues || 0,
      totalUsers: totalUsers || 0,
      totalSupports: totalSupports || 0,
      totalComments: totalComments || 0
    };
  } catch (err: unknown) {
    console.error('[Analytics Service] Error fetching dashboard statistics:', err);
    throw new Error('Failed to load dashboard statistics.');
  }
}

/**
 * Calculates the distribution of civic issues across different categories.
 * 
 * @returns An array of CategoryAnalytics objects containing count and percentage
 * @throws Error if database queries fail
 */
export async function getCategoryAnalytics(): Promise<CategoryAnalytics[]> {
  const supabase = createClient();

  try {
    const { data, error } = await supabase.from('issues').select('category');
    
    if (error) throw error;

    const total = data?.length || 0;
    if (total === 0) return [];

    const counts: Record<string, number> = {};
    for (const issue of data || []) {
      const cat = issue.category || 'Uncategorized';
      counts[cat] = (counts[cat] || 0) + 1;
    }

    return Object.entries(counts)
      .map(([category, count]) => ({
        category,
        count,
        percentage: Number(((count / total) * 100).toFixed(1))
      }))
      .sort((a, b) => b.count - a.count);

  } catch (err: unknown) {
    console.error('[Analytics Service] Error fetching category analytics:', err);
    throw new Error('Failed to load category analytics.');
  }
}

/**
 * Calculates the distribution of civic issues based on their severity level.
 * 
 * @returns An array of SeverityAnalytics objects containing count and percentage
 * @throws Error if database queries fail
 */
export async function getSeverityAnalytics(): Promise<SeverityAnalytics[]> {
  const supabase = createClient();

  try {
    const { data, error } = await supabase.from('issues').select('severity');
    
    if (error) throw error;

    const total = data?.length || 0;
    if (total === 0) return [];

    const counts: Record<string, number> = {};
    for (const issue of data || []) {
      const sev = issue.severity || 'UNKNOWN';
      counts[sev] = (counts[sev] || 0) + 1;
    }

    return Object.entries(counts)
      .map(([severity, count]) => ({
        severity,
        count,
        percentage: Number(((count / total) * 100).toFixed(1))
      }))
      .sort((a, b) => b.count - a.count);

  } catch (err: unknown) {
    console.error('[Analytics Service] Error fetching severity analytics:', err);
    throw new Error('Failed to load severity analytics.');
  }
}

/**
 * Aggregates issue creation and resolution activity over time (daily).
 * 
 * @returns An array of DailyAnalytics objects sorted chronologically
 * @throws Error if database queries fail
 */
export async function getDailyAnalytics(): Promise<DailyAnalytics[]> {
  const supabase = createClient();

  try {
    const { data, error } = await supabase.from('issues').select('created_at, status');
    
    if (error) throw error;

    const dailyMap: Record<string, { reports: number; resolved: number }> = {};

    for (const issue of data || []) {
      if (!issue.created_at) continue;
      
      // Extract the YYYY-MM-DD portion of the timestamp securely
      const dateStr = new Date(issue.created_at).toISOString().split('T')[0];
      
      if (!dailyMap[dateStr]) {
        dailyMap[dateStr] = { reports: 0, resolved: 0 };
      }
      
      dailyMap[dateStr].reports += 1;
      
      if (issue.status === 'RESOLVED') {
        dailyMap[dateStr].resolved += 1;
      }
    }

    return Object.entries(dailyMap)
      .map(([date, stats]) => ({
        date,
        reports: stats.reports,
        resolved: stats.resolved
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  } catch (err: unknown) {
    console.error('[Analytics Service] Error fetching daily analytics:', err);
    throw new Error('Failed to load daily analytics.');
  }
}

/**
 * Identifies the top 10 most active and reputable users on the platform.
 * Relies on the reputation_events ledger to aggregate metrics without complex SQL.
 * 
 * @returns An array of UserAnalytics for the top 10 users by reputation
 * @throws Error if database queries fail
 */
export async function getTopUsers(): Promise<UserAnalytics[]> {
  const supabase = createClient();

  try {
    // Schema mismatch fix: 'reputation_events' does not exist.
    // Query the 'users' table which contains 'reputation_points' instead.
    const { data: topUsers, error } = await supabase
      .from('users')
      .select('id, full_name, reputation_points')
      .order('reputation_points', { ascending: false })
      .limit(10);
      
    if (error) throw error;

    if (!topUsers || topUsers.length === 0) return [];

    const topUserIds = topUsers.map((u: { id: string }) => u.id);

    // Concurrently fetch counts from actual tables
    const [
      { data: issuesData },
      { data: verificationsData },
      { data: commentsData }
    ] = await Promise.all([
      supabase.from('issues').select('user_id').in('user_id', topUserIds),
      supabase.from('verifications').select('user_id').in('user_id', topUserIds).eq('verification_type', 'UPVOTE'),
      supabase.from('comments').select('user_id').in('user_id', topUserIds)
    ]);

    return topUsers.map((user: { id: string; full_name: string | null; reputation_points: number | null }) => {
      const reports = (issuesData || []).filter((i: { user_id: string }) => i.user_id === user.id).length;
      const supports = (verificationsData || []).filter((v: { user_id: string }) => v.user_id === user.id).length;
      const comments = (commentsData || []).filter((c: { user_id: string }) => c.user_id === user.id).length;

      return {
        userId: user.id,
        fullName: user.full_name || null,
        reports,
        supports,
        comments,
        reputationPoints: user.reputation_points || 0
      };
    });

  } catch (err: unknown) {
    console.error('[Analytics Service] Error fetching top users:', err);
    throw new Error('Failed to load top users analytics.');
  }
}

/**
 * Orchestrates a complete summary generation by calling all internal analytical functions.
 * Designed to power the main Admin Dashboard view with a single payload.
 * 
 * @returns A fully populated AnalyticsSummary object
 * @throws Error if any underlying data fetches fail
 */
export async function getAnalyticsSummary(): Promise<AnalyticsSummary> {
  try {
    // Execute all distinct analytical domains concurrently to minimize load time
    const [dashboard, categories, severity, daily, topUsers] = await Promise.all([
      getDashboardStatistics(),
      getCategoryAnalytics(),
      getSeverityAnalytics(),
      getDailyAnalytics(),
      getTopUsers()
    ]);

    return {
      dashboard,
      categories,
      severity,
      daily,
      topUsers
    };
  } catch (err: unknown) {
    console.error('[Analytics Service] Error generating analytics summary:', err);
    throw new Error('Failed to generate complete analytics summary.');
  }
}
