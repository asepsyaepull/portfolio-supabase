import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { IconPlus, IconCode } from "@tabler/icons-react";
import SortableSkillsList from "@/components/admin/SortableSkillsList";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminSkillsPage() {
  const supabase = await createClient();
  const { data: skills, error } = await supabase
    .from("skills")
    .select("*")
    .order("order_index", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching skills:", error);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Skills</h1>
        <Link
          href="/admin/skills/new"
          className="flex items-center gap-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-4 py-2 rounded-xl text-sm font-bold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
        >
          <IconPlus size={18} /> Add Skill
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-200">
          <p className="font-bold">Gagal memuat skills dari database:</p>
          <p className="text-sm font-mono mt-1">{error.message}</p>
        </div>
      )}

      {skills && skills.length > 0 ? (
        <SortableSkillsList initialSkills={skills} />
      ) : !error ? (
        <div className="py-12 text-center text-zinc-500 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 flex flex-col items-center gap-3">
          <IconCode size={32} className="text-zinc-400" />
          <p>Belum ada skill ditambahkan.</p>
        </div>
      ) : null}
    </div>
  );
}