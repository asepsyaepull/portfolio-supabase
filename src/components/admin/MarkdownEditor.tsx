"use client";

import dynamic from "next/dynamic";
import { useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

// Load editor dynamically to avoid SSR issues with the library
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export default function MarkdownEditor({ value, onChange, label }: MarkdownEditorProps) {
  const [uploading, setUploading] = useState(false);
  const supabase = createClient();

  const handleImageUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Format file tidak didukung. Harap unggah gambar.");
      return null;
    }

    try {
      setUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      // Upload to Supabase Storage (requires 'portfolio-assets' bucket to exist and be public)
      const { error: uploadError } = await supabase.storage
        .from('portfolio-assets')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data } = supabase.storage
        .from('portfolio-assets')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error: any) {
      console.error("Upload error:", error);
      toast.error(`Gagal mengunggah gambar: ${error.message}`);
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = useCallback(async (event: React.DragEvent<HTMLDivElement>) => {
    // If dropping a file
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      if (file.type.startsWith("image/")) {
        event.preventDefault();
        const url = await handleImageUpload(file);
        if (url) {
          // Append image markdown at the end or at cursor position (simplified to append)
          onChange(`${value}\n![${file.name}](${url})\n`);
        }
      }
    }
  }, [value, onChange]);

  return (
    <div className="flex flex-col gap-2" onDrop={handleDrop}>
      {label && <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">{label}</label>}
      <div data-color-mode="auto" className="rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800">
        <MDEditor
          value={value}
          onChange={(val) => onChange(val || "")}
          height={400}
          className="w-full bg-transparent"
          previewOptions={{
            className: "prose prose-zinc dark:prose-invert max-w-none"
          }}
          textareaProps={{
            placeholder: "Ketik teks di sini... Anda bisa drag & drop gambar ke area ini.",
          }}
          // Prevent drag over from doing default open file
          onDragOver={(e) => e.preventDefault()}
        />
      </div>
      {uploading && (
        <p className="text-xs text-lime-600 dark:text-lime-500 font-medium animate-pulse">
          Mengunggah gambar...
        </p>
      )}
      <p className="text-xs text-zinc-500">
        Tarik dan letakkan (Drag & Drop) gambar ke dalam editor untuk mengunggah.
      </p>
    </div>
  );
}
