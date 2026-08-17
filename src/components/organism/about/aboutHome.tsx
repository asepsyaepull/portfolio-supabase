"use client";

import { IconActivity, IconBattery, IconCpu, IconLock, IconServer, IconShieldCheck, IconTrendingUp, IconWifi, IconWorld } from "@tabler/icons-react";
import { motion } from "framer-motion";
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
                        <span className="text-lime-600 dark:text-lime-500 italic font-sans normal-case transition-colors">&</span> implementation
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
                            <div className="flex h-full w-full shrink-0 items-center justify-center overflow-visible [--beam-color-1:#f97316] [--beam-color-2:#fb923c] [--beam-color-3:#ef4444] [--path-color:#e4e4e7] dark:[--path-color:#27272a]">
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
                            <div className="flex h-full w-full shrink-0 items-center justify-center overflow-visible [--beam-color-1:#f97316] [--beam-color-2:#fb923c] [--beam-color-3:#ef4444] [--path-color:#e4e4e7] dark:[--path-color:#27272a]">
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
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-center justify-items-center w-full max-w-5xl mx-auto py-4 md:py-10">

                    {/* 1. iPhone Skeleton */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col items-center min-w-[140px] w-full max-w-[220px]"
                    >
                        {/* Mobile container with side buttons */}
                        <div
                            onMouseEnter={() => setIphoneHover(true)}
                            onMouseLeave={() => setIphoneHover(false)}
                            className="relative group cursor-pointer transition-transform duration-300 hover:-translate-y-1.5"
                        >
                            {/* Volume Buttons (Left) */}
                            <div className="absolute left-[-3px] top-12 w-[3px] h-8 bg-zinc-300 dark:bg-zinc-700 rounded-l transition-colors" />
                            <div className="absolute left-[-3px] top-[80px] w-[3px] h-8 bg-zinc-300 dark:bg-zinc-700 rounded-l transition-colors" />
                            {/* Power Button (Right) */}
                            <div className="absolute right-[-3px] top-[60px] w-[3px] h-10 bg-zinc-300 dark:bg-zinc-700 rounded-r transition-colors" />

                            {/* Device body */}
                            <div className="w-[140px] h-[260px] border-[3.5px] border-zinc-300 dark:border-zinc-700 rounded-[28px] bg-zinc-950 p-2.5 relative flex flex-col justify-between overflow-hidden shadow-2xl shadow-black/15 dark:shadow-black/80 ring-1 ring-zinc-200 dark:ring-zinc-700/40 transition-colors">
                                {/* Screen background glow */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-lime-500/10 via-zinc-950 to-blue-500/10 pointer-events-none" />

                                {/* Interactive Dynamic Island */}
                                <div className="absolute top-2 left-0 right-0 z-30 flex justify-center">
                                    <motion.div
                                        onHoverStart={() => setIphoneIslandHover(true)}
                                        onHoverEnd={() => setIphoneIslandHover(false)}
                                        animate={{
                                            width: iphoneIslandHover || iphoneHover ? 96 : 48,
                                            height: iphoneIslandHover || iphoneHover ? 16 : 10,
                                            borderRadius: 99
                                        }}
                                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                        className="bg-black border border-zinc-800 flex items-center justify-center gap-1.5 cursor-pointer overflow-hidden px-2 shadow-[0_0_10px_rgba(0,0,0,0.9)]"
                                    >
                                        {iphoneIslandHover || iphoneHover ? (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className="flex items-center gap-1.5 text-[6px] text-lime-400 font-bold tracking-wider uppercase"
                                            >
                                                <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse" />
                                                Live Sync
                                            </motion.div>
                                        ) : (
                                            <div className="flex items-center gap-1">
                                                <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
                                                <div className="w-1 h-1 rounded-full bg-blue-500/60" />
                                            </div>
                                        )}
                                    </motion.div>
                                </div>

                                {/* iPhone Screen Content */}
                                <div className="w-full h-full flex flex-col justify-between pt-2 relative z-10">
                                    {/* iPhone Status Bar */}
                                    <div className="flex justify-between items-center px-1 text-[7px] text-zinc-400 font-bold z-20">
                                        <span>9:41</span>
                                        <div className="w-12" /> {/* Spacer for dynamic island */}
                                        <div className="flex items-center gap-1">
                                            <IconWifi size={8} className="text-zinc-400" />
                                            <IconBattery size={10} className="text-zinc-400" />
                                        </div>
                                    </div>

                                    {/* Screen Content Dashboard */}
                                    <div className="flex-1 flex flex-col gap-2 mt-2">
                                        <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/90 p-2 flex flex-col gap-1 relative overflow-hidden">
                                            <div className="flex items-center justify-between">
                                                <span className="text-[6px] text-zinc-400 uppercase tracking-widest font-black">TRACtoGO App</span>
                                                <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse" />
                                            </div>
                                            <span className="text-[9px] font-bold text-white leading-tight">UX Redesign</span>
                                            <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden mt-1">
                                                <motion.div
                                                    animate={{ width: ["15%", "100%"] }}
                                                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                                                    className="h-full bg-gradient-to-r from-lime-500 to-emerald-400"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-1.5">
                                            <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/70 p-1.5 flex flex-col justify-between">
                                                <span className="text-[5px] text-zinc-400 uppercase tracking-widest font-black">Flows</span>
                                                <span className="text-[8px] font-bold text-zinc-200">100% Valid</span>
                                            </div>
                                            <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/70 p-1.5 flex flex-col justify-between">
                                                <span className="text-[5px] text-zinc-400 uppercase tracking-widest font-black">Speed</span>
                                                <span className="text-[8px] font-bold text-lime-400">14ms</span>
                                            </div>
                                        </div>

                                        {/* Flow chart layout */}
                                        <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-2 flex items-center justify-between gap-1.5">
                                            <div className="w-6 h-6 rounded-lg bg-zinc-800 flex items-center justify-center">
                                                <IconServer size={10} className="text-zinc-400" />
                                            </div>
                                            <div className="flex-1 h-[2px] bg-zinc-800 relative overflow-hidden">
                                                <motion.div
                                                    animate={{ left: ["-20%", "100%"] }}
                                                    transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
                                                    className="absolute top-0 w-4 h-full bg-lime-400 rounded-full"
                                                />
                                            </div>
                                            <div className="w-6 h-6 rounded-lg bg-lime-500/10 border border-lime-500/30 flex items-center justify-center">
                                                <IconCpu size={10} className="text-lime-400" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* iPhone Home Indicator bar */}
                                    <div className="w-12 h-1 bg-zinc-700 rounded-full mx-auto mt-1" />
                                </div>
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

                    {/* 2. MacBook Pro Laptop Skeleton */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="flex flex-col items-center w-full max-w-[340px]"
                    >
                        {/* Laptop container with hover effect */}
                        <div
                            onMouseEnter={() => setMacLidHover(true)}
                            onMouseLeave={() => setMacLidHover(false)}
                            className="relative w-full flex flex-col items-center cursor-pointer group transition-transform duration-300 hover:-translate-y-1.5"
                        >
                            {/* MacBook Screen / Lid Frame */}
                            <div className="w-full h-[200px] rounded-t-[12px] bg-zinc-300 dark:bg-zinc-800 p-[5px] border border-zinc-400/40 dark:border-zinc-700/60 shadow-2xl relative transition-all duration-300">
                                {/* Inner Display Bezel */}
                                <div className="w-full h-full rounded-t-[8px] bg-zinc-950 p-[2px] relative overflow-hidden flex flex-col justify-between">
                                    {/* Subtle screen reflection / sheen gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.03] via-transparent to-blue-500/[0.04] pointer-events-none z-20" />

                                    {/* Apple Camera Notch */}
                                    <div className="w-14 h-[9px] bg-black rounded-b-md mx-auto absolute top-0 left-1/2 -translate-x-1/2 z-30 flex items-center justify-center gap-1.5 shadow-sm">
                                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-900 border border-zinc-700/60 flex items-center justify-center">
                                            <div className="w-0.5 h-0.5 rounded-full bg-blue-400/80" />
                                        </div>
                                        <div className="w-0.5 h-0.5 rounded-full bg-emerald-400 animate-pulse" />
                                    </div>

                                    {/* macOS Title Bar */}
                                    <div className="flex justify-between items-center px-2 py-1 border-b border-zinc-800/80 bg-zinc-900/60 text-[7px] text-zinc-400 font-mono relative z-20">
                                        {/* Traffic lights */}
                                        <div className="flex items-center gap-1">
                                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500/90" />
                                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500/90" />
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/90" />
                                        </div>
                                        <span className="text-[7.5px] font-sans font-bold text-zinc-200">Symbolix.ai — Enterprise ERP</span>
                                        <div className="flex items-center gap-1 text-[6.5px] text-lime-400 font-bold">
                                            <span className="w-1 h-1 rounded-full bg-lime-400 animate-pulse" />
                                            ACTIVE
                                        </div>
                                    </div>

                                    {/* Screen Body Content */}
                                    <div className="flex-1 p-2 flex flex-col justify-between gap-1.5 bg-zinc-950/90 relative z-10">
                                        {/* Top Stats Cards */}
                                        <div className="grid grid-cols-3 gap-1.5">
                                            <div className="bg-zinc-900/80 border border-zinc-800/80 rounded-lg p-1.5 flex flex-col justify-between">
                                                <span className="text-[5.5px] text-zinc-400 uppercase tracking-wider font-bold">Latency</span>
                                                <span className="text-[9px] font-black text-lime-400">8.2 ms</span>
                                            </div>
                                            <div className="bg-zinc-900/80 border border-zinc-800/80 rounded-lg p-1.5 flex flex-col justify-between">
                                                <span className="text-[5.5px] text-zinc-400 uppercase tracking-wider font-bold">Uptime</span>
                                                <span className="text-[9px] font-black text-white">99.98%</span>
                                            </div>
                                            <div className="bg-zinc-900/80 border border-zinc-800/80 rounded-lg p-1.5 flex flex-col justify-between">
                                                <span className="text-[5.5px] text-zinc-400 uppercase tracking-wider font-bold">Role</span>
                                                <span className="text-[9px] font-black text-blue-400">UI Lead</span>
                                            </div>
                                        </div>

                                        {/* Dynamic Bar Chart Visual */}
                                        <div className="flex-1 bg-zinc-900/50 border border-zinc-800/60 rounded-lg p-2 flex flex-col justify-between">
                                            <div className="flex justify-between items-center text-[6px] text-zinc-400 uppercase tracking-widest font-bold">
                                                <span>Realtime Throughput</span>
                                                <span className="text-lime-400 font-mono">+32.4%</span>
                                            </div>
                                            <div className="flex items-end gap-1.5 h-10 pt-1">
                                                {[35, 60, 45, 80, 65, 95, 75, 90, 100, 85].map((val, i) => (
                                                    <div key={i} className="flex-1 bg-zinc-800/80 rounded-t-sm h-full flex items-end">
                                                        <motion.div
                                                            animate={{ height: macLidHover ? [`${val * 0.7}%`, `${val}%`, `${val * 0.85}%`] : `${val}%` }}
                                                            transition={{ duration: 1.5 + (i * 0.1), repeat: Infinity, ease: "easeInOut" }}
                                                            className={`w-full rounded-t-sm ${i >= 6 ? "bg-lime-400" : "bg-zinc-600"}`}
                                                            style={{ height: `${val}%` }}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Bottom Terminal Bar */}
                                        <div className="rounded-md bg-black/80 border border-zinc-800/80 px-2 py-1 font-mono text-[6px] text-zinc-400 flex items-center justify-between">
                                            <span className="text-zinc-500">$ pnpm run build:system</span>
                                            <span className="text-lime-400 font-bold">✓ 48 modules synced (0 errors)</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* MacBook Hinge */}
                            <div className="w-[88%] h-[3.5px] bg-zinc-400 dark:bg-zinc-900 mx-auto rounded-b-[2px] transition-colors" />

                            {/* MacBook Base Keyboard Deck */}
                            <div className="w-full h-[15px] bg-gradient-to-b from-zinc-200 via-zinc-300 to-zinc-400 dark:from-zinc-700 dark:via-zinc-800 dark:to-zinc-900 rounded-b-xl border-t border-white/50 dark:border-zinc-600/40 relative shadow-xl flex items-center justify-center transition-colors">
                                {/* Thumb opening notch / indent */}
                                <div className="w-14 h-[3px] bg-zinc-300 dark:bg-zinc-950/80 rounded-b-sm absolute top-0" />
                                {/* Bottom non-slip feet */}
                                <div className="w-2.5 h-[1.5px] bg-zinc-400 dark:bg-zinc-950 absolute bottom-0 left-6 rounded-full" />
                                <div className="w-2.5 h-[1.5px] bg-zinc-400 dark:bg-zinc-950 absolute bottom-0 right-6 rounded-full" />
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
                        className="flex flex-col items-center min-w-[180px] w-full max-w-[260px]"
                    >
                        {/* iPad container in Landscape Mode */}
                        <div
                            onMouseEnter={() => setIpadHover(true)}
                            onMouseLeave={() => setIpadHover(false)}
                            className="relative group cursor-pointer w-full flex justify-center transition-transform duration-300 hover:-translate-y-1.5"
                        >
                            {/* Top/Lock Button (iPad Side) */}
                            <div className="absolute right-12 top-[-3px] w-8 h-[3px] bg-zinc-300 dark:bg-zinc-700 rounded-t transition-colors" />
                            {/* Volume Buttons (iPad Right) */}
                            <div className="absolute right-[-3px] top-8 w-[3px] h-6 bg-zinc-300 dark:bg-zinc-700 rounded-r transition-colors" />
                            <div className="absolute right-[-3px] top-[60px] w-[3px] h-6 bg-zinc-300 dark:bg-zinc-700 rounded-r transition-colors" />

                            {/* Device body */}
                            <div className="w-full h-[190px] border-[4px] border-zinc-300 dark:border-zinc-700 rounded-[22px] bg-zinc-950 p-2.5 relative flex flex-col justify-between overflow-hidden shadow-2xl shadow-black/15 dark:shadow-black/80 ring-1 ring-zinc-200 dark:ring-zinc-700/40 transition-colors">
                                {/* Screen background glow */}
                                <div className="absolute inset-0 bg-gradient-to-tl from-blue-500/10 via-zinc-950 to-lime-500/10 pointer-events-none" />

                                {/* Camera dot notch at top bezel */}
                                <div className="absolute top-[3px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-zinc-800 z-20 flex items-center justify-center">
                                    <div className="w-0.5 h-0.5 rounded-full bg-zinc-600" />
                                </div>

                                {/* Screen content mockup */}
                                <div className="w-full h-full rounded-[14px] border border-zinc-800/80 bg-zinc-900/90 p-2 flex flex-col justify-between relative z-10">
                                    {/* Header */}
                                    <div className="flex justify-between items-center text-[7px] text-zinc-400 font-bold border-b border-zinc-800 pb-1 z-10">
                                        <span className="flex items-center gap-1 text-white">
                                            <IconWifi size={7} className="text-lime-400" /> OMS Crewdible
                                        </span>
                                        {/* Interactive Notch */}
                                        <motion.div
                                            onHoverStart={() => setIpadIslandHover(true)}
                                            onHoverEnd={() => setIpadIslandHover(false)}
                                            animate={{
                                                width: ipadIslandHover || ipadHover ? 64 : 36,
                                                height: ipadIslandHover || ipadHover ? 12 : 8
                                            }}
                                            className="bg-black border border-zinc-700 rounded-full flex items-center justify-center gap-1 cursor-pointer px-1"
                                        >
                                            {ipadIslandHover || ipadHover ? (
                                                <span className="text-[5.5px] text-blue-400 font-black tracking-wide uppercase">Connected</span>
                                            ) : (
                                                <div className="w-1 h-1 rounded-full bg-zinc-700" />
                                            )}
                                        </motion.div>
                                    </div>

                                    {/* Body Layout */}
                                    <div className="flex-1 flex gap-2 mt-2 items-center">
                                        <div className="w-18 h-full rounded-lg bg-zinc-950/80 border border-zinc-800 p-1.5 flex flex-col justify-between">
                                            <span className="text-[5.5px] text-zinc-400 uppercase tracking-widest font-black">Performance</span>
                                            <div className="h-6 flex items-center justify-center">
                                                <IconActivity size={14} className="text-lime-400 animate-pulse" />
                                            </div>
                                            <span className="text-[8.5px] font-bold text-white text-center">98.4%</span>
                                        </div>

                                        <div className="flex-1 h-full flex flex-col gap-1.5">
                                            <div className="h-10 rounded-lg bg-zinc-950/80 border border-zinc-800 p-1.5 flex flex-col justify-between">
                                                <span className="text-[5px] text-zinc-400 uppercase tracking-widest font-black">Order Fulfillment</span>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-[8.5px] font-bold text-white">+24% Convert</span>
                                                    <span className="text-[6px] text-lime-400 font-bold uppercase">Optimal</span>
                                                </div>
                                            </div>
                                            <div className="flex-1 rounded-lg bg-zinc-950/80 border border-zinc-800 p-1.5 flex items-center justify-between">
                                                <span className="text-[5.5px] text-zinc-400 uppercase tracking-widest font-black">Sync Time</span>
                                                <span className="text-[8px] font-bold text-lime-400">1.2s ago</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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

                {/* Feature Highlights Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-16">

                    {/* Card 1: Design Systems & Tokens */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="rounded-2xl border border-zinc-200 dark:border-white/[0.08] bg-zinc-50/80 dark:bg-zinc-900/40 p-6 flex flex-col justify-between h-[280px] shadow-sm hover:border-zinc-300 dark:hover:border-white/20 transition-all duration-300 hover:scale-[1.02]"
                    >
                        {/* Visual Animation */}
                        <div className="h-28 border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-950/70 rounded-xl flex items-center justify-center relative overflow-hidden group">
                            {/* Left node */}
                            <div className="w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center relative z-10">
                                <div className="w-4 h-4 rounded-full bg-lime-500/20 border border-lime-500/40 flex items-center justify-center">
                                    <span className="w-1.5 h-1.5 rounded-full bg-lime-500" />
                                </div>
                            </div>

                            {/* Connecting animated dashed path */}
                            <div className="w-16 h-[1px] border-t border-dashed border-zinc-300 dark:border-zinc-700 relative mx-2">
                                <motion.div
                                    animate={{ left: ["0%", "100%"] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                    className="absolute top-[-1px] w-3 h-[2px] bg-gradient-to-r from-transparent via-lime-500 to-transparent"
                                />
                            </div>

                            {/* Center Lock / Security */}
                            <div className="w-11 h-11 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 flex items-center justify-center relative z-10 shadow-md">
                                <IconLock size={18} className="text-lime-500" />
                            </div>

                            {/* Connecting animated dashed path */}
                            <div className="w-16 h-[1px] border-t border-dashed border-zinc-300 dark:border-zinc-700 relative mx-2">
                                <motion.div
                                    animate={{ left: ["100%", "0%"] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                    className="absolute top-[-1px] w-3 h-[2px] bg-gradient-to-r from-transparent via-lime-500 to-transparent"
                                />
                            </div>

                            {/* Right node */}
                            <div className="w-8 h-8 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center relative z-10">
                                <div className="w-4 h-4 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-1.5 uppercase tracking-wider">
                                Design Systems & Tokens
                            </h3>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                                Translating Figma variables into typed React design tokens for 100% visual consistency across platforms.
                            </p>
                        </div>
                    </motion.div>

                    {/* Card 2: Enterprise & Mission-Critical Web */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="rounded-2xl border border-zinc-200 dark:border-white/[0.08] bg-zinc-50/80 dark:bg-zinc-900/40 p-6 flex flex-col justify-between h-[280px] shadow-sm hover:border-zinc-300 dark:hover:border-white/20 transition-all duration-300 hover:scale-[1.02]"
                    >
                        {/* Dotted Grid map visual */}
                        <div className="h-28 border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-950/70 rounded-xl flex items-center justify-center relative overflow-hidden group">
                            <svg className="absolute inset-0 w-full h-full p-2 opacity-30" viewBox="0 0 200 100" fill="none">
                                <path d="M 0 20 L 200 20 M 0 40 L 200 40 M 0 60 L 200 60 M 0 80 L 200 80" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 3" />
                                <path d="M 40 0 L 40 100 M 80 0 L 80 100 M 120 0 L 120 100 M 160 0 L 160 100" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 3" />
                                <circle cx="45" cy="35" r="1.5" fill="#84cc16" />
                                <circle cx="95" cy="25" r="1.5" fill="#84cc16" />
                                <circle cx="145" cy="55" r="1.5" fill="#3b82f6" />
                            </svg>

                            <div className="absolute top-5 left-10 flex flex-col items-center">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-lime-500"></span>
                                </span>
                            </div>

                            <div className="absolute bottom-6 right-12 flex flex-col items-center">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                                </span>
                            </div>

                            <div className="w-8 h-8 rounded-full border border-blue-500/40 bg-blue-500/10 flex items-center justify-center z-10 shadow-lg">
                                <IconWorld size={14} className="text-blue-500 dark:text-blue-400" />
                            </div>
                        </div>

                        <div>
                            <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-1.5 uppercase tracking-wider">
                                Enterprise & ERP Systems
                            </h3>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                                Specialized in complex data architectures for Korlantas Polri, PT Liftech, and Symbolix.ai.
                            </p>
                        </div>
                    </motion.div>

                    {/* Card 3: Measured Impact */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="rounded-2xl border border-zinc-200 dark:border-white/[0.08] bg-zinc-50/80 dark:bg-zinc-900/40 p-6 flex flex-col justify-between h-[280px] shadow-sm hover:border-zinc-300 dark:hover:border-white/20 transition-all duration-300 hover:scale-[1.02]"
                    >
                        {/* Impact stats pill showcase */}
                        <div className="h-28 border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-950/70 rounded-xl flex items-center justify-center gap-3 relative overflow-hidden group">
                            <div className="w-13 h-13 rounded-xl border border-lime-500/30 bg-lime-500/10 flex flex-col items-center justify-center p-1.5 shadow-sm">
                                <span className="text-[10px] font-black text-lime-600 dark:text-lime-400">+25%</span>
                                <span className="text-[6px] font-bold text-zinc-500 uppercase tracking-wider">Adoption</span>
                            </div>
                            <div className="w-13 h-13 rounded-xl border border-blue-500/30 bg-blue-500/10 flex flex-col items-center justify-center p-1.5 shadow-sm">
                                <span className="text-[10px] font-black text-blue-600 dark:text-blue-400">+28%</span>
                                <span className="text-[6px] font-bold text-zinc-500 uppercase tracking-wider">CSAT</span>
                            </div>
                            <div className="w-13 h-13 rounded-xl border border-amber-500/30 bg-amber-500/10 flex flex-col items-center justify-center p-1.5 shadow-sm">
                                <span className="text-[10px] font-black text-amber-600 dark:text-amber-400">-30%</span>
                                <span className="text-[6px] font-bold text-zinc-500 uppercase tracking-wider">Cycles</span>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-base font-bold text-zinc-900 dark:text-white mb-1.5 uppercase tracking-wider">
                                Production Impact
                            </h3>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                                Accelerating feature delivery by 30% with zero regression, high accessibility, and 98+ Core Web Vitals.
                            </p>
                        </div>
                    </motion.div>

                </div>
            </div>
        </div>
    );
}
