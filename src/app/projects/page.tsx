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
  const [projectsRes, galleriesRes] = await Promise.all([
    from("projects")
      .select("*")
      .order("order_index", { ascending: true })
      .order("created_at", { ascending: false }),
    from("ui_gallery")
      .select("*")
      .order("order_index", { ascending: true })
      .order("created_at", { ascending: false }),
  ]);

  if (projectsRes.error) {
    console.error("Error fetching projects detail:", projectsRes.error);
  }

  if (galleriesRes.error) {
    console.error("Error fetching UI gallery:", galleriesRes.error);
  }

  // Filter out only if explicitly set to inactive
  const displayProjects = ((projectsRes.data as any[]) || []).filter(
    (p: any) => p.is_active !== false
  );

  // Filter out only if explicitly set to hidden
  const displayGalleries = ((galleriesRes.data as any[]) || []).filter(
    (g: any) => g.is_featured !== false
  );

  return (
    <ProjectsClient
      projects={displayProjects}
      galleries={displayGalleries}
    />
  );
}
