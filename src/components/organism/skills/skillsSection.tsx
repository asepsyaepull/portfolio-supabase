"use client";
import React from "react";
import { motion } from "framer-motion";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { Skill } from "@/types/database";
import { getSimpleIcon } from "@/lib/icon-mapper";

export function SkillsSection({ skills }: { skills: Skill[] }) {
  return (
    <div id="skills-section" className="py-20 bg-zinc-50 dark:bg-gray-950 transition-colors duration-300 scroll-mt-24">
      <div className="container mx-auto px-4 md:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-4 transition-colors">
            Technical <span className="text-lime-600 dark:text-lime-500">Expertise</span>
          </h2>
          <p className="text-zinc-600 dark:text-gray-400 max-w-2xl mx-auto transition-colors">
            These are the core technologies I use to bring digital ideas to life. 
            I focus on performance, scalability, and exceptional user experience.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.id || skill.name}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.3, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 260,
                damping: 20 
              }}
            >
              <HoverBorderGradient
                containerClassName="rounded-full"
                className="bg-white dark:bg-gray-900 text-zinc-900 dark:text-white flex items-center gap-3 px-6 py-3 transition-colors"
              >
                {getSimpleIcon(skill.icon_name, `text-2xl ${skill.color_class}`)}
                <span className="font-medium">{skill.name}</span>
              </HoverBorderGradient>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
