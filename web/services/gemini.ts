import { GoogleGenAI } from '@google/genai';
import { parseAIResponse } from '@/lib/ai-parser';
import { AIAnalysisResult } from '@/types/ai';

const SYSTEM_INSTRUCTION = `
You are CivicMind AI, an expert municipal infrastructure analyzer.
Your task is to analyze civic issue images.
You must return strictly valid JSON matching this schema:
{
  "title": "Short descriptive title (Max 50 chars)",
  "description": "Detailed explanation of the problem observed",
  "category": "Pothole | Road Damage | Garbage | Water Leakage | Broken Streetlight | Drainage Issue | Traffic Signal Issue | Public Safety Issue | Other",
  "severity": "LOW | MEDIUM | HIGH | CRITICAL",
  "recommended_department": "Road Maintenance | Sanitation | Water Department | Electricity Department | Traffic Department | Municipal Corporation",
  "confidence": 0.95
}
Return ONLY the JSON object. Do not include any text outside the JSON.
If no issue is clearly visible, return category "Other" and severity "LOW" with a confidence under 0.50.
`;

/**
 * Downloads a public image URL and executes a multi-modal Gemini 2.5 Flash analysis.
 * Incorporates automatic retry logic and structured JSON enforcement.
 * 
 * @param imageUrl The public Supabase Storage URL
 * @returns Fully validated AIAnalysisResult
 */
export async function analyzeCivicIssueImage(imageUrl: string): Promise<AIAnalysisResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is missing from environment variables.');
  }

  const ai = new GoogleGenAI({ apiKey });

  // 1. Fetch the image from the Supabase public URL securely on the server
  let imageResponse: Response;
  try {
    imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) throw new Error(`HTTP ${imageResponse.status}`);
  } catch (err: any) {
    throw new Error(`Failed to download image from storage: ${err.message}`);
  }

  const arrayBuffer = await imageResponse.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const mimeType = imageResponse.headers.get('content-type') || 'image/jpeg';

  // 2. Execute Gemini Analysis with Exponential Backoff Retries
  let attempts = 0;
  const maxAttempts = 3;

  while (attempts < maxAttempts) {
    attempts++;
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          {
            role: 'user',
            parts: [
              {
                inlineData: {
                  data: buffer.toString('base64'),
                  mimeType,
                },
              },
              { text: 'Analyze this image and generate the civic issue report.' },
            ],
          },
        ],
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.1, // Low temperature for highly deterministic, factual output
          responseMimeType: 'application/json', // Forces Gemini 2.5 Flash into JSON mode
        },
      });

      const rawText = response.text || '';
      return parseAIResponse(rawText);
    } catch (error: any) {
      console.warn(`[AI Service] Attempt ${attempts} failed: ${error.message}`);
      
      if (attempts >= maxAttempts) {
        throw new Error(`AI Analysis failed definitively after ${maxAttempts} attempts: ${error.message}`);
      }
      
      // Wait before retrying (Exponential Backoff: 1s, 2s)
      await new Promise((resolve) => setTimeout(resolve, 1000 * attempts));
    }
  }

  throw new Error('AI Analysis failed due to an unknown error.');
}
