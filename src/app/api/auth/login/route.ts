import { NextRequest, NextResponse } from "next/server";
import { loginUser, createSession, setSessionCookie } from "@/lib/auth";
import { clientIp, rateLimit, normalizeEmail } from "@/lib/security";
import { z } from "zod";

const schema = z.object({
  email: z.string().email().max(254),
  password: z.string().min(1).max(128),
});

export async function POST(req: NextRequest) {
  try {
    const ip = clientIp(req);
    const rl = rateLimit(`login:${ip}`, 10, 15 * 60 * 1000);
    if (!rl.ok) {
      return NextResponse.json(
        { error: "محاولات دخول كثيرة. انتظر قليلاً ثم أعد المحاولة." },
        { status: 429, headers: { "Retry-After": String(rl.retryAfterSec) } }
      );
    }

    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "بيانات غير صالحة" }, { status: 400 });
    }

    const user = await loginUser(
      normalizeEmail(parsed.data.email),
      parsed.data.password
    );
    const token = await createSession(user);
    await setSessionCookie(token);

    return NextResponse.json({ user });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "حدث خطأ";
    return NextResponse.json({ error: message }, { status: 401 });
  }
}
