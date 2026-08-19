import { NextResponse } from "next/server";
import { readdir, stat } from "fs/promises";
import { join } from "path";

const UPLOAD_DIR = join(process.cwd(), "public", "uploads", "covers");

export async function GET() {
  try {
    let files: string[];
    try {
      files = await readdir(UPLOAD_DIR);
    } catch {
      return NextResponse.json({ files: [] });
    }

    const items = await Promise.all(
      files
        .filter((f) => !f.startsWith("."))
        .map(async (name) => {
          const s = await stat(join(UPLOAD_DIR, name)).catch(() => null);
          return {
            name,
            url: `/uploads/covers/${name}`,
            size: s?.size || 0,
            date: s?.mtime?.toISOString() || "",
          };
        })
    );

    return NextResponse.json({ files: items });
  } catch {
    return NextResponse.json({ files: [] });
  }
}
