import { NextResponse } from "next/server";
import pool from "@/lib/db";
import bcrypt from "bcryptjs";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ error: "Email & password required" }, { status: 400 });
    }

    const result = await pool.query(
      "SELECT id, email, password_hash FROM admin_users WHERE email = $1",
      [email]
    );
    const user = result.rows[0];
    if (!user) {
      return NextResponse.json({ error: "Email atau password salah" }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return NextResponse.json({ error: "Email atau password salah" }, { status: 401 });
    }

    // Create session token
    const token = crypto.randomBytes(32).toString("hex");
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    await pool.query(
      "INSERT INTO sessions (user_id, token_hash, expires_at) VALUES ($1, $2, $3)",
      [user.id, tokenHash, expiresAt.toISOString()]
    );

    const res = NextResponse.json({ user: { id: user.id, email: user.email } });
    res.cookies.set("session_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 60 * 60,
    });
    return res;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
