import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir, unlink, readdir } from "fs/promises";
import { join } from "path";

const UPLOAD_DIR = join(process.cwd(), "public", "uploads");

async function ensureDir(dir: string) {
  await mkdir(dir, { recursive: true });
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const path = formData.get("path") as string;

    if (!file || !path) {
      return NextResponse.json({ error: "file & path required" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fullPath = join(UPLOAD_DIR, path);
    await ensureDir(join(fullPath, ".."));
    await writeFile(fullPath, buffer);

    const publicUrl = `/uploads/${path}`;
    return NextResponse.json({ publicUrl });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { paths } = await req.json();
    if (!paths?.length) {
      return NextResponse.json({ error: "paths required" }, { status: 400 });
    }
    for (const p of paths) {
      try {
        await unlink(join(UPLOAD_DIR, p));
      } catch {}
    }
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
