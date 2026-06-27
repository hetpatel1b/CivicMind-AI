import { NextResponse } from 'next/server';
import { getAuthContext } from '@/services/auth';
import { generateDashboardInsights } from '@/services/gemini';
import { logger } from '@/lib/logger';

export async function POST(request: Request) {
  try {
    const context = await getAuthContext();
    if (!context.isAuthenticated || !context.isAdmin) {
      return NextResponse.json(
        { success: false, error: 'Forbidden', message: 'Administrator access required.' },
        { status: 403 }
      );
    }

    let analyticsData;
    try {
      analyticsData = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: 'Bad Request', message: 'Invalid JSON payload.' },
        { status: 400 }
      );
    }

    if (!analyticsData || typeof analyticsData !== 'object') {
      return NextResponse.json(
        { success: false, error: 'Bad Request', message: 'Analytics data is required.' },
        { status: 400 }
      );
    }

    const insights = await generateDashboardInsights(analyticsData);

    return NextResponse.json(
      { success: true, insights },
      { status: 200 }
    );
  } catch (error: unknown) {
    logger.error({
      category: 'SYSTEM',
      message: '[API/Admin/Insights/Dashboard] Error generating insights',
      error
    });
    return NextResponse.json(
      { success: false, error: 'Internal Server Error', message: 'Failed to generate dashboard insights.' },
      { status: 500 }
    );
  }
}
