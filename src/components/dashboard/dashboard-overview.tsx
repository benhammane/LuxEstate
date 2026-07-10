"use client";

import * as React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Heart, CalendarDays, Bookmark, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useFavorites } from "@/stores/favorites";
import { useAppointments } from "@/stores/appointments";
import { useSavedSearches } from "@/stores/saved-searches";
import { properties } from "@/lib/data/properties";
import { PropertyCard } from "@/components/property/property-card";

export function DashboardOverview() {
  const { data: session } = useSession();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const favIds = useFavorites((s) => s.ids);
  const appts = useAppointments((s) => s.items);
  const searches = useSavedSearches((s) => s.items);

  const favProperties = mounted
    ? properties.filter((p) => favIds.includes(p.id)).slice(0, 3)
    : [];
  const upcoming = mounted
    ? appts
        .filter((a) => a.status === "CONFIRMED")
        .sort((a, b) => +new Date(a.date) - +new Date(b.date))[0]
    : undefined;

  const stats = [
    { label: "Favoris", value: mounted ? favIds.length : 0, icon: Heart, href: "/dashboard/favorites" },
    { label: "Rendez-vous", value: mounted ? appts.length : 0, icon: CalendarDays, href: "/dashboard/appointments" },
    { label: "Recherches", value: mounted ? searches.length : 0, icon: Bookmark, href: "/dashboard/saved-searches" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-2xl font-semibold sm:text-3xl">
          Bonjour {session?.user?.name?.split(" ")[0] ?? ""} 👋
        </h1>
        <p className="mt-1 text-muted-foreground">
          Voici un aperçu de votre activité sur LuxEstate.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="group rounded-2xl border border-border bg-card p-5 transition-colors hover:border-primary/40"
          >
            <div className="flex items-center justify-between">
              <div className="inline-flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <s.icon className="size-5" />
              </div>
              <ArrowRight className="size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
            <div className="mt-4 font-serif text-3xl font-semibold">
              {s.value}
            </div>
            <div className="text-sm text-muted-foreground">{s.label}</div>
          </Link>
        ))}
      </div>

      {/* Upcoming appointment */}
      {upcoming && (
        <div className="rounded-2xl border border-border bg-card p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Prochaine visite
          </h2>
          <div className="mt-3 flex items-center justify-between gap-4">
            <div>
              <div className="font-medium">{upcoming.propertyTitle}</div>
              <div className="text-sm text-muted-foreground">
                {format(new Date(upcoming.date), "EEEE d MMMM", { locale: fr })}{" "}
                à {upcoming.slot} · {upcoming.agentName}
              </div>
            </div>
            <Link
              href="/dashboard/appointments"
              className="text-sm font-medium text-primary hover:underline"
            >
              Gérer
            </Link>
          </div>
        </div>
      )}

      {/* Favorites preview */}
      <div>
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl font-semibold">Vos favoris</h2>
          <Link
            href="/dashboard/favorites"
            className="text-sm font-medium text-primary hover:underline"
          >
            Tout voir
          </Link>
        </div>
        {favProperties.length > 0 ? (
          <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {favProperties.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        ) : (
          <div className="mt-4 rounded-2xl border border-dashed border-border py-12 text-center text-sm text-muted-foreground">
            Vous n&apos;avez pas encore de favoris.{" "}
            <Link href="/properties" className="font-medium text-primary hover:underline">
              Explorer les propriétés
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
