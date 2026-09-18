import type { MetadataRoute } from "next";
import { getStaticClient } from "@/lib/supabase/server";

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
    const supabase = getStaticClient();
    const { data: projects } = await supabase.from("projects").select("slug, updated_at");

    if (projects && projects.length > 0) {
      const projectRoutes = projects.map((p: any) => ({
        url: `${baseUrl}/projects/${p.slug}`,
        lastModified: p.updated_at ? new Date(p.updated_at) : new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      }));
      return [...staticRoutes, ...projectRoutes];
    }
  } catch {
    // fallback below
  }

  const fallbackSlugs = [
    "symbolix-ai",
    "tractogo",
    "isuzu-link",
    "pt-liftech",
    "oms-crewdible",
    "crewdible-oms-redesign",
    "tractogo-web-dan-mobile-application-ux-enhancement",
    "qr-digital-menu",
  ];

  return [
    ...staticRoutes,
    ...fallbackSlugs.map((slug) => ({
      url: `${baseUrl}/projects/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
