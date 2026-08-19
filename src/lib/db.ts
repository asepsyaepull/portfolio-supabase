import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 5,
  idleTimeoutMillis: 30000,
});

export default pool;

export async function query<T = any>(
  text: string,
  params?: any[]
): Promise<{ data: T[] | null; error: any }> {
  try {
    const result = await pool.query(text, params);
    return { data: result.rows as T[], error: null };
  } catch (error) {
    console.error("PG query error:", error);
    return { data: null, error };
  }
}

export async function queryOne<T = any>(
  text: string,
  params?: any[]
): Promise<{ data: T | null; error: any }> {
  const { data, error } = await query<T>(text, params);
  return { data: data?.[0] ?? null, error };
}
