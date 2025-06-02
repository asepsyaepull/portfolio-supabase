"use client";
import { ArrowRight } from "lucide-react";
import {
    Navbar,
    NavBody,
    NavItems,
    MobileNav,
    NavbarLogo,
    NavbarButton,
    MobileNavHeader,
    MobileNavToggle,
    MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";
import { Button } from "@/components/ui/moving-border";
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
            <Navbar className="fixed top-0 shadow-lg">
                {/* Desktop Navigation */}
                <NavBody>
                    <NavbarLogo />
                    <NavItems items={navItems} />
                    <Button
                        borderRadius="5rem"
                        className="flex items-center text-sm font-semibold dark:bg-black bg-gray-950 text-lime-500 dark:text-white space-x-2 px-4 py-2 hover:bg-lime-500 hover:text-gray-900 transition-colors duration-300">
                        LET'S COLLABORATE <ArrowRight className="ml-2" />
                    </Button>
                </NavBody>

                {/* Mobile Navigation */}
                <MobileNav>
                    <MobileNavHeader>
                        <NavbarLogo />
                        <MobileNavToggle
                            isOpen={isMobileMenuOpen}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        />
                    </MobileNavHeader>

                    <MobileNavMenu
                        isOpen={isMobileMenuOpen}
                        onClose={() => setIsMobileMenuOpen(false)}
                    >
                        {navItems.map((item, idx) => (
                            <a
                                key={`mobile-link-${idx}`}
                                href={item.link}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="relative text-white dark:text-white"
                            >
                                <span className="block">{item.name}</span>
                            </a>
                        ))}
                        <div className="flex w-full flex-col gap-4">
                            <Button
                                borderRadius="5rem"
                                className="flex items-center text-sm font-semibold dark:bg-black bg-gray-950 text-lime-500 dark:text-white space-x-2 px-4 py-2 hover:bg-lime-500 hover:text-gray-900 transition-colors duration-300">
                                LET'S COLLABORATE <ArrowRight className="ml-2" />
                            </Button>
                        </div>
                    </MobileNavMenu>
                </MobileNav>
            </Navbar>
        </div >
    );
}

export default NavbarMenu;