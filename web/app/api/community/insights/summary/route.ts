import { NextResponse } from 'next/server';
import { generateDiscussionSummary } from '@/services/gemini';
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

    const { comments } = payload;
    if (!comments || !Array.isArray(comments)) {
      return NextResponse.json(
        { success: false, error: 'Bad Request', message: 'An array of comments is required.' },
        { status: 400 }
      );
    }

    const summary = await generateDiscussionSummary(comments);

    return NextResponse.json(
      { success: true, summary },
      { status: 200 }
    );
  } catch (error: unknown) {
    logger.error({
      category: 'SYSTEM',
      message: '[API/Community/Insights/Summary] Error generating summary',
      error
    });
    return NextResponse.json(
      { success: false, error: 'Internal Server Error', message: 'Failed to generate discussion summary.' },
      { status: 500 }
    );
  }
}
