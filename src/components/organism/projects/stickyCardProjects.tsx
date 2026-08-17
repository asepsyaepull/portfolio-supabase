"use client";

import React from "react";
import { motion } from "framer-motion";
import { Project } from "@/types/database";
import { IconExternalLink } from "@tabler/icons-react";
import Image from "next/image";

interface StickyCardProjectsProps {
  projects: Project[];
}

const DEFAULT_PROJECTS: Project[] = [
  {
    id: 1,
    name: "TRACtoGO Mobile & Web Redesign",
    slug: "tractogo-redesign",
    category: "Mobile & Web App",
    description:
      "Spearheaded user research and end-to-end design system architecture for PT Serasi Autoraya (Astra). Streamlined car rental booking flows and achieved a 30% reduction in design-to-development turnaround time.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    tech_stack: ["Figma Tokens", "React Native", "UX Research", "Design System"],
    link: "https://trac.astra.co.id",
    is_featured: true,
  },
  {
    id: 2,
    name: "Symbolix.ai — Enterprise ERP & POS",
    slug: "symbolix-ai",
    category: "Enterprise System",
    description:
      "Architected modern design tokens and React 19 UI component library for PT Dinamika Simbolis Indonesia. Improved operational latency and user efficiency by 25%.",
    image:
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop",
    tech_stack: ["Next.js 15", "TypeScript", "Tailwind CSS", "Design Tokens"],
    link: "#",
    is_featured: true,
  },
  {
    id: 3,
    name: "Gizalab & Crewdible OMS",
    slug: "gizalab-crewdible",
    category: "Logistics SaaS",
    description:
      "Designed high-fidelity interactive wireframes and front-end component systems for logistic warehouse order management system (OMS) with 28% increase in user satisfaction.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    tech_stack: ["Figma Tokens", "UI Components", "Core Web Vitals", "A11y"],
    link: "#",
    is_featured: true,
  },
  {
    id: 4,
    name: "Korlantas Polri & Liftech Portals",
    slug: "korlantas-liftech",
    category: "Government & Industrial",
    description:
      "Built scalable web systems and administrative dashboards for Indonesian national traffic management and industrial equipment manufacturer.",
    image:
      "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=1200&auto=format&fit=crop",
    tech_stack: ["React", "Tailwind CSS", "REST API", "Figma"],
    link: "#",
    is_featured: true,
  },
];

export function StickyCardProjects({ projects }: StickyCardProjectsProps) {
  const displayProjects =
    projects && projects.length > 0 ? projects : DEFAULT_PROJECTS;

  return (
    <div className="relative w-full max-w-5xl mx-auto px-4 py-8 flex flex-col gap-10 md:gap-16">
      {displayProjects.map((project, i) => {
        const techList = project.tech_stack || [];
        const stickyTop = 100 + i * 24;

        return (
          <motion.div
            key={project.id || i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            style={{ top: `${stickyTop}px` }}
            className="sticky w-full rounded-[32px] border border-white/8 bg-[#1a1a1a] p-6 md:p-10 shadow-2xl flex flex-col md:flex-row gap-8 items-stretch overflow-hidden"
          >
            {/* Left Column - Information */}
            <div className="flex-1 flex flex-col justify-between z-10">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-amber-400 font-mono text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20">
                    PROJECT 0{i + 1}
                  </span>
                  {project.category && (
                    <span className="text-white/30 font-mono text-xs uppercase tracking-wider">
                      {project.category}
                    </span>
                  )}
                </div>

                <h3 className="text-2xl md:text-4xl font-black text-white mt-4 tracking-tight leading-tight">
                  {project.name}
                </h3>

                <p className="text-white/50 text-sm md:text-base mt-3 leading-relaxed line-clamp-3">
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
                        className="px-2.5 py-1 text-[11px] font-mono font-medium rounded-md bg-white/5 text-white/50 border border-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-3 mt-2">
                  {project.link && project.link !== "#" && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-400 text-black font-bold text-xs uppercase tracking-wider hover:bg-amber-300 transition-all duration-200 active:scale-95 shadow-lg shadow-amber-400/20"
                    >
                      Live Demo
                      <IconExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Image Mockup */}
            <div className="relative w-full md:w-1/2 h-56 md:h-80 rounded-2xl overflow-hidden border border-white/8 bg-[#111111] flex-shrink-0">
              {project.image ? (
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-top hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] text-white/20 font-mono text-xs">
                  PROJECT PREVIEW
                </div>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
