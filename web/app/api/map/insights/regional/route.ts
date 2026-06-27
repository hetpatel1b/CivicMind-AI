import { NextResponse } from 'next/server';
import { generateRegionalMapInsights } from '@/services/gemini';
import { logger } from '@/lib/logger';

export async function POST(request: Request) {
  try {
    let payload;
    try {
      payload = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: 'Bad Request', message: 'Invalid JSON payload.' },
        { status: 400 }
      );
    }

    if (!payload || !Array.isArray(payload)) {
      return NextResponse.json(
        { success: false, error: 'Bad Request', message: 'An array of visible issues is required.' },
        { status: 400 }
      );
    }

    const insights = await generateRegionalMapInsights(payload);

    return NextResponse.json(
      { success: true, insights },
      { status: 200 }
    );
  } catch (error: unknown) {
    logger.error({
      category: 'SYSTEM',
      message: '[API/Map/Insights/Regional] Error generating regional insights',
      error
    });
    return NextResponse.json(
      { success: false, error: 'Internal Server Error', message: 'Failed to generate regional map insights.' },
      { status: 500 }
    );
  }
}
