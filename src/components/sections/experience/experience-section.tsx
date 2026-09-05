"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import {
  IconMapPin,
  IconCheck,
  IconSparkles,
} from "@tabler/icons-react";
import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/language-context";
import { ExperienceItemLocale } from "@/locales/types";

/* --------------------------------------------------------------------------
   EXPERIENCE SECTION
   -------------------------------------------------------------------------- */

export function ExperienceSection() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [trackHeight, setTrackHeight] = useState<number>(0);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const experiences = t.experience.items;

  // Dynamically calculate the continuous rail track height
  useEffect(() => {
    const updateHeight = () => {
      if (trackRef.current) {
        setTrackHeight(trackRef.current.offsetHeight);
      }
    };

    updateHeight();
    const observer = new ResizeObserver(updateHeight);
    if (trackRef.current) observer.observe(trackRef.current);

    const timer = setTimeout(updateHeight, 250);
    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [experiences]);

  // Framer Motion Scroll Progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 30%", "end 80%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    restDelta: 0.001,
  });

  const beamHeight = useTransform(smoothProgress, [0, 1], [0, trackHeight]);
  const beamOpacity = useTransform(smoothProgress, [0, 0.03], [0, 1]);

  return (
    <section
      id="experience"
      className="relative z-[1] px-4 py-24 md:py-32"
    >
      <div className="mx-auto max-w-5xl">
        {/* Section Header */}
        <SectionHeader
          title={
            <>
              {t.experience.titlePrefix}{" "}
              <span className="text-brand">{t.experience.titleHighlight}</span>
            </>
          }
          subtitle={t.experience.subtitle}
        />

        {/* Timeline Container */}
        <div ref={containerRef} className="relative mt-16 md:mt-20">
          {/* Continuous Scroll Tracing Beam (Dead-center aligned: 12px mobile / 212px desktop) */}
          <div
            ref={trackRef}
            className="pointer-events-none absolute bottom-6 top-5 z-0 left-[11px] md:left-[211px] w-[2px]"
          >
            {/* Background muted track line */}
            <div className="h-full w-[2px] rounded-full bg-zinc-200/80 dark:bg-zinc-800" />

            {/* Glowing Scroll Beam */}
            {!prefersReducedMotion && (
              <motion.div
                style={{
                  height: beamHeight,
                  opacity: beamOpacity,
                }}
                className="absolute inset-x-0 top-0 w-[2px] rounded-full bg-brand shadow-[0_0_10px_rgba(240,83,28,0.7)]"
              />
            )}
          </div>

          {/* Timeline Items */}
          <div className="flex flex-col gap-10 md:gap-14">
            {experiences.map((exp, index) => {
              const threshold = index / Math.max(experiences.length - 1, 1);
              return (
                <TimelineRow
                  key={exp.id}
                  exp={exp}
                  index={index}
                  progress={smoothProgress}
                  threshold={threshold}
                  isHovered={hoveredId === exp.id}
                  onHover={() => setHoveredId(exp.id)}
                  onLeave={() => setHoveredId(null)}
                  isReducedMotion={!!prefersReducedMotion}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------
   INDIVIDUAL TIMELINE ROW COMPONENT
   -------------------------------------------------------------------------- */

interface TimelineRowProps {
  exp: ExperienceItemLocale;
  index: number;
  progress: any;
  threshold: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  isReducedMotion: boolean;
}

function TimelineRow({
  exp,
  progress,
  threshold,
  isHovered,
  onHover,
  onLeave,
  isReducedMotion,
}: TimelineRowProps) {
  const [isPassed, setIsPassed] = useState(false);

  useEffect(() => {
    if (isReducedMotion) {
      setIsPassed(true);
      return;
    }
    const unsubscribe = progress.on("change", (latest: number) => {
      setIsPassed(latest >= threshold);
    });
    return () => unsubscribe();
  }, [progress, threshold, isReducedMotion]);

  const isActive = isPassed || isHovered;

  return (
    <div
      className="relative flex flex-col md:flex-row md:items-start"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* --------------------------------------------------------------------
          1. LEFT COLUMN (DESKTOP): Period, Duration, Location (Width: 200px)
          -------------------------------------------------------------------- */}
      <div className="hidden w-[200px] shrink-0 flex-col items-end pr-8 pt-4 md:flex text-right">
        <p className="font-mono text-xs font-bold uppercase tracking-wider text-ink">
          {exp.period}
        </p>
        <p className="mt-1 font-mono text-[11px] text-ink-faint">
          {exp.duration} · {exp.type}
        </p>
        <p className="mt-1 flex items-center gap-1 font-mono text-[11px] text-ink-faint">
          <IconMapPin className="h-3 w-3 shrink-0 text-ink-faint" />
          <span>{exp.location}</span>
        </p>
      </div>

      {/* --------------------------------------------------------------------
          2. CENTER RAIL: Milestone Node (Width: 24px, Dead Center: 12px)
          -------------------------------------------------------------------- */}
      <div className="absolute left-0 md:relative md:left-auto w-[24px] shrink-0 flex justify-center pt-4 z-10">
        <div
          className={cn(
            "h-[18px] w-[18px] rounded-full border-2 bg-[var(--frame)] transition-all duration-300 flex items-center justify-center shadow-sm",
            isActive
              ? "border-brand shadow-[0_0_10px_rgba(240,83,28,0.5)] scale-105"
              : "border-zinc-300 dark:border-zinc-700"
          )}
        >
          <span
            className={cn(
              "h-2 w-2 rounded-full transition-colors duration-300",
              isActive ? "bg-brand" : "bg-transparent"
            )}
          />
        </div>
      </div>

      {/* --------------------------------------------------------------------
          3. RIGHT COLUMN: Clean, Elevated Experience Card
          -------------------------------------------------------------------- */}
      <div className="flex-1 min-w-0 pl-10 md:pl-8">
        <div
          className={cn(
            "rounded-2xl border border-line-2 bg-[var(--frame)] p-6 md:p-8 transition-all duration-200 shadow-sm",
            isHovered && "border-brand/40 shadow-card -translate-y-0.5"
          )}
        >
          {/* Mobile Header: Period & Duration */}
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-line pb-3 md:hidden">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-ink">
              {exp.period}
            </span>
            <span className="font-mono text-[11px] text-ink-faint">
              {exp.duration} · {exp.type}
            </span>
          </div>

          {/* Header Row: Company, Role & Project Scope */}
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="heading-display text-xl font-bold text-ink md:text-2xl">
                {exp.company}
              </h3>
              <p className="mt-1 text-sm font-semibold text-brand">
                {exp.role}
              </p>
            </div>
            <span className="shrink-0 rounded-full border border-line-2 bg-[var(--grid)] px-3.5 py-1 font-mono text-[11px] font-medium text-ink-soft">
              {exp.project}
            </span>
          </div>

          {/* Narrative Overview */}
          <p className="mt-4 text-[14.5px] leading-relaxed text-ink-soft">
            {exp.description}
          </p>

          {/* Key Contributions */}
          <div className="mt-4 space-y-2">
            {exp.contributions.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs md:text-sm text-ink-soft">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                <span className="leading-snug">{item}</span>
              </div>
            ))}
          </div>

          {/* Tech Stack Chips */}
          <div className="mt-6 pt-4 border-t border-line flex flex-wrap items-center gap-1.5">
            {exp.tech.map((t) => (
              <span
                key={t}
                className="rounded-md border border-line-2 bg-[var(--canvas)]/60 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-ink-soft transition-colors hover:border-brand/40 hover:text-brand"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExperienceSection;
