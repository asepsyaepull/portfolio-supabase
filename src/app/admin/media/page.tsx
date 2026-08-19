"use client";

import { useEffect, useState } from "react";
import { IconTrash, IconCopy, IconPhoto } from "@tabler/icons-react";
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
      const fd = new FormData();
      fd.append("file", file);
      fd.append("path", `covers/${Date.now()}_${file.name}`);
      const res = await fetch("/api/storage", { method: "POST", body: fd });
      if (!res.ok) throw new Error("Upload gagal");
      toast.success("File berhasil diupload");
      fetchMedia();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setUploading(false);
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success("URL disalin ke clipboard!");
  };

  const deleteFile = async (name: string) => {
    if (!confirm("Hapus gambar ini?")) return;
    try {
      await fetch("/api/storage", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paths: [`covers/${name}`] }),
      });
      toast.success("Gambar berhasil dihapus");
      setFiles(files.filter((f) => f.name !== name));
    } catch {
      toast.error("Gagal menghapus gambar");
    }
  };

  return (
    <div className="flex flex-col gap-6 pb-20">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Media Library</h1>
        <div className="flex items-center gap-3">
          <label className="bg-lime-600 hover:bg-lime-700 text-white px-4 py-2 rounded-xl text-sm font-bold cursor-pointer transition-colors">
            {uploading ? "Uploading..." : "Upload File"}
            <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
          </label>
          <span className="bg-lime-100 text-lime-700 dark:bg-lime-900/30 dark:text-lime-500 px-3 py-1 rounded-full text-sm font-bold">
            {files.length} items
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {loading ? (
          <div className="col-span-full py-12 text-center text-zinc-500 animate-pulse">
            Memuat file media...
          </div>
        ) : files.length === 0 ? (
          <div className="col-span-full bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-12 text-center flex flex-col items-center justify-center gap-3">
            <div className="h-16 w-16 bg-zinc-50 dark:bg-zinc-800 rounded-full flex items-center justify-center text-zinc-400 mb-2">
              <IconPhoto size={32} />
            </div>
            <p className="text-zinc-500 dark:text-zinc-400 font-medium">Belum ada file media</p>
          </div>
        ) : (
          files.map((file) => (
            <div key={file.name} className="group relative bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden flex flex-col">
              <div className="relative aspect-video w-full bg-zinc-100 dark:bg-zinc-800">
                <img src={file.url} alt={file.name} className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button onClick={() => copyToClipboard(file.url)} className="p-2 bg-white/20 hover:bg-white/40 text-white rounded-lg" title="Copy URL">
                    <IconCopy size={20} />
                  </button>
                  <button onClick={() => deleteFile(file.name)} className="p-2 bg-red-500/80 hover:bg-red-600 text-white rounded-lg" title="Delete">
                    <IconTrash size={20} />
                  </button>
                </div>
              </div>
              <div className="p-3">
                <p className="text-xs font-medium text-zinc-900 dark:text-white truncate" title={file.name}>{file.name}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
