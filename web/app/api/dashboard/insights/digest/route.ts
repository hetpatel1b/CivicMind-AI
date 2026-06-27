import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';
import { generateUserDashboardDigest } from '@/services/gemini';
import { aiLogger } from '@/lib/ai';

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { session }, error: authError } = await supabase.auth.getSession();

    if (authError || !session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { summary, badgeSummary, recentReports, recentEvents } = body;

    if (!summary) {
      return NextResponse.json({ error: 'Missing user data' }, { status: 400 });
    }

    const aiResponse = await generateUserDashboardDigest({
      summary,
      badgeSummary,
      recentReports,
      recentEvents
    });

    aiLogger.info('Generated personalized dashboard digest for user', { userId: session.user.id });

    return NextResponse.json(aiResponse);

  } catch (error: unknown) {
    aiLogger.error('Error generating dashboard digest:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json({ error: 'Failed to generate digest' }, { status: 500 });
  }
}
