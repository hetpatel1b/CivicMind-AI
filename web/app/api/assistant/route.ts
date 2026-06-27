import { NextResponse } from 'next/server';
import { chatWithAssistant, ChatMessage } from '@/services/gemini';
import { logger } from '@/lib/logger';

export async function POST(request: Request) {
  try {
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, error: 'Bad Request: Invalid JSON body format.' },
        { status: 400 }
      );
    }

    const { history = [], message } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Bad Request: "message" is required and must be a string.' },
        { status: 400 }
      );
    }

    if (!Array.isArray(history)) {
      return NextResponse.json(
        { success: false, error: 'Bad Request: "history" must be an array.' },
        { status: 400 }
      );
    }

    const typedHistory = history as ChatMessage[];
    const responseText = await chatWithAssistant(typedHistory, message);

    return NextResponse.json(
      { success: true, text: responseText },
      { status: 200 }
    );
  } catch (error: unknown) {
    logger.error({
      category: 'SYSTEM',
      message: '[API/Assistant] Server Error',
      error
    });
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Internal Server Error',
        message: 'An unexpected server error occurred during assistant chat.' 
      },
      { status: 500 }
    );
  }
}
