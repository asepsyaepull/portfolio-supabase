import { Metadata } from "next";
import HomeClient from "./HomeClient";
import { getStaticClient } from "@/lib/supabase/server";
import { Project, Skill } from "@/types/database";

export const revalidate = 3600; // Revalidate setiap 1 jam (ISR)

export const metadata: Metadata = {
  title: "Asep Syaepul | Frontend Developer",
  description: "Portfolio of Asep Syaepul, a Frontend Developer specialized in React, Next.js, and Modern Web UI.",
};

const fallbackSkills: Skill[] = [
  { id: 1, name: "React", icon_name: "SiReact", color_class: "text-blue-400", order_index: 1 },
  { id: 2, name: "Next.js", icon_name: "SiNextdotjs", color_class: "text-zinc-800 dark:text-white", order_index: 2 },
  { id: 3, name: "Tailwind", icon_name: "SiTailwindcss", color_class: "text-cyan-400", order_index: 3 },
  { id: 4, name: "TypeScript", icon_name: "SiTypescript", color_class: "text-blue-600", order_index: 4 },
  { id: 5, name: "Framer Motion", icon_name: "SiFramer", color_class: "text-purple-500", order_index: 5 },
  { id: 6, name: "Supabase", icon_name: "SiSupabase", color_class: "text-emerald-500", order_index: 6 },
  { id: 7, name: "Three.js", icon_name: "SiThreedotjs", color_class: "text-zinc-800 dark:text-white", order_index: 7 },
  { id: 8, name: "Node.js", icon_name: "SiNodedotjs", color_class: "text-green-500", order_index: 8 },
];

const fallbackProjects: Project[] = [
  {
    id: 1,
    name: "Symbolix.ai",
    slug: "symbolix-ai",
    category: "UI/UX Design",
    description: "End-to-end UI/UX redesign and frontend implementation for an advanced ERP & POS system.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop",
    tech_stack: ["React", "TypeScript"],
    is_featured: true,
    order_index: 1,
  },
  {
    id: 2,
    name: "TRACtoGO",
    slug: "tractogo",
    category: "Mobile App",
    description: "Complete redesign of web and mobile applications for a vehicle rental service, cutting design-to-dev time by 30%.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    tech_stack: ["React Native", "TypeScript"],
    is_featured: true,
    order_index: 2,
  },
  {
    id: 3,
    name: "Isuzu Link",
    slug: "isuzu-link",
    category: "Web App",
    description: "Frontend features driving 25% growth in new user adoption for an automotive service ecosystem.",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=800&auto=format&fit=crop",
    tech_stack: ["Next.js", "TypeScript"],
    is_featured: true,
    order_index: 3,
  },
  {
    id: 4,
    name: "PT Liftech Digital Transformation",
    slug: "pt-liftech",
    category: "Digital Transformation",
    description: "Full-cycle digital transformation from UX auditing and wireframing to technical deployment.",
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=800&auto=format&fit=crop",
    tech_stack: ["TypeScript", "Next.js"],
    is_featured: true,
    order_index: 4,
  },
  {
    id: 5,
    name: "OMS Crewdible",
    slug: "oms-crewdible",
    category: "Web App",
    description: "Order Management System revamp increasing conversion rates by 24% with full responsive performance.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1600&auto=format&fit=crop",
    tech_stack: ["React", "Node.js"],
    is_featured: true,
    order_index: 5,
  },
];

export default async function Home() {
  const supabase = getStaticClient();

  const [projectsRes, skillsRes] = await Promise.all([
    supabase
      .from("projects")
      .select("*")
      .eq("is_featured", true)
      .order("order_index", { ascending: true })
      .order("created_at", { ascending: false }),
    supabase
      .from("skills")
      .select("*")
      .order("order_index", { ascending: true }),
  ]);

  // Fallback data when Supabase is unreachable or returns an error,
  // so the homepage never renders an empty projects/skills section.
  if (projectsRes.error) {
    console.error("Error fetching featured projects:", projectsRes.error);
  }
  if (skillsRes.error) {
    console.error("Error fetching skills:", skillsRes.error);
  }

  const projects =
    projectsRes.data && projectsRes.data.length > 0
      ? projectsRes.data
      : fallbackProjects;
  const skills =
    skillsRes.data && skillsRes.data.length > 0
      ? skillsRes.data
      : fallbackSkills;

  return (
    <HomeClient
      featuredProjects={projects as Project[]}
      skills={skills as Skill[]}
    />
  );
}
