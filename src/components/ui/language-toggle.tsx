"use client";

import React, { useRef, useState, useEffect, useCallback, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/language-context";
import { cn } from "@/lib/utils";

interface LanguageToggleProps {
  className?: string;
  id?: string;
}

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function LanguageToggle({ className }: LanguageToggleProps) {
  const { locale, setLocale } = useLanguage();
  const idRef = useRef<HTMLButtonElement>(null);
  const enRef = useRef<HTMLButtonElement>(null);
  const [pillStyle, setPillStyle] = useState<{
    left: number;
    width: number;
  } | null>(null);

  const updatePill = useCallback(() => {
    const target = locale === "id" ? idRef.current : enRef.current;
    if (target) {
      setPillStyle({
        left: target.offsetLeft,
        width: target.offsetWidth,
      });
    }
  }, [locale]);

  useIsomorphicLayoutEffect(() => {
    updatePill();
  }, [updatePill]);

  useEffect(() => {
    updatePill();
    window.addEventListener("resize", updatePill);

    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(updatePill);
    }

    return () => window.removeEventListener("resize", updatePill);
  }, [updatePill]);

  const handleSelect = (newLocale: "id" | "en") => {
    setLocale(newLocale);
    const target = newLocale === "id" ? idRef.current : enRef.current;
    if (target) {
      setPillStyle({
        left: target.offsetLeft,
        width: target.offsetWidth,
      });
    }
  };

  return (
    <div
      role="radiogroup"
      aria-label="Pilih bahasa / Select language"
      className={cn(
        "relative inline-flex items-center rounded-full border border-line-2 bg-white/80 p-0.5 shadow-xs backdrop-blur-xs select-none",
        className
      )}
    >
      {/* Sliding Indicator Pill - 100% horizontal only, zero vertical jump */}
      {pillStyle && (
        <motion.div
          className="absolute inset-y-0.5 rounded-full bg-ink shadow-xs pointer-events-none"
          initial={false}
          animate={{
            left: pillStyle.left,
            width: pillStyle.width,
          }}
          transition={{
            type: "spring",
            stiffness: 450,
            damping: 30,
          }}
        />
      )}

      {/* ID Option */}
      <button
        ref={idRef}
        type="button"
        role="radio"
        aria-checked={locale === "id"}
        aria-label="Bahasa Indonesia"
        onClick={() => handleSelect("id")}
        className={cn(
          "relative z-10 rounded-full px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wider transition-colors focus-visible:outline-hidden",
          locale === "id" ? "text-white" : "text-ink-soft hover:text-ink"
        )}
      >
        <span>ID</span>
      </button>

      {/* EN Option */}
      <button
        ref={enRef}
        type="button"
        role="radio"
        aria-checked={locale === "en"}
        aria-label="English"
        onClick={() => handleSelect("en")}
        className={cn(
          "relative z-10 rounded-full px-2.5 py-1 font-mono text-[11px] font-bold uppercase tracking-wider transition-colors focus-visible:outline-hidden",
          locale === "en" ? "text-white" : "text-ink-soft hover:text-ink"
        )}
      >
        <span>EN</span>
      </button>
    </div>
  );
}

export default LanguageToggle;
