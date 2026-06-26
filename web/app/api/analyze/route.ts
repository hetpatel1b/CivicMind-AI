import { NextResponse } from 'next/server';
import { analyzeCivicIssueImage } from '@/services/gemini';
import { logger } from '@/lib/logger';

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
    logger.error({
      category: 'SYSTEM',
      message: '[API/Analyze] Server Error',
      error
    });
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal Server Error',
        message: 'An unexpected server error occurred during analysis.' 
      },
      { status: 500 }
    );
  }
}
