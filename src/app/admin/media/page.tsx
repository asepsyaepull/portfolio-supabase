"use client";

import { useEffect, useState } from "react";
import { IconTrash, IconCopy, IconPhoto, IconUpload, IconSparkles } from "@tabler/icons-react";
import { toast } from "sonner";

type FileItem = { name: string; url: string; size: number; date: string };

export default function AdminMediaPage() {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/storage/list");
      const data = await res.json();
      setFiles(data.files || []);
    } catch {
      toast.error("Gagal memuat media");
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
      const fd = new FormData();
      fd.append("file", file);
      fd.append("path", `covers/${Date.now()}_${cleanName}`);
      const res = await fetch("/api/storage", { method: "POST", body: fd });
      if (!res.ok) throw new Error("Upload gagal");
      toast.success("File berhasil diupload!");
      fetchMedia();
    } catch (err: any) {
      toast.error(err.message || "Gagal mengunggah file");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success("URL disalin ke clipboard!");
  };

  const deleteFile = async (name: string) => {
    if (!confirm("Hapus file media ini?")) return;
    try {
      const res = await fetch("/api/storage", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paths: [name] }),
      });
      if (!res.ok) throw new Error("Gagal menghapus");
      toast.success("Gambar berhasil dihapus");
      setFiles((prev) => prev.filter((f) => f.name !== name));
    } catch {
      toast.error("Gagal menghapus gambar");
    }
  };

  return (
    <div className="flex flex-col gap-6 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 text-brand text-xs font-mono font-medium mb-1">
            <IconSparkles size={13} />
            <span>LOCAL ASSETS</span>
          </div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Media Library</h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Koleksi file gambar lokal untuk thumbnail proyek dan UI Gallery shots.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <label className="inline-flex items-center gap-2 bg-brand hover:bg-brand-light text-white px-4 py-2.5 rounded-xl text-sm font-semibold cursor-pointer transition-all shadow-md shadow-brand/20 active:scale-95">
            <IconUpload size={16} />
            <span>{uploading ? "Mengunggah..." : "Upload File"}</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleUpload}
              disabled={uploading}
            />
          </label>
          <span className="bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700/60 px-3 py-1.5 rounded-xl text-xs font-mono font-bold">
            {files.length} items
          </span>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {loading ? (
          <div className="col-span-full py-16 text-center text-zinc-500 animate-pulse text-sm">
            Memuat file media...
          </div>
        ) : files.length === 0 ? (
          <div className="col-span-full bg-white dark:bg-[#121215] rounded-3xl border border-zinc-200 dark:border-zinc-800 p-12 text-center flex flex-col items-center justify-center gap-3">
            <div className="h-16 w-16 bg-zinc-50 dark:bg-zinc-900 rounded-2xl flex items-center justify-center text-zinc-400 mb-1 border border-zinc-200 dark:border-zinc-800">
              <IconPhoto size={32} className="text-brand/50" />
            </div>
            <p className="text-zinc-900 dark:text-white font-bold text-sm">Belum ada file media</p>
            <p className="text-zinc-400 text-xs max-w-sm">
              Upload screenshot, thumbnail proyek, atau UI shot untuk digunakan di portofolio.
            </p>
          </div>
        ) : (
          files.map((file) => (
            <div
              key={file.name}
              className="group relative bg-white dark:bg-[#121215] rounded-2xl border border-zinc-200 dark:border-zinc-800/80 overflow-hidden flex flex-col shadow-sm hover:border-brand/40 transition-all"
            >
              <div className="relative aspect-video w-full bg-zinc-100 dark:bg-zinc-900">
                <img
                  src={file.url}
                  alt={file.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2 backdrop-blur-xs">
                  <button
                    onClick={() => copyToClipboard(file.url)}
                    className="p-2.5 bg-white/20 hover:bg-white text-white hover:text-black rounded-xl transition-all shadow-sm"
                    title="Copy URL"
                  >
                    <IconCopy size={16} />
                  </button>
                  <button
                    onClick={() => deleteFile(file.name)}
                    className="p-2.5 bg-red-500/80 hover:bg-red-500 text-white rounded-xl transition-all shadow-sm"
                    title="Hapus file"
                  >
                    <IconTrash size={16} />
                  </button>
                </div>
              </div>
              <div className="p-3 bg-zinc-50/50 dark:bg-zinc-900/40 border-t border-zinc-100 dark:border-zinc-800/60">
                <p
                  className="text-xs font-medium text-zinc-800 dark:text-zinc-200 truncate font-mono"
                  title={file.name}
                >
                  {file.name}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
