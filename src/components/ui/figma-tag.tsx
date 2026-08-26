"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface FigmaTagProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: "white" | "blue" | "ghost";
}

/**
 * Floating Figma canvas tag (e.g., "asep.fig" or "1440 × 900")
 */
export function FigmaTag({
  children,
  variant = "white",
  className,
  ...props
}: FigmaTagProps) {
  const variantStyles = {
    white: "border border-ink/15 bg-white text-ink",
    blue: "bg-tool text-white",
    ghost: "border border-ink/10 bg-white/70 text-ink-soft backdrop-blur-sm",
  };

  return (
    <span
      className={cn(
        "omd-tag rounded-md px-2 py-0.5 font-mono text-[11px] font-bold uppercase tracking-[0.06em] shadow-sm",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

interface FrameLabelProps extends React.HTMLAttributes<HTMLParagraphElement> {
  name: string;
  withIcon?: boolean;
}

/**
 * Standard Figma-style Frame Label with Space Mono typography
 */
export function FrameLabel({
  name,
  withIcon = false,
  className,
  ...props
}: FrameLabelProps) {
  return (
    <p
      className={cn(
        "omd-frame-label font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-ink-faint",
        className
      )}
      {...props}
    >
      {withIcon && (
        <svg
          width="11"
          height="11"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          className="shrink-0 text-ink-faint"
        >
          <path d="M8 3a3 3 0 100 6h3V3H8zm0 6a3 3 0 000 6h3V9H8zm0 6a3 3 0 103 3v-3H8zm6-12v6h3a3 3 0 100-6h-3z" />
        </svg>
      )}
      {name}
    </p>
  );
}
