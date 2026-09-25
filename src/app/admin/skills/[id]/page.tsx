"use client";

import { useState, useEffect, use, useMemo } from "react";
import { useRouter } from "next/navigation";
import { getSkillById, updateSkill } from "@/app/admin/crud-actions";
import { toast } from "sonner";
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";
import SkillForm, { type SkillFormData, emptySkillData } from "@/components/admin/SkillForm";

export default function EditSkillPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const skillId = unwrappedParams.id;
  const router = useRouter();
  const [fetching, setFetching] = useState(true);
  const [initialData, setInitialData] = useState<SkillFormData>(emptySkillData);

  useEffect(() => {
    const fetchSkill = async () => {
      const { data, error } = await getSkillById(skillId);

      if (error) {
        toast.error("Gagal memuat skill.");
        router.push("/admin/skills");
      } else if (data) {
        setInitialData({
          name: data.name || "",
          icon_name: data.icon_name || "",
          color_class: data.color_class || "text-zinc-500",
          order_index: data.order_index || 0,
        });
      }
      setFetching(false);
    };

    fetchSkill();
  }, [skillId, router]);

  const handleSubmit = async (formData: SkillFormData) => {
    const { error } = await updateSkill(skillId, {
      name: formData.name,
      icon_name: formData.icon_name,
      color_class: formData.color_class,
      order_index: formData.order_index,
    });

    if (error) throw new Error(error.message);

    toast.success("Skill updated successfully!");
    router.push("/admin/skills");
    router.refresh();
  };

  if (fetching) {
    return (
      <div className="py-20 text-center flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-brand border-t-transparent animate-spin" />
        <span className="font-mono text-xs text-zinc-500">Memuat data keahlian...</span>
      </div>
    );
  }

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
            Edit Keahlian
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
            Perbarui nama keahlian, icon, atau kelas warna untuk &ldquo;{initialData.name || "Keahlian"}&rdquo;.
          </p>
        </div>
      </div>

      <SkillForm
        initialData={initialData}
        onSubmit={handleSubmit}
        submitLabel="Perbarui Keahlian"
        loadingLabel="Menyimpan..."
      />
    </div>
  );
}
