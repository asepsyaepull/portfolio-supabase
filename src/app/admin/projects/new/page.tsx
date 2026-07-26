"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";
import ProjectForm, { type ProjectFormData } from "@/components/admin/ProjectForm";

export default function NewProjectPage() {
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (data: ProjectFormData) => {
    const techStackArray = data.tech_stack
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const { error } = await supabase.from("projects").insert([
      {
        name: data.name,
        slug: data.slug,
        category: data.category,
        description: data.description,
        image: data.image,
        tech_stack: techStackArray,
        is_featured: data.is_featured,
        role: data.role,
        timeline: data.timeline,
        tags: data.tags,
        tools: data.tools,
        long_description: data.long_description,
        link: data.link || null,
        problem: data.problem || null,
        solution: data.solution || null,
        icon_name: data.icon_name || null,
        order_index: data.order_index,
      },
    ]);

    if (error) throw new Error(error.message);

    toast.success("Project created successfully!");
    router.push("/admin/projects");
    router.refresh();
  };

  return (
    <div className="flex flex-col gap-6 pb-20">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/projects"
          className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
        >
          <IconArrowLeft size={20} />
        </Link>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">
          Create New Project
        </h1>
      </div>

      <ProjectForm
        onSubmit={handleSubmit}
        submitLabel="Save Project"
        loadingLabel="Saving..."
      />
    </div>
  );
}
