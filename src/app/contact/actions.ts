"use server";

import { createClient } from "@/lib/supabase/server";

export async function submitContactForm(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !subject || !message) {
    return { error: "Semua kolom wajib diisi!" };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("contacts").insert([
    {
      name,
      email,
      subject,
      message,
    },
  ]);

  if (error) {
    console.error("Error inserting contact:", error);
    return { error: "Gagal mengirim pesan, silakan coba lagi." };
  }

  return { success: true };
}
