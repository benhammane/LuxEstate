import { z } from "zod";

export const appointmentSchema = z.object({
  name: z.string().min(1).default("Client"),
  email: z.string().email(),
  propertyTitle: z.string().min(1),
  propertyImage: z.string().url(),
  city: z.string().min(1),
  agentName: z.string().min(1),
  date: z.string(), // ISO
  slot: z.string(),
  url: z.string().url(),
});

export type AppointmentPayload = z.infer<typeof appointmentSchema>;
