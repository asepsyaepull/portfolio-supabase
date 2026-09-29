"use server";

import { from } from "@/lib/pg-client";
import { revalidatePath } from "next/cache";

export async function updateOrderIndex(
  table: "projects" | "skills" | "ui_gallery",
  items: { id: number | string; order_index: number }[]
) {
  for (const item of items) {
    const { error } = await from(table)
      .update({ order_index: item.order_index })
      .eq("id", item.id);
    if (error) {
      return { error: String(error) };
    }
  }

  if (table === "projects") {
    revalidatePath("/admin/projects");
    revalidatePath("/projects");
    revalidatePath("/");
  } else if (table === "skills") {
    revalidatePath("/admin/skills");
    revalidatePath("/");
  } else if (table === "ui_gallery") {
    revalidatePath("/admin/gallery");
    revalidatePath("/projects");
    revalidatePath("/");
  }

  return { error: null };
}

export async function toggleProjectFeatured(
  id: string | number,
  is_featured: boolean
) {
  try {
    const { error } = await from("projects")
      .update({ is_featured })
      .eq("id", id);

    if (error) {
      return { error: String(error) };
    }

    revalidatePath("/admin/projects");
    revalidatePath("/admin");
    revalidatePath("/projects");
    revalidatePath("/");
    return { error: null, is_featured };
  } catch (err: any) {
    return { error: err.message || "Failed to update project featured status" };
  }
}

export async function toggleProjectActive(
  id: string | number,
  is_active: boolean
) {
  try {
    const { error } = await from("projects")
      .update({ is_active })
      .eq("id", id);

    if (error) {
      return { error: String(error) };
    }

    revalidatePath("/admin/projects");
    revalidatePath("/admin");
    revalidatePath("/projects");
    revalidatePath("/");
    return { error: null, is_active };
  } catch (err: any) {
    return { error: err.message || "Failed to update project active status" };
  }
}

export async function toggleGalleryFeatured(
  id: string | number,
  is_featured: boolean
) {
  try {
    const { error } = await from("ui_gallery")
      .update({ is_featured })
      .eq("id", id);

    if (error) {
      return { error: String(error) };
    }

    revalidatePath("/admin/gallery");
    revalidatePath("/admin");
    revalidatePath("/projects");
    revalidatePath("/");
    return { error: null, is_featured };
  } catch (err: any) {
    return { error: err.message || "Failed to update gallery featured status" };
  }
}
