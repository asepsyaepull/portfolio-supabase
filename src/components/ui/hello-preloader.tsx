"use client";

import React, { useEffect, useState, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface GreetingItem {
  text: string;
  lang?: string;
  sub?: string;
}

const GREETINGS: GreetingItem[] = [
  { text: "Hello", lang: "en", sub: "English" },
  { text: "Halo", lang: "id", sub: "Indonesian" },
  { text: "Bonjour", lang: "fr", sub: "French" },
  { text: "Hola", lang: "es", sub: "Spanish" },
  { text: "Ciao", lang: "it", sub: "Italian" },
  { text: "Olá", lang: "pt", sub: "Portuguese" },
  { text: "こんにちは", lang: "ja", sub: "Japanese" },
  { text: "你好", lang: "zh", sub: "Chinese" },
  { text: "Guten Tag", lang: "de", sub: "German" },
  { text: "Hello", lang: "en", sub: "Welcome" },
];

export interface HelloPreloaderProps {
  storageKey?: string;
  forceShow?: boolean;
  onComplete?: () => void;
  className?: string;
}

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function HelloPreloader({
  storageKey = "asyaepul_portfolio_hello_v1",
  forceShow = false,
  onComplete,
  className,
}: HelloPreloaderProps) {
  // Default to active true so SSR and initial HTML immediately render the dark preloader frame (Zero FOUC)
  const [active, setActive] = useState(true);
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  // Synchronous client check before paint
  useIsomorphicLayoutEffect(() => {
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const hasIntroParam = searchParams.get("intro") === "true";
      const hasSeen = window.sessionStorage.getItem(storageKey) === "true";
      const isMarkedDone = document.documentElement.classList.contains("preloader-done");

      if ((hasSeen || isMarkedDone) && !forceShow && !hasIntroParam) {
        setActive(false);
      } else {
        setActive(true);
        // Ensure preloader-done class is removed if replayed
        document.documentElement.classList.remove("preloader-done");
      }
    } catch {
      /* ignore */
    }
  }, [storageKey, forceShow]);

  // Lock scroll when preloader is active
  useEffect(() => {
    if (active) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      window.scrollTo(0, 0);

      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [active]);

  // Handle word cycling & progress count
  useEffect(() => {
    if (!active || isExiting) return;

    const totalSteps = GREETINGS.length;
    const stepDuration = 180; // ms per word
    const finalHold = 450; // hold on final "Hello"

    const interval = setInterval(() => {
      setIndex((prev) => {
        if (prev < totalSteps - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          // Trigger exit animation after final word
          setTimeout(() => {
            setIsExiting(true);
          }, finalHold);
          return prev;
        }
      });
    }, stepDuration);

    // Progress counter (0 to 100%)
    const progressDuration = (totalSteps - 1) * stepDuration + finalHold;
    const startTime = performance.now();

    const progressTimer = setInterval(() => {
      const elapsed = performance.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / progressDuration) * 100));
      setProgress(pct);
      if (pct >= 100) {
        clearInterval(progressTimer);
      }
    }, 20);

    return () => {
      clearInterval(interval);
      clearInterval(progressTimer);
    };
  }, [active, isExiting]);

  // Keyboard shortcut to skip (Escape)
  useEffect(() => {
    if (!active || isExiting) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsExiting(true);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [active, isExiting]);

  // ONLY mark done after the slide-up exit animation is 100% complete
  const handleAnimationComplete = () => {
    setActive(false);
    try {
      window.sessionStorage.setItem(storageKey, "true");
      document.documentElement.classList.add("preloader-done");
    } catch {
      /* ignore */
    }
    onComplete?.();
  };

  if (!active) return null;

  const currentGreeting = GREETINGS[index] || GREETINGS[0];
  const isLastWord = index === GREETINGS.length - 1;

  // Slide up variants with rounded bottom curve morphing
  const slideVariants = {
    initial: {
      y: 0,
    },
    exit: {
      y: "calc(-100% - 320px)",
      transition: {
        duration: 0.9,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  // Hanging SVG arch curve morphing (bows down 120 units in center as it slides up)
  const curveVariants = {
    initial: {
      d: "M 0 0 Q 500 0 1000 0 L 1000 0 L 0 0 Z",
    },
    exit: {
      d: "M 0 0 Q 500 120 1000 0 L 1000 0 L 0 0 Z",
      transition: {
        duration: 0.9,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  // Content fade & lift on exit
  const contentVariants = {
    initial: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
    exit: {
      opacity: 0,
      y: -80,
      scale: 0.95,
      transition: {
        duration: 0.5,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  return (
    <div id="hello-preloader-root">
      <AnimatePresence onExitComplete={handleAnimationComplete}>
        {!isExiting && (
          <motion.div
            key="hello-preloader"
            variants={slideVariants}
            initial="initial"
            exit="exit"
            className={cn(
              "fixed inset-0 z-[999999] h-[100dvh] w-screen overflow-visible bg-[#14202B] text-white select-none pointer-events-auto",
              className
            )}
            style={{ touchAction: "none" }}
          >
            {/* Subtle noise texture */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-[0.035]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                backgroundSize: "128px 128px",
              }}
            />

            {/* Ambient radial background glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-brand/10 blur-[120px]"
            />

            {/* Main Content Layout */}
            <motion.div
              variants={contentVariants}
              initial="initial"
              exit="exit"
              className="relative z-10 flex h-full w-full flex-col justify-between"
            >
              {/* Header Bar */}
              <div className="flex w-full items-center justify-between px-6 py-6 sm:px-10 sm:py-8 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">
                <div className="flex items-center gap-3">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand" />
                  </span>
                  <span className="text-white/80">Asep Syaepul</span>
                  <span className="hidden sm:inline text-white/30">•</span>
                  <span className="hidden sm:inline text-white/40">Portfolio 2026</span>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-white/60">Jakarta, ID</span>
                  <button
                    onClick={() => {
                      setIsExiting(true);
                    }}
                    className="rounded-full border border-white/15 px-2.5 py-1 text-[10px] text-white/50 hover:text-white hover:border-white/40 transition-colors cursor-pointer"
                    title="Press ESC to skip"
                  >
                    Skip [ESC]
                  </button>
                </div>
              </div>

              {/* Center Main Stage: Animated Greeting Text */}
              <div className="flex flex-1 flex-col items-center justify-center px-4">
                <div className="flex flex-col items-center justify-center">
                  {/* Multilingual Text Morph */}
                  <div className="relative flex min-h-[100px] sm:min-h-[140px] items-center justify-center">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentGreeting.text + index}
                        initial={{ opacity: 0, y: 20, filter: "blur(8px)", scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
                        exit={{ opacity: 0, y: -20, filter: "blur(8px)", scale: 1.02 }}
                        transition={{
                          duration: 0.16,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        lang={currentGreeting.lang}
                        className="flex items-center gap-3 sm:gap-4 font-display text-[clamp(3.2rem,11vw,7.5rem)] font-bold tracking-tight text-white"
                      >
                        {/* Glowing indicator dot on left */}
                        <span className="inline-block h-3 w-3 sm:h-4 sm:w-4 rounded-full bg-brand shadow-[0_0_16px_rgba(240,83,28,0.8)]" />
                        <span>{currentGreeting.text}</span>
                        {isLastWord && (
                          <span className="text-brand font-display">.</span>
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Language Pill Indicator */}
                  <div className="mt-4 flex items-center gap-2">
                    <span className="font-mono text-xs uppercase tracking-[0.24em] text-white/40">
                      {currentGreeting.sub}
                    </span>
                  </div>
                </div>
              </div>

              {/* Footer Bar: Counter & Progress */}
              <div className="flex w-full flex-col gap-3 px-6 pb-6 sm:px-10 sm:pb-8">
                <div className="flex items-end justify-between font-mono">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
                      System Status
                    </span>
                    <span className="text-xs text-white/70 tracking-wider">
                      INITIALIZING INTERFACE...
                    </span>
                  </div>

                  {/* Rolling Percentage Counter */}
                  <div className="flex items-baseline gap-1">
                    <span className="font-mono text-3xl sm:text-4xl font-bold tracking-tighter text-white">
                      {String(progress).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-sm font-semibold text-brand">
                      %
                    </span>
                  </div>
                </div>

                {/* Micro Progress Bar */}
                <div className="h-[2px] w-full overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className="h-full bg-gradient-to-r from-brand to-[#FFA07A]"
                    style={{ width: `${progress}%` }}
                    transition={{ ease: "linear" }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Hanging Liquid Rounded Arch SVG at bottom */}
            <svg
              className="pointer-events-none absolute top-[calc(100%-1px)] left-0 h-[160px] sm:h-[240px] md:h-[300px] w-full fill-[#14202B]"
              viewBox="0 0 1000 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <motion.path
                variants={curveVariants}
                initial="initial"
                exit="exit"
              />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default HelloPreloader;
