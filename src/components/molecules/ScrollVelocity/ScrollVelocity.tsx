'use client';
import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";

interface VelocityMapping {
  input: [number, number];
  output: [number, number];
}

// Interface TextItem dengan opsi gap
interface TextItem {
  content: string;
  className?: string;
  velocity?: number;
  direction?: "left" | "right";
  gap?: string; // Gap setelah item ini
}

interface VelocityTextProps {
  children: React.ReactNode | React.ReactElement | ((item: TextItem) => React.ReactNode);
  item?: TextItem; // Item data yang digunakan untuk render function
  baseVelocity: number;
  scrollContainerRef?: React.RefObject<HTMLElement>;
  className?: string;
  damping?: number;
  stiffness?: number;
  numCopies?: number;
  velocityMapping?: VelocityMapping;
  parallaxClassName?: string;
  scrollerClassName?: string;
  parallaxStyle?: React.CSSProperties;
  scrollerStyle?: React.CSSProperties;
  gap?: string;
}

interface ScrollVelocityProps {
  scrollContainerRef?: React.RefObject<HTMLElement>;
  texts: TextItem[] | string[];
  defaultVelocity?: number;
  className?: string;
  damping?: number;
  stiffness?: number;
  numCopies?: number;
  velocityMapping?: VelocityMapping;
  parallaxClassName?: string;
  scrollerClassName?: string;
  parallaxStyle?: React.CSSProperties;
  scrollerStyle?: React.CSSProperties;
  defaultGap?: string;
  containerClassName?: string;
  singleRow?: boolean;
  itemSpacing?: string;
  children?: (item: TextItem) => React.ReactNode; // Render function
}

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

