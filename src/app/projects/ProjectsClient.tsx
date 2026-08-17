"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  IconArrowUpRight,
  IconChevronDown,
  IconCheck,
  IconLayoutGrid,
} from "@tabler/icons-react";

interface Project {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  image: string;
  tech_stack: string[];
  problem?: string;
  solution?: string;
}

export default function ProjectsClient({ projects }: { projects: Project[] }) {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#08080a] pt-32 pb-24 text-zinc-900 dark:text-white transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-6xl">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 md:mb-20 text-start"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-500/10 border border-lime-500/20 text-lime-600 dark:text-lime-400 font-mono tracking-widest text-xs font-bold uppercase mb-4">
            / CASE STUDIES & PRODUCTION BUILDS
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-zinc-900 dark:text-white tracking-tight leading-[1.08] mb-6">
            Selected <span className="text-zinc-400 dark:text-zinc-500">Works.</span>
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 text-base sm:text-lg max-w-2xl leading-relaxed">
            A comprehensive showcase of end-to-end user research, design token architecture, and high-performance frontend engineering.
          </p>
        </motion.div>

        {/* Studio Cards Vertical List */}
        <div className="flex flex-col gap-10 md:gap-14">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id || idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
            >
              <StudioCard project={project} index={idx} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StudioCard({ project, index }: { project: Project; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const techList = Array.isArray(project.tech_stack)
    ? project.tech_stack
    : typeof project.tech_stack === "string"
    ? (project.tech_stack as string).split(",").map((s) => s.trim())
    : [];
  const displayNum = index + 1 < 10 ? `0${index + 1}` : `${index + 1}`;

  return (
    <div className="relative w-full">
      {/* Figma Layer Selection Tab */}
      <div className="absolute -top-3.5 left-4 sm:left-6 font-mono text-[11px] font-bold text-lime-600 dark:text-lime-400 bg-white dark:bg-[#121214] px-3 py-1 rounded-md border border-lime-500/40 shadow-sm flex items-center gap-1.5 z-20 tracking-wider">
        <IconLayoutGrid className="w-3.5 h-3.5 text-lime-500" />
        <span>{displayNum} {project.slug || `project-${displayNum}`}</span>
      </div>

      {/* Main Card Frame */}
      <div className="group relative rounded-2xl sm:rounded-3xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 p-6 sm:p-8 md:p-10 shadow-xl hover:shadow-2xl hover:border-lime-500/50 dark:hover:border-lime-500/50 transition-all duration-300 overflow-hidden">
        {/* 4 Corner Figma Handle Points */}
        <span className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white dark:bg-[#121215] border-2 border-lime-500 rounded-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-30" />
        <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white dark:bg-[#121215] border-2 border-lime-500 rounded-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-30" />
        <span className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white dark:bg-[#121215] border-2 border-lime-500 rounded-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-30" />
        <span className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white dark:bg-[#121215] border-2 border-lime-500 rounded-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-30" />

        {/* Card Top Section: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center relative z-10">
          {/* Left Column: Info */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
            <div>
              {/* 3D Inset Number Tile */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 flex items-center justify-center font-bold text-xl sm:text-2xl text-zinc-400 dark:text-zinc-500 shadow-[inset_0_2px_4px_rgba(255,255,255,0.9),inset_0_-2px_4px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_2px_4px_rgba(255,255,255,0.05),inset_0_-2px_4px_rgba(0,0,0,0.6)] mb-3">
                <span className="text-zinc-700 dark:text-zinc-300">{displayNum}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl md:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-tight">
                {project.name}
              </h3>

              {project.category && (
                <div className="font-mono text-xs sm:text-sm font-bold text-lime-600 dark:text-lime-400 mt-1.5 uppercase tracking-wider">
                  {project.category}
                </div>
              )}

              <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed mt-3 line-clamp-3">
                {project.description}
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href={`/projects/${project.slug}`}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-lime-500 hover:bg-lime-400 text-zinc-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-lime-500/20 active:scale-95 transition-all duration-200"
              >
                <span>Read Full Case Study</span>
                <IconArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </Link>

              <div className="flex flex-wrap gap-1.5">
                {techList.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-[11px] font-mono font-medium rounded-md bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Browser Window Mockup */}
          <div className="lg:col-span-6 relative">
            <Link href={`/projects/${project.slug}`} className="block group/shot">
              <div className="rounded-xl sm:rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 shadow-xl group-hover/shot:shadow-2xl transition-all duration-500">
                <div className="h-8 bg-zinc-100 dark:bg-zinc-900/90 border-b border-zinc-200 dark:border-zinc-800 px-3 flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="flex-1 max-w-[200px] h-4 bg-zinc-200 dark:bg-zinc-800 rounded-full px-2 flex items-center text-[9px] font-mono text-zinc-500 truncate ml-2">
                    https://{project.slug || "project"}.dev
                  </div>
                </div>

                <div className="relative w-full h-48 sm:h-56 md:h-64 bg-zinc-200 dark:bg-zinc-950 overflow-hidden">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover object-top transition-transform duration-700 ease-out group-hover/shot:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-zinc-200 dark:from-zinc-900 to-zinc-100 dark:to-zinc-950 text-zinc-400 dark:text-zinc-600">
                      <IconLayoutGrid className="w-8 h-8 opacity-40 animate-pulse" />
                      <span className="font-mono text-xs uppercase tracking-wider">Preview Canvas</span>
                    </div>
                  )}
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Card Divider */}
        <div className="h-px w-full bg-zinc-200 dark:bg-zinc-800/80 my-5" />

        {/* Expandable Deliverables Drawer */}
        <div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`inline-flex items-center gap-3 px-4 py-2 rounded-xl border text-xs font-mono font-bold uppercase tracking-wider transition-all duration-200 ${
              isOpen
                ? "bg-lime-500/10 border-lime-500/40 text-lime-700 dark:text-lime-400 shadow-sm"
                : "bg-zinc-100 dark:bg-zinc-900/80 border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-300 hover:border-lime-500/40"
            }`}
          >
            <span>{isOpen ? "Hide Process & Specs" : "See Process & Deliverables"}</span>
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center transition-transform duration-300 ${
                isOpen
                  ? "rotate-180 bg-lime-500 text-zinc-950"
                  : "bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300"
              }`}
            >
              <IconChevronDown className="w-3 h-3 stroke-[2.5]" />
            </div>
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="pt-4 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  <div className="md:col-span-6 space-y-2">
                    <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 block">
                      The Architecture & Scope
                    </span>
                    <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {project.problem ||
                        "Engineered modular component architecture with strict accessibility standards, streamlined state management, and optimized asset delivery."}
                    </p>
                  </div>

                  <div className="md:col-span-6 space-y-2">
                    <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-500 block">
                      Deliverables & Tech Stack
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {techList.map((tech, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 hover:border-lime-500/40 transition-colors"
                        >
                          <IconCheck className="w-3.5 h-3.5 text-lime-600 dark:text-lime-400 flex-shrink-0" />
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
