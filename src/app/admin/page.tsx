import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import {
  IconFolder,
  IconStar,
  IconClock,
  IconArrowRight,
  IconPhoto,
  IconPlus,
} from "@tabler/icons-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const [
    projectsRes,
    featuredRes,
    galleriesRes,
    recentProjectsRes,
    recentGalleriesRes,
  ] = await Promise.all([
    supabase.from("projects").select("*", { count: "exact", head: true }),
    supabase
      .from("projects")
      .select("*", { count: "exact", head: true })
      .eq("is_featured", true),
    supabase.from("ui_gallery").select("*", { count: "exact", head: true }),
    supabase
      .from("projects")
      .select("id, name, slug, category, is_featured, created_at")
      .order("created_at", { ascending: false })
      .limit(4),
    supabase
      .from("ui_gallery")
      .select("id, title, slug, category, created_at")
      .order("created_at", { ascending: false })
      .limit(4),
  ]);

  const totalProjects = projectsRes?.count ?? 0;
  const featuredCount = featuredRes?.count ?? 0;
  const totalGalleries = galleriesRes?.count ?? 0;
  const recentProjects = recentProjectsRes?.data ?? [];
  const recentGalleries = recentGalleriesRes?.data ?? [];

  const stats = [
    {
      label: "Case Studies (Projects)",
      value: totalProjects ?? 0,
      icon: <IconFolder size={22} />,
      color: "bg-brand/10 text-brand border border-brand/20",
      href: "/admin/projects",
    },
    {
      label: "UI Gallery Shots",
      value: totalGalleries ?? 0,
      icon: <IconPhoto size={22} />,
      color: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20",
      href: "/admin/gallery",
    },
    {
      label: "Featured Works",
      value: featuredCount ?? 0,
      icon: <IconStar size={22} />,
      color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20",
      href: "/admin/projects",
    },
  ];

  return (
    <div className="flex flex-col gap-8 pb-20">
      {/* Welcome & Quick Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-brand/10 text-brand font-mono text-[11px] font-bold uppercase tracking-wider mb-2">
            <span>/ OVERVIEW</span>
          </div>
          <h1 className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Pantau dan kelola seluruh konten portofolio, studi kasus, dan galeri visual.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#121215] text-zinc-800 dark:text-zinc-200 hover:text-brand hover:border-brand/40 text-sm font-semibold transition-all shadow-sm"
          >
            <IconPlus size={16} />
            <span>New Project</span>
          </Link>

          <Link
            href="/admin/gallery/new"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand hover:bg-brand-deep text-white text-sm font-semibold shadow-brand shadow-[0_10px_20px_-10px_#F0531C] active:scale-95 transition-all"
          >
            <IconPlus size={16} strokeWidth={2.5} />
            <span>New UI Shot</span>
          </Link>
        </div>
      </div>

      {/* Metrics Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-white dark:bg-[#121215] rounded-3xl border border-zinc-200 dark:border-zinc-800 p-6 flex items-center gap-4 hover:border-brand/40 transition-all shadow-sm hover:shadow-md group"
          >
            <div className={`p-3.5 rounded-2xl ${stat.color} transition-transform group-hover:scale-105`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                {stat.value}
              </p>
              <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mt-0.5">
                {stat.label}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Dual Overview Sections: Recent Projects vs Recent UI Gallery */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 1. Recent Projects */}
        <div className="bg-white dark:bg-[#121215] rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden flex flex-col">
          <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-950/30">
            <h2 className="font-bold text-sm text-zinc-900 dark:text-white flex items-center gap-2">
              <IconClock size={18} className="text-brand" />
              <span>Recent Projects</span>
            </h2>
            <Link
              href="/admin/projects"
              className="text-xs font-mono font-bold text-brand hover:underline flex items-center gap-1"
            >
              View all <IconArrowRight size={14} />
            </Link>
          </div>

          <div className="divide-y divide-zinc-100 dark:divide-zinc-800/60 flex-1">
            {recentProjects?.map((project: any) => (
              <Link
                key={project.id}
                href={`/admin/projects/${project.id}`}
                className="flex items-center justify-between px-6 py-3.5 hover:bg-zinc-50/70 dark:hover:bg-zinc-900/40 transition-colors"
              >
                <div className="min-w-0 pr-4">
                  <p className="font-bold text-zinc-900 dark:text-white text-sm truncate">
                    {project.name}
                  </p>
                  <p className="text-xs font-mono text-zinc-400 mt-0.5 truncate">
                    {project.category}
                  </p>
                </div>
                {project.is_featured && (
                  <span className="inline-flex px-2 py-0.5 rounded-full bg-brand/10 text-brand border border-brand/20 text-[10px] font-mono font-bold uppercase">
                    Featured
                  </span>
                )}
              </Link>
            ))}

            {!recentProjects?.length && (
              <div className="px-6 py-10 text-center text-zinc-400 font-mono text-xs">
                Belum ada proyek.
              </div>
            )}
          </div>
        </div>

        {/* 2. Recent UI Gallery Shots */}
        <div className="bg-white dark:bg-[#121215] rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden flex flex-col">
          <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-950/30">
            <h2 className="font-bold text-sm text-zinc-900 dark:text-white flex items-center gap-2">
              <IconPhoto size={18} className="text-brand" />
              <span>Recent UI Shots</span>
            </h2>
            <Link
              href="/admin/gallery"
              className="text-xs font-mono font-bold text-brand hover:underline flex items-center gap-1"
            >
              View all <IconArrowRight size={14} />
            </Link>
          </div>

          <div className="divide-y divide-zinc-100 dark:divide-zinc-800/60 flex-1">
            {recentGalleries?.map((shot: any) => (
              <Link
                key={shot.id}
                href={`/admin/gallery/${shot.id}`}
                className="flex items-center justify-between px-6 py-3.5 hover:bg-zinc-50/70 dark:hover:bg-zinc-900/40 transition-colors"
              >
                <div className="min-w-0 pr-4">
                  <p className="font-bold text-zinc-900 dark:text-white text-sm truncate">
                    {shot.title}
                  </p>
                  <p className="text-xs font-mono text-zinc-400 mt-0.5 truncate">
                    {shot.category}
                  </p>
                </div>
                <span className="inline-flex px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 text-[10px] font-mono">
                  Shot
                </span>
              </Link>
            ))}

            {!recentGalleries?.length && (
              <div className="px-6 py-10 text-center text-zinc-400 font-mono text-xs">
                Belum ada shot galeri.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
