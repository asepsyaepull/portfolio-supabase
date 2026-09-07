"use client";

import React, { useId } from "react";
import { LayoutGroup, motion } from "framer-motion";
import { useLanguage } from "@/context/language-context";
import { cn } from "@/lib/utils";

interface LanguageToggleProps {
  className?: string;
  id?: string;
}

export function LanguageToggle({ className, id }: LanguageToggleProps) {
  const generatedId = useId();
  const toggleId = id || generatedId;
  const { locale, setLocale } = useLanguage();

  return (
    <LayoutGroup id={toggleId}>
      <div
        role="radiogroup"
        aria-label="Pilih bahasa / Select language"
        className={cn(
          "relative inline-flex items-center rounded-full border border-line-2 bg-white/80 p-0.5 shadow-xs backdrop-blur-xs select-none",
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
            "relative rounded-full px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wider transition-colors focus-visible:outline-hidden",
            locale === "id" ? "text-white" : "text-ink-soft hover:text-ink"
          )}
        >
          {locale === "id" && (
            <motion.div
              layoutId={`language-toggle-pill-${toggleId}`}
              className="absolute inset-0 rounded-full bg-ink shadow-xs"
              transition={{
                type: "spring",
                stiffness: 450,
                damping: 30,
              }}
            />
          )}
          <span className="relative z-10">ID</span>
        </button>

        {/* EN Option */}
        <button
          type="button"
          role="radio"
          aria-checked={locale === "en"}
          aria-label="English"
          onClick={() => setLocale("en")}
          className={cn(
            "relative rounded-full px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wider transition-colors focus-visible:outline-hidden",
            locale === "en" ? "text-white" : "text-ink-soft hover:text-ink"
          )}
        >
          {locale === "en" && (
            <motion.div
              layoutId={`language-toggle-pill-${toggleId}`}
              className="absolute inset-0 rounded-full bg-ink shadow-xs"
              transition={{
                type: "spring",
                stiffness: 450,
                damping: 30,
              }}
            />
          )}
          <span className="relative z-10">EN</span>
        </button>
      </div>
    </LayoutGroup>
  );
}

export default LanguageToggle;
