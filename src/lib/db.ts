import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  if (process.env.NODE_ENV !== "production") {
    console.warn("⚠️ Peringatan: NEXT_PUBLIC_SUPABASE_URL atau NEXT_PUBLIC_SUPABASE_ANON_KEY belum dikonfigurasi di .env.local");
  }
}

// Fallback is still provided to prevent immediate crash, but the warning will notify the developer.
const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseKey || 'placeholder'
);

export default supabase;