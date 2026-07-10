"use client";

import Image from "next/image";
import Link from "next/link";
import { Bed, Bath, Maximize, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FavoriteButton } from "@/components/property/favorite-button";
import { formatPrice, formatNumber, cn } from "@/lib/utils";
import type { Property } from "@/types/property";

export function PropertyCard({
  property,
  priority = false,
  active = false,
  className,
  onMouseEnter,
  onMouseLeave,
}: {
  property: Property;
  priority?: boolean;
  active?: boolean;
  className?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) {
  const isRent = property.listingType === "RENT";

  return (
    <article
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={cn(
        "group relative overflow-hidden rounded-2xl border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift",
        active ? "border-primary ring-2 ring-primary/30" : "border-border",
        className,
      )}
    >
      <Link href={`/properties/${property.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={property.images[0]}
            alt={property.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={priority}
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

          <div className="absolute left-3 top-3 flex gap-2">
            {property.featured && <Badge variant="gold">Signature</Badge>}
            {property.isNew && <Badge>Nouveauté</Badge>}
            {property.confidential && <Badge variant="muted">Off-market</Badge>}
          </div>

          <FavoriteButton
            propertyId={property.id}
            className="absolute right-3 top-3"
          />

          <div className="absolute bottom-3 left-3">
            <span className="rounded-full bg-background/90 px-3 py-1 text-sm font-semibold text-foreground backdrop-blur">
              {formatPrice(property.price)}
              {isRent && (
                <span className="font-normal text-muted-foreground"> /mois</span>
              )}
            </span>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            <span>{property.type}</span>
            <span className="text-border">·</span>
            <span>{isRent ? "Location" : "Vente"}</span>
          </div>
          <h3 className="mt-1.5 line-clamp-1 font-serif text-lg font-semibold text-foreground">
            {property.title}
          </h3>
          <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="size-3.5" />
            {property.district}, {property.city}
          </p>

          <div className="mt-4 flex items-center gap-4 border-t border-border pt-3 text-sm text-foreground/80">
            <span className="flex items-center gap-1.5">
              <Bed className="size-4 text-muted-foreground" />
              {property.bedrooms}
            </span>
            <span className="flex items-center gap-1.5">
              <Bath className="size-4 text-muted-foreground" />
              {property.bathrooms}
            </span>
            <span className="flex items-center gap-1.5">
              <Maximize className="size-4 text-muted-foreground" />
              {formatNumber(property.surface)} m²
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
