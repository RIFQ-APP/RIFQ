import { NextRequest, NextResponse } from "next/server";
import { registerUser, createSession, setSessionCookie } from "@/lib/auth";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("بريد إلكتروني غير صالح"),
  password: z.string().min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
  name: z.string().min(2).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0].message },
        { status: 400 }
      );
    }

    const user = await registerUser(
      parsed.data.email,
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
