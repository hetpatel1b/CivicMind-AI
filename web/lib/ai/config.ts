/**
 * Centralized Configuration Layer for AI Infrastructure.
 * Isolates environment variables and default parameters.
 */
export const AI_CONFIG = {
  getGeminiApiKey: () => {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error('GEMINI_API_KEY is missing from environment variables.');
    }
    return key;
  },
  model: 'gemini-2.5-flash',
  defaults: {
    temperature: 0.1, // Highly deterministic
    responseMimeType: 'application/json',
    maxRetries: 3,
    initialRetryDelayMs: 1000,
  }
};
