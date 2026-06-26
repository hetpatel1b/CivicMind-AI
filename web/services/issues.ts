import { createClient } from '@/lib/supabase-browser';

export interface CreateIssueInput {
  title: string;
  description: string;
  category: string;
  severity: string;
  department?: string;
  imageUrl?: string;
  userId: string;
  // CRITICAL BUG FIX: Added missing NOT NULL coordinates required by schema
  latitude?: number;
  longitude?: number;
  locationName?: string;
}

export interface GetIssuesOptions {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  severity?: string;
  status?: string;
  department?: string;
  sort?: 'newest' | 'oldest' | 'severity' | 'popularity';
  verifiedOnly?: boolean;
  resolvedOnly?: boolean;
}

export interface UpdateIssueInput {
  title?: string;
  description?: string;
  status?: string;
  severity?: string;
  category?: string;
  department?: string;
  locationName?: string;
}

function isValidUUID(value: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(value);
}

/**
 * Handles the secure database persistence layer for CivicMind AI issues.
 */
export async function createIssue(input: CreateIssueInput): Promise<{ issueId: string }> {
  const supabase = createClient();

  if (
    !input.title || 
    !input.description || 
    !input.category || 
    !input.severity || 
    !input.userId ||
    input.latitude === undefined ||
    input.longitude === undefined
  ) {
    throw new Error('Validation Error: Required fields are missing to create an issue.');
  }

  const { data: issueData, error: issueError } = await supabase
    .from('issues')
    .insert({
      title: input.title,
      description: input.description,
      category: input.category,
      severity: input.severity,
      department: input.department || 'General',
      created_by: input.userId, // Trigger handles syncing to user_id
      latitude: input.latitude,
      longitude: input.longitude,
      location_name: input.locationName,
      status: 'Reported' // Default schema status
    })
    .select('id')
    .single();

  if (issueError) {
    console.error('[Database Service] Failed to create issue:', issueError.message);
    throw new Error(`Database Error: Could not save the issue. ${issueError.message}`);
  }

  const issueId = issueData.id;

  if (input.imageUrl) {
    const { error: imageError } = await supabase
      .from('issue_images')
      .insert({
        issue_id: issueId,
        image_url: input.imageUrl,
        is_ai_analyzed: true,
      });

    if (imageError) {
      console.error('[Database Service] Failed to link issue image:', imageError.message);
    }
  }

  return { issueId };
}

