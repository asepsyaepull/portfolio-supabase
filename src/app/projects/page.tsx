import supabase from "@/lib/db";
import ProjectsClient from "./ProjectsClient";
import { Metadata } from "next";

export const revalidate = 60; // Revalidate every 60 seconds (ISR)

export const metadata: Metadata = {
  title: "Projects | Asep Syaepul",
  description: "A showcase of my recent projects, case studies, and professional works.",
};

export default async function ProjectsPage() {
  const { data: projects, error } = await supabase
    .from("projects")
    .select("id, name, slug, category, description, image, tech_stack")
    .order("order_idx", { ascending: true });

  if (error) {
    console.error("Error fetching projects:", error);
  }

  return <ProjectsClient projects={projects || []} />;
}
