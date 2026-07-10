import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Votre nom est requis"),
  email: z.string().email("Adresse email invalide"),
  phone: z
    .string()
    .min(6, "Numéro invalide")
    .optional()
    .or(z.literal("")),
  message: z.string().min(10, "Votre message est un peu court"),
});

export type ContactValues = z.infer<typeof contactSchema>;
