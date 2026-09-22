"use client";

import React, { useState, useEffect, useCallback } from "react";
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
  IconBriefcase,
  IconPhoto,
  IconX,
  IconZoomIn,
  IconChevronLeft,
  IconChevronRight,
  IconBrandFigma,
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

export interface UIGalleryItem {
  id: string | number;
  title: string;
  slug: string;
  category: string;
  description?: string;
  image_url: string;
  thumbnail_url?: string;
  tools?: string[] | string;
  aspect_ratio?: string;
  figma_url?: string | null;
  preview_url?: string | null;
  is_featured?: boolean;
  order_index?: number;
  created_at?: string;
}

export default function ProjectsClient({
  projects,
  galleries = [],
}: {
  projects: ProjectItem[];
  galleries?: UIGalleryItem[];
}) {
  const { t } = useLanguage();
  const text = t.projectsPage;

  // View Mode Switcher: "CASE_STUDIES" vs "UI_GALLERY"
  const [viewMode, setViewMode] = useState<"CASE_STUDIES" | "UI_GALLERY">(
    "CASE_STUDIES"
  );

  // Lightbox Modal State
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Lightbox Keyboard and Navigation Handlers
  const handleCloseLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  const handleNextLightbox = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return prev + 1 >= galleries.length ? 0 : prev + 1;
    });
  }, [galleries.length]);

  const handlePrevLightbox = useCallback(() => {
    setLightboxIndex((prev) => {
      if (prev === null) return null;
      return prev - 1 < 0 ? galleries.length - 1 : prev - 1;
    });
  }, [galleries.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleCloseLightbox();
      if (e.key === "ArrowRight") handleNextLightbox();
      if (e.key === "ArrowLeft") handlePrevLightbox();
    };
    window.addEventListener("keydown", onKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [lightboxIndex, handleCloseLightbox, handleNextLightbox, handlePrevLightbox]);

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
          className="mb-10 md:mb-14 text-start"
        >
          {/* Flame Orange Brand Status Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand/10 border border-brand/20 text-brand font-mono tracking-widest text-xs font-bold uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
            <span>
              {viewMode === "CASE_STUDIES"
                ? text.badge
                : text.galleryBadge || "/ DESIGN EXPLORATIONS & CRAFT"}
            </span>
          </div>

          {/* Editorial Display Headline */}
          <h1 className="heading-display font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-zinc-900 dark:text-white tracking-tight leading-[1.05] mb-6">
            {viewMode === "CASE_STUDIES" ? (
              <>
                {text.titlePrefix}{" "}
                <span className="text-zinc-400 dark:text-zinc-500 block sm:inline">
                  {text.titleHighlight}
                </span>
              </>
            ) : (
              <>
                {text.galleryTitlePrefix || "Visual"}{" "}
                <span className="text-zinc-400 dark:text-zinc-500 block sm:inline">
                  {text.galleryTitleHighlight || "Archive."}
                </span>
              </>
            )}
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed mb-8">
            {viewMode === "CASE_STUDIES"
              ? text.description
              : text.galleryDescription ||
                "A curated collection of interface explorations, mobile & dashboard concepts, and component craft designed with typographic precision and aesthetic polish."}
          </p>

          {/* Quick Studio Highlight Spec Pills */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-white dark:bg-[#121215] border border-zinc-200/80 dark:border-zinc-800 shadow-sm flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center flex-shrink-0 text-brand">
                <IconLayersLinked className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500 font-bold">
                  01 Production
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
            2. MAIN DUAL-VIEW MODE SWITCHER (Case Studies vs UI Gallery)
            =================================================================== */}
        <div className="mb-12 pb-4 border-b border-zinc-200/80 dark:border-zinc-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="inline-flex p-1.5 rounded-2xl bg-zinc-100/90 dark:bg-[#121215] border border-zinc-200/80 dark:border-zinc-800 shadow-inner max-w-full overflow-x-auto">
            {/* Case Studies Tab */}
            <button
              onClick={() => setViewMode("CASE_STUDIES")}
              className={`relative px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-mono font-bold tracking-wide transition-all duration-200 flex items-center gap-2 flex-shrink-0 ${
                viewMode === "CASE_STUDIES"
                  ? "text-white shadow-sm"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              {viewMode === "CASE_STUDIES" && (
                <motion.div
                  layoutId="activeViewModeTab"
                  className="absolute inset-0 bg-brand rounded-xl shadow-brand shadow-[0_4px_16px_-4px_#F0531C]"
                  transition={{ type: "spring", stiffness: 450, damping: 32 }}
                />
              )}
              <IconBriefcase className="w-4 h-4 relative z-10" />
              <span className="relative z-10">
                {text.tabCaseStudies || "Case Studies"}
              </span>
              <span
                className={`relative z-10 text-[10px] font-mono font-bold px-2 py-0.5 rounded-md transition-colors ${
                  viewMode === "CASE_STUDIES"
                    ? "bg-white/20 text-white"
                    : "bg-zinc-200 dark:bg-zinc-800 text-zinc-500"
                }`}
              >
                {projects.length}
              </span>
            </button>

            {/* UI Gallery Tab */}
            <button
              onClick={() => setViewMode("UI_GALLERY")}
              className={`relative px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-mono font-bold tracking-wide transition-all duration-200 flex items-center gap-2 flex-shrink-0 ${
                viewMode === "UI_GALLERY"
                  ? "text-white shadow-sm"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              {viewMode === "UI_GALLERY" && (
                <motion.div
                  layoutId="activeViewModeTab"
                  className="absolute inset-0 bg-brand rounded-xl shadow-brand shadow-[0_4px_16px_-4px_#F0531C]"
                  transition={{ type: "spring", stiffness: 450, damping: 32 }}
                />
              )}
              <IconPhoto className="w-4 h-4 relative z-10" />
              <span className="relative z-10">
                {text.tabGallery || "UI Gallery & Visual Archive"}
              </span>
              <span
                className={`relative z-10 text-[10px] font-mono font-bold px-2 py-0.5 rounded-md transition-colors ${
                  viewMode === "UI_GALLERY"
                    ? "bg-white/20 text-white"
                    : "bg-zinc-200 dark:bg-zinc-800 text-zinc-500"
                }`}
              >
                {galleries.length}
              </span>
            </button>
          </div>

          <div className="font-mono text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand/80 animate-pulse" />
            <span>
              {viewMode === "CASE_STUDIES"
                ? `${projects.length} Production Case Studies`
                : `${galleries.length} Visual Explorations & Shots`}
            </span>
          </div>
        </div>

        {/* ===================================================================
            3. VIEW MODE CONTENT: CASE STUDIES
            =================================================================== */}
        {viewMode === "CASE_STUDIES" && (
          <div>
            {projects.length === 0 ? (
              <div className="p-12 rounded-3xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 text-center">
                <p className="text-zinc-500 font-mono text-sm">
                  {text.emptyProjects || "No projects found."}
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-12 md:gap-16">
                {projects.map((project, idx) => (
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
          </div>
        )}

        {/* ===================================================================
            4. VIEW MODE CONTENT: UI GALLERY / VISUAL ARCHIVE
            =================================================================== */}
        {viewMode === "UI_GALLERY" && (
          <div>
            {galleries.length === 0 ? (
              <div className="p-12 rounded-3xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 text-center">
                <p className="text-zinc-500 font-mono text-sm">
                  {text.emptyGallery || "No design explorations found."}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {galleries.map((item, idx) => (
                  <motion.div
                    key={item.id || item.slug || idx}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.45, delay: idx * 0.07 }}
                  >
                    <GalleryCard
                      item={item}
                      index={idx}
                      text={text}
                      onInspect={() => setLightboxIndex(idx)}
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ===================================================================
            5. STUDIO BOTTOM CTA SECTION
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

      {/* ===================================================================
          6. INTERACTIVE LIGHTBOX MODAL
          =================================================================== */}
      <AnimatePresence>
        {lightboxIndex !== null && galleries[lightboxIndex] && (
          <GalleryLightboxModal
            item={galleries[lightboxIndex]}
            currentIndex={lightboxIndex}
            total={galleries.length}
            text={text}
            onClose={handleCloseLightbox}
            onNext={handleNextLightbox}
            onPrev={handlePrevLightbox}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

{/* =========================================================================
    UI GALLERY CARD COMPONENT
    ========================================================================= */}
function GalleryCard({
  item,
  index,
  text,
  onInspect,
}: {
  item: UIGalleryItem;
  index: number;
  text: ProjectsPageDictionary;
  onInspect: () => void;
}) {
  const displayNum = index + 1 < 10 ? `0${index + 1}` : `${index + 1}`;
  const toolList = Array.isArray(item.tools)
    ? item.tools
    : typeof item.tools === "string"
    ? (item.tools as string).split(",").map((s) => s.trim())
    : [];

  return (
    <div className="relative w-full h-full flex flex-col">
      {/* Figma Layer Selection Tab */}
      <div className="absolute -top-3.5 left-4 sm:left-6 font-mono text-[11px] font-bold text-brand bg-white dark:bg-[#121214] px-3 py-1 rounded-md border border-brand/30 shadow-sm flex items-center gap-1.5 z-20 tracking-wider">
        <IconLayoutGrid className="w-3.5 h-3.5 text-brand" />
        <span>
          {displayNum} {item.slug || `shot-${displayNum}`}.fig
        </span>
      </div>

      {/* Main Card Frame with 4 Corner Figma Handles */}
      <div className="group relative rounded-2xl sm:rounded-3xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 p-5 sm:p-7 shadow-lg hover:shadow-2xl hover:border-brand/40 dark:hover:border-brand/40 transition-all duration-300 flex flex-col justify-between flex-1 overflow-hidden">
        {/* 4 Corner Figma Handles */}
        <span className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white dark:bg-[#121215] border-2 border-brand rounded-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-30 pointer-events-none" />
        <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white dark:bg-[#121215] border-2 border-brand rounded-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-30 pointer-events-none" />
        <span className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white dark:bg-[#121215] border-2 border-brand rounded-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-30 pointer-events-none" />
        <span className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white dark:bg-[#121215] border-2 border-brand rounded-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-30 pointer-events-none" />

        <div>
          {/* Mockup Canvas Container */}
          <div
            onClick={onInspect}
            className="group/img relative w-full aspect-[16/10] rounded-xl sm:rounded-2xl overflow-hidden border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-100 dark:bg-zinc-900 cursor-pointer shadow-inner mb-5"
          >
            <Image
              src={item.image_url}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-top transition-transform duration-700 ease-out group-hover/img:scale-105"
            />

            {/* Dark glassmorphic hover overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 backdrop-blur-[2px] transition-all duration-300 flex items-center justify-center gap-3">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/90 dark:bg-zinc-900/90 text-zinc-900 dark:text-white text-xs font-mono font-bold uppercase tracking-wider shadow-lg transform translate-y-2 group-hover/img:translate-y-0 transition-transform duration-200">
                <IconZoomIn className="w-4 h-4 text-brand" />
                <span>{text.inspectShot || "Inspect Shot"}</span>
              </span>
            </div>

            {/* Category Pill floating top-right */}
            <div className="absolute top-3 right-3 z-10">
              <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-black/70 text-white backdrop-blur-md border border-white/10 shadow-sm">
                {item.category}
              </span>
            </div>
          </div>

          {/* Title & Description */}
          <h3 className="heading-display font-display text-xl sm:text-2xl font-extrabold text-zinc-900 dark:text-white tracking-tight leading-snug mb-2 group-hover:text-brand transition-colors">
            {item.title}
          </h3>

          {item.description && (
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-2 mb-4">
              {item.description}
            </p>
          )}
        </div>

        {/* Bottom Metadata & Quick Action Bar */}
        <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex flex-wrap items-center justify-between gap-3 mt-auto">
          {/* Tools / Tags */}
          <div className="flex flex-wrap gap-1.5">
            {toolList.slice(0, 3).map((tool, i) => (
              <span
                key={i}
                className="px-2 py-0.5 text-[10px] font-mono font-medium rounded-md bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800"
              >
                {tool}
              </span>
            ))}
            {toolList.length > 3 && (
              <span className="px-1.5 py-0.5 text-[9px] font-mono font-bold rounded-md bg-zinc-100 dark:bg-zinc-900 text-zinc-500 border border-zinc-200 dark:border-zinc-800">
                +{toolList.length - 3}
              </span>
            )}
          </div>

          {/* Action Links */}
          <div className="flex items-center gap-2">
            {item.figma_url && (
              <a
                href={item.figma_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-mono text-xs font-semibold hover:text-brand transition-colors"
                title={text.openFigma || "Open in Figma"}
              >
                <IconBrandFigma className="w-3.5 h-3.5 text-[#F24E1E]" />
                <span className="hidden sm:inline text-[11px]">Figma</span>
              </a>
            )}

            {item.preview_url && (
              <a
                href={item.preview_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-mono text-xs font-semibold hover:text-brand transition-colors"
                title={text.livePreview || "Live Preview"}
              >
                <IconExternalLink className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-[11px]">Preview</span>
              </a>
            )}

            <button
              onClick={onInspect}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-brand/10 hover:bg-brand text-brand hover:text-white border border-brand/20 font-mono text-xs font-bold transition-all duration-200"
            >
              <IconZoomIn className="w-3.5 h-3.5" />
              <span className="text-[11px]">{text.inspectShot || "Inspect"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

{/* =========================================================================
    GALLERY LIGHTBOX MODAL COMPONENT
    ========================================================================= */}
function GalleryLightboxModal({
  item,
  currentIndex,
  total,
  text,
  onClose,
  onNext,
  onPrev,
}: {
  item: UIGalleryItem;
  currentIndex: number;
  total: number;
  text: ProjectsPageDictionary;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  const toolList = Array.isArray(item.tools)
    ? item.tools
    : typeof item.tools === "string"
    ? (item.tools as string).split(",").map((s) => s.trim())
    : [];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 lg:p-8"
    >
      {/* Navigation Arrow Left */}
      {total > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-2 sm:left-6 z-50 w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-zinc-900/80 hover:bg-brand text-zinc-300 hover:text-white border border-zinc-700/60 flex items-center justify-center transition-all duration-200 shadow-xl backdrop-blur-md"
          title={text.lightboxPrev || "Previous"}
        >
          <IconChevronLeft className="w-6 h-6 stroke-[2.5]" />
        </button>
      )}

      {/* Navigation Arrow Right */}
      {total > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-2 sm:right-6 z-50 w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-zinc-900/80 hover:bg-brand text-zinc-300 hover:text-white border border-zinc-700/60 flex items-center justify-center transition-all duration-200 shadow-xl backdrop-blur-md"
          title={text.lightboxNext || "Next"}
        >
          <IconChevronRight className="w-6 h-6 stroke-[2.5]" />
        </button>
      )}

      {/* Modal Dialog Content Container */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 15 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-2xl sm:rounded-3xl bg-[#0e0e11] border border-zinc-800 shadow-2xl overflow-hidden"
      >
        {/* Top Control Bar */}
        <div className="h-12 bg-zinc-900/90 border-b border-zinc-800/90 px-4 sm:px-6 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <span className="font-mono text-xs text-zinc-400 font-medium pl-2 truncate max-w-[180px] sm:max-w-xs">
              {item.slug}.fig
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] text-zinc-500 bg-zinc-800/80 px-2.5 py-1 rounded-md border border-zinc-700/50">
              {currentIndex + 1} / {total}
            </span>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-zinc-800/80 hover:bg-rose-500 text-zinc-400 hover:text-white flex items-center justify-center transition-colors"
              title={text.lightboxClose || "Close (Esc)"}
            >
              <IconX className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Middle Image Showcase Area */}
        <div className="relative flex-1 bg-black/60 min-h-[300px] max-h-[62vh] sm:max-h-[68vh] overflow-hidden flex items-center justify-center p-3 sm:p-5">
          <div className="relative w-full h-full min-h-[280px]">
            <Image
              src={item.image_url}
              alt={item.title}
              fill
              sizes="(max-width: 1280px) 100vw, 1200px"
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Bottom Info Drawer */}
        <div className="p-4 sm:p-6 bg-zinc-950 border-t border-zinc-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 flex-shrink-0">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-brand/15 text-brand border border-brand/30">
                {item.category}
              </span>
              <h4 className="heading-display font-display text-lg sm:text-xl font-bold text-white tracking-tight">
                {item.title}
              </h4>
            </div>

            {item.description && (
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                {item.description}
              </p>
            )}

            {toolList.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider self-center mr-1">
                  {text.lightboxToolsLabel || "Tools"}:
                </span>
                {toolList.map((t, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 text-[10px] font-mono rounded bg-zinc-900 text-zinc-300 border border-zinc-800"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2.5 flex-shrink-0 self-end sm:self-center">
            {item.figma_url && (
              <a
                href={item.figma_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1e1e24] hover:bg-[#282830] text-white font-mono text-xs font-bold border border-zinc-700/60 shadow-sm transition-colors"
              >
                <IconBrandFigma className="w-4 h-4 text-[#F24E1E]" />
                <span>{text.openFigma || "Figma"}</span>
              </a>
            )}

            {item.preview_url && (
              <a
                href={item.preview_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand hover:bg-brand-deep text-white font-mono text-xs font-bold shadow-brand shadow-[0_4px_16px_-4px_#F0531C] transition-all"
              >
                <IconExternalLink className="w-4 h-4" />
                <span>{text.livePreview || "Live Demo"}</span>
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

{/* =========================================================================
    ORIGINAL STUDIO CARD COMPONENT (FOR CASE STUDIES)
    ========================================================================= */}
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
        <div className="h-px w-full bg-zinc-200 dark:border-zinc-800/80 my-6" />

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
