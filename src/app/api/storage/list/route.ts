import { NextResponse } from "next/server";
import { readdir, stat } from "fs/promises";
import { join } from "path";

const BASE_UPLOAD_DIR = join(process.cwd(), "public", "uploads");

export async function GET() {
  try {
    const folders = ["covers", "gallery"];
    const allItems: { name: string; url: string; size: number; date: string }[] = [];

    for (const folder of folders) {
      const folderPath = join(BASE_UPLOAD_DIR, folder);
      try {
        const files = await readdir(folderPath);
        for (const name of files) {
          if (name.startsWith(".")) continue;
          const s = await stat(join(folderPath, name)).catch(() => null);
          allItems.push({
            name: `${folder}/${name}`,
            url: `/uploads/${folder}/${name}`,
            size: s?.size || 0,
            date: s?.mtime?.toISOString() || "",
          });
        }
      } catch {
        // Folder might not exist yet
      }
    }

    // Sort newest first
    allItems.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return NextResponse.json({ files: allItems });
  } catch {
    return NextResponse.json({ files: [] });
  }
}

