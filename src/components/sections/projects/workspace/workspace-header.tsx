"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface WorkspaceHeaderProps {
  activeTrackLabel: string;
  className?: string;
}

export function WorkspaceHeader({
  activeTrackLabel,
  className,
}: WorkspaceHeaderProps) {
  return (
    <div
      className={cn(
        "flex h-10 md:h-11 items-center justify-between border-b border-white/10 bg-ink px-4 md:px-5 select-none",
        className
      )}
    >
      {/* Left: Window Controls & Breadcrumb */}
      <div className="flex items-center gap-3 md:gap-4 overflow-hidden">
        {/* macOS traffic light window dots */}
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F56] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.12)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.12)]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#27C93F] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.12)]" />
        </div>

        {/* Path breadcrumb */}
        <div className="flex items-center gap-1 font-mono text-[11px] md:text-[12px] text-white/70 truncate">
          <span className="text-white/40 hidden sm:inline">portfolio / workspace /</span>
          <span className="font-semibold text-brand-deep dark:text-brand bg-brand/10 px-1.5 py-0.5 rounded-[3px]">
            {activeTrackLabel.toLowerCase()}
          </span>
        </div>
      </div>

      {/* Right: Status Pill */}
      <div className="flex items-center gap-2 font-mono text-[11px] text-white/70">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span className="hidden sm:inline font-medium">Ready</span>
      </div>
    </div>
  );
}
