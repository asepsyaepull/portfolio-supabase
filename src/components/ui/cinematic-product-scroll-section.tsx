"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Eye, Sparkles, Layers } from "lucide-react";
import { animate, stagger } from "animejs";

// 1. Data Model & Mock Data (Case Studies / Digital Products)
export interface ProductItem {
  id: string | number;
  title: string;
  handle: string;
  thumbnail: string;
  description: string;
  collection?: {
    title: string;
  };
  category?: string;
  role?: string;
  timeline?: string;
  price?: string; // Timeline / Badge label
  sizes?: string[]; // Tech Stack tags
  link?: string;
  liveUrl?: string;
  githubUrl?: string;
}

export const MOCK_PRODUCTS: ProductItem[] = [
  {
    id: "proj_symbolix",
    title: "Symbolix ERP & POS Ecosystem",
    handle: "symbolix-erp-pos",
    thumbnail:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    description:
      "Architected a high-concurrency Enterprise Resource Planning and Point-of-Sale ecosystem. Engineered for multi-branch real-time sync, lightning-fast cashier checkout, and robust inventory analytics.",
    collection: {
      title: "ENTERPRISE PLATFORM",
    },
    category: "ENTERPRISE PLATFORM",
    role: "Lead UI/UX Developer",
    timeline: "2026 · PRODUCTION BUILD",
    price: "2026 · PRODUCTION BUILD",
    sizes: ["Next.js 15", "TypeScript", "Tailwind CSS", "Supabase", "Radix UI"],
    link: "/projects/symbolix-erp-pos",
  },
  {
    id: "proj_korlantas",
    title: "Korlantas Polri Smart Mobility",
    handle: "korlantas-polri-mobility",
    thumbnail:
      "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=1200&auto=format&fit=crop",
    description:
      "Mission-critical real-time fleet coordination, incident dispatch console, and GIS geospatial tracking interface built for high-reliability command center operations.",
    collection: {
      title: "GOVERNMENT INFRASTRUCTURE",
    },
    category: "GOVERNMENT INFRASTRUCTURE",
    role: "Software Developer",
    timeline: "2025 — 2026 · SYSTEM ARCHITECTURE",
    price: "2025 — 2026 · SYSTEM ARCHITECTURE",
    sizes: ["React", "TypeScript", "Leaflet GIS", "Tailwind CSS", "WebSocket"],
    link: "/projects/korlantas-polri-mobility",
  },
  {
    id: "proj_aether",
    title: "Aether OS Spatial Design System",
    handle: "aether-design-system",
    thumbnail:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
    description:
      "An end-to-end multi-platform design token architecture, interactive component canvas, and hardware-accelerated motion library for enterprise design engineering teams.",
    collection: {
      title: "DESIGN SYSTEM & TOOLING",
    },
    category: "DESIGN SYSTEM & TOOLING",
    role: "Design Technologist",
    timeline: "2024 — 2025 · OPEN ARCHIVE",
    price: "2024 — 2025 · OPEN ARCHIVE",
    sizes: ["Figma Tokens", "Tailwind CSS", "GSAP Motion", "Storybook"],
    link: "/projects/aether-design-system",
  },
];

