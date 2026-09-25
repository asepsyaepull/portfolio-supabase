"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Link from "next/link";
import { IconPencil, IconGripVertical } from "@tabler/icons-react";
import DeleteProjectButton from "@/components/admin/DeleteProjectButton";
import { updateOrderIndex } from "@/app/admin/actions";
import { toast } from "sonner";
import { type Project } from "@/types/database";

export default function SortableProjectsList({
  initialProjects,
}: {
  initialProjects: Project[];
}) {
  const router = useRouter();
  const [projects, setProjects] = useState(initialProjects);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setProjects(initialProjects);
  }, [initialProjects]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = projects.findIndex((p) => p.id === active.id);
    const newIndex = projects.findIndex((p) => p.id === over.id);

    if (oldIndex === -1 || newIndex === -1) {
      return;
    }

    const previousProjects = projects;
    const newProjects = arrayMove(projects, oldIndex, newIndex);

    const updatedProjects = newProjects.map((project, index) => ({
      ...project,
      order_index: index,
    }));

    setProjects(updatedProjects);
    setIsSaving(true);

    const payload = updatedProjects.map((p) => ({
      id: p.id,
      order_index: p.order_index ?? 0,
    }));

    try {
      const result = await updateOrderIndex("projects", payload);

      if (result?.error) {
        setProjects(previousProjects);
        toast.error("Gagal menyimpan urutan baru proyek");
      } else {
        toast.success("Urutan proyek berhasil diperbarui");
        router.refresh();
      }
    } catch {
      setProjects(previousProjects);
      toast.error("Terjadi kesalahan saat menyimpan urutan proyek");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="relative bg-white dark:bg-[#121215] rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden">
      {isSaving && (
        <div className="absolute top-4 right-6 text-xs font-mono font-bold text-brand animate-pulse z-10 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-brand" />
          <span>Menyimpan urutan...</span>
        </div>
      )}

      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/70 dark:bg-zinc-950/40 text-[11px] font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-bold">
        <div className="col-span-6 md:col-span-5 flex items-center gap-2">
          <div className="w-5" />
          Project Name
        </div>
        <div className="col-span-3 hidden md:block">Category</div>
        <div className="col-span-3 md:col-span-2 text-center">Featured</div>
        <div className="col-span-3 md:col-span-2 text-right">Actions</div>
      </div>

      {/* Table Body (Sortable) */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={projects.map((p) => p.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
            {projects.map((project: any) => (
              <SortableProjectRow key={project.id} project={project} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}

function SortableProjectRow({ project }: { project: Project }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: project.id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`grid grid-cols-12 gap-4 px-6 py-4 text-sm items-center transition-colors ${
        isDragging
          ? "bg-zinc-100 dark:bg-zinc-800/80 shadow-xl opacity-90 relative"
          : "hover:bg-zinc-50/60 dark:hover:bg-zinc-900/40"
      }`}
    >
      <div className="col-span-6 md:col-span-5 flex items-center gap-3 min-w-0">
        <button
          type="button"
          {...attributes}
          {...listeners}
          className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 p-1.5 rounded-md cursor-grab active:cursor-grabbing touch-none shrink-0 transition-colors focus:outline-none"
          title="Drag up or down to reorder"
          aria-label={`Reorder ${project.name}`}
        >
          <IconGripVertical size={18} />
        </button>
        <div className="min-w-0">
          <div className="font-bold text-zinc-900 dark:text-white truncate text-sm">
            {project.name}
          </div>
          <div className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500 truncate mt-0.5">
            /{project.slug}
          </div>
        </div>
      </div>

      <div className="col-span-3 hidden md:flex items-center">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
          {project.category}
        </span>
      </div>

      <div className="col-span-3 md:col-span-2 flex items-center justify-center">
        {project.is_featured ? (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand/10 text-brand border border-brand/20 text-xs font-mono font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-brand" />
            Yes
          </span>
        ) : (
          <span className="text-zinc-400 font-mono text-xs">-</span>
        )}
      </div>

      <div className="col-span-3 md:col-span-2 flex items-center justify-end gap-1.5">
        <Link
          href={`/admin/projects/${project.id}`}
          className="p-2 text-zinc-600 dark:text-zinc-300 hover:text-brand hover:bg-brand/10 rounded-xl transition-colors"
          title="Edit Proyek"
        >
          <IconPencil size={17} />
        </Link>
        <DeleteProjectButton id={project.id} name={project.name} />
      </div>
    </div>
  );
}