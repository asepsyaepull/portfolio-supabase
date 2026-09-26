'use client';

import { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import {
  Battery,
  Sliders,
  ChevronRight,
  Zap,
  Bluetooth,
  Wifi,
  Music,
  LucideIcon,
  Award,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// =========================================
// 1. CONFIGURATION & DATA TYPES
// =========================================

export type ProductId = string;

export interface FeatureMetric {
  label: string;
  value: number; // 0-100
  icon: React.ComponentType<any>;
  level?: string;
  showPercentage?: boolean;
}

export interface ToolItem {
  name: string;
  icon?: React.ComponentType<any>;
}

export interface ProductData {
  id: ProductId;
  label: string; // Display name for the switcher
  tag?: string;  // e.g. "01 DESIGN-SYSTEMS.SPEC"
  title: string;
  subtitle?: string;
  description: string;
  image: string;
  primaryStackLabel?: string;
  colors: {
    gradient: string; // Tailwind gradient classes
    glow: string;     // Tailwind color class for accents
    ring: string;     // Tailwind border color for rings
    barColor?: string;
    textAccent?: string;
  };
  stats: {
    connectionStatus: string;
    batteryLevel?: number;
    ratingText?: string;
  };
  features: FeatureMetric[];
  tools?: ToolItem[];
}

// Default Earbud Data (Provided in Specification)
export const DEFAULT_PRODUCT_DATA: Record<string, ProductData> = {
  left: {
    id: 'left',
    label: 'Left',
    tag: 'SPATIAL AUDIO SPEC',
    title: 'Spatial Anchor',
    subtitle: 'Primary Node · Binaural Sync',
    description: 'The primary node for binaural synchronization. Handles low-latency transmission and anchors the spatial audio soundstage.',
    image: 'https://cdn.21st.dev/assets/mirror/a0/a0cc11a074206ad552e8c5d0a7a68c9b957ed63b0489018b3771232cb77af7d9.png',
    colors: {
      gradient: 'from-blue-600 to-indigo-900',
      glow: 'bg-blue-500',
      ring: 'border-l-blue-500/50',
      barColor: 'bg-blue-500',
      textAccent: 'text-blue-400',
    },
    stats: { connectionStatus: 'Connected', batteryLevel: 82, ratingText: 'Optimal Transmission Sync' },
    features: [
      { label: 'Latency', value: 92, level: 'Ultra Low', icon: Zap },
      { label: 'Sync Rate', value: 98, level: 'Locked', icon: Wifi },
    ],
  },
  right: {
    id: 'right',
    label: 'Right',
    tag: 'BEAMFORMING VOCAL SPEC',
    title: 'Vocal Clarity',
    subtitle: 'Beamforming Array · Crystal Calls',
    description: 'Optimized for high-frequency detail and voice pickup. Contains the beamforming microphone array for crystal clear calls.',
    image: 'https://cdn.21st.dev/assets/mirror/24/2466ed47d5bf888ea82c472c52498c291adca613a19a3a3b00d17922f875e1ea.png',
    colors: {
      gradient: 'from-emerald-600 to-teal-900',
      glow: 'bg-emerald-500',
      ring: 'border-r-emerald-500/50',
      barColor: 'bg-emerald-500',
      textAccent: 'text-emerald-400',
    },
    stats: { connectionStatus: 'Connected', batteryLevel: 74, ratingText: 'High Fidelity Clarity' },
    features: [
      { label: 'Bitrate', value: 94, level: 'Lossless HD', icon: Bluetooth },
      { label: 'Clarifier', value: 88, level: 'Studio Grade', icon: Music },
    ],
  },
};

// =========================================
// 2. ANIMATION VARIANTS
// =========================================

export const ANIMATIONS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 },
    },
  },
  item: {
    hidden: { opacity: 0, y: 16, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { type: 'spring', stiffness: 120, damping: 20 },
    },
    exit: { opacity: 0, y: -10, filter: 'blur(5px)' },
  },
  image: (isFirst: boolean): Variants => ({
    initial: {
      opacity: 0,
      scale: 1.25,
      filter: 'blur(15px)',
      rotate: isFirst ? -20 : 20,
      x: isFirst ? -60 : 60,
    },
    animate: {
      opacity: 1,
      scale: 1.06,
      filter: 'blur(0px)',
      rotate: 0,
      x: 0,
      transition: { type: 'spring', stiffness: 240, damping: 22 },
    },
    exit: {
      opacity: 0,
      scale: 0.75,
      filter: 'blur(15px)',
      transition: { duration: 0.22 },
    },
  }),
};

