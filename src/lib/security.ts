import { NextRequest } from "next/server";

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

/** Simple in-memory rate limit (per isolate). Best-effort on serverless. */
export function rateLimit(
  key: string,
  limit: number,
  windowMs: number
): { ok: boolean; retryAfterSec: number } {
  const now = Date.now();
  const b = buckets.get(key);
  if (!b || now > b.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfterSec: 0 };
  }
  if (b.count >= limit) {
    return { ok: false, retryAfterSec: Math.ceil((b.resetAt - now) / 1000) };
  }
  b.count += 1;
  return { ok: true, retryAfterSec: 0 };
}

export function clientIp(req: NextRequest): string {
  const xf = req.headers.get("x-forwarded-for");
  if (xf) return xf.split(",")[0]?.trim() || "unknown";
  return req.headers.get("x-real-ip") || "unknown";
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

/** Basic password strength for registration */
export function passwordIssues(password: string): string | null {
  if (password.length < 8) return "كلمة المرور يجب ألا تقل عن 8 أحرف";
  if (password.length > 128) return "كلمة المرور طويلة جداً";
  if (!/[A-Za-z\u0600-\u06FF]/.test(password) || !/[0-9]/.test(password)) {
    return "استخدم حروفاً وأرقاماً في كلمة المرور";
  }
  return null;
}

export function jsonError(message: string, status: number, extra?: Record<string, string | number>) {
  return Response.json({ error: message, ...extra }, { status });
}
