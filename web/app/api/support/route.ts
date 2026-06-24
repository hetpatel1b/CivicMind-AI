import { NextResponse } from 'next/server';
import { toggleSupport } from '@/services/support';

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
    // 1. Defensively parse and extract the JSON payload
    let body: ToggleSupportRequestPayload;
    try {
      body = await request.json();
    } catch (parseError) {
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
    console.error('[Support API] Unhandled exception:', error instanceof Error ? error.message : 'Unknown error');
    
    const errorMessage = error instanceof Error ? error.message : 'An unexpected server error occurred.';
    
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 } // Or 400 depending on the error thrown by service, but default to 500
    );
  }
}
