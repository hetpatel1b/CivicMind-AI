import { AIAnalysisResult } from '@/types/ai';

/**
 * Robust JSON parser for extracting and validating LLM outputs.
 * Handles markdown code block stripping and strict type validation.
 */
export function parseAIResponse(rawResponse: string): AIAnalysisResult {
  try {
    // LLMs occasionally wrap JSON in markdown blocks despite strict prompting
    const cleanJson = rawResponse
      .replace(/```json\n?/gi, '')
      .replace(/```\n?/g, '')
      .trim();
      
    const parsed = JSON.parse(cleanJson);

    // Structural Validation
    if (!parsed.title || typeof parsed.title !== 'string') {
      throw new Error("Missing or invalid 'title'");
    }
    if (!parsed.description || typeof parsed.description !== 'string') {
      throw new Error("Missing or invalid 'description'");
    }
    if (!parsed.category || typeof parsed.category !== 'string') {
      throw new Error("Missing or invalid 'category'");
    }
    if (!parsed.severity || typeof parsed.severity !== 'string') {
      throw new Error("Missing or invalid 'severity'");
    }
    if (!parsed.recommended_department || typeof parsed.recommended_department !== 'string') {
      throw new Error("Missing or invalid 'recommended_department'");
    }
    if (typeof parsed.confidence !== 'number') {
      throw new Error("Missing or invalid 'confidence'");
    }

    // You could also add strict inclusion checks for Enums here if desired,
    // but Gemini with 'responseMimeType' and a strict prompt is highly reliable.

    return parsed as AIAnalysisResult;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Failed to parse AI response: ${message}. Raw output: ${rawResponse}`);
  }
}
