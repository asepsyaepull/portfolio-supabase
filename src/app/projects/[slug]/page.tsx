import supabase from "@/lib/db";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { IconExternalLink, IconBriefcase, IconTarget, IconRocket, IconArrowLeft } from "@tabler/icons-react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

import { Metadata, ResolvingMetadata } from "next";

// Generate Static Params for build time optimization (optional but good)
export async function generateStaticParams() {
  const { data: projects } = await supabase.from("projects").select("slug");
  return (projects || []).map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;
  
  const { data: project } = await supabase
    .from("projects")
    .select("name, description, image")
    .eq("slug", slug)
    .single();

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.name} | Asep Syaepul`,
    description: project.description,
    openGraph: {
      title: `${project.name} | Asep Syaepul`,
      description: project.description,
      images: [
        {
          url: project.image || "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: project.name || "Project image",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} | Asep Syaepul`,
      description: project.description,
      images: [project.image || "/og-image.jpg"],
    },
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const { data: project, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-gray-950 pt-32 pb-20 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-24">
        
        <Link href="/projects" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors mb-8">
            <IconArrowLeft size={20} />
            <span className="font-medium">Back to Projects</span>
        </Link>

        <div className="relative w-full bg-white dark:bg-zinc-900 rounded-[32px] md:rounded-[48px] border border-black/5 dark:border-white/10 shadow-2xl overflow-hidden transition-colors duration-300 flex flex-col">
          
          {/* Top - Hero Image Banner */}
          <div className="relative w-full h-[40vh] md:h-[60vh] shrink-0">
              <Image
                  src={project.image || "/og-image.jpg"}
                  alt={project.name || "Project image"}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-white dark:to-zinc-900 transition-colors duration-300" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 flex flex-col items-start justify-end">
                  <span className="text-lime-600 dark:text-lime-500 font-bold tracking-widest text-xs md:text-sm uppercase mb-3 block drop-shadow-md">
                      {project.category}
                  </span>
                  <h1 className="text-4xl md:text-7xl font-bold text-zinc-900 dark:text-white leading-tight transition-colors">
                      {project.name}
                  </h1>
              </div>
          </div>

          {/* Bottom - Content */}
          <div className="w-full px-6 py-8 md:px-12 md:py-16 flex flex-col gap-10 bg-white dark:bg-zinc-900">
              <div className="flex flex-wrap gap-2">
                  {project.tech_stack?.map((tech: string) => (
                      <span key={tech} className="px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-[10px] md:text-xs font-bold border border-black/5 dark:border-white/5 uppercase tracking-tighter transition-colors">
                          {tech}
                      </span>
                  ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-4">
                  {/* Left column - main details */}
                  <div className="md:col-span-2 flex flex-col gap-12">
                      <section className="flex flex-col gap-4">
                          <div className="flex items-center gap-3 text-zinc-900 dark:text-white font-bold text-xl md:text-2xl transition-colors">
                              <IconTarget className="text-lime-600 dark:text-lime-500 transition-colors" size={24} /> The Challenge
                          </div>
                          <p className="text-zinc-600 dark:text-zinc-400 text-base md:text-lg leading-relaxed transition-colors">
                              {project.problem}
                          </p>
                      </section>

                      <section className="flex flex-col gap-4">
                          <div className="flex items-center gap-3 text-zinc-900 dark:text-white font-bold text-xl md:text-2xl transition-colors">
                              <IconRocket className="text-lime-600 dark:text-lime-500 transition-colors" size={24} /> The Solution
                          </div>
                          <p className="text-zinc-600 dark:text-zinc-400 text-base md:text-lg leading-relaxed transition-colors">
                              {project.solution}
                          </p>
                      </section>

                      <section className="flex flex-col gap-4">
                          <div className="flex items-center gap-3 text-zinc-900 dark:text-white font-bold text-xl md:text-2xl transition-colors">
                              <IconBriefcase className="text-lime-600 dark:text-lime-500 transition-colors" size={24} /> My Role & Impact
                          </div>
                          <p className="text-zinc-600 dark:text-zinc-400 text-base md:text-lg leading-relaxed transition-colors">
                              {project.long_description}
                          </p>
                      </section>
                  </div>

                  {/* Right column - sidebar / CTA */}
                  <div className="flex flex-col gap-8 md:pt-2">
                        <div className="p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-950/50 border border-black/5 dark:border-white/5 flex flex-col gap-2 transition-colors">
                            <h4 className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">Platform</h4>
                            <p className="text-zinc-900 dark:text-white font-medium mb-4">Web & Mobile App</p>
                            
                            <h4 className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">Category</h4>
                            <p className="text-zinc-900 dark:text-white font-medium">{project.category}</p>
                        </div>
                        
                        {project.link && project.link !== "#" ? (
                            <Link href={project.link} target="_blank" rel="noopener noreferrer">
                                <HoverBorderGradient
                                    containerClassName="rounded-full w-full"
                                    className="font-bold px-8 py-4 flex items-center justify-center gap-3 w-full transition-colors shadow-lg bg-white dark:bg-zinc-950 text-lime-600 dark:text-lime-500 group-hover:text-lime-700 dark:group-hover:text-lime-400"
                                >
                                    <span>LAUNCH PROJECT</span>
                                    <IconExternalLink size={20} />
                                </HoverBorderGradient>
                            </Link>
                        ) : (
                            <HoverBorderGradient
                                containerClassName="rounded-full w-full opacity-50 cursor-not-allowed"
                                className="font-bold px-8 py-4 flex items-center justify-center gap-3 w-full transition-colors bg-white dark:bg-zinc-950 text-zinc-400 dark:text-zinc-500"
                            >
                                <span>UNAVAILABLE</span>
                            </HoverBorderGradient>
                        )}
                  </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
