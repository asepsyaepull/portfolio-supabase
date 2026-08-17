"use client";

import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { SmoothTypingText } from "@/components/ui/smooth-typing-text";
import { motion } from "framer-motion";
import { IconArrowUpRight, IconChevronRight, IconMapPin } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { memo, useEffect, useRef, useState } from "react";
import { FigmaHoverInspector } from "./figma-inspector";

const TYPEWRITER_WORDS = [
  "pixel-perfect",
  "scalable",
  "user-centered",
  "high-performance",
  "accessible",
];

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  if (!isMounted) return <div className="min-h-screen bg-gray-950" />;

  return (
    <div
      ref={containerRef}
      className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden selection:bg-lime-500/30"
    >
      {/* ── Background Layer ── */}
      <div className="absolute inset-0 z-0">
        {/* Base dark color */}
        <div className="absolute inset-0 bg-gray-950" />

        {/* Background image */}
        <Image
          src="/assets/images/hero-bg.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-60 pointer-events-none"
          aria-hidden="true"
        />

        {/* Radial gradient overlay for depth */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 30%, rgba(132,204,22,0.06) 0%, transparent 70%)",
          }}
        />

        {/* Bottom fade to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-gray-950 to-transparent pointer-events-none" />
      </div>

      {/* Figma-style Inspector Overlay */}
      <FigmaHoverInspector containerRef={containerRef} />

      {/* ── Centered Content ── */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative z-20 flex flex-col items-center text-center w-full max-w-[978px] mx-auto px-6 sm:px-8 md:px-12"
      >
        {/* Trust / Status Badge */}
        <motion.div variants={itemVariants} className="mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-500" />
            </span>
            <span className="text-[11px] sm:text-xs font-bold text-zinc-300 uppercase tracking-[0.2em]">
              Available for Work
            </span>
            <span className="w-px h-3 bg-white/10" />
            <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs text-zinc-500 font-medium">
              <IconMapPin className="w-3 h-3" />
              Jakarta, ID
            </span>
          </div>
        </motion.div>

        {/* Massive Centered Heading */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-7xl md:text-[5.5rem] lg:text-[6.5rem] font-black tracking-tighter text-white leading-[0.92] uppercase"
          style={{ fontFamily: "'Inter Tight', 'Inter', system-ui, sans-serif" }}
        >
          <span className="block">Design</span>
          <span className="block">
            <span className="text-lime-500 italic font-mono font-light">&</span>{" "}
            Engineering
            <span className="text-lime-500">.</span>
          </span>
        </motion.h1>

        {/* Subtitle with Typewriter */}
        <motion.div variants={itemVariants} className="mt-6 sm:mt-8 max-w-xl mx-auto">
          <p className="text-base sm:text-lg md:text-xl text-zinc-400 leading-relaxed">
            I craft{" "}
            <SmoothTypingText
              words={TYPEWRITER_WORDS}
              className="inline-flex"
              textClassName="text-lime-400 font-semibold h-7 sm:h-8 md:h-9"
              typingSpeed={70}
              deletingSpeed={35}
              duration={2200}
            />{" "}
            <br className="hidden sm:block" />
            digital experiences for businesses worldwide.
          </p>
        </motion.div>

        {/* Dual CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center gap-4"
        >
          {/* Primary CTA */}
          <Link href="/projects">
            <HoverBorderGradient
              containerClassName="rounded-full shadow-lg shadow-lime-500/20"
              as="div"
              className="bg-lime-500 text-black flex items-center space-x-2 px-7 sm:px-9 py-3.5 sm:py-4 font-bold text-sm transition-all hover:scale-[1.03] active:scale-[0.97]"
            >
              <span>View Work</span>
              <IconChevronRight className="ml-1 h-4 w-4 sm:h-5 sm:w-5" />
            </HoverBorderGradient>
          </Link>

          {/* Secondary CTA */}
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2.5 px-7 sm:px-9 py-3.5 sm:py-4 rounded-full border border-white/15 hover:border-lime-500/50 bg-white/[0.03] hover:bg-lime-500/[0.06] text-white font-bold text-sm transition-all duration-300 active:scale-[0.97]"
          >
            <span>Get in Touch</span>
            <IconArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-lime-400 transition-colors duration-300" />
          </Link>
        </motion.div>
      </motion.div>

      {/* ── Scroll Indicator ── */}
      <motion.button
        aria-label="Scroll to next section"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.8, ease: "easeOut" }}
        className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center gap-2 cursor-pointer group z-20 opacity-50 hover:opacity-100 transition-opacity duration-300"
        onClick={() => {
          const nextSection = document.getElementById("skills-section");
          if (nextSection) {
            nextSection.scrollIntoView({ behavior: "smooth" });
          }
        }}
      >
        <div className="w-5 h-9 md:w-6 md:h-10 rounded-full border border-zinc-700 group-hover:border-lime-500/50 flex justify-center p-1 md:p-1.5 bg-zinc-950/50 backdrop-blur-sm transition-colors duration-300 relative overflow-hidden">
          <motion.div
            animate={{
              y: [0, 12],
              opacity: [1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
            className="w-1.5 h-1.5 rounded-full bg-lime-500 shadow-[0_0_6px_#84cc16]"
          />
        </div>

        <span className="text-[8px] md:text-[9px] uppercase tracking-[0.3em] pl-[0.3em] text-zinc-600 group-hover:text-lime-400 font-bold transition-colors duration-300 select-none text-center">
          Scroll
        </span>
      </motion.button>
    </div>
  );
};

export default memo(Hero);
