"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { StickyTheme } from "./workspace-types";

const STICKY_THEMES: Record<StickyTheme, { bg: string; border: string; text: string; pin: string }> = {
  yellow: {
    bg: "bg-[#FEF08A]/90 dark:bg-[#854D0E]/20",
    border: "border-[#FACC15] dark:border-[#A16207]",
    text: "text-[#713F12] dark:text-[#FEF08A]",
    pin: "bg-[#CA8A04]",
  },
  lavender: {
    bg: "bg-[#F3E8FF]/95 dark:bg-[#581C87]/20",
    border: "border-[#D8B4FE] dark:border-[#9333EA]",
    text: "text-[#581C87] dark:text-[#E9D5FF]",
    pin: "bg-[#9333EA]",
  },
  sky: {
    bg: "bg-[#E0F2FE]/95 dark:bg-[#0369A1]/20",
    border: "border-[#BAE6FD] dark:border-[#0284C7]",
    text: "text-[#0369A1] dark:text-[#BAE6FD]",
    pin: "bg-[#0284C7]",
  },
  coral: {
    bg: "bg-[#FFE4E6]/95 dark:bg-[#9F1239]/20",
    border: "border-[#FECDD3] dark:border-[#E11D48]",
    text: "text-[#9F1239] dark:text-[#FFE4E6]",
    pin: "bg-[#E11D48]",
  },
  mint: {
    bg: "bg-[#DCFCE7]/95 dark:bg-[#14532D]/20",
    border: "border-[#BBF7D0] dark:border-[#16A34A]",
    text: "text-[#14532D] dark:text-[#DCFCE7]",
    pin: "bg-[#16A34A]",
  },
};

interface StickyNoteProps {
  theme?: StickyTheme;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export function WorkspaceStickyNote({
  theme = "yellow",
  className,
  style,
  children,
}: StickyNoteProps) {
  const t = STICKY_THEMES[theme] || STICKY_THEMES.yellow;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 4 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94, y: -4 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className={cn(
        "absolute z-10 border rounded-[3px] p-3 shadow-[2px_3px_0_0_rgba(20,32,43,0.08)] select-none backdrop-blur-[1px]",
        t.bg,
        t.border,
        t.text,
        className
      )}
      style={style}
    >
      {/* Subtle top sticky tape / pin mark */}
      <span
        className={cn(
          "absolute -top-1.5 left-1/2 -translate-x-1/2 h-1 w-6 rounded-full opacity-40",
          t.pin
        )}
      />
      <div className="font-body text-[13.5px] md:text-[14.5px] leading-[1.4] font-medium tracking-tight">
        {children}
      </div>
    </motion.div>
  );
}
