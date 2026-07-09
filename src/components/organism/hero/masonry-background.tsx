"use client";
import React, { memo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

const COMPONENT_IMAGES = [
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1531403001884-4857956b7f9b?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1542744094-3a31f272c490?q=80&w=800&auto=format&fit=crop",
];

const Row = ({ images, speed, direction = 1 }: { images: string[], speed: number, direction?: 1 | -1 }) => {
  return (
    <div className="flex gap-4 overflow-hidden whitespace-nowrap">
      <motion.div
        animate={{
          x: direction === 1 ? [0, -1000] : [-1000, 0],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex gap-4"
      >
        {[...images, ...images, ...images].map((src, i) => (
          <div
            key={i}
            className="relative w-[350px] h-[220px] flex-shrink-0 rounded-xl overflow-hidden border border-white/5 bg-zinc-900/50"
          >
            <Image
              src={src}
              alt="UI Component"
              fill
              className="object-cover opacity-20 grayscale transition-all duration-700"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export const MasonryBackground = memo(() => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="flex flex-col gap-4 rotate-[-12deg] scale-125 translate-y-[-10%] opacity-30">
        <Row images={COMPONENT_IMAGES.slice(0, 3)} speed={40} />
        <Row images={COMPONENT_IMAGES.slice(3, 6)} speed={50} direction={-1} />
        <Row images={COMPONENT_IMAGES.slice(6, 9)} speed={35} />
        <Row images={COMPONENT_IMAGES.slice(1, 4)} speed={45} direction={-1} />
        <Row images={COMPONENT_IMAGES.slice(4, 7)} speed={30} />
      </div>
      
      {/* Radial Gradient Mask */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-transparent to-gray-950 z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-transparent to-gray-950 z-[1]" />
      <div 
        className="absolute inset-0 z-[2]" 
        style={{
          background: "radial-gradient(circle at center, transparent 0%, rgba(3, 7, 18, 0.8) 70%, rgba(3, 7, 18, 1) 100%)"
        }}
      />
    </div>
  );
});

MasonryBackground.displayName = "MasonryBackground";
