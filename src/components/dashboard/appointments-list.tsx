"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { CalendarDays, Clock, User, X, CalendarPlus } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { toast } from "sonner";
import { useAppointments } from "@/stores/appointments";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function AppointmentsList() {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  const { items, cancel, remove } = useAppointments();

  const list = mounted ? items : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-semibold sm:text-3xl">
          Mes rendez-vous
        </h1>
        <p className="mt-1 text-muted-foreground">
          Gérez vos visites privées.
        </p>
      </div>

      {list.length > 0 ? (
        <div className="space-y-3">
          {list.map((a) => {
            const cancelled = a.status === "CANCELLED";
            return (
              <div
                key={a.id}
                className={cn(
                  "flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 sm:flex-row sm:items-center",
                  cancelled && "opacity-60",
                )}
              >
                <Link
                  href={`/properties/${a.propertySlug}`}
                  className="relative h-20 w-full shrink-0 overflow-hidden rounded-xl sm:w-28"
                >
                  <Image
                    src={a.propertyImage}
                    alt={a.propertyTitle}
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                </Link>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="truncate font-medium">{a.propertyTitle}</h3>
                    {cancelled && <Badge variant="muted">Annulé</Badge>}
                  </div>
                  <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <CalendarDays className="size-4" />
                      {format(new Date(a.date), "EEEE d MMMM yyyy", {
                        locale: fr,
                      })}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="size-4" />
                      {a.slot}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <User className="size-4" />
                      {a.agentName}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  {cancelled ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => remove(a.id)}
                    >
                      Supprimer
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        cancel(a.id);
                        toast("Rendez-vous annulé");
                      }}
                    >
                      <X className="size-4" />
                      Annuler
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-24 text-center">
          <CalendarPlus className="size-10 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">Aucun rendez-vous</h3>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            Réservez une visite privée depuis la fiche d&apos;une propriété.
          </p>
          <Button asChild className="mt-6">
            <Link href="/properties">Trouver un bien à visiter</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
