import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';
import { getBadgeSummary, awardBadge } from '@/services/badges';
import { BadgeType } from '@/types/badge';
import { getAuthContext } from '@/services/auth';
import { logger } from '@/lib/logger';
import { uuidSchema, awardBadgeSchema, formatZodError } from '@/lib/validations';

/**
 * GET handler to securely retrieve the authenticated user's earned badges.
 * Exposes full badge metadata (description, icons) along with the specific awarded dates.
 * 
 * @param request The incoming Next.js HTTP Request object
 * @returns A strictly typed NextResponse containing the badges payload
 */
export async function GET(request: Request) {
  try {
    // 1. Resolve Auth Context natively
    const context = await getAuthContext();
    if (!context.isAuthenticated || !context.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized', message: 'You must be logged in to view badges.' },
        { status: 401 }
      );
    }

    // 2. Extract and Validate Target ID via search params, defaulting to self
    const { searchParams } = new URL(request.url);
    const targetIdParam = searchParams.get('userId') || context.user.id;
    
    const idValidation = uuidSchema.safeParse(targetIdParam);
    if (!idValidation.success) {
      return NextResponse.json(
        { success: false, error: 'Bad Request', message: 'A valid userId is required.' },
        { status: 400 }
      );
    }
    
    const targetId = idValidation.data;

    // 3. Fetch data using the existing badges service
    const populatedBadges = await getBadgeSummary(targetId);

    // 4. Return standard success payload
    return NextResponse.json({
      success: true,
      message: 'Badges retrieved successfully.',
      data: {
        totalBadges: populatedBadges.totalBadges,
        badges: populatedBadges.badges
      }
    });
    
  } catch (error: unknown) {
    logger.error({
      category: 'SYSTEM',
      message: '[Badges API GET] Unhandled exception',
      error
    });
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal Server Error',
        message: 'An unexpected server error occurred while retrieving badges.' 
      },
      { status: 500 }
    );
  }
}

/**
 * POST handler for manual badge assignments.
 * STRICTLY PROTECTED: Only authenticated administrators can execute this endpoint.
 * 
 * Expected JSON payload:
 * {
 *   "userId": "string",
 *   "badgeType": "FIRST_REPORTER" | "ACTIVE_CITIZEN" | "COMMUNITY_LEADER" | "CIVIC_CHAMPION"
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
        { success: false, error: 'Unauthorized', message: 'You must be logged in to perform this action.' },
        { status: 401 }
      );
    }

    // 2. Authorize Request (Admin Check)
    // Query the users table to verify the role matches 'admin'
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single();

    if (userError || userData?.role !== 'admin') {
      return NextResponse.json(
        { success: false, error: 'Forbidden', message: 'Administrator privileges are required to assign badges.' },
        { status: 403 }
      );
    }

    // 3. Parse and validate JSON payload via Zod
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: 'Bad Request', message: 'Malformed JSON payload.' },
        { status: 400 }
      );
    }

    const validationResult = awardBadgeSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { success: false, error: 'Bad Request', message: formatZodError(validationResult.error) },
        { status: 400 }
      );
    }

    const { userId: targetUserId, badgeType } = validationResult.data;

    // 5. Delegate business logic execution to the existing service
    const result = await awardBadge(targetUserId.trim(), badgeType as BadgeType);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: 'Assignment Failed', message: result.error || 'Failed to award the badge.' },
        { status: 500 }
      );
    }

    // 6. Return standard success payload
    return NextResponse.json({
      success: true,
      message: 'Badge successfully awarded by administrator.',
      data: {
        userId: targetUserId.trim(),
        badgeType: badgeType
      }
    });
    
  } catch (error: unknown) {
    logger.error({
      category: 'SYSTEM',
      message: '[Badges API POST] Unhandled exception',
      error
    });
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal Server Error',
        message: 'An unexpected server error occurred while assigning the badge.' 
      },
      { status: 500 }
    );
  }
}
