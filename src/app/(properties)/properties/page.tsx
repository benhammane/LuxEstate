import type { Metadata } from "next";
import {
  queryProperties,
  queryPropertiesForMap,
} from "@/server/properties";
import { PropertiesView } from "@/components/property/properties-view";
import type { PropertyFilters, SortKey } from "@/types/property";

export const metadata: Metadata = {
  title: "Rechercher un bien",
  description:
    "Explorez les propriétés d'exception LuxEstate sur carte interactive avec filtres avancés.",
};

type SearchParams = Record<string, string | string[] | undefined>;

function str(v: string | string[] | undefined) {
  return Array.isArray(v) ? v[0] : v;
}
function num(v: string | string[] | undefined) {
  const s = str(v);
  if (s == null || s === "") return undefined;
  const n = Number(s);
  return Number.isFinite(n) ? n : undefined;
}

function parseFilters(sp: SearchParams): PropertyFilters {
  const listingType = str(sp.listingType);
  const bboxRaw = str(sp.bbox);
  const bbox = bboxRaw
    ? (bboxRaw.split(",").map(Number) as [number, number, number, number])
    : undefined;

  return {
    q: str(sp.q),
    listingType:
      listingType === "SALE" || listingType === "RENT"
        ? listingType
        : undefined,
    type: str(sp.type),
    city: str(sp.city),
    minPrice: num(sp.minPrice),
    maxPrice: num(sp.maxPrice),
    minSurface: num(sp.minSurface),
    bedrooms: num(sp.bedrooms),
    bathrooms: num(sp.bathrooms),
    amenities: str(sp.amenities)?.split(",").filter(Boolean),
    sort: (str(sp.sort) as SortKey) ?? "recent",
    page: num(sp.page) ?? 1,
    bbox: bbox && bbox.length === 4 && bbox.every(Number.isFinite) ? bbox : undefined,
  };
}

export default async function PropertiesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const filters = parseFilters(await searchParams);

  const [results, mapItems] = await Promise.all([
    queryProperties(filters),
    queryPropertiesForMap(filters),
  ]);

  return (
    <div className="pt-18">
      <PropertiesView results={results} mapItems={mapItems} />
    </div>
  );
}
