import { NextResponse } from 'next/server';
import { getAuthContext } from '@/services/auth';
import { analyzeCommentModeration } from '@/services/gemini';
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

    let payload;
    try {
      payload = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: 'Bad Request', message: 'Invalid JSON payload.' },
        { status: 400 }
      );
    }

    const { comment } = payload;
    if (!comment || typeof comment !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Bad Request', message: 'comment string is required.' },
        { status: 400 }
      );
    }

    const insights = await analyzeCommentModeration(comment);

    return NextResponse.json(
      { success: true, insights },
      { status: 200 }
    );
  } catch (error: unknown) {
    logger.error({
      category: 'SYSTEM',
      message: '[API/Community/Insights/Moderation] Error generating moderation insights',
      error
    });
    return NextResponse.json(
      { success: false, error: 'Internal Server Error', message: 'Failed to generate moderation insights.' },
      { status: 500 }
    );
  }
}
