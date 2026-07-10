import { Quote, Star } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/marketing/section-heading";
import { demoTestimonials } from "@/lib/demo-data";

export function Testimonials() {
  return (
    <section className="py-24">
      <Container>
        <SectionHeading
          eyebrow="Ils nous ont fait confiance"
          title="La parole à nos clients"
        />

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {demoTestimonials.map((t, i) => (
            <Reveal key={t.name} delayIndex={i}>
              <figure className="flex h-full flex-col rounded-2xl border border-border bg-card p-7">
                <Quote className="size-8 text-primary/30" />
                <div className="mt-3 flex gap-0.5 text-gold">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="size-4 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-foreground/90">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 border-t border-border pt-4">
                  <div className="font-semibold text-foreground">{t.name}</div>
                  <div className="text-sm text-muted-foreground">{t.detail}</div>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
