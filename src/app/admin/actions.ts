"use server";

import { from } from "@/lib/pg-client";

export async function updateOrderIndex(
  table: "projects" | "skills",
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
  return { error: null };
}
