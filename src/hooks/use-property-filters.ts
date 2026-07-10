"use client";

import {
  useQueryStates,
  parseAsString,
  parseAsInteger,
  parseAsArrayOf,
  parseAsStringLiteral,
} from "nuqs";

const sortValues = ["recent", "price_asc", "price_desc", "popular"] as const;
const listingValues = ["SALE", "RENT"] as const;

/** URL-synced property filters. `shallow: false` re-renders the server page. */
export function usePropertyFilters() {
  return useQueryStates(
    {
      q: parseAsString.withDefault(""),
      listingType: parseAsStringLiteral(listingValues),
      type: parseAsString,
      city: parseAsString,
      minPrice: parseAsInteger,
      maxPrice: parseAsInteger,
      minSurface: parseAsInteger,
      bedrooms: parseAsInteger,
      bathrooms: parseAsInteger,
      amenities: parseAsArrayOf(parseAsString).withDefault([]),
      sort: parseAsStringLiteral(sortValues).withDefault("recent"),
      page: parseAsInteger.withDefault(1),
      bbox: parseAsString, // "west,south,east,north"
    },
    { shallow: false, history: "replace", clearOnDefault: true },
  );
}

export type FilterState = ReturnType<typeof usePropertyFilters>[0];
