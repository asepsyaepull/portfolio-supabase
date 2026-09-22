"use client";

import { useState, useEffect, use } from "react";
import { getUIGalleryById, updateUIGallery } from "@/app/admin/crud-actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";
import GalleryForm, { type GalleryFormData } from "@/components/admin/GalleryForm";
import { type UIGallery } from "@/types/database";

export default function EditGalleryShotPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const unwrappedParams = use(params);
  const galleryId = unwrappedParams.id;
  const router = useRouter();
  const [fetching, setFetching] = useState(true);
  const [initialData, setInitialData] = useState<UIGallery | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchShot = async () => {
      const { data, error } = await getUIGalleryById(galleryId);

      if (error || !data) {
        toast.error("Gagal memuat detail shot galeri.");
        router.push("/admin/gallery");
      } else {
        setInitialData(data);
      }
      setFetching(false);
    };

    fetchShot();
  }, [galleryId, router]);

  const handleSubmit = async (formData: GalleryFormData) => {
    setIsSubmitting(true);
    try {
      const toolsArray = formData.tools
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t.length > 0);

      const { error } = await updateUIGallery(galleryId, {
        title: formData.title,
        slug: formData.slug,
        category: formData.category,
        description: formData.description || null,
        image_url: formData.image_url,
        thumbnail_url: formData.image_url,
        tools: toolsArray,
        aspect_ratio: formData.aspect_ratio || "16/10",
        figma_url: formData.figma_url || null,
        preview_url: formData.preview_url || null,
        is_featured: formData.is_featured,
        order_index: formData.order_index || 0,
      });

      if (error) {
        throw new Error(error.message || "Failed to update gallery shot");
      }

      toast.success("Desain shot berhasil diperbarui!");
      router.push("/admin/gallery");
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || "Terjadi kesalahan saat memperbarui");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (fetching) {
    return (
      <div className="py-20 text-center flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-brand border-t-transparent animate-spin" />
        <span className="font-mono text-xs text-zinc-500">Memuat data desain...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 pb-20">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/gallery"
          className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-brand hover:bg-brand/10 transition-colors"
          title="Kembali ke Gallery"
        >
          <IconArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">
            Edit Desain Shot
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Perbarui visual, deskripsi, atau tautan figma untuk &ldquo;{initialData?.title}&rdquo;.
          </p>
        </div>
      </div>

      <GalleryForm
        initialData={initialData || undefined}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
