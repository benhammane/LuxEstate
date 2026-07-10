"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Home, Euro } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const tabs = [
  { key: "SALE", label: "Acheter" },
  { key: "RENT", label: "Louer" },
] as const;

const propertyTypes = [
  "Tous types",
  "Villa",
  "Appartement",
  "Penthouse",
  "Chalet",
  "Propriété",
  "Loft",
];

export function HeroSearch() {
  const router = useRouter();
  const [listingType, setListingType] =
    React.useState<(typeof tabs)[number]["key"]>("SALE");
  const [location, setLocation] = React.useState("");
  const [type, setType] = React.useState("Tous types");
  const [budget, setBudget] = React.useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams({ listingType });
    if (location) params.set("q", location);
    if (type && type !== "Tous types") params.set("type", type);
    if (budget) params.set("maxPrice", budget);
    router.push(`/properties?${params.toString()}`);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="w-full rounded-2xl border border-border bg-background/80 p-2 shadow-lift backdrop-blur-xl sm:rounded-[1.75rem]"
    >
      <div className="flex gap-1 p-1">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setListingType(tab.key)}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
              listingType === tab.key
                ? "bg-primary text-primary-foreground shadow-soft"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-2 p-1 md:grid-cols-[1.4fr_1fr_1fr_auto]">
        <Field icon={<MapPin className="size-4" />} label="Localisation">
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Ville, quartier..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </Field>

        <Field icon={<Home className="size-4" />} label="Type de bien">
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full cursor-pointer bg-transparent text-sm outline-none"
          >
            {propertyTypes.map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </Field>

        <Field icon={<Euro className="size-4" />} label="Budget max">
          <input
            value={budget}
            onChange={(e) => setBudget(e.target.value.replace(/\D/g, ""))}
            inputMode="numeric"
            placeholder="Indifférent"
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </Field>

        <Button type="submit" size="lg" className="h-full min-h-13 md:w-14 md:px-0">
          <Search className="size-5" />
          <span className="md:hidden">Rechercher</span>
        </Button>
      </div>
    </form>
  );
}

function Field({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 transition-colors hover:bg-accent md:rounded-2xl">
      <span className="text-muted-foreground">{icon}</span>
      <span className="min-w-0 flex-1">
        <span className="block text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </span>
        {children}
      </span>
    </label>
  );
}
