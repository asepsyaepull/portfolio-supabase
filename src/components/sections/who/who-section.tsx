"use client";

import React from "react";
import { motion } from "framer-motion";
import { IconRocket, IconUsers, IconBuilding, IconPalette } from "@tabler/icons-react";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";

interface Persona {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const PERSONAS: Persona[] = [
  {
    icon: <IconRocket className="h-5 w-5" />,
    title: "Startup Founder",
    description:
      "Punya visi produk tapi butuh seseorang yang bisa merancang sekaligus membangun — dari wireframe sampai production deploy.",
  },
  {
    icon: <IconUsers className="h-5 w-5" />,
    title: "Product Manager",
    description:
      "Butuh desainer yang paham constraint teknis, bisa diskusi sprint priorities, dan deliver tepat waktu tanpa drama handoff.",
  },
  {
    icon: <IconBuilding className="h-5 w-5" />,
    title: "CTO & Tech Lead",
    description:
      "Mencari UI/UX yang bisa nyatu dengan codebase — tidak cuma mockup, tapi implementasi langsung yang konsisten.",
  },
  {
    icon: <IconPalette className="h-5 w-5" />,
    title: "Agency & Studio",
    description:
      "Butuh desainer tambahan untuk project spike — cepat, punya design system sendiri, dan bisa langsung join workflow yang ada.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

export function WhoSection() {
  return (
    <section className="relative z-[1] px-4 py-20">
      <SectionHeader
        tag="who-is-this-for"
        title={<>Who I Work Best With</>}
        subtitle="Saya paling produktif untuk tim yang butuh desainer yang bisa speak the same language as engineers."
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2"
      >
        {PERSONAS.map((persona) => (
          <motion.div key={persona.title} variants={itemVariants}>
            <Card variant="white" className="flex h-full flex-col gap-4 p-7">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 text-brand">
                {persona.icon}
              </span>
              <h3 className="heading-display text-xl font-semibold text-ink">
                {persona.title}
              </h3>
              <p className="text-[14px] leading-relaxed text-ink-soft">
                {persona.description}
              </p>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default WhoSection;
