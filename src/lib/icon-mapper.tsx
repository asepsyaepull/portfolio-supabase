import React from "react";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
  IconFileCode
} from "@tabler/icons-react";
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

// Map string to Tabler Icon components (for Projects)
const TablerIconMap: Record<string, React.ElementType> = {
  IconClipboardCopy: IconClipboardCopy,
  IconFileBroken: IconFileBroken,
  IconSignature: IconSignature,
  IconTableColumn: IconTableColumn,
  IconArrowWaveRightUp: IconArrowWaveRightUp,
  IconBoxAlignRightFilled: IconBoxAlignRightFilled,
  IconBoxAlignTopLeft: IconBoxAlignTopLeft,
  IconFileCode: IconFileCode
};

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

export const getTablerIcon = (iconName: string, className?: string) => {
  const IconComponent = TablerIconMap[iconName] || IconFileCode;
  return <IconComponent className={className} />;
};

export const getSimpleIcon = (iconName: string, className?: string) => {
  const IconComponent = SimpleIconMap[iconName] || SiJavascript;
  return <IconComponent className={className} />;
};
