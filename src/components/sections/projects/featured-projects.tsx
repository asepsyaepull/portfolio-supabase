"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { IconFolderOff, IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { LaptopMockup } from "@/components/ui/mock-device";
import { Card } from "@/components/ui/card";
import type { Project } from "@/types/database";

interface FeaturedProjectsProps {
  projects: Project[];
}

const parseTech = (tech: Project["tech_stack"]): string[] => {
  if (Array.isArray(tech)) return tech;
  return tech ? String(tech).split(",").map((s) => s.trim()).filter(Boolean) : [];
};

const isLiveLink = (link?: string) =>
  typeof link === "string" && /^https?:\/\//.test(link) && !/\.dev\/?$/.test(link);

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const display = projects ?? [];
  const total = display.length;

  const cardStep = () => {
    const el = trackRef.current;
    if (!el) return 0;
    const first = el.querySelector<HTMLElement>("[data-card]");
    return first ? first.offsetWidth + 24 : el.clientWidth;
  };

  const scrollToIndex = (i: number) => {
    trackRef.current?.scrollTo({ left: i * cardStep(), behavior: "smooth" });
  };

  const onScroll = () => {
    const el = trackRef.current;
    if (!el || total === 0) return;
    setActive(Math.min(total - 1, Math.max(0, Math.round(el.scrollLeft / cardStep()))));
  };

  return (
    <section id="work" className="relative z-1 py-20 md:py-28">
      <div className="mx-auto max-w-[1280px] px-6">
        {/* Section head */}
        <div className="mb-10 flex items-end justify-between gap-6">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-ink">
            Selected Work
          </p>
          <p className="font-mono text-[11px] font-bold tracking-[0.16em] text-ink-soft">
            {String(Math.min(active + 1, Math.max(total, 1))).padStart(2, "0")} /{" "}
            {String(Math.max(total, 1)).padStart(2, "0")}
          </p>
        </div>

        {total === 0 ? (
          <Card className="flex flex-col items-center gap-4 py-16 text-center">
            <IconFolderOff className="h-8 w-8 text-ink-soft" />
            <h3 className="heading-display text-xl font-semibold text-ink">
              Belum Ada Proyek
            </h3>
            <p className="text-sm text-ink-soft">
              Proyek unggulan belum tersedia. Cek lagi nanti.
            </p>
          </Card>
        ) : (
          <>
            {/* Horizontal snap track */}
            <div
              ref={trackRef}
              onScroll={onScroll}
              className="-mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-6 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {display.map((project, index) => {
                const techList = parseTech(project.tech_stack).slice(0, 4);
                return (
                  <article
                    key={project.id ?? index}
                    data-card
                    className="omd-card w-[85vw] shrink-0 snap-start overflow-hidden !p-0 md:w-[70vw] md:max-w-[900px]"
                  >
                    <LaptopMockup
                      src={project.image || project.image_url}
                      alt={project.name}
                    />

                    {/* Body */}
                    <div className="flex flex-col p-6 md:p-9">
                      <h3 className="heading-display text-card-headline font-semibold text-ink">
                        {project.name}
                      </h3>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {techList.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full border border-line-2 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.06em] text-ink-soft"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="mt-6 flex flex-wrap items-center gap-4">
                        <Link
                          href={`/projects/${project.slug}`}
                          className="font-mono text-[13px] font-bold text-ink underline-offset-4 transition-colors hover:text-brand hover:underline"
                        >
                          Open case study →
                        </Link>
                        {isLiveLink(project.link) && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full border border-line-2 px-3 py-1 font-mono text-[11px] font-bold text-ink-soft transition-colors hover:border-brand hover:text-brand"
                          >
                            Live ↗
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Controls */}
            <div className="mt-6 flex items-center justify-between gap-6">
              <div className="flex gap-2.5">
                <button
                  onClick={() => scrollToIndex(active - 1)}
                  disabled={active === 0}
                  aria-label="Previous project"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-line-2 bg-white text-ink transition-all hover:border-brand hover:text-brand disabled:cursor-not-allowed disabled:opacity-35"
                >
                  <IconChevronLeft size={18} />
                </button>
                <button
                  onClick={() => scrollToIndex(active + 1)}
                  disabled={active >= total - 1}
                  aria-label="Next project"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-line-2 bg-white text-ink transition-all hover:border-brand hover:text-brand disabled:cursor-not-allowed disabled:opacity-35"
                >
                  <IconChevronRight size={18} />
                </button>
              </div>

              {/* Dots */}
              <div className="flex items-center gap-2">
                {display.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => scrollToIndex(i)}
                    aria-label={`Go to project ${i + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === active
                        ? "w-7 bg-brand"
                        : "w-2 bg-line-2 hover:bg-ink-faint"
                    }`}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default FeaturedProjects;
