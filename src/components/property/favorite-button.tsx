"use client";

import * as React from "react";
import { Heart } from "lucide-react";
import { useFavorites } from "@/stores/favorites";
import { cn } from "@/lib/utils";

export function FavoriteButton({
  propertyId,
  className,
  size = "md",
}: {
  propertyId: string;
  className?: string;
  size?: "md" | "lg";
}) {
  const { has, toggle } = useFavorites();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  const active = mounted && has(propertyId);

  return (
    <button
      type="button"
      aria-label={active ? "Retirer des favoris" : "Ajouter aux favoris"}
      aria-pressed={active}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(propertyId);
      }}
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-background/85 text-foreground/80 backdrop-blur transition-all hover:text-destructive",
        size === "md" ? "size-9" : "size-11",
        className,
      )}
    >
      <Heart
        className={cn(
          size === "md" ? "size-[18px]" : "size-5",
          active && "fill-destructive text-destructive",
        )}
      />
    </button>
  );
}
