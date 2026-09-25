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

export default async function Home() {
  // 1. Fetch featured projects first
  const { data: featuredProjects, error } = await from("projects")
    .select("*")
    .eq("is_featured", true)
    .order("order_index", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching featured projects:", error);
  }

  let projects: Project[] = (featuredProjects as Project[]) || [];

  // 2. If no projects are explicitly featured yet, fallback to available DB projects
  if (projects.length === 0) {
    const { data: recentProjects, error: recentError } = await from("projects")
      .select("*")
      .order("order_index", { ascending: true })
      .order("created_at", { ascending: false })
      .limit(6);

    if (recentError) {
      console.error("Error fetching recent projects:", recentError);
    }

    projects = (recentProjects as Project[]) || [];
  }

  return (
    <HomeClient
      featuredProjects={projects}
    />
  );
}

