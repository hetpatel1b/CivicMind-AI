import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';
import { getReputationProfile, getReputationSummary } from '@/services/reputation';
import { awardReputation } from '@/services/gamification';
import { uuidSchema, awardReputationSchema, formatZodError } from '@/lib/validations';
import { getBadgeSummary } from '@/services/badges';
import { ReputationEventType } from '@/types/reputation';
import { logger } from '@/lib/logger';

/**
 * GET handler to securely expose the authenticated user's complete reputation profile.
 * Aggregates data from the reputation service, badges service, and direct history logs.
 * 
 * @param request The incoming Next.js HTTP Request object
 * @returns A strictly typed NextResponse containing the reputation data or an error payload
 */
export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    
    // 1. Authenticate Request
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized', message: 'You must be logged in to view your reputation.' },
        { status: 401 }
      );
    }

    // 2. Extract and Validate Target ID via search params, defaulting to self
    const { searchParams } = new URL(request.url);
    const targetIdParam = searchParams.get('userId') || user.id;

    const idValidation = uuidSchema.safeParse(targetIdParam);
    if (!idValidation.success) {
      return NextResponse.json(
        { success: false, error: 'Bad Request', message: 'A valid userId is required.' },
        { status: 400 }
      );
    }
    const targetId = idValidation.data;

    // 3. Fetch Aggregated Profile, Summary, and Badges using strictly Services
    // We execute concurrently to maximize response performance
    const [profile, summary, badgeSummary] = await Promise.all([
      getReputationProfile(targetId),
      getReputationSummary(targetId),
      getBadgeSummary(targetId)
    ]);

    // 4. Fetch specific history directly as it's not exposed via the service layer yet
    // Does not duplicate business logic, just a raw data read.
    const { data: history, error: historyError } = await supabase
      .from('reputation_events')
      .select('id, type, points, reason, created_at')
      .eq('user_id', targetId)
      .order('created_at', { ascending: false });

    if (historyError) {
      logger.error({
        category: 'DATABASE',
        message: '[Reputation API GET] Database error fetching history',
        error: historyError
      });
      // We log but don't fail the whole request just for history
    }

    // 5. Return the successfully hydrated analytical payload
    return NextResponse.json({
      success: true,
      message: 'Reputation profile retrieved successfully.',
      data: {
        profile,
        summary,
        badgesCount: badgeSummary?.totalBadges || 0,
        history: history || []
      }
    });
    
  } catch (error: unknown) {
    // 6. Safely handle and log unexpected exceptions without leaking sensitive backend details
    logger.error({
      category: 'SYSTEM',
      message: '[Reputation API GET] Unhandled exception',
      error
    });
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal Server Error',
        message: 'An unexpected server error occurred while retrieving reputation data.' 
      },
      { status: 500 }
    );
  }
}

/**
 * POST handler to securely trigger a gamification event.
 * Validates the event type and utilizes the reputation service to securely calculate points and insert.
 * 
 * Expected JSON payload:
 * {
 *   "type": "ISSUE_REPORTED" | "ISSUE_SUPPORTED" | "COMMENT_CREATED" | "ISSUE_VERIFIED" | "ISSUE_RESOLVED"
 * }
 * 
 * @param request The incoming Next.js HTTP Request object
 * @returns A strictly typed NextResponse containing the award success or an error payload
 */
export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    
    // 1. Authenticate Request
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized', message: 'You must be logged in to trigger a reputation event.' },
        { status: 401 }
      );
    }

    // 2. Defensively parse and extract the JSON payload
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: 'Bad Request', message: 'Malformed JSON payload.' },
        { status: 400 }
      );
    }

    const validationResult = awardReputationSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { success: false, error: 'Bad Request', message: formatZodError(validationResult.error) },
        { status: 400 }
      );
    }

    const { type } = validationResult.data;

    // 4. Delegate business logic execution to the service layer
    const result = await awardReputation(user.id, type as ReputationEventType);

    // 5. Handle logical failure from the service layer
    if (!result.success) {
      // Differentiate between user-facing validation errors and server errors based on standard service responses
      const status = result.error?.includes('server error') ? 500 : 400;
      return NextResponse.json(
        { success: false, error: 'Event Failed', message: result.error || 'Failed to award reputation points.' },
        { status }
      );
    }

    // 6. Return standard success payload
    return NextResponse.json({
      success: true,
      message: 'Reputation awarded successfully.',
      data: {
        pointsAwarded: result.pointsAwarded
      }
    });
    
  } catch (error: unknown) {
    // 7. Safely handle unexpected system exceptions without leaking internals
    logger.error({
      category: 'SYSTEM',
      message: '[Reputation API POST] Unhandled exception',
      error
    });
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal Server Error',
        message: 'An unexpected server error occurred while awarding reputation.' 
      },
      { status: 500 }
    );
  }
}
