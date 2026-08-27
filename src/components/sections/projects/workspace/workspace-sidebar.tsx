"use client";

import React from "react";
import { cn } from "@/lib/utils";
import type { WorkspaceTrack } from "./workspace-types";

interface WorkspaceSidebarProps {
  tracks: WorkspaceTrack[];
  selectedIndex: number;
  onSelectTrack: (index: number) => void;
  className?: string;
}

export function WorkspaceSidebar({
  tracks,
  selectedIndex,
  onSelectTrack,
  className,
}: WorkspaceSidebarProps) {
  const progressPercent = ((selectedIndex + 1) / tracks.length) * 100;

  return (
    <aside
      className={cn(
        "flex flex-col justify-between border-b border-line-2 bg-[#FBFBFA] dark:bg-[#121B24] p-3 md:border-b-0 md:border-r md:p-4",
        className
      )}
    >
      <div>
        {/* Sidebar Section Title */}
        <div className="mb-2.5 hidden items-center justify-between font-mono text-[11px] font-bold uppercase tracking-wider text-ink-faint md:flex">
          <span>Tracks</span>
          <span className="text-[10px] text-ink-faint">04</span>
        </div>

        {/* Track List / Tabs */}
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar md:flex-col md:gap-1">
          {tracks.map((track, i) => {
            const isActive = i === selectedIndex;
            return (
              <button
                key={track.id}
                type="button"
                onClick={() => onSelectTrack(i)}
                className={cn(
                  "group relative flex shrink-0 items-center gap-2.5 rounded-[6px] px-3 py-2.5 text-left text-[13px] transition-all duration-200 md:w-full",
                  isActive
                    ? "bg-white dark:bg-white/10 text-ink dark:text-white shadow-sm ring-1 ring-black/5"
                    : "text-ink-soft hover:bg-black/[0.03] dark:hover:bg-white/5 hover:text-ink"
                )}
              >
                {/* Active Indicator bar */}
                <span
                  className={cn(
                    "hidden h-2 w-2 rounded-full transition-all md:inline-block",
                    isActive
                      ? "bg-brand scale-100"
                      : "bg-ink/20 scale-75 group-hover:scale-100 group-hover:bg-ink/40"
                  )}
                />

                {/* Track text */}
                <span className="flex-1">
                  <span className="flex items-center gap-2 md:block">
                    <span className="whitespace-nowrap font-semibold leading-tight">
                      {track.label}
                    </span>
                    <span className="hidden text-[10px] font-mono uppercase tracking-wider text-ink-faint md:block mt-0.5">
                      {track.gp}
                    </span>
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Track progress counter (Desktop) */}
      <div className="mt-4 hidden border-t border-line pt-3 text-[11px] text-ink-faint md:block font-mono">
        <div className="flex items-center justify-between mb-1.5">
          <span>Track switch</span>
          <span>{selectedIndex + 1} / {tracks.length}</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-line-2">
          <div
            className="h-full bg-brand transition-all duration-300 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </aside>
  );
}
