import React from "react";
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiFramer,
  SiSupabase,
  SiThreedotjs,
  SiNodedotjs,
  SiVuedotjs,
  SiJavascript,
  SiFigma,
  SiPython,
  SiGo,
  SiPostgresql,
  SiDocker,
  SiGit
} from "react-icons/si";

// Map string to React Icons / Simple Icons (for Skills)
const SimpleIconMap: Record<string, React.ElementType> = {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiFramer,
  SiSupabase,
  SiThreedotjs,
  SiNodedotjs,
  SiVuedotjs,
  SiJavascript,
  SiFigma,
  SiPython,
  SiGo,
  SiPostgresql,
  SiDocker,
  SiGit
};

export const getSimpleIcon = (iconName: string, className?: string) => {
  const IconComponent = SimpleIconMap[iconName] || SiJavascript;
  return <IconComponent className={className} />;
};
