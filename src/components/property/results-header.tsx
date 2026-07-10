"use client";

import { LayoutGrid, Map as MapIcon, Rows, BookmarkPlus } from "lucide-react";
import { toast } from "sonner";
import { usePropertyFilters } from "@/hooks/use-property-filters";
import { usePropertyUi } from "@/stores/property-ui";
import { useSavedSearches } from "@/stores/saved-searches";
import { Button } from "@/components/ui/button";
import { formatNumber, cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SORT_LABELS: Record<string, string> = {
  recent: "Plus récents",
  price_asc: "Prix croissant",
  price_desc: "Prix décroissant",
  popular: "Plus populaires",
};

export function ResultsHeader({ total }: { total: number }) {
  const [filters, setFilters] = usePropertyFilters();
  const { view, setView } = usePropertyUi();
  const addSearch = useSavedSearches((s) => s.add);

  function saveSearch() {
    const query =
      typeof window !== "undefined"
        ? window.location.search.replace(/^\?/, "")
        : "";
    const label =
      filters.q ||
      filters.city ||
      filters.type ||
      (filters.listingType === "RENT" ? "Locations" : "Achats");
    addSearch(`${label} · ${total} biens`, query);
    toast.success("Recherche enregistrée", {
      description: "Retrouvez-la dans votre tableau de bord.",
    });
  }

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p className="text-sm text-muted-foreground">
        <span className="font-semibold text-foreground">
          {formatNumber(total)}
        </span>{" "}
        {total > 1 ? "propriétés" : "propriété"}
      </p>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={saveSearch}
          className="hidden sm:inline-flex"
        >
          <BookmarkPlus className="size-4" />
          Sauvegarder
        </Button>

        {/* Mobile view switcher */}
        <div className="flex rounded-lg border border-border p-0.5 lg:hidden">
          {[
            { key: "list", icon: Rows },
            { key: "map", icon: MapIcon },
          ].map((v) => (
            <button
              key={v.key}
              onClick={() => setView(v.key as "list" | "map")}
              className={cn(
                "inline-flex size-8 items-center justify-center rounded-md transition-colors",
                view === v.key
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground",
              )}
            >
              <v.icon className="size-4" />
            </button>
          ))}
        </div>

        <Select
          value={filters.sort}
          onValueChange={(v) =>
            setFilters({ sort: v as keyof typeof SORT_LABELS, page: 1 })
          }
        >
          <SelectTrigger className="w-[180px]">
            <span className="flex items-center gap-2">
              <LayoutGrid className="size-4 text-muted-foreground" />
              <SelectValue />
            </span>
          </SelectTrigger>
          <SelectContent>
            {Object.entries(SORT_LABELS).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
