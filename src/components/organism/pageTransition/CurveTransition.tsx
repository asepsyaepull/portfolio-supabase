"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// ── Curve SVG paths for the elegant transition ──────────────
function CurveSVG({ isEntering }: { isEntering: boolean }) {
  const initialPath = `M0 0 L${window.innerWidth} 0 L${window.innerWidth} ${window.innerHeight} Q${window.innerWidth / 2} ${window.innerHeight + 300} 0 ${window.innerHeight} Z`;
  const targetPath = `M0 0 L${window.innerWidth} 0 L${window.innerWidth} 0 Q${window.innerWidth / 2} 300 0 0 Z`;

  return (
    <svg
      className="absolute inset-0 w-full h-full"
      style={{ filter: "none" }}
    >
      <motion.path
        fill="#111111"
        initial={{ d: isEntering ? initialPath : targetPath }}
        animate={{ d: isEntering ? targetPath : initialPath }}
        transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      />
    </svg>
  );
}

// ── Main CurveTransition Component ──────────────────────────
export function CurveTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isAnimating, setIsAnimating] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const [displayText, setDisplayText] = useState("Hello!");

  // Map route to greeting text
  const routeText: Record<string, string> = {
    "/": "Welcome",
    "/about": "About Me",
    "/projects": "My Work",
    "/contact": "Let's Talk",
  };

  useEffect(() => {
    const text = routeText[pathname] ?? "Loading...";
    setDisplayText(text);
  }, [pathname]);

  return (
    <>
      {/* Initial page load overlay */}
      <AnimatePresence>
        {showOverlay && (
          <PageOverlay
            text={displayText}
            onComplete={() => setShowOverlay(false)}
          />
        )}
      </AnimatePresence>

      {/* Page content */}
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        {children}
      </motion.div>
    </>
  );
}

// ── Page Overlay with curve animation ───────────────────────
function PageOverlay({ text, onComplete }: { text: string; onComplete: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[999] bg-[#111111] flex items-center justify-center overflow-hidden"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, delay: 0.5 }}
      onAnimationComplete={onComplete}
    >
      {/* Curve bottom shape */}
      <motion.div
        className="absolute bottom-0 left-0 w-full"
        style={{ height: "40vh" }}
        initial={{ scaleY: 0, transformOrigin: "bottom" }}
        animate={{ scaleY: 1, transformOrigin: "bottom" }}
        exit={{ scaleY: 0, transformOrigin: "bottom" }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      >
        <svg
          viewBox="0 0 1440 400"
          className="absolute bottom-0 w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0 400 C360 0 1080 0 1440 400 L1440 400 L0 400 Z"
            fill="#111111"
          />
        </svg>
      </motion.div>

      {/* Hello text */}
      <motion.div
        className="relative z-10 text-center overflow-hidden"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
      >
        <motion.h2
          className="text-white font-cabinetGrotesk font-black"
          style={{
            fontSize: "clamp(2.5rem, 8vw, 6rem)",
            letterSpacing: "-0.02em",
          }}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-120%", opacity: 0 }}
          transition={{
            y: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
            opacity: { duration: 0.4 },
          }}
        >
          {text}
        </motion.h2>
      </motion.div>

      {/* Animated line below text */}
      <motion.div
        className="absolute bottom-[42vh] left-1/2 -translate-x-1/2 w-px bg-amber-400"
        initial={{ height: 0 }}
        animate={{ height: 60 }}
        exit={{ height: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      />
    </motion.div>
  );
}

export default CurveTransition;
