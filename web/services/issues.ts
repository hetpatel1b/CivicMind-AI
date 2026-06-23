import { createClient } from '@/lib/supabase-browser';

export interface CreateIssueInput {
  title: string;
  description: string;
  category: string;
  severity: string;
  department: string;
  imageUrl: string;
  userId: string;
}

/**
 * Handles the secure database persistence layer for CivicMind AI issues.
 * Inserts the core issue and then links the public image URL.
 * 
 * @param input The strictly validated CreateIssueInput payload
 * @returns An object containing the generated issueId
 */
export async function createIssue(input: CreateIssueInput): Promise<{ issueId: string }> {
  // 1. Initialize Supabase Client
  const supabase = createClient();

  // 2. Validate required fields
  if (
    !input.title || 
    !input.description || 
    !input.category || 
    !input.severity || 
    !input.department || 
    !input.imageUrl || 
    !input.userId
  ) {
    throw new Error('Validation Error: All fields are required to create an issue.');
  }

  // 3. Insert into the 'issues' table
  // Note: We use the exact keys requested. Depending on the SQL schema version, 
  // 'created_by' might map to 'user_id', and 'department' might require an ALTER TABLE.
  const { data: issueData, error: issueError } = await supabase
    .from('issues')
    .insert({
      title: input.title,
      description: input.description,
      category: input.category,
      severity: input.severity,
      department: input.department,
      created_by: input.userId,
    })
    .select('id')
    .single();

  // 4. Handle issue creation database errors
  if (issueError) {
    console.error('[Database Service] Failed to create issue:', issueError.message);
    throw new Error(`Database Error: Could not save the issue. ${issueError.message}`);
  }

  if (!issueData?.id) {
    throw new Error('Database Error: Issue was successfully created but no ID was returned.');
  }

  const issueId = issueData.id;

  // 5. Save the image into 'issue_images' linked to the new issue
  const { error: imageError } = await supabase
    .from('issue_images')
    .insert({
      issue_id: issueId,
      image_url: input.imageUrl,
      is_ai_analyzed: true,
    });

  // 6. Handle image linking errors
  if (imageError) {
    console.error('[Database Service] Failed to link issue image:', imageError.message);
    // In a strict production system, we might rollback the issue creation here.
    throw new Error(`Database Error: Issue was saved, but failed to link the image. ${imageError.message}`);
  }

  // 7. Return the confirmed issueId
  return {
    issueId,
  };
}
