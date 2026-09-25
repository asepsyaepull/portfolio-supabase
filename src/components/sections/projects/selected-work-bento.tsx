"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  IconArrowRight,
  IconArrowUpRight,
  IconExternalLink,
  IconLayersLinked,
  IconLayoutGrid,
  IconSparkles,
} from "@tabler/icons-react";
import { FrameLabel } from "@/components/ui/figma-tag";
import { useLanguage } from "@/context/language-context";
import { EmptyState } from "@/components/ui/empty-state";
import type { Project } from "@/types/database";

export interface SelectedWorkBentoProps {
  projects?: Project[];
  title?: string;
  subtitle?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  archiveTag?: string;
  archiveTitle?: string;
  archiveDescription?: string;
}

export function SelectedWorkBento({
  projects = [],
  title,
  subtitle,
  description,
  buttonText,
  buttonLink = "/projects",
  archiveTag,
  archiveTitle,
  archiveDescription,
}: SelectedWorkBentoProps) {
  const { t, locale } = useLanguage();

  const activeTitle = title || t.work.cinematicTitle || "PROJECTS";
  const activeSubtitle =
    subtitle || t.work.cinematicSubtitle || "SELECTED WORK";
  const activeDescription =
    description ||
    t.work.cinematicDescription ||
    "Koleksi kurasi produk web berdampak tinggi, design system, dan rekayasa frontend.";
  const activeButtonText =
    buttonText || t.work.cinematicButton || "View All";

  const activeArchiveTag =
    archiveTag || t.work.archiveCalloutTag || "/ CONTINUOUS ARCHIVE";
  const activeArchiveTitle =
    archiveTitle ||
    t.work.archiveCalloutTitle ||
    "Ingin melihat studi kasus arsitektur, flow design, dan prototype lainnya?";
  const activeArchiveDescription =
    archiveDescription ||
    t.work.archiveCalloutDescription ||
    "Tersedia dokumentasi lengkap mulai dari UX Discovery hingga implementasi kode produksi.";

  const titleParts = activeTitle.split(" ");
  const titleFirst = titleParts[0];
  const titleRest = titleParts.slice(1).join(" ");

  // Take up to 5 featured projects
  const displayProjects = projects.slice(0, 5);
  const heroProject = displayProjects[0];
  const secondaryProjects = displayProjects.slice(1, 3);
  const tertiaryProjects = displayProjects.slice(3, 5);

  return (
    <section
      id="selected-work-section"
      className="relative z-[1] py-20 md:py-28 overflow-hidden bg-transparent"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-[-10%] w-[45%] h-[45%] bg-brand/5 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-[-10%] w-[45%] h-[45%] bg-tool/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.55 }}
          className="mb-12 md:mb-16 flex flex-col justify-between gap-6 sm:flex-row sm:items-end border-b border-line-2 dark:border-white/10 pb-8"
        >
          <div className="max-w-2xl text-left">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
              <FrameLabel name={activeSubtitle} className="!text-brand" />
            </div>

            <h2 className="heading-display font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-ink dark:text-white uppercase tracking-tight leading-[1.05]">
              {titleFirst}{" "}
              <span className="text-brand">{titleRest || "CRAFT."}</span>
            </h2>

            <p className="mt-3 font-body text-ink-soft dark:text-zinc-400 text-sm sm:text-base leading-relaxed">
              {activeDescription}
            </p>
          </div>

          <Link
            href={buttonLink}
            className="group inline-flex items-center gap-2.5 self-start rounded-full border border-line-2 dark:border-white/10 bg-white/80 dark:bg-[#121B24]/80 px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-ink dark:text-white shadow-xs backdrop-blur-md transition-all hover:border-brand hover:text-brand sm:self-auto shrink-0 active:scale-95"
          >
            <span>
              {activeButtonText}{" "}
              <span className="text-brand font-mono">
                ({projects.length > 0 ? `${projects.length}` : "0"})
              </span>
            </span>
            <IconArrowRight className="h-4 w-4 text-brand transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>

        {/* BENTO GRID SHOWCASE */}
        <div className="flex flex-col gap-6 lg:gap-8">
          {displayProjects.length === 0 ? (
            <EmptyState
              icon={<IconLayoutGrid className="w-7 h-7 stroke-[1.5]" />}
              badge={
                locale === "en"
                  ? "/ REPOSITORY: NO FEATURED PROJECTS"
                  : "/ STATUS: BELUM ADA PROYEK UNGGULAN"
              }
              title={
                locale === "en"
                  ? "No Featured Projects Published"
                  : "Belum Ada Proyek Unggulan"
              }
              description={
                locale === "en"
                  ? "Featured case studies are currently being curated or updated in the database. Explore the entire project directory or get in touch."
                  : "Studi kasus unggulan sedang dalam proses kurasi atau sinkronisasi database. Anda dapat menjelajahi seluruh arsip proyek atau menghubungi saya."
              }
              action={{
                label:
                  locale === "en"
                    ? "Explore All Projects"
                    : "Lihat Direktori Proyek",
                href: buttonLink,
                icon: <IconArrowRight className="w-4 h-4" />,
              }}
              secondaryAction={{
                label: locale === "en" ? "Contact Me" : "Hubungi Saya",
                href: "/contact",
              }}
            />
          ) : (
            <>
              {/* 1. FLAGSHIP HERO PROJECT (Full Width Hero Bento) */}
              {heroProject && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6 }}
                >
                  <HeroBentoCard project={heroProject} />
                </motion.div>
              )}

              {/* 2. DUAL SECONDARY CARDS (2-Column Split) */}
              {secondaryProjects.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                  {secondaryProjects.map((project, idx) => (
                    <motion.div
                      key={project.id || project.slug || idx}
                      initial={{ opacity: 0, y: 28 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                    >
                      <StandardBentoCard project={project} index={idx + 2} />
                    </motion.div>
                  ))}
                </div>
              )}

              {/* 3. TERTIARY PROJECTS (If 4 or 5 projects exist) */}
              {tertiaryProjects.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                  {tertiaryProjects.map((project, idx) => (
                    <motion.div
                      key={project.id || project.slug || idx}
                      initial={{ opacity: 0, y: 28 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                    >
                      <StandardBentoCard project={project} index={idx + 4} />
                    </motion.div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* 4. BOTTOM ARCHIVE CALLOUT BAR */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-4 rounded-2xl bg-white dark:bg-[#121B24] border border-line-2 dark:border-white/10 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm hover:border-brand/30 transition-colors"
          >
            <div className="flex items-center gap-4 text-left">
              <div className="w-12 h-12 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center shrink-0 text-brand">
                <IconLayersLinked className="w-6 h-6" />
              </div>
              <div>
                <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-brand mb-0.5">
                  {activeArchiveTag}
                </div>
                <h4 className="font-display text-base sm:text-lg font-bold text-ink dark:text-white">
                  {activeArchiveTitle}
                </h4>
                <p className="text-xs sm:text-sm text-ink-soft dark:text-zinc-400 mt-0.5">
                  {activeArchiveDescription}
                </p>
              </div>
            </div>

            <Link
              href={buttonLink}
              className="omd-btn-primary w-full sm:w-auto px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-wider shrink-0 flex items-center justify-center gap-2 rounded-xl shadow-brand hover:bg-brand-deep cursor-pointer transition-all duration-200 active:scale-95"
            >
              <span>{activeButtonText}</span>
              <IconArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/**
 * Flagship Hero Bento Card (Project 01)
 */
function HeroBentoCard({ project }: { project: Project }) {
  const { t } = useLanguage();
  const slug = project.slug || "";
  const imageUrl =
    project.image_url ||
    project.image ||
    "/og-image.jpg";

  const techList = Array.isArray(project.tech_stack)
    ? project.tech_stack
    : typeof project.tech_stack === "string"
    ? (project.tech_stack as string).split(",").map((s) => s.trim())
    : [];


  return (
    <div className="relative w-full group/hero">
      {/* Floating Figma Artboard Tab */}
      <div className="absolute -top-3.5 left-6 font-mono text-[11px] font-bold text-brand bg-white dark:bg-[#121B24] px-3.5 py-1 rounded-md border border-brand/30 shadow-xs flex items-center gap-1.5 z-20 tracking-wider">
        <IconLayoutGrid className="w-3.5 h-3.5 text-brand" />
        <span>01 {slug}.fig</span>
      </div>

      {/* Main Container with 4 Corner Figma Handles */}
      <div className="relative rounded-[28px] sm:rounded-[32px] bg-white dark:bg-[#121B24] border border-line-2 dark:border-white/10 p-6 sm:p-8 lg:p-10 shadow-[0_24px_60px_-24px_rgba(20,32,43,0.12)] dark:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-brand/40 overflow-hidden">
        {/* Corner Figma Handles */}
        <span className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white dark:bg-[#121B24] border-2 border-brand rounded-[2px] opacity-0 group-hover/hero:opacity-100 transition-opacity duration-200 z-30 pointer-events-none" />
        <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white dark:bg-[#121B24] border-2 border-brand rounded-[2px] opacity-0 group-hover/hero:opacity-100 transition-opacity duration-200 z-30 pointer-events-none" />
        <span className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white dark:bg-[#121B24] border-2 border-brand rounded-[2px] opacity-0 group-hover/hero:opacity-100 transition-opacity duration-200 z-30 pointer-events-none" />
        <span className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white dark:bg-[#121B24] border-2 border-brand rounded-[2px] opacity-0 group-hover/hero:opacity-100 transition-opacity duration-200 z-30 pointer-events-none" />

        {/* Bento Grid Split: Left Info, Right Browser Mockup */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
          {/* Left Column: Narrative, Metrics & CTAs */}
          <div className="lg:col-span-5 flex flex-col justify-between text-left">
            <div>
              {/* Category & Status Indicator */}
              <div className="flex items-center gap-2 mb-2.5">
                <span className="font-mono text-[11px] font-bold text-brand uppercase tracking-[0.16em]">
                  / {project.category || "FLAGSHIP PRODUCTION"}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="font-mono text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                  LIVE
                </span>
              </div>

              {/* Title */}
              <h3 className="heading-display font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink dark:text-white tracking-tight leading-[1.1] mb-3 group-hover/hero:text-brand transition-colors">
                <Link href={`/projects/${slug}`}>{project.name}</Link>
              </h3>

              {/* Role & Timeline Meta */}
              <div className="flex items-center gap-2 font-mono text-xs font-semibold text-ink-soft dark:text-zinc-400 mb-4">
                <span>{project.role || "Lead UI/UX & Frontend Engineer"}</span>
                <span>·</span>
                <span>{project.timeline || "2023 — 2024"}</span>
              </div>

              {/* Problem / Solution Highlight Box
              <div className="p-4 rounded-xl bg-brand/5 border border-brand/15 text-xs text-ink dark:text-zinc-300 font-normal leading-relaxed mb-5">
                <div className="flex items-center gap-1.5 font-mono text-[10.5px] font-bold uppercase tracking-wider text-brand mb-1">
                  <IconSparkles className="w-3.5 h-3.5" />
                  <span>KEY IMPACT & OUTCOME</span>
                </div>
                <p>
                  {project.solution ||
                    project.problem ||
                    "Unified transactional workflows into a high-performance system, cutting design handoff latency by 45% with multi-branch synchronization."}
                </p>
              </div> */}

              {/* Description */}
              <p className="text-sm text-ink-soft dark:text-zinc-300 leading-relaxed mb-6 font-normal">
                {project.description}
              </p>
            </div>

            {/* Tech Stack Chips & Action Buttons */}
            <div className="pt-2 flex flex-col gap-4">
              <div className="flex flex-wrap gap-1.5">
                {techList.slice(0, 5).map((tech) => (
                  <span
                    key={tech}
                    className="font-mono text-[11px] font-semibold text-ink dark:text-slate-200 bg-slate-100 dark:bg-white/5 border border-line-2 dark:border-white/10 px-2.5 py-1 rounded-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href={`/projects/${slug}`}
                  className="omd-btn-primary px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider rounded-xl shadow-brand hover:bg-brand-deep cursor-pointer transition-all duration-200 active:scale-95"
                >
                  <span>{t.projectsPage?.readCaseStudy || "Lihat Studi Kasus"}</span>
                  <IconArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                </Link>

                {project.link && project.link !== "#" && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-100 dark:bg-zinc-900 hover:bg-slate-200 dark:hover:bg-zinc-800 text-ink dark:text-white border border-line-2 dark:border-white/10 font-mono font-bold text-xs uppercase tracking-wider hover:text-brand transition-colors"
                  >
                    <IconExternalLink className="w-4 h-4" />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Browser Window Mockup */}
          <div className="lg:col-span-7">
            <Link href={`/projects/${slug}`} className="block group/shot">
              <div className="rounded-xl sm:rounded-2xl overflow-hidden border border-line-2 dark:border-white/10 bg-slate-100 dark:bg-[#0E151E] shadow-xl group-hover/shot:shadow-2xl transition-all duration-500">
                {/* Browser Window Header Bar */}
                <div className="h-9 bg-slate-100/90 dark:bg-[#121B24]/90 border-b border-line-2 dark:border-white/10 px-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="max-w-[260px] h-5 bg-white dark:bg-black/40 border border-line-2 dark:border-white/10 rounded-md px-2.5 flex items-center text-[10px] font-mono text-ink-faint dark:text-zinc-400 truncate">
                    https://{slug}.asyaepul.id
                  </div>
                  <div className="font-mono text-[9px] font-bold text-ink-faint uppercase tracking-wider hidden sm:block">
                    1440 × 900
                  </div>
                </div>

                {/* Screenshot Image Container */}
                <div className="relative w-full aspect-[16/10] bg-slate-200 dark:bg-zinc-950 overflow-hidden">
                  <Image
                    src={imageUrl}
                    alt={project.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover/hero:scale-105"
                    priority
                    unoptimized={imageUrl.startsWith("/projects")}
                  />
                  {/* Subtle vignette gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none opacity-60" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Standard Bento Card (Projects 02, 03, etc. - 2-Column Split)
 */
function StandardBentoCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const { t } = useLanguage();
  const displayNum = index < 10 ? `0${index}` : `${index}`;
  const slug = project.slug || "";
  const imageUrl =
    project.image_url ||
    project.image ||
    "/og-image.jpg";

  const techList = Array.isArray(project.tech_stack)
    ? project.tech_stack
    : typeof project.tech_stack === "string"
    ? (project.tech_stack as string).split(",").map((s) => s.trim())
    : [];

  return (
    <div className="relative w-full h-full group/card">
      {/* Floating Figma Artboard Tab */}
      <div className="absolute -top-3.5 left-6 font-mono text-[11px] font-bold text-brand bg-white dark:bg-[#121B24] px-3 py-1 rounded-md border border-brand/30 shadow-xs flex items-center gap-1.5 z-20 tracking-wider">
        <IconLayoutGrid className="w-3.5 h-3.5 text-brand" />
        <span>
          {displayNum} {slug}.fig
        </span>
      </div>

      {/* Main Card Frame with 4 Corner Figma Handles */}
      <div className="relative h-full flex flex-col justify-between rounded-[24px] sm:rounded-[28px] bg-white dark:bg-[#121B24] border border-line-2 dark:border-white/10 p-6 sm:p-7 shadow-[0_20px_50px_-32px_rgba(20,32,43,0.12)] dark:shadow-[0_20px_50px_-32px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-brand/40 overflow-hidden">
        {/* Corner Figma Handles */}
        <span className="absolute -top-1.5 -left-1.5 w-2.5 h-2.5 bg-white dark:bg-[#121B24] border-2 border-brand rounded-[2px] opacity-0 group-hover/card:opacity-100 transition-opacity duration-200 z-30 pointer-events-none" />
        <span className="absolute -top-1.5 -right-1.5 w-2.5 h-2.5 bg-white dark:bg-[#121B24] border-2 border-brand rounded-[2px] opacity-0 group-hover/card:opacity-100 transition-opacity duration-200 z-30 pointer-events-none" />
        <span className="absolute -bottom-1.5 -left-1.5 w-2.5 h-2.5 bg-white dark:bg-[#121B24] border-2 border-brand rounded-[2px] opacity-0 group-hover/card:opacity-100 transition-opacity duration-200 z-30 pointer-events-none" />
        <span className="absolute -bottom-1.5 -right-1.5 w-2.5 h-2.5 bg-white dark:bg-[#121B24] border-2 border-brand rounded-[2px] opacity-0 group-hover/card:opacity-100 transition-opacity duration-200 z-30 pointer-events-none" />

        {/* Top: Browser Mockup Viewport */}
        <div className="mb-6">
          <Link href={`/projects/${slug}`} className="block group/screen">
            <div className="rounded-xl overflow-hidden border border-line-2 dark:border-white/10 bg-slate-100 dark:bg-[#0E151E] shadow-md group-hover/screen:shadow-lg transition-all duration-300">
              {/* Browser bar */}
              <div className="h-7 bg-slate-100/90 dark:bg-[#121B24]/90 border-b border-line-2 dark:border-white/10 px-3 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-500/80" />
                  <span className="w-2 h-2 rounded-full bg-amber-500/80" />
                  <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
                </div>
                <div className="max-w-[180px] h-4 bg-white dark:bg-black/40 border border-line-2 dark:border-white/10 rounded px-2 flex items-center text-[9px] font-mono text-ink-faint dark:text-zinc-400 truncate">
                  https://{slug}.asyaepul.id
                </div>
                <div className="w-6" />
              </div>

              {/* Image */}
              <div className="relative w-full aspect-[16/10] bg-slate-200 dark:bg-zinc-950 overflow-hidden">
                <Image
                  src={imageUrl}
                  alt={project.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover/card:scale-105"
                  unoptimized={imageUrl.startsWith("/projects")}
                />
              </div>
            </div>
          </Link>
        </div>

        {/* Bottom: Info & Action */}
        <div className="flex flex-col justify-between flex-grow text-left">
          <div>
            {/* Meta Category & Timeline */}
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="font-mono text-[10.5px] font-bold text-brand uppercase tracking-wider">
                {displayNum} / {project.category || "CASE STUDY"}
              </span>
              {project.timeline && (
                <span className="font-mono text-[10px] text-ink-faint font-semibold">
                  {project.timeline}
                </span>
              )}
            </div>

            {/* Title */}
            <h4 className="heading-display font-display text-xl sm:text-2xl font-extrabold text-ink dark:text-white tracking-tight leading-snug mb-2.5 group-hover/card:text-brand transition-colors">
              <Link href={`/projects/${slug}`}>{project.name}</Link>
            </h4>

            {/* Description */}
            <p className="text-xs sm:text-sm text-ink-soft dark:text-zinc-400 leading-relaxed line-clamp-3 mb-4 font-normal">
              {project.description}
            </p>
          </div>

          {/* Bottom Row: Tech chips & link */}
          <div className="pt-3 border-t border-line-2 dark:border-white/10 flex items-center justify-between gap-3 mt-auto">
            <div className="flex flex-wrap gap-1.5">
              {techList.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-[10.5px] font-semibold text-ink dark:text-slate-300 bg-slate-100 dark:bg-white/5 border border-line-2 dark:border-white/10 px-2 py-0.5 rounded"
                >
                  {tech}
                </span>
              ))}
              {techList.length > 3 && (
                <span className="font-mono text-[9.5px] font-bold text-ink-faint px-1.5 py-0.5">
                  +{techList.length - 3}
                </span>
              )}
            </div>

            <Link
              href={`/projects/${slug}`}
              className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-brand hover:text-brand-deep transition-colors uppercase tracking-wider shrink-0"
            >
              <span>{t.projectsPage?.readCaseStudy || "Detail"}</span>
              <IconArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectedWorkBento;
