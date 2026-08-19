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
      <div className="p-8 text-center text-zinc-500 animate-pulse">
        Memuat data proyek...
      </div>
    );
  }

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
          Edit Project
        </h1>
      </div>

      <ProjectForm
        initialData={initialData}
        onSubmit={handleSubmit}
        submitLabel="Update Project"
        loadingLabel="Updating..."
      />
    </div>
  );
}
