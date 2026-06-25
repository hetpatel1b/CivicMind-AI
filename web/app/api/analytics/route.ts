import { NextResponse } from 'next/server';
import { getAnalyticsSummary } from '@/services/analytics';

/**
 * GET handler to securely expose the fully aggregated analytics summary.
 * Designed to serve the Admin Dashboard's data requirements in a single payload.
 * 
 * @param request The incoming Next.js HTTP Request object
 * @returns A strictly typed NextResponse containing the AnalyticsSummary or an error payload
 */
export async function GET(request: Request) {
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
    console.error('[Analytics API GET] Unhandled exception:', error instanceof Error ? error.message : 'Unknown error');
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'An unexpected server error occurred while retrieving analytics data.' 
      },
      { status: 500 }
    );
  }
}