// =========================================
// 3. SUB-COMPONENTS
// =========================================

export const BackgroundGradient = ({
  isFirst,
  isEmbedded = false,
  glowColor,
}: {
  isFirst: boolean;
  isEmbedded?: boolean;
  glowColor?: string;
}) => (
  <div className={cn('pointer-events-none', isEmbedded ? 'absolute inset-0 overflow-hidden' : 'fixed inset-0')}>
    <motion.div
      animate={{
        background: isFirst
          ? 'radial-gradient(circle at 10% 40%, rgba(240, 83, 28, 0.12), transparent 55%)'
          : 'radial-gradient(circle at 90% 40%, rgba(6, 182, 212, 0.12), transparent 55%)',
      }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-0 opacity-80 dark:opacity-100"
    />
  </div>
);

export const ProductVisual = ({
  data,
  isFirst,
}: {
  data: ProductData;
  isFirst: boolean;
}) => (
  <motion.div layout="position" className="relative group shrink-0 flex flex-col items-center">
    {/* Animated Orbital Rings */}
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      className={cn(
        'absolute inset-[-14%] sm:inset-[-18%] rounded-full border border-dashed border-zinc-300/80 dark:border-white/10 pointer-events-none',
        data.colors.ring
      )}
    />
    <motion.div
      animate={{ scale: [1, 1.06, 1] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      className={cn(
        'absolute inset-0 rounded-full bg-gradient-to-br blur-3xl opacity-20 dark:opacity-40 pointer-events-none',
        data.colors.gradient
      )}
    />

    {/* Stage Container with subtle glass edge */}
    <div className="relative h-72 w-72 sm:h-80 sm:w-80 md:h-[380px] md:w-[380px] lg:h-[420px] lg:w-[420px] rounded-full border border-zinc-300/80 dark:border-zinc-800 shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center justify-center overflow-hidden bg-zinc-950">
      <motion.div
        animate={{ y: [-6, 6, -6] }}
        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
        className="relative z-10 w-full h-full flex items-center justify-center"
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={data.id}
            src={data.image}
            alt={data.title}
            variants={ANIMATIONS.image(isFirst)}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full h-full object-cover scale-[1.06] select-none"
            draggable={false}
          />
        </AnimatePresence>
      </motion.div>

      {/* Subtle inner lens reflection & vignette so image blends seamlessly into the circular frame */}
      <div className="absolute inset-0 rounded-full pointer-events-none z-20 ring-1 ring-inset ring-black/40 dark:ring-white/10 shadow-[inset_0_0_35px_rgba(0,0,0,0.6)]" />
    </div>

    {/* Floating Status Label */}
    <motion.div
      layout="position"
      className="mt-6 sm:mt-8 whitespace-nowrap"
    >
      <div className="flex items-center gap-2.5 text-xs uppercase tracking-widest text-zinc-700 dark:text-zinc-300 bg-white/95 dark:bg-zinc-950/90 px-4 py-2 rounded-full border border-zinc-200 dark:border-zinc-800 shadow-md backdrop-blur-md font-mono">
        <span className={cn('h-2 w-2 rounded-full', data.colors.glow)} />
        <span>{data.stats.connectionStatus}</span>
      </div>
    </motion.div>
  </motion.div>
);

export const ProductDetails = ({
  data,
  isFirst,
  onViewSpecs,
}: {
  data: ProductData;
  isFirst: boolean;
  onViewSpecs?: () => void;
}) => {
  const alignClass = isFirst ? 'items-start text-left' : 'items-start md:items-end text-left md:text-right';
  const flexDirClass = isFirst ? 'flex-row' : 'flex-row md:flex-row-reverse';
  const barColor = data.colors.barColor || 'bg-brand';

  return (
    <motion.div
      variants={ANIMATIONS.container}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={cn('flex flex-col', alignClass)}
    >
      {/* Spec Tag */}
      <motion.div
        variants={ANIMATIONS.item}
        className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-wider text-brand px-3 py-1 rounded-md bg-brand/10 border border-brand/20 mb-3"
      >
        <span>{data.tag || `${data.label} SPECIFICATION`}</span>
      </motion.div>

      {/* Main Title with Metallic Gradient */}
      <motion.h1
        variants={ANIMATIONS.item}
        className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-600 dark:from-white dark:via-zinc-100 dark:to-zinc-400 font-display"
      >
        {data.title}
      </motion.h1>

      {/* Subtitle if available */}
      {data.subtitle && (
        <motion.p
          variants={ANIMATIONS.item}
          className="font-mono text-xs text-zinc-500 dark:text-zinc-400 font-semibold tracking-wider uppercase mb-3"
        >
          {data.subtitle}
        </motion.p>
      )}

      {/* Narrative Description */}
      <motion.p
        variants={ANIMATIONS.item}
        className={cn(
          'text-zinc-600 dark:text-zinc-300 mb-6 text-sm sm:text-base leading-relaxed max-w-lg',
          isFirst ? 'mr-auto' : 'mr-auto md:ml-auto md:mr-0'
        )}
      >
        {data.description}
      </motion.p>

      {/* Feature Grid with Animated Progress Bars */}
      <motion.div
        variants={ANIMATIONS.item}
        className="w-full space-y-4 bg-zinc-50/90 dark:bg-zinc-900/60 p-5 sm:p-6 rounded-2xl border border-zinc-200/90 dark:border-zinc-800/80 shadow-sm dark:shadow-xl backdrop-blur-md"
      >
        <div className="space-y-4">
          {data.features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div key={feature.label} className="group">
                <div className={cn('flex items-center justify-between mb-2 text-xs sm:text-sm', flexDirClass)}>
                  <div className="flex items-center gap-2 text-zinc-800 dark:text-zinc-200">
                    <Icon size={16} className="text-zinc-500 dark:text-zinc-400 group-hover:text-brand dark:group-hover:text-white transition-colors shrink-0" />
                    <span className="font-semibold text-zinc-800 dark:text-zinc-200">{feature.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {feature.level && (
                      <span className="font-mono text-[11px] font-bold text-brand bg-brand/10 border border-brand/20 px-2.5 py-0.5 rounded-md shadow-xs tracking-wide">
                        {feature.level}
                      </span>
                    )}
                    {feature.showPercentage && (
                      <span className="font-mono text-xs font-bold text-zinc-900 dark:text-zinc-100">
                        {feature.value}%
                      </span>
                    )}
                  </div>
                </div>
                <div className="relative h-2 w-full bg-zinc-200/80 dark:bg-zinc-800/90 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${feature.value}%` }}
                    transition={{ duration: 1, delay: 0.3 + idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                    className={cn('absolute top-0 bottom-0 rounded-full', barColor)}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Tools row or Action Button */}
        {data.tools && data.tools.length > 0 && (
          <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-3">
            <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-semibold">
              {data.primaryStackLabel || "Primary Stack"}
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {data.tools.map((tool) => {
                const ToolIcon = tool.icon;
                return (
                  <span
                    key={tool.name}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/60 text-xs font-mono font-medium text-zinc-700 dark:text-zinc-200 hover:text-brand dark:hover:text-white hover:border-brand/40 transition-colors shadow-xs"
                  >
                    {ToolIcon && <ToolIcon size={14} className="shrink-0" />}
                    <span>{tool.name}</span>
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </motion.div>

      {/* Stats row (Battery or Experience score) */}
      <motion.div
        variants={ANIMATIONS.item}
        className={cn('mt-5 flex items-center gap-3 text-zinc-600 dark:text-zinc-400 font-mono text-xs', flexDirClass)}
      >
        <Award size={16} className="text-brand shrink-0" />
        <span className="font-semibold text-zinc-800 dark:text-zinc-300">
          {data.stats.ratingText || "Professional Production Standard"}
        </span>
      </motion.div>
    </motion.div>
  );
};

export const Switcher = ({
  activeId,
  options,
  onToggle,
  isFixed = false,
}: {
  activeId: ProductId;
  options: { id: ProductId; label: string }[];
  onToggle: (id: ProductId) => void;
  isFixed?: boolean;
}) => {
  return (
    <div
      className={cn(
        'flex justify-center',
        isFixed
          ? 'fixed bottom-10 inset-x-0 z-50 pointer-events-none'
          : 'relative z-20 my-6'
      )}
    >
      <motion.div
        layout
        className="pointer-events-auto flex items-center gap-1.5 p-1.5 rounded-full bg-zinc-100/90 dark:bg-zinc-950/90 backdrop-blur-2xl border border-zinc-200 dark:border-zinc-800 shadow-md dark:shadow-[0_20px_60px_rgba(0,0,0,0.6)] ring-1 ring-black/5 dark:ring-white/5"
      >
        {options.map((opt) => {
          const isActive = activeId === opt.id;
          return (
            <motion.button
              key={opt.id}
              onClick={() => onToggle(opt.id)}
              whileTap={{ scale: 0.96 }}
              className="relative px-5 sm:px-6 h-11 sm:h-12 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold tracking-wide font-mono focus:outline-none transition-colors"
            >
              {isActive && (
                <motion.div
                  layoutId="island-surface"
                  className="absolute inset-0 rounded-full bg-white dark:bg-gradient-to-b dark:from-white/15 dark:to-white/5 border border-zinc-200/90 dark:border-white/10 shadow-sm dark:shadow-inner"
                  transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                />
              )}
              <span
                className={cn(
                  'relative z-10 transition-colors duration-200',
                  isActive
                    ? 'text-zinc-900 dark:text-white font-bold'
                    : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                )}
              >
                {opt.label}
              </span>
              {isActive && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute -bottom-1 h-1 w-8 rounded-full bg-gradient-to-r from-transparent via-brand to-transparent"
                />
              )}
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
};

// =========================================
// 4. MAIN EXPORT COMPONENT
// =========================================

export interface SpatialProductShowcaseProps {
  data?: Record<string, ProductData>;
  defaultActiveId?: ProductId;
  switcherPosition?: 'inline' | 'fixed';
  className?: string;
  isEmbedded?: boolean;
}

export default function SpatialProductShowcase({
  data = DEFAULT_PRODUCT_DATA,
  defaultActiveId,
  switcherPosition = 'inline',
  className,
  isEmbedded = false,
}: SpatialProductShowcaseProps) {
  const keys = Object.keys(data);
  const [activeSide, setActiveSide] = useState<ProductId>(
    defaultActiveId || keys[0] || 'left'
  );

  const currentData = data[activeSide] || data[keys[0]];
  const isFirst = activeSide === keys[0];
  const options = keys.map((k) => ({ id: k, label: data[k].label }));

  return (
    <div
      className={cn(
        'relative w-full overflow-hidden text-zinc-900 dark:text-zinc-100 selection:bg-brand/20 flex flex-col items-center justify-center transition-colors duration-300',
        isEmbedded
          ? 'py-8 px-4 sm:px-8 rounded-3xl bg-white dark:bg-[#121215] border border-zinc-200 dark:border-zinc-800 shadow-xl dark:shadow-2xl'
          : 'min-h-screen bg-white dark:bg-black',
        className
      )}
    >
      <BackgroundGradient isFirst={isFirst} isEmbedded={isEmbedded} />

      {/* Switcher at Top when in inline mode */}
      {switcherPosition === 'inline' && (
        <Switcher
          activeId={activeSide}
          options={options}
          onToggle={setActiveSide}
          isFixed={false}
        />
      )}

      <main className="relative z-10 w-full py-4 sm:py-8 flex flex-col justify-center max-w-6xl mx-auto">
        <motion.div
          layout
          transition={{ type: 'spring', bounce: 0, duration: 0.8 }}
          className={cn(
            'flex flex-col items-center justify-center gap-10 md:gap-16 lg:gap-24 w-full',
            isFirst ? 'md:flex-row' : 'md:flex-row-reverse'
          )}
        >
          {/* Visual Showcase (Concentric orbital rings & 3D holographic orb) */}
          <ProductVisual data={currentData} isFirst={isFirst} />

          {/* Details Column */}
          <motion.div layout="position" className="w-full max-w-xl">
            <AnimatePresence mode="wait">
              <ProductDetails
                key={activeSide}
                data={currentData}
                isFirst={isFirst}
              />
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </main>

      {/* Switcher at Bottom if fixed mode is chosen */}
      {switcherPosition === 'fixed' && (
        <Switcher
          activeId={activeSide}
          options={options}
          onToggle={setActiveSide}
          isFixed={true}
        />
      )}
    </div>
  );
}
