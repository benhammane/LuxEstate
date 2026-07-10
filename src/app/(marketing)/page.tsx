import { Hero } from "@/components/marketing/hero";
import { Stats } from "@/components/marketing/stats";
import { FeaturedProperties } from "@/components/marketing/featured-properties";
import { WhyUs } from "@/components/marketing/why-us";
import { Process } from "@/components/marketing/process";
import { Testimonials } from "@/components/marketing/testimonials";
import { Agents } from "@/components/marketing/agents";
import { Faq } from "@/components/marketing/faq";
import { Cta } from "@/components/marketing/cta";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <FeaturedProperties />
      <WhyUs />
      <Process />
      <Testimonials />
      <Agents />
      <Faq />
      <Cta />
    </>
  );
}
