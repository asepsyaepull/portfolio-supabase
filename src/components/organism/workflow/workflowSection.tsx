"use client";

import { useState, useRef, useEffect } from "react";
import {
  IconSearch,
  IconRoute,
  IconPalette,
  IconCode,
  IconSparkles,
  IconRocket,
  IconCheck,
  IconTerminal,
  IconDeviceLaptop,
  IconBrandReact,
  IconBrandNextjs,
  IconBrandTailwind,
} from "@tabler/icons-react";
import { motion, AnimatePresence, useInView } from "framer-motion";

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
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const isManualSelecting = useRef(false);
  const manualTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleStepClick = (index: number) => {
    isManualSelecting.current = true;
    setActiveStepIndex(index);

    if (manualTimerRef.current) clearTimeout(manualTimerRef.current);
    manualTimerRef.current = setTimeout(() => {
      isManualSelecting.current = false;
    }, 1000);
  };

  return (
    <section id="workflow" className="py-24 md:py-32 bg-zinc-50/50 dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 relative overflow-x-clip transition-colors duration-300">
      {/* Background Accent Gradients */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-lime-500/10 dark:bg-lime-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Section Header (Zeeframes Style) */}
        <div className="max-w-3xl mx-auto text-center mb-16 md:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-zinc-900 dark:text-white uppercase mb-6"
          >
            From Concept To <br className="hidden sm:inline" />
            <span className="text-lime-600 dark:text-lime-400 italic font-serif normal-case">Production Ready</span> Reality
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl mx-auto"
          >
            A disciplined, precision-driven engineering process designed to turn complex digital challenges into clean, accessible, and ultra-performant web interfaces.
          </motion.p>
        </div>

        {/* 2-Column Interactive Area (Desktop Split, Mobile Stack) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative">

          {/* Left Column: Timeline List */}
          <div className="lg:col-span-6 flex flex-col relative pl-12 sm:pl-16">
            {/* Vertical Progress Spine Track */}
            <div className="absolute left-[9px] sm:left-[15px] top-6 bottom-6 w-[2px] bg-zinc-200/80 dark:bg-zinc-800/80 rounded-full overflow-hidden">
              {/* Dynamic Active Progress Segment */}
              <motion.div
                className="w-full bg-lime-500 shadow-[0_0_12px_rgba(132,204,22,0.9)] rounded-full origin-top"
                initial={false}
                animate={{
                  height: `${((activeStepIndex + 0.1) / workflowSteps.length) * 100}%`,
                }}
                transition={{ type: "spring", stiffness: 250, damping: 30 }}
              />

              {/* Continuous Flowing Laser Pulse */}
              <motion.div
                className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-transparent via-lime-400 to-transparent blur-[1px]"
                animate={{
                  y: ["-100%", "600%"],
                }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </div>

            {/* List of Steps */}
            <div className="space-y-6 md:space-y-8">
              {workflowSteps.map((item, index) => (
                <StepListItem
                  key={item.id}
                  item={item}
                  index={index}
                  isActive={activeStepIndex === index}
                  onSelect={() => handleStepClick(index)}
                  onInView={() => {
                    if (!isManualSelecting.current) {
                      setActiveStepIndex(index);
                    }
                  }}
                />
              ))}
            </div>
          </div>

          {/* Right Column: Sticky Visual Showcase (Desktop) */}
          <div className="hidden lg:block lg:col-span-6 relative">
            <div className="sticky top-28 rounded-2xl bg-white dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 shadow-2xl p-2 sm:p-4 overflow-hidden backdrop-blur-xl transition-all duration-300">
              {/* Showcase Window Chrome Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-100 dark:border-zinc-800/80 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 font-mono text-[11px] text-zinc-400 dark:text-zinc-500">
                    workflow://phase-0{activeStepIndex + 1}/{workflowSteps[activeStepIndex].id}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-lime-500/10 text-lime-600 dark:text-lime-400 border border-lime-500/20">
                    Active Phase
                  </span>
                  <span className="font-mono text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    0{activeStepIndex + 1} / 0{workflowSteps.length}
                  </span>
                </div>
              </div>

              {/* Dynamic Animated Content Container */}
              <div className="relative min-h-[460px] flex items-center justify-center p-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStepIndex}
                    initial={{ opacity: 0, y: 15, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -15, scale: 0.98 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="w-full h-full flex flex-col justify-center"
                  >
                    <VisualShowcaseContent stepIndex={activeStepIndex} />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Bottom Quick Navigation Chips */}
              <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between px-3 text-xs text-zinc-500">
                <span className="font-medium text-[11px]">Click any step to inspect</span>
                <div className="flex items-center gap-1.5">
                  {workflowSteps.map((s, idx) => (
                    <button
                      key={s.id}
                      onClick={() => handleStepClick(idx)}
                      className={`w-6 h-6 rounded-md font-mono text-[10px] font-bold flex items-center justify-center transition-all ${
                        activeStepIndex === idx
                          ? "bg-lime-500 text-zinc-950 shadow-sm"
                          : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                      }`}
                      aria-label={`Jump to phase ${s.step}`}
                    >
                      {s.step}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ── Step List Item with inView detection & Expandable State ── */
function StepListItem({
  item,
  index,
  isActive,
  onSelect,
  onInView,
}: {
  item: WorkflowStep;
  index: number;
  isActive: boolean;
  onSelect: () => void;
  onInView: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-40% 0px -40% 0px" });

  useEffect(() => {
    if (isInView) {
      onInView();
    }
  }, [isInView, onInView]);

  return (
    <div
      ref={ref}
      onClick={onSelect}
      className={`group relative cursor-pointer rounded-xl p-5 sm:p-6 transition-all duration-300 ${
        isActive
          ? "bg-white dark:bg-zinc-900/90 border border-zinc-200 dark:border-lime-500/30 shadow-xl shadow-lime-500/5 dark:shadow-lime-500/5 ring-1 ring-lime-500/20"
          : "bg-transparent border border-transparent hover:bg-zinc-100/60 dark:hover:bg-zinc-900/40"
      }`}
    >
      {/* Node indicator on the spine - exactly centered on the 2px spine */}
      <div
        className={`absolute left-[-38px] sm:left-[-49px] top-6 -translate-x-1/2 w-8 h-8 sm:w-9 sm:h-9 rounded-full border-2 flex items-center justify-center font-mono text-xs font-bold transition-all duration-300 z-10 ${
          isActive
            ? "bg-lime-500 border-lime-400 text-zinc-950 shadow-[0_0_16px_rgba(132,204,22,0.8)] scale-110"
            : "bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 text-zinc-500 dark:text-zinc-400 group-hover:border-lime-500/50"
        }`}
      >
        {item.step}
      </div>

      {/* Header Row: Title & Tag */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
        <h3
          className={`text-xl sm:text-2xl font-bold tracking-tight transition-colors flex items-center gap-2.5 ${
            isActive
              ? "text-zinc-900 dark:text-white"
              : "text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-200"
          }`}
        >
          <span
            className={`p-1.5 rounded-lg border transition-colors ${
              isActive
                ? "bg-lime-500/10 text-lime-600 dark:text-lime-400 border-lime-500/30"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 border-zinc-200 dark:border-zinc-700"
            }`}
          >
            {item.icon}
          </span>
          {item.title}
        </h3>
        <span
          className={`text-xs font-semibold px-2.5 py-1 rounded-full w-fit transition-colors ${
            isActive
              ? "bg-lime-500/10 text-lime-700 dark:text-lime-400 border border-lime-500/20"
              : "text-zinc-500 dark:text-zinc-500 bg-zinc-100 dark:bg-zinc-800/60"
          }`}
        >
          {item.tag}
        </span>
      </div>

      {/* Description */}
      <p
        className={`text-sm sm:text-base leading-relaxed transition-colors mb-4 ${
          isActive
            ? "text-zinc-700 dark:text-zinc-300"
            : "text-zinc-500 dark:text-zinc-500"
        }`}
      >
        {item.description}
      </p>

      {/* Deliverable Tags (visible when active) */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex flex-wrap gap-2">
              {item.deliverables.map((del, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800/90 text-zinc-700 dark:text-zinc-300 border border-zinc-200/80 dark:border-zinc-700/60"
                >
                  <IconCheck className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400" />
                  {del}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Inline Visual Preview (< lg) */}
      <div className="block lg:hidden mt-5">
        <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/70 p-4">
          <VisualShowcaseContent stepIndex={index} isMobile />
        </div>
      </div>
    </div>
  );
}

/* ── Visual Previews for Each Step ── */
function VisualShowcaseContent({
  stepIndex,
  isMobile = false,
}: {
  stepIndex: number;
  isMobile?: boolean;
}) {
  switch (stepIndex) {
    case 0:
      // Discovery & UX Audit
      return (
        <div className="w-full space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-lg bg-white dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/60 shadow-sm">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-bold text-zinc-500 uppercase">UX Heuristics</span>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">96% PASSED</span>
              </div>
              <div className="w-full bg-zinc-100 dark:bg-zinc-700 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-[96%]" />
              </div>
            </div>

            <div className="p-3.5 rounded-lg bg-white dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/60 shadow-sm">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-bold text-zinc-500 uppercase">Target TTFB</span>
                <span className="text-xs font-bold text-lime-600 dark:text-lime-400">&lt; 80ms</span>
              </div>
              <div className="w-full bg-zinc-100 dark:bg-zinc-700 h-1.5 rounded-full overflow-hidden">
                <div className="bg-lime-500 h-full w-[90%]" />
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-white dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/60 space-y-2.5">
            <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 block">
              Architectural Readiness Checklist
            </span>
            <div className="space-y-2 text-xs">
              {[
                "Target User Personas & Task Matrix Defined",
                "Frontend Tech Stack Evaluation (Next.js 15+)",
                "State Management & Data Layer Schema",
                "Accessibility Standards (WCAG 2.1 AA Compliance)",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
                  <div className="w-4 h-4 rounded-full bg-lime-500/20 text-lime-600 dark:text-lime-400 flex items-center justify-center flex-shrink-0">
                    <IconCheck className="w-3 h-3" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg bg-lime-500/10 border border-lime-500/20 text-xs">
            <span className="font-semibold text-lime-700 dark:text-lime-300">Phase Outcome:</span>
            <span className="font-mono text-zinc-700 dark:text-zinc-300">System Blueprint Approved</span>
          </div>
        </div>
      );

    case 1:
      // Architecture & Wireframing
      return (
        <div className="w-full space-y-4">
          <div className="p-4 rounded-lg bg-white dark:bg-zinc-800/70 border border-zinc-200 dark:border-zinc-700/60">
            <div className="flex items-center justify-between mb-3 text-xs">
              <span className="font-bold text-zinc-800 dark:text-zinc-200">Information Flow Nodes</span>
              <span className="font-mono text-[10px] text-zinc-400">LAYOUT MAP v2.4</span>
            </div>

            {/* Visual Node Graph */}
            <div className="space-y-2">
              <div className="p-2.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <IconDeviceLaptop className="w-4 h-4 text-blue-500" />
                  <span className="text-xs font-semibold">Landing View / Route (/)</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">SSR Hydrated</span>
              </div>

              <div className="pl-6 border-l-2 border-dashed border-zinc-300 dark:border-zinc-700 space-y-2">
                <div className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs">
                  <span className="text-zinc-600 dark:text-zinc-400">├── Hero & Live Metrics Engine</span>
                  <span className="font-mono text-[10px] text-zinc-400">&lt;HeroCore /&gt;</span>
                </div>
                <div className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs">
                  <span className="text-zinc-600 dark:text-zinc-400">├── Portfolio Showcase & Filters</span>
                  <span className="font-mono text-[10px] text-zinc-400">&lt;ProjectGrid /&gt;</span>
                </div>
                <div className="p-2 rounded-lg bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs">
                  <span className="text-zinc-600 dark:text-zinc-400">└── Interactive Workflow System</span>
                  <span className="font-mono text-[10px] text-lime-500">&lt;WorkflowView /&gt;</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
              <span className="block font-bold text-zinc-800 dark:text-zinc-200">3 Breakpoints</span>
              <span className="text-[10px] text-zinc-400">Mobile, Tab, Desk</span>
            </div>
            <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
              <span className="block font-bold text-zinc-800 dark:text-zinc-200">100% Modularity</span>
              <span className="text-[10px] text-zinc-400">Atomic Specs</span>
            </div>
            <div className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
              <span className="block font-bold text-zinc-800 dark:text-zinc-200">Frictionless</span>
              <span className="text-[10px] text-zinc-400">Validated Flows</span>
            </div>
          </div>
        </div>
      );

    case 2:
      // Design Systems & Tokens
      return (
        <div className="w-full space-y-4">
          <div className="p-4 rounded-lg bg-white dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/60 font-mono text-xs">
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-zinc-100 dark:border-zinc-700 text-zinc-500">
              <span>design-tokens.config.ts</span>
              <span className="text-lime-500 font-bold">SYNCHRONIZED</span>
            </div>

            <div className="space-y-1.5 leading-relaxed text-zinc-700 dark:text-zinc-300">
              <div>
                <span className="text-purple-600 dark:text-purple-400">export const</span> tokens = {"{"}
              </div>
              <div className="pl-4">
                colors: {"{"}
              </div>
              <div className="pl-8 flex items-center gap-2">
                primary: <span className="text-lime-600 dark:text-lime-400">&apos;#84cc16&apos;</span>,
                <span className="w-3 h-3 rounded-full bg-[#84cc16] border border-black/20 inline-block" />
              </div>
              <div className="pl-8 flex items-center gap-2">
                surface: <span className="text-zinc-500 dark:text-zinc-400">&apos;#09090b&apos;</span>,
                <span className="w-3 h-3 rounded-full bg-[#09090b] border border-white/20 inline-block" />
              </div>
              <div className="pl-8 flex items-center gap-2">
                accent: <span className="text-emerald-500">&apos;#10b981&apos;</span>,
                <span className="w-3 h-3 rounded-full bg-[#10b981] border border-black/20 inline-block" />
              </div>
              <div className="pl-4">{"}"},</div>
              <div className="pl-4">
                radius: <span className="text-blue-500">&apos;1.25rem&apos;</span>,
              </div>
              <div>{"};"}</div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {[
              { label: "Buttons", count: "12 Variants" },
              { label: "Typography", count: "8 Scales" },
              { label: "Shadows", count: "5 Levels" },
              { label: "Cards", count: "6 Layouts" },
            ].map((atom, i) => (
              <div key={i} className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-center border border-zinc-200 dark:border-zinc-700">
                <span className="text-[11px] font-bold block text-zinc-800 dark:text-zinc-200">{atom.label}</span>
                <span className="text-[9px] text-zinc-400">{atom.count}</span>
              </div>
            ))}
          </div>
        </div>
      );

    case 3:
      // Frontend Engineering
      return (
        <div className="w-full space-y-4">
          <div className="p-4 rounded-lg bg-[#18181b] border border-zinc-800 text-zinc-200 font-mono text-xs shadow-inner">
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-zinc-800 text-[11px] text-zinc-400">
              <span className="flex items-center gap-2">
                <IconTerminal className="w-3.5 h-3.5 text-lime-400" />
                src/components/Experience.tsx
              </span>
              <span className="text-emerald-400">Strict TS ✓</span>
            </div>

            <div className="space-y-1 text-[11px] leading-relaxed overflow-x-auto text-zinc-300">
              <div>
                <span className="text-rose-400">interface</span> <span className="text-yellow-300">ExperienceProps</span> {"{"}
              </div>
              <div className="pl-4 text-zinc-400">
                slug: <span className="text-cyan-300">string</span>;
              </div>
              <div className="pl-4 text-zinc-400">
                isProduction: <span className="text-cyan-300">boolean</span>;
              </div>
              <div>{"}"}</div>
              <div className="pt-1">
                <span className="text-purple-400">export async function</span> <span className="text-blue-400">Page</span>(props: ExperienceProps) {"{"}
              </div>
              <div className="pl-4 text-zinc-400">
                <span className="text-purple-400">const</span> data = <span className="text-purple-400">await</span> <span className="text-yellow-300">fetchPayload</span>(props.slug);
              </div>
              <div className="pl-4">
                <span className="text-purple-400">return</span> &lt;<span className="text-lime-300">ClientMotion</span> payload=&#123;data&#125; /&gt;;
              </div>
              <div>{"}"}</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 p-3 rounded-lg bg-white dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-xs">
            <div className="flex items-center gap-1.5 font-semibold text-zinc-700 dark:text-zinc-300">
              <IconBrandNextjs className="w-4 h-4" /> Next.js 15
            </div>
            <span className="text-zinc-300 dark:text-zinc-600">•</span>
            <div className="flex items-center gap-1.5 font-semibold text-blue-500">
              <IconBrandReact className="w-4 h-4" /> React 19
            </div>
            <span className="text-zinc-300 dark:text-zinc-600">•</span>
            <div className="flex items-center gap-1.5 font-semibold text-sky-500">
              <IconBrandTailwind className="w-4 h-4" /> Tailwind CSS
            </div>
          </div>
        </div>
      );

    case 4:
      // Motion & Micro-Interactions
      return (
        <div className="w-full space-y-4">
          <div className="p-4 rounded-lg bg-white dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/60">
            <div className="flex items-center justify-between mb-3 text-xs">
              <span className="font-bold text-zinc-800 dark:text-zinc-200">Spring Physics & Curve Engine</span>
              <span className="font-mono text-lime-500 text-[10px]">60 FPS SMOOTH</span>
            </div>

            {/* Interactive Physics Visual Card */}
            <div className="p-4 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 flex items-center justify-around gap-2">
              <motion.div
                animate={{
                  y: [-8, 8, -8],
                  rotate: [-2, 2, -2],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2.5,
                  ease: "easeInOut",
                }}
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-lime-400 to-emerald-500 flex items-center justify-center text-zinc-950 shadow-lg shadow-lime-500/20 font-bold"
              >
                <IconSparkles className="w-8 h-8" />
              </motion.div>

              <div className="space-y-1 text-xs font-mono">
                <div className="text-zinc-500">stiffness: <span className="text-zinc-900 dark:text-white font-bold">320</span></div>
                <div className="text-zinc-500">damping: <span className="text-zinc-900 dark:text-white font-bold">25</span></div>
                <div className="text-zinc-500">mass: <span className="text-zinc-900 dark:text-white font-bold">0.8</span></div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="p-2.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
              <span className="font-bold text-zinc-800 dark:text-zinc-200 block">Scroll Linked</span>
              <span className="text-[10px] text-zinc-400">Zero jank reveals</span>
            </div>
            <div className="p-2.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
              <span className="font-bold text-zinc-800 dark:text-zinc-200 block">Gestures</span>
              <span className="text-[10px] text-zinc-400">Touch responsive</span>
            </div>
            <div className="p-2.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
              <span className="font-bold text-zinc-800 dark:text-zinc-200 block">Reduced Motion</span>
              <span className="text-[10px] text-zinc-400">a11y fallback</span>
            </div>
          </div>
        </div>
      );

    case 5:
      // Optimization & Launch
      return (
        <div className="w-full space-y-4">
          {/* Lighthouse Score 100 Badges */}
          <div className="p-4 rounded-lg bg-white dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/60">
            <div className="flex items-center justify-between mb-3 text-xs">
              <span className="font-bold text-zinc-800 dark:text-zinc-200">Google Lighthouse Audit</span>
              <span className="font-mono text-emerald-500 font-bold text-[10px]">VERIFIED 100/100</span>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {[
                { label: "Performance", score: 100 },
                { label: "Accessibility", score: 100 },
                { label: "Best Practices", score: 100 },
                { label: "SEO", score: 100 },
              ].map((m, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1.5 p-2 rounded-lg bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                  <div className="w-10 h-10 rounded-full border-2 border-emerald-500 bg-emerald-500/10 flex items-center justify-center font-mono font-bold text-xs text-emerald-600 dark:text-emerald-400">
                    {m.score}
                  </div>
                  <span className="text-[9px] font-semibold text-zinc-600 dark:text-zinc-400 text-center leading-tight">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-emerald-500 animate-ping" />
              <span className="font-bold text-emerald-700 dark:text-emerald-400">Deploy Status:</span>
              <span className="text-zinc-700 dark:text-zinc-300">Live on Global Edge Network</span>
            </div>
            <IconRocket className="w-4 h-4 text-emerald-500" />
          </div>
        </div>
      );

    default:
      return null;
  }
}
