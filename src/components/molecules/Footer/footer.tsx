import React from "react";
import { IconBrandGithub, IconBrandInstagram, IconBrandLinkedin, IconBrandX } from "@tabler/icons-react";
import dynamic from "next/dynamic";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

export default function Footer() {
    return (
        <footer className="bg-zinc-50 dark:bg-gray-950 text-zinc-900 dark:text-white py-8 border-t border-zinc-200 dark:border-white/5 transition-colors duration-300">
            <div className="container mx-auto px-4 md:px-28">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-bold mb-2">Stay Connected</h2>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4 transition-colors">Follow me on social media for updates and more.</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <HoverBorderGradient
                            containerClassName="rounded-full"
                            as="button"
                            className="px-2 py-2 bg-transparent text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-lime-500/20 dark:hover:bg-lime-500/20 transition-colors duration-300">
                            <span className="flex items-center gap-2 text-sm"><IconBrandX className="w-5 h-5" /></span>
                        </HoverBorderGradient>
                        <HoverBorderGradient
                            containerClassName="rounded-full"
                            as="button"
                            className="px-2 py-2 bg-transparent text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-lime-500/20 dark:hover:bg-lime-500/20 transition-colors duration-300">
                            <span className="flex items-center gap-2 text-sm"><IconBrandLinkedin className="w-5 h-5" /></span>
                        </HoverBorderGradient>
                        <HoverBorderGradient
                            containerClassName="rounded-full"
                            as="button"
                            className="px-2 py-2 bg-transparent text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-lime-500/20 dark:hover:bg-lime-500/20 transition-colors duration-300">
                            <span className="flex items-center gap-2 text-sm"><IconBrandGithub className="w-5 h-5" /></span>
                        </HoverBorderGradient>
                        <HoverBorderGradient
                            containerClassName="rounded-full"
                            as="button"
                            className="px-2 py-2 bg-transparent text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-lime-500/20 dark:hover:bg-lime-500/20 transition-colors duration-300">
                            <span className="flex items-center gap-2 text-sm"><IconBrandInstagram className="w-5 h-5" /></span>
                        </HoverBorderGradient>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center border-t border-zinc-200 dark:border-white/5 pt-8 transition-colors">
                    <div className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">
                        © {new Date().getFullYear()} Asep Syaepul. All rights reserved.
                    </div>
                    <div className="flex text-sm space-x-6 mt-4 md:mt-0 font-medium text-zinc-500 dark:text-zinc-400">
                        <a href="#" className="hover:text-lime-600 dark:hover:text-lime-500 transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-lime-600 dark:hover:text-lime-500 transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-lime-600 dark:hover:text-lime-500 transition-colors">Contact</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}