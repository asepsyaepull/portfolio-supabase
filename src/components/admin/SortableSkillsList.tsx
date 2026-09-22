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
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Link from "next/link";
import { IconPencil, IconGripVertical } from "@tabler/icons-react";
import DeleteSkillButton from "@/components/admin/DeleteSkillButton";
import { getSimpleIcon } from "@/lib/icon-mapper";
import { updateOrderIndex } from "@/app/admin/actions";
import { toast } from "sonner";
import { type Skill } from "@/types/database";

export default function SortableSkillsList({
  initialSkills,
}: {
  initialSkills: Skill[];
}) {
  const [skills, setSkills] = useState(initialSkills);
  const [isSaving, setIsSaving] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = skills.findIndex((s) => s.id === active.id);
      const newIndex = skills.findIndex((s) => s.id === over.id);

      const newSkills = arrayMove(skills, oldIndex, newIndex);

      const updatedSkills = newSkills.map((skill, index) => ({
        ...skill,
        order_index: index,
      }));

      setSkills(updatedSkills);

      setIsSaving(true);
      const payload = updatedSkills.map((s) => ({
        id: s.id,
        order_index: s.order_index || 0,
      }));
      const result = await updateOrderIndex("skills", payload);

      if (result?.error) {
        toast.error("Gagal menyimpan urutan baru");
      } else {
        toast.success("Urutan keahlian berhasil diperbarui");
      }
      setIsSaving(false);
    }
  };

  return (
    <div className="relative">
      {isSaving && (
        <div className="absolute -top-10 right-0 text-xs font-mono font-bold text-brand animate-pulse flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-brand" />
          <span>Menyimpan urutan...</span>
        </div>
      )}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={skills.map((s) => s.id)}
          strategy={rectSortingStrategy}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {skills.map((skill) => (
              <SortableSkillCard key={skill.id} skill={skill} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}

function SortableSkillCard({ skill }: { skill: Skill }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: skill.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : "auto",
    opacity: isDragging ? 0.8 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group bg-white dark:bg-[#121215] rounded-3xl border ${
        isDragging
          ? "border-brand shadow-xl scale-105"
          : "border-zinc-200 dark:border-zinc-800 hover:border-brand/40 hover:shadow-md"
      } p-5 flex items-center justify-between transition-all`}
    >
      <div className="flex items-center gap-3.5 min-w-0">
        <button
          {...attributes}
          {...listeners}
          className="text-zinc-300 hover:text-zinc-600 dark:text-zinc-700 dark:hover:text-zinc-400 cursor-grab active:cursor-grabbing touch-none shrink-0"
          title="Drag to reorder"
        >
          <IconGripVertical size={18} />
        </button>

        <div
          className={`p-2.5 bg-zinc-50 dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 shrink-0 ${skill.color_class}`}
        >
          {getSimpleIcon(skill.icon_name, "w-5 h-5")}
        </div>
        <div className="min-w-0">
          <h3 className="font-bold text-sm text-zinc-900 dark:text-white truncate">
            {skill.name}
          </h3>
        </div>
      </div>

      <div className="flex opacity-0 group-hover:opacity-100 transition-opacity items-center gap-1">
        <Link
          href={`/admin/skills/${skill.id}`}
          className="p-1.5 text-zinc-400 hover:text-brand hover:bg-brand/10 rounded-xl transition-colors"
          title="Edit"
        >
          <IconPencil size={16} />
        </Link>
        <DeleteSkillButton id={skill.id} name={skill.name} />
      </div>
    </div>
  );
}