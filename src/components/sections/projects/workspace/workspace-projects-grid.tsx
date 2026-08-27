"use client";

import React from "react";
import Link from "next/link";
import { IconArrowUpRight } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import type { Project } from "@/types/database";

interface WorkspaceProjectsGridProps {
  projects: Project[];
  className?: string;
}

export function WorkspaceProjectsGrid({
  projects,
  className,
}: WorkspaceProjectsGridProps) {
  if (!projects || projects.length === 0) return null;

  return (
    <div className={cn("mt-12 md:mt-16", className)}>
      <div className="mb-4 flex items-center justify-between">
        <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-ink-faint">
          Selected work
        </p>
        <span className="font-mono text-[11px] text-ink-faint">
          {projects.length} artifacts
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {projects.map((p, i) => {
          const slug =
            p.slug ||
            p.name?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") ||
            `project-${i}`;

          return (
            <Link
              key={p.id ?? i}
              href={`/projects/${slug}`}
              className="group relative flex aspect-[4/3] flex-col justify-between rounded-[8px] border border-line-2 bg-white dark:bg-[#121B24] p-3.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/50 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-ink-faint group-hover:text-brand transition-colors">
                  {p.category || "Case Study"}
                </span>
                <IconArrowUpRight className="h-3.5 w-3.5 text-ink-faint opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:text-brand" />
              </div>

              <div>
                <span className="block text-[13px] font-bold text-ink dark:text-white leading-snug group-hover:text-brand transition-colors line-clamp-2">
                  {p.name}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
