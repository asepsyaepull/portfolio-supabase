"use client";

import { useState } from "react";
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

export default function SortableProjectsList({ initialProjects }: { initialProjects: Project[] }) {
  const [projects, setProjects] = useState(initialProjects);
  const [isSaving, setIsSaving] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = projects.findIndex((p) => p.id === active.id);
      const newIndex = projects.findIndex((p) => p.id === over.id);

      const newProjects = arrayMove(projects, oldIndex, newIndex);

      const updatedProjects = newProjects.map((project, index) => ({
        ...project,
        order_index: index,
      }));

      setProjects(updatedProjects);

      setIsSaving(true);
      const payload = updatedProjects.map((p) => ({ id: p.id, order_index: p.order_index || 0 }));
      const result = await updateOrderIndex("projects", payload);

      if (result.error) toast.error("Gagal menyimpan urutan baru");
      setIsSaving(false);
    }
  };

  return (
    <div className="relative bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
      {isSaving && (
        <div className="absolute top-4 right-6 text-xs font-bold text-lime-600 animate-pulse z-10">
          Menyimpan urutan...
        </div>
      )}

      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/50 text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-bold">
        <div className="col-span-6 md:col-span-5 flex items-center gap-2">
          <div className="w-5"></div> {/* Handle space */}
          Name
        </div>
        <div className="col-span-3 hidden md:block">Category</div>
        <div className="col-span-3 md:col-span-2 text-center">Featured</div>
        <div className="col-span-3 md:col-span-2 text-right">Actions</div>
      </div>

      {/* Table Body (Sortable) */}
      <div className="flex flex-col divide-y divide-zinc-200 dark:divide-zinc-800">
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={projects.map(p => p.id)} strategy={verticalListSortingStrategy}>
            {projects.map((project: any) => (
              <SortableProjectRow key={project.id} project={project} />
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}

function SortableProjectRow({ project }: { project: Project }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: project.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : "auto",
    opacity: isDragging ? 0.9 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`grid grid-cols-12 gap-4 px-6 py-4 text-sm transition-colors bg-white dark:bg-zinc-900 ${
        isDragging ? "shadow-lg border-y border-lime-500" : "hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
      }`}
    >
      <div className="col-span-6 md:col-span-5 flex items-center gap-3">
        <button
          {...attributes}
          {...listeners}
          className="text-zinc-300 hover:text-zinc-500 dark:text-zinc-700 dark:hover:text-zinc-500 cursor-grab active:cursor-grabbing touch-none shrink-0"
          title="Drag up or down to reorder"
        >
          <IconGripVertical size={20} />
        </button>
        <div className="min-w-0">
          <div className="font-medium text-zinc-900 dark:text-white truncate">{project.name}</div>
          <div className="text-xs text-zinc-500 font-normal mt-0.5 truncate">{project.slug}</div>
        </div>
      </div>

      <div className="col-span-3 hidden md:flex items-center text-zinc-600 dark:text-zinc-400">
        {project.category}
      </div>

      <div className="col-span-3 md:col-span-2 flex items-center justify-center">
        {project.is_featured ? (
          <span className="inline-flex px-2 py-1 rounded-md bg-lime-100 text-lime-700 dark:bg-lime-900/30 dark:text-lime-500 text-xs font-bold">Yes</span>
        ) : (
          <span className="text-zinc-400">-</span>
        )}
      </div>

      <div className="col-span-3 md:col-span-2 flex items-center justify-end gap-2">
        <Link
          href={`/admin/projects/${project.id}`}
          className="p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 rounded-lg transition-colors"
          title="Edit"
        >
          <IconPencil size={18} />
        </Link>
        <DeleteProjectButton id={project.id} name={project.name} />
      </div>
    </div>
  );
}