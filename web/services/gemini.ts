import { GoogleGenAI } from '@google/genai';
import { AIAnalysisResult } from '@/types/ai';
import { 
  AI_CONFIG, 
  aiLogger, 
  PROMPTS, 
  aiValidator, 
  withRetry, 
  parseAIResponse 
} from '@/lib/ai';
import { AnalyticsSummary } from '@/types/analytics';

/**
 * Downloads a public image URL and executes a multi-modal Gemini analysis.
 * Now operates using the centralized AI Infrastructure layers.
 * 
 * @param imageUrl The public Supabase Storage URL
 * @returns Fully validated AIAnalysisResult
 */
export async function analyzeCivicIssueImage(imageUrl: string): Promise<AIAnalysisResult> {
  const apiKey = AI_CONFIG.getGeminiApiKey();
  const ai = new GoogleGenAI({ apiKey });

  // 1. Validation Layer
  if (!aiValidator.validateImageUrl(imageUrl)) {
    throw new Error('Invalid image URL provided for AI analysis.');
  }

  // 2. Fetch Image
  let imageResponse: Response;
  try {
    imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) throw new Error(`HTTP ${imageResponse.status}`);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown network error';
    aiLogger.error(`Failed to download image from storage: ${message}`, err);
    throw new Error(`Failed to download image from storage: ${message}`);
  }

  const arrayBuffer = await imageResponse.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const mimeType = imageResponse.headers.get('content-type') || 'image/jpeg';

  // 3. Prompt Management Layer
  const promptTemplate = PROMPTS.civicIssueAnalyzer;

  // 4. Execution with Retry Layer
  const rawText = await withRetry('analyzeCivicIssueImage', async () => {
    const response = await ai.models.generateContent({
      model: AI_CONFIG.model,
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
            { text: promptTemplate.userPrompt },
          ],
        },
      ],
      config: {
        systemInstruction: promptTemplate.systemInstruction,
        temperature: AI_CONFIG.defaults.temperature,
        responseMimeType: AI_CONFIG.defaults.responseMimeType,
      },
    });

    return response.text || '';
  });

  // 5. Parser Layer
  return parseAIResponse(rawText);
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

/**
 * Communicates with the domain-specific Civic AI Assistant.
 * Uses the exact same infrastructure layers as the civic issue analyzer.
 * 
 * @param history The conversation history for the session
 * @param message The user's new message
 * @returns The AI assistant's text response
 */
export async function chatWithAssistant(history: ChatMessage[], message: string): Promise<string> {
  const apiKey = AI_CONFIG.getGeminiApiKey();
  const ai = new GoogleGenAI({ apiKey });

  const promptTemplate = PROMPTS.civicAssistant;

  // Map our simple chat history to the Gemini Content format
  const contents = history.map((msg) => ({
    role: msg.role,
    parts: [{ text: msg.text }]
  }));

  // Append the new user message
  contents.push({
    role: 'user',
    parts: [{ text: message }]
  });

  const rawText = await withRetry('chatWithAssistant', async () => {
    const response = await ai.models.generateContent({
      model: AI_CONFIG.model,
      contents,
      config: {
        systemInstruction: promptTemplate.systemInstruction,
        temperature: 0.3, // Slightly higher temperature for conversational flow
        // No responseMimeType here since we want markdown text, not JSON
      },
    });

    return response.text || '';
  });

  return rawText;
}

export interface AdminDashboardInsights {
  summary: string;
  trending_categories: string[];
  recommendations: string[];
  alerts: string[];
}

export async function generateDashboardInsights(analyticsData: AnalyticsSummary): Promise<AdminDashboardInsights> {
  const apiKey = AI_CONFIG.getGeminiApiKey();
  const ai = new GoogleGenAI({ apiKey });
  const promptTemplate = PROMPTS.adminDashboardInsights;

  const rawText = await withRetry('generateDashboardInsights', async () => {
    const response = await ai.models.generateContent({
      model: AI_CONFIG.model,
      contents: [
        {
          role: 'user',
          parts: [{ text: JSON.stringify(analyticsData) }]
        }
      ],
      config: {
        systemInstruction: promptTemplate.systemInstruction,
        temperature: 0.1,
        responseMimeType: 'application/json',
      },
    });
    return response.text || '';
  });

  try {
    const cleanJson = rawText.replace(/```json\n?/gi, '').replace(/```\n?/g, '').trim();
    return JSON.parse(cleanJson) as AdminDashboardInsights;
  } catch (error) {
    aiLogger.error('Failed to parse dashboard insights', error, { rawText });
    throw new Error('Invalid JSON returned for dashboard insights');
  }
}

export interface IssueModerationInsights {
  summary: string;
  is_spam: boolean;
  spam_reason: string | null;
  duplicate_notes: string;
}

