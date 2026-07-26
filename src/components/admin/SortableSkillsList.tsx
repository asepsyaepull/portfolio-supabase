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

export default function SortableSkillsList({ initialSkills }: { initialSkills: Skill[] }) {
  const [skills, setSkills] = useState(initialSkills);
  const [isSaving, setIsSaving] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Require 8px movement before drag starts
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

      // Update order_index in state
      const updatedSkills = newSkills.map((skill, index) => ({
        ...skill,
        order_index: index,
      }));

      setSkills(updatedSkills);

      // Save to DB
      setIsSaving(true);
      const payload = updatedSkills.map((s) => ({ id: s.id, order_index: s.order_index || 0 }));
      const result = await updateOrderIndex("skills", payload);

      if (result.error) toast.error("Gagal menyimpan urutan baru");
      setIsSaving(false);
    }
  };

  return (
    <div className="relative">
      {isSaving && (
        <div className="absolute -top-10 right-0 text-xs font-bold text-lime-600 animate-pulse">
          Menyimpan urutan...
        </div>
      )}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={skills.map(s => s.id)} strategy={rectSortingStrategy}>
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
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
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
      className={`group bg-white dark:bg-zinc-900 rounded-2xl border ${
        isDragging ? "border-lime-500 shadow-xl scale-105" : "border-zinc-200 dark:border-zinc-800 hover:shadow-md"
      } p-5 flex items-center justify-between transition-all`}
    >
      <div className="flex items-center gap-4">
        {/* Drag Handle */}
        <button
          {...attributes}
          {...listeners}
          className="text-zinc-300 hover:text-zinc-500 dark:text-zinc-700 dark:hover:text-zinc-500 cursor-grab active:cursor-grabbing touch-none"
          title="Drag to reorder"
        >
          <IconGripVertical size={20} />
        </button>

        <div className={`p-3 bg-zinc-50 dark:bg-zinc-800 rounded-xl ${skill.color_class}`}>
          {getSimpleIcon(skill.icon_name, "w-6 h-6")}
        </div>
        <div>
          <h3 className="font-bold text-zinc-900 dark:text-white">{skill.name}</h3>
        </div>
      </div>

      <div className="flex opacity-0 group-hover:opacity-100 transition-opacity flex-col gap-1">
        <Link
          href={`/admin/skills/${skill.id}`}
          className="p-1.5 text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
          title="Edit"
        >
          <IconPencil size={16} />
        </Link>
        <DeleteSkillButton id={skill.id} name={skill.name} />
      </div>
    </div>
  );
}