"use client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import {
    Navbar,
    NavBody,
    NavItems,
    MobileNav,
    NavbarLogo,
    MobileNavHeader,
    MobileNavToggle,
    MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function NavbarMenu() {
    const navItems = [
        {
            name: "Home",
            link: "/",
        },
        {
            name: "About",
            link: "/about",
        },
        {
            name: "Projects",
            link: "/projects",
        },
        {
            name: "Contact",
            link: "/contact",
        },
    ];

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="relative w-full">
            <Navbar className="fixed top-0">
                {/* Desktop Navigation */}
                <NavBody>
                    <NavbarLogo aria-label="A.SYA Home" />
                    <NavItems items={navItems} />
                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                        <HoverBorderGradient
                            containerClassName="rounded-full hidden md:block"
                            as="button"
                            className="bg-lime-500 text-black dark:bg-lime-500 dark:text-black flex items-center space-x-2 px-4 py-2"
                        >
                            <span className="text-xs font-bold tracking-tighter">LET'S COLLABORATE</span>
                            <ArrowRight className="h-4 w-4" />
                        </HoverBorderGradient>
                    </div>
                </NavBody>

                {/* Mobile Navigation */}
                <MobileNav>
                    <MobileNavHeader>
                        <NavbarLogo aria-label="A.SYA Home" />
                        <div className="flex items-center gap-4">
                            <ThemeToggle />
                            <MobileNavToggle
                                isOpen={isMobileMenuOpen}
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                            />
                        </div>
                    </MobileNavHeader>

                    <MobileNavMenu
                        isOpen={isMobileMenuOpen}
                        onClose={() => setIsMobileMenuOpen(false)}
                    >
                        {navItems.map((item, idx) => (
                            <Link
                                key={`mobile-link-${idx}`}
                                href={item.link}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="relative text-zinc-900 dark:text-white"
                            >
                                <span className="block">{item.name}</span>
                            </Link>
                        ))}
                        <div className="flex w-full flex-col gap-4">
                            <HoverBorderGradient
                                containerClassName="rounded-full w-full"
                                as="button"
                                className="bg-lime-500 text-black dark:bg-lime-500 dark:text-black flex items-center justify-center space-x-2 px-4 py-3"
                            >
                                <span className="text-xs font-bold tracking-tighter">LET'S COLLABORATE</span>
                                <ArrowRight className="h-4 w-4" />
                            </HoverBorderGradient>
                        </div>
                    </MobileNavMenu>
                </MobileNav>
            </Navbar>
        </div >
    );
}

export default NavbarMenu;