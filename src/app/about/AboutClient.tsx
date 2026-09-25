"use client";

import { useLanguage } from "@/context/language-context";
import { cn } from "@/lib/utils";
import { ExperienceItemLocale } from "@/locales/types";
import {
  IconArrowUpRight,
  IconArrowsRightLeft,
  IconBrandFigma,
  IconBrandFramer,
  IconBrandNextjs,
  IconBrandReact,
  IconBrandTailwind,
  IconBrandTypescript,
  IconCode,
  IconDownload,
  IconMail,
  IconMapPin,
  IconPalette,
  IconSparkles,
} from "@tabler/icons-react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function AboutClient() {
  const { t, locale } = useLanguage();
  const about = t.aboutPage;
  const experiences = t.experience.items;

  return (
    <div className="relative min-h-screen pt-28 sm:pt-32 pb-24 text-zinc-900 dark:text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-6xl">

        {/* ===================================================================
            1. HERO / BIO INTRODUCTION
            =================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24 md:mb-32">
          {/* Left Column: Narrative */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Figma-style Brand Badge */}
            <div className="inline-flex items-center gap-2 py-1 rounded-full text-brand font-mono tracking-widest text-xs font-bold uppercase mb-4">
              <span>{about.badge}</span>
            </div>

            {/* Headline with Plus Jakarta Sans font */}
            <h1 className="heading-display font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-zinc-900 dark:text-white tracking-tight leading-[1.05] mb-6">
              {about.headlineMain}{" "}
              <span className="text-zinc-400 dark:text-zinc-500 block sm:inline">
                {about.headlineSub}
              </span>
            </h1>

            {/* Lead Narrative Text */}
            <p className="text-base sm:text-lg md:text-xl text-zinc-700 dark:text-zinc-300 leading-relaxed mb-4">
              {about.bio1Prefix}
              <span className="font-bold text-zinc-900 dark:text-white underline decoration-brand/50 decoration-2 underline-offset-4">
                {about.bio1Name}
              </span>
              {about.bio1Suffix}
            </p>

            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed mb-8">
              {about.bio2}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <a
                href="/cv/CV-Asep-Syaepul-Rohman.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand hover:bg-brand-deep text-white font-mono font-bold text-xs uppercase tracking-wider shadow-brand shadow-[0_12px_26px_-12px_#F0531C] active:scale-95 transition-all duration-200"
              >
                <IconDownload className="w-4 h-4 stroke-[2.5]" />
                <span>{t.common.buttons.downloadCv}</span>
              </a>

              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white dark:bg-[#121215] hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 font-mono font-bold text-xs uppercase tracking-wider hover:border-brand/40 active:scale-95 transition-all duration-200"
              >
                <span>{about.viewProjectsBtn || "View Projects"}</span>
                <IconArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-900/80 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-mono font-bold text-xs uppercase tracking-wider hover:text-brand transition-colors duration-200"
              >
                <IconMail className="w-4 h-4 stroke-[2]" />
                <span>{about.contactBtn || t.common.buttons.emailMe}</span>
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Visual Photo Card with Metric Chips */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-sm sm:max-w-md">
              {/* Decorative Accent Glow */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-brand/30 via-brand/10 to-transparent rounded-[32px] blur-xl opacity-70 pointer-events-none" />

              {/* Photo Frame Container */}
              <div className="relative rounded-[28px] overflow-hidden bg-white dark:bg-[#121215] border border-zinc-200/90 dark:border-zinc-800/90 shadow-2xl">
                {/* Visual Image */}
                <div className="relative h-96 sm:h-[430px] w-full bg-zinc-100 dark:bg-zinc-900">
                  <Image
                    src="/assets/images/profile.webp"
                    alt="Asep Syaepul Rohman"
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    priority
                    className="object-cover object-top"
                  />
                  {/* Subtle Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                </div>

                {/* Bottom Floating Spec Bar */}
                <div className="p-4 sm:p-5 bg-white/95 dark:bg-[#121215]/95 backdrop-blur-md border-t border-zinc-100 dark:border-zinc-800/80 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-mono text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider block">
                        Asep Syaepul Rohman
                      </span>
                      <span className="font-mono text-[11px] text-zinc-500">
                        {about.rolesHeadline || "UI/UX Designer & Frontend Developer"}
                      </span>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-brand/10 border border-brand/20 font-mono text-[11px] font-bold text-brand">
                      7+ YOE
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-zinc-500 font-mono pt-1">
                    <span className="flex items-center gap-1">
                      <IconMapPin className="w-3.5 h-3.5 text-zinc-400" />
                      {about.location || "Jakarta, Indonesia"}
                    </span>
                    <span>WIB (UTC+7)</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ===================================================================
            2. SKILLS MATRIX & CORE DISCIPLINES BENTO
            =================================================================== */}
        <div className="mb-24 md:mb-32">
          {/* Section Header */}
          <div className="mb-10 text-start">
            <div className="inline-flex items-center gap-2 py-1 rounded-full text-brand font-mono tracking-widest text-xs font-bold uppercase mb-3">
              <span>/ 02 CAPABILITIES</span>
            </div>
            <h2 className="heading-display font-display text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight">
              {about.skillsTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {/* Card 1: UI/UX & Product Design */}
            <div className="relative w-full">
              {/* Figma Layer Selection Tab */}
              <div className="absolute -top-3.5 left-4 sm:left-6 font-mono text-[11px] font-bold text-brand bg-white dark:bg-[#121214] px-3 py-1 rounded-md border border-brand/30 shadow-sm flex items-center gap-1.5 z-20 tracking-wider">
                <IconPalette className="w-3.5 h-3.5 text-brand" />
                <span>02 design-systems.spec</span>
              </div>

              <div className="group relative rounded-3xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 shadow-xl hover:shadow-2xl hover:border-brand/40 dark:hover:border-brand/40 transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="heading-display font-display text-2xl font-bold text-zinc-900 dark:text-white">
                      {about.designTitle}
                    </h3>
                    <p className="font-mono text-xs text-brand font-bold tracking-wider mt-1 uppercase">
                      Design Systems · Research · Prototyping
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand">
                    <IconPalette className="w-5 h-5 text-brand" />
                  </div>
                </div>

                {/* Craft Items */}
                <div className="space-y-3 mb-8">
                  {about.designSkills.map((skill) => (
                    <div
                      key={skill.label}
                      className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 flex items-center justify-between gap-3 transition-colors hover:border-brand/40"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand" />
                        <span className="text-xs sm:text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                          {skill.label}
                        </span>
                      </div>
                      <span className="font-mono text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-brand/10 text-brand border border-brand/20">
                        {skill.percent >= 90 ? "Lead / Senior" : "Advanced"}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Tools row */}
                <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                    Primary Tools
                  </span>
                  <div className="flex items-center gap-4">
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-zinc-600 dark:text-zinc-400 hover:text-brand transition-colors">
                      <IconBrandFigma className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
                      Figma
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-zinc-600 dark:text-zinc-400 hover:text-brand transition-colors">
                      <IconBrandFramer className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
                      Framer
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Frontend Engineering */}
            <div className="relative w-full">
              {/* Code Selection Tab */}
              <div className="absolute -top-3.5 left-4 sm:left-6 font-mono text-[11px] font-bold text-brand bg-white dark:bg-[#121214] px-3 py-1 rounded-md border border-brand/30 shadow-sm flex items-center gap-1.5 z-20 tracking-wider">
                <IconCode className="w-3.5 h-3.5 text-brand" />
                <span>03 engineering.spec</span>
              </div>

              <div className="group relative rounded-3xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 shadow-xl hover:shadow-2xl hover:border-brand/40 dark:hover:border-brand/40 transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="heading-display font-display text-2xl font-bold text-zinc-900 dark:text-white">
                      {about.devTitle}
                    </h3>
                    <p className="font-mono text-xs text-brand font-bold tracking-wider mt-1 uppercase">
                      Next.js · TypeScript · Web Performance
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand">
                    <IconCode className="w-5 h-5 text-brand" />
                  </div>
                </div>

                {/* Craft Items */}
                <div className="space-y-3 mb-8">
                  {about.devSkills.map((skill) => (
                    <div
                      key={skill.label}
                      className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 flex items-center justify-between gap-3 transition-colors hover:border-brand/40"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand" />
                        <span className="text-xs sm:text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                          {skill.label}
                        </span>
                      </div>
                      <span className="font-mono text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-brand/10 text-brand border border-brand/20">
                        {skill.percent >= 90 ? "Production Core" : "Proficient"}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Tools row */}
                <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                    Tech Stack
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1 text-xs font-mono font-medium text-zinc-600 dark:text-zinc-400 hover:text-brand transition-colors">
                      <IconBrandReact className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
                      React
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-mono font-medium text-zinc-600 dark:text-zinc-400 hover:text-brand transition-colors">
                      <IconBrandNextjs className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
                      Next.js
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-mono font-medium text-zinc-600 dark:text-zinc-400 hover:text-brand transition-colors">
                      <IconBrandTypescript className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
                      TS
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-mono font-medium text-zinc-600 dark:text-zinc-400 hover:text-brand transition-colors">
                      <IconBrandTailwind className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
                      Tailwind
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===================================================================
            3. FOUNDATIONS & EDUCATION BENTO
            =================================================================== */}
        <div className="mb-24 md:mb-32">
          {/* Section Header */}
          <div className="mb-10 text-start">
            <div className="inline-flex items-center gap-2 py-1 rounded-full text-brand font-mono tracking-widest text-xs font-bold uppercase mb-3">
              <span>/ 03 ACADEMIC & TRAINING</span>
            </div>
            <h2 className="heading-display font-display text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight">
              {about.foundationsTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {about.education.map((edu, idx) => {
              const displayNum = `0${idx + 1}`;
              return (
                <div
                  key={idx}
                  className="group relative rounded-3xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 p-6 sm:p-7 shadow-lg hover:shadow-xl hover:border-brand/40 dark:hover:border-brand/40 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Header: Index & Year */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-9 h-9 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center font-mono font-bold text-xs text-zinc-500">
                        {displayNum}
                      </div>
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                        {edu.year}
                      </span>
                    </div>

                    <h3 className="heading-display font-display text-xl font-bold text-zinc-900 dark:text-white group-hover:text-brand transition-colors mb-1.5">
                      {edu.school}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
                      {edu.degree}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase text-zinc-400">
                      {locale === "id" ? "Predikat / Hasil" : "Grade / Result"}
                    </span>
                    <span className="inline-block px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 font-mono text-xs font-bold border border-zinc-200 dark:border-zinc-800">
                      {edu.gpa}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ===================================================================
            4. PROFESSIONAL JOURNEY (INTERACTIVE TIMELINE)
            =================================================================== */}
        <div className="mb-20">
          <div className="mb-12 text-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-brand font-mono tracking-widest text-xs font-bold uppercase mb-3">
              <span>/ 04 EXPERIENCES</span>
            </div>
            <h2 className="heading-display font-display text-3xl sm:text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white tracking-tight">
              {about.journeyTitle}
            </h2>
          </div>

          <AboutTimeline experiences={experiences} />
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   ABOUT TIMELINE COMPONENT WITH SCROLL TRACING RAIL
   Matches the portfolio's signature Flame Orange glowing beam & node
   -------------------------------------------------------------------------- */
function AboutTimeline({ experiences }: { experiences: ExperienceItemLocale[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [trackHeight, setTrackHeight] = useState<number>(0);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

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
    <div ref={containerRef} className="relative mt-8">
      {/* Scroll Tracing Rail - mathematically centered at 12px (mobile) and 212px (desktop) */}
      <div
        ref={trackRef}
        className="pointer-events-none absolute bottom-6 top-7 z-0 left-[12px] md:left-[212px] -translate-x-1/2 w-[2px]"
      >
        <div className="h-full w-[2px] rounded-full bg-zinc-200 dark:bg-zinc-800" />
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

      {/* Timeline Rows */}
      <div className="flex flex-col gap-10 md:gap-14">
        {experiences.map((exp, index) => {
          const threshold = index / Math.max(experiences.length - 1, 1);
          return (
            <AboutTimelineRow
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
  );
}

function AboutTimelineRow({
  exp,
  progress,
  threshold,
  isHovered,
  onHover,
  onLeave,
  isReducedMotion,
}: {
  exp: ExperienceItemLocale;
  index: number;
  progress: any;
  threshold: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  isReducedMotion: boolean;
}) {
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
      {/* 1. Left Column (Desktop) - Width: 200px, pt aligns with node and title */}
      <div className="hidden w-[200px] shrink-0 flex-col items-end pr-8 pt-7 md:pt-[39px] md:flex text-right">
        <p className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white leading-tight">
          {exp.period}
        </p>
        <p className="mt-1 font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
          {exp.duration} · {exp.type}
        </p>
        <p className="mt-1 flex items-center gap-1 font-mono text-[11px] text-zinc-400 dark:text-zinc-500">
          <IconMapPin className="h-3 w-3 shrink-0" />
          <span>{exp.location}</span>
        </p>
      </div>

      {/* 2. Center Rail Milestone Node (Flame Orange) - Width: 24px, centered at 212px (desktop) / 12px (mobile) */}
      <div className="absolute left-0 md:relative md:left-auto w-[24px] shrink-0 flex justify-center pt-7 md:pt-[39px] z-10">
        <div
          className={cn(
            "h-[18px] w-[18px] rounded-full border-2 bg-white dark:bg-[#121215] transition-all duration-300 flex items-center justify-center shadow-sm",
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

      {/* 3. Right Column: Studio Timeline Card */}
      <div className="flex-1 min-w-0 pl-10 md:pl-8">
        <div
          className={cn(
            "rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#121215] p-6 sm:p-8 transition-all duration-200 shadow-md",
            isHovered && "border-brand/40 shadow-xl -translate-y-0.5"
          )}
        >
          {/* Mobile Header: Period & Duration */}
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-zinc-100 dark:border-zinc-800/80 pb-3 md:hidden">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
              {exp.period}
            </span>
            <span className="font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
              {exp.duration} · {exp.type}
            </span>
          </div>

          {/* Header Row: Company, Role & Project Scope */}
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="heading-display font-display text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white">
                {exp.company}
              </h3>
              <p className="mt-1 text-sm font-semibold text-brand">
                {exp.role}
              </p>
            </div>
            <span className="shrink-0 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-3.5 py-1 font-mono text-[11px] font-medium text-zinc-700 dark:text-zinc-300">
              {exp.project}
            </span>
          </div>

          {/* Narrative Overview */}
          <p className="mt-4 text-xs sm:text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {exp.description}
          </p>

          {/* Key Contributions */}
          <div className="mt-4 space-y-2">
            {exp.contributions.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                <span className="leading-snug">{item}</span>
              </div>
            ))}
          </div>

          {/* Tech Stack Chips */}
          <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex flex-wrap items-center gap-1.5">
            {exp.tech.map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-wide text-zinc-600 dark:text-zinc-400 transition-colors hover:border-brand/40 hover:text-brand"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
