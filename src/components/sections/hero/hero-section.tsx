"use client";

import { memo } from "react";
import QuordixHero from "@/components/ui/quordix-hero";

export const HeroSection = () => {
  return (
    <section className="relative w-full overflow-hidden">
      <QuordixHero
        showNavbar={false}
        showBackground={false}
        tagline=""
        titleTop="UI/UX Designer"
        titleGlitch="Developer"
        subtitle="Bridging the gap between design and code. I’m a creative technologist who loves building beautiful, user-friendly interfaces that solve real-world problems."
        ctaText="Start Project"
        ctaHref="#work"
        secondaryCtaText="Download CV"
        secondaryCtaHref="/cv/CV-Asep-Syaepul-Rohman.pdf"
      />
    </section>
  );
};

export default memo(HeroSection);
