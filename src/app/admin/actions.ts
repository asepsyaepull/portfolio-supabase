"use server";

import { createClient } from "@/lib/supabase/server";

export async function updateOrderIndex(table: "projects" | "skills", items: { id: number | string; order_index: number }[]) {
  const supabase = await createClient();

  // Supabase doesn't have bulk update natively via JS client,
  // so we update one by one. For small lists (10-50 items), this is fine.
  for (const item of items) {
    const { error } = await supabase
      .from(table)
      .update({ order_index: item.order_index })
      .eq("id", item.id);

    if (error) {
      console.error(`Error updating order for ${table} id ${item.id}:`, error);
      return { error: error.message };
    }
  }

  return { success: true };
}