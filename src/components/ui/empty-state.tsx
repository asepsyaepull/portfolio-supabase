"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { IconFolderOff } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export interface EmptyStateProps {
  icon?: React.ReactNode;
  badge?: string;
  title: string;
  description: string;
  action?: {
    label: string;
    href?: string;
    onClick?: () => void;
    icon?: React.ReactNode;
  };
  secondaryAction?: {
    label: string;
    href?: string;
    onClick?: () => void;
    icon?: React.ReactNode;
  };
  className?: string;
  compact?: boolean;
}

export function EmptyState({
  icon,
  badge = "/ REPOSITORY STATUS: EMPTY",
  title,
  description,
  action,
  secondaryAction,
  className,
  compact = false,
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className={cn(
        "relative w-full rounded-2xl md:rounded-3xl border border-dashed border-zinc-300 dark:border-zinc-800 bg-white/60 dark:bg-[#121215]/60 backdrop-blur-md text-center flex flex-col items-center justify-center overflow-hidden transition-colors",
        compact ? "p-8 sm:p-10" : "p-10 sm:p-16 lg:p-20",
        className
      )}
    >
      {/* Decorative ambient subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-brand/5 blur-3xl rounded-full pointer-events-none" />

      {/* Status Badge */}
      {badge && (
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 font-mono text-[10.5px] font-bold tracking-widest uppercase mb-5 select-none">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
          <span>{badge}</span>
        </div>
      )}

      {/* Visual Icon Node */}
      <div className="relative mb-5 flex items-center justify-center">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center text-zinc-400 dark:text-zinc-500 shadow-inner group">
          {icon || <IconFolderOff className="w-7 h-7 stroke-[1.5]" />}
        </div>
        <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand/40 opacity-75" />
          <span className="relative inline-flex rounded-full h-4 w-4 bg-brand border-2 border-white dark:border-[#121215]" />
        </span>
      </div>

      {/* Text Hierarchy */}
      <div className="max-w-md mx-auto space-y-2 relative z-10">
        <h3 className="heading-display font-display text-lg sm:text-xl md:text-2xl font-bold text-zinc-900 dark:text-white tracking-tight leading-snug">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-body leading-relaxed">
          {description}
        </p>
      </div>

      {/* Action Buttons */}
      {(action || secondaryAction) && (
        <div className="relative z-10 flex flex-wrap items-center justify-center gap-3 mt-7">
          {action &&
            (action.href ? (
              <Link
                href={action.href}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand hover:bg-brand-deep text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-brand shadow-[0_6px_20px_-6px_#F0531C] active:scale-95"
              >
                <span>{action.label}</span>
                {action.icon}
              </Link>
            ) : (
              <button
                type="button"
                onClick={action.onClick}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand hover:bg-brand-deep text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-brand shadow-[0_6px_20px_-6px_#F0531C] active:scale-95 cursor-pointer"
              >
                <span>{action.label}</span>
                {action.icon}
              </button>
            ))}

          {secondaryAction &&
            (secondaryAction.href ? (
              <Link
                href={secondaryAction.href}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 font-mono text-xs font-semibold uppercase tracking-wider transition-all active:scale-95"
              >
                <span>{secondaryAction.label}</span>
                {secondaryAction.icon}
              </Link>
            ) : (
              <button
                type="button"
                onClick={secondaryAction.onClick}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 font-mono text-xs font-semibold uppercase tracking-wider transition-all active:scale-95 cursor-pointer"
              >
                <span>{secondaryAction.label}</span>
                {secondaryAction.icon}
              </button>
            ))}
        </div>
      )}
    </motion.div>
  );
}

export default EmptyState;
