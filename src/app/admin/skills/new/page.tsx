"use client";

import { useRouter } from "next/navigation";
import { insertSkill } from "@/app/admin/crud-actions";
import { toast } from "sonner";
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";
import SkillForm, { type SkillFormData } from "@/components/admin/SkillForm";

export default function NewSkillPage() {
  const router = useRouter();
  const handleSubmit = async (data: SkillFormData) => {
    const { error } = await insertSkill(
      {
        name: data.name,
        icon_name: data.icon_name,
        color_class: data.color_class,
        order_index: data.order_index,
      }
    );

    if (error) throw new Error(error.message);

    toast.success("Skill created successfully!");
    router.push("/admin/skills");
    router.refresh();
  };

  return (
    <div className="flex flex-col gap-6 pb-20">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/skills"
          className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-brand hover:bg-brand/10 transition-colors shrink-0"
          title="Kembali ke Skills"
        >
          <IconArrowLeft size={20} />
        </Link>
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-brand/10 text-brand font-mono text-[11px] font-bold uppercase tracking-wider mb-1">
            <span>/ SKILLS CMS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">
            Tambah Keahlian Baru
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
            Tambahkan teknologi, tools, atau bahasa pemrograman ke daftar keahlian portofolio.
          </p>
        </div>
      </div>

      <SkillForm
        onSubmit={handleSubmit}
        submitLabel="Simpan Keahlian"
        loadingLabel="Menyimpan..."
      />
    </div>
  );
}
