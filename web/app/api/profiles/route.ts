import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';
import { 
  getProfile, 
  getPublicProfile, 
  updateProfile, 
  getProfileStatistics 
} from '@/services/profiles';
import { getProfileQuerySchema, updateProfileSchema, formatZodError } from '@/lib/validations';
import { logger } from '@/lib/logger';

/**
 * GET handler to securely expose user profiles.
 * Serves both the authenticated user's private profile and public profiles for other citizens.
 * 
 * Query Parameters:
 * ?id=uuid (Optional, fetches a specific user's public profile)
 * ?public=true (Optional flag indicating intent for public consumption)
 * 
 * @param request The incoming Next.js HTTP Request object
 * @returns A strictly typed NextResponse containing the profile payload
 */
export async function GET(request: Request) {
  try {
    const supabase = await createClient();
    
    // 1. Authenticate Request natively
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    const { searchParams } = new URL(request.url);
    const queryParams = Object.fromEntries(searchParams.entries());
    const validationResult = getProfileQuerySchema.safeParse(queryParams);

    if (!validationResult.success) {
      return NextResponse.json(
        { success: false, error: 'Bad Request', message: formatZodError(validationResult.error) },
        { status: 400 }
      );
    }

    const requestedId = validationResult.data.id;
    const isPublicReq = validationResult.data.public;

    // 2. Logic Branch: Fetching a specific public profile
    if (requestedId) {
      const publicProfile = await getPublicProfile(requestedId);
      
      if (!publicProfile) {
        return NextResponse.json(
          { success: false, error: 'Not Found', message: 'Profile could not be found.' },
          { status: 404 }
        );
      }

      const stats = await getProfileStatistics(requestedId);

      return NextResponse.json({
        success: true,
        message: 'Public profile retrieved successfully.',
        data: {
          profile: publicProfile,
          statistics: stats
        }
      });
    }

    // 3. Logic Branch: Fetching the current authenticated user's profile
    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized', message: 'You must be logged in to view your private profile.' },
        { status: 401 }
      );
    }

    const currentProfile = isPublicReq 
      ? await getPublicProfile(user.id)
      : await getProfile(user.id);
      
    if (!currentProfile) {
      return NextResponse.json(
        { success: false, error: 'Not Found', message: 'Your profile could not be found.' },
        { status: 404 }
      );
    }

    const currentStats = await getProfileStatistics(user.id);

    // 4. Return the successfully hydrated analytical payload
    return NextResponse.json({
      success: true,
      message: 'Profile retrieved successfully.',
      data: {
        profile: currentProfile,
        statistics: currentStats
      }
    });
    
  } catch (error: unknown) {
    // 5. Safely handle and log unexpected exceptions without leaking sensitive backend details
    logger.error({
      category: 'SYSTEM',
      message: '[Profiles API GET] Unhandled exception',
      error
    });
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal Server Error',
        message: 'An unexpected server error occurred while retrieving profile data.' 
      },
      { status: 500 }
    );
  }
}

/**
 * PATCH handler to securely update the authenticated user's profile metadata.
 * Enforces strict validation to prevent malicious modification of protected fields.
 * 
 * Expected JSON payload:
 * {
 *   "display_name": "string", (Maps to full_name in DB)
 *   "avatar_url": "string"
 * }
 * 
 * @param request The incoming Next.js HTTP Request object
 * @returns A strictly typed NextResponse containing the update success or an error payload
 */
export async function PATCH(request: Request) {
  try {
    const supabase = await createClient();
    
    // 1. Authenticate Request
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized', message: 'You must be logged in to update your profile.' },
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

    // 3. Strict Input Validation via Zod
    const validationResult = updateProfileSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json(
        { success: false, error: 'Bad Request', message: formatZodError(validationResult.error) },
        { status: 400 }
      );
    }

    // Map Zod validated data to service shape
    const updates: { fullName?: string, avatarUrl?: string } = {};
    if (validationResult.data.display_name !== undefined) updates.fullName = validationResult.data.display_name;
    if (validationResult.data.avatar_url !== undefined) updates.avatarUrl = validationResult.data.avatar_url;

    // 4. Delegate business logic execution to the strictly controlled service layer
    const success = await updateProfile(user.id, updates);

    // 5. Handle logical failure from the service layer
    if (!success) {
      return NextResponse.json(
        { success: false, error: 'Update Failed', message: 'Failed to apply profile updates to the database.' },
        { status: 500 }
      );
    }

    // 6. Return standard success payload
    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully.'
    });
    
  } catch (error: unknown) {
    // 7. Safely handle unexpected system exceptions without leaking internals
    logger.error({
      category: 'SYSTEM',
      message: '[Profiles API PATCH] Unhandled exception',
      error
    });
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal Server Error',
        message: 'An unexpected server error occurred while updating the profile.' 
      },
      { status: 500 }
    );
  }
}
