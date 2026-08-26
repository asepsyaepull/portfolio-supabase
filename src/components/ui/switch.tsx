"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SwitchProps {
  checked: boolean;
  onCheckedChange: () => void;
  label?: string;
  className?: string;
}

/**
 * Lever toggle switch with smooth spring layout animation.
 */
export function Switch({
  checked,
  onCheckedChange,
  label = "Toggle switch",
  className,
}: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onCheckedChange}
      className={cn(
        "relative h-6 w-11 shrink-0 rounded-full border transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand",
        checked ? "border-brand bg-brand" : "border-ink/20 bg-[#F1F6FA]",
        className
      )}
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={cn(
          "absolute top-[3px] left-[3px] h-4 w-4 rounded-full bg-white shadow-md",
          checked && "translate-x-5"
        )}
      />
    </button>
  );
}

interface OptionPillProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active: boolean;
  children: React.ReactNode;
}

/**
 * Option selector pill button (active state has brand border + tinted bg).
 */
export function OptionPill({
  active,
  children,
  className,
  ...props
}: OptionPillProps) {
  return (
    <button
      type="button"
      className={cn(
        "rounded-full border px-4 py-2.5 font-mono text-[13px] font-semibold transition-all duration-200",
        active
          ? "border-brand bg-brand/[0.08] font-bold text-ink"
          : "border-ink/15 bg-white text-ink-soft hover:border-ink hover:text-ink",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
