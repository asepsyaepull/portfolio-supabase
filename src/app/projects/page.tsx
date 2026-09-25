import { from } from "@/lib/pg-client";
import ProjectsClient from "./ProjectsClient";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Projects | Asep Syaepul",
  description:
    "Explore case studies in UI/UX design and production frontend engineering by Asep Syaepul — enterprise ERP platforms, modern retail POS, and mobile applications.",
  alternates: {
    canonical: "https://asyaepul.id/projects",
  },
  openGraph: {
    title: "Projects | Asep Syaepul",
    description:
      "Production-ready UI/UX design and frontend case studies: enterprise ERP, retail POS, vehicle rental mobile app, and automotive ecosystems.",
    url: "https://asyaepul.id/projects",
    siteName: "Asep Syaepul Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Asep Syaepul - Selected Projects",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Asep Syaepul",
    description:
      "Production-ready UI/UX design and frontend case studies by Asep Syaepul.",
    images: ["/og-image.jpg"],
  },
};

export default async function ProjectsPage() {
  const { data: projects, error } = await from("projects")
    .select(
      "id, name, slug, category, description, image, tech_stack, problem, solution, link, is_featured, role, timeline"
    )
    .order("order_index", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching projects detail:", {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
      full: error,
    });
  }

  // Fetch UI gallery shots from PostgreSQL
  const { data: galleries, error: galleryError } = await from("ui_gallery")
    .select(
      "id, title, slug, category, description, image_url, thumbnail_url, tools, aspect_ratio, figma_url, preview_url, is_featured, order_index, created_at"
    )
    .order("order_index", { ascending: true })
    .order("created_at", { ascending: false });

  if (galleryError) {
    console.error("Error fetching UI gallery:", galleryError);
  }

  const displayGalleries = (galleries as any[]) || [];
  const displayProjects = (projects as any[]) || [];

  return (
    <ProjectsClient
      projects={displayProjects}
      galleries={displayGalleries}
    />
  );
}
