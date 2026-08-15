"use client";

import dynamic from "next/dynamic";
import Hero from "@/components/organism/hero/hero";

const SectionSkeleton = () => (
  <div className="min-h-[60vh] animate-pulse bg-zinc-100 dark:bg-zinc-900 rounded-lg m-4" />
);

const SkillsSection = dynamic(
  () => import("@/components/organism/skills/skillsSection").then((mod) => mod.SkillsSection),
  { ssr: false, loading: () => <SectionSkeleton /> }
);
const About = dynamic(() => import("@/components/organism/about/aboutHome"), {
  loading: () => <SectionSkeleton />,
});
const FeaturedProjects = dynamic(
  () => import("@/components/organism/projects/featuredProjects").then((mod) => mod.FeaturedProjects),
  { loading: () => <SectionSkeleton /> }
);
const WorkflowSection = dynamic(
  () => import("@/components/organism/workflow/workflowSection").then((mod) => mod.WorkflowSection),
  { loading: () => <SectionSkeleton /> }
);
const CtaSection = dynamic(
  () => import("@/components/organism/cta/ctaSection").then((mod) => mod.CtaSection),
  { loading: () => <SectionSkeleton /> }
);
const PricingSection = dynamic(
  () => import("@/components/organism/pricing/pricingSection").then((mod) => mod.PricingSection),
  { loading: () => <SectionSkeleton /> }
);

export default function HomeClient() {
  return (
    <div>
      <Hero />
      <SkillsSection />
      <About />
      <FeaturedProjects />
      <WorkflowSection />
      <PricingSection />
      <CtaSection />
    </div>
  );
}
