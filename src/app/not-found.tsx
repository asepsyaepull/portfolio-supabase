"use client";

import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";
import { useLanguage } from "@/context/language-context";

export default function NotFound() {
  const { locale } = useLanguage();
  const isEn = locale === "en";

  return (
    <div className="min-h-[70vh] bg-zinc-50 dark:bg-gray-950 relative flex items-center justify-center overflow-hidden px-4 transition-colors duration-300">
      {/* Subtle background grid */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(#d4d4d8_1px,transparent_1px)] dark:bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-50 dark:opacity-30" />
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-brand/10 rounded-full blur-[140px] pointer-events-none" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center max-w-lg">
        <span className="text-brand font-mono tracking-widest text-xs md:text-sm uppercase mb-4 transition-colors">
          {isEn ? "/ 404 — Page Not Found" : "/ 404 — Halaman Tidak Ditemukan"}
        </span>
        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-zinc-900 dark:text-white leading-[1.05] mb-4 transition-colors">
          {isEn ? "Link Unavailable." : "Tautan Tidak Tersedia."}
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm md:text-base leading-relaxed mb-8 transition-colors">
          {isEn
            ? "The page you are looking for has been moved or the URL is invalid. Let's head back home to explore selected works and case studies."
            : "Halaman yang Anda tuju telah dipindahkan atau tautan tidak valid. Mari kembali ke beranda untuk menjelajahi karya dan studi kasus terpilih."}
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-brand text-white font-mono font-bold text-xs uppercase tracking-wider hover:bg-brand-deep transition-all shadow-brand shadow-[0_8px_20px_-8px_#F0531C] active:scale-95"
        >
          <IconArrowLeft className="w-4 h-4 stroke-[2.5]" />
          <span>{isEn ? "Back to Homepage" : "Kembali ke Beranda"}</span>
        </Link>
      </div>
    </div>
  );
}
