import { AboutPage } from "@/components/sections/about/about-page";
import {
  WorkExperience,
  WorkExperienceSkeleton,
} from "@/components/sections/experience/work-experience";
import { Metadata } from "next";
import React, { Suspense } from "react";

import { JourneyTitle } from "@/components/sections/about/journey-title";

export const metadata: Metadata = {
  title: "About | Asep Syaepul",
  description: "Learn more about Asep Syaepul's professional journey, skills, and experience.",
};

export default function About() {
  return (
    <div className="bg-zinc-50 dark:bg-gray-950 min-h-screen transition-colors duration-300">
      <AboutPage />
      <div className="container mx-auto px-4 md:px-24 pb-20">
        <JourneyTitle />
        <Suspense fallback={<WorkExperienceSkeleton />}>
          <WorkExperience />
        </Suspense>
      </div>
    </div>
  );
}
