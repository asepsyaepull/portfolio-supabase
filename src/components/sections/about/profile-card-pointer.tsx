'use client';
import React from 'react'
import { FollowerPointerCard } from "@/components/ui/following-pointer";
import Image from "next/image";

const blogContent = {
    author: "Asep Syaepul",
    authorAvatar: "/assets/images/profile.webp",
    image: "/assets/images/profile.webp",
    title: "Portfolio Project",
    description: "A showcase of my skills and projects",
    date: "June 2023"
};

function TitleComponent({ title, avatar }: { title: string, avatar: string }) {
    return (
        <div className="flex items-center gap-2">
            <Image
                src={avatar}
                alt={title}
                width={24}
                height={24}
                className="h-6 w-6 rounded-full"
            />
            <span className="text-sm font-medium">{title}</span>
        </div>
    );
}

export function ProfileCardPointer() {
    return (
        <div className="w-full max-w-xs sm:max-w-sm h-96">
            <FollowerPointerCard
                title={
                    <TitleComponent
                        title={blogContent.author}
                        avatar={blogContent.authorAvatar}
                    />
                }
            >
                <div className="group relative h-full overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 transition-colors duration-300 hover:shadow-xl">
                    <div className="relative aspect-[10/12] w-full overflow-hidden rounded-tl-lg rounded-tr-lg bg-zinc-200 dark:bg-zinc-800 transition-colors duration-300">
                        <Image
                            src={blogContent.image}
                            alt="thumbnail"
                            fill
                            className="h-full w-full transform object-cover transition duration-200 group-hover:scale-95 group-hover:rounded-2xl"
                        />
                    </div>
                </div>
            </FollowerPointerCard>
        </div>
    );
}

export default ProfileCardPointer;
