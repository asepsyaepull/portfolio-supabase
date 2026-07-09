"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion"; // Perbaikan import
import { useOutsideClick } from "@/hooks/use-outside-click";
import type { IProjects } from "@/types/project";
import supabase from "@/lib/db";
import Image from "next/image";

// Tambahkan interface untuk menyesuaikan dengan format cards
interface CardItem {
    title: string;
    description: string;
    src: string;
    ctaLink: string;
    ctaText: string;
    content: React.ReactNode | (() => React.ReactNode);
}

interface ProjectCardProps {
    initialProjects?: IProjects[];
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ initialProjects }) => {
    const [projects, setProjects] = useState<IProjects[]>(initialProjects || []);
    const [isLoading, setIsLoading] = useState(!initialProjects);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (initialProjects) return;

        const fetchProjects = async () => {
            try {
                setIsLoading(true);
                const { data, error } = await supabase.from("projects").select("*").limit(10);

                if (error) {
                    console.error("Error fetching projects:", error);
                    setError(error.message);
                } else {
                    console.log("Projects data:", data);
                    setProjects(data || []);
                }
            } catch (err) {
                console.error("Unexpected error:", err);
                setError("Terjadi kesalahan saat mengambil data");
            } finally {
                setIsLoading(false);
            }
        };

        fetchProjects();
    }, []);

    const [active, setActive] = useState<CardItem | null>(null);
    const id = useId();
    const ref = useRef<HTMLDivElement>(null);

    // Fungsi untuk mengkonversi IProjects menjadi format CardItem
    const convertProjectToCard = (project: IProjects): CardItem => {
        return {
            title: project.name,
            description: project.description,
            src: project.image,
            ctaLink: "#",  // Tambahkan link default jika diperlukan
            ctaText: "Lihat Proyek",
            content: (
                <div>
                    <p>{project.description}</p>
                    <p className="mt-4"><strong>Category:</strong> {project.category}</p>
                </div>
            )
        };
    };

    useEffect(() => {
        function onKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setActive(null);
            }
        }

        if (active) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [active]);

    useOutsideClick(ref, () => setActive(null));

    // Tampilkan loading state
    if (isLoading) {
        return (
            <div className="max-w-2xl mx-auto w-full py-20 flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
        );
    }

    // Tampilkan error state
    if (error) {
        return (
            <div className="max-w-2xl mx-auto w-full py-20 text-center">
                <p className="text-red-500">Error: {error}</p>
                <button // Perbaikan: Tambahkan tipe button
                    onClick={() => window.location.reload()}
                    className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md"
                >
                    Coba Lagi
                </button>
            </div>
        );
    }

    // Tampilkan pesan jika tidak ada data
    if (projects.length === 0) {
        return (
            <div className="max-w-2xl mx-auto w-full py-20 text-center">
                <p className="text-gray-500 dark:text-gray-400">
                    Tidak ada project yang tersedia.
                </p>

                {/* Contoh data dummy untuk testing */}
                <button // Perbaikan: Tambahkan tipe button
                    onClick={() => {
                        const dummyData: IProjects[] = [
                            {
                                id: 1,
                                name: "Portfolio Website",
                                description: "A personal portfolio website built with Next.js",
                                category: "Web Development",
                                image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97"
                            },
                            {
                                id: 2,
                                name: "E-commerce App",
                                description: "A full-stack e-commerce application",
                                category: "Full Stack",
                                image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43"
                            }
                        ];
                        setProjects(dummyData);
                    }}
                    className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md"
                >
                    Load Test Data
                </button>
            </div>
        );
    }

    return (
        <>
            <AnimatePresence>
                {active && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/20 h-full w-full z-10"
                    />
                )}
            </AnimatePresence>
            <AnimatePresence>
                {active ? (
                    <div className="fixed inset-0 grid place-items-center z-[100]">
                        <motion.button
                            key={`button-${active.title}-${id}`}
                            layout
                            initial={{
                                opacity: 0,
                            }}
                            animate={{
                                opacity: 1,
                            }}
                            exit={{
                                opacity: 0,
                                transition: {
                                    duration: 0.05,
                                },
                            }}
                            className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
                            onClick={() => setActive(null)}
                        >
                            <CloseIcon />
                        </motion.button>
                        <motion.div
                            layoutId={`card-${active.title}-${id}`}
                            ref={ref}
                            className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
                        >
                            <motion.div layoutId={`image-${active.title}-${id}`}>
                                <Image
                                    width={200}
                                    height={200}
                                    src={active.src}
                                    alt={active.title}
                                    className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                                />
                            </motion.div>

                            <div>
                                <div className="flex justify-between items-start p-4">
                                    <div className="">
                                        <motion.h3
                                            layoutId={`title-${active.title}-${id}`}
                                            className="font-medium text-neutral-700 dark:text-neutral-200 text-base"
                                        >
                                            {active.title}
                                        </motion.h3>
                                        <motion.p
                                            layoutId={`description-${active.description}-${id}`}
                                            className="text-neutral-600 dark:text-neutral-400 text-base"
                                        >
                                            {active.description}
                                        </motion.p>
                                    </div>

                                    <motion.a
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        href={active.ctaLink}
                                        target="_blank"
                                        className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white"
                                    >
                                        {active.ctaText}
                                    </motion.a>
                                </div>
                                <div className="pt-4 relative px-4">
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                                    >
                                        {typeof active.content === "function"
                                            ? active.content()
                                            : active.content}
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                ) : null}
            </AnimatePresence>
            <ul className="max-w-2xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 items-start gap-4">
                {projects.map((project: IProjects) => (
                    <motion.div
                        layoutId={`card-${project.name}-${id}`}
                        key={project.id}
                        onClick={() => setActive(convertProjectToCard(project))}
                        className="p-4 flex flex-col hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer" // Perbaikan: Tambahkan cursor-pointer
                    >
                        <div className="flex gap-4 flex-col w-full">
                            <motion.div layoutId={`image-${project.name}-${id}`}>
                                <Image
                                    width={100}
                                    height={100}
                                    src={project.image}
                                    alt={project.name}
                                    className="h-60 w-full rounded-lg object-cover object-top"
                                />
                            </motion.div>
                            <div className="flex justify-center items-center flex-col">
                                <motion.h3
                                    layoutId={`title-${project.name}-${id}`}
                                    className="font-medium text-neutral-800 dark:text-neutral-200 text-center md:text-left text-base"
                                >
                                    {project.name}
                                </motion.h3>
                                <motion.p
                                    layoutId={`description-${project.description}-${id}`}
                                    className="text-neutral-600 dark:text-neutral-400 text-center md:text-left text-base"
                                >
                                    {project.description}
                                </motion.p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </ul>
        </>
    );
}

export const CloseIcon = () => {
    return (
        <motion.svg
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
            }}
            exit={{
                opacity: 0,
                transition: {
                    duration: 0.05,
                },
            }}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 text-black"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M18 6l-12 12" />
            <path d="M6 6l12 12" />
        </motion.svg>
    );
};
