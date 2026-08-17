"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { IconBrandFigma, IconBrandReact } from "@tabler/icons-react";
import { IconGitFork } from "@tabler/icons-react";

export const StylizedProfile = () => {
  return (
    <div className="relative w-full h-[600px] flex items-center justify-center overflow-visible">
      {/* Central Glow Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-lime-500/20 dark:bg-lime-500/10 rounded-full blur-[120px] pointer-events-none transition-colors" />

      {/* Orbiting Rings */}
      {[1, 2, 3].map((ring) => (
        <motion.div
          key={ring}
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 10 + ring * 5,
            repeat: Infinity,
            ease: "linear"
          }}
          className={cn(
            "absolute border border-dashed rounded-full pointer-events-none transition-colors",
            ring === 1 && "w-[300px] h-[300px] border-lime-500/30 dark:border-lime-500/20",
            ring === 2 && "w-[420px] h-[420px] border-zinc-300 dark:border-zinc-800",
            ring === 3 && "w-[550px] h-[550px] border-zinc-200 dark:border-white/5"
          )}
        />
      ))}

      {/* Main Profile Container */}
      <div className="relative z-10 w-[280px] h-[340px] md:w-[320px] md:h-[400px]">
        {/* Geometric Frame Elements */}
        <div className="absolute -inset-4 border-2 border-lime-500/40 dark:border-lime-500/30 rounded-[2.5rem] rotate-3 pointer-events-none transition-colors" />
        <div className="absolute -inset-4 border border-zinc-300 dark:border-white/10 rounded-[2.5rem] -rotate-3 pointer-events-none transition-colors" />

        {/* Profile Image with Clipping/Mask */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative w-full h-full rounded-[2rem] overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 group transition-colors"
        >
          <Image
            src="/assets/images/profile.webp"
            alt="Asep Syaepul Rohman"
            fill
            priority
            sizes="(max-width: 768px) 280px, 320px"
            className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
          />

          {/* Subtle Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/80 dark:from-gray-950/80 via-transparent to-transparent opacity-80 dark:opacity-60 transition-colors" />

          {/* Floating Data Badge inside frame */}
          <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-white/60 dark:bg-white/5 backdrop-blur-md border border-white/40 dark:border-white/10 transition-colors shadow-lg dark:shadow-none">
             <div className="flex items-center gap-2 mb-1">
                <div className="w-1.5 h-1.5 rounded-full bg-lime-600 dark:bg-lime-500 animate-pulse" />
                <span className="text-[10px] font-black text-zinc-600 dark:text-zinc-300 uppercase tracking-widest transition-colors">UI/UX Developer</span>
             </div>
             <div className="text-sm font-bold text-zinc-900 dark:text-white transition-colors">Focus on UX, UI, & Design System</div>
          </div>
        </motion.div>

        {/* Orbiting UI Badges */}
        <OrbitingBadge
          icon={<IconBrandFigma className="w-4 h-4 text-[#F24E1E]" />}
          label="UI/UX"
          angle={45}
          radius={180}
          delay={0}
        />
        <OrbitingBadge
          icon={<IconBrandReact className="w-4 h-4 text-[#61DAFB]" />}
          label="React"
          angle={180}
          radius={220}
          delay={1}
        />
        <OrbitingBadge
          icon={<IconGitFork className="w-4 h-4 text-lime-500" />}
          label="Strategy"
          angle={300}
          radius={200}
          delay={2}
        />
      </div>

      {/* Abstract Floating Shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-visible">
         <FloatingShape className="top-1/4 right-0 w-12 h-12 text-lime-500/40 dark:text-lime-500/20 transition-colors" />
         <FloatingShape className="bottom-1/3 left-0 w-16 h-16 text-zinc-300 dark:text-zinc-800 transition-colors" delay={1} />
         <FloatingDot className="top-[10%] left-[20%]" />
         <FloatingDot className="bottom-[15%] right-[10%]" delay={1.5} />
      </div>
    </div>
  );
};

const OrbitingBadge = ({ icon, label, angle, radius, delay }: {
  icon: React.ReactNode,
  label: string,
  angle: number,
  radius: number,
  delay: number
}) => {
  const radian = (angle * Math.PI) / 180;
  const x = Math.cos(radian) * radius;
  const y = Math.sin(radian) * radius;

  return (
    <motion.div
      initial={{ opacity: 0, x: 0, y: 0 }}
      animate={{
        opacity: 1,
        x: [x, x + 10, x],
        y: [y, y - 10, y]
      }}
      transition={{
        opacity: { duration: 0.5, delay },
        y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        x: { duration: 5, repeat: Infinity, ease: "easeInOut" }
      }}
      className="absolute top-1/2 left-1/2 flex items-center gap-2 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200 dark:border-white/10 px-3 py-1.5 rounded-full shadow-xl transition-colors"
    >
      {icon}
      <span className="text-[10px] font-bold text-zinc-800 dark:text-white whitespace-nowrap transition-colors">{label}</span>
    </motion.div>
  );
};

const FloatingShape = ({ className, delay = 0 }: { className?: string, delay?: number }) => (
  <motion.div
    animate={{
      y: [0, -20, 0],
      rotate: [0, 45, 0]
    }}
    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay }}
    className={cn("absolute", className)}
  >
     <svg viewBox="0 0 100 100" fill="currentColor">
        <rect x="25" y="25" width="50" height="50" rx="12" fill="none" stroke="currentColor" strokeWidth="4" />
     </svg>
  </motion.div>
);

const FloatingDot = ({ className, delay = 0 }: { className?: string, delay?: number }) => (
  <motion.div
    animate={{ opacity: [0.2, 1, 0.2] }}
    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay }}
    className={cn("absolute w-2 h-2 bg-lime-500 rounded-full blur-[2px]", className)}
  />
);
