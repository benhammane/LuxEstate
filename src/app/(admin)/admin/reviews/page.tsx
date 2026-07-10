import type { Metadata } from "next";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = { title: "Avis · Admin" };

const REVIEWS = [
  { author: "Hélène & Marc D.", property: "Villa contemporaine vue mer", rating: 5, text: "Accompagnement d'une élégance rare, vente conclue en trois semaines.", status: "Publié" },
  { author: "Alexandre P.", property: "Penthouse Triangle d'Or", rating: 5, text: "La plateforme est superbe et l'équipe encore plus.", status: "Publié" },
  { author: "Sofia R.", property: "Chalet alpin pieds des pistes", rating: 4, text: "Discrétion et réactivité au rendez-vous.", status: "En attente" },
  { author: "Jean-Pierre L.", property: "Mas provençal d'exception", rating: 5, text: "Un bien magnifique et un conseiller à l'écoute.", status: "Publié" },
];

export default function AdminReviewsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-semibold sm:text-3xl">Avis</h1>
        <p className="mt-1 text-muted-foreground">
          Modérez les avis clients.
        </p>
      </div>

      <div className="space-y-3">
        {REVIEWS.map((r, i) => (
          <div key={i} className="rounded-2xl border border-border bg-card p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{r.author}</span>
                  <span className="text-xs text-muted-foreground">·</span>
                  <span className="text-sm text-muted-foreground">{r.property}</span>
                </div>
                <div className="mt-1 flex gap-0.5 text-gold">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className={s < r.rating ? "size-4 fill-current" : "size-4 opacity-30"} />
                  ))}
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{r.text}</p>
              </div>
              <Badge variant={r.status === "Publié" ? "success" : "gold"}>
                {r.status}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
