import { NextResponse } from 'next/server';
import { detectDuplicateIssue } from '@/services/gemini';
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

    const { targetIssue, recentIssues } = payload;
    if (!targetIssue || !recentIssues || !Array.isArray(recentIssues)) {
      return NextResponse.json(
        { success: false, error: 'Bad Request', message: 'targetIssue and recentIssues array are required.' },
        { status: 400 }
      );
    }

    const insights = await detectDuplicateIssue(targetIssue, recentIssues);

    return NextResponse.json(
      { success: true, insights },
      { status: 200 }
    );
  } catch (error: unknown) {
    logger.error({
      category: 'SYSTEM',
      message: '[API/Community/Insights/Duplicates] Error generating duplicate insights',
      error
    });
    return NextResponse.json(
      { success: false, error: 'Internal Server Error', message: 'Failed to generate duplicate insights.' },
      { status: 500 }
    );
  }
}
