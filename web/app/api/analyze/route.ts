import { NextResponse } from 'next/server';
import { analyzeCivicIssueImage } from '@/services/gemini';

/**
 * POST /api/analyze
 * 
 * Endpoint to securely orchestrate the AI analysis workflow.
 * Receives a public Supabase Storage URL, invokes Gemini 2.5 Flash, 
 * and returns a strictly typed JSON report.
 */
export async function POST(request: Request) {
  try {
    // 1. Parse incoming JSON payload
    let body;
    try {
      body = await request.json();
    } catch {
      console.warn('[API/Analyze] Bad Request: Invalid JSON body');
      return NextResponse.json(
        { success: false, error: 'Bad Request: Invalid JSON body format.' },
        { status: 400 }
      );
    }

    const { imageUrl } = body;

    // 2. Validate imageUrl presence and type
    if (!imageUrl || typeof imageUrl !== 'string') {
      console.warn('[API/Analyze] Bad Request: Missing or invalid imageUrl');
      return NextResponse.json(
        { success: false, error: 'Bad Request: "imageUrl" is required and must be a string.' },
        { status: 400 }
      );
    }

    console.info(`[API/Analyze] Initiating Gemini analysis for image: ${imageUrl}`);

    // 3. Delegate to the AI Foundation Layer
    const result = await analyzeCivicIssueImage(imageUrl);

    console.info('[API/Analyze] Gemini analysis completed successfully.');

    // 4. Return the structured, verified JSON report
    return NextResponse.json(
      { success: true, report: result },
      { status: 200 }
    );

  } catch (error: unknown) {
    // 5. Catch and log unhandled exceptions / AI failures
    const errorMessage = error instanceof Error ? error.message : 'An internal server error occurred during AI analysis.';
    console.error('[API/Analyze] Server Error:', errorMessage);
    
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}
