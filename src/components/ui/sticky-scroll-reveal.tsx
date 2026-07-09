"use client";
import { cn } from "@/lib/utils";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useTheme } from "next-themes";
import React, { useEffect, useRef, useState } from "react";

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    description: string;
    icon?: React.ReactNode;
    content?: React.ReactNode | any;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    // uncomment line 22 and comment line 23 if you DONT want the scroll margins
    container: ref,
    offset: ["start start", "end start"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0
    );
    setActiveCard(closestBreakpointIndex);
  });

  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Gracefully fallback to 'dark' during SSR to prevent hydration errors while keeping DOM intact
  const currentTheme = mounted ? (theme === "system" ? systemTheme : theme) : "dark";

  const backgroundColors = currentTheme === "dark"
    ? [
      "#0f172a", // slate-900
      "#171717", // neutral-900
      "#18181b", // zinc-900
      "#111827", // gray-900
    ]
    : [
      "#f8fafc", // slate-50
      "#f5f5f5", // neutral-50
      "#f4f4f5", // zinc-50
      "#f3f4f6", // gray-50
    ];

  return (
    <>
      {/* Desktop/Tablet Layout */}
      <motion.div
        animate={{
          backgroundColor: backgroundColors[activeCard % backgroundColors.length],
        }}
        transition={{ duration: 0.5 }}
        className="hidden md:flex h-[80vh] min-h-[40rem] overflow-y-auto justify-center relative space-x-10 p-10 border border-zinc-200 dark:border-white/5 no-scrollbar scroll-smooth transition-colors"
        ref={ref}
      >
        <div className="relative flex items-start px-4 max-w-2xl w-full">
          <div className="w-full">
            {content.map((item, index) => (
              <div key={item.title + index} className="h-[80vh] min-h-[40rem] flex flex-col justify-center">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: activeCard === index ? 1 : 0.2,
                  }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col gap-6"
                >
                  <div className="flex items-center gap-4">
                    {item.icon && (
                      <div className="p-3 bg-lime-500/10 text-lime-600 dark:text-lime-500 rounded-xl border border-lime-500/20 shadow-[0_0_15px_rgba(132,204,22,0.1)] transition-colors">
                        {item.icon}
                      </div>
                    )}
                    <h2 className="text-3xl font-bold text-zinc-900 dark:text-slate-100 transition-colors">
                      {item.title}
                    </h2>
                  </div>
                  <p className="text-lg text-zinc-600 dark:text-slate-300 max-w-md leading-relaxed font-light transition-colors">
                    {item.description}
                  </p>
                </motion.div>
              </div>
            ))}
            <div className="h-10" />
          </div>
        </div>

        {/* Right Sticky Column */}
        <div
          className={cn(
            "hidden lg:flex flex-col justify-center h-full max-h-[30rem] w-[32rem] rounded-2xl sticky top-1/2 -translate-y-1/2 overflow-hidden",
            contentClassName
          )}
        >
          {content[activeCard].content ?? null}
        </div>
      </motion.div>

      {/* Mobile Stacked Layout (No Sticky) */}
      <div className="md:hidden flex flex-col gap-8">
        {content.map((item, index) => (
          <div key={index} className="bg-white/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/5 p-6 flex flex-col gap-6 transition-colors">
            <div className="flex items-center gap-3">
              {item.icon && (
                <div className="p-2.5 bg-lime-500/10 text-lime-600 dark:text-lime-500 rounded-lg border border-lime-500/20 transition-colors">
                  {item.icon}
                </div>
              )}
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-slate-100 leading-tight transition-colors">
                {item.title}
              </h2>
            </div>
            <p className="text-base text-zinc-600 dark:text-slate-400 leading-relaxed font-light transition-colors">
              {item.description}
            </p>
            <div className="w-full h-64 rounded-xl overflow-hidden bg-zinc-50 dark:bg-zinc-950/80 border border-zinc-200 dark:border-white/5 flex items-center justify-center transition-colors">
              {item.content}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
