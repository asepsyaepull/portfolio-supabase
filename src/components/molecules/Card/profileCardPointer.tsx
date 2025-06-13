'use client';
import { FollowerPointerCard } from "@/components/ui/following-pointer";

// Tambahkan data blog content yang hilang
const blogContent = {
    author: "Asep Syaepul",
    authorAvatar: "/assets/images/profile.PNG",
    image: "/assets/images/profile.PNG",
    title: "Portfolio Project",
    description: "A showcase of my skills and projects",
    date: "June 2023"
};

// Tambahkan TitleComponent yang hilang
function TitleComponent({ title, avatar }: { title: string, avatar: string }) {
    return (
        <div className="flex items-center gap-2">
            <img
                src={avatar}
                alt={title}
                className="h-6 w-6 rounded-full"
            />
            <span className="text-sm font-medium">{title}</span>
        </div>
    );
}

export function ProfileCardPointer() {
    return (
        <div className="w-80 max-w-md h-96">
            <FollowerPointerCard
                title={
                    <TitleComponent
                        title={blogContent.author}
                        avatar={blogContent.authorAvatar}
                    />
                }
            >
                <div className="group relative h-full overflow-hidden rounded-2xl border border-zinc-100 bg-white transition duration-200 hover:shadow-xl">
                    <div className="relative aspect-[10/12] w-full overflow-hidden rounded-tl-lg rounded-tr-lg bg-gray-700">
                        <img
                            src={blogContent.image}
                            alt="thumbnail"
                            className="h-full w-full transform object-cover transition duration-200 group-hover:scale-95 group-hover:rounded-2xl"
                        />
                    </div>
                    {/* <div className="p-4">
                        <h2 className="my-4 text-lg font-bold text-zinc-700">
                            {blogContent.title}
                        </h2>
                        <h2 className="my-4 text-sm font-normal text-zinc-500">
                            {blogContent.description}
                        </h2>
                        <div className="mt-10 flex flex-row items-center justify-between">
                            <span className="text-sm text-gray-500">{blogContent.date}</span>
                            <div className="relative z-10 block rounded-xl bg-black px-6 py-2 text-xs font-bold text-white">
                                Read More
                            </div>
                        </div>
                    </div> */}
                </div>
            </FollowerPointerCard>
        </div>
    );
}
