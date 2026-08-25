"use client";

import Image from "next/image";
import Link from "next/link";
import { IconFolderOff } from "@tabler/icons-react";
import { useRef, useState } from "react";
import type { Project } from "@/types/database";

interface FeaturedProjectsProps {
  projects: Project[];
}

const CARD = "rounded-[24px] border border-[#14202b12] bg-white shadow-[0_20px_50px_-32px_rgba(20,19,16,0.32)]";

const parseTech = (tech: Project["tech_stack"]): string[] => {
  if (Array.isArray(tech)) return tech;
  // ponytail: DB sometimes returns comma-string despite the string[] type
  return tech ? String(tech).split(",").map((s) => s.trim()).filter(Boolean) : [];
};

const isLiveLink = (link?: string) =>
  typeof link === "string" && /^https?:\/\//.test(link) && !/\.dev\/?$/.test(link);

/* Pure-CSS mock window fallback when project has no image */
function MockWindow() {
  return (
    <div className="relative z-[1] w-[78%] overflow-hidden rounded-[10px] border border-[#14202b22] bg-white shadow-[0_20px_50px_-32px_rgba(20,19,16,0.32)]">
      <div className="flex gap-1.5 border-b border-[#14202b12] bg-[#F1F6FA] px-3 py-2">
        <span className="block h-2 w-2 rounded-full bg-[#8AA6B8]/40" />
        <span className="block h-2 w-2 rounded-full bg-[#8AA6B8]/40" />
        <span className="block h-2 w-2 rounded-full bg-[#8AA6B8]/40" />
      </div>
      <div className="flex flex-col gap-2 p-4">
        <div className="h-2.5 w-3/5 rounded-full bg-[#AFD8F0]" />
        <div className="h-2.5 w-4/5 rounded-full bg-[#EFEEE9]" />
        <div className="mt-1.5 flex gap-2">
          <div className="h-[52px] flex-1 rounded-lg bg-[#F0531C]" />
          <div className="h-[52px] flex-1 rounded-lg bg-[#EFEEE9]" />
          <div className="h-[52px] flex-1 rounded-lg bg-[#EFEEE9]" />
        </div>
      </div>
    </div>
  );
}

/* Laptop-frame mockup: ink bezel + screen (image cover or CSS mock) */
function LaptopFrame({ project }: { project: Project }) {
  const [failed, setFailed] = useState(false);
  const src = project.image || project.image_url;
  const showImage = !!src && !failed;

  return (
    <div className="px-6 pt-6 md:px-9 md:pt-9">
      {/* bezel */}
      <div className="rounded-t-[14px] border-[1.5px] border-b-0 border-[#14202B] bg-[#14202B] p-2 pb-0">
        <div className="relative aspect-[16/9] overflow-hidden rounded-t-[7px] bg-[#F1F6FA]">
          {showImage ? (
            <Image
              src={src}
              alt={project.name}
              fill
              sizes="(max-width: 768px) 85vw, 70vw"
              className="object-cover"
              onError={() => setFailed(true)}
            />
          ) : (
            <div className="flex h-full items-center justify-center overflow-hidden bg-[linear-gradient(#14202b0d_1px,transparent_1px),linear-gradient(90deg,#14202b0d_1px,transparent_1px)] [background-size:22px_22px]">
              <MockWindow />
            </div>
          )}
        </div>
      </div>
      {/* base */}
      <div className="relative -mx-4 h-[13px] rounded-b-[12px] border-[1.5px] border-t-0 border-[#14202B] bg-[#14202B] md:-mx-6">
        <span className="absolute left-1/2 top-0 h-[5px] w-16 -translate-x-1/2 rounded-b-md bg-[#2a3946]" />
      </div>
    </div>
  );
}

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
    <section id="work" className="relative z-[1] py-20 md:py-28">
      <div className="mx-auto max-w-[1280px] px-6">
        {/* Section head */}
        <div className="mb-10 flex items-end justify-between gap-6">
          <p className="[font-family:var(--font-mono),ui-monospace,monospace] text-[11px] font-bold uppercase tracking-[0.16em] text-[#14202B]">
            Selected Work
          </p>
          <p className="[font-family:var(--font-mono),ui-monospace,monospace] text-[11px] font-bold tracking-[0.16em] text-[#4A6173]">
            {String(Math.min(active + 1, Math.max(total, 1))).padStart(2, "0")} / {String(Math.max(total, 1)).padStart(2, "0")}
          </p>
        </div>

        {total === 0 ? (
          <div className={`${CARD} flex flex-col items-center gap-4 px-6 py-16 text-center`}>
            <IconFolderOff className="h-8 w-8 text-[#4A6173]" />
            <h3 className="[font-family:var(--font-display),'Fraunces',serif] text-xl font-semibold text-[#14202B]">
              Belum Ada Proyek
            </h3>
            <p className="text-sm text-[#4A6173]">Proyek unggulan belum tersedia. Cek lagi nanti.</p>
          </div>
        ) : (
          <>
            {/* Horizontal snap track */}
            <div
              ref={trackRef}
              onScroll={onScroll}
              className="-mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-6 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {display.map((project, index) => {
                const techList = parseTech(project.tech_stack).slice(0, 4);
                return (
                  <article
                    key={project.id ?? index}
                    data-card
                    className={`${CARD} w-[85vw] shrink-0 snap-start overflow-hidden md:w-[70vw] md:max-w-[900px]`}
                  >
                    <LaptopFrame project={project} />

                    {/* Body */}
                    <div className="flex flex-col p-6 md:p-9">
                      <h3 className="[font-family:var(--font-display),'Fraunces',serif] text-[clamp(24px,3vw,38px)] font-semibold leading-tight text-[#14202B]">
                        {project.name}
                      </h3>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {techList.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full border border-[#14202b22] px-3 py-1 [font-family:var(--font-mono),ui-monospace,monospace] text-[11px] font-bold uppercase tracking-[0.06em] text-[#4A6173]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="mt-6 flex flex-wrap items-center gap-4">
                        <Link
                          href={`/projects/${project.slug}`}
                          className="[font-family:var(--font-mono),ui-monospace,monospace] text-[13px] font-bold text-[#14202B] underline-offset-4 transition-colors hover:text-[#F0531C] hover:underline"
                        >
                          Open case study →
                        </Link>
                        {isLiveLink(project.link) && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-full border border-[#14202b22] px-3 py-1 [font-family:var(--font-mono),ui-monospace,monospace] text-[11px] font-bold text-[#4A6173] transition-colors hover:border-[#F0531C] hover:text-[#F0531C]"
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
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#14202b22] bg-white text-[#14202B] transition-all hover:border-[#F0531C] hover:text-[#F0531C] disabled:cursor-not-allowed disabled:opacity-35"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 6l-6 6 6 6" /></svg>
                </button>
                <button
                  onClick={() => scrollToIndex(active + 1)}
                  disabled={active >= total - 1}
                  aria-label="Next project"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#14202b22] bg-white text-[#14202B] transition-all hover:border-[#F0531C] hover:text-[#F0531C] disabled:cursor-not-allowed disabled:opacity-35"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 6l6 6-6 6" /></svg>
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
                      i === active ? "w-7 bg-[#F0531C]" : "w-2 bg-[#14202b22] hover:bg-[#8AA6B8]"
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
