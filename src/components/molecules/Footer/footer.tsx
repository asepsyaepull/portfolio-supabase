import React from "react";
import { IconBrandGithub, IconBrandInstagram, IconBrandLinkedin, IconBrandX } from "@tabler/icons-react";
import dynamic from "next/dynamic";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

export default function Footer() {
    return (
        <footer className="bg-gray-950 text-white py-8">
            <div className="container mx-auto px-4 md:px-28">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <div className="flex flex-col">
                        <h2 className="text-2xl font-bold mb-4">Stay Connected</h2>
                        <p className="text-sm mb-4">Follow me on social media for updates and more.</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <HoverBorderGradient
                            containerClassName="rounded-full"
                            as="button"
                            className="px-2 py-2 bg-transparent text-white hover:bg-lime-500 transition-colors duration-300">
                            <span className="flex items-center gap-2 text-sm"><IconBrandX /></span>
                        </HoverBorderGradient>
                        <HoverBorderGradient
                            containerClassName="rounded-full"
                            as="button"
                            className="px-2 py-2 bg-transparent text-white hover:bg-lime-500 transition-colors duration-300">
                            <span className="flex items-center gap-2 text-sm"><IconBrandLinkedin /></span>
                        </HoverBorderGradient>
                        <HoverBorderGradient
                            containerClassName="rounded-full"
                            as="button"
                            className="px-2 py-2 bg-transparent text-white hover:bg-lime-500 transition-colors duration-300">
                            <span className="flex items-center gap-2 text-sm"><IconBrandGithub /></span>
                        </HoverBorderGradient>
                        <HoverBorderGradient
                            containerClassName="rounded-full"
                            as="button"
                            className="px-2 py-2 bg-transparent text-white hover:bg-lime-500 transition-colors duration-300">
                            <span className="flex items-center gap-2 text-sm"><IconBrandInstagram /></span>
                        </HoverBorderGradient>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="text-sm">
                        © {new Date().getFullYear()} Asep Syaepul. All rights reserved.
                    </div>
                    <div className="flex text-sm space-x-4 mt-4 md:mt-0">
                        <a href="#" className="hover:text-lime-500">Privacy Policy</a>
                        <a href="#" className="hover:text-lime-500">Terms of Service</a>
                        <a href="#" className="hover:text-lime-500">Contact</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}