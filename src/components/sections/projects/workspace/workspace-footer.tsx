"use client";

import { cn } from "@/lib/utils";

interface WorkspaceFooterProps {
  figureId?: string;
  description?: string;
  className?: string;
}

export function WorkspaceFooter({
  figureId = "FIG. 004 — Four tracks, one bench",
  description = "Workspace, design system, product design, frontend dev — select a track to inspect live flow",
  className,
}: WorkspaceFooterProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1 border-t border-line-2 bg-[#F8F8F7] dark:bg-[#101820] px-4 md:px-5 py-2.5 md:flex-row md:items-center md:justify-between select-none",
        className
      )}
    >
      <span className="font-mono text-[10.5px] uppercase tracking-wider text-ink-faint">
        {figureId}
      </span>
      <span className="hidden font-mono text-[10.5px] uppercase tracking-wider text-ink-faint md:block">
        {description}
      </span>
    </div>
  );
}
