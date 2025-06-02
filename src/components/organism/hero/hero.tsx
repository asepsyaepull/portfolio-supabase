import React from "react";
import { motion } from "motion/react";
import { ArrowRightCircle } from "lucide-react";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/moving-border";

export default function Hero() {
    const words = ['Product Designer', 'UI/UX Designer', 'Web Developer', 'Frontend Developer'];

    return (
        <div className="min-h-screen bg-gray-950 relative">
            {/* Background elemen dengan absolute positioning */}
            <BackgroundBeams className="absolute inset-0 z-0" />
            {/* Konten utama dengan z-index lebih tinggi */}
            <div className="container mx-auto px-4 md:px-28 min-h-screen relative z-10 overflow-visible">
                <div className="flex flex-col md:flex-row w-full min-h-screen overflow-visible">
                    {/* Kolom kiri - Konten Utama */}
                    <div className="flex-1 flex flex-col justify-center gap-6 py-20 md:py-0 overflow-visible">
                        <motion.h1
                            initial={{
                                opacity: 0,
                            }}
                            whileInView={{
                                opacity: 1,
                            }}
                            className={cn(
                                "relative mb-6 max-w-2xl text-left text-3xl leading-normal font-semibold tracking-tight text-white md:text-7xl dark:text-zinc-100",
                            )}
                            layout
                        >
                            <div className="inline-block">
                                I'm Asep Syaepul <ContainerTextFlip words={words} />
                            </div>
                        </motion.h1>
                        <div className="flex flex-wrap items-center text-white gap-4 transition-transform">
                            <span className="text-md md:text-xl font-normal">
                                passionate who loves to create beautiful and functional digital experiences. With a keen eye for detail and a commitment to quality, I strive to bring ideas to life through innovative design and cutting-edge technology.
                            </span>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            <Button
                                variant="default"
                                className="flex justify-center items-center bg-lime-500 text-white text-md px-8 py-6 hover:bg-lime-600 hover:text-white transition-all rounded-full">
                                WHAT I DO <ArrowRightCircle className="ml-2" />
                            </Button>
                            <Button
                                variant="ghost"
                                className="flex justify-center items-center text-white text-md hover:border-lime-600 hover:bg-lime-600 hover:text-white transition-all rounded-full px-8 py-6">
                                VIEW WORK <ArrowRightCircle className="ml-2" />
                            </Button>
                        </div>
                    </div>

                    {/* Kolom kanan - Lanyard */}
                    <div className="hidden md:flex flex-1 items-center justify-center overflow-visible relative">
                        <div className="w-full h-full overflow-visible">
                            {/* <Lanyard position={[0, 0, 12]} gravity={[0, -30, 0]} /> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}