function useElementWidth(ref: React.RefObject<HTMLElement>): number {
  const [width, setWidth] = useState(0);

  useIsomorphicLayoutEffect(() => {
    function updateWidth() {
      if (ref.current) {
        setWidth(ref.current.offsetWidth);
      }
    }
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [ref]);

  return width;
}

function VelocityText({
  children,
  item,
  baseVelocity = 100,
  scrollContainerRef,
  className = "",
  damping,
  stiffness,
  numCopies,
  velocityMapping,
  parallaxClassName,
  scrollerClassName,
  parallaxStyle,
  scrollerStyle,
  gap = "",
}: VelocityTextProps) {
  const baseX = useMotionValue(0);
  const scrollOptions = scrollContainerRef
    ? { container: scrollContainerRef }
    : {};
  const { scrollY } = useScroll(scrollOptions);
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: damping ?? 50,
    stiffness: stiffness ?? 400,
  });
  const velocityFactor = useTransform(
    smoothVelocity,
    velocityMapping?.input || [0, 1000],
    velocityMapping?.output || [0, 5],
    { clamp: false },
  );

  const copyRef = useRef<HTMLSpanElement>(null);
  const copyWidth = useElementWidth(copyRef);

  function wrap(min: number, max: number, v: number): number {
    const range = max - min;
    const mod = (((v - min) % range) + range) % range;
    return mod + min;
  }

  const x = useTransform(baseX, (v) => {
    if (copyWidth === 0) return "0px";
    return `${wrap(-copyWidth, 0, v)}px`;
  });

  const directionFactor = useRef<number>(1);
  useAnimationFrame((_t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  const spans = [];
  for (let i = 0; i < (numCopies || 6); i++) {
    spans.push(
      <span
        className={`flex-shrink-0 ${className}`}
        key={i}
        ref={i === 0 ? copyRef : null}
      >
        {typeof children === "function" && item ? children(item) : children as React.ReactNode}
      </span>,
    );
  }

  return (
    <div
      className={`${parallaxClassName || ""} relative overflow-hidden ${gap}`}
      style={parallaxStyle}
    >
      <motion.div
        className={`${scrollerClassName || ""} flex whitespace-nowrap text-center font-sans text-4xl font-bold tracking-[-0.02em] drop-shadow md:text-[5rem] md:leading-[5rem]`}
        style={{ x, ...scrollerStyle }}
      >
        {spans}
      </motion.div>
    </div>
  );
}

export const ScrollVelocity: React.FC<ScrollVelocityProps> = ({
  scrollContainerRef,
  texts = [],
  defaultVelocity = 100,
  className = "",
  damping = 50,
  stiffness = 400,
  numCopies = 6,
  velocityMapping = { input: [0, 1000], output: [0, 5] },
  parallaxClassName = "",
  scrollerClassName = "",
  parallaxStyle,
  scrollerStyle,
  defaultGap = "mb-4",
  containerClassName = "",
  singleRow = true,
  itemSpacing = "mr-6",
  children,
}) => {
  // Helper function untuk memeriksa apakah item adalah TextItem
  const isTextItem = (item: any): item is TextItem => {
    return typeof item === 'object' && item !== null && 'content' in item;
  };

  // Fungsi untuk mempersiapkan data teks
  const prepareTextItems = () => {
    try {
      return texts.map((textItem, index) => {
        const content = isTextItem(textItem) ? String(textItem.content || '') : String(textItem || '');
        const itemClass = isTextItem(textItem) ? textItem.className || className : className;
        const velocity = isTextItem(textItem) ? textItem.velocity || defaultVelocity : defaultVelocity;
        const direction = isTextItem(textItem) && textItem.direction
          ? textItem.direction
          : (index % 2 !== 0 ? "right" : "left");
        // Gunakan gap yang ditentukan atau itemSpacing untuk mode satu baris
        const gap = isTextItem(textItem) && textItem.gap
          ? textItem.gap
          : (singleRow ? itemSpacing : defaultGap);

        return {
          content,
          className: itemClass,
          velocity,
          direction,
          gap
        };
      });
    } catch (error) {
      console.error("Error preparing text items:", error);
      // Return fallback
      return [{
        content: "Text placeholder",
        className,
        velocity: defaultVelocity,
        direction: "left" as const,
        gap: singleRow ? itemSpacing : defaultGap
      }];
    }
  };

  const textItems = prepareTextItems();

  // Jika singleRow true, render semua item dalam satu baris horizontal
  if (singleRow) {
    return (
      <div className={`w-full ${containerClassName} flex flex-row flex-nowrap items-center overflow-hidden`}>
        {textItems.map((item, index) => {
          const calculatedVelocity = item.direction === "right"
            ? -Math.abs(item.velocity!)
            : Math.abs(item.velocity!);

          const itemGap = index === textItems.length - 1 && item.gap === itemSpacing ? "" : item.gap;

          return (
            <div key={index} className={`flex-none ${itemGap}`}>
              <VelocityText
                item={item} // Pass item untuk render function
                className={item.className}
                baseVelocity={calculatedVelocity}
                scrollContainerRef={scrollContainerRef}
                damping={damping}
                stiffness={stiffness}
                numCopies={numCopies}
                velocityMapping={velocityMapping}
                parallaxClassName={parallaxClassName}
                scrollerClassName={scrollerClassName}
                parallaxStyle={parallaxStyle}
                scrollerStyle={scrollerStyle}
              >
                {children ? children(item) : `${item.content}`}
              </VelocityText>
            </div>
          );
        })}
      </div>
    );
  }

  // Mode vertikal/default (untuk backward compatibility)
  return (
    <div className={`w-full ${containerClassName} flex flex-col`}>
      {textItems.map((item, index) => {
        const calculatedVelocity = item.direction === "right"
          ? -Math.abs(item.velocity!)
          : Math.abs(item.velocity!);

        return (
          <VelocityText
            key={index}
            className={item.className}
            baseVelocity={calculatedVelocity}
            scrollContainerRef={scrollContainerRef}
            damping={damping}
            stiffness={stiffness}
            numCopies={numCopies}
            velocityMapping={velocityMapping}
            parallaxClassName={parallaxClassName}
            scrollerClassName={scrollerClassName}
            parallaxStyle={parallaxStyle}
            scrollerStyle={scrollerStyle}
            gap={item.gap}
          >
            {item.content}&nbsp;
          </VelocityText>
        );
      })}
    </div>
  );
};

export default ScrollVelocity;
