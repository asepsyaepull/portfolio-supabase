"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useTransform,
  useScroll,
  useSpring,
} from "framer-motion";
import { cn } from "@/lib/utils";

export const TracingBeam = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const contentRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      if (contentRef.current) {
        setSvgHeight(contentRef.current.scrollHeight);
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);
    
    // Add a small delay to ensure all nested components/images are measured correctly
    const timeoutId = setTimeout(updateHeight, 500);
    
    return () => {
      window.removeEventListener("resize", updateHeight);
      clearTimeout(timeoutId);
    };
  }, [children]);

  // Transform scroll progress to pixel value for the beam's end point
  const yProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Calculate the path length based on height
  const pathLength = svgHeight;
  
  // Create a mask effect using strokeDasharray
  const pathLengthTransform = useTransform(yProgress, [0, 1], [0, pathLength]);

  return (
    <div
      ref={ref}
      className={cn("relative w-full max-w-4xl mx-auto h-full", className)}
    >
      <div className="absolute -left-6 md:-left-12 top-0 bottom-0">
        <svg
          viewBox={`0 0 20 ${svgHeight}`}
          width="20"
          height={svgHeight}
          className="block h-full"
          aria-hidden="true"
        >
          {/* Background Track (Static) */}
          <path
            d={`M 10 0 V ${svgHeight}`}
            fill="none"
            stroke="white"
            strokeOpacity="0.1"
            strokeWidth="1.5"
          />
          
          {/* Active Tracing Beam (Animated) */}
          <motion.path
            d={`M 10 0 V ${svgHeight}`}
            fill="none"
            stroke="#84cc16" // Lime 500
            strokeWidth="2"
            strokeLinecap="round"
            style={{
                pathLength: yProgress
            }}
            transition={{
                duration: 0
            }}
            className="drop-shadow-[0_0_8px_rgba(132,204,22,0.8)]"
          />

          {/* Glowing Dot at the tip of the beam */}
          <motion.circle
            cx="10"
            cy={useTransform(yProgress, [0, 1], [0, svgHeight])}
            r="3"
            fill="#a3e635" // Lime 400
            className="drop-shadow-[0_0_10px_rgba(163,230,53,1)]"
          />
        </svg>
      </div>
      
      <div ref={contentRef} className="relative z-10">
        {children}
      </div>
    </div>
  );
};
