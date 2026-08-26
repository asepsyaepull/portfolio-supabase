"use client";

import React from "react";
import { useClock } from "@/hooks/use-clock";
import { cn } from "@/lib/utils";

interface LiveClockProps {
  suffix?: string;
  format?: "hh:mm:ss" | "hh:mm";
  className?: string;
}

/**
 * Realtime WIB Clock component utilizing useClock hook.
 */
export function LiveClock({
  suffix = "WIB",
  format = "hh:mm:ss",
  className,
}: LiveClockProps) {
  const time = useClock({ format });

  return (
    <span className={cn("tabular-nums font-mono", className)}>
      {time} {suffix && <span className="text-xs">{suffix}</span>}
    </span>
  );
}

export default LiveClock;
