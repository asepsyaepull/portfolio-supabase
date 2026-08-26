"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  PanInfo,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  IconArrowUpRight,
  IconChevronLeft,
  IconChevronRight,
  IconFolderOff,
} from "@tabler/icons-react";
import type { Project } from "@/types/database";

interface FeaturedProjectsProps {
  projects: Project[];
}

const parseTech = (tech: Project["tech_stack"]): string[] => {
  if (Array.isArray(tech)) return tech;
  return tech ? String(tech).split(",").map((s) => s.trim()).filter(Boolean) : [];
};

const isLiveLink = (link?: string) =>
  typeof link === "string" && /^https?:\/\//.test(link) && !/\.dev\/?$/.test(link);

/**
 * Realistic Laptop 3D Stage Visual
 */
function LaptopStageMockup({
  project,
}: {
  project: Project;
}) {
  const [imgFailed, setImgFailed] = useState(false);
  const imageUrl = project.image || project.image_url;
  const hasImage = !!imageUrl && !imgFailed;

  return (
    <div className="relative aspect-[16/10] md:aspect-[16/9.5] w-full overflow-hidden rounded-[18px] md:rounded-[24px] bg-[#0c111c] flex items-center justify-center p-3 md:p-6 select-none shadow-inner">
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(40,70,120,0.35)_0%,_rgba(12,17,28,0.95)_75%)] pointer-events-none" />

      {/* Stage ground shadow / subtle texture pedestal */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[90%] h-24 bg-black/60 rounded-[100%] blur-xl pointer-events-none" />

      {/* 3D Laptop Container */}
      <div className="relative z-10 w-full max-w-[620px] flex flex-col items-center drop-shadow-2xl">
        {/* Laptop Display (Screen Bezel) */}
        <div className="relative w-full rounded-t-[14px] md:rounded-t-[18px] border-[2px] md:border-[2.5px] border-b-0 border-[#2a303c] bg-[#121620] p-1.5 md:p-2.5 pb-0 shadow-[0_-8px_25px_rgba(0,0,0,0.6)]">
          {/* Camera Notch */}
          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-3.5 h-1 md:w-4 md:h-1.5 rounded-full bg-black flex items-center justify-center z-20">
            <span className="w-1 h-1 rounded-full bg-[#1c2a38]" />
          </div>

          {/* Screen Content Viewport */}
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-[8px] md:rounded-t-[12px] bg-[#090d14]">
            {hasImage ? (
              <Image
                src={imageUrl!}
                alt={project.name}
                fill
                sizes="(max-width: 768px) 85vw, 65vw"
                className="object-cover object-top transition-transform duration-700 group-hover:scale-102"
                onError={() => setImgFailed(true)}
              />
            ) : (
              /* Fallback High-End UI Mockup if image is missing */
              <div className="flex h-full w-full flex-col bg-slate-900 text-left p-4 md:p-6 overflow-hidden">
                {/* Browser top navbar mockup */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-white tracking-wider">
                      {project.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] text-white/50 font-mono">
                    <span>Platform</span>
                    <span>Docs</span>
                    <span>Solutions</span>
                    <span className="rounded bg-white/10 px-2 py-0.5 text-white">Contact</span>
                  </div>
                </div>

                {/* Hero section inside mockup */}
                <div className="mt-4 flex flex-col gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-orange-400">
                    {project.category || "Enterprise Software"}
                  </span>
                  <h4 className="text-sm md:text-lg font-bold text-white leading-tight">
                    {project.description || "Transforming complex data into clear actionable insights."}
                  </h4>
                </div>

                {/* Dashboard metric preview */}
                <div className="mt-4 grid grid-cols-3 gap-2">
                  <div className="rounded-lg bg-white/5 p-2 border border-white/5">
                    <span className="text-[9px] text-white/40 block">Total Volume</span>
                    <span className="text-xs md:text-sm font-mono font-bold text-white">$450,120</span>
                  </div>
                  <div className="rounded-lg bg-white/5 p-2 border border-white/5">
                    <span className="text-[9px] text-white/40 block">Active Users</span>
                    <span className="text-xs md:text-sm font-mono font-bold text-emerald-400">82.4k</span>
                  </div>
                  <div className="rounded-lg bg-white/5 p-2 border border-white/5">
                    <span className="text-[9px] text-white/40 block">Efficiency</span>
                    <span className="text-xs md:text-sm font-mono font-bold text-orange-400">+94%</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Laptop Base & Notch */}
        <div className="relative -mx-2.5 md:-mx-4 h-3 md:h-4 w-[calc(100%+20px)] md:w-[calc(100%+32px)] rounded-b-[10px] md:rounded-b-[14px] border-[2px] md:border-[2.5px] border-t-0 border-[#222834] bg-gradient-to-b from-[#242b38] to-[#151a24] shadow-[0_12px_24px_rgba(0,0,0,0.8)]">
          {/* Display Opening Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-14 md:w-20 h-1 md:h-1.5 rounded-b-md bg-[#111620]" />
        </div>
      </div>
    </div>
  );
}

/**
 * Flexible Interactive Drag Handle Button
 */
function FlexibleDragBadge({
  isDragging,
  onNavigate,
}: {
  isDragging: boolean;
  onNavigate: () => void;
}) {
  return (
    <motion.button
      type="button"
      layout
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      onClick={(e) => {
        e.stopPropagation();
        onNavigate();
      }}
      aria-label="Drag or click to browse next project"
      className={`group absolute right-3 md:right-5 top-1/2 -translate-y-1/2 z-20 flex items-center gap-1.5 rounded-full px-3 md:px-3.5 py-1.5 font-mono text-[10px] md:text-[11px] font-bold backdrop-blur-md border shadow-lg cursor-grab active:cursor-grabbing select-none transition-all duration-200 ${
        isDragging
          ? "bg-[#ff4d00] text-white border-[#ff4d00] shadow-[0_0_15px_rgba(255,77,0,0.5)] scale-105"
          : "bg-black/65 text-white/90 border-white/15 hover:bg-black/85 hover:border-white/30"
      }`}
    >
      <span className="inline-block transition-transform duration-200 group-hover:-translate-x-0.5 text-white/60">
        &lt;
      </span>
      <span className="tracking-wider uppercase">
        {isDragging ? "SLIDING" : "DRAG"}
      </span>
      <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 text-white/60">
        &gt;
      </span>
    </motion.button>
  );
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const display = projects ?? [];
  const total = display.length;

  const [active, setActive] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(1200);
  const [isDragging, setIsDragging] = useState(false);
  const dragDistance = useRef(0);

  // Resize listener to adapt card dimensions
  useEffect(() => {
    const updateW = () => setViewportWidth(window.innerWidth);
    updateW();
    window.addEventListener("resize", updateW);
    return () => window.removeEventListener("resize", updateW);
  }, []);

  // Card dimensions based on screen width
  const cardWidth = Math.min(
    viewportWidth < 640 ? viewportWidth * 0.88 : viewportWidth < 1024 ? viewportWidth * 0.74 : 860,
    920
  );
  const cardGap = viewportWidth < 768 ? 20 : 32;

  // Center offset translation
  const centerOffset = (viewportWidth - cardWidth) / 2;
  const targetX = centerOffset - active * (cardWidth + cardGap);

  // Drag start handler
  const handleDragStart = () => {
    setIsDragging(true);
    dragDistance.current = 0;
  };

  // Handle Drag gesture release with velocity & distance sensitivity
  const handleDragEnd = (_: any, info: PanInfo) => {
    setIsDragging(false);
    const offsetX = info.offset.x;
    const velocityX = info.velocity.x;
    const swipeThreshold = 35;
    const velocityThreshold = 250;

    if ((offsetX < -swipeThreshold || velocityX < -velocityThreshold) && active < total - 1) {
      setActive((prev) => Math.min(total - 1, prev + 1));
    } else if ((offsetX > swipeThreshold || velocityX > velocityThreshold) && active > 0) {
      setActive((prev) => Math.max(0, prev - 1));
    }
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setActive((prev) => Math.max(0, prev - 1));
      } else if (e.key === "ArrowRight") {
        setActive((prev) => Math.min(total - 1, prev + 1));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [total]);

  if (total === 0) {
    return (
      <section id="work" className="relative z-1 py-20">
        <div className="relative z-10 mx-auto max-w-md rounded-3xl bg-white p-8 text-center shadow-xl border border-line">
          <IconFolderOff className="mx-auto h-10 w-10 text-slate-400" />
          <h3 className="mt-3 text-lg font-bold text-slate-900">Belum Ada Proyek</h3>
          <p className="mt-1 text-sm text-slate-500">Proyek unggulan belum tersedia.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="work" className="relative z-1 py-16 md:py-24 overflow-hidden bg-transparent">
      <div className="w-full flex flex-col gap-8 md:gap-10">
        {/* Horizontal Slider Track Area */}
        <div className="relative w-full overflow-visible py-4 touch-pan-y">
          <motion.div
            ref={trackRef}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.25}
            onDragStart={handleDragStart}
            onDrag={(_, info) => {
              dragDistance.current = Math.abs(info.offset.x);
            }}
            onDragEnd={handleDragEnd}
            animate={{ x: targetX }}
            transition={{
              type: "spring",
              stiffness: 280,
              damping: 28,
              mass: 0.6,
            }}
            className="flex items-center cursor-grab active:cursor-grabbing select-none"
          >
            {display.map((project, index) => {
              const isActive = index === active;
              const techList = parseTech(project.tech_stack).slice(0, 3);
              const tagLabel = (project.slug || project.name || "").toLowerCase().replace(/\s+/g, "-");
              const detailUrl = project.slug ? `/projects/${project.slug}` : "#work";
              const externalLink = isLiveLink(project.link) ? (project.link as string) : detailUrl;

              return (
                <div
                  key={project.id ?? index}
                  style={{ width: `${cardWidth}px`, marginRight: `${cardGap}px` }}
                  onClick={() => {
                    if (dragDistance.current < 10 && !isActive) {
                      setActive(index);
                    }
                  }}
                  className={`relative shrink-0 transition-all duration-500 ease-out ${
                    isActive ? "scale-100 z-30 opacity-100" : "scale-[0.94] opacity-85 z-10 cursor-pointer hover:opacity-100"
                  }`}
                >
                  {/* Figma Canvas Selection Bounding Box (Active Card Only) */}
                  {isActive && (
                    <motion.div
                      layoutId="figma-selection-box"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      className="absolute -inset-2 md:-inset-2.5 rounded-[32px] md:rounded-[36px] border-[2px] border-[#2f80ed] pointer-events-none z-40"
                    >
                      {/* Top-Left Tag Badge with Project Identifier */}
                      <div className="absolute -top-6 left-1 bg-[#2f80ed] text-white px-2.5 py-0.5 rounded-[4px] font-mono text-[11px] font-bold lowercase tracking-wider shadow-sm flex items-center gap-1">
                        <span>{tagLabel}</span>
                      </div>

                      {/* 4 Corner Resize Square Handles */}
                      <span className="absolute -top-1 -left-1 w-2.5 h-2.5 bg-white border-[1.5px] border-[#2f80ed] rounded-[2px]" />
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white border-[1.5px] border-[#2f80ed] rounded-[2px]" />
                      <span className="absolute -bottom-1 -left-1 w-2.5 h-2.5 bg-white border-[1.5px] border-[#2f80ed] rounded-[2px]" />
                      <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-white border-[1.5px] border-[#2f80ed] rounded-[2px]" />
                    </motion.div>
                  )}

                  {/* Main White Card Structure */}
                  <div className="group relative w-full rounded-[26px] md:rounded-[32px] bg-white p-3 md:p-4 shadow-[0_20px_50px_-15px_rgba(20,32,43,0.18)] border border-line-2 flex flex-col transition-shadow duration-300 hover:shadow-[0_25px_60px_-12px_rgba(20,32,43,0.24)]">
                    {/* Visual Area (Dark Stage with Laptop Mockup) */}
                    <div className="relative w-full overflow-hidden rounded-[20px] md:rounded-[26px]">
                      <LaptopStageMockup project={project} />

                      {/* Top Right Floating External Arrow Button */}
                      <Link
                        href={externalLink}
                        target={isLiveLink(project.link) ? "_blank" : undefined}
                        rel={isLiveLink(project.link) ? "noopener noreferrer" : undefined}
                        onClick={(e) => {
                          if (dragDistance.current > 10) {
                            e.preventDefault();
                            return;
                          }
                          e.stopPropagation();
                        }}
                        aria-label={`Open ${project.name}`}
                        className="absolute top-3 right-3 md:top-4 md:right-4 z-20 flex h-9 w-9 md:h-11 md:w-11 items-center justify-center rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md text-white border border-white/15 transition-all duration-200 hover:scale-110 shadow-lg"
                      >
                        <IconArrowUpRight size={18} className="md:w-5 md:h-5" />
                      </Link>

                      {/* Floating `< DRAG >` Flexible Badge on Active Card */}
                      {isActive && (
                        <FlexibleDragBadge
                          isDragging={isDragging}
                          onNavigate={() => {
                            setActive((prev) => (prev + 1) % total);
                          }}
                        />
                      )}
                    </div>

                    {/* Bottom Metadata Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-3 px-3 pt-3.5 pb-1 md:px-4 md:pt-4 md:pb-1.5">
                      {/* Left: Colored Square Indicator + Project Title */}
                      <div className="flex items-center gap-2.5">
                        <span
                          className={`h-2.5 w-2.5 rounded-[2px] ${
                            index % 2 === 0 ? "bg-[#ff4d00]" : "bg-[#2f80ed]"
                          }`}
                        />
                        <Link
                          href={detailUrl}
                          onClick={(e) => {
                            if (dragDistance.current > 10) e.preventDefault();
                          }}
                          className="text-lg md:text-2xl font-bold text-ink tracking-tight hover:text-[#ff4d00] transition-colors"
                        >
                          {project.name}
                        </Link>
                      </div>

                      {/* Right: Category & Tech Stack Badges */}
                      <div className="flex flex-wrap items-center gap-1.5 md:gap-2">
                        {/* Primary Accent Category Badge */}
                        <span className="rounded-full bg-orange-50 px-2.5 py-0.5 font-mono text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-orange-600 border border-orange-200/80">
                          {project.category || "YC"}
                        </span>

                        {/* Tech Stack Pills */}
                        {techList.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full bg-slate-100/90 px-2.5 py-0.5 font-mono text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-slate-600 border border-slate-200/80"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Bottom Pagination & Navigation Controls */}
        <div className="relative z-30 flex flex-col items-center gap-3 md:gap-4 px-6">
          {/* Segmented Dash Pagination Indicators */}
          <div className="flex items-center gap-1.5 md:gap-2">
            {display.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Go to project ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === active
                    ? "w-8 md:w-9 bg-[#ff4d00] shadow-[0_0_8px_rgba(255,77,0,0.4)]"
                    : "w-6 md:w-7 bg-ink/15 hover:bg-ink/30"
                }`}
              />
            ))}
          </div>

          {/* Navigation Buttons (< and >) */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setActive((prev) => Math.max(0, prev - 1))}
              disabled={active === 0}
              aria-label="Previous project"
              className="flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-full bg-white text-ink border border-line-2 shadow-sm hover:bg-grid hover:scale-105 active:scale-95 disabled:opacity-35 disabled:hover:scale-100 disabled:cursor-not-allowed transition-all"
            >
              <IconChevronLeft size={18} />
            </button>
            <button
              onClick={() => setActive((prev) => Math.min(total - 1, prev + 1))}
              disabled={active >= total - 1}
              aria-label="Next project"
              className="flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-full bg-white text-ink border border-line-2 shadow-sm hover:bg-grid hover:scale-105 active:scale-95 disabled:opacity-35 disabled:hover:scale-100 disabled:cursor-not-allowed transition-all"
            >
              <IconChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturedProjects;
