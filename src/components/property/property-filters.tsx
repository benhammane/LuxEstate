"use client";

import * as React from "react";
import { Search, RotateCcw } from "lucide-react";
import { cn, formatPrice } from "@/lib/utils";
import { usePropertyFilters } from "@/hooks/use-property-filters";
import { AMENITIES } from "@/lib/data/amenities";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

const PROPERTY_TYPES = [
  "Villa",
  "Appartement",
  "Penthouse",
  "Maison",
  "Chalet",
  "Loft",
  "Propriété",
];

const ROOM_OPTIONS = [1, 2, 3, 4, 5];

export function PropertyFilters({ className }: { className?: string }) {
  const [filters, setFilters] = usePropertyFilters();
  const isRent = filters.listingType === "RENT";
  const priceCeiling = isRent ? 50_000 : 30_000_000;
  const priceStep = isRent ? 500 : 100_000;

  // Local, debounced text search
  const [q, setQ] = React.useState(filters.q ?? "");
  React.useEffect(() => setQ(filters.q ?? ""), [filters.q]);
  React.useEffect(() => {
    const t = setTimeout(() => {
      if (q !== (filters.q ?? "")) setFilters({ q: q || null, page: 1 });
    }, 350);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  const priceValue: [number, number] = [
    filters.minPrice ?? 0,
    filters.maxPrice ?? priceCeiling,
  ];

  function reset() {
    setFilters({
      q: null,
      type: null,
      city: null,
      minPrice: null,
      maxPrice: null,
      minSurface: null,
      bedrooms: null,
      bathrooms: null,
      amenities: [],
      page: 1,
    });
  }

  function toggleAmenity(slug: string) {
    const set = new Set(filters.amenities);
    if (set.has(slug)) set.delete(slug);
    else set.add(slug);
    setFilters({ amenities: [...set], page: 1 });
  }

  return (
    <div className={cn("flex flex-col gap-7", className)}>
      {/* Search */}
      <div>
        <label className="mb-2 block text-sm font-medium">Localisation</label>
        <div className="flex items-center gap-2 rounded-lg border border-input bg-background px-3">
          <Search className="size-4 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Ville, quartier, code postal..."
            className="h-10 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Listing type */}
      <FilterGroup label="Transaction">
        <div className="grid grid-cols-3 gap-1 rounded-lg bg-muted p-1">
          {[
            { key: null, label: "Tout" },
            { key: "SALE", label: "Achat" },
            { key: "RENT", label: "Location" },
          ].map((opt) => (
            <button
              key={opt.label}
              onClick={() =>
                setFilters({
                  listingType: opt.key as "SALE" | "RENT" | null,
                  minPrice: null,
                  maxPrice: null,
                  page: 1,
                })
              }
              className={cn(
                "rounded-md py-1.5 text-sm font-medium transition-colors",
                filters.listingType === opt.key
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </FilterGroup>

      {/* Property type */}
      <FilterGroup label="Type de bien">
        <div className="flex flex-wrap gap-2">
          {PROPERTY_TYPES.map((t) => {
            const active = filters.type === t;
            return (
              <button
                key={t}
                onClick={() => setFilters({ type: active ? null : t, page: 1 })}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-sm transition-colors",
                  active
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground",
                )}
              >
                {t}
              </button>
            );
          })}
        </div>
      </FilterGroup>

      {/* Price */}
      <FilterGroup label="Budget">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{formatPrice(priceValue[0], { compact: true })}</span>
          <span>
            {formatPrice(priceValue[1], { compact: true })}
            {priceValue[1] >= priceCeiling && "+"}
          </span>
        </div>
        <Slider
          className="mt-3"
          min={0}
          max={priceCeiling}
          step={priceStep}
          value={priceValue}
          onValueChange={([min, max]) =>
            setFilters({
              minPrice: min > 0 ? min : null,
              maxPrice: max < priceCeiling ? max : null,
              page: 1,
            })
          }
        />
      </FilterGroup>

      {/* Bedrooms */}
      <FilterGroup label="Chambres">
        <RoomSelector
          value={filters.bedrooms}
          onChange={(v) => setFilters({ bedrooms: v, page: 1 })}
        />
      </FilterGroup>

      {/* Bathrooms */}
      <FilterGroup label="Salles de bain">
        <RoomSelector
          value={filters.bathrooms}
          onChange={(v) => setFilters({ bathrooms: v, page: 1 })}
        />
      </FilterGroup>

      {/* Amenities */}
      <FilterGroup label="Équipements">
        <div className="grid grid-cols-1 gap-2.5">
          {AMENITIES.map((a) => {
            const checked = filters.amenities.includes(a.slug);
            return (
              <label
                key={a.slug}
                className="flex cursor-pointer items-center gap-3 text-sm"
              >
                <Checkbox
                  checked={checked}
                  onCheckedChange={() => toggleAmenity(a.slug)}
                />
                <a.icon className="size-4 text-muted-foreground" />
                <span>{a.name}</span>
              </label>
            );
          })}
        </div>
      </FilterGroup>

      <Button variant="ghost" onClick={reset} className="justify-start">
        <RotateCcw className="size-4" />
        Réinitialiser les filtres
      </Button>
    </div>
  );
}

function FilterGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="mb-3 text-sm font-medium">{label}</h3>
      {children}
    </div>
  );
}

function RoomSelector({
  value,
  onChange,
}: {
  value: number | null;
  onChange: (v: number | null) => void;
}) {
  return (
    <div className="flex gap-1.5">
      <button
        onClick={() => onChange(null)}
        className={cn(
          "flex-1 rounded-lg border py-1.5 text-sm transition-colors",
          value == null
            ? "border-primary bg-primary/10 text-primary"
            : "border-border text-muted-foreground hover:text-foreground",
        )}
      >
        Tout
      </button>
      {ROOM_OPTIONS.map((n) => (
        <button
          key={n}
          onClick={() => onChange(n)}
          className={cn(
            "flex-1 rounded-lg border py-1.5 text-sm transition-colors",
            value === n
              ? "border-primary bg-primary/10 text-primary"
              : "border-border text-muted-foreground hover:text-foreground",
          )}
        >
          {n}
          {n === 5 && "+"}
        </button>
      ))}
    </div>
  );
}