export async function generateModerationInsights(title: string, description: string): Promise<IssueModerationInsights> {
  const apiKey = AI_CONFIG.getGeminiApiKey();
  const ai = new GoogleGenAI({ apiKey });
  const promptTemplate = PROMPTS.adminIssueModeration;

  const rawText = await withRetry('generateModerationInsights', async () => {
    const response = await ai.models.generateContent({
      model: AI_CONFIG.model,
      contents: [
        {
          role: 'user',
          parts: [{ text: `Title: ${title}\nDescription: ${description}` }]
        }
      ],
      config: {
        systemInstruction: promptTemplate.systemInstruction,
        temperature: 0.1,
        responseMimeType: 'application/json',
      },
    });
    return response.text || '';
  });

  try {
    const cleanJson = rawText.replace(/```json\n?/gi, '').replace(/```\n?/g, '').trim();
    return JSON.parse(cleanJson) as IssueModerationInsights;
  } catch (error) {
    aiLogger.error('Failed to parse moderation insights', error, { rawText });
    throw new Error('Invalid JSON returned for moderation insights');
  }
}

// ==========================================
// Phase 9.6: Community Intelligence
// ==========================================

export async function generateDiscussionSummary(comments: string[]): Promise<string> {
  const apiKey = AI_CONFIG.getGeminiApiKey();
  const ai = new GoogleGenAI({ apiKey });
  const promptTemplate = PROMPTS.communityDiscussionSummary;

  const rawText = await withRetry('generateDiscussionSummary', async () => {
    const response = await ai.models.generateContent({
      model: AI_CONFIG.model,
      contents: [
        {
          role: 'user',
          parts: [{ text: JSON.stringify(comments) }]
        }
      ],
      config: {
        systemInstruction: promptTemplate.systemInstruction,
        temperature: 0.3,
      },
    });
    return response.text || '';
  });

  return rawText.trim();
}

export interface CommunityTrendingInsights {
  trending_categories: string[];
  emerging_concerns: string[];
  highlight: string;
}

export async function generateCommunityInsights(feedIssues: Record<string, unknown>[]): Promise<CommunityTrendingInsights> {
  const apiKey = AI_CONFIG.getGeminiApiKey();
  const ai = new GoogleGenAI({ apiKey });
  const promptTemplate = PROMPTS.communityTrendingInsights;

  const rawText = await withRetry('generateCommunityInsights', async () => {
    const response = await ai.models.generateContent({
      model: AI_CONFIG.model,
      contents: [
        {
          role: 'user',
          parts: [{ text: JSON.stringify(feedIssues) }]
        }
      ],
      config: {
        systemInstruction: promptTemplate.systemInstruction,
        temperature: 0.1,
        responseMimeType: 'application/json',
      },
    });
    return response.text || '';
  });

  try {
    const cleanJson = rawText.replace(/```json\n?/gi, '').replace(/```\n?/g, '').trim();
    return JSON.parse(cleanJson) as CommunityTrendingInsights;
  } catch (error) {
    aiLogger.error('Failed to parse community insights', error, { rawText });
    throw new Error('Invalid JSON returned for community insights');
  }
}

export interface DuplicateDetectionResult {
  is_duplicate: boolean;
  duplicate_issue_id: string | null;
  reason: string | null;
}

export async function detectDuplicateIssue(targetIssue: Record<string, unknown>, recentIssues: Record<string, unknown>[]): Promise<DuplicateDetectionResult> {
  const apiKey = AI_CONFIG.getGeminiApiKey();
  const ai = new GoogleGenAI({ apiKey });
  const promptTemplate = PROMPTS.communityDuplicateDetection;

  const payload = {
    targetIssue,
    recentIssues
  };

  const rawText = await withRetry('detectDuplicateIssue', async () => {
    const response = await ai.models.generateContent({
      model: AI_CONFIG.model,
      contents: [
        {
          role: 'user',
          parts: [{ text: JSON.stringify(payload) }]
        }
      ],
      config: {
        systemInstruction: promptTemplate.systemInstruction,
        temperature: 0.1,
        responseMimeType: 'application/json',
      },
    });
    return response.text || '';
  });

  try {
    const cleanJson = rawText.replace(/```json\n?/gi, '').replace(/```\n?/g, '').trim();
    return JSON.parse(cleanJson) as DuplicateDetectionResult;
  } catch (error) {
    aiLogger.error('Failed to parse duplicate detection result', error, { rawText });
    throw new Error('Invalid JSON returned for duplicate detection');
  }
}

export interface CommentModerationResult {
  is_flagged: boolean;
  reason: string | null;
}

