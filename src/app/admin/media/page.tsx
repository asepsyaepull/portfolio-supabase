"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { IconTrash, IconCopy, IconPhoto } from "@tabler/icons-react";
import { toast } from "sonner";
import Image from "next/image";

interface FileObject {
  name: string;
  id: string | null;
  updated_at: string | null;
  created_at: string | null;
  last_accessed_at: string | null;
  metadata: {
    size: number;
    mimetype: string;
  } | null;
  url?: string;
}

export default function AdminMediaPage() {
  const [files, setFiles] = useState<FileObject[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    setLoading(true);
    try {
      const { data: listData, error: listError } = await supabase.storage
        .from("portfolio-assets")
        .list("covers", {
          limit: 100,
          offset: 0,
          sortBy: { column: "created_at", order: "desc" },
        });

      if (listError) throw listError;

      // Filter out empty placeholders (e.g. '.emptyFolderPlaceholder')
      const validFiles = listData?.filter((file) => file.name !== ".emptyFolderPlaceholder") || [];

      // Get Public URLs
      const filesWithUrl = validFiles.map((file) => {
        const { data } = supabase.storage
          .from("portfolio-assets")
          .getPublicUrl(`covers/${file.name}`);
        return { ...file, url: data.publicUrl };
      });

      setFiles(filesWithUrl);
    } catch (err: any) {
      toast.error(err.message || "Gagal memuat media");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success("URL disalin ke clipboard!");
  };

  const deleteFile = async (name: string) => {
    if (!confirm("Hapus gambar ini? Gambar yang sedang dipakai di project akan rusak (404).")) return;

    try {
      const { error } = await supabase.storage.from("portfolio-assets").remove([`covers/${name}`]);
      if (error) throw error;

      toast.success("Gambar berhasil dihapus");
      setFiles(files.filter((f) => f.name !== name));
    } catch (err: any) {
      toast.error(err.message || "Gagal menghapus gambar");
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="flex flex-col gap-6 pb-20">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Media Library</h1>
        <span className="bg-lime-100 text-lime-700 dark:bg-lime-900/30 dark:text-lime-500 px-3 py-1 rounded-full text-sm font-bold">
          {files.length} items
        </span>
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
            <div
              key={file.id}
              className="group relative bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden flex flex-col"
            >
              <div className="relative aspect-video w-full bg-zinc-100 dark:bg-zinc-800">
                {file.url && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={file.url}
                    alt={file.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                )}

                {/* Hover Actions Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button
                    onClick={() => file.url && copyToClipboard(file.url)}
                    className="p-2 bg-white/20 hover:bg-white/40 text-white rounded-lg backdrop-blur-sm transition-colors"
                    title="Copy URL"
                  >
                    <IconCopy size={20} />
                  </button>
                  <button
                    onClick={() => deleteFile(file.name)}
                    className="p-2 bg-red-500/80 hover:bg-red-600 text-white rounded-lg backdrop-blur-sm transition-colors"
                    title="Delete File"
                  >
                    <IconTrash size={20} />
                  </button>
                </div>
              </div>

              <div className="p-3 flex flex-col gap-1">
                <p className="text-xs font-medium text-zinc-900 dark:text-white truncate" title={file.name}>
                  {file.name}
                </p>
                <div className="flex items-center justify-between text-[10px] text-zinc-500">
                  <span>{formatSize(file.metadata?.size || 0)}</span>
                  <span>{file.created_at ? new Date(file.created_at).toLocaleDateString() : "-"}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}