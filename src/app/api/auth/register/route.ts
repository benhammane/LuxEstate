import { NextResponse } from "next/server";
import { registerSchema } from "@/schemas/auth";
import { createUser } from "@/lib/auth/users";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  try {
    const user = await createUser({
      name: parsed.data.name,
      email: parsed.data.email,
      password: parsed.data.password,
    });
    return NextResponse.json(
      { ok: true, user: { id: user.id, email: user.email } },
      { status: 201 },
    );
  } catch (e) {
    if (e instanceof Error && e.message === "EMAIL_TAKEN") {
      return NextResponse.json(
        { error: "Un compte existe déjà avec cet email." },
        { status: 409 },
      );
    }
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
