import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { createClient as createSupabaseJsClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    'Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY env vars'
  )
}

/**
 * Client tanpa cookies untuk data PUBLIK yang bisa di-cache (ISR/SSG).
 * Aman dipakai di Server Component — TIDAK membuat route jadi dinamis.
 * JANGAN dipakai untuk fitur yang butuh session/auth.
 */
export function getStaticClient() {
  return createSupabaseJsClient(
    supabaseUrl as string,
    supabaseKey as string,
    {
      auth: { persistSession: false },
    }
  )
}

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    supabaseUrl as string,
    supabaseKey as string,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet: any[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}
