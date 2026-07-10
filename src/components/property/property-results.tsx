"use client";

import { SearchX } from "lucide-react";
import { PropertyCard } from "@/components/property/property-card";
import { usePropertyUi } from "@/stores/property-ui";
import { cn } from "@/lib/utils";
import type { Property } from "@/types/property";

export function PropertyResults({
  items,
  columns = 2,
}: {
  items: Property[];
  columns?: 2 | 3;
}) {
  const { activeId, setActiveId } = usePropertyUi();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-24 text-center">
        <SearchX className="size-10 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-semibold">Aucun bien trouvé</h3>
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">
          Ajustez vos critères de recherche ou élargissez la zone pour découvrir
          davantage de propriétés.
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid gap-6",
        columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3",
      )}
    >
      {items.map((property, i) => (
        <PropertyCard
          key={property.id}
          property={property}
          priority={i < 4}
          active={activeId === property.id}
          onMouseEnter={() => setActiveId(property.id)}
          onMouseLeave={() => setActiveId(null)}
        />
      ))}
    </div>
  );
}
