import type { Property } from "@/types/property";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3400";

/** schema.org structured data for rich search results. */
export function PropertyJsonLd({ property }: { property: Property }) {
  const json = {
    "@context": "https://schema.org",
    "@type": "SingleFamilyResidence",
    name: property.title,
    description: property.description,
    url: `${baseUrl}/properties/${property.slug}`,
    image: property.images,
    numberOfRooms: property.bedrooms,
    numberOfBathroomsTotal: property.bathrooms,
    floorSize: {
      "@type": "QuantitativeValue",
      value: property.surface,
      unitCode: "MTK",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: property.city,
      addressRegion: property.region,
      postalCode: property.postalCode,
      addressCountry: "FR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: property.latitude,
      longitude: property.longitude,
    },
    offers: {
      "@type": "Offer",
      price: property.price,
      priceCurrency: property.currency,
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
