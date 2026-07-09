"use client";
import React, { useState, useEffect, useCallback, useRef, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlidingNumber } from "@/components/ui/sliding-number";

interface Rect {
  top: number;
  left: number;
  width: number;
  height: number;
}

export const FigmaHoverInspector = memo(({ containerRef }: { containerRef: React.RefObject<HTMLDivElement> }) => {
  const [hoveredRect, setHoveredRect] = useState<Rect | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return;

    const elements = document.elementsFromPoint(e.clientX, e.clientY);
    const target = elements.find(
      (el) => 
        (el instanceof HTMLHeadingElement || 
         el instanceof HTMLParagraphElement || 
         el instanceof HTMLButtonElement || 
         el instanceof HTMLAnchorElement ||
         el.getAttribute("data-inspectable") === "true") &&
        containerRef.current?.contains(el)
    ) as HTMLElement | undefined;

    if (target) {
      const rect = target.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();

      setHoveredRect({
        top: rect.top - containerRect.top,
        left: rect.left - containerRect.left,
        width: rect.width,
        height: rect.height,
      });
      setIsVisible(true);

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setIsVisible(false);
      }, 5000);
    } else {
      // Don't immediately hide, let the timeout handle it if we move to empty space
      // but if we are far away, maybe hide? For now, keep it visible until timeout.
    }
  }, [containerRef]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [handleMouseMove, containerRef]);

  return (
    <AnimatePresence>
      {isVisible && hoveredRect && (
        <motion.div
          initial={false}
          layoutId="figma-highlight"
          className="absolute pointer-events-none z-[50] border-2 border-lime-500 rounded-sm"
          style={{
            top: hoveredRect.top,
            left: hoveredRect.left,
            width: hoveredRect.width,
            height: hoveredRect.height,
          }}
          transition={{
            type: "spring",
            bounce: 0.2,
            duration: 0.4
          }}
        >
          {/* Dimension Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -top-7 left-0 bg-lime-500 text-black text-[10px] px-1.5 py-0.5 rounded-sm flex items-center gap-1 font-mono font-bold whitespace-nowrap"
          >
            <div className="flex items-center">
                <SlidingNumber value={Math.round(hoveredRect.width)} />
                <span className="ml-0.5">px</span>
            </div>
            <span className="opacity-60">×</span>
            <div className="flex items-center">
                <SlidingNumber value={Math.round(hoveredRect.height)} />
                <span className="ml-0.5">px</span>
            </div>
          </motion.div>
          
          {/* Corner Handles (Visual Decoration) */}
          <div className="absolute -top-1 -left-1 w-2 h-2 bg-white border border-lime-500 rounded-full" />
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-white border border-lime-500 rounded-full" />
          <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white border border-lime-500 rounded-full" />
          <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-white border border-lime-500 rounded-full" />
        </motion.div>
      )}
    </AnimatePresence>
  );
});

FigmaHoverInspector.displayName = "FigmaHoverInspector";
