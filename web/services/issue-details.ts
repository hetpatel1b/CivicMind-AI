import { createClient } from '@/lib/supabase-browser';

export interface ReporterInfo {
  id: string;
  full_name: string | null;
  email: string | null;
  avatar_url: string | null;
}

export interface IssueImageInfo {
  id: string;
  image_url: string;
  is_ai_analyzed: boolean;
}

export interface IssueDetail {
  id: string;
  title: string;
  description: string | null;
  category: string;
  severity: string;
  status: string;
  latitude: number;
  longitude: number;
  location_name: string | null;
  ai_confidence_score: number | null;
  upvotes_count: number;
  created_at: string;
  updated_at: string;
  reporter: ReporterInfo | null;
  images: IssueImageInfo[];
}

/**
 * Validates if a given string is a valid UUID v4.
 * Prevents Supabase database errors when invalid IDs (like "test") are passed.
 * 
 * @param value The string to validate
 * @returns boolean indicating if it's a valid UUID
 */
function isValidUUID(value: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(value);
}

/**
 * Fetches comprehensive details for a single issue.
 * Joins the users table for reporter information and issue_images for associated photos.
 * 
 * @param issueId The UUID of the issue to fetch
 * @returns A strictly typed IssueDetail object or null if not found
 */
export async function getIssueDetails(issueId: string): Promise<IssueDetail | null> {
  const supabase = createClient();

  if (!issueId) {
    throw new Error('Validation Error: Issue ID is required to fetch details.');
  }

  // Prevent invalid syntax database errors before querying
  if (!isValidUUID(issueId)) {
    return null;
  }

  // Perform a single, efficient query joining the required tables
  const { data, error } = await supabase
    .from('issues')
    .select(`
      id,
      title,
      description,
      category,
      severity,
      status,
      latitude,
      longitude,
      location_name,
      ai_confidence_score,
      upvotes_count,
      created_at,
      updated_at,
      users (
        id,
        full_name,
        avatar_url
      ),
      issue_images (
        id,
        image_url,
        is_ai_analyzed
      )
    `)
    .eq('id', issueId)
    .single();

  if (error) {
    // Supabase raises an error if no rows are found with .single() 
    // PGRST116 indicates 0 rows returned
    if (error.code === 'PGRST116') {
      return null;
    }
    console.error('[Issue Details Service] Error fetching issue:', error.message);
    throw new Error(`Database Error: Could not fetch issue details. ${error.message}`);
  }

  if (!data) {
    return null;
  }

  // Safely map the reporter data, gracefully handling one-to-one or one-to-many relationship structures
  let reporterData: ReporterInfo | null = null;
  if (data.users) {
    if (Array.isArray(data.users)) {
      reporterData = data.users.length > 0 ? (data.users[0] as ReporterInfo) : null;
    } else {
      reporterData = data.users as unknown as ReporterInfo;
    }
  }

  // Safely map the image data
  let imagesData: IssueImageInfo[] = [];
  if (data.issue_images) {
    if (Array.isArray(data.issue_images)) {
      imagesData = data.issue_images as IssueImageInfo[];
    } else {
      imagesData = [data.issue_images as unknown as IssueImageInfo];
    }
  }

  return {
    id: data.id,
    title: data.title,
    description: data.description,
    category: data.category,
    severity: data.severity,
    status: data.status,
    latitude: data.latitude,
    longitude: data.longitude,
    location_name: data.location_name,
    ai_confidence_score: data.ai_confidence_score,
    upvotes_count: data.upvotes_count,
    created_at: data.created_at,
    updated_at: data.updated_at,
    reporter: reporterData,
    images: imagesData,
  };
}
