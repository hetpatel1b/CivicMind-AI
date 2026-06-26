import { createClient } from '@/lib/supabase-browser';
import { IssueComment, CreateCommentInput, CreateCommentResponse } from '@/types/comment';

function isValidUUID(value: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(value);
}

export interface GetCommentsOptions {
  page?: number;
  limit?: number;
}

/**
 * Retrieves paginated comments for a specific civic issue, including author details.
 * Ordered chronologically with the newest comments first.
 */
export async function getIssueComments(
  issueId: string,
  options?: GetCommentsOptions
): Promise<IssueComment[]> {
  if (!issueId || typeof issueId !== 'string' || issueId.trim() === '') {
    throw new Error('Validation Error: A valid issueId is required to fetch comments.');
  }

  if (!isValidUUID(issueId)) {
    throw new Error('Validation Error: The provided issueId is malformed.');
  }

  const supabase = createClient();
  const page = Math.max(1, options?.page || 1);
  const limit = Math.max(1, Math.min(100, options?.limit || 20));
  const offset = (page - 1) * limit;

  try {
    const { data, error } = await supabase
      .from('comments')
      .select(`
        id,
        issue_id,
        content,
        created_at,
        users!comments_user_id_fkey (
          id,
          full_name,
          avatar_url
        )
      `)
      .eq('issue_id', issueId)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('[Comments Service] Error fetching comments:', error.message);
      throw new Error('Failed to retrieve comments for this issue.');
    }

    interface CommentRowUser {
      id: string;
      full_name: string | null;
      avatar_url: string | null;
    }

    interface CommentRow {
      id: string;
      issue_id: string;
      user_id: string;
      content: string;
      created_at: string;
      users: CommentRowUser | CommentRowUser[];
    }

    const hydratedComments: IssueComment[] = (data as unknown as CommentRow[] || []).map((row: CommentRow) => {
      const authorData = Array.isArray(row.users) ? row.users[0] : row.users;
      return {
        id: row.id,
        issueId: row.issue_id,
        content: row.content,
        createdAt: row.created_at,
        author: {
          id: authorData?.id || 'unknown',
          fullName: authorData?.full_name || null,
          avatarUrl: authorData?.avatar_url || null,
        }
      };
    });

    return hydratedComments;
  } catch (err: unknown) {
    if (err instanceof Error) throw err;
    throw new Error('An unexpected system error occurred while fetching comments.');
  }
}

/**
 * Submits a new comment for a civic issue and securely saves it to the database.
 */
export async function createComment(input: CreateCommentInput): Promise<CreateCommentResponse> {
  if (!input) {
    return { success: false, error: 'Comment input is missing.' };
  }

  const { issueId, userId, content } = input;

  if (!issueId || !isValidUUID(issueId)) return { success: false, error: 'A valid issueId is required.' };
  if (!userId || !isValidUUID(userId)) return { success: false, error: 'A valid userId is required.' };
  if (typeof content !== 'string') return { success: false, error: 'Comment content must be text.' };

  const sanitizedContent = content.trim();
  if (sanitizedContent === '') return { success: false, error: 'Comment content cannot be empty.' };
  if (sanitizedContent.length > 5000) return { success: false, error: 'Comment is too long. Maximum allowed is 5000 characters.' };

  const supabase = createClient();

  try {
    const { data: newCommentData, error: insertError } = await supabase
      .from('comments')
      .insert({
        issue_id: issueId,
        user_id: userId,
        content: sanitizedContent
      })
      .select(`
        id,
        issue_id,
        content,
        created_at,
        users!comments_user_id_fkey (
          id,
          full_name,
          avatar_url
        )
      `)
      .single();

    if (insertError) {
      console.error('[Comments Service] Database insertion error:', insertError.message);
      return { success: false, error: 'Failed to save your comment. Please try again.' };
    }

    if (!newCommentData) {
      return { success: false, error: 'Comment was saved, but failed to return confirmation data.' };
    }

    const authorData = Array.isArray(newCommentData.users) ? newCommentData.users[0] : newCommentData.users;
    
    const newComment: IssueComment = {
      id: newCommentData.id,
      issueId: newCommentData.issue_id,
      content: newCommentData.content,
      createdAt: newCommentData.created_at,
      author: {
        id: authorData?.id || userId,
        fullName: authorData?.full_name || null,
        avatarUrl: authorData?.avatar_url || null,
      }
    };

    return { success: true, comment: newComment };
  } catch (err: unknown) {
    console.error('[Comments Service] Unexpected exception during creation:', err);
    return { success: false, error: 'An unexpected server error occurred while processing your comment.' };
  }
}
