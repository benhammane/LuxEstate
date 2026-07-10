"use client";

import * as React from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useFavorites } from "@/stores/favorites";
import { properties } from "@/lib/data/properties";
import { PropertyCard } from "@/components/property/property-card";
import { Button } from "@/components/ui/button";

export function FavoritesList() {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  const { ids, clear } = useFavorites();

  const favs = mounted ? properties.filter((p) => ids.includes(p.id)) : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-2xl font-semibold sm:text-3xl">
            Mes favoris
          </h1>
          <p className="mt-1 text-muted-foreground">
            {mounted ? favs.length : 0} propriété
            {favs.length > 1 ? "s" : ""} enregistrée{favs.length > 1 ? "s" : ""}.
          </p>
        </div>
        {favs.length > 0 && (
          <Button variant="ghost" size="sm" onClick={clear}>
            Tout retirer
          </Button>
        )}
      </div>

      {favs.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {favs.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-24 text-center">
          <Heart className="size-10 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">Aucun favori</h3>
          <p className="mt-1 max-w-sm text-sm text-muted-foreground">
            Cliquez sur le cœur d&apos;une annonce pour la retrouver ici.
          </p>
          <Button asChild className="mt-6">
            <Link href="/properties">Explorer les propriétés</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
