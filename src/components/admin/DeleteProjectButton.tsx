"use client";

import { IconTrash, IconAlertTriangle, IconX } from "@tabler/icons-react";
import { deleteProject } from "@/app/admin/crud-actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function DeleteProjectButton({ id, name }: { id: string | number; name: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);
    const { error } = await deleteProject(id);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Project deleted successfully");
      setIsOpen(false);
      router.refresh();
    }
    setIsDeleting(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 dark:bg-red-950/30 dark:hover:bg-red-900/50 rounded-lg transition-colors"
        title="Delete"
      >
        <IconTrash size={18} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-900/40 dark:bg-black/60 backdrop-blur-sm">
          <div
            className="bg-white dark:bg-zinc-900 rounded-3xl p-6 md:p-8 w-full max-w-md shadow-2xl border border-zinc-200 dark:border-zinc-800 animate-in fade-in zoom-in-95 duration-200 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-500 rounded-2xl">
                  <IconAlertTriangle size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                    Hapus Project?
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                    Tindakan ini permanen.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
                disabled={isDeleting}
              >
                <IconX size={24} />
              </button>
            </div>

            <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-100 dark:border-zinc-800 mb-8">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Anda akan menghapus project: <br />
                <span className="font-bold text-zinc-900 dark:text-white mt-1 block">{name}</span>
              </p>
            </div>

            <div className="flex items-center gap-3 w-full">
              <button
                onClick={() => setIsOpen(false)}
                disabled={isDeleting}
                className="flex-1 py-3 px-4 rounded-xl font-bold text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors disabled:opacity-50"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 py-3 px-4 rounded-xl font-bold text-white bg-red-600 hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isDeleting ? (
                  "Menghapus..."
                ) : (
                  <>
                    <IconTrash size={18} />
                    Hapus
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
