"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  tag?: string;
  tagColor?: "brand" | "faint" | "ink";
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "left" | "center" | "right";
  className?: string;
  animate?: boolean;
}

/**
 * Standard Section Header for landing pages.
 * Enforces uniform typography (Space Mono label + Plus Jakarta Sans display title + Body subtitle).
 */
export function SectionHeader({
  tag,
  tagColor = "brand",
  title,
  subtitle,
  align = "center",
  className,
  animate = true,
}: SectionHeaderProps) {
  const alignStyles = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
    right: "text-right items-end ml-auto",
  };

  const tagColorStyles = {
    brand: "text-brand",
    faint: "text-ink-faint",
    ink: "text-ink",
  };

  const content = (
    <div className={cn("flex flex-col mb-12", alignStyles[align], className)}>
      {tag && (
        <p
          className={cn(
            "omd-frame-label mb-3 font-mono text-[11px] font-bold uppercase tracking-[0.16em]",
            tagColorStyles[tagColor]
          )}
        >
          {tag}
        </p>
      )}

      <h2 className="heading-display font-display text-[clamp(38px,6vw,72px)] font-bold uppercase leading-[0.98] tracking-tight text-ink">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-4 max-w-[52ch] text-[15px] leading-relaxed text-ink-soft md:text-base">
          {subtitle}
        </p>
      )}
    </div>
  );

  if (!animate) return content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      {content}
    </motion.div>
  );
}

export default SectionHeader;
