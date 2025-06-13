"use client";

import { StarsIcon } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

const skills = [
    'PRODUCT DESIGN',
    'DEVELOPMENT',
    'UI/UX DESIGN',
    'PRODUCT DESIGN',
    'DEVELOPMENT',
    'UI/UX DESIGN',
];

export function Marquee() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Duplikan item untuk membuat loop mulus
    const duplicatedSkills = [...skills, ...skills];

    return (
        <div className="relative overflow-hidden bg-transparent py-6 rotate-3">
            {isMounted && (
                <div
                    className="marquee-animation flex items-center whitespace-nowrap"
                    style={{
                        '--animation-duration': '25s',
                    } as React.CSSProperties}
                >
                    {duplicatedSkills.map((skill, index) => (
                        <div
                            key={`skill-${index}`}
                            className="flex items-center mr-8"
                        >
                            <span className="text-white text-xl font-medium tracking-wider">
                                {skill}
                            </span>
                            <StarsIcon className="w-4 h-4 text-lime-400 fill-lime-400 ml-4" />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}