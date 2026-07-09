"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-10 h-10" />; // Placeholder to prevent layout shift
  }

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <button
      onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
      className="relative flex items-center justify-center w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-700"
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{
          scale: currentTheme === "dark" ? 1 : 0,
          opacity: currentTheme === "dark" ? 1 : 0,
          rotate: currentTheme === "dark" ? 0 : -90,
        }}
        transition={{ duration: 0.2 }}
        className="absolute"
      >
        <Moon className="w-5 h-5" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{
          scale: currentTheme === "light" ? 1 : 0,
          opacity: currentTheme === "light" ? 1 : 0,
          rotate: currentTheme === "light" ? 0 : 90,
        }}
        transition={{ duration: 0.2 }}
        className="absolute"
      >
        <Sun className="w-5 h-5" />
      </motion.div>
    </button>
  );
}
