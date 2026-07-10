"use client";

import * as React from "react";
import {
  useInView,
  useMotionValue,
  useTransform,
  animate,
  motion,
} from "motion/react";
import { Container } from "@/components/ui/container";
import { demoStats } from "@/lib/demo-data";
import { formatNumber } from "@/lib/utils";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => formatNumber(Math.round(v)));

  React.useEffect(() => {
    if (inView) {
      const controls = animate(count, value, {
        duration: 1.6,
        ease: [0.22, 1, 0.36, 1],
      });
      return controls.stop;
    }
  }, [inView, value, count]);

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section className="border-y border-border bg-muted/30 py-14">
      <Container>
        <dl className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {demoStats.map((stat) => (
            <div key={stat.label} className="text-center">
              <dt className="font-serif text-4xl font-semibold text-foreground sm:text-5xl">
                <Counter value={stat.value} suffix={stat.suffix} />
              </dt>
              <dd className="mt-2 text-sm text-muted-foreground">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
