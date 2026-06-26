import { NextResponse } from 'next/server';
import { getIssueComments, createComment } from '@/services/comments';
import { getAuthContext } from '@/services/auth';
import { getCommentsQuerySchema, createCommentSchema, formatZodError } from '@/lib/validations';
import { logger } from '@/lib/logger';

/**
 * GET handler for retrieving all comments associated with a specific civic issue.
 * 
 * Expected Query Parameter:
 * ?issueId=string
 * ?page=1
 * ?limit=20
 * 
 * @param request The incoming Next.js HTTP Request object
 * @returns A strictly typed NextResponse containing the comments or an error payload
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const queryParams = Object.fromEntries(searchParams.entries());
    const validationResult = getCommentsQuerySchema.safeParse(queryParams);

    if (!validationResult.success) {
      return NextResponse.json(
        { success: false, error: 'Bad Request', message: formatZodError(validationResult.error) },
        { status: 400 }
      );
    }

    const { issueId, page, limit } = validationResult.data;

    // 2. Delegate data fetching to the service layer
    const result = await getIssueComments(issueId, { page, limit });

    // 3. Return standard success payload
    return NextResponse.json({
      success: true,
      data: {
        pagination: {
          page,
          limit,
          total: result.length
        },
        comments: result
      }
    });
    
  } catch (error: unknown) {
    // 4. Safely handle unexpected system exceptions without leaking internals
    logger.error({
      category: 'SYSTEM',
      message: '[Comments API GET] Unhandled exception',
      error
    });
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal Server Error',
        message: 'An unexpected server error occurred while retrieving comments.' 
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
 */
export async function POST(request: Request) {
  try {
    const authCtx = await getAuthContext();
    if (!authCtx.isAuthenticated || !authCtx.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized', message: 'You must be logged in to post a comment.' },
        { status: 401 }
      );
    }

    // 1. Defensively parse and extract the JSON payload
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: 'Bad Request', message: 'Malformed JSON payload.' },
        { status: 400 }
      );
    }

    // 2. Perform strict input validation before touching any services using Zod
    const validationResult = createCommentSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { success: false, error: 'Bad Request', message: formatZodError(validationResult.error) },
        { status: 400 }
      );
    }

    if (validationResult.data.userId !== authCtx.user.id) {
      return NextResponse.json(
        { success: false, error: 'Forbidden', message: 'You can only post comments using your own account.' },
        { status: 403 }
      );
    }

    // 3. Delegate business logic execution to the service layer
    const result = await createComment(validationResult.data);

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
    logger.error({
      category: 'SYSTEM',
      message: '[Comments API POST] Unhandled exception',
      error
    });
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal Server Error',
        message: 'An unexpected server error occurred while saving the comment.' 
      },
      { status: 500 }
    );
  }
}
