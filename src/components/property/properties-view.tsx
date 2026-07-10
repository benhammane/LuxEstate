"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { SlidersHorizontal, Loader2 } from "lucide-react";
import { PropertyResults } from "@/components/property/property-results";
import { ResultsHeader } from "@/components/property/results-header";
import { Pagination } from "@/components/property/pagination";
import { PropertyFilters } from "@/components/property/property-filters";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePropertyUi } from "@/stores/property-ui";
import { cn } from "@/lib/utils";
import type { Paginated, Property } from "@/types/property";

const MapCanvas = dynamic(
  () => import("@/components/map/map-canvas").then((m) => m.MapCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="flex size-full items-center justify-center bg-muted">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    ),
  },
);

export function PropertiesView({
  results,
  mapItems,
}: {
  results: Paginated<Property>;
  mapItems: Property[];
}) {
  const { view } = usePropertyUi();

  return (
    <div className="flex flex-col lg:flex-row">
      {/* List column */}
      <section
        className={cn(
          "w-full lg:w-[58%] xl:w-[60%]",
          view === "map" && "hidden lg:block",
        )}
      >
        <div className="mx-auto max-w-4xl px-5 py-6 sm:px-8">
          <div className="flex items-center gap-3">
            {/* Desktop filters live in a drawer to keep the map prominent */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="secondary" size="sm">
                  <SlidersHorizontal className="size-4" />
                  Filtres
                </Button>
              </SheetTrigger>
              <SheetContent side="left" title="Filtres">
                <PropertyFilters />
              </SheetContent>
            </Sheet>
            <div className="flex-1">
              <ResultsHeader total={results.total} />
            </div>
          </div>

          <div className="mt-6">
            <PropertyResults items={results.items} columns={2} />
          </div>

          <Pagination page={results.page} totalPages={results.totalPages} />
        </div>
      </section>

      {/* Map column */}
      <aside
        className={cn(
          "sticky top-18 h-[calc(100vh-4.5rem)] lg:w-[42%] xl:w-[40%]",
          view === "map" ? "block" : "hidden lg:block",
        )}
      >
        <MapCanvas items={mapItems} />
      </aside>
    </div>
  );
}
