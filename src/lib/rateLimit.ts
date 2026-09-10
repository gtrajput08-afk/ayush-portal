interface RateLimitRecord {
  count: number;
  resetTime: number;
}

// In-memory store for rate limiting by client IP
const rateLimitStore = new Map<string, RateLimitRecord>();

// Periodic cleanup of expired entries every 5 minutes
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of rateLimitStore.entries()) {
      if (now > record.resetTime) {
        rateLimitStore.delete(key);
      }
    }
  }, 5 * 60 * 1000);
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

/**
 * Checks and updates the rate limit for a given key (e.g., client IP + route).
 * @param key Unique identifier (IP + endpoint)
 * @param maxRequests Maximum allowed requests within the window (default: 5)
 * @param windowMs Time window in milliseconds (default: 15 minutes = 900,000ms)
 */
export function checkRateLimit(
  key: string,
  maxRequests = 5,
  windowMs = 15 * 60 * 1000
): RateLimitResult {
  const now = Date.now();
  const existing = rateLimitStore.get(key);

  if (!existing || now > existing.resetTime) {
    // New or expired window
    rateLimitStore.set(key, {
      count: 1,
      resetTime: now + windowMs,
    });
    return {
      allowed: true,
      remaining: maxRequests - 1,
      retryAfterSeconds: Math.ceil(windowMs / 1000),
    };
  }

  if (existing.count >= maxRequests) {
    // Rate limit exceeded
    const retryAfter = Math.ceil((existing.resetTime - now) / 1000);
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: Math.max(1, retryAfter),
    };
  }

  // Increment count
  existing.count += 1;
  const retryAfter = Math.ceil((existing.resetTime - now) / 1000);
  return {
    allowed: true,
    remaining: maxRequests - existing.count,
    retryAfterSeconds: Math.max(1, retryAfter),
  };
}

/**
 * Extracts client IP from Next.js request headers.
 */
export function getClientIp(headers: Headers): string {
  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }
  const realIp = headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }
  return "127.0.0.1";
}
