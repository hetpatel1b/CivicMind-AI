/**
 * Centralized Structured Logger
 * 
 * Provides consistent logging formats and automatically redacts sensitive information.
 * Suitable for ingestion by cloud logging providers (Datadog, CloudWatch, etc.).
 */

type LogLevel = 'INFO' | 'WARN' | 'ERROR';
type LogCategory = 'VALIDATION' | 'AUTH' | 'DATABASE' | 'SYSTEM' | 'HTTP';

interface LogPayload {
  category: LogCategory;
  message: string;
  metadata?: Record<string, unknown>;
  error?: unknown;
}

const REDACTED_KEYS = new Set(['password', 'token', 'authorization', 'secret', 'cookie', 'email']);

/**
 * Redacts sensitive fields from objects before logging.
 */
function redact(obj: unknown): unknown {
  if (typeof obj !== 'object' || obj === null) return obj;
  if (Array.isArray(obj)) return obj.map(redact);

  const redactedObj: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (REDACTED_KEYS.has(key.toLowerCase())) {
      redactedObj[key] = '[REDACTED]';
    } else {
      redactedObj[key] = typeof value === 'object' ? redact(value) : value;
    }
  }
  return redactedObj;
}

function formatLog(level: LogLevel, payload: LogPayload) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    level,
    category: payload.category,
    message: payload.message,
    metadata: payload.metadata ? redact(payload.metadata) : undefined,
    // Safely extract error message without leaking full stack traces if possible,
    // though in standard stdout we might include the stack. 
    // We will just stringify the error securely.
    error: payload.error instanceof Error ? { name: payload.error.name, message: payload.error.message, stack: payload.error.stack } : payload.error,
  };

  // In local dev, formatting as JSON is harder to read, but standard for production.
  // We'll use a single line JSON output.
  return JSON.stringify(logEntry);
}

export const logger = {
  info: (payload: LogPayload) => {
    console.info(formatLog('INFO', payload));
  },
  warn: (payload: LogPayload) => {
    console.warn(formatLog('WARN', payload));
  },
  error: (payload: LogPayload) => {
    console.error(formatLog('ERROR', payload));
  }
};
