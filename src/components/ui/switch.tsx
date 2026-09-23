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
