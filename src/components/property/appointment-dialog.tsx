"use client";

import * as React from "react";
import { CalendarDays, Check, Clock, User } from "lucide-react";
import { toast } from "sonner";
import { format, isSameDay } from "date-fns";
import { fr } from "date-fns/locale";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { useAppointments } from "@/stores/appointments";
import { demoAgents } from "@/lib/demo-data";
import { cn } from "@/lib/utils";
import type { Property } from "@/types/property";

const SLOTS = ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00"];

export function AppointmentDialog({
  property,
  trigger,
}: {
  property: Property;
  trigger: React.ReactNode;
}) {
  const add = useAppointments((s) => s.add);
  const items = useAppointments((s) => s.items);
  const [date, setDate] = React.useState<Date | undefined>();
  const [slot, setSlot] = React.useState<string>();
  const [agent, setAgent] = React.useState(property.agent.name);
  const [open, setOpen] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);

  // Agent choices: the listing agent first, then a couple of alternates.
  const agents = React.useMemo(() => {
    const names = [property.agent.name];
    for (const a of demoAgents) {
      if (!names.includes(a.name) && names.length < 3) names.push(a.name);
    }
    return names;
  }, [property.agent.name]);

  // Slots already booked for this property on the selected day.
  const takenSlots = React.useMemo(() => {
    if (!date) return new Set<string>();
    return new Set(
      items
        .filter(
          (a) =>
            a.propertyId === property.id &&
            a.status === "CONFIRMED" &&
            isSameDay(new Date(a.date), date),
        )
        .map((a) => a.slot),
    );
  }, [items, date, property.id]);

  async function confirm() {
    if (!date || !slot) return;
    setSubmitting(true);
    add({
      propertyId: property.id,
      propertySlug: property.slug,
      propertyTitle: property.title,
      propertyImage: property.images[0],
      agentName: agent,
      date: date.toISOString(),
      slot,
    });

    // Fire the confirmation email (no-op without RESEND_API_KEY).
    try {
      await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          propertyTitle: property.title,
          propertyImage: property.images[0],
          city: property.city,
          agentName: agent,
          date: date.toISOString(),
          slot,
          email: "demo@luxestate.fr",
          url:
            typeof window !== "undefined"
              ? window.location.href
              : `https://luxestate.demo/properties/${property.slug}`,
        }),
      });
    } catch {
      /* demo tolerates network failure */
    }

    toast.success("Visite confirmée", {
      description: `${format(date, "EEEE d MMMM", { locale: fr })} à ${slot} avec ${agent}.`,
      icon: <Check className="size-4" />,
    });
    setSubmitting(false);
    setOpen(false);
    setDate(undefined);
    setSlot(undefined);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent
        title="Réserver une visite privée"
        description={`${property.title} · ${property.city}`}
        className="max-w-md"
      >
        <div className="mt-4 space-y-5">
          {/* Agent */}
          <div>
            <p className="mb-2 flex items-center gap-2 text-sm font-medium">
              <User className="size-4 text-primary" />
              Conseiller
            </p>
            <div className="flex flex-wrap gap-2">
              {agents.map((a) => (
                <button
                  key={a}
                  onClick={() => setAgent(a)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-sm transition-colors",
                    agent === a
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-muted-foreground hover:text-foreground",
                  )}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border">
            <div className="flex items-center gap-2 border-b border-border px-4 py-2.5 text-sm font-medium">
              <CalendarDays className="size-4 text-primary" />
              Choisir une date
            </div>
            <Calendar
              mode="single"
              selected={date}
              onSelect={(d) => {
                setDate(d);
                setSlot(undefined);
              }}
              disabled={{ before: new Date() }}
              className="mx-auto"
            />
          </div>

          {date && (
            <div>
              <p className="mb-2 flex items-center gap-2 text-sm font-medium">
                <Clock className="size-4 text-primary" />
                Créneaux disponibles
              </p>
              <div className="grid grid-cols-3 gap-2">
                {SLOTS.map((s) => {
                  const taken = takenSlots.has(s);
                  return (
                    <button
                      key={s}
                      disabled={taken}
                      onClick={() => setSlot(s)}
                      className={cn(
                        "rounded-lg border py-2 text-sm font-medium transition-colors",
                        taken && "cursor-not-allowed opacity-40 line-through",
                        slot === s
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border hover:bg-accent",
                      )}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <DialogClose asChild>
              <Button variant="secondary" className="flex-1">
                Annuler
              </Button>
            </DialogClose>
            <Button
              className="flex-1"
              disabled={!date || !slot || submitting}
              onClick={confirm}
            >
              Confirmer la visite
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
