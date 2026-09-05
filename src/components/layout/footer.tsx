"use client";

import React from "react";
import {
  CinematicFooter,
  CinematicFooterProps,
} from "@/components/ui/motion-footer";
import { useLanguage } from "@/context/language-context";

export function Footer(props: CinematicFooterProps) {
  const { t } = useLanguage();

  return (
    <CinematicFooter
      heading={t.footer.heading}
      giantText={t.footer.giantText}
      creatorName="Asep Syaepul"
      email="mail.asepsyaepul@gmail.com"
      cvUrl="/cv/CV-Asep-Syaepul-Rohman.pdf"
      githubUrl="https://github.com/asepsyaepull"
      linkedinUrl="https://linkedin.com/in/asepsyaepul"
      marqueeItems={t.footer.marqueeItems}
      {...props}
    />
  );
}

export { CinematicFooter };
export default Footer;
