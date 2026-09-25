"use client";

import { useState, useEffect, use, useMemo } from "react";
import { getProjectById, updateProject } from "@/app/admin/crud-actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";
import ProjectForm, {
  type ProjectFormData,
  emptyFormData,
} from "@/components/admin/ProjectForm";

export default function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const unwrappedParams = use(params);
  const projectId = unwrappedParams.id;
  const router = useRouter();
  const [fetching, setFetching] = useState(true);
  const [initialData, setInitialData] = useState<ProjectFormData>(emptyFormData);

  useEffect(() => {
    const fetchProject = async () => {
      const { data, error } = await getProjectById(projectId);

      if (error) {
        toast.error("Gagal memuat proyek.");
        router.push("/admin/projects");
      } else if (data) {
        setInitialData({
          name: data.name || "",
          slug: data.slug || "",
          category: data.category || "",
          description: data.description || "",
          image: data.image || "",
          tech_stack: data.tech_stack ? data.tech_stack.join(", ") : "",
          is_featured: data.is_featured || false,
          role: data.role || "",
          timeline: data.timeline || "",
          tags: data.tags || "",
          tools: data.tools || "",
          long_description: data.long_description || "",
          link: data.link || "",
          problem: data.problem || "",
          solution: data.solution || "",
          icon_name: data.icon_name || "",
          order_index: data.order_index || 0,
        });
      }
      setFetching(false);
    };

    fetchProject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  const handleSubmit = async (formData: ProjectFormData) => {
    const techStackArray = formData.tech_stack
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const { error } = await updateProject(projectId, {
      name: formData.name,
      slug: formData.slug,
      category: formData.category,
      description: formData.description,
      image: formData.image,
      tech_stack: techStackArray,
      is_featured: formData.is_featured,
      role: formData.role,
      timeline: formData.timeline,
      tags: formData.tags,
      tools: formData.tools,
      long_description: formData.long_description,
      link: formData.link || null,
      problem: formData.problem || null,
      solution: formData.solution || null,
      icon_name: formData.icon_name || null,
      order_index: formData.order_index,
    });

    if (error) throw new Error(error.message);

    toast.success("Project updated successfully!");
    router.push("/admin/projects");
    router.refresh();
  };

  if (fetching) {
    return (
      <div className="py-20 text-center flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-brand border-t-transparent animate-spin" />
        <span className="font-mono text-xs text-zinc-500">Memuat data proyek...</span>
      </div>
    );
  }

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
            Edit Proyek
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
            Perbarui data, tautan demo, atau konten studi kasus untuk &ldquo;{initialData.name || "Proyek"}&rdquo;.
          </p>
        </div>
      </div>

      <ProjectForm
        initialData={initialData}
        onSubmit={handleSubmit}
        submitLabel="Perbarui Proyek"
        loadingLabel="Menyimpan..."
      />
    </div>
  );
}
