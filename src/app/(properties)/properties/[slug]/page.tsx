import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Bed,
  Bath,
  Maximize,
  MapPin,
  CalendarDays,
  Layers,
  Ruler,
  Zap,
  ChevronRight,
  Phone,
  CalendarCheck,
} from "lucide-react";
import { getPropertyBySlug, getSimilarProperties } from "@/server/properties";
import { AMENITY_MAP } from "@/lib/data/amenities";
import { formatPrice, formatNumber } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PropertyGallery } from "@/components/property/property-gallery";
import { EnergyRating } from "@/components/property/energy-rating";
import { AppointmentDialog } from "@/components/property/appointment-dialog";
import { ContactForm } from "@/components/property/contact-form";
import { ShareButton } from "@/components/property/share-button";
import { FavoriteButton } from "@/components/property/favorite-button";
import { PropertyCard } from "@/components/property/property-card";
import { PropertyLocationMap } from "@/components/map/property-location-map-lazy";
import { PropertyJsonLd } from "@/components/property/property-jsonld";
import Image from "next/image";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const property = await getPropertyBySlug((await params).slug);
  if (!property) return { title: "Bien introuvable" };
  return {
    title: property.title,
    description: `${property.title} à ${property.city} — ${formatPrice(property.price)}. ${property.surface} m², ${property.bedrooms} chambres.`,
    openGraph: {
      title: property.title,
      images: [property.images[0]],
    },
  };
}

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const property = await getPropertyBySlug((await params).slug);
  if (!property) notFound();

  const similar = await getSimilarProperties(property, 3);
  const isRent = property.listingType === "RENT";

  const facts = [
    { icon: Bed, label: "Chambres", value: property.bedrooms },
    { icon: Bath, label: "Salles de bain", value: property.bathrooms },
    {
      icon: Maximize,
      label: "Surface",
      value: `${formatNumber(property.surface)} m²`,
    },
    property.landSize
      ? {
          icon: Ruler,
          label: "Terrain",
          value: `${formatNumber(property.landSize)} m²`,
        }
      : null,
    property.floors
      ? { icon: Layers, label: "Niveaux", value: property.floors }
      : null,
    property.yearBuilt
      ? { icon: CalendarDays, label: "Construction", value: property.yearBuilt }
      : null,
  ].filter(Boolean) as { icon: typeof Bed; label: string; value: React.ReactNode }[];

  return (
    <div className="pt-18">
      <PropertyJsonLd property={property} />
      <Container className="py-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Accueil
          </Link>
          <ChevronRight className="size-3.5" />
          <Link href="/properties" className="hover:text-foreground">
            Propriétés
          </Link>
          <ChevronRight className="size-3.5" />
          <span className="text-foreground">{property.city}</span>
        </nav>

        {/* Header */}
        <div className="mt-4 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant={isRent ? "default" : "gold"}>
                {isRent ? "Location" : "Vente"}
              </Badge>
              <Badge variant="outline">{property.type}</Badge>
              {property.confidential && (
                <Badge variant="muted">Off-market</Badge>
              )}
            </div>
            <h1 className="mt-3 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
              {property.title}
            </h1>
            <p className="mt-2 flex items-center gap-1.5 text-muted-foreground">
              <MapPin className="size-4" />
              {property.district}, {property.city} · {property.region}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <ShareButton title={property.title} />
            <FavoriteButton
              propertyId={property.id}
              size="lg"
              className="border border-border"
            />
          </div>
        </div>

        {/* Gallery */}
        <div className="mt-6">
          <PropertyGallery images={property.images} title={property.title} />
        </div>

        {/* Body */}
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
          {/* Main */}
          <div className="min-w-0 space-y-10">
            {/* Key facts */}
            <section className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {facts.map((f) => (
                <div
                  key={f.label}
                  className="rounded-xl border border-border bg-card p-4"
                >
                  <f.icon className="size-5 text-primary" />
                  <div className="mt-2 text-lg font-semibold">{f.value}</div>
                  <div className="text-xs text-muted-foreground">{f.label}</div>
                </div>
              ))}
            </section>

            {/* Description */}
            <section>
              <h2 className="font-serif text-2xl font-semibold">
                À propos de ce bien
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                {property.description}
              </p>
            </section>

            {/* Amenities */}
            <section>
              <h2 className="font-serif text-2xl font-semibold">Équipements</h2>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {property.amenities.map((slug) => {
                  const a = AMENITY_MAP.get(slug);
                  if (!a) return null;
                  return (
                    <div
                      key={slug}
                      className="flex items-center gap-2.5 rounded-lg border border-border bg-card px-3 py-2.5 text-sm"
                    >
                      <a.icon className="size-4 text-primary" />
                      {a.name}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Energy */}
            {property.energyRating && (
              <section>
                <h2 className="flex items-center gap-2 font-serif text-2xl font-semibold">
                  <Zap className="size-5 text-primary" />
                  Diagnostic de performance énergétique
                </h2>
                <div className="mt-4 max-w-md">
                  <EnergyRating value={property.energyRating} />
                </div>
              </section>
            )}

            {/* Location */}
            <section>
              <h2 className="font-serif text-2xl font-semibold">
                Localisation
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Emplacement approximatif — l'adresse exacte est communiquée lors
                de la visite privée.
              </p>
              <div className="mt-4">
                <PropertyLocationMap
                  longitude={property.longitude}
                  latitude={property.latitude}
                />
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <div className="text-sm text-muted-foreground">
                {isRent ? "Loyer mensuel" : "Prix de vente"}
              </div>
              <div className="mt-1 font-serif text-3xl font-semibold">
                {formatPrice(property.price)}
                {isRent && (
                  <span className="text-base font-normal text-muted-foreground">
                    {" "}
                    /mois
                  </span>
                )}
              </div>

              {/* Agent */}
              <div className="mt-6 flex items-center gap-3 border-t border-border pt-6">
                <div className="relative size-12 overflow-hidden rounded-full">
                  <Image
                    src={property.agent.photo}
                    alt={property.agent.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <div className="font-medium">{property.agent.name}</div>
                  <div className="truncate text-sm text-muted-foreground">
                    {property.agent.title}
                  </div>
                </div>
              </div>

              <div className="mt-5 space-y-2">
                <AppointmentDialog
                  property={property}
                  trigger={
                    <Button className="w-full" size="lg">
                      <CalendarCheck className="size-4" />
                      Réserver une visite
                    </Button>
                  }
                />
                {property.agent.phone && (
                  <Button variant="secondary" className="w-full" size="lg" asChild>
                    <a href={`tel:${property.agent.phone.replace(/\s/g, "")}`}>
                      <Phone className="size-4" />
                      {property.agent.phone}
                    </a>
                  </Button>
                )}
              </div>

              <div className="mt-6 border-t border-border pt-6">
                <h3 className="text-sm font-semibold">Une question ?</h3>
                <p className="mb-4 mt-1 text-sm text-muted-foreground">
                  Écrivez à {property.agent.name.split(" ")[0]}.
                </p>
                <ContactForm propertyTitle={property.title} compact />
              </div>
            </div>
          </aside>
        </div>

        {/* Similar */}
        {similar.length > 0 && (
          <section className="mt-16 border-t border-border pt-12">
            <h2 className="font-serif text-2xl font-semibold">
              Biens similaires
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </section>
        )}
      </Container>
    </div>
  );
}
