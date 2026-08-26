"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Pure CSS minimal window mockup fallback when image is missing.
 */
export function MockWindowFallback({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative z-[1] w-[78%] overflow-hidden rounded-[10px] border border-ink/15 bg-white shadow-[0_20px_50px_-32px_rgba(20,19,16,0.32)]",
        className
      )}
    >
      <div className="flex gap-1.5 border-b border-ink/10 bg-[#F1F6FA] px-3 py-2">
        <span className="block h-2 w-2 rounded-full bg-ink-faint/40" />
        <span className="block h-2 w-2 rounded-full bg-ink-faint/40" />
        <span className="block h-2 w-2 rounded-full bg-ink-faint/40" />
      </div>
      <div className="flex flex-col gap-2 p-4">
        <div className="h-2.5 w-3/5 rounded-full bg-canvas" />
        <div className="h-2.5 w-4/5 rounded-full bg-grid" />
        <div className="mt-1.5 flex gap-2">
          <div className="h-[52px] flex-1 rounded-lg bg-brand" />
          <div className="h-[52px] flex-1 rounded-lg bg-grid" />
          <div className="h-[52px] flex-1 rounded-lg bg-grid" />
        </div>
      </div>
    </div>
  );
}

interface LaptopMockupProps {
  src?: string | null;
  alt: string;
  className?: string;
  fallback?: React.ReactNode;
}

/**
 * Laptop Bezel + Base Mockup for project preview
 */
export function LaptopMockup({
  src,
  alt,
  className,
  fallback,
}: LaptopMockupProps) {
  const [failed, setFailed] = useState(false);
  const showImage = !!src && !failed;

  return (
    <div className={cn("px-6 pt-6 md:px-9 md:pt-9", className)}>
      {/* Bezel */}
      <div className="rounded-t-[14px] border-[1.5px] border-b-0 border-ink bg-ink p-2 pb-0">
        <div className="relative aspect-[16/9] overflow-hidden rounded-t-[7px] bg-[#F1F6FA]">
          {showImage ? (
            <Image
              src={src!}
              alt={alt}
              fill
              sizes="(max-width: 768px) 85vw, 70vw"
              className="object-cover"
              onError={() => setFailed(true)}
            />
          ) : (
            <div className="flex h-full items-center justify-center overflow-hidden bg-[linear-gradient(#14202b0d_1px,transparent_1px),linear-gradient(90deg,#14202b0d_1px,transparent_1px)] [background-size:22px_22px]">
              {fallback ?? <MockWindowFallback />}
            </div>
          )}
        </div>
      </div>
      {/* Base */}
      <div className="relative -mx-4 h-[13px] rounded-b-[12px] border-[1.5px] border-t-0 border-ink bg-ink md:-mx-6">
        <span className="absolute left-1/2 top-0 h-[5px] w-16 -translate-x-1/2 rounded-b-md bg-[#2a3946]" />
      </div>
    </div>
  );
}
