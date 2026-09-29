"use client";

import Link from "next/link";
import { IconArrowLeft, IconFolderFilled } from "@tabler/icons-react";
import { useLanguage } from "@/context/language-context";

export default function NotFound() {
  const { locale } = useLanguage();
  const isEn = locale === "en";

  return (
    <div className="relative min-h-[calc(100vh-16rem)] sm:min-h-[calc(100vh-18rem)] flex flex-col items-center justify-center px-4 py-12 sm:py-16 md:py-20 overflow-hidden bg-transparent">
      {/* Subtle centered ambient brand glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] sm:w-[560px] h-[420px] sm:h-[560px] bg-brand/[0.07] rounded-full blur-[140px] pointer-events-none -z-10"
      />

      {/* Architectural 404 watermark aligned with Figma canvas grid */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-mono font-black text-[clamp(8rem,24vw,18rem)] leading-none text-zinc-900/[0.035] dark:text-white/[0.03] select-none pointer-events-none tracking-tighter -z-10"
      >
        404
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-xl mx-auto">
        {/* Figma Frame Status Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800 backdrop-blur-xs text-brand font-mono text-[11px] font-bold tracking-widest uppercase mb-6 shadow-xs select-none">
          <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
          <span>{isEn ? "/ 404 — PAGE NOT FOUND" : "/ 404 — HALAMAN TIDAK DITEMUKAN"}</span>
        </div>

        {/* Primary Title */}
        <h1 className="heading-display font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.08] mb-4">
          {isEn ? "Link Unavailable." : "Tautan Tidak Tersedia."}
        </h1>

        {/* Explanatory Narrative */}
        <p className="text-zinc-600 dark:text-zinc-400 text-sm sm:text-base leading-relaxed max-w-md mx-auto mb-8 font-sans">
          {isEn
            ? "The page you are looking for has been moved or the URL is invalid. Let's head back home to explore selected works and case studies."
            : "Halaman yang Anda tuju telah dipindahkan atau tautan tidak valid. Mari kembali ke beranda untuk menjelajahi karya dan studi kasus terpilih."}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-brand text-white font-mono font-bold text-xs uppercase tracking-wider hover:bg-brand-deep transition-all shadow-brand shadow-[0_8px_20px_-8px_#F0531C] active:scale-95"
          >
            <IconArrowLeft className="w-4 h-4 stroke-[2.5]" />
            <span>{isEn ? "Back to Homepage" : "Kembali ke Beranda"}</span>
          </Link>

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-white/80 dark:bg-zinc-900/80 hover:bg-white dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200/90 dark:border-zinc-800 font-mono font-bold text-xs uppercase tracking-wider transition-all active:scale-95 shadow-xs"
          >
            <IconFolderFilled className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500" />
            <span>{isEn ? "Explore Works" : "Jelajahi Karya"}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

