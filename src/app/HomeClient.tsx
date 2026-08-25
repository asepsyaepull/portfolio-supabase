"use client";

import dynamic from "next/dynamic";
import Hero from "@/components/organism/hero/hero";
import type { Project, Skill } from "@/types/database";

const SectionSkeleton = () => (
  <div className="min-h-[60vh] animate-pulse rounded-lg bg-white/40 m-4" />
);

const FeaturedProjects = dynamic(
  () => import("@/components/organism/projects/featuredProjects").then((mod) => mod.FeaturedProjects),
  { loading: () => <SectionSkeleton /> }
);
const WhatsupSection = dynamic(
  () => import("@/components/organism/whatsup/whatsupSection").then((mod) => mod.WhatsupSection),
  { loading: () => <SectionSkeleton /> }
);
const WorkflowSection = dynamic(
  () => import("@/components/organism/workflow/workflowSection").then((mod) => mod.WorkflowSection),
  { loading: () => <SectionSkeleton /> }
);
const ServicesSection = dynamic(() => import("@/components/organism/services/servicesSection"), {
  loading: () => <SectionSkeleton />,
});
const WhySection = dynamic(() => import("@/components/organism/why/whySection"), {
  loading: () => <SectionSkeleton />,
});
const HowIBuildSection = dynamic(() => import("@/components/organism/howibuild/howIBuildSection"), {
  loading: () => <SectionSkeleton />,
});
const CtaSection = dynamic(
  () => import("@/components/organism/cta/ctaSection").then((mod) => mod.CtaSection),
  { loading: () => <SectionSkeleton /> }
);
const PricingSection = dynamic(
  () => import("@/components/organism/pricing/pricingSection").then((mod) => mod.PricingSection),
  { loading: () => <SectionSkeleton /> }
);
const FaqSection = dynamic(() => import("@/components/organism/faq/faqSection"), {
  loading: () => <SectionSkeleton />,
});
const DropFunSection = dynamic(() => import("@/components/organism/dropfun/dropFunSection"), {
  loading: () => <SectionSkeleton />,
});

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
        <WhatsupSection />
      </div>
      <div id="process">
        <WorkflowSection />
      </div>
      <div id="services">
        <ServicesSection />
      </div>
      <WhySection />
      <div id="how-i-build">
        <HowIBuildSection />
      </div>
      <div id="contact">
        <CtaSection />
      </div>
      <div id="pricing">
        <PricingSection />
      </div>
      <FaqSection />
      <DropFunSection />
    </div>
  );
}
