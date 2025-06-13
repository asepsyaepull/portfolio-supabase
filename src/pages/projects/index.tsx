import { ProjectCard } from '@/components/molecules/Card/projectCard'
import supabase from '@/lib/db';
import { IProjects } from '@/types/project'
import React, { useEffect, useState } from 'react'

export default function Project() {
    return (
        <div>
            <div className="min-h-screen bg-gray-950">
                <div className="container mx-auto px-4 md:px-28 min-h-screen relative z-10 overflow-visible items-center justify-center">
                    <div className="flex flex-col gap-4 w-full min-h-screen overflow-visible">
                        <div className="md:flex-1 flex flex-col gap-4 text-white">
                            <span className="text-xl">/ Projects</span>
                            <h1 className="text-5xl">Coming Soon...</h1>
                        </div>
                    </div>
                    <ProjectCard />
                </div>
            </div>
        </div>
    )
}
