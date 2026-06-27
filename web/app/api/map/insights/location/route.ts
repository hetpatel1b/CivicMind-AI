import { NextResponse } from 'next/server';
import { generateLocationMapInsights } from '@/services/gemini';
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

    const { targetIssue, nearbyIssues } = payload;
    if (!targetIssue || !nearbyIssues || !Array.isArray(nearbyIssues)) {
      return NextResponse.json(
        { success: false, error: 'Bad Request', message: 'targetIssue and nearbyIssues array are required.' },
        { status: 400 }
      );
    }

    const insights = await generateLocationMapInsights(targetIssue, nearbyIssues);

    return NextResponse.json(
      { success: true, insights },
      { status: 200 }
    );
  } catch (error: unknown) {
    logger.error({
      category: 'SYSTEM',
      message: '[API/Map/Insights/Location] Error generating location insights',
      error
    });
    return NextResponse.json(
      { success: false, error: 'Internal Server Error', message: 'Failed to generate location insights.' },
      { status: 500 }
    );
  }
}
