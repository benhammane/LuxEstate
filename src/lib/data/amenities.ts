import type { LucideIcon } from "lucide-react";
import {
  Waves,
  Car,
  ArrowUpDown,
  Trees,
  Sofa,
  Flame,
  Wind,
  ShieldCheck,
  Dumbbell,
  UtensilsCrossed,
  Sun,
  Wifi,
} from "lucide-react";

export interface AmenityDef {
  slug: string;
  name: string;
  icon: LucideIcon;
}

/** Master list of amenities, used by filters and property pages. */
export const AMENITIES: AmenityDef[] = [
  { slug: "pool", name: "Piscine", icon: Waves },
  { slug: "garage", name: "Garage", icon: Car },
  { slug: "elevator", name: "Ascenseur", icon: ArrowUpDown },
  { slug: "garden", name: "Jardin", icon: Trees },
  { slug: "furnished", name: "Meublé", icon: Sofa },
  { slug: "fireplace", name: "Cheminée", icon: Flame },
  { slug: "ac", name: "Climatisation", icon: Wind },
  { slug: "security", name: "Sécurité 24/7", icon: ShieldCheck },
  { slug: "gym", name: "Salle de sport", icon: Dumbbell },
  { slug: "kitchen", name: "Cuisine équipée", icon: UtensilsCrossed },
  { slug: "terrace", name: "Terrasse", icon: Sun },
  { slug: "fiber", name: "Fibre optique", icon: Wifi },
];

export const AMENITY_MAP = new Map(AMENITIES.map((a) => [a.slug, a]));

export function amenityName(slug: string) {
  return AMENITY_MAP.get(slug)?.name ?? slug;
}
