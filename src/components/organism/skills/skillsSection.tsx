"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { createClient } from "@/lib/supabase/client";
import { Skill } from "@/types/database";
import { getSimpleIcon } from "@/lib/icon-mapper";

export function SkillsSection() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (loading) {
        console.warn("Fetch timed out, using fallback skills.");
        setSkills(fallbackSkills);
        setLoading(false);
      }
    }, 5000);

    async function fetchSkills() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("skills")
          .select("*")
          .order("order_index", { ascending: true });

        if (error) throw error;
        
        if (data && data.length > 0) {
          setSkills(data);
        } else {
          setSkills(fallbackSkills);
        }
      } catch (err) {
        console.warn("Using fallback skills due to fetch error:", err);
        setSkills(fallbackSkills);
      } finally {
        clearTimeout(timer);
        setLoading(false);
      }
    }

    fetchSkills();

    return () => clearTimeout(timer);
  }, [loading]);

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

        {loading ? (
            <div className="flex justify-center items-center py-10">
                <div className="w-10 h-10 border-2 border-lime-500/50 rounded-full animate-spin border-t-lime-500"></div>
            </div>
        ) : (
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
        )}
      </div>
    </div>
  );
}

const fallbackSkills: Skill[] = [
  { id: 1, name: "React", icon_name: "SiReact", color_class: "text-blue-400", order_index: 1 },
  { id: 2, name: "Next.js", icon_name: "SiNextdotjs", color_class: "text-zinc-800 dark:text-white", order_index: 2 },
  { id: 3, name: "Tailwind", icon_name: "SiTailwindcss", color_class: "text-cyan-400", order_index: 3 },
  { id: 4, name: "TypeScript", icon_name: "SiTypescript", color_class: "text-blue-600", order_index: 4 },
  { id: 5, name: "Framer Motion", icon_name: "SiFramer", color_class: "text-purple-500", order_index: 5 },
  { id: 6, name: "Supabase", icon_name: "SiSupabase", color_class: "text-emerald-500", order_index: 6 },
  { id: 7, name: "Three.js", icon_name: "SiThreedotjs", color_class: "text-zinc-800 dark:text-white", order_index: 7 },
  { id: 8, name: "Node.js", icon_name: "SiNodedotjs", color_class: "text-green-500", order_index: 8 },
];
