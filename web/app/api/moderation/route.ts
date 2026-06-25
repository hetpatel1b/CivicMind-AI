import { NextResponse } from 'next/server';
import { 
  getPendingIssues, 
  verifyIssue, 
  resolveIssue, 
  rejectIssue, 
  getModerationHistory, 
  getModerationSummary 
} from '@/services/moderation';

/**
 * Handles GET requests for moderation data based on the provided action query parameter.
 * Supports retrieving pending queues, administrative summaries, and issue histories.
 * 
 * @param request The incoming Next.js HTTP Request
 * @returns A structured JSON response containing the requested moderation data
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    if (!action) {
      return NextResponse.json(
        { success: false, error: 'Missing required query parameter: action' },
        { status: 400 }
      );
    }

    switch (action) {
      case 'pending': {
        const issues = await getPendingIssues();
        return NextResponse.json({ success: true, issues });
      }
      
      case 'summary': {
        const summary = await getModerationSummary();
        return NextResponse.json({ success: true, summary });
      }
      
      case 'history': {
        const issueId = searchParams.get('issueId');
        if (!issueId) {
          return NextResponse.json(
            { success: false, error: 'Missing required query parameter: issueId for history action' },
            { status: 400 }
          );
        }
        const history = await getModerationHistory(issueId);
        return NextResponse.json({ success: true, history });
      }
      
      default:
        return NextResponse.json(
          { success: false, error: `Invalid action specified: ${action}` },
          { status: 400 }
        );
    }
  } catch (error: unknown) {
    console.error('[Moderation API GET] Unhandled exception:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json(
      { success: false, error: 'An unexpected server error occurred while retrieving moderation data.' },
      { status: 500 }
    );
  }
}

/**
 * Handles POST requests to execute moderation lifecycle actions on civic issues.
 * Routes to the appropriate service domain based on the requested action payload.
 * 
 * @param request The incoming Next.js HTTP Request containing the moderation payload
 * @returns A structured JSON response indicating the success of the operation
 */
export async function POST(request: Request) {
  try {
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: 'Malformed JSON payload.' },
        { status: 400 }
      );
    }

    const { issueId, adminId, action, notes } = body;

    // 1. Strict input validation
    if (!issueId || !adminId || !action) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: issueId, adminId, and action are mandatory.' },
        { status: 400 }
      );
    }

    let result = false;

    // 2. Delegate to the correct operational service method securely
    switch (action) {
      case 'VERIFY':
        result = await verifyIssue(issueId, adminId, notes);
        break;
      case 'RESOLVE':
        result = await resolveIssue(issueId, adminId, notes);
        break;
      case 'REJECT':
        result = await rejectIssue(issueId, adminId, notes);
        break;
      default:
        return NextResponse.json(
          { success: false, error: `Unsupported moderation action: ${action}` },
          { status: 400 }
        );
    }

    if (!result) {
      // If the service gracefully failed to apply the action
      return NextResponse.json(
        { success: false, error: 'Failed to execute the moderation action. Please verify the provided details.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });

  } catch (error: unknown) {
    console.error('[Moderation API POST] Unhandled exception:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json(
      { success: false, error: 'An unexpected server error occurred while executing the moderation action.' },
      { status: 500 }
    );
  }
}
