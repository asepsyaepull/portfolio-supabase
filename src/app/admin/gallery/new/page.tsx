"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { insertUIGallery } from "@/app/admin/crud-actions";
import { toast } from "sonner";
import { IconArrowLeft } from "@tabler/icons-react";
import Link from "next/link";
import GalleryForm, { type GalleryFormData } from "@/components/admin/GalleryForm";

export default function NewGalleryShotPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: GalleryFormData) => {
    setIsSubmitting(true);
    try {
      const toolsArray = data.tools
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t.length > 0);

      const { error } = await insertUIGallery({
        title: data.title,
        slug: data.slug,
        category: data.category,
        description: data.description || null,
        image_url: data.image_url,
        thumbnail_url: data.image_url,
        tools: toolsArray,
        aspect_ratio: data.aspect_ratio || "16/10",
        figma_url: data.figma_url || null,
        preview_url: data.preview_url || null,
        is_featured: data.is_featured,
        order_index: data.order_index || 0,
      });

      if (error) {
        throw new Error(error.message || "Failed to insert gallery shot");
      }

      toast.success("Desain shot berhasil ditambahkan ke galeri!");
      router.push("/admin/gallery");
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || "Terjadi kesalahan saat menyimpan");
    } finally {
      setIsSubmitting(false);
    }
  };

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
            Tambah Desain UI Baru
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Unggah eksplorasi desain, mockup, atau komponen untuk galeri visual.
          </p>
        </div>
      </div>

      <GalleryForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  );
}
