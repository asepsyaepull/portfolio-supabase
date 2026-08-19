import { from } from "@/lib/pg-client";

/**
 * Static client untuk data PUBLIK (ISR/SSG).
 * TIDAK membuat route jadi dinamis.
 */
export function getStaticClient() {
  return { from };
}

/**
 * Client dengan session check untuk fitur auth/admin.
 */
export async function createClient() {
  return { from };
}
