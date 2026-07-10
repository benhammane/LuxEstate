import Image from "next/image";
import Link from "next/link";
import { Star, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { HeroSearch } from "@/components/marketing/hero-search";
import { Reveal } from "@/components/ui/reveal";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-18">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=80"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
      </div>

      <Container className="flex min-h-[92vh] flex-col justify-center py-24 text-white">
        <Reveal>
          <Badge
            variant="outline"
            className="border-white/25 bg-white/10 text-white backdrop-blur"
          >
            <Star className="size-3.5 text-gold" />
            Maison de référence — immobilier d'exception
          </Badge>
        </Reveal>

        <Reveal delayIndex={1}>
          <h1 className="mt-6 max-w-4xl font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-6xl lg:text-7xl">
            Trouvez le lieu qui
            <span className="text-gold-gradient"> vous ressemble</span>
          </h1>
        </Reveal>

        <Reveal delayIndex={2}>
          <p className="mt-6 max-w-xl text-lg text-white/80">
            Une sélection confidentielle de propriétés d'exception, orchestrée
            par des conseillers dédiés. Visites privées, off-market et
            accompagnement sur-mesure.
          </p>
        </Reveal>

        <Reveal delayIndex={3} className="mt-10 w-full max-w-4xl">
          <HeroSearch />
        </Reveal>

        <Reveal delayIndex={4}>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-white/75">
            <span className="flex items-center gap-2">
              <ShieldCheck className="size-4 text-gold" />
              Mandats confidentiels
            </span>
            <span className="flex items-center gap-2">
              <Star className="size-4 text-gold" />
              Note clients 4,9/5
            </span>
            <Link
              href="/properties"
              className="font-medium text-white underline-offset-4 hover:underline"
            >
              Parcourir toutes les propriétés →
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
