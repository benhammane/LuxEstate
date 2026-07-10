import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/marketing/section-heading";
import { PropertyCard } from "@/components/property/property-card";
import { getFeaturedProperties } from "@/server/properties";

export async function FeaturedProperties() {
  const properties = await getFeaturedProperties(6);

  return (
    <section className="py-24">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            align="left"
            eyebrow="Sélection signature"
            title="Nos propriétés d'exception"
            description="Une curation confidentielle des plus beaux biens, renouvelée chaque semaine par nos conseillers."
            className="mb-0"
          />
          <Reveal delayIndex={1}>
            <Button asChild variant="outline">
              <Link href="/properties">
                Voir tout
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {properties.map((property, i) => (
            <Reveal key={property.id} delayIndex={i % 3}>
              <PropertyCard property={property} priority={i < 3} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
