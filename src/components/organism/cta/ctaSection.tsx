"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { IconArrowRight } from "@tabler/icons-react";
import Link from "next/link";

export function CtaSection() {
  return (
    <div className="py-28 md:py-36 relative w-full overflow-hidden bg-zinc-50 dark:bg-gray-950 flex flex-col items-center justify-center transition-colors duration-300 border-t border-zinc-200/80 dark:border-zinc-900">
      <div className="relative z-10 px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={cn("text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white transition-colors")}
        >
          Ready to <span className="text-lime-600 dark:text-lime-400 italic font-medium transition-colors">collaborate?</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-4 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-md mx-auto transition-colors leading-relaxed"
        >
          Whether starting from scratch or scaling an existing platform, let&apos;s build something exceptional together.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mt-8 sm:mt-10"
        >
          <Link href="/contact">
            <HoverBorderGradient
              containerClassName="rounded-full shadow-lg shadow-lime-500/20"
              as="div"
              className="bg-lime-500 text-black flex items-center space-x-2 px-8 py-3.5 sm:py-4 font-bold text-sm transition-all hover:scale-[1.03] active:scale-[0.97]"
            >
              <span>Get in Touch</span>
              <IconArrowRight className="ml-1 h-4 w-4 sm:h-5 sm:w-5" />
            </HoverBorderGradient>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
