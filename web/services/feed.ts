import { createClient } from '@/lib/supabase-browser';

export interface FeedFilters {
  limit?: number;
  page?: number;
  category?: string;
  severity?: string;
}

export interface IssueFeedItem {
  id: string;
  title: string;
  description: string;
  category: string;
  severity: string;
  status: string;
  created_at: string;
  image_url: string | null;
  user_id: string;
}

/**
 * Fetches community issues from the Supabase database.
 * Supports pagination, category filtering, and severity filtering.
 * Joins the issue_images table to retrieve the primary public image URL.
 * Strictly uses the correct issues.user_id schema relation.
 * 
 * @param filters Optional filtering and pagination constraints
 * @returns Array of IssueFeedItem objects ordered by latest first
 */
export async function getFeedIssues(filters?: FeedFilters): Promise<IssueFeedItem[]> {
  const supabase = createClient();
  
  // Set default pagination values
  const limit = filters?.limit || 20;
  const page = filters?.page || 1;
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  // Construct the query with a foreign key join to fetch the associated image.
  // We use user_id to correctly map the user relationship via users(id).
  let query = supabase
    .from('issues')
    .select(`
      id,
      title,
      description,
      category,
      severity,
      status,
      created_at,
      user_id,
      users(id),
      issue_images (
        image_url
      )
    `)
    .order('created_at', { ascending: false })
    .range(from, to);

  // Apply conditional filters
  if (filters?.category) {
    query = query.eq('category', filters.category);
  }

  if (filters?.severity) {
    query = query.eq('severity', filters.severity);
  }

  // Execute the query
  const { data, error } = await query;

  // Handle database retrieval errors
  if (error) {
    console.error('[Feed Service] Failed to fetch issues:', error.message);
    throw new Error(`Database Error: Could not fetch the community feed. ${error.message}`);
  }

  // Transform and map the relational data to the flat IssueFeedItem interface
   
  return (data || []).map((issue: any /* eslint-disable-line @typescript-eslint/no-explicit-any */) => {
    // Safely extract the image URL. Depending on the relationship setup (one-to-one vs one-to-many),
    // Supabase might return an object or an array. This handles both securely.
    let imageUrl = null;
    if (issue.issue_images) {
      if (Array.isArray(issue.issue_images) && issue.issue_images.length > 0) {
        imageUrl = issue.issue_images[0].image_url;
      } else if (!Array.isArray(issue.issue_images) && issue.issue_images.image_url) {
        imageUrl = issue.issue_images.image_url;
      }
    }

    return {
      id: issue.id,
      title: issue.title,
      description: issue.description,
      category: issue.category,
      severity: issue.severity,
      status: issue.status,
      created_at: issue.created_at,
      image_url: imageUrl,
      user_id: issue.user_id, 
    };
  });
}
