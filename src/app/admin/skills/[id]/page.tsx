"use client";

import { useState, useEffect, use, useMemo } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";
import SkillForm, { type SkillFormData, emptySkillData } from "@/components/admin/SkillForm";

export default function EditSkillPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const skillId = unwrappedParams.id;
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  const [fetching, setFetching] = useState(true);
  const [initialData, setInitialData] = useState<SkillFormData>(emptySkillData);

  useEffect(() => {
    const fetchSkill = async () => {
      const { data, error } = await supabase
        .from("skills")
        .select("*")
        .eq("id", skillId)
        .single();

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
  }, [skillId, router, supabase]);

  const handleSubmit = async (formData: SkillFormData) => {
    const { error } = await supabase
      .from("skills")
      .update({
        name: formData.name,
        icon_name: formData.icon_name,
        color_class: formData.color_class,
        order_index: formData.order_index,
      })
      .eq("id", skillId);

    if (error) throw new Error(error.message);

    toast.success("Skill updated successfully!");
    router.push("/admin/skills");
    router.refresh();
  };

  if (fetching) {
    return <div className="p-8 text-center text-zinc-500 animate-pulse">Memuat data skill...</div>;
  }

  return (
    <div className="flex flex-col gap-6 pb-20">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/skills"
          className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
        >
          <IconArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
          Edit Skill
        </h1>
      </div>

      <SkillForm
        initialData={initialData}
        onSubmit={handleSubmit}
        submitLabel="Update Skill"
        loadingLabel="Updating..."
      />
    </div>
  );
}
