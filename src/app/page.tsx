import { Metadata } from "next";
import HomeClient from "./HomeClient";
import { from } from "@/lib/pg-client";
import { Project } from "@/types/database";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Asep Syaepul | UI/UX Designer & Frontend Developer",
  description:
    "Portfolio of Asep Syaepul — UI/UX designer & frontend developer with 7+ years crafting interactive digital products. Design systems, React/Next.js, motion.",
};

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
  const projectsRes = await from("projects")
    .select("*")
    .eq("is_featured", true)
    .order("order_index", { ascending: true })
    .order("created_at", { ascending: false });

  if (projectsRes.error) {
    console.error("Error fetching featured projects:", projectsRes.error);
  }

  const projects =
    projectsRes.data && projectsRes.data.length > 0
      ? projectsRes.data
      : fallbackProjects;

  return (
    <HomeClient
      featuredProjects={projects as Project[]}
    />
  );
}
