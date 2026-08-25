"use client";

import { IconCheck, IconSearch, IconRoute, IconPalette, IconCode, IconSparkles, IconRocket } from "@tabler/icons-react";
import { motion } from "framer-motion";

interface WorkflowStep {
  id: string;
  step: string;
  title: string;
  tag: string;
  description: string;
  deliverables: string[];
  icon: React.ReactNode;
}

const workflowSteps: WorkflowStep[] = [
  {
    id: "discovery",
    step: "01",
    title: "Discovery & UX Audit",
    tag: "Research & Strategic Blueprint",
    description:
      "Deep dive into user pain points, business goals, and existing systems. I map requirements into clear user stories, performance budgets, and technical feasibility blueprints before committing to code.",
    deliverables: ["Technical Audit", "User Journey Maps", "Architecture Blueprint", "Performance Target"],
    icon: <IconSearch className="w-5 h-5" />,
  },
  {
    id: "architecture",
    step: "02",
    title: "Information Architecture",
    tag: "Wireframes & System Hierarchy",
    description:
      "Structuring intuitive page layouts, navigation hierarchies, and low-fidelity prototypes. Every interactive touchpoint is validated to ensure frictionless navigation and optimal user conversion.",
    deliverables: ["Low-Fi Wireframes", "Component Tree Specs", "State Machine Diagrams", "UX Flow Validation"],
    icon: <IconRoute className="w-5 h-5" />,
  },
  {
    id: "design-systems",
    step: "03",
    title: "Design Systems & Tokens",
    tag: "Figma Variables & Atomic UI Kit",
    description:
      "Translating visual identity into scalable design tokens (colors, typography scales, spacing, shadows, and dark mode palettes). Building atomic UI primitives for consistency across every platform.",
    deliverables: ["Design Token Library", "Atomic Component Kit", "WCAG AA Contrast", "Figma to Code Map"],
    icon: <IconPalette className="w-5 h-5" />,
  },
  {
    id: "engineering",
    step: "04",
    title: "Frontend Engineering",
    tag: "React, Next.js & TypeScript Craft",
    description:
      "Writing clean, modular, and strictly-typed frontend architecture. Implementing responsive layouts, resilient data-fetching with SSR/ISR, and production-grade state management.",
    deliverables: ["Next.js App Router", "TypeScript Strict", "Tailwind Design System", "Optimized Data Fetching"],
    icon: <IconCode className="w-5 h-5" />,
  },
  {
    id: "motion",
    step: "05",
    title: "Motion & Micro-Interactions",
    tag: "Framer Motion & Fluid UX",
    description:
      "Elevating digital interfaces from functional to memorable. Implementing 60fps spring animations, scroll-driven reveals, intuitive gestures, and seamless page transitions.",
    deliverables: ["Spring Physics", "Scroll-linked Animations", "Interactive Feedback", "Gesture Controls"],
    icon: <IconSparkles className="w-5 h-5" />,
  },
  {
    id: "optimization",
    step: "06",
    title: "Testing, CWV & Deployment",
    tag: "Lighthouse 100 & Production Release",
    description:
      "Rigorous cross-browser testing, accessibility (a11y) audits, Core Web Vitals optimization, and automated CI/CD deployment to edge networks for sub-second page loads.",
    deliverables: ["100/100 Lighthouse", "Zero CLS / Fast LCP", "Automated CI/CD", "Edge CDN Deployment"],
    icon: <IconRocket className="w-5 h-5" />,
  },
];

export function WorkflowSection() {
  return (
    <section
      id="workflow"
      className="py-24 md:py-32 bg-[#F4F1EA] text-[#16150F] relative overflow-x-clip"
    >
      {/* Figma canvas dot-grid backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgba(22,21,15,.10) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header */}
        <div className="max-w-3xl mb-14 md:mb-20">
          <p className="font-mono text-xs font-bold tracking-[0.18em] uppercase text-[var(--accent)] mb-4">
            ✦ Process — 06 Phases
          </p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="font-display text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold uppercase tracking-tight leading-[1.04]"
          >
            From Concept To{" "}
            <em className="italic normal-case text-[var(--accent)]">
              Production&nbsp;Ready
            </em>{" "}
            Reality
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="mt-5 text-base sm:text-lg leading-relaxed text-[#6E6A5E] max-w-2xl"
          >
            A disciplined, precision-driven engineering process designed to turn complex digital challenges into clean, accessible, and ultra-performant web interfaces.
          </motion.p>
        </div>

        {/* Phase frames grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workflowSteps.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: (index % 3) * 0.08 }}
              className="group relative flex flex-col bg-white rounded-[14px] border-[1.5px] border-[#D9D4C7] p-6 sm:p-7 transition-all duration-200 ease-out hover:-translate-y-[3px]"
              style={{ boxShadow: "4px 4px 0 rgba(22,21,15,.10)" }}
            >
              {/* selection outline on hover */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[14px] opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{
                  outline: "1.5px solid var(--accent)",
                  outlineOffset: "4px",
                  boxShadow: "6px 6px 0 var(--accent-soft)",
                  borderColor: "var(--accent)",
                }}
              />

              {/* Phase label */}
              <div className="flex items-center justify-between mb-5">
                <span className="font-mono text-xs font-bold tracking-[0.16em]" style={{ color: "var(--accent)" }}>
                  PHASE_{item.step}
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#D9D4C7] bg-[#FAF9F5] text-[#16150F] transition-colors duration-200 group-hover:border-[var(--accent)] group-hover:text-[var(--accent)]">
                  {item.icon}
                </span>
              </div>

              <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight leading-snug">
                {item.title}
              </h3>
              <span className="mt-3 w-fit rounded-full border border-[#D9D4C7] bg-[#F4F1EA] px-3 py-1 text-[11.5px] font-semibold text-[#6E6A5E]">
                {item.tag}
              </span>

              <p className="mt-4 text-sm sm:text-[15px] leading-relaxed text-[#6E6A5E]">
                {item.description}
              </p>

              {/* Deliverables */}
              <div className="mt-auto pt-6">
                <div className="flex flex-wrap gap-2 border-t border-dashed border-[#D9D4C7] pt-4">
                  {item.deliverables.map((del) => (
                    <span
                      key={del}
                      className="inline-flex items-center gap-1 rounded-full border border-[#D9D4C7] bg-white px-2.5 py-1 text-[11px] font-medium text-[#16150F]"
                    >
                      <IconCheck className="h-3 w-3" style={{ color: "var(--accent)" }} />
                      {del}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WorkflowSection;
