import React from "react";
import { Timeline } from "@/components/ui/timeline";
import { getStaticClient } from "@/lib/supabase/server";

export async function WorkExperience() {
    const supabase = getStaticClient();
    const { data: experiences, error } = await supabase
        .from("experiences")
        .select("*")
        .order("order_idx", { ascending: true });

    if (error) {
        console.error("Error fetching experiences:", error);
    }

    const data = (experiences || []).map((exp) => ({
        title: exp.title,
        subtitle: exp.subtitle,
        content: (
            <div className="flex flex-col gap-4">
                {exp.content_paragraphs?.map((paragraph: string, idx: number) => (
                    <p key={idx} className="text-zinc-600 dark:text-zinc-400 text-sm md:text-base leading-relaxed transition-colors">
                        {paragraph}
                    </p>
                ))}
            </div>
        ),
    }));

    return (
        <div className="relative w-full overflow-clip">
            <Timeline data={data} />
        </div>
    );
}

export function WorkExperienceSkeleton() {
    return (
        <div className="w-full flex flex-col gap-10 md:px-10 py-10 animate-pulse">
            {[1, 2, 3].map((idx) => (
                <div key={idx} className="flex justify-start md:gap-10">
                    <div className="hidden md:flex flex-col w-1/3 gap-3 pt-4">
                        <div className="h-6 w-3/4 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
                        <div className="h-4 w-1/2 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
                    </div>
                    <div className="flex flex-col w-full md:w-2/3 gap-4 border-l-2 border-zinc-200 dark:border-zinc-800 pl-8 relative">
                        <div className="absolute w-4 h-4 rounded-full bg-zinc-300 dark:bg-zinc-700 -left-[9px] top-4"></div>

                        <div className="md:hidden flex flex-col gap-2 mb-4">
                            <div className="h-6 w-3/4 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
                            <div className="h-4 w-1/2 bg-zinc-200 dark:bg-zinc-800 rounded"></div>
                        </div>

                        <div className="h-4 w-full bg-zinc-100 dark:bg-zinc-800/50 rounded"></div>
                        <div className="h-4 w-full bg-zinc-100 dark:bg-zinc-800/50 rounded"></div>
                        <div className="h-4 w-5/6 bg-zinc-100 dark:bg-zinc-800/50 rounded"></div>
                    </div>
                </div>
            ))}
        </div>
    );
}
