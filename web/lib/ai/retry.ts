import { aiLogger } from './logger';
import { AI_CONFIG } from './config';

/**
 * Retry Layer for AI Infrastructure.
 * Standardizes exponential backoff logic across all AI service calls.
 */

export async function withRetry<T>(
  operationName: string,
  operation: () => Promise<T>,
  maxAttempts: number = AI_CONFIG.defaults.maxRetries
): Promise<T> {
  let attempts = 0;

  while (attempts < maxAttempts) {
    attempts++;
    try {
      return await operation();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      aiLogger.warn(`[${operationName}] Attempt ${attempts} failed: ${message}`);

      if (attempts >= maxAttempts) {
        aiLogger.error(`[${operationName}] Failed definitively after ${maxAttempts} attempts.`, error);
        throw new Error(`AI Operation '${operationName}' failed after ${maxAttempts} attempts: ${message}`);
      }

      // Wait before retrying (Exponential Backoff: 1s, 2s, 3s...)
      const delayMs = AI_CONFIG.defaults.initialRetryDelayMs * attempts;
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    }
  }

  throw new Error(`AI Operation '${operationName}' failed due to an unknown error.`);
}
