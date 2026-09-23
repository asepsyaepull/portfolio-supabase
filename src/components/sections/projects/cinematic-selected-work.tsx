"use client";

import React from "react";
import { SelectedWorkBento } from "./selected-work-bento";
import type { Project } from "@/types/database";
import { useLanguage } from "@/context/language-context";

interface CinematicSelectedWorkProps {
  projects?: Project[];
  title?: string;
  subtitle?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  archiveTag?: string;
  archiveTitle?: string;
  archiveDescription?: string;
}

export function CinematicSelectedWork({
  projects,
  title,
  subtitle,
  description,
  buttonText,
  buttonLink = "/projects",
  archiveTag,
  archiveTitle,
  archiveDescription,
}: CinematicSelectedWorkProps) {
  const { t } = useLanguage();
  const activeTitle = title || t.work.cinematicTitle;
  const activeSubtitle = subtitle || t.work.cinematicSubtitle;
  const activeDescription = description || t.work.cinematicDescription;
  const activeButtonText = buttonText || t.work.cinematicButton;
  const activeArchiveTag = archiveTag || t.work.archiveCalloutTag;
  const activeArchiveTitle = archiveTitle || t.work.archiveCalloutTitle;
  const activeArchiveDescription =
    archiveDescription || t.work.archiveCalloutDescription;

  return (
    <SelectedWorkBento
      projects={projects}
      title={activeTitle}
      subtitle={activeSubtitle}
      description={activeDescription}
      buttonText={activeButtonText}
      buttonLink={buttonLink}
      archiveTag={activeArchiveTag}
      archiveTitle={activeArchiveTitle}
      archiveDescription={activeArchiveDescription}
    />
  );
}

export default CinematicSelectedWork;
