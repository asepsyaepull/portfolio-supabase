import type { MetadataRoute } from "next";
import { from } from "@/lib/pg-client";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://asyaepul.id";

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  try {
    const { data: projects } = await from("projects").select("slug, updated_at");

    if (projects && projects.length > 0) {
      const projectRoutes = projects
        .filter((p: any) => Boolean(p.slug))
        .map((p: any) => ({
          url: `${baseUrl}/projects/${p.slug}`,
          lastModified: p.updated_at ? new Date(p.updated_at) : new Date(),
          changeFrequency: "monthly" as const,
          priority: 0.7,
        }));
      return [...staticRoutes, ...projectRoutes];
    }
  } catch (error) {
    console.error("Error generating sitemap routes:", error);
  }

  return staticRoutes;
}
