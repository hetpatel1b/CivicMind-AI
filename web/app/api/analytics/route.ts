import { NextResponse } from 'next/server';
import { getAnalyticsSummary } from '@/services/analytics';
import { logger } from '@/lib/logger';

/**
 * GET handler to securely expose the fully aggregated analytics summary.
 * Designed to serve the Admin Dashboard's data requirements in a single payload.
 * 
 * @param request The incoming Next.js HTTP Request object
 * @returns A strictly typed NextResponse containing the AnalyticsSummary or an error payload
 */
export async function GET() {
  try {
    // 1. Delegate the complex data aggregation to the dedicated service layer
    const analytics = await getAnalyticsSummary();

    // 2. Return the successfully hydrated analytical payload
    return NextResponse.json({
      success: true,
      analytics: analytics,
    });
    
  } catch (error: unknown) {
    // 3. Safely handle and log unexpected exceptions without leaking sensitive backend details
    logger.error({
      category: 'SYSTEM',
      message: '[Analytics API GET] Unhandled exception',
      error
    });
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal Server Error',
        message: 'An unexpected server error occurred while retrieving analytics.' 
      },
      { status: 500 }
    );
  }
}
