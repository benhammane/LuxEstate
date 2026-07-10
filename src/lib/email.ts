import "server-only";
import { render } from "@react-email/render";
import type { ReactElement } from "react";

/**
 * Sends an email through Resend when configured, otherwise logs it (so the demo
 * works without an API key). Returns whether it was actually dispatched.
 */
export async function sendEmail({
  to,
  subject,
  react,
}: {
  to: string;
  subject: string;
  react: ReactElement;
}): Promise<{ sent: boolean }> {
  const html = await render(react);

  if (!process.env.RESEND_API_KEY) {
    console.info(
      `[email] (demo, not sent) → ${to} · ${subject}\n${html.slice(0, 120)}…`,
    );
    return { sent: false };
  }

  const { Resend } = await import("resend");
  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({
    from: process.env.RESEND_FROM ?? "LuxEstate <onboarding@resend.dev>",
    to,
    subject,
    html,
  });
  return { sent: true };
}
