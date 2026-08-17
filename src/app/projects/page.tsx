import { getStaticClient } from "@/lib/supabase/server";
import ProjectsClient from "./ProjectsClient";
import { Metadata } from "next";

export const revalidate = 60; // Revalidate every 60 seconds (ISR)

export const metadata: Metadata = {
  title: "Projects | Asep Syaepul",
  description: "A showcase of my recent projects, case studies, and professional works.",
};

export default async function ProjectsPage() {
  const supabase = getStaticClient();
  const { data: projects, error } = await supabase
    .from("projects")
    .select("id, name, slug, category, description, image, tech_stack")
    .order("order_index", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching projects detail:", {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
      full: error
    });
  }

  // Gunakan data fallback jika query error atau tabel kosong
  const displayProjects = (projects && projects.length > 0) ? projects : [
    {
      id: 1,
      name: "Symbolix.ai",
      slug: "symbolix-ai",
      category: "UI/UX Design",
      description: "End-to-end UI/UX redesign and frontend implementation for an advanced ERP & POS system, converting complex logic into intuitive interfaces.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop",
      tech_stack: ["React", "TypeScript"]
    },
    {
      id: 2,
      name: "TRACtoGO",
      slug: "tractogo",
      category: "Mobile App",
      description: "Complete redesign of web and mobile applications for the leading vehicle rental service, reducing design-to-development time by 30%.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
      tech_stack: ["React Native", "TypeScript"]
    },
    {
      id: 3,
      name: "Isuzu Link",
      slug: "isuzu-link",
      category: "Web App",
      description: "Design of key frontend features contributing to a 25% growth in new user adoption for the automotive service ecosystem.",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=800&auto=format&fit=crop",
      tech_stack: ["Next.js", "TypeScript"]
    }
  ];

  return <ProjectsClient projects={displayProjects as any[]} />;
}
