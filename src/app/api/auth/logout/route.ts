import { NextResponse } from "next/server";
import pool from "@/lib/db";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const cookie = req.headers.get("cookie") || "";
    const match = cookie.match(/session_token=([^;]+)/);
    if (match) {
      const tokenHash = crypto.createHash("sha256").update(match[1]).digest("hex");
      await pool.query("DELETE FROM sessions WHERE token_hash = $1", [tokenHash]);
    }
    const res = NextResponse.json({ ok: true });
    res.cookies.set("session_token", "", { maxAge: 0, path: "/" });
    return res;
  } catch {
    return NextResponse.json({ ok: true });
  }
}
