"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { DotGridBackground } from "@/components/ui/dot-grid-background";
import StatusBadge from "@/components/ui/badge";

export { DotGridBackground, StatusBadge };

/* ─────────────────────────────────────────────────────────────────────────────
   1. TAGLINE COMPONENT
───────────────────────────────────────────────────────────────────────────── */
export interface QuordixHeroTaglineProps {
  tagline?: React.ReactNode;
  className?: string;
}

export function QuordixHeroTagline({ tagline, className }: QuordixHeroTaglineProps) {
  if (!tagline) return null;

  return (
    <span
      className={cn(
        "qhero-tagline-pulse inline-flex items-center gap-1.5 text-xs sm:text-sm font-mono font-bold uppercase tracking-[0.28em] text-brand select-none mb-6",
        className
      )}
    >
      <span className="opacity-60" aria-hidden="true">&lt;</span>
      <span>{tagline}</span>
      <span className="opacity-60" aria-hidden="true">/&gt;</span>
    </span>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   2. GLITCH TITLE COMPONENT
───────────────────────────────────────────────────────────────────────────── */
export interface QuordixHeroGlitchTitleProps {
  titleTop?: React.ReactNode;
  titleGlitch?: string;
  showBrackets?: boolean;
  className?: string;
  titleTopClassName?: string;
  titleGlitchClassName?: string;
}

export function QuordixHeroGlitchTitle({
  titleTop,
  titleGlitch,
  showBrackets = true,
  className,
  titleTopClassName,
  titleGlitchClassName,
}: QuordixHeroGlitchTitleProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center gap-2 relative select-none font-display text-[clamp(2.5rem,8vw,6rem)] font-black leading-[0.85] tracking-tight uppercase",
        className
      )}
    >
      {/* Line 1: Top Title */}
      {titleTop && (
        <span className={cn("text-ink/90 text-center", titleTopClassName)}>
          {titleTop}
        </span>
      )}

      {/* Line 2: Glitch Word with Optional Decorative Brackets */}
      {titleGlitch && (
        <div className="relative inline-flex items-center justify-center text-center">
          {showBrackets && (
            <span
              aria-hidden="true"
              className="absolute right-full mr-[0.25em] top-1/2 -translate-y-1/2 text-[1.05em] font-black leading-none text-brand opacity-20 select-none pointer-events-none inline-flex items-center"
            >
              &lt;
            </span>
          )}

          <span
            className={cn("qhero-glitch text-center", titleGlitchClassName)}
            data-text={titleGlitch}
          >
            {titleGlitch}
          </span>

          {showBrackets && (
            <span
              aria-hidden="true"
              className="absolute left-full ml-[0.25em] top-1/2 -translate-y-1/2 text-[1.05em] font-black leading-none text-brand opacity-20 select-none pointer-events-none whitespace-nowrap inline-flex items-center"
            >
              <span className="text-[0.76em] inline-block font-black scale-y-[0.82] -translate-y-[1%]">
                /
              </span>
              <span>&gt;</span>
            </span>
          )}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   3. ACTIONS (BUTTONS) COMPONENT
───────────────────────────────────────────────────────────────────────────── */
export interface QuordixHeroActionsProps {
  primaryText?: string;
  primaryHref?: string;
  onPrimaryClick?: () => void;
  primaryIcon?: React.ReactNode;
  secondaryText?: string;
  secondaryHref?: string;
  onSecondaryClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

export function QuordixHeroActions({
  primaryText,
  primaryHref,
  onPrimaryClick,
  primaryIcon,
  secondaryText,
  secondaryHref,
  onSecondaryClick,
  className,
  children,
}: QuordixHeroActionsProps) {
  const defaultArrowIcon = (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className="transition-transform duration-200 group-hover:translate-x-1"
    >
      <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
    </svg>
  );

  return (
    <div className={cn("flex flex-wrap items-center justify-center gap-4 relative z-30", className)}>
      {primaryText && (
        <a
          href={primaryHref || "#"}
          onClick={onPrimaryClick}
          className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-brand hover:bg-brand-deep text-white font-bold text-base transition-all duration-200 shadow-[0_10px_30px_rgba(240,83,28,0.25)] hover:shadow-[0_14px_36px_rgba(240,83,28,0.35)] hover:scale-105 active:scale-95"
        >
          <span>{primaryText}</span>
          {primaryIcon ?? defaultArrowIcon}
        </a>
      )}

      {secondaryText && (
        <a
          href={secondaryHref || "#"}
          onClick={onSecondaryClick}
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-frame/85 hover:bg-ink text-ink hover:text-white border border-line-2 hover:border-ink font-bold text-base transition-all duration-200 backdrop-blur-sm hover:scale-105 active:scale-95"
        >
          <span>{secondaryText}</span>
        </a>
      )}

      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   4. ROOT HERO COMPONENT
───────────────────────────────────────────────────────────────────────────── */
export interface QuordixHeroProps {
  tagline?: string;
  titleTop?: string;
  titleGlitch?: string;
  titleCustom?: React.ReactNode;
  subtitle?: React.ReactNode;
  ctaText?: string;
  ctaHref?: string;
  onCtaClick?: () => void;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  onSecondaryCtaClick?: () => void;
  badge?: React.ReactNode;
  showBadge?: boolean;
  showNavbar?: boolean;
  showBackground?: boolean;
  isFixedBackground?: boolean;
  className?: string;
  contentClassName?: string;
  minHeight?: string;
  children?: React.ReactNode;
}

export default function QuordixHero({
  tagline = "Designer / Developer",
  titleTop = "UI/UX Designer",
  titleGlitch = "Developer",
  titleCustom,
  subtitle = "Bridging the gap between design and code. I’m a creative technologist who loves building beautiful, user-friendly interfaces that solve real-world problems.",
  ctaText = "Start Project",
  ctaHref = "#work",
  onCtaClick,
  secondaryCtaText,
  secondaryCtaHref,
  onSecondaryCtaClick,
  badge,
  showBadge = false,
  showBackground = true,
  isFixedBackground = false,
  className,
  contentClassName,
  minHeight = "min-h-[calc(100svh-5rem)]",
  children,
}: QuordixHeroProps) {
  return (
    <div
      className={cn(
        "relative w-full flex flex-col items-center justify-center overflow-hidden text-ink font-body transition-colors duration-300",
        minHeight,
        showBackground ? "bg-canvas" : "bg-transparent",
        className
      )}
    >
      {/* Optional Background canvas layer */}
      {showBackground && <DotGridBackground isFixed={isFixedBackground} />}

      {/* Hero main section - perfectly centered vertically and horizontally */}
      <main
        className={cn(
          "relative z-20 w-full max-w-5xl mx-auto px-4 py-8 my-auto flex flex-col items-center justify-center text-center",
          contentClassName
        )}
      >
        {/* Availability Badge */}
        {showBadge && (
          <div className="mb-4">
            {badge || <StatusBadge status="available">available now</StatusBadge>}
          </div>
        )}

        {/* Hero Headings */}
        <div className="mb-6 w-full flex flex-col items-center justify-center">
          <h1 className="flex flex-col items-center justify-center text-center m-0 w-full">
            {/* Tagline */}
            {tagline && <QuordixHeroTagline tagline={tagline} />}

            {/* Title with Glitch effect */}
            {titleCustom || (
              <QuordixHeroGlitchTitle
                titleTop={titleTop}
                titleGlitch={titleGlitch}
              />
            )}
          </h1>
        </div>

        {/* Subtitle */}
        {subtitle && (
          <p className="mt-2 mb-8 max-w-2xl text-sm sm:text-base leading-relaxed text-ink-soft font-normal text-center mx-auto">
            {subtitle}
          </p>
        )}

        {/* Action Buttons */}
        {(ctaText || secondaryCtaText) && (
          <QuordixHeroActions
            primaryText={ctaText}
            primaryHref={ctaHref}
            onPrimaryClick={onCtaClick}
            secondaryText={secondaryCtaText}
            secondaryHref={secondaryCtaHref}
            onSecondaryClick={onSecondaryCtaClick}
          />
        )}

        {/* Custom children extension point */}
        {children}
      </main>
    </div>
  );
}
