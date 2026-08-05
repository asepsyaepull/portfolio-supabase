"use client";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { SmoothTypingText } from "@/components/ui/smooth-typing-text";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { memo, useEffect, useRef, useState } from "react";
import { FigmaHoverInspector } from "./figma-inspector";
import { StylizedProfile } from "./stylized-profile";

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
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    };

    if (!isMounted) return <div className="min-h-screen bg-gray-950" />;

    return (
        <div
            ref={containerRef}
            className="min-h-[95vh] bg-zinc-50 dark:bg-gray-950 relative flex items-center justify-center overflow-hidden selection:bg-lime-500/30 transition-colors duration-300"
        >
            {/* Design System Grid Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(#d4d4d8_1px,transparent_1px)] dark:bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-50 dark:opacity-30 transition-colors duration-300" />

                {/* Subtle Radial Glows */}
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-lime-500/10 rounded-full blur-[140px] pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />
            </div>

            {/* Figma-style Inspector Overlay */}
            <FigmaHoverInspector containerRef={containerRef} />

            <div className="container mx-auto px-4 md:px-24 relative z-20 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                {/* Left Column - Text Content */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="flex flex-col items-start text-left w-full pt-20 md:pt-0 lg:col-span-7"
                >
                    {/* Status & Location Badge */}
                    <motion.div variants={itemVariants} className="mb-6 flex flex-wrap gap-3">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-lime-500/20 border border-lime-500/30 text-lime-700 dark:text-lime-400 text-[10px] font-bold tracking-widest uppercase transition-colors">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 dark:bg-lime-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-500"></span>
                            </span>
                            Available for work
                        </div>
                    </motion.div>

                    {/* Loud Typography Headline */}
                    <motion.h1
                        variants={itemVariants}
                        className="text-5xl md:text-[5.2rem] font-black tracking-tighter text-zinc-900 dark:text-white mb-4 leading-[0.95] uppercase transition-colors"
                    >
                        Design <br />
                        <span className="text-lime-600 dark:text-lime-500 italic font-serif normal-case">&</span> Engineering.
                    </motion.h1>

                    <motion.div variants={itemVariants} className="mt-6 mb-8 flex flex-col gap-5">
                        <p className="text-lg md:text-xl text-zinc-700 dark:text-zinc-300 max-w-xl leading-relaxed transition-colors">
                            Hi, I'm <span className="text-zinc-900 dark:text-white font-bold underline decoration-lime-500/50 decoration-2 underline-offset-4">Asep</span>. A <span className="text-zinc-900 dark:text-zinc-100 font-medium">Design Technologist & Frontend Engineer</span> blending pixel-perfect aesthetics with robust technical architecture. Over 7 years of crafting digital products.
                        </p>

                        <div className="flex flex-wrap items-center justify-start gap-3">
                            <span className="text-zinc-500 dark:text-zinc-500 text-[10px] uppercase tracking-[0.2em] font-black transition-colors">Core Stack</span>
                            <SmoothTypingText
                                words={["React.js & Next.js", "TypeScript", "Tailwind CSS", "Figma (Advanced)", "Design Systems"]}
                                className="bg-white/80 dark:bg-zinc-900/80 border border-zinc-200 dark:border-white/10 rounded-xl px-4 py-2 shadow-xl shadow-lime-500/5 min-w-[240px] transition-colors"
                                textClassName="text-lime-600 dark:text-lime-500 text-sm font-bold tracking-widest transition-colors"
                                typingSpeed={100}
                                deletingSpeed={45}
                                duration={2500}
                            />
                        </div>
                    </motion.div>

                    {/* Actions & Social Proof */}
                    <motion.div variants={itemVariants} className="flex flex-col gap-10 w-full">
                        <div className="flex flex-wrap items-center justify-start gap-4">
                            <Link href="/projects">
                                <HoverBorderGradient
                                    containerClassName="rounded-full shadow-lg shadow-lime-500/20"
                                    as="div"
                                    className="bg-lime-500 text-black flex items-center space-x-2 px-8 py-4 font-bold text-sm transition-all hover:scale-[1.05] active:scale-[0.98]"
                                >
                                    <span>View My Work</span>
                                    <ChevronRight className="ml-1 h-5 w-5" />
                                </HoverBorderGradient>
                            </Link>

                            <Link
                                href="/contact"
                                className="text-zinc-700 dark:text-zinc-200 font-bold text-sm flex items-center gap-3 px-8 py-4 rounded-full border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/5 hover:bg-zinc-50 dark:hover:bg-white/10 transition-all active:scale-[0.98] shadow-sm"
                            >
                                <span>Get in touch</span>
                                <div className="w-2 h-2 rounded-full bg-lime-500 animate-pulse" />
                            </Link>
                        </div>

                        {/* Social Proof Stats from Resume */}
                        <div className="flex flex-wrap gap-6 md:gap-12 border-t border-zinc-200 dark:border-white/5 pt-10 transition-colors">
                            <div className="flex flex-col gap-1">
                                <span className="text-3xl font-black text-zinc-900 dark:text-white leading-none transition-colors">7+</span>
                                <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-600 uppercase tracking-widest transition-colors">Years UI/UX</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-3xl font-black text-zinc-900 dark:text-white leading-none transition-colors">25%</span>
                                <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-600 uppercase tracking-widest transition-colors">Adoption Growth</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-3xl font-black text-zinc-900 dark:text-white leading-none transition-colors">28%</span>
                                <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-600 uppercase tracking-widest transition-colors">User Satisfaction</span>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Right Column - Visual Concept */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
                    className="hidden lg:flex w-full justify-end items-center lg:col-span-5"
                >
                    <StylizedProfile />
                </motion.div>
            </div>


            {/* Scroll Indicator */}
            <motion.button
                aria-label="Scroll to next section"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6, duration: 0.8, ease: "easeOut" }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5 cursor-pointer group z-20 opacity-50 hover:opacity-100 transition-all duration-500 hover:scale-105"
                onClick={() => {
                    const nextSection = document.getElementById("skills-section");
                    if (nextSection) {
                        nextSection.scrollIntoView({ behavior: "smooth" });
                    }
                }}
            >
                <div className="w-6 h-10 rounded-full border border-zinc-800 group-hover:border-lime-500/50 flex justify-center p-1.5 bg-zinc-950/50 backdrop-blur-sm transition-colors duration-300 relative overflow-hidden">
                    <motion.div
                        animate={{
                            y: [0, 14],
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

                <span className="text-[9px] uppercase tracking-[0.35em] text-zinc-500 group-hover:text-lime-400 font-bold transition-colors duration-300 select-none">
                    Scroll
                </span>
            </motion.button>
        </div>
    );
};

export default memo(Hero);
