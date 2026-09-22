"use client";

import { IconTrash, IconAlertTriangle, IconX } from "@tabler/icons-react";
import { deleteUIGallery } from "@/app/admin/crud-actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function DeleteGalleryButton({
  id,
  title,
}: {
  id: string | number;
  title: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);
    const { error } = await deleteUIGallery(id);

    if (error) {
      toast.error(error.message || "Failed to delete design shot");
    } else {
      toast.success("Desain berhasil dihapus dari galeri!");
      setIsOpen(false);
      router.refresh();
    }
    setIsDeleting(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 text-rose-500 hover:text-rose-600 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/30 dark:hover:bg-rose-900/50 rounded-xl transition-colors"
        title="Hapus Desain"
      >
        <IconTrash size={17} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-900/50 dark:bg-black/75 backdrop-blur-sm">
          <div
            className="bg-white dark:bg-[#121215] rounded-3xl p-6 md:p-8 w-full max-w-md shadow-2xl border border-zinc-200 dark:border-zinc-800 animate-in fade-in zoom-in-95 duration-200 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-rose-100 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 rounded-2xl">
                  <IconAlertTriangle size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                    Hapus Desain UI?
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                    Tindakan ini tidak dapat dibatalkan.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
              >
                <IconX size={20} />
              </button>
            </div>

            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6 bg-zinc-50 dark:bg-zinc-900/60 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800/80">
              Apakah Anda yakin ingin menghapus shot{" "}
              <strong className="text-zinc-900 dark:text-white font-bold block mt-1 truncate">
                &ldquo;{title}&rdquo;
              </strong>{" "}
              dari UI Gallery?
            </p>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setIsOpen(false)}
                disabled={isDeleting}
                className="px-5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-sm font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-sm font-bold shadow-lg shadow-rose-600/20 active:scale-95 transition-all disabled:opacity-50"
              >
                {isDeleting ? "Menghapus..." : "Hapus Desain"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