export async function analyzeCommentModeration(comment: string): Promise<CommentModerationResult> {
  const apiKey = AI_CONFIG.getGeminiApiKey();
  const ai = new GoogleGenAI({ apiKey });
  const promptTemplate = PROMPTS.communityModerationAssistance;

  const rawText = await withRetry('analyzeCommentModeration', async () => {
    const response = await ai.models.generateContent({
      model: AI_CONFIG.model,
      contents: [
        {
          role: 'user',
          parts: [{ text: comment }]
        }
      ],
      config: {
        systemInstruction: promptTemplate.systemInstruction,
        temperature: 0.1,
        responseMimeType: 'application/json',
      },
    });
    return response.text || '';
  });

  try {
    const cleanJson = rawText.replace(/```json\n?/gi, '').replace(/```\n?/g, '').trim();
    return JSON.parse(cleanJson) as CommentModerationResult;
  } catch (error) {
    aiLogger.error('Failed to parse comment moderation result', error, { rawText });
    throw new Error('Invalid JSON returned for comment moderation');
  }
}

// ==========================================
// Phase 9.7: Maps Intelligence
// ==========================================

export interface MapRegionalInsights {
  regional_summary: string;
  hotspots: string[];
  trends: string[];
}

export async function generateRegionalMapInsights(visibleIssues: Record<string, unknown>[]): Promise<MapRegionalInsights> {
  const apiKey = AI_CONFIG.getGeminiApiKey();
  const ai = new GoogleGenAI({ apiKey });
  const promptTemplate = PROMPTS.mapRegionalIntelligence;

  const rawText = await withRetry('generateRegionalMapInsights', async () => {
    const response = await ai.models.generateContent({
      model: AI_CONFIG.model,
      contents: [
        {
          role: 'user',
          parts: [{ text: JSON.stringify(visibleIssues) }]
        }
      ],
      config: {
        systemInstruction: promptTemplate.systemInstruction,
        temperature: 0.1,
        responseMimeType: 'application/json',
      },
    });
    return response.text || '';
  });

  try {
    const cleanJson = rawText.replace(/```json\n?/gi, '').replace(/```\n?/g, '').trim();
    return JSON.parse(cleanJson) as MapRegionalInsights;
  } catch (error) {
    aiLogger.error('Failed to parse regional map insights', error, { rawText });
    throw new Error('Invalid JSON returned for regional map insights');
  }
}

export interface MapLocationInsights {
  context: string;
  common_nearby: string;
  recommendations: string[];
}

export async function generateLocationMapInsights(targetIssue: Record<string, unknown>, nearbyIssues: Record<string, unknown>[]): Promise<MapLocationInsights> {
  const apiKey = AI_CONFIG.getGeminiApiKey();
  const ai = new GoogleGenAI({ apiKey });
  const promptTemplate = PROMPTS.mapLocationIntelligence;

  const payload = { targetIssue, nearbyIssues };

  const rawText = await withRetry('generateLocationMapInsights', async () => {
    const response = await ai.models.generateContent({
      model: AI_CONFIG.model,
      contents: [
        {
          role: 'user',
          parts: [{ text: JSON.stringify(payload) }]
        }
      ],
      config: {
        systemInstruction: promptTemplate.systemInstruction,
        temperature: 0.1,
        responseMimeType: 'application/json',
      },
    });
    return response.text || '';
  });

  try {
    const cleanJson = rawText.replace(/```json\n?/gi, '').replace(/```\n?/g, '').trim();
    return JSON.parse(cleanJson) as MapLocationInsights;
  } catch (error) {
    aiLogger.error('Failed to parse location map insights', error, { rawText });
    throw new Error('Invalid JSON returned for location map insights');
  }
}

// ==========================================
// Phase 9.8: Analytics Intelligence
// ==========================================

export interface ChartExplanation {
  explanation: string;
  insights: string[];
  recommendations: string[];
  anomalies: string[];
}

export async function generateChartExplanation(chartType: string, chartData: Record<string, unknown>[] | Record<string, unknown>): Promise<ChartExplanation> {
  const apiKey = AI_CONFIG.getGeminiApiKey();
  const ai = new GoogleGenAI({ apiKey });
  const promptTemplate = PROMPTS.adminChartExplanation;

  const payload = { chartType, chartData };

  const rawText = await withRetry('generateChartExplanation', async () => {
    const response = await ai.models.generateContent({
      model: AI_CONFIG.model,
      contents: [
        {
          role: 'user',
          parts: [{ text: JSON.stringify(payload) }]
        }
      ],
      config: {
        systemInstruction: promptTemplate.systemInstruction,
        temperature: 0.1,
        responseMimeType: 'application/json',
      },
    });
    return response.text || '';
  });

  try {
    const cleanJson = rawText.replace(/```json\n?/gi, '').replace(/```\n?/g, '').trim();
    return JSON.parse(cleanJson) as ChartExplanation;
  } catch (error) {
    aiLogger.error('Failed to parse chart explanation', error, { rawText });
    throw new Error('Invalid JSON returned for chart explanation');
  }
}