// 2. Minimal Project Card (Overview Carousel Item)
export function MinimalProductCard({ product }: { product: ProductItem }) {
  const fullImageUrl = product.thumbnail ?? "";
  const cardRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    const card = cardRef.current;
    if (!card) return;

    const touch = e.touches[0];
    const rect = card.getBoundingClientRect();
    const x = ((touch.clientX - rect.left) / rect.width) * 100;
    const y = ((touch.clientY - rect.top) / rect.height) * 100;

    card.style.setProperty("--reveal-x", `${String(x)}%`);
    card.style.setProperty("--reveal-y", `${String(y)}%`);
    setActive(true);
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    card.style.setProperty("--reveal-x", `${String(x)}%`);
    card.style.setProperty("--reveal-y", `${String(y)}%`);
    setActive(true);
  };

  const targetLink = product.link || `/projects/${product.handle}`;
  const categoryName = product.collection?.title || product.category || "CASE STUDY";

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onTouchStart={handleTouchStart}
      onMouseLeave={() => setActive(false)}
      className="group relative block w-full h-full bg-white dark:bg-[#121B24] overflow-hidden rounded-2xl border border-line-2 dark:border-white/10 hover:border-brand/40 shadow-[0_12px_36px_-20px_rgba(20,32,43,0.12)] hover:shadow-[0_20px_50px_-24px_rgba(240,83,28,0.22)] transition-all duration-500"
    >
      {/* Top Figma Layer Marker */}
      <div className="absolute top-2.5 left-3 z-30 flex items-center gap-1.5 bg-white/90 dark:bg-[#121B24]/90 backdrop-blur-md px-2 py-0.5 rounded-md border border-line-2 dark:border-white/10 shadow-xs">
        <span className="w-1.5 h-1.5 rounded-full bg-brand" />
        <span className="font-mono text-[9px] font-bold text-ink dark:text-white uppercase tracking-wider">
          {product.handle}
        </span>
      </div>

      {/* Image Viewport */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 dark:bg-slate-900 border-b border-line-2 dark:border-white/10">
        {/* Background: Grayscale Image */}
        {fullImageUrl && (
          <Image
            src={fullImageUrl}
            alt={product.title}
            fill
            className="object-cover grayscale opacity-90 transition-all duration-1000 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
            unoptimized={fullImageUrl.startsWith("/projects")}
          />
        )}

        {/* Foreground: Color Image (Revealed by interactive circle clipPath) */}
        {fullImageUrl && (
          <div
            className="absolute inset-0 w-full h-full transition-all duration-1000 ease-out group-hover:scale-105"
            style={{
              clipPath: `circle(${
                active ? "150%" : "0%"
              } at var(--reveal-x, 50%) var(--reveal-y, 50%))`,
              transition: "clip-path 2.5s cubic-bezier(0.15, 0.85, 0.35, 1)",
            }}
          >
            <Image
              src={fullImageUrl}
              alt={product.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
              unoptimized={fullImageUrl.startsWith("/projects")}
            />
          </div>
        )}

        {/* Subtle hover gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Hover Pill Action */}
        <div
          className={`absolute bottom-4 left-1/2 -translate-x-1/2 transition-all duration-500 z-30 w-fit ${
            active
              ? "translate-y-0 opacity-100"
              : "translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
          }`}
        >
          <Link
            href={targetLink}
            className="inline-flex items-center gap-1.5 bg-ink text-white dark:bg-white dark:text-ink hover:bg-brand dark:hover:bg-brand hover:text-white dark:hover:text-white font-mono text-[10px] font-bold uppercase tracking-[0.14em] py-2 px-4 rounded-full border border-ink/20 dark:border-white/20 whitespace-nowrap shadow-xl transition-all duration-300 cursor-pointer"
          >
            <span>View Case</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* Typography & Details Section */}
      <div className="flex flex-col p-4 sm:p-5 bg-white dark:bg-[#121B24] relative z-20">
        <span className="font-mono text-[10px] font-bold text-brand uppercase tracking-[0.16em] mb-1">
          {categoryName}
        </span>

        <h4 className="font-display heading-display text-sm sm:text-base font-bold text-ink dark:text-white mb-2 w-full line-clamp-1 group-hover:text-brand transition-colors duration-300">
          {product.title}
        </h4>

        {/* Tech Stack Chips Preview */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="flex items-center gap-1.5 flex-wrap mt-1">
            {product.sizes.slice(0, 3).map((tech, idx) => (
              <span
                key={idx}
                className="font-mono text-[9px] font-semibold text-ink-soft dark:text-slate-300 bg-slate-100 dark:bg-white/5 px-2 py-0.5 rounded border border-line-2 dark:border-white/5"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* 4 Corner Figma Handle Points */}
      <span className="absolute -top-1 -left-1 w-2.5 h-2.5 bg-white dark:bg-[#121B24] border border-brand rounded-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30" />
      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white dark:bg-[#121B24] border border-brand rounded-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30" />
      <span className="absolute -bottom-1 -left-1 w-2.5 h-2.5 bg-white dark:bg-[#121B24] border border-brand rounded-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30" />
      <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-white dark:bg-[#121B24] border border-brand rounded-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30" />
    </div>
  );
}

// 3. Product / Project Hero (Sticky Scroll Section Item)
export function ProductHero({
  product,
  reversed = false,
}: {
  product: ProductItem;
  reversed?: boolean;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const fullImageUrl = product.thumbnail ?? "";

  // Scroll Progress and Color Mask Clip-Path Listener (Animation preserved 100%)
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const mask = section.querySelector<HTMLElement>(".color-mask");

      let progress = 0;

      if (window.innerWidth < 768) {
        const elementTop = rect.top;
        const startReveal = windowHeight;
        const endReveal = windowHeight * 0.25;

        const totalDistance = startReveal - endReveal;
        const currentDistance = startReveal - elementTop;

        progress = currentDistance / totalDistance;
      } else {
        if (rect.top <= 0) {
          const totalScrollableDistance = rect.height - windowHeight;
          if (totalScrollableDistance > 0) {
            progress = Math.abs(rect.top) / totalScrollableDistance;
          }
        }
      }

      progress = Math.min(Math.max(progress, 0), 1);

      if (mask) {
        if (window.innerWidth < 768) {
          mask.style.clipPath = `inset(0 ${100 - progress * 100}% 0 0)`;
        } else {
          mask.style.clipPath = `inset(0 0 ${100 - progress * 100}% 0)`;
        }
      }

      const revealSteps = section.querySelectorAll(".reveal-step");
      revealSteps.forEach((step) => {
        const startProgress = parseFloat(
          step.getAttribute("data-progress") || "0"
        );
        if (progress > startProgress) {
          step.classList.add("active");
        } else {
          step.classList.remove("active");
        }
      });
    };

    handleScroll();

    window.addEventListener("resize", handleScroll);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", handleScroll);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const targetLink = product.link || `/projects/${product.handle}`;
  const categoryLabel = product.collection?.title || product.category || "CASE STUDY";
  const badgeTimeline = product.timeline || product.price || "FEATURED CASE STUDY";

  return (
    <div
      ref={sectionRef}
      className="scroll-section relative h-auto md:h-[250vh] w-full group"
    >
      <div className="relative md:sticky md:top-0 md:left-0 w-full h-auto md:h-screen overflow-hidden bg-transparent flex items-center">
        <div className="w-full h-auto md:h-full grid grid-cols-1 md:grid-cols-12 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-10 md:py-0 items-center gap-8 md:gap-12">

          {/* Images Viewport Side */}
          <div
            className={`relative w-full col-span-1 md:col-span-7 flex items-center justify-center ${
              reversed ? "md:order-2" : ""
            }`}
          >
            {/* Window Container */}
            <div className="relative w-full aspect-[16/10] overflow-hidden rounded-2xl md:rounded-[24px] border border-line-2 dark:border-white/10 bg-white dark:bg-[#121B24] shadow-[0_24px_60px_-24px_rgba(20,32,43,0.22)] p-2 md:p-3.5 group/window">

              {/* Window Bar Tag */}
              <div className="absolute top-4 left-5 z-30 flex items-center gap-2 bg-white/90 dark:bg-[#121B24]/90 backdrop-blur-md px-3 py-1 rounded-md border border-line-2 dark:border-white/10 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_0_2px_rgba(39,192,107,0.25)]" />
                <span className="font-mono text-[10px] font-bold text-ink dark:text-white uppercase tracking-wider">
                  {product.handle}.view
                </span>
              </div>

              {/* Inner Image Container */}
              <div className="relative w-full h-full overflow-hidden rounded-xl md:rounded-[18px] bg-slate-100 dark:bg-slate-950">
                {/* Background: Grayscale Image */}
                <div className="absolute inset-0 w-full h-full flex justify-center bg-transparent">
                  {fullImageUrl && (
                    <Image
                      src={fullImageUrl}
                      alt={product.title}
                      fill
                      className="object-cover grayscale brightness-105"
                      priority
                      unoptimized={fullImageUrl.startsWith("/projects")}
                    />
                  )}
                </div>

                {/* Foreground: Color Image (Clipped by scroll-driven clipPath) */}
                <div
                  className="color-mask absolute inset-0 w-full h-full flex justify-center will-change-[clip-path]"
                  style={{ clipPath: "inset(0 0 100% 0)" }}
                >
                  {fullImageUrl && (
                    <Image
                      src={fullImageUrl}
                      alt={product.title}
                      fill
                      className="object-cover"
                      priority
                      unoptimized={fullImageUrl.startsWith("/projects")}
                    />
                  )}
                </div>
              </div>

              {/* Corner Figma Accents */}
              <span className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white dark:bg-[#121B24] border border-tool rounded-[2px] opacity-80" />
              <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white dark:bg-[#121B24] border border-tool rounded-[2px] opacity-80" />
              <span className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white dark:bg-[#121B24] border border-tool rounded-[2px] opacity-80" />
              <span className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white dark:bg-[#121B24] border border-tool rounded-[2px] opacity-80" />
            </div>
          </div>

          {/* Content Side */}
          <div
            className={`col-span-1 md:col-span-5 flex items-center justify-center py-4 px-2 md:px-4 relative z-20 ${
              reversed ? "md:order-1" : ""
            }`}
          >
            <div className="max-w-md w-full flex flex-col gap-6 md:gap-7">

              {/* Step 1: Category, Title & Timeline */}
              <div
                className="reveal-step transition-all duration-1000 ease-out opacity-0 translate-y-12 [&.active]:opacity-100 [&.active]:translate-y-0"
                data-progress="0.2"
              >
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="font-mono text-[11px] font-bold text-brand uppercase tracking-[0.16em]">
                    / {categoryLabel}
                  </span>
                </div>

                <h2 className="font-display heading-display text-2xl sm:text-3xl md:text-[2.6rem] font-bold tracking-tight text-ink dark:text-white leading-[1.04] mb-3">
                  {product.title}
                </h2>

                <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-ink-soft dark:text-slate-300 tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand" />
                  <span>{badgeTimeline}</span>
                </div>
              </div>

              {/* Step 2: Project Narrative & Impact */}
              <div
                className="reveal-step transition-all duration-1000 ease-out opacity-0 translate-y-12 [&.active]:opacity-100 [&.active]:translate-y-0"
                data-progress="0.4"
              >
                <p className="font-body text-sm md:text-[15px] leading-relaxed text-ink-soft dark:text-slate-300 font-normal pt-5 border-t border-line-2 dark:border-white/10">
                  {product.description}
                </p>
              </div>

              {/* Step 3: Architecture & Tech Stack */}
              {product.sizes && product.sizes.length > 0 && (
                <div
                  className="reveal-step flex flex-col gap-2.5 transition-all duration-1000 ease-out opacity-0 translate-y-12 [&.active]:opacity-100 [&.active]:translate-y-0 pt-2"
                  data-progress="0.6"
                >
                  <span className="block font-mono text-[10px] font-bold text-ink-faint uppercase tracking-widest">
                    TECH STACK & TOOLS
                  </span>
                  <div className="flex gap-2 flex-wrap">
                    {product.sizes.map((size: string, i: number) => (
                      <span
                        key={i}
                        className="font-mono text-[11px] font-semibold text-ink dark:text-slate-200 bg-white dark:bg-[#1A2634] border border-line-2 dark:border-white/10 px-2.5 py-1 rounded-md shadow-2xs"
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Explore Case Study Action Button */}
              <div
                className="reveal-step pt-4 transition-all duration-1000 ease-out opacity-0 translate-y-12 [&.active]:opacity-100 [&.active]:translate-y-0"
                data-progress="0.8"
              >
                <Link href={targetLink} className="w-full block group/btn">
                  <button className="omd-btn-primary w-full h-12 sm:h-14 font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.14em] flex items-center justify-center gap-2.5 rounded-xl shadow-brand hover:bg-brand-deep cursor-pointer transition-all duration-300 hover:scale-[1.01] active:scale-[0.98]">
                    <span>EXPLORE CASE STUDY</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </button>
                </Link>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// 4. Main Unified Cinematic Scroll Section Component
export interface CinematicProductScrollSectionProps {
  products?: ProductItem[];
  title?: string;
  subtitle?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
}

export function Component({
  products = MOCK_PRODUCTS,
  title = "SELECTED CRAFT",
  subtitle = "ARCHIVE // 2024 — 2026",
  description = "A curated selection of high-impact web products, design systems, and frontend engineering crafts.",
  buttonText = "View Full Archive",
  buttonLink = "/projects",
}: CinematicProductScrollSectionProps = {}) {
  const finalTitle = title;
  const finalSubtitle = subtitle;
  const finalDescription = description;
  const finalButtonText = buttonText;

  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const finalCollectionRef = useRef<HTMLDivElement>(null);
  const animeTriggered = useRef(false);

  // Entrance animation for bottom summary collection
  useEffect(() => {
    if (!finalCollectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !animeTriggered.current) {
          if (!finalCollectionRef.current) return;
          animeTriggered.current = true;

          animate(finalCollectionRef.current.querySelectorAll(".anime-card"), {
            translateY: [-60, 0],
            opacity: [0, 1],
            delay: stagger(120),
            duration: 900,
            easing: "easeOutCubic",
          });
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(finalCollectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Horizontal scroll indicator progress calculation
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleContainerScroll = () => {
      const indicator = scrollIndicatorRef.current;
      const track = indicator?.parentElement;
      if (!indicator || !track) return;

      const maxScroll = container.scrollWidth - container.clientWidth;
      if (maxScroll <= 0) {
        track.style.display = "none";
        return;
      } else {
        track.style.display = "block";
      }

      const scrollPercentage =
        (Math.abs(container.scrollLeft) / maxScroll) * 100;
      indicator.style.left = `${scrollPercentage * 0.666}%`;
    };

    container.addEventListener("scroll", handleContainerScroll, {
      passive: true,
    });
    const timeoutId = setTimeout(handleContainerScroll, 100);

    window.addEventListener("resize", handleContainerScroll);

    return () => {
      container.removeEventListener("scroll", handleContainerScroll);
      window.removeEventListener("resize", handleContainerScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  // Grid / reveal observer for smooth entrance
  useEffect(() => {
    if (!containerRef.current) return;

    const gridItems = containerRef.current.querySelectorAll(
      ".grid-item, .reveal"
    );

    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px",
    };

    const gridObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show", "active");
        }
      });
    }, observerOptions);

    gridItems.forEach((item) => {
      gridObserver.observe(item);
    });

    return () => {
      gridObserver.disconnect();
    };
  }, []);

  const mainTitleParts = finalTitle.split(" ");
  const mainTitleFirst = mainTitleParts[0];
  const mainTitleRest = mainTitleParts.slice(1).join(" ");

  return (
    <div
      ref={containerRef}
      className="bg-transparent text-ink dark:text-white antialiased selection:bg-brand selection:text-white w-full animate-fade-in"
    >
      {/* Intro Section - Figma & Editorial Aesthetic */}
      <section className="relative w-full flex flex-col justify-center items-center overflow-hidden bg-transparent">
        {/* Ambient Subtle Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-brand/5 blur-[120px] rounded-full animate-pulse pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-tool/5 blur-[150px] rounded-full pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 text-center px-6 w-full flex flex-col items-center justify-center">

          {/* Subtitle / Frame Tag */}
          <div className="overflow-hidden mb-4 md:mb-6 w-full flex justify-center">
            <span
              className="omd-frame-label font-mono text-[11px] md:text-xs font-bold text-brand uppercase reveal text-center tracking-[0.24em] flex items-center gap-2"
              style={{ animationDelay: "0.2s" }}
            >
              <span className="h-2 w-2 rounded-full bg-brand animate-ping opacity-75" />
              {finalSubtitle}
            </span>
          </div>

          {/* Large Display Title */}
          <h1 className="heading-display text-section-headline font-semibold uppercase text-ink">
            <div className="overflow-hidden w-full flex justify-center">
              <span
                className="block reveal text-center"
                style={{ animationDelay: "0.4s" }}
              >
                {mainTitleFirst}
              </span>
            </div>
            <div className="overflow-hidden mt-1 w-full flex justify-center">
              <span
                className="block text-brand reveal text-center"
                style={{ animationDelay: "0.6s" }}
              >
                {mainTitleRest || "WORKS."}
              </span>
            </div>
          </h1>

          {/* Description */}
          <div className="mt-6 md:mt-10 overflow-hidden w-full flex justify-center">
            <p
              className="font-body text-ink-soft dark:text-slate-300 text-center text-sm md:text-base max-w-xl font-normal leading-relaxed tracking-normal reveal"
              style={{ animationDelay: "0.8s" }}
            >
              {finalDescription}
            </p>
          </div>
        </div>

        {/* Scroll Indicator */}
        {/* <div
          className="absolute bottom-8 md:bottom-12 flex flex-col items-center gap-3 reveal"
          style={{ animationDelay: "1.1s" }}
        >
          <div className="w-[1px] h-12 md:h-16 bg-line-2 dark:bg-white/20 relative overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-transparent via-brand to-transparent animate-scroll-light" />
          </div>
          <span className="font-mono text-[10px] font-bold text-ink-faint dark:text-slate-400 tracking-[0.16em] uppercase">
            SCROLL TO EXPLORE
          </span>
        </div> */}
      </section>

      {/* Projects Sticky Scroll Engine */}
      {products.map((product, index) => (
        <ProductHero
          key={product.id}
          product={product}
          reversed={index % 2 !== 0}
        />
      ))}

      {/* Summary Horizontal Collection */}
      <div
        ref={finalCollectionRef}
        id="final-collection"
        className="bg-transparent w-full pt-16 pb-8 md:pt-24 md:pb-12 border-t border-line-2 dark:border-white/10"
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between border-b border-line-2 dark:border-white/10 pb-4 mb-8">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand" />
              <span className="omd-frame-label font-mono text-[11px] font-bold tracking-[0.18em] text-ink dark:text-white uppercase block">
                INDEX // CASE STUDY ARCHIVE
              </span>
            </div>
            <Link
              href={buttonLink}
              className="group inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase text-ink dark:text-white hover:text-brand transition-colors"
            >
              <span className="tracking-[0.16em]">{finalButtonText}</span>
              <ArrowDown className="w-3.5 h-3.5 transition-transform -rotate-90 group-hover:translate-x-1 text-brand" />
            </Link>
          </div>

          {/* Horizontal Scroll Container */}
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-4 md:gap-6 pb-8 no-scrollbar snap-x snap-mandatory justify-start md:justify-center"
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="anime-card grid-item group cursor-pointer w-[280px] min-w-[280px] sm:w-[320px] sm:min-w-[320px] md:w-[340px] md:min-w-[340px] snap-center flex-shrink-0 opacity-0"
              >
                <MinimalProductCard product={product} />
              </div>
            ))}
          </div>

          {/* Horizontal Scroll Progress Bar */}
          <div className="w-24 h-[3px] bg-line-2 dark:bg-white/10 mx-auto mt-2 rounded-full overflow-hidden relative">
            <div
              ref={scrollIndicatorRef}
              className="h-full bg-brand w-8 rounded-full absolute left-0 transition-all duration-75"
              style={{ left: "0%" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export const CinematicProductScrollSection = Component;
export default Component;
