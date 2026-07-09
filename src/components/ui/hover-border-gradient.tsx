"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Direction = "TOP" | "LEFT" | "BOTTOM" | "RIGHT";

export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Tag = "button",
  duration = 3,
  clockwise = true,
  ...props
}: React.PropsWithChildren<
  {
    as?: React.ElementType;
    containerClassName?: string;
    className?: string;
    duration?: number;
    clockwise?: boolean;
    type?: "button" | "submit" | "reset";
  } & React.HTMLAttributes<HTMLElement>
>) {
  const [hovered, setHovered] = useState<boolean>(false);
  const [direction, setDirection] = useState<Direction>("TOP");

  const rotateDirection = (currentDirection: Direction): Direction => {
    const directions: Direction[] = ["TOP", "LEFT", "BOTTOM", "RIGHT"];
    const currentIndex = directions.indexOf(currentDirection);
    const nextIndex = clockwise
      ? (currentIndex - 1 + directions.length) % directions.length
      : (currentIndex + 1) % directions.length;
    return directions[nextIndex];
  };

  // Vibrant Lime 400 for better visibility on dark backgrounds
  const movingMap: Record<Direction, string> = {
    TOP: "radial-gradient(60% 100% at 50% 0%, #a3e635 0%, rgba(163, 230, 53, 0) 100%)",
    LEFT: "radial-gradient(100% 60% at 0% 50%, #a3e635 0%, rgba(163, 230, 53, 0) 100%)",
    BOTTOM:
      "radial-gradient(60% 100% at 50% 100%, #a3e635 0%, rgba(163, 230, 53, 0) 100%)",
    RIGHT:
      "radial-gradient(100% 60% at 100% 50%, #a3e635 0%, rgba(163, 230, 53, 0) 100%)",
  };

  const highlight =
    "radial-gradient(100% 200% at 50% 50%, #a3e635 0%, rgba(163, 230, 53, 0) 100%)";

  useEffect(() => {
    if (!hovered) {
      const interval = setInterval(() => {
        setDirection((prevState) => rotateDirection(prevState));
      }, (duration * 1000) / 4); // Divided by 4 for smoother movement through 4 points
      return () => clearInterval(interval);
    }
  }, [hovered, duration]);

  return (
    <Tag
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative flex content-center bg-black/20 hover:bg-black/10 transition duration-500 items-center justify-center overflow-visible p-px decoration-clone w-fit rounded-full",
        containerClassName
      )}
      {...props}
    >
      <div
        className={cn(
          "w-auto z-10 relative bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white px-4 py-2 rounded-[inherit] flex items-center justify-center transition-colors",
          className
        )}
      >
        {children}
      </div>
      <motion.div
        className={cn(
          "flex-none inset-0 overflow-hidden absolute z-0 rounded-[inherit]"
        )}
        style={{
          filter: "blur(2px)",
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
        initial={{ background: movingMap[direction] }}
        animate={{
          background: hovered
            ? [movingMap[direction], highlight]
            : movingMap[direction],
        }}
        transition={{ ease: "linear", duration: hovered ? 0.2 : (duration ?? 1) }}
      />
      <div className="bg-white dark:bg-zinc-950 absolute z-[1] flex-none inset-[2px] rounded-[inherit] transition-colors" />
    </Tag>
  );
}
