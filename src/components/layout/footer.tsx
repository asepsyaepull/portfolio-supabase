"use client";

import React from "react";
import {
  CinematicFooter,
  CinematicFooterProps,
} from "@/components/ui/motion-footer";

export function Footer(props: CinematicFooterProps) {
  return (
    <CinematicFooter
      heading="Let's build something great."
      giantText="ASEP SYAEPUL"
      creatorName="Asep Syaepul"
      email="mail.asepsyaepul@gmail.com"
      cvUrl="/cv/CV-Asep-Syaepul-Rohman.pdf"
      githubUrl="https://github.com/asepsyaepull"
      linkedinUrl="https://linkedin.com/in/asepsyaepul"
      marqueeItems={[
        "UI/UX Engineering",
        "Design Systems",
        "React & Next.js",
        "Full-Stack Web",
        "Enterprise Architecture",
        "Micro-Interactions",
      ]}
      {...props}
    />
  );
}

export { CinematicFooter };
export default Footer;
