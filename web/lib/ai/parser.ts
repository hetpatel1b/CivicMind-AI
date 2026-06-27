import { AIAnalysisResult } from '@/types/ai';
import { aiLogger } from './logger';

/**
 * Parser Layer for AI Infrastructure.
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

    return parsed as AIAnalysisResult;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    aiLogger.error(`Failed to parse AI response: ${message}`, error, { rawResponse });
    throw new Error(`Failed to parse AI response: ${message}. Raw output: ${rawResponse}`);
  }
}
