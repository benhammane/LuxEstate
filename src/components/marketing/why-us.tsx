import {
  ShieldCheck,
  Gem,
  Globe2,
  CalendarClock,
  KeyRound,
  Sparkles,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/marketing/section-heading";

const features = [
  {
    icon: Gem,
    title: "Sélection d'exception",
    text: "Chaque bien est visité, vérifié et photographié par nos équipes avant diffusion.",
  },
  {
    icon: ShieldCheck,
    title: "Confidentialité absolue",
    text: "Mandats off-market réservés à un cercle restreint d'acquéreurs qualifiés.",
  },
  {
    icon: Globe2,
    title: "Réseau international",
    text: "Des acquéreurs dans 18 pays et des partenaires dans les plus grandes capitales.",
  },
  {
    icon: CalendarClock,
    title: "Visites privées",
    text: "Réservez un créneau avec le conseiller de votre choix, en présentiel ou en visio.",
  },
  {
    icon: KeyRound,
    title: "Accompagnement complet",
    text: "Juridique, fiscal, financement : une équipe dédiée du premier contact à la remise des clés.",
  },
  {
    icon: Sparkles,
    title: "Expérience sur-mesure",
    text: "Un interlocuteur unique et une plateforme pensée pour la fluidité de votre projet.",
  },
];

export function WhyUs() {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0 bg-radial-fade" />
      <Container className="relative">
        <SectionHeading
          eyebrow="Pourquoi LuxEstate"
          title="Une maison pensée pour l'exigence"
          description="Nous conjuguons l'attention d'une conciergerie privée à la puissance d'une plateforme moderne."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <Reveal key={feature.title} delayIndex={i % 3}>
              <div className="group h-full rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40">
                <div className="inline-flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <feature.icon className="size-6" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
