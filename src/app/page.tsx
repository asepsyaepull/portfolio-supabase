import { Metadata } from "next";
import HomeClient from "./HomeClient";
import { getStaticClient } from "@/lib/supabase/server";
import { Project, Skill } from "@/types/database";

export const revalidate = 3600; // Revalidate setiap 1 jam (ISR)

export const metadata: Metadata = {
  title: "Asep Syaepul | Frontend Developer",
  description: "Portfolio of Asep Syaepul, a Frontend Developer specialized in React, Next.js, and Modern Web UI.",
};

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

export default async function Home() {
  const supabase = getStaticClient();

  const [projectsRes, skillsRes] = await Promise.all([
    supabase
      .from("projects")
      .select("*")
      .eq("is_featured", true)
      .order("order_index", { ascending: true })
      .order("created_at", { ascending: false }),
    supabase
      .from("skills")
      .select("*")
      .order("order_index", { ascending: true }),
  ]);

  const projects =
    projectsRes.data && projectsRes.data.length > 0
      ? projectsRes.data
      : [];
  const skills =
    skillsRes.data && skillsRes.data.length > 0
      ? skillsRes.data
      : fallbackSkills;

  return (
    <HomeClient
      featuredProjects={projects as Project[]}
      skills={skills as Skill[]}
    />
  );
}
