"use client";
import React from "react";
import { Boxes } from "@/components/ui/background-boxes";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function CtaSection() {
  return (
    <div className="h-96 relative w-full overflow-hidden bg-zinc-50 dark:bg-gray-950 flex flex-col items-center justify-center transition-colors duration-300">
      <div className="absolute inset-0 w-full h-full bg-zinc-50 dark:bg-gray-950 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none transition-colors duration-300" />

      <Boxes />
      <div className="relative z-30 px-4">
        <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={cn("md:text-5xl text-3xl font-bold text-zinc-900 dark:text-white text-center transition-colors")}
        >
            Ready to <span className="text-lime-600 dark:text-lime-500 transition-colors">Collaborate?</span>
        </motion.h1>
        <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center mt-4 text-zinc-600 dark:text-zinc-400 max-w-lg mx-auto transition-colors"
        >
            Whether you have a fully-formed idea or just a spark of inspiration,
            I'm here to help you bring it to life with clean code and exceptional design.
        </motion.p>

        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center mt-10"
        >
            <Link href="/contact">
                <HoverBorderGradient
                    containerClassName="rounded-full"
                    as="button"
                    className="bg-white dark:bg-gray-950 text-lime-600 dark:text-lime-500 flex items-center space-x-2 px-8 py-4 font-bold transition-colors"
                >
                    <span>LET'S GET STARTED</span>
                    <ArrowRight className="ml-2 h-5 w-5" />
                </HoverBorderGradient>
            </Link>
        </motion.div>
      </div>
    </div>
  );
}
