import { AIAnalysisResult } from '@/types/ai';

export interface AnalyzeResponse {
  success: boolean;
  report?: AIAnalysisResult;
  error?: string;
}

/**
 * Communicates with the Next.js API route to initiate the AI analysis of an image.
 * Handles the secure bridge between the client UI and the secure server-side Gemini service.
 * 
 * @param imageUrl The public Supabase Storage URL of the image to analyze
 * @returns The strictly structured AI report (AIAnalysisResult)
 * @throws Descriptive error messages on network, server, timeout, or validation failures
 */
export async function analyzeIssueImage(imageUrl: string): Promise<AIAnalysisResult> {
  // 1. Validate Input
  if (!imageUrl || typeof imageUrl !== 'string') {
    throw new Error('Analysis failed: A valid image URL is required.');
  }

  // 2. Setup Timeout Controller (15 seconds max for AI analysis)
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);

  try {
    // 3. Execute POST request to the API route
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageUrl }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    // 4. Parse the JSON response
    let data: AnalyzeResponse;
    try {
      data = await response.json();
    } catch {
      throw new Error('Analysis failed: Received an invalid response from the server.');
    }

    // 5. Handle Server-Side Errors or AI Failures
    if (!response.ok || !data.success) {
      throw new Error(data.error || `Server responded with status ${response.status}`);
    }

    // 6. Validate output presence
    if (!data.report) {
      throw new Error('Analysis succeeded, but no report data was returned.');
    }

    return data.report;

  } catch (error: unknown) {
    clearTimeout(timeoutId);

    // 7. Handle Specific Error Types (Timeout vs Network)
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Analysis timed out. The AI took too long to respond. Please try again.');
    }

    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Network error: Unable to connect to the analysis service. Please check your internet connection.');
    }

    // 8. Re-throw with clean message
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred.';
    throw new Error(errorMessage);
  }
}
