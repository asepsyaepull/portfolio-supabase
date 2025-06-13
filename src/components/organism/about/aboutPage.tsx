'use client';
import { ProfileCardPointer } from '@/components/molecules/Card/profileCardPointer';
import CountUp from '@/components/molecules/CountUp/CountUp';
import React from 'react'

export default function AboutPage() {
    return (
        <div>
            <div className="h-screen bg-gray-950">
                <div className="container mx-auto px-4 md:px-20 relative z-10 overflow-hidden items-center justify-center py-28">
                    {/* Header Section */}
                    <div className="text-start px-24">
                        <h1 className="text-2xl md:text-4xl font-bold text-white mb-4">About Me</h1>
                        <p className="text-lg md:text-xl text-gray-400">
                            Welcome to my portfolio! Here you can find out more about my work and projects.
                        </p>
                    </div>

                    <div className="flex flex-col py-16 gap-4 md:flex-row items-start w-full h-full">
                        {/* Profile Card */}
                        <div className="md:flex-1 flex items-center justify-center">
                            <ProfileCardPointer />
                        </div>

                        {/* Description */}
                        <div className="md:flex-1 flex flex-col h-full px-24 justify-between text-white transition-transform">
                            <div className='flex flex-col h-96 gap-4'>
                                <p className="text-lg mb-8">
                                    Front-End Development enthusiast with a strong foundation in UI/UX Design and 6+ years of experience creating user-friendly interfaces, with a proven track record of delivering seamless digital experiences, increasing conversion rates by 24%, and boosting user growth by 25%. Currently deep diving into HTML, CSS, JavaScript, React, and Next.js, focusing on building scalable and efficient front-end solutions
                                </p>
                            </div>
                            <div className='flex gap-20'>
                                <div className='flex flex-col gap-2'>
                                    <h2 className="text-xl font-medium text-white">
                                        Experience
                                    </h2>
                                    <p className="text-md text-gray-400">
                                        <CountUp
                                            from={0}
                                            to={5}
                                            separator=","
                                            direction="up"
                                            duration={10}
                                            className="text-5xl font-bold text-white"
                                        />
                                    </p>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <h2 className="text-xl font-medium text-white">
                                        Experience
                                    </h2>
                                    <p className="text-md text-gray-400">
                                        <CountUp
                                            from={0}
                                            to={5}
                                            separator=","
                                            direction="up"
                                            duration={10}
                                            className="text-5xl font-bold text-white"
                                        />
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}