import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { IconFolder, IconStar, IconClock, IconArrowRight } from "@tabler/icons-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const [
    { count: totalProjects },
    { count: featuredCount },
    { data: recentProjects },
  ] = await Promise.all([
    supabase.from("projects").select("*", { count: "exact", head: true }),
    supabase
      .from("projects")
      .select("*", { count: "exact", head: true })
      .eq("is_featured", true),
    supabase
      .from("projects")
      .select("id, name, slug, category, is_featured, created_at")
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  const stats = [
    {
      label: "Total Projects",
      value: totalProjects ?? 0,
      icon: <IconFolder size={24} />,
      color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
    },
    {
      label: "Featured",
      value: featuredCount ?? 0,
      icon: <IconStar size={24} />,
      color: "bg-lime-100 text-lime-600 dark:bg-lime-900/30 dark:text-lime-400",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
        Dashboard
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 flex items-center gap-4"
          >
            <div className={`p-3 rounded-xl ${stat.color}`}>{stat.icon}</div>
            <div>
              <p className="text-2xl font-bold text-zinc-900 dark:text-white">
                {stat.value}
              </p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Projects */}
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200 dark:border-zinc-800">
          <h2 className="font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <IconClock size={20} /> Recent Projects
          </h2>
          <Link
            href="/admin/projects"
            className="text-sm text-lime-600 dark:text-lime-500 hover:underline flex items-center gap-1"
          >
            View all <IconArrowRight size={16} />
          </Link>
        </div>
        <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
          {recentProjects?.map((project) => (
            <Link
              key={project.id}
              href={`/admin/projects/${project.id}`}
              className="flex items-center justify-between px-6 py-4 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
            >
              <div>
                <p className="font-medium text-zinc-900 dark:text-white">
                  {project.name}
                </p>
                <p className="text-xs text-zinc-500 mt-1">
                  {project.category}
                  {project.created_at &&
                    ` · ${new Date(project.created_at).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}`}
                </p>
              </div>
              {project.is_featured && (
                <span className="inline-flex px-2 py-1 rounded-md bg-lime-100 text-lime-700 dark:bg-lime-900/30 dark:text-lime-500 text-xs font-bold">
                  Featured
                </span>
              )}
            </Link>
          ))}
          {!recentProjects?.length && (
            <div className="px-6 py-12 text-center text-zinc-500">
              No projects yet.{" "}
              <Link
                href="/admin/projects/new"
                className="text-lime-600 hover:underline"
              >
                Create one!
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
