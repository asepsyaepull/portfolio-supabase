"use client";

import { ArcRevealHero } from "@/components/sections/hero/arc-reveal-hero";
import { HeroSection } from "@/components/sections/hero/hero-section";
import type { Project, Skill } from "@/types/database";
import dynamic from "next/dynamic";

const SectionSkeleton = () => (
  <div className="m-4 min-h-[60vh] animate-pulse rounded-lg bg-white/40" />
);

const WhatsupSection = dynamic(
  () =>
    import("@/components/sections/whatsup/whatsup-section").then(
      (mod) => mod.WhatsupSection
    ),
  { loading: () => <SectionSkeleton /> }
);
const WorkspaceConsole = dynamic(
  () =>
    import("@/components/sections/projects/workspace-console").then(
      (mod) => mod.WorkspaceConsole
    ),
  { loading: () => <SectionSkeleton /> }
);
const CinematicSelectedWork = dynamic(
  () =>
    import("@/components/sections/projects/cinematic-selected-work").then(
      (mod) => mod.CinematicSelectedWork
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
const WhySection = dynamic(
  () => import("@/components/sections/why/why-section"),
  { loading: () => <SectionSkeleton /> }
);
const CtaSection = dynamic(
  () =>
    import("@/components/sections/cta/cta-section").then(
      (mod) => mod.CtaSection
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
      <div id="about">
        <WhatsupSection />
      </div>
      <div id="process">
        <WorkflowSection />
      </div>
      <div id="work">
        <WorkspaceConsole projects={featuredProjects} />
      </div>
      <div id="selected-work">
        <CinematicSelectedWork projects={featuredProjects} />
      </div>
      <div id="experience">
        <ExperienceSection />
      </div>
      <WhySection />
      <div id="contact">
        <CtaSection />
      </div>
      <FaqSection />
    </div>
  );
}
