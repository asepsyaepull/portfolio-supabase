"use client";

import { useRouter } from "next/navigation";
import { insertProject } from "@/app/admin/crud-actions";
import { toast } from "sonner";
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";
import ProjectForm, { type ProjectFormData } from "@/components/admin/ProjectForm";

export default function NewProjectPage() {
  const router = useRouter();
  const handleSubmit = async (data: ProjectFormData) => {
    const techStackArray = data.tech_stack
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const { error } = await insertProject(
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
      }
    );

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
          className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-brand hover:bg-brand/10 transition-colors shrink-0"
          title="Kembali ke Projects"
        >
          <IconArrowLeft size={20} />
        </Link>
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-brand/10 text-brand font-mono text-[11px] font-bold uppercase tracking-wider mb-1">
            <span>/ PROJECTS CMS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">
            Tambah Proyek Baru
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
            Publikasikan studi kasus baru, informasi teknologi, dan konten detail ke portofolio.
          </p>
        </div>
      </div>

      <ProjectForm
        onSubmit={handleSubmit}
        submitLabel="Simpan Proyek"
        loadingLabel="Menyimpan..."
      />
    </div>
  );
}
