export type ListingType = "SALE" | "RENT";

export type PropertyType =
  | "Villa"
  | "Appartement"
  | "Penthouse"
  | "Maison"
  | "Chalet"
  | "Loft"
  | "Propriété"
  | "Terrain";

export type EnergyRating = "A" | "B" | "C" | "D" | "E" | "F" | "G";

export type PropertyStatus =
  | "DRAFT"
  | "PENDING"
  | "PUBLISHED"
  | "SOLD"
  | "RENTED";

export interface Agent {
  name: string;
  title: string;
  photo: string;
  phone?: string;
}

export interface Property {
  id: string;
  slug: string;
  title: string;
  description: string;
  listingType: ListingType;
  type: PropertyType;
  status: PropertyStatus;
  price: number;
  currency: string;
  surface: number;
  landSize?: number;
  bedrooms: number;
  bathrooms: number;
  floors?: number;
  yearBuilt?: number;
  energyRating?: EnergyRating;
  city: string;
  district: string;
  region: string;
  postalCode?: string;
  latitude: number;
  longitude: number;
  featured: boolean;
  confidential: boolean;
  isNew: boolean;
  views: number;
  images: string[];
  amenities: string[];
  agent: Agent;
}

export type SortKey = "recent" | "price_asc" | "price_desc" | "popular";

export interface PropertyFilters {
  q?: string;
  listingType?: ListingType;
  type?: PropertyType | string;
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  minSurface?: number;
  maxSurface?: number;
  bedrooms?: number;
  bathrooms?: number;
  amenities?: string[];
  sort?: SortKey;
  page?: number;
  perPage?: number;
  // geographic bounds (map "search this area")
  bbox?: [number, number, number, number]; // [minLng, minLat, maxLng, maxLat]
}

export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}
