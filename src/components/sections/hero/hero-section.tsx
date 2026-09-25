"use client";

import { memo } from "react";
import QuordixHero from "@/components/ui/quordix-hero";
import { useLanguage } from "@/context/language-context";

export const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative w-full overflow-hidden">
      <QuordixHero
        showNavbar={false}
        showBackground={false}
        tagline=""
        titleTop={t.hero.titleTop}
        titleGlitch={t.hero.titleGlitch}
        subtitle={t.hero.subtitle}
        ctaText={t.hero.ctaText}
        ctaHref="#selected-work"
        secondaryCtaText={t.hero.secondaryCtaText}
        secondaryCtaHref="#about"
      />
    </section>
  );
};

export default memo(HeroSection);
