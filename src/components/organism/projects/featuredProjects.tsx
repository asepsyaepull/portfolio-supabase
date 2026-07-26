"use client";
import React, { useEffect, useState } from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import {
  IconArrowWaveRightUp,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { Project } from "@/types/database";
import { getTablerIcon } from "@/lib/icon-mapper";

const MotionImage = motion(Image);

export function FeaturedProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .eq("is_featured", true)
          .order("order_index", { ascending: true })
          .order("created_at", { ascending: false });

        if (error) throw error;
        
        if (data && data.length > 0) {
          setProjects(data);
        } else {
          // Fallback if table is empty or does not exist yet
          setProjects(fallbackProjects);
        }
      } catch (err) {
        console.warn("Using fallback projects due to fetch error:", err);
        setProjects(fallbackProjects);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  return (
    <section className="py-20 bg-zinc-50 dark:bg-gray-950 transition-colors duration-300">
        <div className="container mx-auto px-4 md:px-24 mb-16">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <span className="text-lime-600 dark:text-lime-500 font-medium tracking-wider transition-colors">/ SELECTION</span>
                <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white mt-2 transition-colors">
                    Featured <span className="text-zinc-500 dark:text-gray-500 transition-colors">Projects</span>
                </h2>
            </motion.div>
        </div>

        {loading ? (
            <div className="flex justify-center items-center py-20">
                <div className="w-10 h-10 border-2 border-lime-500/50 rounded-full animate-spin border-t-lime-500"></div>
            </div>
        ) : (
            <BentoGrid className="max-w-7xl mx-auto px-4">
                {projects.map((item, i) => (
                    <BentoGridItem
                    key={item.id}
                    title={item.name}
                    description={item.description}
                    header={<Skeleton src={item.image} overlap={item.image_overlap} />}
                    icon={getTablerIcon(item.icon_name || "", "h-4 w-4 text-lime-500")}
                    className={i === 3 ? "md:col-span-2" : ""}
                    />
                ))}
            </BentoGrid>
        )}
    </section>
  );
}

const Skeleton = ({ src, overlap = "none" }: { src?: string, overlap?: "top" | "bottom" | "none" | string }) => (
  <div className="relative w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-zinc-200 dark:from-zinc-900 to-zinc-100 dark:to-zinc-800 overflow-visible transition-colors duration-300">
    {src ? (
        <MotionImage
            src={src}
            alt="project preview"
            width={800}
            height={600}
            className={cn(
                "absolute inset-0 w-full h-full object-cover object-top transition duration-700 ease-out group-hover/bento:scale-[1.03]",
                overlap === "top" && "-mt-10",
                overlap === "bottom" && "-mb-10"
            )}
        />
    ) : (
        <div className="w-full h-full flex items-center justify-center">
            <div className="w-10 h-10 border-2 border-lime-500/50 dark:border-lime-500/20 rounded-full animate-pulse transition-colors" />
        </div>
    )}
  </div>
);

// Fallback static data mapping to the Project interface
const fallbackProjects: Project[] = [
  {
    id: 1,
    name: "Symbolix.ai",
    slug: "symbolix-ai",
    category: "UI/UX Design",
    description: "End-to-end UI/UX redesign and frontend implementation for an advanced ERP & POS system, converting complex logic into intuitive interfaces.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop",
    tech_stack: ["React", "TypeScript"],
    is_featured: true,
    image_overlap: "top",
    icon_name: "IconClipboardCopy",
    order_index: 1,
  },
  {
    id: 2,
    name: "TRACtoGO",
    slug: "tractogo",
    category: "Mobile App",
    description: "Complete redesign of web and mobile applications for the leading vehicle rental service, reducing design-to-development time by 30%.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    tech_stack: ["React Native", "TypeScript"],
    is_featured: true,
    image_overlap: "none",
    icon_name: "IconFileBroken",
    order_index: 2,
  },
  {
    id: 3,
    name: "Isuzu Link",
    slug: "isuzu-link",
    category: "Web App",
    description: "Design of key frontend features contributing to a 25% growth in new user adoption for the automotive service ecosystem.",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=800&auto=format&fit=crop",
    tech_stack: ["Next.js", "TypeScript"],
    is_featured: true,
    image_overlap: "bottom",
    icon_name: "IconSignature",
    order_index: 3,
  },
  {
    id: 4,
    name: "PT Liftech Digital Transformation",
    slug: "pt-liftech",
    category: "Digital Transformation",
    description: "Full-cycle digital transformation managing everything from UI/UX auditing and wireframing to technical deployment using TypeScript.",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=800&auto=format&fit=crop",
    tech_stack: ["TypeScript", "Next.js"],
    is_featured: true,
    image_overlap: "top",
    icon_name: "IconTableColumn",
    order_index: 4,
  },
  {
    id: 5,
    name: "OMS Crewdible",
    slug: "oms-crewdible",
    category: "Web App",
    description: "Revamp of the Order Management System increasing conversion rates by 24% while ensuring full responsive performance.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1600&auto=format&fit=crop",
    tech_stack: ["React", "Node.js"],
    is_featured: true,
    image_overlap: "none",
    icon_name: "IconArrowWaveRightUp",
    order_index: 5,
  },
];
