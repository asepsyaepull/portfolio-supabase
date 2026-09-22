"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import {
  IconPhoto,
  IconBrandFigma,
  IconExternalLink,
  IconCheck,
  IconUpload,
  IconLink,
  IconX,
  IconLoader2,
  IconTrash,
  IconEye,
} from "@tabler/icons-react";
import { toast } from "sonner";
import { type UIGallery } from "@/types/database";

export interface GalleryFormData {
  title: string;
  slug: string;
  category: string;
  description: string;
  image_url: string;
  tools: string;
  aspect_ratio: string;
  figma_url: string;
  preview_url: string;
  is_featured: boolean;
  order_index: number;
}

const CATEGORY_PRESETS = [
  "Web Dashboard",
  "Mobile App",
  "Landing Page",
  "Design System",
  "E-Commerce",
  "Component Craft",
];

const ASPECT_RATIO_OPTIONS = [
  { label: "16:10", desc: "Default Desktop / Shot", value: "16/10" },
  { label: "4:3", desc: "Standard Screen", value: "4/3" },
  { label: "1:1", desc: "Square Card", value: "1/1" },
  { label: "9:16", desc: "Mobile Viewport", value: "9/16" },
];

export default function GalleryForm({
  initialData,
  onSubmit,
  isSubmitting,
}: {
  initialData?: Partial<UIGallery>;
  onSubmit: (data: GalleryFormData) => Promise<void>;
  isSubmitting?: boolean;
}) {
  const [formData, setFormData] = useState<GalleryFormData>({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    category: initialData?.category || "Web Dashboard",
    description: initialData?.description || "",
    image_url: initialData?.image_url || "",
    tools: Array.isArray(initialData?.tools)
      ? initialData.tools.join(", ")
      : typeof initialData?.tools === "string"
      ? initialData.tools
      : "Figma, Tailwind CSS",
    aspect_ratio: initialData?.aspect_ratio || "16/10",
    figma_url: initialData?.figma_url || "",
    preview_url: initialData?.preview_url || "",
    is_featured: initialData?.is_featured ?? true,
    order_index: initialData?.order_index || 0,
  });

  const [isAutoSlug, setIsAutoSlug] = useState(!initialData?.slug);
  const [inputMode, setInputMode] = useState<"upload" | "url">(
    initialData?.image_url && !initialData.image_url.startsWith("/uploads/")
      ? "url"
      : "upload"
  );
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTitleChange = (title: string) => {
    setFormData((prev) => {
      const updated = { ...prev, title };
      if (isAutoSlug) {
        updated.slug = title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "");
      }
      return updated;
    });
  };

  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("File harus berupa gambar (PNG, JPG, WebP, SVG, atau GIF)");
      return;
    }

    setUploading(true);
    try {
      const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
      const filePath = `gallery/${Date.now()}_${cleanName}`;

      const fd = new FormData();
      fd.append("file", file);
      fd.append("path", filePath);

      const res = await fetch("/api/storage", {
        method: "POST",
        body: fd,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal mengunggah gambar");

      setFormData((prev) => ({ ...prev, image_url: data.publicUrl }));
      toast.success("Gambar berhasil diupload!");
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Gagal mengunggah file gambar";
      toast.error(errorMessage);
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image_url.trim()) {
      toast.error("Harap upload gambar atau masukkan image URL sebelum menyimpan.");
      return;
    }
    await onSubmit(formData);
  };

  const labelClass = "block text-sm font-semibold text-zinc-800 dark:text-zinc-200";
  const helperClass = "text-xs text-zinc-500 dark:text-zinc-400";
  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand text-sm transition-colors";
  const monoInputClass = `${inputClass} font-mono text-xs sm:text-sm`;

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl font-sans">
      {/* 1. Basic Metadata Section */}
      <div className="bg-white dark:bg-[#121215] rounded-3xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-zinc-100 dark:border-zinc-800/80">
          <div className="w-8 h-8 rounded-xl bg-brand/10 text-brand flex items-center justify-center font-mono font-bold text-xs">
            01
          </div>
          <div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-white">
              Informasi Desain & Shot
            </h3>
            <p className={helperClass}>
              Detail utama shot untuk ditampilkan di kartu galeri dan modal lightbox.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div className="space-y-2 md:col-span-2">
            <label htmlFor="gallery-title" className={labelClass}>
              Judul Desain / Shot <span className="text-brand">*</span>
            </label>
            <input
              id="gallery-title"
              name="title"
              type="text"
              required
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Contoh: Fintech Telemetry & Liquidity Dashboard"
              className={inputClass}
            />
          </div>

          {/* Slug */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="gallery-slug" className={labelClass}>
                Slug URL <span className="text-brand">*</span>
              </label>
              <button
                type="button"
                onClick={() => setIsAutoSlug(!isAutoSlug)}
                className="text-xs font-medium text-brand hover:underline"
              >
                {isAutoSlug ? "Ubah Manual" : "Generate Otomatis"}
              </button>
            </div>
            <input
              id="gallery-slug"
              name="slug"
              type="text"
              required
              value={formData.slug}
              onChange={(e) => {
                setIsAutoSlug(false);
                setFormData({ ...formData, slug: e.target.value });
              }}
              placeholder="fintech-telemetry-dashboard"
              className={monoInputClass}
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label htmlFor="gallery-category" className={labelClass}>
              Kategori <span className="text-brand">*</span>
            </label>
            <div className="space-y-2">
              <input
                id="gallery-category"
                name="category"
                type="text"
                required
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                placeholder="Web Dashboard / Mobile App / Landing Page"
                className={inputClass}
              />
              {/* Category Quick Presets */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {CATEGORY_PRESETS.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, category: preset })
                    }
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                      formData.category === preset
                        ? "bg-brand text-white font-semibold shadow-sm"
                        : "bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-400 hover:text-brand"
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Description (Micro-caption) */}
          <div className="space-y-2 md:col-span-2">
            <label htmlFor="gallery-description" className={labelClass}>
              Deskripsi Ringkas / Micro-Caption (1–2 Kalimat)
            </label>
            <textarea
              id="gallery-description"
              name="description"
              rows={3}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Jelaskan secara ringkas fokus visual, sistem antarmuka, atau problem eksplorasi UI ini..."
              className={`${inputClass} leading-relaxed resize-y`}
            />
          </div>

          {/* Tools */}
          <div className="space-y-2 md:col-span-2">
            <label htmlFor="gallery-tools" className={labelClass}>
              Alat & Desain Stack (Pisahkan dengan koma)
            </label>
            <input
              id="gallery-tools"
              name="tools"
              type="text"
              value={formData.tools}
              onChange={(e) =>
                setFormData({ ...formData, tools: e.target.value })
              }
              placeholder="Figma, AutoLayout, Tailwind CSS, Design Tokens"
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* 2. Visual Media & Upload Section */}
      <div className="bg-white dark:bg-[#121215] rounded-3xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-zinc-100 dark:border-zinc-800/80">
          <div className="w-8 h-8 rounded-xl bg-brand/10 text-brand flex items-center justify-center font-mono font-bold text-xs">
            02
          </div>
          <div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-white">
              Mockup Desain & Gambar Shot
            </h3>
            <p className={helperClass}>
              Upload file gambar shot langsung dari perangkat Anda atau gunakan URL gambar eksternal.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div className="space-y-5">
            {/* Upload Method Mode Switcher */}
            <div className="flex items-center gap-1.5 p-1 bg-zinc-100 dark:bg-zinc-900 rounded-xl border border-zinc-200/80 dark:border-zinc-800">
              <button
                type="button"
                onClick={() => setInputMode("upload")}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                  inputMode === "upload"
                    ? "bg-brand text-white shadow-sm"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                <IconUpload size={16} />
                <span>Upload File Langsung</span>
              </button>
              <button
                type="button"
                onClick={() => setInputMode("url")}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                  inputMode === "url"
                    ? "bg-brand text-white shadow-sm"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                <IconLink size={16} />
                <span>Input URL Eksternal</span>
              </button>
            </div>

            {/* Mode 1: Direct File Upload */}
            {inputMode === "upload" ? (
              <div className="space-y-3">
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(true);
                  }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center text-center transition-all ${
                    dragOver
                      ? "border-brand bg-brand/10 dark:bg-brand/10 scale-[1.01]"
                      : "border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 hover:border-brand/40"
                  }`}
                >
                  {uploading ? (
                    <div className="flex flex-col items-center gap-3 py-4">
                      <IconLoader2
                        size={32}
                        className="animate-spin text-brand"
                      />
                      <span className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-medium">
                        Mengunggah file ke server...
                      </span>
                    </div>
                  ) : (
                    <>
                      <div className="w-12 h-12 rounded-2xl bg-brand/10 text-brand flex items-center justify-center mb-3">
                        <IconUpload size={24} />
                      </div>
                      <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-1">
                        Tarik & lepaskan file gambar di sini
                      </p>
                      <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-4 max-w-xs">
                        Mendukung PNG, JPG, WebP, SVG, atau GIF hingga 15MB.
                      </p>

                      <label
                        htmlFor="gallery-file-input"
                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-zinc-900 hover:bg-black dark:bg-zinc-800 dark:hover:bg-zinc-700 text-white rounded-xl cursor-pointer transition-all text-xs font-semibold shadow-sm active:scale-95"
                      >
                        <IconPhoto size={16} />
                        <span>Pilih File Dari Perangkat</span>
                        <input
                          id="gallery-file-input"
                          name="file"
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          aria-label="Upload gambar mockup"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileUpload(file);
                          }}
                          className="hidden"
                          disabled={uploading}
                        />
                      </label>
                    </>
                  )}
                </div>

                {/* Uploaded File Status Bar */}
                {formData.image_url && (
                  <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-100 dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 text-xs">
                    <div className="flex items-center gap-2 truncate pr-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                      <span className="text-zinc-600 dark:text-zinc-400 font-mono truncate" title={formData.image_url}>
                        {formData.image_url}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, image_url: "" })
                      }
                      className="p-1.5 rounded-lg text-zinc-400 hover:text-red-500 hover:bg-red-500/10 transition-colors"
                      title="Hapus gambar"
                    >
                      <IconTrash size={15} />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Mode 2: External URL Input */
              <div className="space-y-3">
                <div className="space-y-2">
                  <label htmlFor="gallery-image-url" className={labelClass}>
                    Image URL (Resolusi Tinggi) <span className="text-brand">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="gallery-image-url"
                      name="image_url"
                      type="url"
                      value={formData.image_url}
                      onChange={(e) =>
                        setFormData({ ...formData, image_url: e.target.value })
                      }
                      placeholder="https://images.unsplash.com/... atau /uploads/..."
                      className={`${monoInputClass} pr-10`}
                    />
                    {formData.image_url && (
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, image_url: "" })
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-red-500"
                        title="Hapus URL"
                      >
                        <IconX size={16} />
                      </button>
                    )}
                  </div>
                  <p className={helperClass}>
                    Bisa menggunakan link dari Unsplash, Supabase, Cloudinary, atau CDN gambar lainnya.
                  </p>
                </div>
              </div>
            )}

            {/* Aspect Ratio Selector */}
            <div className="space-y-2.5 pt-2 border-t border-zinc-100 dark:border-zinc-800/80">
              <div className="flex items-center justify-between">
                <span className={labelClass}>
                  Rasio Aspek Mockup
                </span>
                <span className="text-xs font-mono font-bold text-brand bg-brand/10 px-2 py-0.5 rounded-md">
                  {formData.aspect_ratio}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {ASPECT_RATIO_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, aspect_ratio: opt.value })
                    }
                    className={`py-2.5 px-3 rounded-xl text-left transition-all border ${
                      formData.aspect_ratio === opt.value
                        ? "border-brand bg-brand/10 text-brand shadow-sm"
                        : "border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold font-mono">{opt.label}</span>
                      {formData.aspect_ratio === opt.value && (
                        <span className="w-1.5 h-1.5 rounded-full bg-brand" />
                      )}
                    </div>
                    <div className="text-[11px] text-zinc-400 mt-0.5 truncate">
                      {opt.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Live Preview Container with Dynamic Aspect Ratio */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 flex items-center gap-1.5">
                <IconEye size={15} />
                <span>Live Aspect Preview</span>
              </span>
              {formData.image_url && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-brand/10 text-brand font-bold">
                  {formData.aspect_ratio}
                </span>
              )}
            </div>

            <div
              style={{ aspectRatio: formData.aspect_ratio || "16/10" }}
              className="relative w-full rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-950 flex items-center justify-center transition-all duration-300 shadow-inner group"
            >
              {formData.image_url ? (
                <>
                  <Image
                    src={formData.image_url}
                    alt={formData.title || "Preview Shot"}
                    fill
                    unoptimized
                    sizes="600px"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-4">
                    <label
                      htmlFor="gallery-change-file-input"
                      className="px-3.5 py-2 bg-white text-zinc-900 text-xs font-semibold rounded-xl shadow-lg cursor-pointer hover:bg-zinc-100 transition-colors"
                    >
                      Ganti File
                      <input
                        id="gallery-change-file-input"
                        name="change_file"
                        type="file"
                        accept="image/*"
                        aria-label="Ganti gambar mockup"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload(file);
                        }}
                        className="hidden"
                        disabled={uploading}
                      />
                    </label>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center gap-2 text-zinc-400 p-6 text-center">
                  <IconPhoto size={40} className="opacity-30 text-brand" />
                  <span className="text-xs text-zinc-500 dark:text-zinc-400 max-w-xs leading-relaxed">
                    Unggah gambar atau masukkan URL untuk melihat preview rasio
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 3. External Links & Visibility Section */}
      <div className="bg-white dark:bg-[#121215] rounded-3xl p-6 sm:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-zinc-100 dark:border-zinc-800/80">
          <div className="w-8 h-8 rounded-xl bg-brand/10 text-brand flex items-center justify-center font-mono font-bold text-xs">
            03
          </div>
          <div>
            <h3 className="text-base font-bold text-zinc-900 dark:text-white">
              Tautan Eksternal & Visibilitas
            </h3>
            <p className={helperClass}>
              Tautan menuju file Figma atau live preview serta pengaturan urutan tampilan.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Figma URL */}
          <div className="space-y-2">
            <label htmlFor="gallery-figma-url" className={`${labelClass} flex items-center gap-1.5`}>
              <IconBrandFigma size={16} className="text-[#F24E1E]" />
              <span>Figma URL (Opsional)</span>
            </label>
            <input
              id="gallery-figma-url"
              name="figma_url"
              type="url"
              value={formData.figma_url}
              onChange={(e) =>
                setFormData({ ...formData, figma_url: e.target.value })
              }
              placeholder="https://figma.com/file/... atau https://figma.com/@username"
              className={monoInputClass}
            />
          </div>

          {/* Preview URL */}
          <div className="space-y-2">
            <label htmlFor="gallery-preview-url" className={`${labelClass} flex items-center gap-1.5`}>
              <IconExternalLink size={16} className="text-brand" />
              <span>Live Demo / Prototype URL (Opsional)</span>
            </label>
            <input
              id="gallery-preview-url"
              name="preview_url"
              type="url"
              value={formData.preview_url}
              onChange={(e) =>
                setFormData({ ...formData, preview_url: e.target.value })
              }
              placeholder="https://prototype.mydesign.com"
              className={monoInputClass}
            />
          </div>

          {/* Order Index */}
          <div className="space-y-2">
            <label htmlFor="gallery-order-index" className={labelClass}>
              Urutan Tampilan (Order Index)
            </label>
            <input
              id="gallery-order-index"
              name="order_index"
              type="number"
              value={formData.order_index}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  order_index: parseInt(e.target.value, 10) || 0,
                })
              }
              className={monoInputClass}
            />
            <p className={helperClass}>
              Angka lebih kecil akan tampil lebih awal di galeri publik.
            </p>
          </div>

          {/* Featured Toggle */}
          <div className="space-y-2 flex flex-col justify-end">
            <label htmlFor="gallery-is-featured" className="flex items-center gap-3 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 cursor-pointer">
              <input
                id="gallery-is-featured"
                name="is_featured"
                type="checkbox"
                checked={formData.is_featured}
                onChange={(e) =>
                  setFormData({ ...formData, is_featured: e.target.checked })
                }
                className="w-5 h-5 rounded text-brand focus:ring-brand accent-[#F0531C]"
              />
              <div>
                <span className="text-sm font-semibold text-zinc-900 dark:text-white block">
                  Tampilkan di Galeri Publik
                </span>
                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                  Jika tidak dicentang, shot ini akan disembunyikan dari pengunjung.
                </span>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Submit Action Bar */}
      <div className="flex items-center justify-end gap-4 pt-2">
        <button
          type="submit"
          disabled={isSubmitting || uploading}
          className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-brand hover:bg-brand-deep text-white font-semibold text-sm shadow-[0_12px_26px_-12px_#F0531C] active:scale-95 transition-all duration-200 disabled:opacity-50"
        >
          {isSubmitting ? (
            <IconLoader2 size={18} className="animate-spin" />
          ) : (
            <IconCheck size={18} stroke={2.5} />
          )}
          <span>{isSubmitting ? "Menyimpan..." : "Simpan Desain Shot"}</span>
        </button>
      </div>
    </form>
  );
}
