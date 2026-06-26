/**
 * Lightweight In-Memory Rate Limiter.
 * 
 * DESIGN NOTES:
 * - This is an in-memory implementation intended for development and simple production environments.
 * - In a serverless/edge environment (like Next.js on Vercel), this state resets on cold starts
 *   and does not share state across multiple instances. 
 * - For a distributed production environment, replace this with an Upstash Redis rate limiter,
 *   while preserving the identical `rateLimit(ip)` interface below.
 */

export interface RateLimitConfig {
  interval: number; // Interval in milliseconds (e.g., 60000 for 1 minute)
  maxRequests: number; // Max requests allowed within the interval
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
}

// Global store tracking request counts and timestamps by IP address.
const store = new Map<string, { count: number; startTime: number }>();

/**
 * Checks and increments the rate limit for a given IP.
 * @param ip The IP address of the requester.
 * @param config Optional configuration overriding defaults.
 * @returns RateLimitResult indicating success and remaining capacity.
 */
export function rateLimit(
  ip: string,
  config: RateLimitConfig = { interval: 60 * 1000, maxRequests: 30 } // 30 requests per minute default
): RateLimitResult {
  const now = Date.now();
  const record = store.get(ip);

  // If no record exists or the interval has expired, reset it
  if (!record || now - record.startTime > config.interval) {
    store.set(ip, { count: 1, startTime: now });
    return { success: true, limit: config.maxRequests, remaining: config.maxRequests - 1 };
  }

  // If the record exists and max requests reached
  if (record.count >= config.maxRequests) {
    return { success: false, limit: config.maxRequests, remaining: 0 };
  }

  // Otherwise, increment the count
  record.count += 1;
  store.set(ip, record);
  return { success: true, limit: config.maxRequests, remaining: config.maxRequests - record.count };
}
