import type { Metadata } from "next";
import { CalendarCheck, Heart, Sparkles, Home } from "lucide-react";

export const metadata: Metadata = { title: "Notifications" };

const NOTIFICATIONS = [
  {
    icon: CalendarCheck,
    title: "Visite confirmée",
    body: "Votre visite de la Villa contemporaine vue mer est confirmée.",
    time: "Il y a 2 h",
    unread: true,
  },
  {
    icon: Home,
    title: "Nouveau bien correspondant",
    body: "Un penthouse à Nice correspond à votre recherche enregistrée.",
    time: "Hier",
    unread: true,
  },
  {
    icon: Heart,
    title: "Baisse de prix",
    body: "Le prix d'un de vos favoris a baissé de 5 %.",
    time: "Il y a 3 jours",
    unread: false,
  },
  {
    icon: Sparkles,
    title: "Bienvenue sur LuxEstate",
    body: "Découvrez nos propriétés d'exception et réservez vos visites privées.",
    time: "Il y a 1 semaine",
    unread: false,
  },
];

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-semibold sm:text-3xl">
          Notifications
        </h1>
        <p className="mt-1 text-muted-foreground">
          Vos alertes et mises à jour récentes.
        </p>
      </div>

      <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
        {NOTIFICATIONS.map((n, i) => (
          <div
            key={i}
            className="flex gap-4 p-4 transition-colors hover:bg-accent/50"
          >
            <div className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <n.icon className="size-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-medium">{n.title}</h3>
                {n.unread && (
                  <span className="size-2 rounded-full bg-primary" />
                )}
              </div>
              <p className="mt-0.5 text-sm text-muted-foreground">{n.body}</p>
            </div>
            <span className="shrink-0 text-xs text-muted-foreground">
              {n.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
