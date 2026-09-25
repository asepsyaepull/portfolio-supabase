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
import Image from "next/image";
import {
  IconPencil,
  IconGripVertical,
  IconBrandFigma,
  IconExternalLink,
  IconEye,
} from "@tabler/icons-react";
import DeleteGalleryButton from "@/components/admin/DeleteGalleryButton";
import { updateOrderIndex } from "@/app/admin/actions";
import { toast } from "sonner";
import { type UIGallery } from "@/types/database";

export default function SortableGalleryList({
  initialGalleries,
}: {
  initialGalleries: UIGallery[];
}) {
  const router = useRouter();
  const [galleries, setGalleries] = useState(initialGalleries);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setGalleries(initialGalleries);
  }, [initialGalleries]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      return;
    }

    const oldIndex = galleries.findIndex((g) => g.id === active.id);
    const newIndex = galleries.findIndex((g) => g.id === over.id);

    if (oldIndex === -1 || newIndex === -1) {
      return;
    }

    const previousGalleries = galleries;
    const newGalleries = arrayMove(galleries, oldIndex, newIndex);

    const updatedGalleries = newGalleries.map((item, index) => ({
      ...item,
      order_index: index,
    }));

    setGalleries(updatedGalleries);
    setIsSaving(true);

    const payload = updatedGalleries.map((g) => ({
      id: g.id,
      order_index: g.order_index ?? 0,
    }));

    try {
      const result = await updateOrderIndex("ui_gallery", payload);

      if (result?.error) {
        setGalleries(previousGalleries);
        toast.error("Gagal menyimpan urutan baru galeri");
      } else {
        toast.success("Urutan desain galeri diperbarui");
        router.refresh();
      }
    } catch {
      setGalleries(previousGalleries);
      toast.error("Terjadi kesalahan saat menyimpan urutan galeri");
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
      <div className="grid grid-cols-12 gap-4 px-6 py-3.5 border-b border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/70 dark:bg-zinc-950/40 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
        <div className="col-span-6 md:col-span-5 flex items-center gap-2">
          <div className="w-5" />
          Preview & Title
        </div>
        <div className="col-span-3 hidden md:block">Category & Ratio</div>
        <div className="col-span-3 md:col-span-2 text-center">Featured</div>
        <div className="col-span-3 md:col-span-2 text-right">Actions</div>
      </div>

      {/* Sortable List */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={galleries.map((g) => g.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
            {galleries.map((item) => (
              <SortableGalleryRow key={item.id} item={item} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}

function SortableGalleryRow({ item }: { item: UIGallery }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`grid grid-cols-12 gap-4 px-6 py-4 items-center transition-colors ${
        isDragging
          ? "bg-zinc-100 dark:bg-zinc-800/80 shadow-xl opacity-90 relative"
          : "hover:bg-zinc-50/60 dark:hover:bg-zinc-900/40"
      }`}
    >
      {/* Col 1: Drag Grip + Thumbnail + Title */}
      <div className="col-span-6 md:col-span-5 flex items-center gap-3 min-w-0">
        <button
          type="button"
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 p-1.5 rounded-md touch-none shrink-0 transition-colors focus:outline-none"
          title="Drag untuk mengubah urutan"
          aria-label={`Reorder ${item.title}`}
        >
          <IconGripVertical size={18} />
        </button>

        {/* Thumbnail Preview */}
        <div className="relative w-14 h-10 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 flex-shrink-0">
          <Image
            src={item.image_url}
            alt={item.title}
            fill
            sizes="80px"
            className="object-cover object-top"
          />
        </div>

        <div className="min-w-0">
          <Link
            href={`/admin/gallery/${item.id}`}
            className="font-bold text-zinc-900 dark:text-white hover:text-brand transition-colors truncate block text-sm"
          >
            {item.title}
          </Link>
          <div className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500 truncate mt-0.5">
            /{item.slug}
          </div>
        </div>
      </div>

      {/* Col 2: Category & Aspect Ratio */}
      <div className="col-span-3 hidden md:flex items-center gap-2 flex-wrap">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
          {item.category}
        </span>
        {item.aspect_ratio && (
          <span className="text-[10px] font-mono text-zinc-400 bg-zinc-50 dark:bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-200 dark:border-zinc-800">
            {item.aspect_ratio}
          </span>
        )}
      </div>

      {/* Col 3: Featured status */}
      <div className="col-span-3 md:col-span-2 flex justify-center">
        {item.is_featured !== false ? (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-brand/10 text-brand border border-brand/20">
            <span className="w-1.5 h-1.5 rounded-full bg-brand" />
            Active
          </span>
        ) : (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
            Hidden
          </span>
        )}
      </div>

      {/* Col 4: Action Buttons */}
      <div className="col-span-3 md:col-span-2 flex items-center justify-end gap-1.5">
        {item.figma_url && (
          <a
            href={item.figma_url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-zinc-400 hover:text-[#F24E1E] hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-colors"
            title="Buka Figma"
          >
            <IconBrandFigma size={17} />
          </a>
        )}

        {item.preview_url && (
          <a
            href={item.preview_url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-zinc-400 hover:text-brand hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl transition-colors"
            title="Buka Live Preview"
          >
            <IconExternalLink size={17} />
          </a>
        )}

        <Link
          href={`/admin/gallery/${item.id}`}
          className="p-2 text-zinc-600 dark:text-zinc-300 hover:text-brand hover:bg-brand/10 rounded-xl transition-colors"
          title="Edit Shot"
        >
          <IconPencil size={17} />
        </Link>

        <DeleteGalleryButton id={item.id} title={item.title} />
      </div>
    </div>
  );
}
