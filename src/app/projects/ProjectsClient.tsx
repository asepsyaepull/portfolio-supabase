"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/language-context";
import {
  IconArrowUpRight,
  IconChevronDown,
  IconCheck,
  IconLayoutGrid,
  IconExternalLink,
  IconSparkles,
  IconLayersLinked,
  IconCode,
  IconMail,
  IconDownload,
} from "@tabler/icons-react";
import type { ProjectsPageDictionary } from "@/locales/types";

export interface ProjectItem {
  id: string | number;
  name: string;
  slug: string;
  category: string;
  description: string;
  image: string;
  image_url?: string;
  tech_stack: string[] | string;
  problem?: string;
  solution?: string;
  role?: string;
  timeline?: string;
  link?: string;
  is_featured?: boolean;
}

export default function ProjectsClient({ projects }: { projects: ProjectItem[] }) {
  const { t } = useLanguage();
  const text = t.projectsPage;
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  // Extract unique categories for filter tabs
  const categories = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => {
      if (p.category) {
        set.add(p.category.trim());
      }
    });
    return Array.from(set);
  }, [projects]);

  // Filter projects based on selection
  const filteredProjects = useMemo(() => {
    if (selectedCategory === "ALL") return projects;
    return projects.filter(
      (p) => p.category?.toLowerCase() === selectedCategory.toLowerCase()
    );
  }, [projects, selectedCategory]);

  return (
    <div className="relative min-h-screen pt-28 sm:pt-32 pb-24 text-zinc-900 dark:text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-6xl">
        {/* ===================================================================
            1. HEADER SECTION & BRAND BADGE
            =================================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="mb-14 md:mb-18 text-start"
        >
          {/* Flame Orange Brand Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand/10 border border-brand/20 text-brand font-mono tracking-widest text-xs font-bold uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
            <span>{text.badge}</span>
          </div>

          {/* Editorial Display Headline (Plus Jakarta Sans font) */}
          <h1 className="heading-display font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-zinc-900 dark:text-white tracking-tight leading-[1.05] mb-6">
            {text.titlePrefix}{" "}
            <span className="text-zinc-400 dark:text-zinc-500 block sm:inline">
              {text.titleHighlight}
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed mb-8">
            {text.description}
          </p>

          {/* Quick Studio Highlight Spec Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-white dark:bg-[#121215] border border-zinc-200/80 dark:border-zinc-800 shadow-sm flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center flex-shrink-0 text-brand">
                <IconLayersLinked className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-bold">
                  01 Live Builds
                </div>
                <div className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 truncate">
                  {text.quickSpecs?.production || "100% Production"}
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white dark:bg-[#121215] border border-zinc-200/80 dark:border-zinc-800 shadow-sm flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center flex-shrink-0 text-brand">
                <IconCode className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-bold">
                  02 Disciplines
                </div>
                <div className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 truncate">
                  {text.quickSpecs?.disciplines || "UI/UX & Code"}
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white dark:bg-[#121215] border border-zinc-200/80 dark:border-zinc-800 shadow-sm flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center flex-shrink-0 text-brand">
                <IconSparkles className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-bold">
                  03 Architecture
                </div>
                <div className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 truncate">
                  {text.quickSpecs?.systems || "Token & Scalable"}
                </div>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-white dark:bg-[#121215] border border-zinc-200/80 dark:border-zinc-800 shadow-sm flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center flex-shrink-0 text-brand">
                <IconCheck className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-bold">
                  04 Result
                </div>
                <div className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 truncate">
                  {text.quickSpecs?.impact || "High Conversion"}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ===================================================================
            2. INTERACTIVE CATEGORY FILTER TABS
            =================================================================== */}
        <div className="mb-12">
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-white/80 dark:bg-[#121215]/80 backdrop-blur-md border border-zinc-200/80 dark:border-zinc-800 shadow-sm w-fit max-w-full overflow-x-auto">
            {/* "All" Tab */}
            <button
              onClick={() => setSelectedCategory("ALL")}
              className={`relative px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 flex items-center gap-1.5 ${
                selectedCategory === "ALL"
                  ? "bg-brand text-white shadow-brand shadow-[0_4px_14px_-4px_#F0531C]"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-brand hover:bg-zinc-100/60 dark:hover:bg-zinc-900/60"
              }`}
            >
              <span>{text.allFilter}</span>
              <span
                className={`px-1.5 py-0.2 rounded-md text-[10px] ${
                  selectedCategory === "ALL"
                    ? "bg-white/20 text-white"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500"
                }`}
              >
                {projects.length}
              </span>
            </button>

            {/* Dynamic Category Tabs */}
            {categories.map((cat) => {
              const count = projects.filter(
                (p) => p.category?.toLowerCase() === cat.toLowerCase()
              ).length;
              const isSelected =
                selectedCategory.toLowerCase() === cat.toLowerCase();

              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`relative px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-brand text-white shadow-brand shadow-[0_4px_14px_-4px_#F0531C]"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-brand hover:bg-zinc-100/60 dark:hover:bg-zinc-900/60"
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-md text-[10px] ${
                      isSelected
                        ? "bg-white/20 text-white"
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ===================================================================
            3. STUDIO CARDS VERTICAL LIST
            =================================================================== */}
        {filteredProjects.length === 0 ? (
          <div className="p-12 rounded-3xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 text-center">
            <p className="text-zinc-500 font-mono text-sm">
              {text.emptyProjects || "No projects found matching this filter."}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-12 md:gap-16">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id || project.slug || idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
              >
                <StudioCard project={project} index={idx} text={text} />
              </motion.div>
            ))}
          </div>
        )}

        {/* ===================================================================
            4. STUDIO BOTTOM CTA SECTION
            =================================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mt-24 md:mt-32"
        >
          <div className="relative w-full">
            {/* Figma Layer Selection Tab */}
            <div className="absolute -top-3.5 left-4 sm:left-6 font-mono text-[11px] font-bold text-brand bg-white dark:bg-[#121214] px-3 py-1 rounded-md border border-brand/30 shadow-sm flex items-center gap-1.5 z-20 tracking-wider">
              <IconLayoutGrid className="w-3.5 h-3.5 text-brand" />
              <span>04 get-in-touch.fig</span>
            </div>

            {/* Main Card Frame with 4 Corner Figma Handles */}
            <div className="group relative rounded-3xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 p-8 sm:p-12 shadow-xl hover:shadow-2xl hover:border-brand/40 dark:hover:border-brand/40 transition-all duration-300">
              <span className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white dark:bg-[#121215] border-2 border-brand rounded-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-30 pointer-events-none" />
              <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white dark:bg-[#121215] border-2 border-brand rounded-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-30 pointer-events-none" />
              <span className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white dark:bg-[#121215] border-2 border-brand rounded-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-30 pointer-events-none" />
              <span className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white dark:bg-[#121215] border-2 border-brand rounded-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-30 pointer-events-none" />

              <div className="max-w-2xl text-start">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 border border-brand/20 text-brand font-mono tracking-widest text-[11px] font-bold uppercase mb-4">
                  <span>/ READY TO COLLABORATE</span>
                </div>
                <h3 className="heading-display font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-4">
                  {text.ctaTitle || "Have a project or ambitious idea in mind?"}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed mb-8">
                  {text.ctaDescription ||
                    "Let's collaborate to craft pixel-precise user interfaces and engineer robust, high-performance web applications that scale."}
                </p>

                <div className="flex flex-wrap items-center gap-3.5">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-brand hover:bg-brand-deep text-white font-mono font-bold text-xs uppercase tracking-wider shadow-brand shadow-[0_12px_26px_-12px_#F0531C] active:scale-95 transition-all duration-200"
                  >
                    <IconMail className="w-4 h-4 stroke-[2.5]" />
                    <span>{text.ctaButton || "Get in Touch"}</span>
                  </Link>

                  <a
                    href="/cv/CV-Asep-Syaepul-Rohman.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white dark:bg-[#121215] hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 font-mono font-bold text-xs uppercase tracking-wider hover:border-brand/40 active:scale-95 transition-all duration-200"
                  >
                    <IconDownload className="w-4 h-4 stroke-[2]" />
                    <span>{t.common.buttons.downloadCv}</span>
                  </a>

                  <Link
                    href="/about"
                    className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-zinc-100 dark:bg-zinc-900/80 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-mono font-bold text-xs uppercase tracking-wider hover:text-brand transition-colors duration-200"
                  >
                    <span>{t.common.nav.about}</span>
                    <IconArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function StudioCard({
  project,
  index,
  text,
}: {
  project: ProjectItem;
  index: number;
  text: ProjectsPageDictionary;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const techList = Array.isArray(project.tech_stack)
    ? project.tech_stack
    : typeof project.tech_stack === "string"
    ? (project.tech_stack as string).split(",").map((s) => s.trim())
    : [];
  const displayNum = index + 1 < 10 ? `0${index + 1}` : `${index + 1}`;
  const displayImage = project.image_url || project.image;

  return (
    <div className="relative w-full">
      {/* Figma Layer Selection Tab */}
      <div className="absolute -top-3.5 left-4 sm:left-6 font-mono text-[11px] font-bold text-brand bg-white dark:bg-[#121214] px-3 py-1 rounded-md border border-brand/30 shadow-sm flex items-center gap-1.5 z-20 tracking-wider">
        <IconLayoutGrid className="w-3.5 h-3.5 text-brand" />
        <span>
          {displayNum} {project.slug || `project-${displayNum}`}.fig
        </span>
      </div>

      {/* Main Card Frame with 4 Corner Figma Handles */}
      <div className="group relative rounded-2xl sm:rounded-3xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 md:p-10 shadow-xl hover:shadow-2xl hover:border-brand/40 dark:hover:border-brand/40 transition-all duration-300 overflow-hidden">
        {/* 4 Corner Figma Handles */}
        <span className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white dark:bg-[#121215] border-2 border-brand rounded-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-30 pointer-events-none" />
        <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white dark:bg-[#121215] border-2 border-brand rounded-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-30 pointer-events-none" />
        <span className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white dark:bg-[#121215] border-2 border-brand rounded-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-30 pointer-events-none" />
        <span className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white dark:bg-[#121215] border-2 border-brand rounded-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-30 pointer-events-none" />

        {/* Card Top Section: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
          {/* Left Column: Info */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
            <div>
              {/* 3D Inset Number Tile */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 flex items-center justify-center font-bold text-xl sm:text-2xl text-zinc-700 dark:text-zinc-300 shadow-[inset_0_2px_4px_rgba(255,255,255,0.9),inset_0_-2px_4px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_2px_4px_rgba(255,255,255,0.05),inset_0_-2px_4px_rgba(0,0,0,0.6)] mb-4">
                <span>{displayNum}</span>
              </div>

              {/* Title with Plus Jakarta Sans font */}
              <h3 className="heading-display font-display text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-tight">
                {project.name}
              </h3>

              {/* Category & Timeline Meta */}
              <div className="flex items-center gap-3 mt-2 flex-wrap">
                {project.category && (
                  <span className="font-mono text-xs sm:text-sm font-bold text-brand uppercase tracking-wider">
                    {project.category}
                  </span>
                )}
                {project.timeline && (
                  <>
                    <span className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                    <span className="font-mono text-xs text-zinc-500 font-medium">
                      {project.timeline}
                    </span>
                  </>
                )}
              </div>

              <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed mt-4 line-clamp-3">
                {project.description}
              </p>
            </div>

            {/* Actions & Tech Stack Chips */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href={`/projects/${project.slug}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand hover:bg-brand-deep text-white font-mono font-bold text-xs uppercase tracking-wider shadow-brand shadow-[0_12px_26px_-12px_#F0531C] active:scale-95 transition-all duration-200"
              >
                <span>{text.readCaseStudy}</span>
                <IconArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </Link>

              {project.link && project.link !== "#" && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-mono font-bold text-xs uppercase tracking-wider hover:text-brand transition-colors"
                  title="Visit live deployment"
                >
                  <IconExternalLink className="w-4 h-4 stroke-[2]" />
                  <span className="sr-only sm:not-sr-only">Live Demo</span>
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
                {techList.length > 3 && (
                  <span className="px-2 py-1 text-[10px] font-mono font-semibold rounded-md bg-zinc-100 dark:bg-zinc-900 text-zinc-500 border border-zinc-200 dark:border-zinc-800">
                    +{techList.length - 3}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Browser Window Mockup */}
          <div className="lg:col-span-6 relative">
            <Link href={`/projects/${project.slug}`} className="block group/shot">
              <div className="rounded-xl sm:rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 shadow-xl group-hover/shot:shadow-2xl transition-all duration-500">
                {/* Browser Top Navigation Bar */}
                <div className="h-8 bg-zinc-100 dark:bg-zinc-900/90 border-b border-zinc-200 dark:border-zinc-800 px-3 flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="flex-1 max-w-[220px] h-4 bg-zinc-200 dark:bg-zinc-800 rounded-full px-2 flex items-center text-[9px] font-mono text-zinc-500 truncate ml-2">
                    https://{project.slug || "project"}.asyaepul.id
                  </div>
                </div>

                {/* Browser Screen Content */}
                <div className="relative w-full h-52 sm:h-64 md:h-72 bg-zinc-200 dark:bg-zinc-950 overflow-hidden">
                  {displayImage ? (
                    <Image
                      src={displayImage}
                      alt={project.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover object-top transition-transform duration-700 ease-out group-hover/shot:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-zinc-200 dark:from-zinc-900 to-zinc-100 dark:to-zinc-950 text-zinc-400 dark:text-zinc-600">
                      <IconLayoutGrid className="w-8 h-8 opacity-40 animate-pulse text-brand" />
                      <span className="font-mono text-xs uppercase tracking-wider">
                        Studio Canvas
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Card Divider */}
        <div className="h-px w-full bg-zinc-200 dark:bg-zinc-800/80 my-6" />

        {/* Expandable Architecture & Deliverables Drawer */}
        <div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`inline-flex items-center gap-3 px-4 py-2.5 rounded-xl border text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 ${
              isOpen
                ? "bg-brand/10 border-brand/30 text-brand shadow-sm"
                : "bg-zinc-100 dark:bg-zinc-900/80 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-300 hover:border-brand/40"
            }`}
          >
            <span>{isOpen ? text.hideProcess : text.seeProcess}</span>
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center transition-transform duration-300 ${
                isOpen
                  ? "rotate-180 bg-brand text-white"
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
                <div className="pt-5 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  {/* Scope & Architecture */}
                  <div className="md:col-span-6 space-y-2">
                    <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-brand block">
                      {text.architectureScope}
                    </span>
                    <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {project.problem ||
                        "Structured modular design tokens, scalable component trees, strict keyboard accessibility, and optimized network resource caching."}
                    </p>
                    {project.solution && (
                      <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed pt-1">
                        <strong className="text-zinc-900 dark:text-white font-semibold">
                          Outcome:{" "}
                        </strong>
                        {project.solution}
                      </p>
                    )}
                  </div>

                  {/* Deliverables & Full Tech Stack */}
                  <div className="md:col-span-6 space-y-2">
                    <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-brand block">
                      {text.deliverablesTechStack}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {techList.map((tech, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 hover:border-brand/40 transition-colors"
                        >
                          <IconCheck className="w-3.5 h-3.5 text-brand flex-shrink-0" />
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
