"use client";

import { Project } from "@/types/database";
import {
  IconArrowUpRight,
  IconCheck,
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconExternalLink,
  IconFolderOff,
  IconLayoutGrid,
  IconSparkles,
} from "@tabler/icons-react";
import { AnimatePresence, motion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface FeaturedProjectsProps {
  projects: Project[];
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  // Use projects directly from Supabase database (no hardcoded fallback)
  const displayProjects = projects ?? [];

  const targetRef = useRef<HTMLDivElement>(null);
  const totalSlides = displayProjects.length;
  const [activeSlide, setActiveSlide] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);

  // Track window width for pixel-based horizontal translation
  useEffect(() => {
    const updateWidth = () => setWindowWidth(window.innerWidth);
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Scroll-driven horizontal translation based on viewport progress
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // Pixel-based horizontal translation (numeric values for proper interpolation)
  const maxTranslateX = totalSlides > 1 ? (totalSlides - 1) * windowWidth : 0;
  const rawX = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -maxTranslateX]
  );
  const smoothX = useSpring(rawX, { stiffness: 180, damping: 30, mass: 0.4 });

  // Per-card scroll progress — each card gets its own interpolated opacity/scale/Y
  const cardProgress = displayProjects.map((_, index) => {
    const segmentSize = totalSlides > 1 ? 1 / (totalSlides - 1) : 1;
    const center = index * segmentSize;
    const rangeStart = Math.max(0, center - segmentSize * 0.6);
    const rangeEnd = Math.min(1, center + segmentSize * 0.6);
    return { center, rangeStart, rangeEnd, segmentSize };
  });

  // Update active slide counter in real-time as user scrolls
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const index = Math.min(
        totalSlides - 1,
        Math.max(0, Math.round(latest * (totalSlides - 1)))
      );
      setActiveSlide(index);
    });
    return () => unsubscribe();
  }, [scrollYProgress, totalSlides]);

  // Click to smoothly scroll to any slide
  const scrollToSlide = (index: number) => {
    const safeIndex = Math.max(0, Math.min(totalSlides - 1, index));
    if (!targetRef.current) return;
    const containerTop = targetRef.current.offsetTop;
    const scrollHeight = targetRef.current.offsetHeight - window.innerHeight;
    if (scrollHeight > 0 && totalSlides > 1) {
      const targetScroll = containerTop + (safeIndex / (totalSlides - 1)) * scrollHeight;
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    scrollToSlide(activeSlide - 1);
  };

  const handleNext = () => {
    scrollToSlide(activeSlide + 1);
  };

  if (!displayProjects || displayProjects.length === 0) {
    return (
      <section className="py-20 bg-zinc-50 dark:bg-gray-950 transition-colors duration-300">
        <div className="max-w-md mx-auto px-4 text-center py-16">
          <div className="p-8 rounded-3xl bg-white/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/5 backdrop-blur-sm flex flex-col items-center gap-4">
            <div className="p-3 rounded-full bg-lime-500/10 text-lime-500">
              <IconFolderOff className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Belum Ada Proyek</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Proyek unggulan belum tersedia saat ini. Silakan periksa kembali nanti.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="projects"
      ref={targetRef}
      style={{ height: `${totalSlides * 100}vh` }}
      className="relative bg-zinc-50 dark:bg-[#08080a] text-zinc-900 dark:text-white transition-colors duration-300"
    >
      {/* Sticky Full-Viewport Horizontal Track (OhhMyDesign Pinning) */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-6 md:pt-32 md:pb-8">
        {/* Top Header & Navigation Bar */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20">
          <div className="flex items-center justify-between gap-4 pb-4 border-b border-zinc-200/80 dark:border-zinc-800/80">
            {/* Section Title & Subtitle */}
            <div className="flex items-baseline gap-3">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                Selected <span className="text-zinc-400 dark:text-zinc-500">Projects</span>
              </h2>
            </div>

            {/* Slide Navigation Controls & Counter */}
            <div className="flex items-center gap-2 sm:gap-3">

            </div>
          </div>
        </div>

        {/* Horizontal Sliding Panels Track (Translates on Vertical Scroll) */}
        <div className="relative flex-1 flex items-center justify-start overflow-hidden w-full my-auto">
          <motion.div
            style={{ x: smoothX }}
            className="flex items-center h-full will-change-transform"
          >
            {displayProjects.map((project, index) => (
              <div
                key={project.id || index}
                className="w-screen flex-shrink-0 flex items-center justify-center px-4 sm:px-6 lg:px-12 box-border"
              >
                <ScrollDrivenCard
                  project={project}
                  index={index}
                  totalCount={totalSlides}
                  isActive={activeSlide === index}
                  scrollYProgress={scrollYProgress}
                  cardMeta={cardProgress[index]}
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Scroll Progress Bar & Hints */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20">
          <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 pt-3 border-t border-zinc-200/80 dark:border-zinc-800/80">
            {/* Dynamic Progress Bar */}
            <div className="w-32 sm:w-48 h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-lime-500 rounded-full shadow-[0_0_8px_rgba(132,204,22,0.8)]"
                style={{
                  width: `${((activeSlide + 1) / totalSlides) * 100}%`,
                  transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              />
            </div>

            <div className="flex items-center gap-3">
              {/* Prev / Next Buttons */}
              <div className="flex items-center gap-1">
                <button
                  onClick={handlePrev}
                  disabled={activeSlide === 0}
                  className="w-8 h-8 rounded-lg flex items-center justify-center border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-30 disabled:pointer-events-none transition-all shadow-sm active:scale-95"
                  aria-label="Previous project"
                >
                  <IconChevronLeft className="w-4 h-4 stroke-[2.5]" />
                </button>
                <button
                  onClick={handleNext}
                  disabled={activeSlide === totalSlides - 1}
                  className="w-8 h-8 rounded-lg flex items-center justify-center border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-30 disabled:pointer-events-none transition-all shadow-sm active:scale-95"
                  aria-label="Next project"
                >
                  <IconChevronRight className="w-4 h-4 stroke-[2.5]" />
                </button>
            </div>

              {/* Counter Pill */}
              <div className="font-mono text-xs sm:text-sm font-bold text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800/80 px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-700/60 shadow-sm">
                <span className="text-lime-600 dark:text-lime-400">0{activeSlide + 1}</span> / 0{totalSlides}
              </div>

              {/* Quick Slide Selectors */}
              <div className="hidden sm:flex items-center gap-1.5">
                {displayProjects.map((_, idx) => (
                  <button
                  key={idx}
                  onClick={() => scrollToSlide(idx)}
                  className={`h-7 px-2.5 rounded-md font-mono text-[11px] font-bold transition-all duration-200 ${activeSlide === idx
                    ? "bg-lime-500 text-zinc-950 shadow-md shadow-lime-500/20 scale-105"
                    : "bg-zinc-100 dark:bg-zinc-800/60 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                    }`}
                  aria-label={`Jump to project 0${idx + 1}`}
                >
                  0{idx + 1}
                </button>
              ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Scroll-Driven Card Wrapper (Per-card entrance/exit animation)
   ───────────────────────────────────────────────────────────── */


function ScrollDrivenCard({
  project,
  index,
  totalCount,
  isActive,
  scrollYProgress,
  cardMeta,
}: {
  project: Project;
  index: number;
  totalCount: number;
  isActive: boolean;
  scrollYProgress: MotionValue<number>;
  cardMeta: { center: number; rangeStart: number; rangeEnd: number; segmentSize: number };
}) {
  const { center, rangeStart, rangeEnd } = cardMeta;

  // Per-card opacity: fade in as it approaches center, fade out as it leaves
  const cardOpacity = useTransform(
    scrollYProgress,
    [rangeStart, center, rangeEnd],
    [0.3, 1, 0.3]
  );

  // Per-card scale: smaller when off-center, full size at center
  const cardScale = useTransform(
    scrollYProgress,
    [rangeStart, center, rangeEnd],
    [0.92, 1, 0.92]
  );

  // Per-card vertical shift: slight upward drift into view
  const cardY = useTransform(
    scrollYProgress,
    [rangeStart, center, rangeEnd],
    [30, 0, -30]
  );

  // Smooth the per-card transforms
  const smoothOpacity = useSpring(cardOpacity, { stiffness: 200, damping: 30, mass: 0.3 });
  const smoothScale = useSpring(cardScale, { stiffness: 200, damping: 30, mass: 0.3 });
  const smoothY = useSpring(cardY, { stiffness: 200, damping: 30, mass: 0.3 });

  return (
    <motion.div
      style={{
        opacity: smoothOpacity,
        scale: smoothScale,
        y: smoothY,
      }}
      className="w-full will-change-transform"
    >
      <StudioProjectCard
        project={project}
        index={index}
        totalCount={totalCount}
        isActive={isActive}
      />
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Studio Project Card (OhhMyDesign Aesthetic & Figma Handles)
   ───────────────────────────────────────────────────────────── */
function StudioProjectCard({
  project,
  index,
  totalCount,
  isActive,
}: {
  project: Project;
  index: number;
  totalCount: number;
  isActive: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const techList = Array.isArray(project.tech_stack)
    ? project.tech_stack
    : typeof project.tech_stack === "string"
      ? (project.tech_stack as string).split(",").map((s) => s.trim())
      : [];
  const displayNum = index + 1 < 10 ? `0${index + 1}` : `${index + 1}`;

  return (
    <div className="relative w-full max-w-5xl mx-auto pt-4">
      {/* Figma Layer Selection Tab (Top Left) */}
      <div className="absolute top-0 left-4 sm:left-6 font-mono text-[11px] font-bold text-lime-600 dark:text-lime-400 bg-white dark:bg-[#121214] px-3 py-1 rounded-md border border-lime-500/40 shadow-sm flex items-center gap-1.5 z-20 tracking-wider">
        <IconLayoutGrid className="w-3.5 h-3.5 text-lime-500" />
        <span>{displayNum} {project.slug || `project-${displayNum}`}</span>
      </div>

      {/* Main Studio Card Frame */}
      <div
        className={`group relative rounded-2xl sm:rounded-3xl bg-white dark:bg-[#121215] border transition-all duration-300 p-5 sm:p-7 md:p-8 shadow-2xl overflow-hidden ${isActive
            ? "border-zinc-300 dark:border-zinc-700/80 shadow-lime-500/5 ring-1 ring-lime-500/20"
            : "border-zinc-200 dark:border-zinc-800/80"
          } hover:border-lime-500/50 dark:hover:border-lime-500/50`}
      >
        {/* 4 Corner Figma Handle Points */}
        <span className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white dark:bg-[#121215] border-2 border-lime-500 rounded-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-30" />
        <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white dark:bg-[#121215] border-2 border-lime-500 rounded-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-30" />
        <span className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white dark:bg-[#121215] border-2 border-lime-500 rounded-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-30" />
        <span className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white dark:bg-[#121215] border-2 border-lime-500 rounded-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-30" />

        {/* Ambient Gradient Glow */}
        <div className="pointer-events-none absolute -right-20 -top-20 w-80 h-80 bg-lime-500/10 dark:bg-lime-500/5 rounded-full blur-3xl" />

        {/* Card Top Section: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center relative z-10">
          {/* Left Column: Information & Story */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
            <div>
              {/* 3D Inset Number Tile */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 flex items-center justify-center font-bold text-xl sm:text-2xl text-zinc-400 dark:text-zinc-500 shadow-[inset_0_2px_4px_rgba(255,255,255,0.9),inset_0_-2px_4px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_2px_4px_rgba(255,255,255,0.05),inset_0_-2px_4px_rgba(0,0,0,0.6)] mb-3">
                <span className="text-zinc-700 dark:text-zinc-300">{displayNum}</span>
              </div>

              {/* Dual-Tone Typography Heading */}
              <h3 className="text-2xl sm:text-3xl md:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.15]">
                {project.name}
              </h3>

              {project.category && (
                <div className="font-mono text-xs sm:text-sm font-bold text-lime-600 dark:text-lime-400 mt-1.5 uppercase tracking-wider">
                  {project.category}
                </div>
              )}

              {/* Project Summary Description */}
              <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed mt-2.5 max-w-xl line-clamp-3">
                {project.description}
              </p>
            </div>

            {/* Action Buttons & Quick Tech Chips */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              {project.slug && (
                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-xl bg-lime-500 hover:bg-lime-400 text-zinc-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-lime-500/20 active:scale-95 transition-all duration-200"
                >
                  <span>Case Study</span>
                  <IconArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                </Link>
              )}

              {project.link && project.link !== "#" && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800 font-bold text-xs uppercase tracking-wider active:scale-95 transition-all duration-200"
                >
                  <span>Live Demo</span>
                  <IconExternalLink className="w-3.5 h-3.5" />
                </a>
              )}

              <div className="flex flex-wrap gap-1.5">
                {techList.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-[11px] font-mono font-medium rounded-md bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Browser / App Mockup Window */}
          <div className="lg:col-span-6 relative">
            <Link href={`/projects/${project.slug}`} className="block group/shot">
              <div className="rounded-xl sm:rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 shadow-xl group-hover/shot:shadow-2xl transition-all duration-500">
                {/* Browser Window Chrome Header Bar */}
                <div className="h-8 bg-zinc-100 dark:bg-zinc-900/90 border-b border-zinc-200 dark:border-zinc-800 px-3 flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="flex-1 max-w-[200px] h-4 bg-zinc-200 dark:bg-zinc-800 rounded-full px-2 flex items-center text-[9px] font-mono text-zinc-500 truncate ml-2">
                    https://{project.slug || "project"}.dev
                  </div>
                </div>

                {/* Image Preview Container */}
                <div className="relative w-full h-44 sm:h-52 md:h-60 bg-zinc-200 dark:bg-zinc-950 overflow-hidden">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover object-top transition-transform duration-700 ease-out group-hover/shot:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-zinc-200 dark:from-zinc-900 to-zinc-100 dark:to-zinc-950 text-zinc-400 dark:text-zinc-600">
                      <IconLayoutGrid className="w-8 h-8 opacity-40 animate-pulse" />
                      <span className="font-mono text-xs uppercase tracking-wider">Preview Canvas</span>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Card Divider */}
        <div className="h-px w-full bg-zinc-200 dark:bg-zinc-800/80 my-4 sm:my-5" />

        {/* Expandable Deliverables & Process Drawer */}
        <div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`inline-flex items-center gap-3 px-4 py-2 rounded-xl border text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 ${isOpen
                ? "bg-lime-500/10 border-lime-500/40 text-lime-700 dark:text-lime-400 shadow-sm"
                : "bg-zinc-100 dark:bg-zinc-900/80 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-300 hover:border-lime-500/40"
              }`}
          >
            <span>{isOpen ? "Hide Process & Specs" : "See Process & Deliverables"}</span>
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center transition-transform duration-300 ${isOpen
                  ? "rotate-180 bg-lime-500 text-zinc-950"
                  : "bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
                }`}
            >
              <IconChevronDown className="w-3 h-3 stroke-[2.5]" />
            </div>
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="pt-4 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  {/* Left Drawer Column: The Work / Problem & Solution */}
                  <div className="md:col-span-6 space-y-2.5">
                    <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 block">
                      The Architecture & Challenge
                    </span>
                    <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-5">
                      {project.problem ||
                        project.long_description ||
                        "Engineered modular component architecture with strict accessibility standards, streamlined state management, and optimized asset delivery."}
                    </p>
                    {project.solution && (
                      <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                        <strong className="text-zinc-900 dark:text-zinc-200">Solution: </strong>
                        {project.solution}
                      </p>
                    )}
                  </div>

                  {/* Right Drawer Column: Deliverables & Tech Stack */}
                  <div className="md:col-span-6 space-y-2.5">
                    <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 block">
                      Deliverables & Tech Stack
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {techList.map((tech, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 hover:border-lime-500/40 transition-colors"
                        >
                          <IconCheck className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400 flex-shrink-0" />
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
