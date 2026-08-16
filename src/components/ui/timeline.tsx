"use client";
import {
  useScroll,
  useTransform,
  motion,
  useSpring,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface TimelineEntry {
  title: string;
  subtitle?: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      // Calculate total height including bottom padding to ensure line reaches the end
      const rect = containerRef.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [data]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    // Adjusting offset to ensure the line starts early and ends exactly at the bottom
    offset: ["start 20%", "end 80%"],
  });

  // Use spring for smoother line movement
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const heightTransform = useTransform(smoothProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(smoothProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full bg-transparent font-sans md:px-10"
      ref={containerRef}
    >
      <div className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <TimelineItem
            key={index}
            item={item}
            index={index}
            total={data.length}
            progress={smoothProgress}
          />
        ))}

        {/* Background Track Line */}
        <div
          style={{ height: height + "px" }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-zinc-200 dark:bg-zinc-800/50"
        >
          {/* Animated Progress Line */}
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-b from-lime-500 via-emerald-500 to-transparent rounded-full shadow-[0_0_8px_rgba(163,230,53,0.5)]"
          />
        </div>
      </div>
    </div>
  );
};

const TimelineItem = ({
    item,
    index,
    total,
    progress
}: {
    item: TimelineEntry,
    index: number,
    total: number,
    progress: any
}) => {
    const [isPassed, setIsPassed] = useState(false);

    // Calculate the threshold for this specific point
    // Each item's threshold is its position relative to the total length
    const threshold = index / (total - 0.5);

    useEffect(() => {
        return progress.on("change", (latest: number) => {
            if (latest >= threshold) {
                setIsPassed(true);
            } else {
                setIsPassed(false);
            }
        });
    }, [progress, threshold]);

    return (
        <div className="flex flex-col md:flex-row justify-start pt-8 md:pt-36 md:gap-10 relative">
            {/* Left Header Section (Desktop Sticky / Mobile In-flow) */}
            <div className="md:sticky md:top-36 self-start max-w-full md:max-w-xs lg:max-w-sm md:w-full flex flex-col items-start z-30">
                {/* Timeline Dot */}
                <div className={cn(
                    "h-6 absolute left-5 w-6 rounded-full bg-white dark:bg-zinc-950 flex items-center justify-center transition-colors duration-300 top-1 md:top-0",
                    isPassed ? "shadow-[0_0_15px_rgba(163,230,53,0.3)]" : ""
                )}>
                    <motion.div
                        initial={false}
                        animate={{
                            backgroundColor: isPassed ? "rgb(163, 230, 53)" : "transparent",
                            borderColor: isPassed ? "rgb(163, 230, 53)" : "rgb(228, 228, 231)",
                        }}
                        className="h-4 w-4 rounded-full border-2 dark:border-zinc-700 p-2 transition-colors duration-300 relative"
                    >
                        {isPassed && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: [1, 1.5, 1.8] }}
                                transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                                className="absolute inset-0 rounded-full bg-lime-500/30"
                            />
                        )}
                    </motion.div>
                </div>

                {/* Mobile Title & Subtitle */}
                <div className="md:hidden flex flex-col pl-14 pr-4">
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 transition-colors leading-tight">
                        {item.title}
                    </h3>
                    {item.subtitle && (
                        <p className="text-lime-600 dark:text-lime-500 text-xs font-medium tracking-wide mt-1 transition-colors">
                            {item.subtitle}
                        </p>
                    )}
                </div>

                {/* Desktop Title & Subtitle */}
                <div className="hidden md:flex flex-col ml-20 w-full">
                    <h3 className="text-xl lg:text-3xl font-bold text-zinc-900 dark:text-zinc-100 transition-colors">
                        {item.title}
                    </h3>
                    {item.subtitle && (
                        <p className="text-lime-600 dark:text-lime-500 text-sm lg:text-base tracking-wider mt-2 transition-colors">
                            {item.subtitle}
                        </p>
                    )}
                </div>
            </div>

            {/* Right Content Section */}
            <div className="relative pl-14 pr-4 md:pl-4 w-full mt-3 md:mt-0">
                <div className="text-zinc-600 dark:text-zinc-400 text-sm md:text-base leading-relaxed transition-colors prose prose-zinc dark:prose-invert max-w-none">
                    {item.content}
                </div>
            </div>
        </div>
    );
};
