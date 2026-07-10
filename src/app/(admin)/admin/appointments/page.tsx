"use client";

import * as React from "react";
import Image from "next/image";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useAppointments } from "@/stores/appointments";
import { Badge } from "@/components/ui/badge";
import { CalendarClock } from "lucide-react";

export default function AdminAppointmentsPage() {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  const items = useAppointments((s) => s.items);
  const list = mounted ? items : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-semibold sm:text-3xl">
          Rendez-vous
        </h1>
        <p className="mt-1 text-muted-foreground">
          {list.length} visite{list.length > 1 ? "s" : ""} planifiée
          {list.length > 1 ? "s" : ""}.
        </p>
      </div>

      {list.length > 0 ? (
        <div className="overflow-hidden rounded-2xl border border-border">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-muted/40 text-left text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium">Bien</th>
                  <th className="px-4 py-3 font-medium">Date</th>
                  <th className="px-4 py-3 font-medium">Créneau</th>
                  <th className="px-4 py-3 font-medium">Conseiller</th>
                  <th className="px-4 py-3 font-medium">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {list.map((a) => (
                  <tr key={a.id} className="hover:bg-accent/40">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative size-10 shrink-0 overflow-hidden rounded-lg">
                          <Image src={a.propertyImage} alt="" fill sizes="40px" className="object-cover" />
                        </div>
                        <span className="font-medium">{a.propertyTitle}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {format(new Date(a.date), "d MMM yyyy", { locale: fr })}
                    </td>
                    <td className="px-4 py-3">{a.slot}</td>
                    <td className="px-4 py-3 text-muted-foreground">{a.agentName}</td>
                    <td className="px-4 py-3">
                      <Badge variant={a.status === "CONFIRMED" ? "success" : "muted"}>
                        {a.status === "CONFIRMED" ? "Confirmé" : "Annulé"}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-24 text-center">
          <CalendarClock className="size-10 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">Aucun rendez-vous</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Les visites réservées par les clients apparaîtront ici.
          </p>
        </div>
      )}
    </div>
  );
}
