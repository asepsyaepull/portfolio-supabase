import AboutPage from "@/components/organism/about/aboutPage";
import { WorkExperience, WorkExperienceSkeleton } from "@/components/molecules/Timeline/workExperience";
import { Metadata } from "next";
import React, { Suspense } from "react";

export const metadata: Metadata = {
  title: "About | Asep Syaepul",
  description: "Learn more about Asep Syaepul's professional journey, skills, and experience.",
};

export default function About() {
  return (
    <div className="bg-zinc-50 dark:bg-gray-950 min-h-screen transition-colors duration-300">
      <AboutPage />
      <div className="container mx-auto px-4 md:px-24 pb-20">
        <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-10 px-4 md:px-24 transition-colors">
          Professional Journey
        </h2>
        <Suspense fallback={<WorkExperienceSkeleton />}>
          <WorkExperience />
        </Suspense>
      </div>
    </div>
  );
}
