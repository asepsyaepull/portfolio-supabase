"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Project } from "@/types/database";
import { getFeaturedProjects, getProjects } from "@/app/admin/crud-actions";
import {
  IconArrowUpRight,
  IconExternalLink,
  IconFolderOff,
  IconLayoutGrid,
  IconLoader2,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

interface StickyCardProjectsProps {
  projects?: Project[];
}

export function StickyCardProjects({ projects: initialProjects }: StickyCardProjectsProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects || []);
  const [loading, setLoading] = useState<boolean>(!initialProjects || initialProjects.length === 0);

  useEffect(() => {
    if (initialProjects && initialProjects.length > 0) {
      setProjects(initialProjects);
      setLoading(false);
      return;
    }

    // Ambil data langsung dari database PostgreSQL via server action
    let isMounted = true;
    async function loadProjectsFromPgSql() {
      try {
        setLoading(true);
        const { data: featured, error: featError } = await getFeaturedProjects();
        if (featError) {
          console.error("Gagal mengambil data proyek unggulan dari PostgreSQL:", featError);
        }

        if (isMounted) {
          if (featured && featured.length > 0) {
            setProjects(featured);
          } else {
            // Jika tidak ada yang is_featured, ambil semua proyek
            const { data: allProjects, error: allError } = await getProjects();
            if (allError) {
              console.error("Gagal mengambil data proyek dari PostgreSQL:", allError);
            }
            if (allProjects && allProjects.length > 0) {
              setProjects(allProjects);
            } else {
              setProjects([]);
            }
          }
        }
      } catch (err) {
        console.error("Error loading projects from pgsql:", err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadProjectsFromPgSql();

    return () => {
      isMounted = false;
    };
  }, [initialProjects]);

  if (loading) {
    return (
      <div className="relative w-full max-w-5xl mx-auto px-4 py-20 flex flex-col items-center justify-center gap-4 text-center">
        <IconLoader2 className="w-8 h-8 text-lime-500 animate-spin" />
        <p className="font-mono text-xs uppercase tracking-widest text-zinc-500">
          Memuat data proyek dari database PostgreSQL...
        </p>
      </div>
    );
  }

  if (!projects || projects.length === 0) {
    return (
      <section className="py-20 bg-zinc-50 dark:bg-[#08080a] transition-colors duration-300">
        <div className="max-w-md mx-auto px-4 text-center py-16">
          <div className="p-8 rounded-3xl bg-white/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/5 backdrop-blur-sm flex flex-col items-center gap-4">
            <div className="p-3 rounded-full bg-lime-500/10 text-lime-500">
              <IconFolderOff className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
              Belum Ada Proyek
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Data proyek belum tersedia di database PostgreSQL saat ini.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="relative w-full max-w-5xl mx-auto px-4 py-8 flex flex-col gap-10 md:gap-16">
      {projects.map((project, i) => {
        const techList = Array.isArray(project.tech_stack)
          ? project.tech_stack
          : typeof project.tech_stack === "string"
            ? (project.tech_stack as string)
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean)
            : [];

        const projectImage = project.image || project.image_url;
        const stickyTop = 100 + i * 24;
        const displayNum = i + 1 < 10 ? `0${i + 1}` : `${i + 1}`;

        return (
          <motion.div
            key={project.id || i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            style={{ top: `${stickyTop}px` }}
            className="sticky w-full rounded-[28px] sm:rounded-[32px] border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#121215] p-6 md:p-10 shadow-xl dark:shadow-2xl flex flex-col md:flex-row gap-8 items-stretch overflow-hidden group hover:border-lime-500/40 transition-colors duration-300"
          >
            {/* Left Column - Information */}
            <div className="flex-1 flex flex-col justify-between z-10">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-lime-600 dark:text-lime-400 font-mono text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-lime-500/10 border border-lime-500/20">
                    PROJECT {displayNum}
                  </span>
                  {project.category && (
                    <span className="text-zinc-500 dark:text-zinc-400 font-mono text-xs uppercase tracking-wider">
                      {project.category}
                    </span>
                  )}
                </div>

                <h3 className="text-2xl md:text-4xl font-extrabold text-zinc-900 dark:text-white mt-4 tracking-tight leading-tight">
                  {project.name}
                </h3>

                <p className="text-zinc-600 dark:text-zinc-400 text-sm md:text-base mt-3 leading-relaxed line-clamp-3">
                  {project.description}
                </p>
              </div>

              {/* Tech Badges & CTA */}
              <div className="mt-6 flex flex-col gap-4">
                {techList.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {techList.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-[11px] font-mono font-medium rounded-md bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-3 mt-2">
                  {project.slug && (
                    <Link
                      href={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-full bg-lime-500 hover:bg-lime-400 text-zinc-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-lime-500/20 active:scale-95 transition-all duration-200"
                    >
                      <span>Case Study</span>
                      <IconArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                    </Link>
                  )}

                  {project.link && project.link !== "#" && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800 font-bold text-xs uppercase tracking-wider transition-all duration-200 active:scale-95 shadow-sm"
                    >
                      <span>Live Demo</span>
                      <IconExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Image Mockup */}
            <div className="relative w-full md:w-1/2 h-56 md:h-80 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-[#111111] flex-shrink-0">
              {projectImage ? (
                <Image
                  src={projectImage}
                  alt={project.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-top hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-zinc-100 dark:from-[#1a1a1a] to-zinc-200 dark:to-[#0f0f0f] text-zinc-400 dark:text-white/20 font-mono text-xs">
                  <IconLayoutGrid className="w-6 h-6 opacity-40" />
                  <span>PROJECT PREVIEW</span>
                </div>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

export default StickyCardProjects;
