"use client";

import * as React from "react";
import Link from "next/link";
import { Bookmark, Search, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { useSavedSearches } from "@/stores/saved-searches";
import { Button } from "@/components/ui/button";

export function SavedSearchesList() {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  const { items, remove } = useSavedSearches();
  const list = mounted ? items : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-semibold sm:text-3xl">
          Recherches enregistrées
        </h1>
        <p className="mt-1 text-muted-foreground">
          Retrouvez vos critères en un clic.
        </p>
      </div>

      {list.length > 0 ? (
        <div className="space-y-3">
          {list.map((s) => (
            <div
              key={s.id}
              className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-card p-4"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="inline-flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Search className="size-5" />
                </div>
                <div className="min-w-0">
                  <div className="truncate font-medium">{s.name}</div>
                  <div className="text-xs text-muted-foreground">
                    Enregistrée le{" "}
                    {format(new Date(s.createdAt), "d MMM yyyy", { locale: fr })}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button asChild size="sm" variant="secondary">
                  <Link href={`/properties?${s.query}`}>Ouvrir</Link>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-9"
                  onClick={() => remove(s.id)}
                  aria-label="Supprimer"
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-24 text-center">
          <Bookmark className="size-10 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">Aucune recherche</h3>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            Enregistrez une recherche depuis la page des résultats pour la
            retrouver ici.
          </p>
          <Button asChild className="mt-6">
            <Link href="/properties">Lancer une recherche</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
