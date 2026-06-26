import { NextResponse } from 'next/server';
import { toggleSupport } from '@/services/support';
import { getAuthContext } from '@/services/auth';
import { logger } from '@/lib/logger';

/**
 * Expected JSON payload structure for the support API endpoint.
 */
interface ToggleSupportRequestPayload {
  issueId?: string;
  userId?: string;
}

/**
 * POST handler for toggling user support on a civic issue.
 * Operates as a secure bridge between the client application and the backend service layer.
 * 
 * Expected payload:
 * {
 *   "issueId": "string",
 *   "userId": "string"
 * }
 * 
 * @param request The incoming Next.js HTTP Request object
 * @returns A strictly typed NextResponse containing the mutation result or a defensive error payload
 */
export async function POST(request: Request) {
  try {
    const authCtx = await getAuthContext();
    if (!authCtx.isAuthenticated || !authCtx.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized', message: 'You must be logged in to support an issue.' },
        { status: 401 }
      );
    }

    // 1. Defensively parse and extract the JSON payload
    let body: ToggleSupportRequestPayload;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: 'Malformed JSON payload.' },
        { status: 400 }
      );
    }

    const { issueId, userId } = body;

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

    if (userId.trim() !== authCtx.user.id) {
      return NextResponse.json(
        { success: false, error: 'Forbidden', message: 'You can only support issues using your own account.' },
        { status: 403 }
      );
    }

    // 3. Delegate business logic execution to the service layer
    const result = await toggleSupport(issueId.trim(), userId.trim());

    // 4. Return standard success payload aligned with ToggleSupportResponse type
    return NextResponse.json({
      success: true,
      totalSupports: result.totalSupports,
      userHasSupported: result.userHasSupported,
    });
    
  } catch (error: unknown) {
    // 5. Safely handle unexpected system exceptions without leaking internals
    logger.error({
      category: 'SYSTEM',
      message: '[Support API] Unhandled exception',
      error
    });
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal Server Error',
        message: 'An unexpected server error occurred while processing the support action.' 
      },
      { status: 500 }
    );
  }
}
