"use client";

import React, { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import {
  IconArrowLeft,
  IconArrowUpRight,
  IconCheck,
  IconCopy,
  IconShare,
  IconMaximize,
  IconX,
} from "@tabler/icons-react";
import Image from "next/image";

interface QuickActionProps {
  projectName: string;
  projectSlug: string;
  projectLink?: string;
  category: string;
}

export function ProjectHeaderActions({
  projectName,
  projectLink,
}: QuickActionProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      if (typeof window !== "undefined") {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        toast.success("Link berhasil disalin ke clipboard!", {
          description: `Tautan untuk "${projectName}" siap dibagikan.`,
        });
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      toast.error("Gagal menyalin link.");
    }
  };

  return (
    <div className="flex items-center gap-2.5">
      {/* Copy / Share Button */}
      <button
        type="button"
        onClick={handleCopyLink}
        title="Salin tautan proyek"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 text-xs font-mono font-medium transition-all active:scale-95 cursor-pointer"
      >
        {copied ? (
          <>
            <IconCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-emerald-600 dark:text-emerald-400">Copied</span>
          </>
        ) : (
          <>
            <IconCopy className="w-3.5 h-3.5 text-zinc-400" />
            <span>Copy Link</span>
          </>
        )}
      </button>

      {/* Live Project Button (if exists) */}
      {projectLink && projectLink !== "#" && (
        <a
          href={projectLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-brand hover:bg-brand-deep text-white text-xs font-mono font-bold uppercase tracking-wider shadow-sm transition-all active:scale-95"
        >
          <span>Live Site</span>
          <IconArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
        </a>
      )}
    </div>
  );
}

export function ProjectImagePreview({
  src,
  alt,
  slug,
}: {
  src: string;
  alt: string;
  slug: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="group relative w-full overflow-hidden rounded-2xl md:rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-100 dark:bg-zinc-950 shadow-lg transition-all duration-300">
        {/* Mockup Top Window Chrome Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-zinc-200/70 dark:bg-zinc-900/80 border-b border-zinc-200 dark:border-zinc-800/80 backdrop-blur-sm select-none">
          {/* macOS 3 dots */}
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56] border border-[#E0443E]/40" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E] border border-[#DEA123]/40" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F] border border-[#1AAB29]/40" />
          </div>

          {/* Window center spec file label */}
          <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 font-mono text-[11px] tracking-wider font-semibold">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand" />
            <span>{slug}.preview</span>
            <span className="hidden sm:inline text-zinc-400 dark:text-zinc-600">• 1440 × 900</span>
          </div>

          {/* Expand preview trigger */}
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-1 text-[11px] font-mono text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
            title="Perbesar gambar"
          >
            <IconMaximize className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Zoom</span>
          </button>
        </div>

        {/* Viewport Image */}
        <div
          onClick={() => setIsOpen(true)}
          className="relative w-full aspect-[16/10] sm:aspect-[16/9] cursor-zoom-in overflow-hidden bg-zinc-900/10 dark:bg-black/30"
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 1280px) 100vw, 1200px"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.015]"
            priority
          />
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setIsOpen(false)}
        >
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            title="Tutup preview"
          >
            <IconX className="w-6 h-6" />
          </button>

          <div
            className="relative max-w-6xl w-full max-h-[90vh] aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={src}
              alt={alt}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
