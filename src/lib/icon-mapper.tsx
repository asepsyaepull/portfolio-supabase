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
  SiJavascript
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
  SiReact: SiReact,
  SiNextdotjs: SiNextdotjs,
  SiTailwindcss: SiTailwindcss,
  SiTypescript: SiTypescript,
  SiFramer: SiFramer,
  SiSupabase: SiSupabase,
  SiThreedotjs: SiThreedotjs,
  SiNodedotjs: SiNodedotjs,
  SiVuedotjs: SiVuedotjs,
  SiJavascript: SiJavascript
};

export const getTablerIcon = (iconName: string, className?: string) => {
  const IconComponent = TablerIconMap[iconName] || IconFileCode;
  return <IconComponent className={className} />;
};

export const getSimpleIcon = (iconName: string, className?: string) => {
  const IconComponent = SimpleIconMap[iconName] || SiJavascript;
  return <IconComponent className={className} />;
};
