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
  const { data: allProjects, error } = await from("projects")
    .select("*")
    .order("order_index", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching projects on Home:", error);
  }

  const rawProjects = (allProjects as Project[]) || [];

  // Filter only active projects (hide only if explicitly is_active === false)
  const activeProjects = rawProjects.filter(
    (p: any) => p.is_active !== false
  );

  // 1. Featured projects from active projects
  let featured = activeProjects.filter((p) => Boolean(p.is_featured));

  // 2. Fallback to active projects if none are marked featured yet
  if (featured.length === 0) {
    featured = activeProjects.slice(0, 6);
  }

  return (
    <HomeClient
      featuredProjects={featured}
    />
  );
}

