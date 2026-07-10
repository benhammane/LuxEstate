import Link from "next/link";
import { ArrowRight, PhoneCall } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

export function Cta() {
  return (
    <section className="py-24">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-primary px-8 py-16 text-center text-primary-foreground sm:px-16 sm:py-20">
            <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.07]" />
            <div className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-gold/20 blur-3xl" />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl font-serif text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                Prêt à découvrir votre prochaine adresse ?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">
                Confiez-nous votre projet. Un conseiller dédié vous recontacte
                sous 24 heures pour une première sélection confidentielle.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button asChild variant="gold" size="lg">
                  <Link href="/contact">
                    Prendre rendez-vous
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                >
                  <Link href="/properties">
                    <PhoneCall className="size-4" />
                    Parler à un conseiller
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
