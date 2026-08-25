"use client";

import dynamic from "next/dynamic";
import Hero from "@/components/organism/hero/hero";
import type { Project, Skill } from "@/types/database";

const SectionSkeleton = () => (
  <div className="min-h-[60vh] animate-pulse bg-zinc-100 dark:bg-zinc-900 rounded-lg m-4" />
);

const FeaturedProjects = dynamic(
  () => import("@/components/organism/projects/featuredProjects").then((mod) => mod.FeaturedProjects),
  { loading: () => <SectionSkeleton /> }
);
const About = dynamic(() => import("@/components/organism/about/aboutHome"), {
  loading: () => <SectionSkeleton />,
});
const WorkflowSection = dynamic(
  () => import("@/components/organism/workflow/workflowSection").then((mod) => mod.WorkflowSection),
  { loading: () => <SectionSkeleton /> }
);
const PricingSection = dynamic(
  () => import("@/components/organism/pricing/pricingSection").then((mod) => mod.PricingSection),
  { loading: () => <SectionSkeleton /> }
);
const WhatsupSection = dynamic(
  () => import("@/components/organism/whatsup/whatsupSection").then((mod) => mod.WhatsupSection),
  { loading: () => <SectionSkeleton /> }
);
const CtaSection = dynamic(
  () => import("@/components/organism/cta/ctaSection").then((mod) => mod.CtaSection),
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
      <Hero />
      {/* Sections take no id prop — anchor ids live on these wrappers */}
      <div id="work">
        <FeaturedProjects projects={featuredProjects} />
      </div>
      <div id="about">
        <About />
      </div>
      <WorkflowSection />
      <div id="pricing">
        <PricingSection />
      </div>
      <WhatsupSection />
      <CtaSection />
    </div>
  );
}
