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
        <div className="flex justify-start pt-10 md:pt-40 md:gap-10 group">
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
                <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-zinc-50 dark:bg-gray-950 border border-black/10 dark:border-white/10 flex items-center justify-center transition-all duration-500">
                    <div 
                        className={cn(
                            "h-3 w-3 rounded-full border border-black/10 dark:border-white/10 transition-all duration-500",
                            isPassed ? "bg-lime-500 scale-125 shadow-[0_0_15px_rgba(132,204,22,0.5)]" : "bg-zinc-300 dark:bg-zinc-800 scale-100"
                        )} 
                    />
                </div>
                <div className="flex flex-col md:items-start items-center gap-2">
                    <h2 
                        className={cn(
                            "hidden md:block text-xl md:pl-20 md:text-3xl font-bold transition-colors duration-500",
                            isPassed ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-400 dark:text-zinc-500"
                        )}
                    >
                        {item.title}
                    </h2>
                    {item.subtitle && (
                        <h3 className="hidden md:block text-sm md:pl-20 md:text-base font-medium text-lime-600/80 dark:text-lime-500/80">
                            {item.subtitle}
                        </h3>
                    )}
                </div>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
                <h3 
                    className={cn(
                        "md:hidden block text-2xl mb-2 text-left font-bold transition-colors duration-500",
                        isPassed ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-400 dark:text-zinc-500"
                    )}
                >
                    {item.title}
                </h3>
                {item.subtitle && (
                    <h2 className="md:hidden block text-base mb-4 text-left font-medium text-lime-600 dark:text-lime-500">
                        {item.subtitle}
                    </h2>
                )}
                <motion.div
                    animate={{ opacity: isPassed ? 1 : 0.4 }}
                    transition={{ duration: 0.5 }}
                >
                    {item.content}
                </motion.div>
            </div>
        </div>
    );
};
