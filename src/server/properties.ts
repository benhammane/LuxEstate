import "server-only";
import { properties, propertyBySlug } from "@/lib/data/properties";
import type {
  Paginated,
  Property,
  PropertyFilters,
  SortKey,
} from "@/types/property";

const DEFAULT_PER_PAGE = 9;

function sortProperties(list: Property[], sort: SortKey = "recent") {
  const arr = [...list];
  switch (sort) {
    case "price_asc":
      return arr.sort((a, b) => a.price - b.price);
    case "price_desc":
      return arr.sort((a, b) => b.price - a.price);
    case "popular":
      return arr.sort((a, b) => b.views - a.views);
    case "recent":
    default:
      // newest first: `isNew` then by id desc as a stable proxy for createdAt
      return arr.sort(
        (a, b) => Number(b.isNew) - Number(a.isNew) || Number(b.id) - Number(a.id),
      );
  }
}

function matches(p: Property, f: PropertyFilters): boolean {
  if (p.status !== "PUBLISHED") return false;
  if (f.listingType && p.listingType !== f.listingType) return false;
  if (f.type && p.type !== f.type) return false;

  if (f.q) {
    const q = f.q.toLowerCase();
    const haystack =
      `${p.title} ${p.city} ${p.district} ${p.region} ${p.postalCode ?? ""} ${p.type}`.toLowerCase();
    if (!haystack.includes(q)) return false;
  }
  if (f.city && p.city.toLowerCase() !== f.city.toLowerCase()) return false;
  if (f.minPrice != null && p.price < f.minPrice) return false;
  if (f.maxPrice != null && p.price > f.maxPrice) return false;
  if (f.minSurface != null && p.surface < f.minSurface) return false;
  if (f.maxSurface != null && p.surface > f.maxSurface) return false;
  if (f.bedrooms != null && p.bedrooms < f.bedrooms) return false;
  if (f.bathrooms != null && p.bathrooms < f.bathrooms) return false;

  if (f.amenities && f.amenities.length > 0) {
    const has = new Set(p.amenities);
    if (!f.amenities.every((a) => has.has(a))) return false;
  }

  if (f.bbox) {
    const [minLng, minLat, maxLng, maxLat] = f.bbox;
    if (
      p.longitude < minLng ||
      p.longitude > maxLng ||
      p.latitude < minLat ||
      p.latitude > maxLat
    )
      return false;
  }

  return true;
}

/** Full search: filter → sort → paginate. */
export async function queryProperties(
  filters: PropertyFilters = {},
): Promise<Paginated<Property>> {
  const page = Math.max(1, filters.page ?? 1);
  const perPage = filters.perPage ?? DEFAULT_PER_PAGE;

  const filtered = sortProperties(
    properties.filter((p) => matches(p, filters)),
    filters.sort,
  );

  const total = filtered.length;
  const start = (page - 1) * perPage;
  const items = filtered.slice(start, start + perPage);

  return {
    items,
    total,
    page,
    perPage,
    totalPages: Math.max(1, Math.ceil(total / perPage)),
  };
}

/** Lightweight variant returning every match (used to feed the map). */
export async function queryPropertiesForMap(
  filters: PropertyFilters = {},
): Promise<Property[]> {
  return sortProperties(
    properties.filter((p) => matches(p, { ...filters, bbox: undefined })),
    filters.sort,
  );
}

export async function getPropertyBySlug(slug: string) {
  return propertyBySlug(slug) ?? null;
}

export async function getFeaturedProperties(limit = 6) {
  return sortProperties(
    properties.filter((p) => p.featured && p.status === "PUBLISHED"),
    "popular",
  ).slice(0, limit);
}

export async function getSimilarProperties(property: Property, limit = 3) {
  return properties
    .filter(
      (p) =>
        p.id !== property.id &&
        p.status === "PUBLISHED" &&
        (p.city === property.city || p.type === property.type),
    )
    .slice(0, limit);
}

export async function getCities() {
  const set = new Map<string, number>();
  for (const p of properties) {
    if (p.status !== "PUBLISHED") continue;
    set.set(p.city, (set.get(p.city) ?? 0) + 1);
  }
  return [...set.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}
