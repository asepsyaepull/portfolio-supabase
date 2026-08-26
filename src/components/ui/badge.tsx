"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface StatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  status?: "live" | "available" | "busy" | "faint";
  ping?: boolean;
}

/**
 * Status indicator badge with pulsing dot animation
 */
export function StatusBadge({
  children,
  status = "live",
  ping = true,
  className,
  ...props
}: StatusBadgeProps) {
  const dotColorMap = {
    live: "bg-emerald-500",
    available: "bg-[#27c06b]",
    busy: "bg-amber-500",
    faint: "bg-ink-faint",
  };

  const containerColorMap = {
    live: "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    available: "border-[#27c06b]/40 bg-[#27c06b]/15 text-[#27c06b]",
    busy: "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300",
    faint: "border-ink/10 bg-white/65 text-ink/80",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wider backdrop-blur-md",
        containerColorMap[status],
        className
      )}
      {...props}
    >
      <span className="relative flex h-2 w-2 shrink-0">
        {ping && (
          <span
            className={cn(
              "absolute inline-flex h-full w-full animate-ping rounded-full opacity-75",
              dotColorMap[status]
            )}
          />
        )}
        <span
          className={cn(
            "relative inline-flex h-2 w-2 rounded-full",
            dotColorMap[status]
          )}
        />
      </span>
      <span>{children}</span>
    </span>
  );
}

export default StatusBadge;
