"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IconArrowRight, IconFolderOff } from "@tabler/icons-react";
import type { Project } from "@/types/database";

interface FeaturedProjectsProps {
  projects: Project[];
}

const FigmaIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M8 3a3 3 0 100 6h3V3H8zm0 6a3 3 0 000 6h3V9H8zm0 6a3 3 0 103 3v-3H8zm6-12v6h3a3 3 0 100-6h-3z" />
  </svg>
);

const parseTech = (tech: Project["tech_stack"]): string[] => {
  if (Array.isArray(tech)) return tech;
  // ponytail: DB sometimes returns comma-string despite the string[] type
  return tech ? String(tech).split(",").map((s) => s.trim()).filter(Boolean) : [];
};

// Only real external links: must start with http and not be a *.dev placeholder
const isLiveLink = (link?: string) =>
  typeof link === "string" && /^https?:\/\//.test(link) && !/\.dev\/?$/.test(link);

/* Mock browser window — pure CSS fallback like sketch 001 */
function MockWindow() {
  return (
    <div className="relative z-[1] w-[78%] overflow-hidden rounded-[10px] border-[1.5px] border-[#16150F] bg-white shadow-[5px_5px_0_rgba(22,21,15,0.15)]">
      <div className="flex gap-1.5 border-b-[1.5px] border-[#16150F] bg-[#FAF9F5] px-3 py-2">
        <span className="block h-[9px] w-[9px] rounded-full bg-[#D9D4C7]" />
        <span className="block h-[9px] w-[9px] rounded-full bg-[#D9D4C7]" />
        <span className="block h-[9px] w-[9px] rounded-full bg-[#D9D4C7]" />
      </div>
      <div className="flex flex-col gap-2 p-4">
        <div className="h-[11px] w-3/5 rounded-[5px] bg-[var(--accent-soft)]" />
        <div className="h-[11px] w-4/5 rounded-[5px] bg-[#EEEAE0]" />
        <div className="mt-1 flex gap-2">
          <div className="h-[52px] flex-1 rounded-lg border-[1.5px] border-[var(--accent)] bg-[var(--accent)]" />
          <div className="h-[52px] flex-1 rounded-lg border-[1.5px] border-[#E0DBCE] bg-[#EEEAE0]" />
          <div className="h-[52px] flex-1 rounded-lg border-[1.5px] border-[#E0DBCE] bg-[#EEEAE0]" />
        </div>
      </div>
    </div>
  );
}

function ProjectMedia({ project }: { project: Project }) {
  const [failed, setFailed] = useState(false);
  const src = project.image || project.image_url;
  const showImage = !!src && !failed;

  return (
    <div className="relative flex min-h-[240px] items-center justify-center overflow-hidden bg-gradient-to-br from-[rgba(var(--accent-rgb),0.18)] to-[#F4F1EA] md:min-h-[300px]">
      {/* canvas grid dots overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(var(--accent-rgb),0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--accent-rgb),0.07)_1px,transparent_1px)] bg-[length:22px_22px]" />
      {showImage ? (
        <Image
          src={src}
          alt={project.name}
          fill
          sizes="(max-width: 768px) 100vw, 55vw"
          className="object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <MockWindow />
      )}
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const techList = parseTech(project.tech_stack).slice(0, 4);
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.08, 0.24) }}
      className="grid overflow-hidden rounded-[14px] border-[1.5px] border-[#16150F] bg-white shadow-[6px_6px_0_rgba(22,21,15,0.12)] transition-all duration-200 hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-[10px_10px_0_rgba(var(--accent-rgb),0.25)] md:grid-cols-[1.1fr_1fr]"
    >
      {/* Media */}
      <Link href={`/projects/${project.slug}`} aria-label={project.name} className="block focus-visible:outline-[var(--accent)]">
        <ProjectMedia project={project} />
      </Link>

      {/* Body */}
      <div className="flex flex-col p-7 md:p-9 lg:p-10">
        <p className="mb-3 font-display text-[13px] font-bold tracking-[0.14em] text-[var(--accent)]">
          PROJECT — {num}
        </p>
        <h3 className="font-display text-[clamp(22px,2.6vw,30px)] font-bold leading-[1.15] tracking-tight text-[#16150F]">
          {project.name}
        </h3>
        <p className="mt-3 line-clamp-4 text-[15px] leading-relaxed text-[#6E6A5E]">
          {project.description}
        </p>

        {/* Tags */}
        <div className="mt-6 flex flex-wrap gap-2">
          {techList.map((tech, i) => (
            <span
              key={tech}
              className={
                i === 0
                  ? "rounded-full border border-[var(--accent)] bg-[var(--accent-soft)] px-3 py-1 text-xs font-semibold text-[var(--accent)]"
                  : "rounded-full border border-[#D9D4C7] bg-[#F4F1EA] px-3 py-1 text-xs font-semibold text-[#6E6A5E]"
              }
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="mt-auto flex flex-wrap items-center gap-4 pt-6">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-2 font-display text-[14.5px] font-bold text-[#16150F]"
          >
            Baca case study
            <IconArrowRight className="h-[17px] w-[17px] stroke-[2.5] transition-transform duration-150 group-hover:translate-x-1" />
          </Link>
          {isLiveLink(project.link) && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#D9D4C7] bg-[#F4F1EA] px-3 py-1 text-xs font-semibold text-[#16150F] transition-colors hover:bg-[var(--accent-soft)] hover:text-[var(--accent)]"
            >
              Live ↗
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const displayProjects = projects ?? [];

  return (
    <section id="work" className="relative z-[1] mx-auto w-full max-w-[1160px] px-6 py-20 md:py-24">
      {/* Section head */}
      <div className="mb-11 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="figma-frame-label mb-2.5 flex items-center gap-2 font-display text-[13px] font-semibold text-[var(--accent)]">
            <FigmaIcon />
            Page 02 — Selected Work
          </p>
          <h2 className="font-display text-[clamp(30px,4.5vw,46px)] font-bold tracking-tight text-[#16150F]">
            Karya Pilihan
          </h2>
        </div>
        <span className="font-display text-sm font-bold tracking-[0.12em] text-[var(--accent)]">
          {String(displayProjects.length).padStart(2, "0")} PROJECTS · 2021–2026
        </span>
      </div>

      {/* Cards */}
      {displayProjects.length === 0 ? (
        <div className="flex flex-col items-center gap-4 rounded-[14px] border-[1.5px] border-dashed border-[#D9D4C7] bg-white/60 px-6 py-16 text-center">
          <IconFolderOff className="h-8 w-8 text-[#6E6A5E]" />
          <h3 className="font-display text-lg font-bold text-[#16150F]">Belum Ada Proyek</h3>
          <p className="text-sm text-[#6E6A5E]">
            Proyek unggulan belum tersedia saat ini. Silakan periksa kembali nanti.
          </p>
        </div>
      ) : (
        <div className="grid gap-7">
          {displayProjects.map((project, index) => (
            <ProjectCard key={project.id ?? index} project={project} index={index} />
          ))}
        </div>
      )}
    </section>
  );
}
