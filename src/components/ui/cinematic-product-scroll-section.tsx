"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Sparkles, Layers } from "lucide-react";
import { FigmaTag, FrameLabel } from "@/components/ui/figma-tag";

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

// 2. Product / Project Hero (Sticky Scroll Section Item)
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
        if (progress >= startProgress) {
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
      <div className="relative md:sticky md:top-0 md:left-0 w-full h-auto md:h-screen overflow-hidden bg-transparent flex items-center justify-center py-6 sm:py-8 md:py-0">
        <div className="w-full max-w-[1280px] mx-auto px-4 sm:px-6">

          {/* Frame Label */}
          <div className="mb-3 sm:mb-4 flex items-center justify-between px-2">
            <FrameLabel name={`PROJECT.${product.handle.toUpperCase()}`} className="!text-brand" />
            <span className="font-mono text-[11px] font-bold text-ink-faint">
              1280 × 580
            </span>
          </div>

          {/* Figma Artboard Card Wrapper */}
          <div className="omd-sel relative my-3 sm:my-4">
            <span className="omd-h tl" aria-hidden />
            <span className="omd-h tr" aria-hidden />
            <span className="omd-h bl" aria-hidden />
            <span className="omd-h br" aria-hidden />

            <FigmaTag variant="blue" className="-top-3 left-6 z-20">
              {product.handle}.fig
            </FigmaTag>

            {/* Inner card with light/dark theme background */}
            <div className="relative overflow-hidden rounded-[28px] border border-line-2 dark:border-white/10 bg-white dark:bg-[#121B24] p-6 sm:p-8 md:p-10 lg:p-12 shadow-[0_24px_60px_-24px_rgba(20,32,43,0.18)] dark:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.5)]">
              {/* Inner Content Grid */}
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 items-center gap-6 sm:gap-8 lg:gap-12">

                {/* Images Viewport Side */}
                <div
                  className={`relative w-full col-span-1 md:col-span-7 flex items-center justify-center ${
                    reversed ? "md:order-2" : "md:order-1"
                  }`}
                >
                  <div className="relative w-full aspect-[16/10] overflow-hidden rounded-xl md:rounded-[20px] border border-line-2 dark:border-white/10 bg-slate-100 dark:bg-slate-950 shadow-inner group/window">
                    {/* Window Bar Tag */}
                    <div className="absolute top-3.5 left-4 z-30 flex items-center gap-2 bg-white/90 dark:bg-[#121B24]/90 backdrop-blur-md px-2.5 py-1 rounded-md border border-line-2 dark:border-white/10 shadow-xs">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_0_2px_rgba(39,192,107,0.25)]" />
                      <span className="font-mono text-[10px] font-bold text-ink dark:text-white uppercase tracking-wider">
                        {product.handle}.view
                      </span>
                    </div>

                    {/* Inner Image Container */}
                    <div className="relative w-full h-full overflow-hidden">
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
                  </div>
                </div>

                {/* Content Side */}
                <div
                  className={`col-span-1 md:col-span-5 flex items-center justify-center py-2 relative z-20 ${
                    reversed ? "md:order-1" : "md:order-2"
                  }`}
                >
                  <div className="w-full flex flex-col gap-5 md:gap-6">

                    {/* Step 1: Category, Title & Timeline */}
                    <div
                      className="reveal-step transition-all duration-700 ease-out opacity-0 translate-y-6 [&.active]:opacity-100 [&.active]:translate-y-0"
                      data-progress="0"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-mono text-[11px] font-bold text-brand uppercase tracking-[0.16em]">
                          / {categoryLabel}
                        </span>
                      </div>

                      <h2 className="font-display heading-display text-2xl sm:text-3xl md:text-[2.6rem] font-bold tracking-tight text-ink dark:text-white leading-[1.06] mb-2.5">
                        {product.title}
                      </h2>

                      <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-ink-soft dark:text-slate-300 tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand" />
                        <span>{badgeTimeline}</span>
                      </div>
                    </div>

                    {/* Step 2: Project Narrative & Impact */}
                    <div
                      className="reveal-step transition-all duration-700 ease-out opacity-0 translate-y-6 [&.active]:opacity-100 [&.active]:translate-y-0"
                      data-progress="0.25"
                    >
                      <p className="font-body text-sm md:text-[15px] leading-relaxed text-ink-soft dark:text-slate-300 font-normal pt-4 border-t border-line-2 dark:border-white/10">
                        {product.description}
                      </p>
                    </div>

                    {/* Step 3: Architecture & Tech Stack */}
                    {product.sizes && product.sizes.length > 0 && (
                      <div
                        className="reveal-step flex flex-col gap-2.5 transition-all duration-700 ease-out opacity-0 translate-y-6 [&.active]:opacity-100 [&.active]:translate-y-0 pt-1"
                        data-progress="0.5"
                      >
                        <span className="block font-mono text-[10px] font-bold text-ink-faint dark:text-slate-400 uppercase tracking-widest">
                          TECH STACK & TOOLS
                        </span>
                        <div className="flex gap-2 flex-wrap">
                          {product.sizes.map((size: string, i: number) => (
                            <span
                              key={i}
                              className="font-mono text-[11px] font-semibold text-ink dark:text-slate-200 bg-slate-50 dark:bg-white/5 border border-line-2 dark:border-white/10 px-2.5 py-1 rounded-md shadow-2xs"
                            >
                              {size}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Step 4: Explore Case Study Action Button */}
                    <div
                      className="reveal-step pt-2 transition-all duration-700 ease-out opacity-0 translate-y-6 [&.active]:opacity-100 [&.active]:translate-y-0"
                      data-progress="0.75"
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
      {/* Bottom Full Archive Action Button */}
      <div className="relative z-20 flex justify-center pt-10 pb-20 md:pt-14 md:pb-28">
        <Link
          href={buttonLink}
          className="group omd-btn-primary !px-8 !py-4 font-mono text-xs sm:text-sm font-bold uppercase tracking-[0.14em] flex items-center justify-center gap-2.5 rounded-xl shadow-brand hover:bg-brand-deep cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
        >
          <span>{finalButtonText}</span>
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </div>

  );
}

export const CinematicProductScrollSection = Component;
export default Component;
