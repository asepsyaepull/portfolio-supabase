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
