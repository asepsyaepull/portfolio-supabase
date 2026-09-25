"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * ScrollReset Component
 *
 * Ensures that whenever a user navigates between pages or returns to a previously visited page
 * (via navigation links, breadcrumbs, or browser Back/Forward buttons), the scroll position
 * is cleanly and reliably reset to 0 (top of the page).
 */
export function ScrollReset() {
  const pathname = usePathname();
  const prevPathnameRef = useRef<string | null>(null);

  // 1. Ensure browser history scroll restoration is always disabled (set to 'manual')
  useEffect(() => {
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const handlePopState = () => {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }

      // Check if there is an in-page hash anchor (e.g. #selected-work)
      const hash = window.location.hash;
      if (hash) {
        try {
          const target = document.querySelector(hash);
          if (target) {
            target.scrollIntoView({ behavior: "smooth" });
            return;
          }
        } catch {
          // Ignore invalid selector
        }
      }

      // Reset scroll on browser Back / Forward buttons
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      });
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // 2. Reset scroll to top on pathname change (route transitions)
  useEffect(() => {
    // Only scroll to top if pathname has changed or on initial mount
    const isInitialMount = prevPathnameRef.current === null;
    const hasPathChanged = prevPathnameRef.current !== pathname;
    prevPathnameRef.current = pathname;

    // If there's an in-page hash anchor on initial mount or transition, scroll to it
    if (typeof window !== "undefined" && window.location.hash) {
      try {
        const target = document.querySelector(window.location.hash);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
          return;
        }
      } catch {
        // Fallback to top if hash is invalid
      }
    }

    const resetToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    // Immediate scroll reset
    resetToTop();

    // Re-check on next animation frame and after short microtasks to catch async layout reflows
    const frameId = requestAnimationFrame(() => {
      resetToTop();
    });

    const timerId = setTimeout(() => {
      resetToTop();
    }, 50);

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(timerId);
    };
  }, [pathname]);

  return null;
}

export default ScrollReset;
