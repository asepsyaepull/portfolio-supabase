"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TypingFlipTextProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseBeforeDelete?: number;
  className?: string;
  textClassName?: string;
}

export function TypingFlipText({
  words,
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseBeforeDelete = 2000,
  className,
  textClassName,
}: TypingFlipTextProps) {
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
      }, pauseBeforeDelete);
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
  }, [currentText, isDeleting, isPaused, currentWordIndex, words, typingSpeed, deletingSpeed, pauseBeforeDelete]);

  // Cursor states: typing (pulsing blue/orange), deleting (red), paused (pulsing)
  const cursorColor = isDeleting ? "bg-red-500" : isPaused ? "bg-lime-500" : "bg-blue-500";
  const cursorPulse = isPaused ? "animate-pulse" : "";

  return (
    <div className={cn("inline-flex items-center gap-1", className)}>
      <div className={cn("relative flex items-center min-h-[1.5em]", textClassName)}>
        <AnimatePresence mode="popLayout">
          {currentText.split("").map((char, index) => (
            <motion.span
              key={`${currentWordIndex}-${index}`}
              initial={{ 
                opacity: 0, 
                rotateY: -90,
                filter: "blur(8px)"
              }}
              animate={{ 
                opacity: 1, 
                rotateY: 0,
                filter: "blur(0px)"
              }}
              exit={{ 
                opacity: 0, 
                rotateY: 90,
                filter: "blur(8px)",
                transition: { duration: 0.15 }
              }}
              transition={{
                duration: 0.3,
                ease: "easeOut"
              }}
              className="inline-block whitespace-pre"
              style={{ transformOrigin: "left center" }}
            >
              {char}
            </motion.span>
          ))}
        </AnimatePresence>
      </div>
      <motion.div
        layout
        className={cn(
          "w-2 h-[1em] rounded-sm transition-colors duration-300",
          cursorColor,
          cursorPulse
        )}
        animate={{
          scaleY: isDeleting ? 0.8 : 1,
          opacity: [1, 0.5, 1]
        }}
        transition={{
          opacity: { repeat: Infinity, duration: 0.8, ease: "linear" }
        }}
      />
    </div>
  );
}
