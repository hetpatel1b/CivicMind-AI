import { NextRequest, NextResponse } from 'next/server';
import { generateIssueDetailsSummary } from '@/services/gemini';
import { aiLogger } from '@/lib/ai';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { issue, comments } = body;

    if (!issue) {
      return NextResponse.json({ error: 'Missing issue data' }, { status: 400 });
    }

    const aiResponse = await generateIssueDetailsSummary(issue, comments || []);

    aiLogger.info('Generated issue details summary', { issueId: issue.id });

    return NextResponse.json(aiResponse);

  } catch (error: unknown) {
    aiLogger.error('Error generating issue summary:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json({ error: 'Failed to generate summary' }, { status: 500 });
  }
}
