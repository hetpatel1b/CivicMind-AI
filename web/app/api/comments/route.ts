import { NextResponse } from 'next/server';
import { getIssueComments, createComment } from '@/services/comments';
import { CreateCommentInput } from '@/types/comment';

/**
 * GET handler for retrieving all comments associated with a specific civic issue.
 * 
 * Expected Query Parameter:
 * ?issueId=string
 * 
 * @param request The incoming Next.js HTTP Request object
 * @returns A strictly typed NextResponse containing the comments or an error payload
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const issueId = searchParams.get('issueId');

    // 1. Perform strict input validation for the required query parameter
    if (!issueId || typeof issueId !== 'string' || issueId.trim() === '') {
      return NextResponse.json(
        { success: false, error: 'A valid issueId query parameter is required.' },
        { status: 400 }
      );
    }

    // 2. Delegate data fetching to the service layer
    const comments = await getIssueComments(issueId.trim());

    // 3. Return standard success payload
    return NextResponse.json({
      success: true,
      comments: comments,
    });
    
  } catch (error: unknown) {
    // 4. Safely handle unexpected system exceptions without leaking internals
    console.error('[Comments API GET] Unhandled exception:', error instanceof Error ? error.message : 'Unknown error');
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'An unexpected server error occurred while fetching comments.' 
      },
      { status: 500 }
    );
  }
}

/**
 * POST handler for creating a new comment on a civic issue.
 * 
 * Expected JSON payload:
 * {
 *   "issueId": "string",
 *   "userId": "string",
 *   "content": "string"
 * }
 * 
 * @param request The incoming Next.js HTTP Request object
 * @returns A strictly typed NextResponse containing the created comment or an error payload
 */
export async function POST(request: Request) {
  try {
    // 1. Defensively parse and extract the JSON payload
    let body: CreateCommentInput;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: 'Malformed JSON payload.' },
        { status: 400 }
      );
    }

    const { issueId, userId, content } = body;

    // 2. Perform strict input validation before touching any services
    if (!issueId || typeof issueId !== 'string' || issueId.trim() === '') {
      return NextResponse.json(
        { success: false, error: 'A valid issueId is required.' },
        { status: 400 }
      );
    }

    if (!userId || typeof userId !== 'string' || userId.trim() === '') {
      return NextResponse.json(
        { success: false, error: 'A valid userId is required.' },
        { status: 400 }
      );
    }

    if (!content || typeof content !== 'string' || content.trim() === '') {
      return NextResponse.json(
        { success: false, error: 'Comment content cannot be empty.' },
        { status: 400 }
      );
    }

    // 3. Delegate business logic execution to the service layer
    const result = await createComment({
      issueId: issueId.trim(),
      userId: userId.trim(),
      content: content.trim()
    });

    // 4. Handle logical failure from the service layer
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }

    // 5. Return standard success payload aligned with CreateCommentResponse type
    return NextResponse.json({
      success: true,
      comment: result.comment,
    });
    
  } catch (error: unknown) {
    // 6. Safely handle unexpected system exceptions without leaking internals
    console.error('[Comments API POST] Unhandled exception:', error instanceof Error ? error.message : 'Unknown error');
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'An unexpected server error occurred while creating the comment.' 
      },
      { status: 500 }
    );
  }
}
