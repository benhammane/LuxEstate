import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { appointmentSchema } from "@/schemas/appointment";
import { sendEmail } from "@/lib/email";
import { AppointmentConfirmationEmail } from "@/emails/appointment-confirmation";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const limited = rateLimit(request, "appointments", 10);
  if (limited) return limited;

  const session = await auth();

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = appointmentSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  const data = parsed.data;
  const to = session?.user?.email ?? data.email;
  const name = session?.user?.name ?? data.name;

  const humanDate = format(new Date(data.date), "EEEE d MMMM yyyy", {
    locale: fr,
  });

  const { sent } = await sendEmail({
    to,
    subject: `Votre visite privée est confirmée — ${data.propertyTitle}`,
    react: AppointmentConfirmationEmail({
      name,
      propertyTitle: data.propertyTitle,
      propertyImage: data.propertyImage,
      city: data.city,
      agentName: data.agentName,
      date: humanDate,
      slot: data.slot,
      url: data.url,
    }),
  });

  return NextResponse.json({ ok: true, emailSent: sent }, { status: 201 });
}
