"use client";

import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useTransform,
} from "motion/react";
import * as React from "react";

export type ArcRevealGreeting = {
  text: string;
  lang?: string;
};

export interface ArcRevealHeroProps {
  greetings?: ArcRevealGreeting[];
  greetingHold?: number;
  revealDuration?: number;
  className?: string;
  introClassName?: string;
  greetingClassName?: string;
  revealClassName?: string;
  storageKey?: string;
  children?: React.ReactNode;
}

const DEFAULT_GREETINGS: ArcRevealGreeting[] = [
  { text: "Quiet." },
  { text: "Sharp." },
  { text: "Calm." },
  { text: "Crafted." },
  { text: "Considered." },
  { text: "Composed." },
  { text: "Honest." },
  { text: "Ready." },
];

type Phase = "intro" | "reveal" | "done";

export function ArcRevealHero({
  greetings = DEFAULT_GREETINGS,
  greetingHold = 620,
  revealDuration = 1500,
  className,
  introClassName,
  greetingClassName,
  revealClassName,
  storageKey,
  children,
}: ArcRevealHeroProps) {
  const [phase, setPhase] = React.useState<Phase>("intro");
  const [index, setIndex] = React.useState(0);

  // Drive the arc shape from a single 0→1 progress.
  const progress = useMotionValue(0);
  const arcPath = useTransform(progress, (p: number) => {
    const edge = 110 - p * 140;
    const control = edge + 25;
    return `M 0 ${edge} Q 50 ${control} 100 ${edge} L 100 110 L 0 110 Z`;
  });

  // Session storage check on mount (if storageKey provided)
  React.useEffect(() => {
    if (storageKey && typeof window !== "undefined") {
      try {
        if (window.sessionStorage.getItem(storageKey) === "done") {
          setPhase("done");
        }
      } catch {
        /* ignore */
      }
    }
  }, [storageKey]);

  // Greeting cycle.
  React.useEffect(() => {
    if (phase !== "intro") return;
    const isLast = index >= greetings.length - 1;
    if (isLast) {
      const t = window.setTimeout(() => setPhase("reveal"), greetingHold + 220);
      return () => window.clearTimeout(t);
    }
    const t = window.setTimeout(() => setIndex((i) => i + 1), greetingHold);
    return () => window.clearTimeout(t);
  }, [phase, index, greetingHold, greetings.length]);

  // Lock body scroll and reset scroll to top during intro & reveal phases
  React.useEffect(() => {
    if (phase !== "done") {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      window.scrollTo(0, 0);

      return () => {
        document.body.style.overflow = originalOverflow;
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [phase]);

  // Drive the curtain reveal.
  React.useEffect(() => {
    if (phase !== "reveal") return;
    const controls = animate(progress, 1, {
      duration: revealDuration / 1000,
      ease: [0.85, 0, 0.15, 1],
      onComplete: () => {
        if (storageKey && typeof window !== "undefined") {
          try {
            window.sessionStorage.setItem(storageKey, "done");
          } catch {
            /* ignore */
          }
        }
        setPhase("done");
      },
    });
    return () => controls.stop();
  }, [phase, progress, revealDuration, storageKey]);

  const showOverlay = phase !== "done";
  const current = greetings[Math.min(index, greetings.length - 1)];

  return (
    <div aria-label="Hero intro" className={cn("relative w-full", className)}>
      {/* Revealed content */}
      <div className={cn("relative z-0", revealClassName)}>{children}</div>

      {/* Intro overlay */}
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            key="arc-reveal-overlay"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className={cn(
              "fixed inset-0 z-[99999] flex h-[100dvh] w-screen flex-col overflow-hidden bg-ink select-none",
              introClassName
            )}
            style={{ backgroundColor: "#14202B", touchAction: "none" }}
          >
            {/* Subtle noise texture */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                backgroundSize: "128px 128px",
              }}
            />

            {/* Cycled greeting */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
              <AnimatePresence mode="wait">
                {phase === "intro" && current && (
                  <motion.span
                    key={`${index}-${current.text}`}
                    lang={current.lang}
                    initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
                    transition={{
                      duration: 0.48,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={cn(
                      "select-none px-6 text-center font-display text-5xl font-semibold tracking-tight text-white/90 sm:text-6xl md:text-7xl",
                      greetingClassName
                    )}
                  >
                    {current.text}
                  </motion.span>
                )}
              </AnimatePresence>

              {/* Progress indicator dots */}
              {phase === "intro" && (
                <div className="flex items-center gap-2">
                  {greetings.map((_, i) => (
                    <motion.div
                      key={i}
                      className="h-1 rounded-full"
                      initial={false}
                      animate={{
                        width: i === index ? 24 : 4,
                        backgroundColor:
                          i === index ? "var(--brand, #F0531C)" : "rgba(255,255,255,0.2)",
                      }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Corner label */}
            <span
              aria-hidden
              className="absolute bottom-8 left-8 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-white/25"
            >
              Loading experience…
            </span>

            {/* Rising curved curtain */}
            <svg
              className="pointer-events-none absolute inset-0 h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden
            >
              <motion.path d={arcPath} style={{ fill: "var(--canvas, #E6E8EC)" }} />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ArcRevealHero;
