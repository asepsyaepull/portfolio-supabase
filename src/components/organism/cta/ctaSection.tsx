"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { IconArrowRight } from "@tabler/icons-react";
import Link from "next/link";

export function CtaSection() {
  return (
    <div className="py-32 relative w-full overflow-hidden bg-zinc-50 dark:bg-gray-950 flex flex-col items-center justify-center transition-colors duration-300">
      <div className="relative z-10 px-4">
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
            className="text-center mt-4 text-zinc-700 dark:text-zinc-400 max-w-lg mx-auto transition-colors font-medium"
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
                    as="div"
                    className="bg-white dark:bg-gray-950 text-lime-600 dark:text-lime-500 flex items-center space-x-2 px-8 py-4 font-bold transition-colors"
                >
                    <span>LET'S TALK</span>
                    <IconArrowRight className="ml-2 h-5 w-5" />
                </HoverBorderGradient>
            </Link>
        </motion.div>
      </div>
    </div>
  );
}
