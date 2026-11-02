import { NextRequest, NextResponse } from "next/server";
import { registerUser, createSession, setSessionCookie } from "@/lib/auth";
import { clientIp, rateLimit, normalizeEmail } from "@/lib/security";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("بريد إلكتروني غير صالح").max(254),
  password: z.string().min(8).max(128),
  name: z.string().min(2).max(80).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const ip = clientIp(req);
    const rl = rateLimit(`register:${ip}`, 5, 15 * 60 * 1000);
    if (!rl.ok) {
      return NextResponse.json(
        { error: "محاولات كثيرة. حاول لاحقاً." },
        { status: 429, headers: { "Retry-After": String(rl.retryAfterSec) } }
      );
    }

    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0]?.message || "بيانات غير صالحة" },
        { status: 400 }
      );
    }

    const user = await registerUser(
      normalizeEmail(parsed.data.email),
      parsed.data.password,
      parsed.data.name
    );
    const token = await createSession(user);
    await setSessionCookie(token);

    return NextResponse.json({ user });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "حدث خطأ";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
