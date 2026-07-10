import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/marketing/section-heading";

const steps = [
  {
    n: "01",
    title: "Définissez votre projet",
    text: "Partagez vos critères. Un conseiller dédié affine votre recherche et active notre réseau off-market.",
  },
  {
    n: "02",
    title: "Visitez en privé",
    text: "Sélectionnez les biens qui vous inspirent et réservez des visites privées, à votre rythme.",
  },
  {
    n: "03",
    title: "Négociez sereinement",
    text: "Nous orchestrons l'offre, la négociation et les diagnostics avec transparence et discrétion.",
  },
  {
    n: "04",
    title: "Recevez vos clés",
    text: "Accompagnement juridique et financier jusqu'à la signature. Votre nouvelle adresse vous attend.",
  },
];

export function Process() {
  return (
    <section className="border-y border-border bg-muted/30 py-24">
      <Container>
        <SectionHeading
          eyebrow="Notre méthode"
          title="Un parcours d'acquisition sans friction"
          description="Quatre étapes claires, un interlocuteur unique, zéro mauvaise surprise."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <Reveal key={step.n} delayIndex={i}>
              <div className="relative h-full rounded-2xl border border-border bg-card p-6">
                <span className="font-serif text-4xl font-semibold text-gold-gradient">
                  {step.n}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
