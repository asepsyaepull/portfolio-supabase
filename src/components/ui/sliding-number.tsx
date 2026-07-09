"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SlidingNumberProps {
  value: number;
  className?: string;
}

export const SlidingNumber = ({ value, className }: SlidingNumberProps) => {
  const digits = Math.abs(value).toString().split("");

  return (
    <div className={`flex overflow-hidden ${className}`}>
      {digits.map((digit, index) => (
        <Digit key={`${index}-${digit}`} digit={digit} />
      ))}
    </div>
  );
};

const Digit = ({ digit }: { digit: string }) => {
  return (
    <div className="relative h-[1em] w-[0.6em] flex items-center justify-center">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={digit}
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="absolute"
        >
          {digit}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};
