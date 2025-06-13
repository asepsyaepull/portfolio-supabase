import React, { useEffect, useState } from "react";
import { motion } from "framer-motion"; // Perbaikan import
import { ArrowRightCircle, ArrowRightIcon } from "lucide-react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/moving-border";
import Lanyard from "@/components/molecules/Lanyard/Lanyard";
import { Marquee } from "@/components/molecules/marquee/marquee";
import AnimatedShinyText from '../../ui/animated-shiny-text';
import { Badge } from "@/components/ui/badge"

export default function Hero() {
    const [isMounted, setIsMounted] = useState(false);

    // Define the words array for ContainerTextFlip
    const words = ["Frontend Developer", "UI/UX Designer", "Product Designer", "Creative Coder"];

    // Tunggu sampai komponen dimount di client-side
    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <div className="min-h-screen bg-gray-950 relative">
            {/* Background elemen dengan absolute positioning */}
            <BackgroundBeams className="absolute inset-0 z-0" />

            {/* Konten utama dengan z-index lebih tinggi */}
            <div className="container mx-auto px-4 md:px-28 relative z-10 overflow-visible">
                <div className="flex flex-col md:flex-row w-full overflow-visible">
                    {/* Kolom kiri - Konten Utama */}
                    <div className="flex-1 flex flex-col justify-center gap-6 py-20 md:py-0 overflow-visible">
                        {isMounted ? (
                            <motion.h1
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className={cn(
                                    "relative mb-2 max-w-4xl text-start text-3xl leading-normal font-semibold tracking-tight text-white md:text-5xl dark:text-zinc-100",
                                )}
                            >
                                <div className="flex flex-col gap-4">
                                    <div className="z-10 flex">
                                        <div
                                            className={cn(
                                                "group rounded-full border border-gray-800 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-gray-900 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800",
                                            )}
                                        >
                                            <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out text-white hover:text-neutral-300 hover:duration-300 hover:dark:text-neutral-400">
                                                <span>✨ Available for work </span>
                                                <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                                            </AnimatedShinyText>
                                        </div>
                                    </div>
                                    <span>I'm Asep Syaepul </span>
                                    <div className="flex items-center gap-2">
                                        {/* Gunakan ContainerTextFlip untuk efek flip pada teks */}
                                        <span className="text-lime-500 text-4xl">I am</span>
                                        <ContainerTextFlip words={words} className="flex py-2 px-3" textClassName="text-white text-3xl" />
                                    </div>
                                </div>
                            </motion.h1>
                        ) : (
                            <h1 className={cn(
                                "relative mb-6 max-w-4xl text-start text-3xl leading-normal font-semibold tracking-tight text-white md:text-5xl dark:text-zinc-100",
                            )}>
                                <div className="flex flex-col gap-8">
                                    I'm Asep Syaepul {words[0]}
                                </div>
                            </h1>
                        )}
                        <div className="text-md md:text-lg font-normal text-white">
                            From the inception of a project to its completion, we employ a comprehensive and holistic approach.
                        </div>
                        <div className="flex flex-wrap gap-4">
                            <Button
                                variant="default"
                                className="flex justify-center items-center bg-lime-500 text-white text-md px-8 py-6 hover:bg-lime-600 hover:text-white transition-all rounded-full">
                                WHAT I DO <ArrowRightCircle className="ml-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                className="flex justify-center items-center text-white text-md hover:border-lime-600 hover:bg-lime-600 hover:text-white transition-all rounded-full px-8 py-6">
                                VIEW WORK <ArrowRightCircle className="ml-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Kolom kanan - Lanyard */}
                    <div className="hidden md:flex flex-1 items-center justify-center overflow-visible relative">
                        {isMounted && (
                            <div className="w-full h-full overflow-visible">
                                <Lanyard position={[0, 0, 14]} gravity={[0, -30, 0]} />
                            </div>
                        )}
                    </div>
                </div>
                {/* Scroll Velocity Section */}
                <div className="absolute  bottom-0 left-0 w-full overflow-visible py-6">
                    <Marquee />
                </div>
            </div>
        </div>
    );
}