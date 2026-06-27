import { NextResponse } from 'next/server';
import { generateChartExplanation } from '@/services/gemini';
import { logger } from '@/lib/logger';
import { createClient } from '@/lib/supabase-server';

export async function POST(request: Request) {
  try {
    // Basic auth check
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ success: false, error: 'Unauthorized', message: 'Admin authentication required.' }, { status: 401 });
    }

    let payload;
    try {
      payload = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: 'Bad Request', message: 'Invalid JSON payload.' },
        { status: 400 }
      );
    }

    const { chartType, chartData } = payload;
    if (!chartType || !chartData) {
      return NextResponse.json(
        { success: false, error: 'Bad Request', message: 'chartType and chartData are required.' },
        { status: 400 }
      );
    }

    const insights = await generateChartExplanation(chartType, chartData);

    return NextResponse.json(
      { success: true, insights },
      { status: 200 }
    );
  } catch (error: unknown) {
    logger.error({
      category: 'SYSTEM',
      message: '[API/Admin/Insights/Chart] Error generating chart insights',
      error
    });
    return NextResponse.json(
      { success: false, error: 'Internal Server Error', message: 'Failed to generate chart explanation.' },
      { status: 500 }
    );
  }
}
