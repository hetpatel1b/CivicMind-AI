import { NextResponse } from 'next/server';
import { getAuthContext } from '@/services/auth';
import { generateModerationInsights } from '@/services/gemini';
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

    const { title, description } = payload;
    if (!title || !description || typeof title !== 'string' || typeof description !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Bad Request', message: 'Title and description are required.' },
        { status: 400 }
      );
    }

    const insights = await generateModerationInsights(title, description);

    return NextResponse.json(
      { success: true, insights },
      { status: 200 }
    );
  } catch (error: unknown) {
    logger.error({
      category: 'SYSTEM',
      message: '[API/Admin/Insights/Issue] Error generating insights',
      error
    });
    return NextResponse.json(
      { success: false, error: 'Internal Server Error', message: 'Failed to generate moderation insights.' },
      { status: 500 }
    );
  }
}
