import { NextResponse } from 'next/server';
import { getAuthContext } from '@/services/auth';
import { logger } from '@/lib/logger';
import { authHeaderSchema, formatZodError } from '@/lib/validations';

/**
 * GET handler to securely expose the current authentication and authorization context.
 * Useful for frontend clients to strictly determine RBAC (Role-Based Access Control)
 * boundaries before rendering admin-only UI components or attempting protected actions.
 * 
 * @param request The incoming Next.js HTTP Request object
 * @returns A strictly typed NextResponse containing the user's role and session state
 */
export async function GET(request: Request) {
  try {
    // 1. Check for manual Authorization header overrides (defensive validation)
    // Though Supabase uses cookies in SSR, APIs often receive direct Bearer tokens.
    const authHeader = request.headers.get('Authorization');
    if (authHeader) {
      const validationResult = authHeaderSchema.safeParse(authHeader);
      if (!validationResult.success) {
        return NextResponse.json(
          { success: false, error: 'Bad Request', message: formatZodError(validationResult.error) },
          { status: 400 }
        );
      }
    }

    // 2. Delegate the complex security verification to the centralized Auth Service
    const context = await getAuthContext();

    // 3. Handle Unauthenticated / Expired Session states explicitly
    if (!context.isAuthenticated || !context.user) {
      // Differentiate between missing session and explicitly invalid/expired tokens
      const message = context.session === null 
        ? 'No active authentication session found.'
        : 'Session token is expired or invalid.';

      return NextResponse.json(
        { success: false, error: 'Unauthorized', message },
        { status: 401 }
      );
    }

    // 4. Construct the clean, strictly typed permission payload
    // We explicitly map values to ensure no sensitive identity tokens or password hashes leak.
    const payload = {
      user: {
        id: context.user.id,
        email: context.user.email,
        emailConfirmed: context.user.email_confirmed_at !== null,
        lastSignIn: context.user.last_sign_in_at
      },
      role: context.role,
      permissions: {
        canAccessAdminPanel: context.isAdmin,
        canAssignBadges: context.isAdmin,
        canReportIssues: context.role === 'citizen' || context.role === 'admin',
        canVerifyIssues: context.role === 'citizen' || context.role === 'admin'
      },
      session: {
        status: 'active',
        expiresAt: context.session?.expires_at ? new Date(context.session.expires_at * 1000).toISOString() : null
      }
    };

    // 5. Return standard success payload
    return NextResponse.json({
      success: true,
      message: 'Authentication context retrieved successfully.',
      data: payload
    });
    
  } catch (error: unknown) {
    // 6. Safely handle unexpected system exceptions without leaking internals
    logger.error({
      category: 'SYSTEM',
      message: '[Auth API GET] Unhandled exception',
      error
    });
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal Server Error',
        message: 'An unexpected server error occurred while verifying authorization.' 
      },
      { status: 500 }
    );
  }
}
