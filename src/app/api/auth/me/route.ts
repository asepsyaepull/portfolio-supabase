import { NextResponse } from "next/server";
import pool from "@/lib/db";
import crypto from "crypto";

export async function GET(req: Request) {
  try {
    const cookie = req.headers.get("cookie") || "";
    const match = cookie.match(/session_token=([^;]+)/);
    if (!match) return NextResponse.json({ user: null });

    const token = match[1];
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

    const result = await pool.query(
      `SELECT u.id, u.email FROM sessions s
       JOIN admin_users u ON s.user_id = u.id
       WHERE s.token_hash = $1 AND s.expires_at > now()`,
      [tokenHash]
    );

    return NextResponse.json({ user: result.rows[0] || null });
  } catch {
    return NextResponse.json({ user: null });
  }
}
