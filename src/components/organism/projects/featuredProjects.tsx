"use client";
import React, { useEffect, useState } from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { IconFolderOff, IconAlertCircle, IconRefresh } from "@tabler/icons-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { Project } from "@/types/database";
import { getTablerIcon } from "@/lib/icon-mapper";

const MotionImage = motion(Image);

export function FeaturedProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { data, error: supabaseError } = await supabase
        .from("projects")
        .select("*")
        .eq("is_featured", true)
        .order("order_index", { ascending: true })
        .order("created_at", { ascending: false });

      if (supabaseError) throw supabaseError;
      setProjects(data || []);
    } catch (err: any) {
      console.error("Error fetching projects:", err);
      setError(err?.message || "Gagal mengambil data proyek.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <section className="py-20 bg-zinc-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-24 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-lime-600 dark:text-lime-500 font-medium tracking-wider transition-colors">
            / SELECTION
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white mt-2 transition-colors">
            Featured <span className="text-zinc-500 dark:text-gray-500 transition-colors">Projects</span>
          </h2>
        </motion.div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-10 h-10 border-2 border-lime-500/50 rounded-full animate-spin border-t-lime-500"></div>
        </div>
      ) : error ? (
        <div className="max-w-md mx-auto px-4 text-center py-16">
          <div className="p-8 rounded-3xl bg-white/50 dark:bg-zinc-900/50 border border-red-500/20 backdrop-blur-sm flex flex-col items-center gap-4">
            <div className="p-3 rounded-full bg-red-500/10 text-red-500">
              <IconAlertCircle className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Gagal Memuat Proyek</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">{error}</p>
            <button
              onClick={fetchProjects}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-lime-500 text-black font-semibold text-sm hover:bg-lime-400 transition duration-200 active:scale-95"
            >
              <IconRefresh className="w-4 h-4" />
              Coba Lagi
            </button>
          </div>
        </div>
      ) : projects.length === 0 ? (
        <div className="max-w-md mx-auto px-4 text-center py-16">
          <div className="p-8 rounded-3xl bg-white/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/5 backdrop-blur-sm flex flex-col items-center gap-4">
            <div className="p-3 rounded-full bg-lime-500/10 text-lime-500">
              <IconFolderOff className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">Belum Ada Proyek</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Proyek unggulan belum tersedia saat ini. Silakan periksa kembali nanti.
            </p>
          </div>
        </div>
      ) : (
        <BentoGrid className="max-w-7xl mx-auto px-4">
          {projects.map((item, i) => (
            <BentoGridItem
              key={item.id}
              title={item.name}
              description={item.description}
              header={<Skeleton src={item.image} title={item.name} />}
              icon={getTablerIcon(item.icon_name || "", "h-4 w-4 text-lime-500")}
              className={i === 3 ? "md:col-span-2" : ""}
            />
          ))}
        </BentoGrid>
      )}
    </section>
  );
}

const Skeleton = ({ src, title }: { src?: string; title?: string }) => (
  <div className="relative w-full h-48 sm:h-56 md:h-64 rounded-2xl bg-gradient-to-br from-zinc-200 dark:from-zinc-900 to-zinc-100 dark:to-zinc-800 overflow-hidden transition-colors duration-300">
    {src ? (
      <MotionImage
        src={src}
        alt={title || "project preview"}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover object-top transition duration-700 ease-out group-hover/bento:scale-105"
      />
    ) : (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-lime-500/50 dark:border-lime-500/20 rounded-full animate-pulse transition-colors" />
      </div>
    )}
  </div>
);
