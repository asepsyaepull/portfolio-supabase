'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ProfileCardPointer } from './profile-card-pointer';
import { useLanguage } from '@/context/language-context';
import {
  IconBrandFigma,
  IconBrandFramer,
  IconBrandReact,
  IconBrandNextjs,
  IconBrandTypescript,
  IconBrandTailwind,
  IconBrandJavascript,
} from "@tabler/icons-react";

export function AboutPage() {
    const { t } = useLanguage();
    const about = t.aboutPage;

    return (
        <div className="bg-zinc-50 dark:bg-gray-950 pt-20 transition-colors duration-300">
            <div className="container mx-auto px-4 md:px-24 py-20">
                {/* Hero Section - Intro */}
                <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-lime-500 font-mono tracking-widest text-sm uppercase">{about.badge}</span>
                        <h1 className="text-4xl md:text-7xl font-bold text-zinc-900 dark:text-white mt-4 mb-8 leading-tight transition-colors">
                            {about.headlineMain} <br />
                            <span className="text-zinc-500 text-3xl md:text-5xl">{about.headlineSub}</span>
                        </h1>
                        <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6 transition-colors">
                            {about.bio1Prefix}<span className="text-zinc-900 dark:text-white font-semibold transition-colors">{about.bio1Name}</span>{about.bio1Suffix}
                        </p>
                        <p className="text-zinc-500 leading-relaxed text-justify">
                            {about.bio2}
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex justify-center"
                    >
                        <ProfileCardPointer />
                    </motion.div>
                </div>

                {/* Skills Matrix */}
                <div className="mb-32">
                    <h2 className="text-2xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-12 flex items-center gap-4 transition-colors">
                        {about.skillsTitle} <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800 transition-colors" />
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Design Column */}
                        <div className="p-8 rounded-3xl bg-white/50 dark:bg-zinc-900/30 border border-black/5 dark:border-white/5 backdrop-blur-sm transition-colors duration-300">
                            <h3 className="text-lime-600 dark:text-lime-500 font-bold text-xl mb-6">{about.designTitle}</h3>
                            <div className="space-y-4">
                                {about.designSkills.map((skill) => (
                                    <SkillItem key={skill.label} label={skill.label} percent={skill.percent} />
                                ))}
                            </div>
                            <div className="flex gap-4 mt-8 pt-8 border-t border-black/5 dark:border-white/5 transition-colors">
                                <IconBrandFigma className="text-2xl text-zinc-400 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-white transition-colors" />
                                <IconBrandFramer className="text-2xl text-zinc-400 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-white transition-colors" />
                            </div>
                        </div>

                        {/* Development Column */}
                        <div className="p-8 rounded-3xl bg-white/50 dark:bg-zinc-900/30 border border-black/5 dark:border-white/5 backdrop-blur-sm transition-colors duration-300">
                            <h3 className="text-lime-600 dark:text-lime-500 font-bold text-xl mb-6">{about.devTitle}</h3>
                            <div className="space-y-4">
                                {about.devSkills.map((skill) => (
                                    <SkillItem key={skill.label} label={skill.label} percent={skill.percent} />
                                ))}
                            </div>
                            <div className="flex gap-4 mt-8 pt-8 border-t border-black/5 dark:border-white/5 transition-colors">
                                <IconBrandReact className="text-2xl text-zinc-400 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-white transition-colors" />
                                <IconBrandNextjs className="text-2xl text-zinc-400 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-white transition-colors" />
                                <IconBrandTypescript className="text-2xl text-zinc-400 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-white transition-colors" />
                                <IconBrandTailwind className="text-2xl text-zinc-400 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-white transition-colors" />
                                <IconBrandJavascript className="text-2xl text-zinc-400 hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-white transition-colors" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Education Section */}
                <div>
                    <h2 className="text-2xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-12 flex items-center gap-4 transition-colors">
                        {about.foundationsTitle} <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800 transition-colors" />
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {about.education.map((edu, idx) => (
                            <EducationCard
                                key={idx}
                                school={edu.school}
                                degree={edu.degree}
                                year={edu.year}
                                gpa={edu.gpa}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

const SkillItem = ({ label, percent }: { label: string, percent: number }) => (
    <div className="w-full">
        <div className="flex justify-between mb-2">
            <span className="text-sm text-zinc-600 dark:text-zinc-300 transition-colors">{label}</span>
            <span className="text-sm text-zinc-400 dark:text-zinc-500 transition-colors">{percent}%</span>
        </div>
        <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
            <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${percent}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-lime-500"
            />
        </div>
    </div>
);

const EducationCard = ({ school, degree, year, gpa }: { school: string, degree: string, year: string, gpa: string }) => (
    <div className="p-6 rounded-3xl bg-white/50 dark:bg-zinc-900/50 border border-black/5 dark:border-white/5 group hover:border-lime-500/50 transition-all duration-300">
        <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500 mb-2 block transition-colors">{year}</span>
        <h4 className="text-zinc-900 dark:text-white font-bold text-lg mb-1 group-hover:text-lime-600 dark:group-hover:text-lime-500 transition-colors">{school}</h4>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 transition-colors">{degree}</p>
        <span className="inline-block px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 text-xs font-medium">
            {gpa}
        </span>
    </div>
);

export default AboutPage;
