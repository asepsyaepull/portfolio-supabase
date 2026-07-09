"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { cn } from "@/lib/utils";

export interface SmoothTypingTextProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  duration?: number; // Pause duration in ms
  className?: string;
  textClassName?: string;
}

export function SmoothTypingText({
  words,
  typingSpeed = 80,
  deletingSpeed = 40,
  duration = 2000,
  className,
  textClassName,
}: SmoothTypingTextProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const fullWord = words[currentWordIndex];

    if (isPaused) {
      timeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, duration);
      return () => clearTimeout(timeout);
    }

    if (isDeleting) {
      if (currentText === "") {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      } else {
        timeout = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1));
        }, deletingSpeed);
      }
    } else {
      if (currentText === fullWord) {
        setIsPaused(true);
      } else {
        timeout = setTimeout(() => {
          setCurrentText(fullWord.slice(0, currentText.length + 1));
        }, typingSpeed);
      }
    }

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, isPaused, currentWordIndex, words, typingSpeed, deletingSpeed, duration]);

  return (
    <div className={cn("inline-flex items-center", className)}>
      <div className={cn("relative flex items-center h-8 md:h-10 px-1 overflow-hidden", textClassName)}>
        <div className="flex items-center min-w-0">
          <AnimatePresence>
            {currentText.split("").map((char, index) => (
              <motion.span
                key={`${currentWordIndex}-${index}`}
                initial={{ opacity: 0, y: 8, filter: "blur(2px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -4, filter: "blur(1px)", transition: { duration: 0.1 } }}
                transition={{
                  duration: 0.22,
                  ease: "easeOut",
                }}
                className="inline-block whitespace-pre shrink-0"
              >
                {char}
              </motion.span>
            ))}
          </AnimatePresence>
          
          {/* Glowing Smart Cursor Bar */}
          <motion.div
            className="w-[2px] h-[1.1em] bg-lime-500 shadow-[0_0_8px_#84cc16] shrink-0 ml-1"
            animate={isPaused ? { opacity: [1, 1, 0, 0] } : { opacity: 1 }}
            transition={
              isPaused
                ? {
                    duration: 0.8,
                    repeat: Infinity,
                    times: [0, 0.5, 0.5, 1],
                  }
                : {}
            }
          />
        </div>
      </div>
    </div>
  );
}
