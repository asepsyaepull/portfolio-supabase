"use client";
import React from "react";
import { cn } from "@/lib/utils";

/**
 * CSS-only replacement for the old Boxes component.
 *
 * The old implementation rendered 150×100 = 15,000 divs + 3,750 SVGs into the DOM,
 * which bloated the server-rendered HTML to ~2.3 MB and wrecked TTFB.
 *
 * This version reproduces the same skewed grid + plus-mark visual using pure CSS
 * background gradients — ZERO DOM nodes inside, same look, ~0 rendering cost.
 */
export const BoxesCore = ({ className, ...rest }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      style={{
        transform: `translate(-45%,-60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)`,
      }}
      className={cn(
        "absolute left-1/4 p-4 -top-1/4 flex -z-10 w-full h-full pointer-events-none",
        className
      )}
      {...rest}
    >
      {/* Grid lines */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(71,85,105,0.25) 1px, transparent 1px), linear-gradient(to bottom, rgba(71,85,105,0.25) 1px, transparent 1px)",
          backgroundSize: "64px 32px",
        }}
      />
      {/* Plus marks at intersections */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M12 6v12m6-6H6'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 64px",
          backgroundRepeat: "repeat",
          opacity: 0.5,
        }}
      />
    </div>
  );
};

export const Boxes = React.memo(BoxesCore);
