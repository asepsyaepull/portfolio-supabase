import { NextRequest, NextResponse } from "next/server";
import { readFile, stat } from "fs/promises";
import { join, normalize, extname } from "path";

const UPLOAD_DIR = join(process.cwd(), "public", "uploads");

const MIME_TYPES: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".avif": "image/avif",
  ".ico": "image/x-icon",
  ".pdf": "application/pdf",
};

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path } = await params;
    if (!path || !path.length) {
      return new NextResponse("Not Found", { status: 404 });
    }

    // Sanitize path to prevent directory traversal
    const relativePath = path.join("/");
    const safePath = normalize(relativePath).replace(/^(\.\.[\/\\])+/, "");
    const fullPath = join(UPLOAD_DIR, safePath);

    // Ensure target path is strictly within UPLOAD_DIR
    if (!fullPath.startsWith(UPLOAD_DIR)) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const fileStat = await stat(fullPath).catch(() => null);
    if (!fileStat || !fileStat.isFile()) {
      return new NextResponse("Not Found", { status: 404 });
    }

    const fileBuffer = await readFile(fullPath);
    const ext = extname(fullPath).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Length": fileStat.size.toString(),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
