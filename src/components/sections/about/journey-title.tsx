"use client";

import { useLanguage } from "@/context/language-context";

export function JourneyTitle() {
  const { t } = useLanguage();
  return (
    <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-10 px-4 md:px-24 transition-colors">
      {t.aboutPage.journeyTitle}
    </h2>
  );
}
