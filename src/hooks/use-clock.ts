"use client";

import { useEffect, useState } from "react";

interface UseClockOptions {
  timeZone?: string;
  hour12?: boolean;
  format?: "hh:mm:ss" | "hh:mm";
}

/**
 * Hook for live realtime clock tracking.
 * Defaults to Asia/Jakarta (WIB) with 24-hour format.
 */
export function useClock(options: UseClockOptions = {}) {
  const {
    timeZone = "Asia/Jakarta",
    hour12 = false,
    format = "hh:mm:ss",
  } = options;

  const [time, setTime] = useState<string>("--:--:--");

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-GB", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      ...(format === "hh:mm:ss" ? { second: "2-digit" } : {}),
      hour12,
    });

    const update = () => setTime(formatter.format(new Date()));
    update();

    const intervalId = setInterval(update, 1000);
    return () => clearInterval(intervalId);
  }, [timeZone, hour12, format]);

  return time;
}

export default useClock;
