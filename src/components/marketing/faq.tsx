"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/marketing/section-heading";
import { demoFaq } from "@/lib/demo-data";

export function Faq() {
  return (
    <section id="faq" className="py-24">
      <Container className="max-w-3xl">
        <SectionHeading eyebrow="Questions fréquentes" title="Tout ce qu'il faut savoir" />

        <Reveal className="mt-12">
          <Accordion.Root
            type="single"
            collapsible
            className="divide-y divide-border rounded-2xl border border-border bg-card"
          >
            {demoFaq.map((item, i) => (
              <Accordion.Item key={i} value={`item-${i}`} className="px-6">
                <Accordion.Header>
                  <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 py-5 text-left text-base font-medium text-foreground">
                    {item.q}
                    <Plus className="size-5 shrink-0 text-muted-foreground transition-transform duration-300 group-data-[state=open]:rotate-45" />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                  <p className="pb-5 pr-8 text-sm leading-relaxed text-muted-foreground">
                    {item.a}
                  </p>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </Reveal>
      </Container>
    </section>
  );
}
