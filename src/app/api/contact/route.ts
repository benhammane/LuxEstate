import { NextResponse } from "next/server";
import { z } from "zod";
import { contactSchema } from "@/schemas/contact";
import { sendEmail } from "@/lib/email";
import { ContactLeadEmail } from "@/emails/contact-lead";
import { rateLimit } from "@/lib/rate-limit";

const bodySchema = contactSchema.extend({
  propertyTitle: z.string().optional(),
});

export async function POST(request: Request) {
  const limited = rateLimit(request, "contact", 8);
  if (limited) return limited;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  const data = parsed.data;
  const to = process.env.CONTACT_INBOX ?? "leads@luxestate.demo";
  const { sent } = await sendEmail({
    to,
    subject: `Nouvelle demande — ${data.name}`,
    react: ContactLeadEmail({
      name: data.name,
      email: data.email,
      phone: data.phone || undefined,
      message: data.message,
      propertyTitle: data.propertyTitle,
    }),
  });

  return NextResponse.json({ ok: true, emailSent: sent }, { status: 200 });
}
