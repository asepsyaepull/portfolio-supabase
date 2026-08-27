"use client";

import React from "react";
import {
  CinematicProductScrollSection,
  ProductItem,
} from "@/components/ui/cinematic-product-scroll-section";
import type { Project } from "@/types/database";

interface CinematicSelectedWorkProps {
  projects?: Project[];
  title?: string;
  subtitle?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
}

export function CinematicSelectedWork({
  projects,
  title = "SELECTED CRAFT",
  subtitle = "ARCHIVE // 2024 — 2026",
  description = "A curated selection of high-impact web products, design systems, and frontend engineering crafts.",
  buttonText = "View Full Archive",
  buttonLink = "/projects",
}: CinematicSelectedWorkProps) {
  // If database projects are passed, transform them to cinematic product items
  const transformedProducts: ProductItem[] | undefined =
    projects && projects.length > 0
      ? projects.map((p, idx) => {
          const slug =
            p.slug ||
            p.name
              ?.toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/^-|-$/g, "") ||
            `project-${idx + 1}`;

          const techList = Array.isArray(p.tech_stack)
            ? p.tech_stack
            : typeof p.tech_stack === "string"
            ? (p.tech_stack as string).split(",").map((s) => s.trim())
            : ["Next.js", "TypeScript", "Tailwind CSS"];

          return {
            id: String(p.id || `proj_${idx}`),
            title: p.name || `Project 0${idx + 1}`,
            handle: slug,
            thumbnail:
              p.image_url ||
              p.image ||
              "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop",
            description:
              p.description ||
              p.long_description ||
              "An end-to-end digital experience crafted with state-of-the-art frontend engineering and meticulous interaction design.",
            collection: {
              title: p.category || "PRODUCTION BUILD",
            },
            category: p.category || "CASE STUDY",
            role: p.role || "Lead Frontend / UI Developer",
            timeline: p.timeline || (p.is_featured ? "FEATURED ARCHIVE" : "PRODUCTION BUILD"),
            price: p.timeline || (p.is_featured ? "FEATURED ARCHIVE" : "CASE STUDY"),
            sizes: techList.slice(0, 5),
            link: `/projects/${slug}`,
          };
        })
      : undefined;

  return (
    <CinematicProductScrollSection
      products={transformedProducts}
      title={title}
      subtitle={subtitle}
      description={description}
      buttonText={buttonText}
      buttonLink={buttonLink}
    />
  );
}

export default CinematicSelectedWork;
