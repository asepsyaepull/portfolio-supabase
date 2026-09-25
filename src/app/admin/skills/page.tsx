import { from } from "@/lib/pg-client";
import Link from "next/link";
import { IconPlus, IconCode } from "@tabler/icons-react";
import SortableSkillsList from "@/components/admin/SortableSkillsList";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminSkillsPage() {
  const { data: skills, error } = await from("skills")
    .select("*")
    .order("order_index", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching skills:", error);
  }

  return (
    <div className="flex flex-col gap-6 pb-20">
      {/* Top Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-brand/10 text-brand font-mono text-[11px] font-bold uppercase tracking-wider mb-2">
            <span>/ CMS MANAGEMENT</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">
            Skills & Technologies
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Kelola daftar keahlian teknologi, tools, dan urutan ikon keahlian portofolio.
          </p>
        </div>

        <Link
          href="/admin/skills/new"
          className="inline-flex items-center gap-2 bg-brand hover:bg-brand-deep text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-brand shadow-[0_10px_20px_-10px_#F0531C] active:scale-95 transition-all self-start sm:self-auto"
        >
          <IconPlus size={18} strokeWidth={2.5} />
          <span>Add Skill</span>
        </Link>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 p-4 rounded-2xl text-xs font-mono">
          <p className="font-bold">Gagal memuat skills dari database:</p>
          <p className="mt-0.5">{error.message}</p>
        </div>
      )}

      {skills && skills.length > 0 ? (
        <SortableSkillsList initialSkills={skills} />
      ) : !error ? (
        <div className="py-12 text-center text-zinc-500 bg-white dark:bg-[#121215] rounded-3xl border border-zinc-200 dark:border-zinc-800 flex flex-col items-center gap-3">
          <IconCode size={40} className="text-zinc-400 opacity-50" />
          <p className="font-mono text-sm">Belum ada skill ditambahkan.</p>
        </div>
      ) : null}
    </div>
  );
}