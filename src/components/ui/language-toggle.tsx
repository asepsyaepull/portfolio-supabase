"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/language-context";
import { cn } from "@/lib/utils";

interface LanguageToggleProps {
  className?: string;
}

export function LanguageToggle({ className }: LanguageToggleProps) {
  const { locale, setLocale } = useLanguage();

  return (
    <div
      role="radiogroup"
      aria-label="Pilih bahasa / Select language"
      className={cn(
        "relative inline-flex items-center rounded-full border border-line-2 bg-white/80 p-0.5 shadow-xs backdrop-blur-xs",
        className
      )}
    >
      {/* ID Option */}
      <button
        type="button"
        role="radio"
        aria-checked={locale === "id"}
        aria-label="Bahasa Indonesia"
        onClick={() => setLocale("id")}
        className={cn(
          "relative z-10 rounded-full px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wider transition-colors",
          locale === "id" ? "text-white" : "text-ink-soft hover:text-ink"
        )}
      >
        {locale === "id" && (
          <motion.div
            layoutId="language-toggle-pill"
            className="absolute inset-0 z-[-1] rounded-full bg-ink shadow-xs"
            transition={{
              type: "spring",
              stiffness: 450,
              damping: 30,
            }}
          />
        )}
        ID
      </button>

      {/* EN Option */}
      <button
        type="button"
        role="radio"
        aria-checked={locale === "en"}
        aria-label="English"
        onClick={() => setLocale("en")}
        className={cn(
          "relative z-10 rounded-full px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wider transition-colors",
          locale === "en" ? "text-white" : "text-ink-soft hover:text-ink"
        )}
      >
        {locale === "en" && (
          <motion.div
            layoutId="language-toggle-pill"
            className="absolute inset-0 z-[-1] rounded-full bg-ink shadow-xs"
            transition={{
              type: "spring",
              stiffness: 450,
              damping: 30,
            }}
          />
        )}
        EN
      </button>
    </div>
  );
}

export default LanguageToggle;
