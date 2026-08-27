"use client";

import dynamic from "next/dynamic";
import { HeroSection } from "@/components/sections/hero/hero-section";
import { ArcRevealHero } from "@/components/sections/hero/arc-reveal-hero";
import type { Project, Skill } from "@/types/database";

const SectionSkeleton = () => (
  <div className="m-4 min-h-[60vh] animate-pulse rounded-lg bg-white/40" />
);

const FeaturedProjects = dynamic(
  () =>
    import("@/components/sections/projects/workspace-console").then(
      (mod) => mod.WorkspaceConsole
    ),
  { loading: () => <SectionSkeleton /> }
);
const WhatsupSection = dynamic(
  () =>
    import("@/components/sections/whatsup/whatsup-section").then(
      (mod) => mod.WhatsupSection
    ),
  { loading: () => <SectionSkeleton /> }
);
const WorkflowSection = dynamic(
  () =>
    import("@/components/sections/workflow/workflow-section").then(
      (mod) => mod.WorkflowSection
    ),
  { loading: () => <SectionSkeleton /> }
);
const ServicesSection = dynamic(
  () => import("@/components/sections/services/services-section"),
  { loading: () => <SectionSkeleton /> }
);
const WhySection = dynamic(
  () => import("@/components/sections/why/why-section"),
  { loading: () => <SectionSkeleton /> }
);
const WhoSection = dynamic(
  () =>
    import("@/components/sections/who/who-section").then(
      (mod) => mod.WhoSection
    ),
  { loading: () => <SectionSkeleton /> }
);
const CtaSection = dynamic(
  () =>
    import("@/components/sections/cta/cta-section").then(
      (mod) => mod.CtaSection
    ),
  { loading: () => <SectionSkeleton /> }
);
const PricingSection = dynamic(
  () =>
    import("@/components/sections/pricing/pricing-section").then(
      (mod) => mod.PricingSection
    ),
  { loading: () => <SectionSkeleton /> }
);
const FaqSection = dynamic(
  () => import("@/components/sections/faq/faq-section"),
  { loading: () => <SectionSkeleton /> }
);
const ExperienceSection = dynamic(
  () =>
    import("@/components/sections/experience/experience-section").then(
      (mod) => mod.ExperienceSection
    ),
  { loading: () => <SectionSkeleton /> }
);

export default function HomeClient({
  featuredProjects,
  skills,
}: {
  featuredProjects: Project[];
  skills: Skill[];
}) {
  return (
    <div>
      <ArcRevealHero greetingHold={400} revealDuration={600}>
        <HeroSection />
      </ArcRevealHero>
      {/* Sections take no id prop — anchor ids live on these wrappers */}
      <div id="work">
        <FeaturedProjects projects={featuredProjects} />
      </div>
      <div id="experience">
        <ExperienceSection />
      </div>
      <div id="about">
        <WhatsupSection />
      </div>
      <div id="process">
        <WorkflowSection />
      </div>
      <div id="services">
        <WhoSection />
        <ServicesSection />
      </div>
      <WhySection />
      <div id="contact">
        <CtaSection />
      </div>
      <div id="pricing">
        <PricingSection />
      </div>
      <FaqSection />
    </div>
  );
}
