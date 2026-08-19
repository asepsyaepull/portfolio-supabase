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
          className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
        >
          <IconArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
          Add New Skill
        </h1>
      </div>

      <SkillForm
        onSubmit={handleSubmit}
        submitLabel="Save Skill"
        loadingLabel="Saving..."
      />
    </div>
  );
}
