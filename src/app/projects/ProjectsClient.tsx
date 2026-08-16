"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface Project {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  image: string;
  tech_stack: string[];
}

export default function ProjectsClient({ projects }: { projects: Project[] }) {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-gray-950 pt-32 pb-20 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-24">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-20 text-start"
        >
          <span className="text-lime-500 font-mono tracking-widest text-sm uppercase">/ CASE STUDIES</span>
          <h1 className="text-4xl md:text-7xl font-bold text-zinc-900 dark:text-white mt-4 mb-6 transition-colors">
            Selected <span className="text-zinc-500">Works.</span>
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 text-lg max-w-2xl leading-relaxed transition-colors">
            A deep dive into how I solve complex business problems through thoughtful design and engineering.
          </p>
        </motion.div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link href={`/projects/${project.slug}`} className="group cursor-pointer block">
                <div className="relative h-[360px] sm:h-[420px] md:h-[450px] w-full overflow-hidden rounded-[28px] sm:rounded-[40px] bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/5 transition-all duration-500 group-hover:border-lime-500/50">
                  <Image
                    src={project.image || "/og-image.jpg"}
                    alt={project.name || "Project image"}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={idx < 2}
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-colors duration-300" />
                  <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10">
                    <span className="text-lime-500 text-xs font-bold tracking-[0.2em] uppercase mb-2 sm:mb-3 block">{project.category}</span>
                    <h3 className="text-white text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">{project.name}</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tech_stack?.slice(0, 3).map((tech: string) => (
                          <span key={tech} className="text-[10px] px-3 py-1 rounded-full bg-white/10 text-zinc-300 border border-white/20 uppercase font-bold tracking-tighter">
                              {tech}
                          </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
