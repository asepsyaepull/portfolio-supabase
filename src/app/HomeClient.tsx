"use client";

import dynamic from "next/dynamic";

const Hero = dynamic(() => import("@/components/organism/hero/hero"), { ssr: false });
const SkillsSection = dynamic(() => import("@/components/organism/skills/skillsSection").then((mod) => mod.SkillsSection), { ssr: false });
const About = dynamic(() => import("@/components/organism/about/aboutHome"), { ssr: false });
const FeaturedProjects = dynamic(() => import("@/components/organism/projects/featuredProjects").then((mod) => mod.FeaturedProjects), { ssr: false });
const WorkflowSection = dynamic(() => import("@/components/organism/workflow/workflowSection").then((mod) => mod.WorkflowSection), { ssr: false });
const CtaSection = dynamic(() => import("@/components/organism/cta/ctaSection").then((mod) => mod.CtaSection), { ssr: false });

export default function HomeClient() {
  return (
    <div>
      <Hero />
      <SkillsSection />
      <About />
      <FeaturedProjects />
      <WorkflowSection />
      <CtaSection />
    </div>
  );
}
