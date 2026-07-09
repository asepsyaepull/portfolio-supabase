"use client";

import { motion } from "framer-motion";
import { Activity, Battery, Cpu, Globe, Lock, Server, Signal, Wifi } from "lucide-react";
import { useState } from "react";

export default function AboutHome() {
    // Device hover states
    const [iphoneHover, setIphoneHover] = useState(false);
    const [iphoneIslandHover, setIphoneIslandHover] = useState(false);
    const [ipadHover, setIpadHover] = useState(false);
    const [ipadIslandHover, setIpadIslandHover] = useState(false);
    const [macLidHover, setMacLidHover] = useState(false);

    return (
        <div className="py-24 bg-white dark:bg-gray-950 text-zinc-900 dark:text-white relative overflow-hidden border-t border-zinc-200 dark:border-zinc-900/50 transition-colors duration-300">
            {/* Subtle grid background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(#d4d4d8_1.5px,transparent_1.5px)] dark:bg-[radial-gradient(#27272a_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-40 dark:opacity-20 transition-colors duration-300" />
            </div>

            <div className="container mx-auto px-4 md:px-24 relative z-10">
                {/* Title Header */}
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl font-black tracking-tight mb-4 uppercase"
                    >
                        Cross-platform design <br />
                        <span className="text-lime-600 dark:text-lime-500 italic font-serif normal-case transition-colors">&</span> implementation
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto text-base md:text-lg transition-colors"
                    >
                        Bridging the gap between high-fidelity designs and production-ready interfaces
                        for mobile, tablet, and desktop environments.
                    </motion.p>
                </div>

                {/* Animated Connection Beams Path (Desktop) */}
                <div className="relative w-full max-w-5xl mx-auto mb-8 hidden h-12 items-center lg:flex">
                    <div className="relative flex h-full w-full items-center">
                        {/* Node 1 (above iPhone) - at 1/6 */}
                        <div className="absolute top-1/2 left-[calc(100%/6)] z-10 -translate-x-1/2 -translate-y-1/2">
                            <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-zinc-200 dark:bg-zinc-800 transition-colors">
                                <div className="size-2 rounded-full bg-orange-500"></div>
                            </div>
                        </div>
                        {/* Node 2 (above MacBook) - at 1/2 */}
                        <div className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
                            <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-zinc-200 dark:bg-zinc-800 transition-colors">
                                <div className="size-2 rounded-full bg-orange-500"></div>
                            </div>
                        </div>
                        {/* Node 3 (above iPad) - at 5/6 */}
                        <div className="absolute top-1/2 left-[calc(500%/6)] z-10 -translate-x-1/2 -translate-y-1/2">
                            <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-zinc-200 dark:bg-zinc-800 transition-colors">
                                <div className="size-2 rounded-full bg-orange-500"></div>
                            </div>
                        </div>

                        {/* Beam segment 1: Node1 → Node2 */}
                        <div className="absolute top-1/2 left-[calc(100%/6)] w-[calc(200%/6)] -translate-y-1/2">
                            <div className="flex h-full w-full shrink-0 items-center justify-center overflow-visible [--beam-color-1:#f97316] [--beam-color-2:#fb923c] [--beam-color-3:#ef4444] dark:[--path-color:#27272a] [--path-color:#e4e4e7]">
                                <svg className="h-12 w-full" viewBox="0 0 600 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                                    <defs>
                                        <linearGradient id="fadeMask1" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="white"></stop>
                                            <stop offset="100%" stopColor="white"></stop>
                                        </linearGradient>
                                        <linearGradient id="beamGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="transparent"></stop>
                                            <stop offset="30%" stopColor="var(--beam-color-1)"></stop>
                                            <stop offset="50%" stopColor="var(--beam-color-2)"></stop>
                                            <stop offset="70%" stopColor="var(--beam-color-3)"></stop>
                                            <stop offset="100%" stopColor="transparent"></stop>
                                        </linearGradient>
                                        <filter id="glow1" x="-50%" y="-50%" width="200%" height="200%">
                                            <feGaussianBlur stdDeviation="4" result="coloredBlur"></feGaussianBlur>
                                            <feMerge>
                                                <feMergeNode in="coloredBlur"></feMergeNode>
                                                <feMergeNode in="SourceGraphic"></feMergeNode>
                                            </feMerge>
                                        </filter>
                                        <mask id="fadeEndsMask1">
                                            <rect x="0" y="0" width="600" height="80" fill="url(#fadeMask1)"></rect>
                                        </mask>
                                        <motion.linearGradient
                                            id="beamFadeGradient1"
                                            gradientUnits="userSpaceOnUse"
                                            initial={{ x1: 0, x2: 600 }}
                                            animate={{
                                                x1: [0, 600],
                                                x2: [600, 1200]
                                            }}
                                            transition={{
                                                duration: 3,
                                                repeat: Infinity,
                                                ease: "linear"
                                            }}
                                        >
                                            <stop offset="0%" stopColor="black"></stop>
                                            <stop offset="5%" stopColor="white"></stop>
                                            <stop offset="15%" stopColor="white"></stop>
                                            <stop offset="20%" stopColor="black"></stop>
                                        </motion.linearGradient>
                                        <mask id="beamMask1">
                                            <path d="M 0 40 L 100 40 L 200 15 L 400 15 L 500 40 L 600 40" stroke="url(#beamFadeGradient1)" strokeWidth="6" strokeLinecap="round" fill="none"></path>
                                        </mask>
                                    </defs>
                                    <g mask="url(#fadeEndsMask1)">
                                        <path d="M 0 40 L 100 40 L 200 15 L 400 15 L 500 40 L 600 40" stroke="var(--path-color)" strokeWidth="2" strokeDasharray="1 6" strokeLinecap="round" fill="none"></path>
                                        <g filter="url(#glow1)">
                                            <path d="M 0 40 L 100 40 L 200 15 L 400 15 L 500 40 L 600 40" stroke="url(#beamGradient1)" strokeWidth="3" strokeLinecap="round" strokeDasharray="1 6" fill="none" mask="url(#beamMask1)"></path>
                                        </g>
                                    </g>
                                </svg>
                            </div>
                        </div>

                        {/* Beam segment 2: Node2 → Node3 */}
                        <div className="absolute top-1/2 left-[calc(300%/6)] w-[calc(200%/6)] -translate-y-1/2">
                            <div className="flex h-full w-full shrink-0 items-center justify-center overflow-visible [--beam-color-1:#f97316] [--beam-color-2:#fb923c] [--beam-color-3:#ef4444] dark:[--path-color:#27272a] [--path-color:#e4e4e7]">
                                <svg className="h-12 w-full" viewBox="0 0 600 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                                    <defs>
                                        <linearGradient id="fadeMask2" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="white"></stop>
                                            <stop offset="100%" stopColor="white"></stop>
                                        </linearGradient>
                                        <linearGradient id="beamGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="transparent"></stop>
                                            <stop offset="30%" stopColor="var(--beam-color-1)"></stop>
                                            <stop offset="50%" stopColor="var(--beam-color-2)"></stop>
                                            <stop offset="70%" stopColor="var(--beam-color-3)"></stop>
                                            <stop offset="100%" stopColor="transparent"></stop>
                                        </linearGradient>
                                        <filter id="glow2" x="-50%" y="-50%" width="200%" height="200%">
                                            <feGaussianBlur stdDeviation="4" result="coloredBlur"></feGaussianBlur>
                                            <feMerge>
                                                <feMergeNode in="coloredBlur"></feMergeNode>
                                                <feMergeNode in="SourceGraphic"></feMergeNode>
                                            </feMerge>
                                        </filter>
                                        <mask id="fadeEndsMask2">
                                            <rect x="0" y="0" width="600" height="80" fill="url(#fadeMask2)"></rect>
                                        </mask>
                                        <motion.linearGradient
                                            id="beamFadeGradient2"
                                            gradientUnits="userSpaceOnUse"
                                            initial={{ x1: 0, x2: 600 }}
                                            animate={{
                                                x1: [0, 600],
                                                x2: [600, 1200]
                                            }}
                                            transition={{
                                                duration: 3,
                                                repeat: Infinity,
                                                ease: "linear",
                                                delay: 1.5
                                            }}
                                        >
                                            <stop offset="0%" stopColor="black"></stop>
                                            <stop offset="5%" stopColor="white"></stop>
                                            <stop offset="15%" stopColor="white"></stop>
                                            <stop offset="20%" stopColor="black"></stop>
                                        </motion.linearGradient>
                                        <mask id="beamMask2">
                                            <path d="M 0 40 L 100 40 L 200 15 L 400 15 L 500 40 L 600 40" stroke="url(#beamFadeGradient2)" strokeWidth="6" strokeLinecap="round" fill="none"></path>
                                        </mask>
                                    </defs>
                                    <g mask="url(#fadeEndsMask2)">
                                        <path d="M 0 40 L 100 40 L 200 15 L 400 15 L 500 40 L 600 40" stroke="var(--path-color)" strokeWidth="2" strokeDasharray="1 6" strokeLinecap="round" fill="none"></path>
                                        <g filter="url(#glow2)">
                                            <path d="M 0 40 L 100 40 L 200 15 L 400 15 L 500 40 L 600 40" stroke="url(#beamGradient2)" strokeWidth="3" strokeLinecap="round" strokeDasharray="1 6" fill="none" mask="url(#beamMask2)"></path>
                                        </g>
                                    </g>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Device Showcase Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center justify-items-center w-full max-w-5xl mx-auto overflow-hidden py-4 md:py-10">

                    {/* 1. iPhone Skeleton */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col items-center min-w-[200px]"
                    >
                        {/* Mobile container with side buttons */}
                        <div
                            onMouseEnter={() => setIphoneHover(true)}
                            onMouseLeave={() => setIphoneHover(false)}
                            className="relative group cursor-pointer"
                        >
                            {/* Volume Buttons (Left) */}
                            <div className="absolute left-[-4px] top-12 w-[4px] h-8 bg-zinc-300 dark:bg-zinc-800 rounded-l transition-colors" />
                            <div className="absolute left-[-4px] top-[80px] w-[4px] h-8 bg-zinc-300 dark:bg-zinc-800 rounded-l transition-colors" />
                            {/* Power Button (Right) */}
                            <div className="absolute right-[-4px] top-[60px] w-[4px] h-10 bg-zinc-300 dark:bg-zinc-800 rounded-r transition-colors" />

                            {/* Device body */}
                            <div className="w-[120px] h-[240px] border-[4px] border-zinc-200 dark:border-zinc-800 rounded-[24px] bg-white dark:bg-zinc-950 p-2 relative flex flex-col justify-between overflow-hidden shadow-2xl shadow-black/10 dark:shadow-black/80 ring-1 ring-zinc-200 dark:ring-zinc-700/30 transition-colors">
                                {/* Screen background glow */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-lime-500/5 via-transparent to-blue-500/5 pointer-events-none" />

                                {/* Interactive Dynamic Island */}
                                <div className="absolute top-2.5 left-0 right-0 z-30 flex justify-center">
                                    <motion.div
                                        onHoverStart={() => setIphoneIslandHover(true)}
                                        onHoverEnd={() => setIphoneIslandHover(false)}
                                        animate={{
                                            width: iphoneIslandHover && iphoneHover ? 94 : 46,
                                            height: iphoneIslandHover && iphoneHover ? 16 : 10,
                                            borderRadius: 99
                                        }}
                                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                        className="bg-zinc-900 dark:bg-black border border-zinc-700 dark:border-zinc-800 flex items-center justify-center gap-1 cursor-pointer overflow-hidden px-1.5 shadow-[0_0_8px_rgba(0,0,0,0.2)] dark:shadow-[0_0_8px_rgba(0,0,0,0.9)]"
                                    >
                                        {iphoneIslandHover && iphoneHover ? (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className="flex items-center gap-1 text-[6px] text-lime-400 font-black tracking-wider uppercase"
                                            >
                                                <span className="w-1 h-1 rounded-full bg-lime-400 animate-pulse" />
                                                Synced
                                            </motion.div>
                                        ) : (
                                            <div className="w-1.5 h-1.5 rounded-full bg-zinc-600 dark:bg-zinc-800" />
                                        )}
                                    </motion.div>
                                </div>

                                {/* iPhone Screen Content (Fades in on hover) */}
                                <motion.div
                                    animate={{ opacity: iphoneHover ? 1 : 0 }}
                                    transition={{ duration: 0.35 }}
                                    className="w-full h-full flex flex-col justify-between pt-1 relative z-10"
                                >
                                    {/* iPhone Status Bar */}
                                    <div className="flex justify-between items-center px-1 text-[7px] text-zinc-400 dark:text-zinc-500 font-bold z-20">
                                        <span>9:41</span>
                                        <div className="w-12" /> {/* Spacer for dynamic island */}
                                        <div className="flex items-center gap-1">
                                            <Wifi size={7} />
                                            <Battery size={9} />
                                        </div>
                                    </div>

                                    {/* Screen Content Dashboard */}
                                    <div className="flex-1 flex flex-col gap-2 mt-3">
                                        <div className="h-16 rounded-xl border border-zinc-100 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-900/40 p-1.5 flex flex-col gap-1 justify-center relative overflow-hidden group">
                                            <div className="absolute top-1.5 right-1.5 w-1 h-1 rounded-full bg-lime-500 animate-pulse" />
                                            <span className="text-[6px] text-zinc-400 dark:text-zinc-500 uppercase tracking-widest font-black">TRACtoGO App</span>
                                            <span className="text-[8px] font-bold text-zinc-800 dark:text-white leading-none">UX Audited</span>
                                            <div className="w-full bg-zinc-200 dark:bg-zinc-950 h-1 rounded-full overflow-hidden mt-1">
                                                <motion.div
                                                    animate={{ width: ["0%", "100%"] }}
                                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                                    className="h-full bg-lime-500"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex gap-1.5">
                                            <div className="flex-1 h-10 rounded-xl border border-zinc-100 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-900/40 p-1.5 flex flex-col justify-between">
                                                <span className="text-[5px] text-zinc-400 dark:text-zinc-500 uppercase tracking-widest font-black">Memory</span>
                                                <span className="text-[8px] font-bold text-zinc-600 dark:text-zinc-300">12.4 MB</span>
                                            </div>
                                            <div className="flex-1 h-10 rounded-xl border border-zinc-100 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-900/40 p-1.5 flex flex-col justify-between">
                                                <span className="text-[5px] text-zinc-400 dark:text-zinc-500 uppercase tracking-widest font-black">Latency</span>
                                                <span className="text-[8px] font-bold text-lime-600 dark:text-lime-400">14ms</span>
                                            </div>
                                        </div>

                                        {/* Flow chart layout */}
                                        <div className="flex-1 rounded-xl border border-zinc-100 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-900/30 p-1.5 flex items-center justify-center gap-1.5">
                                            <div className="w-5 h-5 rounded-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center">
                                                <Server size={8} className="text-zinc-400 dark:text-zinc-600" />
                                            </div>
                                            <div className="flex-1 h-[2px] bg-dashed border-t border-zinc-200 dark:border-zinc-800 relative">
                                                <motion.div
                                                    animate={{ left: ["0%", "100%"] }}
                                                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                                    className="absolute top-[-1px] w-1 h-1 rounded-full bg-lime-500"
                                                />
                                            </div>
                                            <div className="w-5 h-5 rounded-full bg-white dark:bg-zinc-950 border border-lime-500/20 flex items-center justify-center">
                                                <Cpu size={8} className="text-lime-600 dark:text-lime-500" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* iPhone Home Indicator bar */}
                                    <div className="w-12 h-0.5 bg-zinc-300 dark:bg-zinc-800 rounded-full mx-auto mt-1" />
                                </motion.div>
                            </div>
                        </div>
                        {/* iPhone Label */}
                        <h3 className="mt-6 text-center text-base font-medium text-zinc-900 dark:text-white transition-colors">
                            Mobile App Redesign
                        </h3>
                        <p className="mx-auto mt-2 max-w-xs text-center text-sm text-balance text-zinc-500 dark:text-zinc-400 transition-colors">
                            Redesigned TRACtoGO web and mobile, reducing design-to-development time by 30%.
                        </p>
                    </motion.div>

                    {/* 2. MacBook Skeleton */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="flex flex-col items-center min-w-[260px]"
                    >
                        {/* Laptop 3D perspective hover container */}
                        <div
                            onMouseEnter={() => setMacLidHover(true)}
                            onMouseLeave={() => setMacLidHover(false)}
                            className="relative flex flex-col items-center cursor-pointer group"
                            style={{ perspective: "1000px" }}
                        >
                            {/* MacBook Lid Screen */}
                            <motion.div
                                animate={{
                                    rotateX: macLidHover ? 0 : -32,
                                    y: macLidHover ? 0 : 5
                                }}
                                transition={{ type: "spring", stiffness: 180, damping: 18 }}
                                className="w-[320px] h-[200px] border-4 border-zinc-200 dark:border-zinc-800 rounded-t-xl bg-white dark:bg-zinc-950 p-1.5 relative shadow-xl overflow-hidden transition-colors"
                                style={{ transformOrigin: "bottom center" }}
                            >
                                {/* Screen background glow */}
                                <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-transparent pointer-events-none" />

                                {/* Camera notch detail */}
                                <div className="w-10 h-3 bg-zinc-200 dark:bg-zinc-900 rounded-b-md mx-auto absolute top-0 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center transition-colors">
                                    <div className="w-1 h-1 rounded-full bg-zinc-400 dark:bg-zinc-950" />
                                </div>

                                {/* MacBook Screen Content Mockup */}
                                <motion.div
                                    animate={{ opacity: macLidHover ? 1 : 0 }}
                                    transition={{ duration: 0.35 }}
                                    className="w-full h-full rounded-md border border-zinc-100 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-950 flex flex-col p-2.5 justify-between relative transition-colors"
                                >
                                    {/* Top bar */}
                                    <div className="flex justify-between items-center text-[7px] text-zinc-400 dark:text-zinc-500 font-bold border-b border-zinc-200 dark:border-zinc-900/80 pb-1.5 transition-colors">
                                        <span>Symbolix.ai (ERP & POS)</span>
                                        <span className="text-lime-600 dark:text-lime-500">COMPONENTS SYNCED</span>
                                    </div>

                                    {/* Middle Layout */}
                                    <div className="flex-1 flex gap-3 items-center mt-2.5">
                                        <div className="flex-1 h-full flex flex-col gap-1.5">
                                            <div className="h-6 rounded bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-900 p-1 flex items-center justify-between transition-colors">
                                                <span className="text-[6px] text-zinc-400 dark:text-zinc-500 uppercase tracking-wider font-bold">Latency API</span>
                                                <span className="text-[8px] font-black text-lime-600 dark:text-lime-400">8.2ms</span>
                                            </div>
                                            <div className="flex-1 rounded bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-900 p-1.5 flex flex-col justify-between transition-colors">
                                                <span className="text-[5px] text-zinc-400 dark:text-zinc-500 uppercase tracking-widest font-black">CPU LOAD</span>
                                                <div className="flex items-end gap-0.5 h-6 mt-1">
                                                    <motion.div animate={{ height: ["40%", "80%", "40%"] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-1 bg-lime-500/80 rounded-t-sm" />
                                                    <motion.div animate={{ height: ["60%", "40%", "90%", "60%"] }} transition={{ duration: 1.8, repeat: Infinity }} className="w-1 bg-lime-500/85 rounded-t-sm" />
                                                    <motion.div animate={{ height: ["30%", "70%", "30%"] }} transition={{ duration: 1.2, repeat: Infinity }} className="w-1 bg-lime-500/70 rounded-t-sm" />
                                                    <motion.div animate={{ height: ["50%", "90%", "50%"] }} transition={{ duration: 1.4, repeat: Infinity }} className="w-1 bg-lime-500/90 rounded-t-sm" />
                                                    <motion.div animate={{ height: ["80%", "30%", "80%"] }} transition={{ duration: 1.6, repeat: Infinity }} className="w-1 bg-lime-500/80 rounded-t-sm" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-20 h-full rounded border border-zinc-200 dark:border-zinc-900 bg-white dark:bg-zinc-900/40 p-2 flex flex-col justify-between items-center text-center transition-colors">
                                            <Cpu size={14} className="text-blue-500 animate-pulse" />
                                            <span className="text-[5px] text-zinc-400 dark:text-zinc-500 uppercase font-black tracking-widest mt-1">Role</span>
                                            <span className="text-[8px] font-bold text-zinc-800 dark:text-white">UI/UX Dev</span>
                                        </div>
                                    </div>

                                    {/* Terminal block at bottom */}
                                    <div className="h-8 rounded bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-900/80 p-1 font-mono text-[5px] text-zinc-500 flex flex-col justify-between overflow-hidden leading-tight transition-colors">
                                        <span>$ npm run build:design-system</span>
                                        <span className="text-lime-600 dark:text-lime-500/90">&gt; compiling tokens... success (3.2s)</span>
                                    </div>
                                </motion.div>
                            </motion.div>

                            {/* MacBook Base Keyboard */}
                            <div className="w-[370px] h-[10px] bg-zinc-300 dark:bg-zinc-800 rounded-b-xl relative z-10 shadow-md transition-colors">
                                {/* Trackpad notch */}
                                <div className="w-[56px] h-[4px] bg-zinc-200 dark:bg-zinc-900 mx-auto rounded-b-sm border-t border-zinc-300 dark:border-zinc-700/50 transition-colors" />
                            </div>
                        </div>
                        {/* MacBook Label */}
                        <h3 className="mt-6 text-center text-base font-medium text-zinc-900 dark:text-white transition-colors">
                            Enterprise Web Systems
                        </h3>
                        <p className="mx-auto mt-2 max-w-xs text-center text-sm text-balance text-zinc-500 dark:text-zinc-400 transition-colors">
                            Spearheaded end-to-end redesigns for Symbolix.ai (ERP & POS) using React, Next.js, and Tailwind CSS.
                        </p>
                    </motion.div>

                    {/* 3. iPad Skeleton */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex flex-col items-center min-w-[240px]"
                    >
                        {/* iPad container in Landscape Mode */}
                        <div
                            onMouseEnter={() => setIpadHover(true)}
                            onMouseLeave={() => setIpadHover(false)}
                            className="relative group cursor-pointer"
                        >
                            {/* Top/Lock Button (iPad Side) */}
                            <div className="absolute right-12 top-[-3px] w-8 h-[3px] bg-zinc-300 dark:bg-zinc-800 rounded-t transition-colors" />
                            {/* Volume Buttons (iPad Right) */}
                            <div className="absolute right-[-3px] top-8 w-[3px] h-6 bg-zinc-300 dark:bg-zinc-800 rounded-r transition-colors" />
                            <div className="absolute right-[-3px] top-[60px] w-[3px] h-6 bg-zinc-300 dark:bg-zinc-800 rounded-r transition-colors" />

                            {/* Device body */}
                            <div className="w-[260px] h-[180px] border-[4.5px] border-zinc-200 dark:border-zinc-800 rounded-[20px] bg-white dark:bg-zinc-950 p-2 relative flex flex-col justify-between overflow-hidden shadow-2xl shadow-black/10 dark:shadow-black/80 ring-1 ring-zinc-200 dark:ring-zinc-700/30 transition-colors">
                                {/* Screen background glow */}
                                <div className="absolute inset-0 bg-gradient-to-tl from-blue-500/5 via-transparent to-lime-500/5 pointer-events-none" />

                                {/* Camera dot notch at top left bezel */}
                                <div className="absolute top-1/2 left-[3px] -translate-y-1/2 w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-900 z-20 transition-colors" />

                                {/* Screen content mockup */}
                                <motion.div
                                    animate={{ opacity: ipadHover ? 1 : 0 }}
                                    transition={{ duration: 0.35 }}
                                    className="w-full h-full rounded-[12px] border border-zinc-100 dark:border-zinc-900 bg-zinc-50 dark:bg-zinc-950 p-2 flex flex-col justify-between relative transition-colors"
                                >
                                    {/* Header */}
                                    <div className="flex justify-between items-center text-[7px] text-zinc-400 dark:text-zinc-500 font-bold border-b border-zinc-200 dark:border-zinc-900 pb-1 z-10 transition-colors">
                                        <span className="flex items-center gap-1 text-zinc-800 dark:text-zinc-500">
                                            <Signal size={6} className="text-lime-500" /> OMS Crewdible
                                        </span>
                                        {/* Interactive Notch */}
                                        <motion.div
                                            onHoverStart={() => setIpadIslandHover(true)}
                                            onHoverEnd={() => setIpadIslandHover(false)}
                                            animate={{
                                                width: ipadIslandHover ? 60 : 36,
                                                height: ipadIslandHover ? 12 : 8
                                            }}
                                            className="bg-zinc-900 dark:bg-black border border-zinc-700 dark:border-zinc-800/80 rounded-full flex items-center justify-center gap-0.5 cursor-pointer"
                                        >
                                            {ipadIslandHover ? (
                                                <span className="text-[5.5px] text-blue-400 font-black tracking-wide uppercase">Connected</span>
                                            ) : (
                                                <div className="w-1 h-1 rounded-full bg-zinc-700 dark:bg-zinc-800" />
                                            )}
                                        </motion.div>
                                    </div>

                                    {/* Body Layout */}
                                    <div className="flex-1 flex gap-2 mt-2 items-center">
                                        <div className="w-16 h-full rounded bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-900 p-1 flex flex-col justify-between transition-colors">
                                            <span className="text-[5px] text-zinc-400 dark:text-zinc-500 uppercase tracking-widest font-black">Memory</span>
                                            <div className="h-6 flex items-center justify-center">
                                                <Activity size={12} className="text-lime-500 animate-pulse" />
                                            </div>
                                            <span className="text-[8px] font-bold text-zinc-800 dark:text-white text-center">98.4%</span>
                                        </div>

                                        <div className="flex-1 h-full flex flex-col gap-1">
                                            <div className="h-8 rounded bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-900 p-1 flex flex-col justify-between transition-colors">
                                                <span className="text-[5px] text-zinc-400 dark:text-zinc-500 uppercase tracking-widest font-black font-mono">OMS Performance</span>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-[8px] font-bold text-zinc-800 dark:text-white">+24% Convert</span>
                                                    <span className="text-[6px] text-lime-600 dark:text-lime-400 uppercase tracking-wider font-bold">Ok</span>
                                                </div>
                                            </div>
                                            <div className="flex-1 rounded bg-white dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-900 p-1 flex items-center justify-between transition-colors">
                                                <span className="text-[5px] text-zinc-400 dark:text-zinc-500 uppercase tracking-widest font-black">Sync Time</span>
                                                <span className="text-[8px] font-bold text-zinc-600 dark:text-zinc-400">1.2s ago</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                        {/* iPad Label */}
                        <h3 className="mt-6 text-center text-base font-medium text-zinc-900 dark:text-white transition-colors">
                            Custom Product Solutions
                        </h3>
                        <p className="mx-auto mt-2 max-w-xs text-center text-sm text-balance text-zinc-500 dark:text-zinc-400 transition-colors">
                            Designed user flows and high-fidelity mockups for Gizalab and Crewdible OMS.
                        </p>
                    </motion.div>

                </div>

                {/* Feature Cards Below */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-16">

                    {/* Card 1: Enterprise-grade Security */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="rounded-2xl border border-zinc-200 dark:border-zinc-900/60 bg-white/50 dark:bg-zinc-900/20 backdrop-blur-sm p-6 hover:border-zinc-300 dark:hover:border-zinc-800 transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between h-[280px]"
                    >
                        {/* Security Locks and Beams illustration */}
                        <div className="h-28 border border-zinc-100 dark:border-zinc-950 bg-zinc-50 dark:bg-zinc-950/60 rounded-xl flex items-center justify-center relative overflow-hidden group transition-colors">
                            {/* Left node (avatar mock) */}
                            <div className="w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 flex items-center justify-center relative z-10 transition-colors">
                                <div className="w-5 h-5 rounded-full bg-lime-500/20 border border-lime-500/30" />
                            </div>

                            {/* Connecting animated dashed path */}
                            <div className="w-16 h-[1px] border-t border-dashed border-zinc-300 dark:border-zinc-800 relative mx-2 transition-colors">
                                <motion.div
                                    animate={{ left: ["0%", "100%"] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                    className="absolute top-[-1px] w-2 h-[2px] bg-gradient-to-r from-transparent via-lime-500 to-transparent"
                                />
                            </div>

                            {/* Center Lock */}
                            <div className="w-12 h-12 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center justify-center relative z-10 group-hover:border-lime-500/40 transition-colors duration-300 shadow-xl shadow-black/5 dark:shadow-black/40">
                                <Lock size={20} className="text-lime-500 group-hover:scale-110 transition-transform duration-300" />
                            </div>

                            {/* Connecting animated dashed path */}
                            <div className="w-16 h-[1px] border-t border-dashed border-zinc-300 dark:border-zinc-800 relative mx-2 transition-colors">
                                <motion.div
                                    animate={{ left: ["100%", "0%"] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                    className="absolute top-[-1px] w-2 h-[2px] bg-gradient-to-r from-transparent via-lime-500 to-transparent"
                                />
                            </div>

                            {/* Right node */}
                            <div className="w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/80 flex items-center justify-center relative z-10 transition-colors">
                                <div className="w-5 h-5 rounded-full bg-blue-500/20 border border-blue-500/30" />
                            </div>
                        </div>

                        <div>
                            <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-2 uppercase tracking-wider transition-colors">
                                High-Fidelity & Prototyping
                            </h3>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed transition-colors">
                                Designing responsive flows in Figma, auditing design consistency,
                                and maintaining shared UI design systems.
                            </p>
                        </div>
                    </motion.div>

                    {/* Card 2: Edge Computing Ready */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="rounded-2xl border border-zinc-200 dark:border-zinc-900/60 bg-white/50 dark:bg-zinc-900/20 backdrop-blur-sm p-6 hover:border-zinc-300 dark:hover:border-zinc-800 transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between h-[280px]"
                    >
                        {/* World Map SVG with Location Pins */}
                        <div className="h-28 border border-zinc-100 dark:border-zinc-950 bg-zinc-50 dark:bg-zinc-950/60 rounded-xl flex items-center justify-center relative overflow-hidden group transition-colors">
                            {/* Dotted grid simulating world coordinates */}
                            <svg className="absolute inset-0 w-full h-full p-2 opacity-35" viewBox="0 0 200 100" fill="none">
                                {/* Horizontal dotted coordinates */}
                                <path d="M 0 20 L 200 20 M 0 40 L 200 40 M 0 60 L 200 60 M 0 80 L 200 80" stroke="rgba(82, 82, 91, 0.3)" strokeWidth="0.5" strokeDasharray="2 3" />
                                {/* Vertical dotted coordinates */}
                                <path d="M 40 0 L 40 100 M 80 0 L 80 100 M 120 0 L 120 100 M 160 0 L 160 100" stroke="rgba(82, 82, 91, 0.3)" strokeWidth="0.5" strokeDasharray="2 3" />

                                {/* Highlighted map grid nodes (simulating continents) */}
                                <circle cx="45" cy="35" r="1" fill="#84cc16" />
                                <circle cx="55" cy="45" r="1" fill="#84cc16" />
                                <circle cx="95" cy="25" r="1" fill="#84cc16" />
                                <circle cx="120" cy="55" r="1" fill="#84cc16" />
                                <circle cx="145" cy="35" r="1" fill="#84cc16" />
                                <circle cx="155" cy="65" r="1" fill="#84cc16" />
                            </svg>

                            {/* Pulsing Pin 1 */}
                            <div className="absolute top-6 left-12 flex flex-col items-center">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                                </span>
                            </div>

                            {/* Pulsing Pin 2 */}
                            <div className="absolute bottom-10 right-20 flex flex-col items-center">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-500"></span>
                                </span>
                            </div>

                            {/* Central avatar connection showcase */}
                            <div className="w-6 h-6 rounded-full border border-blue-500/50 bg-white dark:bg-zinc-900 flex items-center justify-center z-10 shadow-lg shadow-black/10 dark:shadow-black/40 animate-bounce transition-colors">
                                <Globe size={10} className="text-blue-500 dark:text-blue-400" />
                            </div>
                        </div>

                        <div>
                            <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-2 uppercase tracking-wider transition-colors">
                                ERP, POS & Government Systems
                            </h3>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed transition-colors">
                                Expert in implementing complex web interfaces for Korlantas Polri,
                                PT Liftech, and PT Dinamika Simbolis Indonesia.
                            </p>
                        </div>
                    </motion.div>

                    {/* Card 3: SOC2 and HIPAA Compliant */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="rounded-2xl border border-zinc-200 dark:border-zinc-900/60 bg-white/50 dark:bg-zinc-900/20 backdrop-blur-sm p-6 hover:border-zinc-300 dark:hover:border-zinc-800 transition-all duration-300 hover:scale-[1.02] flex flex-col justify-between h-[280px]"
                    >
                        {/* Handcrafted compliance logos illustration */}
                        <div className="h-28 border border-zinc-100 dark:border-zinc-950 bg-zinc-50 dark:bg-zinc-950/60 rounded-xl flex items-center justify-center gap-4 relative overflow-hidden group transition-colors">
                            {/* Adoption Growth Badge */}
                            <div className="w-14 h-14 rounded-full border border-lime-500/20 bg-gradient-to-tr from-lime-100 dark:from-lime-950/80 to-white dark:to-lime-900/20 flex flex-col items-center justify-center shadow-lg hover:scale-105 transition-transform duration-300 relative">
                                <span className="text-[9px] font-black text-lime-700 dark:text-white leading-none">+25%</span>
                                <span className="text-[5px] text-lime-600 dark:text-lime-400 font-bold uppercase tracking-wider mt-1 text-center px-1">Adoption</span>
                            </div>

                            {/* Satisfaction Badge */}
                            <div className="w-14 h-14 rounded-full border border-blue-500/20 bg-gradient-to-tr from-blue-100 dark:from-blue-950/80 to-white dark:to-blue-900/20 flex flex-col items-center justify-center shadow-lg hover:scale-105 transition-transform duration-300 relative">
                                <span className="text-[9px] font-black text-blue-700 dark:text-white leading-none">+28%</span>
                                <span className="text-[5px] text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider mt-1 text-center px-1">Satisfaction</span>
                            </div>

                            {/* Time Saved Badge */}
                            <div className="w-14 h-14 rounded-full border border-orange-500/20 bg-gradient-to-tr from-orange-100 dark:from-orange-950/80 to-white dark:to-orange-900/20 flex flex-col items-center justify-center shadow-lg hover:scale-105 transition-transform duration-300 relative">
                                <span className="text-[9px] font-black text-orange-700 dark:text-white leading-none">-30%</span>
                                <span className="text-[5px] text-orange-600 dark:text-orange-400 font-bold uppercase tracking-wider mt-1 text-center px-1">Dev Time</span>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-2 uppercase tracking-wider transition-colors">
                                Proven User Impact
                            </h3>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed transition-colors">
                                Accomplished 25% user adoption growth, 28% increase in satisfaction,
                                and a 30% reduction in design-to-development cycles.
                            </p>
                        </div>
                    </motion.div>

                </div>
            </div >
        </div >
    );
}
