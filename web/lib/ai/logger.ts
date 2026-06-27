import { logger } from '@/lib/logger';

/**
 * Centralized Logging Layer for AI Infrastructure.
 * Ensures consistent log formatting and prevents secret leakage.
 */
export const aiLogger = {
  info: (message: string, meta?: Record<string, unknown>) => {
    logger.info({
      category: 'SYSTEM',
      message,
      ...meta
    });
  },
  warn: (message: string, meta?: Record<string, unknown>) => {
    logger.warn({
      category: 'SYSTEM',
      message,
      ...meta
    });
  },
  error: (message: string, error?: unknown, meta?: Record<string, unknown>) => {
    logger.error({
      category: 'SYSTEM',
      message,
      error,
      ...meta
    });
  }
};