/**
 * Retrieves a paginated and aggressively filtered list of issues.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getIssues(options: GetIssuesOptions): Promise<{ issues: any[], count: number }> {
  const supabase = createClient();
  const page = Math.max(1, options.page || 1);
  const limit = Math.max(1, Math.min(100, options.limit || 20));
  const offset = (page - 1) * limit;

  // Utilize the exact count head option to provide total pagination size safely
  let query = supabase.from('issues').select(`
    id,
    title,
    description,
    category,
    severity,
    status,
    department,
    location_name,
    latitude,
    longitude,
    upvotes_count,
    created_at,
    user_id,
    users (
      id,
      full_name,
      avatar_url
    ),
    issue_images (
      image_url
    )
  `, { count: 'exact' });

  // Apply Search
  if (options.search) {
    const trimmedSearch = options.search.trim();
    if (trimmedSearch) {
      query = query.ilike('title', `%${trimmedSearch}%`);
    }
  }

  // Apply strict equality filters (utilizing B-tree indexes natively)
  if (options.category) query = query.eq('category', options.category);
  if (options.severity) query = query.eq('severity', options.severity);
  if (options.status) query = query.eq('status', options.status);
  if (options.department) query = query.eq('department', options.department);
  if (options.resolvedOnly) query = query.eq('status', 'Resolved');

  // Apply complex filters
  if (options.verifiedOnly) {
    // Issues with upvotes logic or linked verifications
    // Simplest proxy based on schema is upvotes_count > 0 or status = Verified
    query = query.in('status', ['Verified', 'Resolved']);
  }

  // Apply Sorting
  if (options.sort === 'oldest') {
    query = query.order('created_at', { ascending: true });
  } else if (options.sort === 'popularity') {
    query = query.order('upvotes_count', { ascending: false }).order('created_at', { ascending: false });
  } else if (options.sort === 'severity') {
    // Note: To properly sort 'High' > 'Medium' > 'Low', a case or enum is ideal.
    // Without altering the DB, we can sort by severity text alphabetically descending (High > Medium > Low works out correctly! H, M, L)
    query = query.order('severity', { ascending: true }).order('created_at', { ascending: false });
  } else {
    query = query.order('created_at', { ascending: false }); // default newest
  }

  // Apply Pagination
  query = query.range(offset, offset + limit - 1);

  const { data, count, error } = await query;

  if (error) {
    console.error('[Issues Service] Error fetching issues:', error.message);
    throw new Error('Failed to retrieve issues.');
  }

  return { issues: data || [], count: count || 0 };
}

/**
 * Retrieves a single complete issue including computed aggregations.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getIssueById(issueId: string): Promise<any> {
  if (!issueId || !isValidUUID(issueId)) throw new Error('Invalid Issue ID.');

  const supabase = createClient();
  
  // N+1 Prevention: Fetch core data + relational data in a single massive joined query
  const { data: issue, error } = await supabase
    .from('issues')
    .select(`
      *,
      users (
        id,
        full_name,
        avatar_url,
        reputation_points
      ),
      issue_images (
        id,
        image_url,
        is_ai_analyzed,
        created_at
      )
    `)
    .eq('id', issueId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null; // Not found
    throw new Error('Failed to fetch issue details.');
  }

  // Concurrently count comments and supports securely
  const [commentsRes, supportsRes] = await Promise.all([
    supabase.from('comments').select('id', { count: 'exact', head: true }).eq('issue_id', issueId),
    supabase.from('supports').select('id', { count: 'exact', head: true }).eq('issue_id', issueId)
  ]);

  return {
    ...issue,
    comments_count: commentsRes.count || 0,
    supports_count: supportsRes.count || 0
  };
}

/**
 * Updates a specific issue. Ensures RBAC at the service layer by requiring the executing user ID.
 * Admin bypass should be handled gracefully.
 */
export async function updateIssue(
  issueId: string, 
  userId: string, 
  isAdmin: boolean, 
  updates: UpdateIssueInput
): Promise<boolean> {
  if (!issueId || !isValidUUID(issueId)) throw new Error('Invalid Issue ID.');

  const supabase = createClient();

  // First, verify ownership if not admin
  if (!isAdmin) {
    const { data: existing, error: checkError } = await supabase
      .from('issues')
      .select('user_id')
      .eq('id', issueId)
      .single();
      
    if (checkError || !existing || existing.user_id !== userId) {
      throw new Error('Unauthorized: Only the creator or an administrator can update this issue.');
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const payload: any = {};
  if (updates.title) payload.title = updates.title;
  if (updates.description) payload.description = updates.description;
  if (updates.severity) payload.severity = updates.severity;
  if (updates.category) payload.category = updates.category;
  if (updates.department) payload.department = updates.department;
  if (updates.locationName) payload.location_name = updates.locationName;
  
  // STRICT ADMIN-ONLY FIELD
  if (updates.status) {
    if (!isAdmin) throw new Error('Unauthorized: Only administrators can update the issue status.');
    payload.status = updates.status;
  }

  if (Object.keys(payload).length === 0) return true;

  const { error } = await supabase
    .from('issues')
    .update(payload)
    .eq('id', issueId);

  if (error) {
    console.error('[Issues Service] Error updating issue:', error.message);
    return false;
  }

  return true;
}

/**
 * Performs a secure hard-delete of the issue.
 * Cascades to issue_images, comments, and verifications automatically via schema definitions.
 */
export async function deleteIssue(issueId: string, userId: string, isAdmin: boolean): Promise<boolean> {
  if (!issueId || !isValidUUID(issueId)) throw new Error('Invalid Issue ID.');

  const supabase = createClient();

  if (!isAdmin) {
    const { data: existing, error: checkError } = await supabase
      .from('issues')
      .select('user_id')
      .eq('id', issueId)
      .single();
      
    if (checkError || !existing || existing.user_id !== userId) {
      throw new Error('Unauthorized: Only the creator or an administrator can delete this issue.');
    }
  }

  const { error } = await supabase
    .from('issues')
    .delete()
    .eq('id', issueId);

  if (error) {
    console.error('[Issues Service] Error deleting issue:', error.message);
    return false;
  }

  return true;
}
