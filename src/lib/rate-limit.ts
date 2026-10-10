interface RateLimitRecord {
  count: number;
  resetAt: number;
}

class MemoryRateLimiter {
  private cache = new Map<string, RateLimitRecord>();
  private readonly windowMs: number;
  private readonly maxLimit: number;

  constructor(windowMinutes = 10, maxLimit = 5) {
    this.windowMs = windowMinutes * 60 * 1000;
    this.maxLimit = maxLimit;

    // Periodic cleanup every 5 minutes
    if (typeof setInterval !== 'undefined') {
      setInterval(() => this.cleanup(), 5 * 60 * 1000).unref();
    }
  }

  public check(ip: string): { success: boolean; remaining: number; resetInSec: number } {
    const now = Date.now();
    const record = this.cache.get(ip);

    if (!record || now > record.resetAt) {
      this.cache.set(ip, {
        count: 1,
        resetAt: now + this.windowMs,
      });
      return { success: true, remaining: this.maxLimit - 1, resetInSec: Math.ceil(this.windowMs / 1000) };
    }

    if (record.count >= this.maxLimit) {
      const resetInSec = Math.max(1, Math.ceil((record.resetAt - now) / 1000));
      return { success: false, remaining: 0, resetInSec };
    }

    record.count += 1;
    this.cache.set(ip, record);
    const resetInSec = Math.max(1, Math.ceil((record.resetAt - now) / 1000));
    return { success: true, remaining: this.maxLimit - record.count, resetInSec };
  }

  private cleanup() {
    const now = Date.now();
    for (const [key, val] of this.cache.entries()) {
      if (now > val.resetAt) {
        this.cache.delete(key);
      }
    }
  }
}

// 5 submissions per 10 minutes per IP
export const leadRateLimiter = new MemoryRateLimiter(10, 5);

// 10 login attempts per 15 minutes per IP
export const authRateLimiter = new MemoryRateLimiter(15, 10);
