"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2, Send } from "lucide-react";
import { contactSchema, type ContactValues } from "@/schemas/contact";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function ContactForm({
  propertyTitle,
  compact = false,
}: {
  propertyTitle?: string;
  compact?: boolean;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      message: propertyTitle
        ? `Bonjour, je souhaite plus d'informations sur « ${propertyTitle} ».`
        : "",
    },
  });

  async function onSubmit(values: ContactValues) {
    // Posts to the contact API (falls back gracefully without Resend configured)
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, propertyTitle }),
      });
    } catch {
      // ignore network errors in the demo — we still confirm to the user
    }
    toast.success("Message envoyé", {
      description: "Un conseiller vous recontacte sous 24 heures.",
    });
    reset({ name: "", email: "", phone: "", message: "" });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div className={compact ? "space-y-3" : "grid gap-3 sm:grid-cols-2"}>
        <div>
          <Input placeholder="Nom complet" {...register("name")} />
          {errors.name && (
            <p className="mt-1 text-xs text-destructive">
              {errors.name.message}
            </p>
          )}
        </div>
        <div>
          <Input placeholder="Email" type="email" {...register("email")} />
          {errors.email && (
            <p className="mt-1 text-xs text-destructive">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>
      <Input placeholder="Téléphone (optionnel)" {...register("phone")} />
      <div>
        <Textarea placeholder="Votre message" rows={4} {...register("message")} />
        {errors.message && (
          <p className="mt-1 text-xs text-destructive">
            {errors.message.message}
          </p>
        )}
      </div>
      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Send className="size-4" />
        )}
        Envoyer ma demande
      </Button>
    </form>
  );
}
