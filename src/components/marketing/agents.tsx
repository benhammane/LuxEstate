import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/marketing/section-heading";
import { demoAgents } from "@/lib/demo-data";

export function Agents() {
  return (
    <section className="border-t border-border bg-muted/30 py-24">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            align="left"
            eyebrow="Nos conseillers"
            title="Des experts à vos côtés"
            description="Une équipe passionnée, discrète et profondément ancrée dans ses territoires."
            className="mb-0"
          />
          <Reveal delayIndex={1}>
            <Button asChild variant="outline">
              <Link href="/agents">
                Toute l'équipe
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {demoAgents.map((agent, i) => (
            <Reveal key={agent.name} delayIndex={i}>
              <article className="group overflow-hidden rounded-2xl border border-border bg-card">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={agent.image}
                    alt={agent.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />
                  <span className="absolute bottom-3 left-4 rounded-full bg-background/90 px-3 py-1 text-xs font-medium text-foreground backdrop-blur">
                    {agent.sales}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-foreground">{agent.name}</h3>
                  <p className="text-sm text-muted-foreground">{agent.role}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
