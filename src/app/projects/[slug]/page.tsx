import { from } from "@/lib/pg-client";
import {
  IconArrowLeft,
  IconArrowRight,
  IconArrowUpRight,
  IconBriefcase,
  IconCalendar,
  IconCode,
  IconExternalLink,
  IconFileDescription,
  IconSparkles,
  IconTags,
  IconTools,
  IconUser,
} from "@tabler/icons-react";
import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { EmptyState } from "@/components/ui/empty-state";
import {
  ProjectHeaderActions,
  ProjectImagePreview,
} from "./ProjectDetailClient";

// Render dinamis langsung dari PostgreSQL VPS (hindari cache dummy saat build GH Actions)
export const dynamic = "force-dynamic";

// Helper: Extract prominent metrics from markdown or problem/solution
interface ProjectMetric {
  value: string;
  label: string;
}

function parseProjectMetrics(markdown?: string): ProjectMetric[] {
  if (!markdown) return [];
  const metrics: ProjectMetric[] = [];
  const lines = markdown.split("\n");
  let inMetricsSection = false;

  for (const line of lines) {
    if (
      line.toLowerCase().includes("key metrics") ||
      line.toLowerCase().includes("impact")
    ) {
      inMetricsSection = true;
      continue;
    }
    if (
      inMetricsSection &&
      line.startsWith("##") &&
      !line.toLowerCase().includes("metric") &&
      !line.toLowerCase().includes("impact")
    ) {
      break;
    }
    if (inMetricsSection && line.trim().startsWith("-")) {
      const match = line.match(/^-\s*\*\*([^*]+)\*\*:?\s*(.*)$/);
      if (match) {
        metrics.push({
          value: match[1].trim(),
          label: match[2].trim(),
        });
      }
    }
  }

  // Fallback: scan anywhere for bullet starting with **...% ...**
  if (metrics.length === 0) {
    for (const line of lines) {
      if (line.trim().startsWith("-")) {
        const match = line.match(/^-\s*\*\*([0-9]+%[^*]*)\*\*:?\s*(.*)$/);
        if (match) {
          metrics.push({
            value: match[1].trim(),
            label: match[2].trim(),
          });
        }
      }
    }
  }

  return metrics.slice(0, 3);
}

// Helper: Format bullet points & numbered lists so that collapsed lines become valid markdown lists
function formatMarkdownContent(text?: string): string {
  if (!text) return "";
  // 1. Replace non-breaking spaces (\u00A0) with standard space
  let formatted = text.replace(/\u00a0/g, " ");

  // 2. Add line breaks before bullet points if concatenated on a single line
  // e.g. "seperti: - **Item:**" or "text. - **Item:**"
  formatted = formatted.replace(/([^\n])\s*-\s+\*\*/g, "$1\n\n- **");

  // 3. Add line breaks before numbered points if concatenated
  // e.g. "text. 2. **Item:**"
  formatted = formatted.replace(/([^\n])\s*(\d+\.)\s+\*\*/g, "$1\n\n$2 **");

  return formatted.trim();
}

// Helper: Clean executive summary text from raw markdown image tags and symbols
function cleanExecutiveSummary(text?: string): string {
  if (!text) return "";
  // Strip markdown image syntax: ![alt](url)
  let cleaned = text.replace(/!\[.*?\]\(.*?\)/g, "").trim();
  // Strip bold tags
  cleaned = cleaned.replace(/\*\*(.*?)\*\*/g, "$1");
  // Clean multiple newlines
  cleaned = cleaned.replace(/\n+/g, " ").trim();
  return cleaned;
}

// Helper: Extract metadata specs (Role, Timeline, Tags, Tools) embedded in Notion-imported descriptions
function parseSpecsFromDescription(markdown?: string): Record<string, string> {
  if (!markdown) return {};
  const specs: Record<string, string> = {};
  const lines = markdown.split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const match = trimmed.match(/^(Role|Timeline|Tags|Tools|Discipline):\s*(.+)$/i);
    if (match) {
      const key = match[1].charAt(0).toUpperCase() + match[1].slice(1).toLowerCase();
      specs[key] = match[2].trim();
    }
  }
  return specs;
}

// Helper: Clean markdown by stripping redundant raw spec lines from the top, Notion image duplicates, etc.
function cleanMarkdownDescription(markdown?: string, displayImage?: string): string {
  if (!markdown) return "";
  const lines = markdown.split("\n");
  const filtered = lines.filter((line) => {
    const trimmed = line.trim();
    return !trimmed.match(/^(Role|Timeline|Tags|Tools):\s*.+$/i);
  });
  let content = filtered.join("\n").trim();

  // Normalize Notion header bold wrappers: # **Header** -> # Header
  content = content.replace(/^(#{1,6}\s*)\*\*(.*?)\*\*/gm, "$1$2");

  // Deduplicate initial hero image if present right at the top of markdown
  if (displayImage) {
    const cleanDisplay = displayImage.split("?")[0].replace(/%20/g, " ").toLowerCase();
    const firstImgMatch = content.match(/^(\s*!\[.*?\]\((.*?)\)\s*)/);
    if (firstImgMatch) {
      const imgPath = firstImgMatch[2].split("?")[0].replace(/%20/g, " ").toLowerCase();
      const displayFile = cleanDisplay.split("/").pop();
      const imgFile = imgPath.split("/").pop();
      if (displayFile && imgFile && displayFile === imgFile) {
        content = content.replace(firstImgMatch[0], "").trim();
      }
    }
  }

  return content;
}

// Generate Static Params for build time optimization
export async function generateStaticParams() {
  const { data: projects } = await from("projects").select("slug");
  if (!projects || projects.length === 0) return [];
  return projects
    .filter((p: any) => Boolean(p.slug))
    .map((p: any) => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;

  const { data: project } = await from("projects")
    .select("name, description, image")
    .eq("slug", slug)
    .single();

  if (!project) {
    return {
      title: "Project Not Found | Asep Syaepul",
    };
  }

  const projectImage =
    project.image || project.image_url || "/og-image.jpg";

  return {
    title: `${project.name} — Case Study | Asep Syaepul`,
    description: project.description,
    openGraph: {
      title: `${project.name} — UI/UX & Frontend Case Study | Asep Syaepul`,
      description: project.description,
      images: [
        {
          url: projectImage,
          width: 1200,
          height: 630,
          alt: project.name || "Project preview",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} | Asep Syaepul`,
      description: project.description,
      images: [projectImage],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // Fetch active project from PostgreSQL database
  const { data: project } = await from("projects")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!project) {
    notFound();
  }

  // Fetch all projects for Previous / Next navigation
  const { data: allDbProjects } = await from("projects")
    .select("id, name, slug, category, image, description")
    .order("order_index", { ascending: true })
    .order("created_at", { ascending: false });

  const projectList = allDbProjects || [];

  const currentIndex = projectList.findIndex((p: any) => p.slug === slug);
  const prevProject =
    currentIndex > 0 ? projectList[currentIndex - 1] : null;
  const nextProject =
    currentIndex >= 0 && currentIndex < projectList.length - 1
      ? projectList[currentIndex + 1]
      : null;

  const rawLongDescription =
    project.long_description || project.description || "";
  const displayImage = project.image || project.image_url || "/og-image.jpg";
  const parsedSpecs = parseSpecsFromDescription(rawLongDescription);
  const cleanLongDescription = cleanMarkdownDescription(
    rawLongDescription,
    displayImage
  );
  const cleanSummary = cleanExecutiveSummary(project.description);

  // Normalize tech stack array
  const techList: string[] = Array.isArray(project.tech_stack)
    ? project.tech_stack
    : typeof project.tech_stack === "string"
    ? (project.tech_stack as string).split(",").map((s: string) => s.trim())
    : [];

  // Effective specs (supports both DB columns and Notion markdown headers)
  const effectiveRole = project.role || parsedSpecs["Role"] || "";
  const effectiveTimeline = project.timeline || parsedSpecs["Timeline"] || "";
  const effectiveTags = project.tags || parsedSpecs["Tags"] || "";
  const effectiveTools = project.tools || parsedSpecs["Tools"] || "";

  // Parse key metrics if available
  const parsedMetrics = parseProjectMetrics(rawLongDescription);

  // Build metadata specs for sidebar
  const specs: Array<{ label: string; value: string; icon: any }> = [];
  if (effectiveRole) {
    specs.push({ label: "My Role", value: effectiveRole, icon: IconUser });
  }
  if (effectiveTimeline) {
    specs.push({
      label: "Timeline",
      value: effectiveTimeline,
      icon: IconCalendar,
    });
  }
  if (project.category) {
    specs.push({
      label: "Discipline",
      value: project.category,
      icon: IconBriefcase,
    });
  }
  if (effectiveTags) {
    specs.push({ label: "Focus / Tags", value: effectiveTags, icon: IconTags });
  }
  if (effectiveTools) {
    specs.push({ label: "Tools", value: effectiveTools, icon: IconTools });
  }

  return (
    <div className="relative min-h-screen pt-28 sm:pt-32 pb-24 text-zinc-900 dark:text-white">
      {/* Ambient background glows for visual depth */}
      <div className="absolute top-24 left-[-10%] w-[45%] h-[40%] bg-brand/5 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-[-10%] w-[40%] h-[40%] bg-tool/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-12 max-w-6xl">
        {/* ===================================================================
            1. TOP BAR: BREADCRUMB & QUICK ACTIONS
            =================================================================== */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-8 mb-8 border-b border-zinc-200/80 dark:border-zinc-800/80">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono">
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-zinc-500 hover:text-brand transition-colors group"
            >
              <IconArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
              <span>Projects</span>
            </Link>
            <span className="text-zinc-300 dark:text-zinc-700">/</span>
            <span className="text-zinc-500 dark:text-zinc-400 font-medium">
              {project.category}
            </span>
            <span className="text-zinc-300 dark:text-zinc-700">/</span>
            <span className="text-zinc-900 dark:text-white font-bold truncate max-w-[180px] sm:max-w-none">
              {project.name}
            </span>
          </nav>

          {/* Action buttons (Copy link & Live site) */}
          <ProjectHeaderActions
            projectName={project.name}
            projectSlug={project.slug}
            projectLink={project.link}
            category={project.category}
          />
        </div>

        {/* ===================================================================
            2. HERO HEADER: TITLE, EXECUTIVE SUMMARY & QUICK PILLS
            =================================================================== */}
        <header className="mb-10 sm:mb-14 text-start">
          {/* Category Badge with Studio Pulse */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-50 dark:bg-[#121215]/95 dark:border-zinc-800/80 border border-zinc-200/80 text-brand font-mono tracking-widest text-[11px] font-bold uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-brand" />
            <span>{project.category}</span>
          </div>

          {/* Headline Display */}
          <h1 className="heading-display font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight leading-[1.08] mb-5">
            {project.name}
          </h1>

          {/* Quick Spec Highlights Strip */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono text-zinc-500 dark:text-zinc-400 pt-1">
            {effectiveRole && (
              <div className="flex items-center gap-1.5">
                <span className="text-zinc-400 dark:text-zinc-600">ROLE:</span>
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                  {effectiveRole}
                </span>
              </div>
            )}
            {effectiveTimeline && (
              <div className="flex items-center gap-1.5">
                <span className="text-zinc-400 dark:text-zinc-600">YEAR:</span>
                <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                  {effectiveTimeline}
                </span>
              </div>
            )}
            {techList.length > 0 && (
              <div className="flex items-center gap-1.5">
                <span className="text-zinc-400 dark:text-zinc-600">STACK:</span>
                <span className="font-semibold text-brand">
                  {techList.slice(0, 3).join(" • ")}
                  {techList.length > 3 ? ` +${techList.length - 3}` : ""}
                </span>
              </div>
            )}
          </div>
        </header>

        {/* ===================================================================
            3. DEDICATED MEDIA SHOWCASE (FRAMED SPEC VIEWPORT)
            =================================================================== */}
        <section className="mb-14 sm:mb-18">
          <ProjectImagePreview
            src={displayImage}
            alt={project.name || "Project showcase screenshot"}
            slug={project.slug}
          />
        </section>

        {/* ===================================================================
            4. KEY METRICS & IMPACT HIGHLIGHT (IF AVAILABLE)
            =================================================================== */}
        {parsedMetrics.length > 0 && (
          <section className="mb-12 sm:mb-16">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 sm:p-6 rounded-2xl bg-zinc-100/70 dark:bg-zinc-900/50 backdrop-blur-sm border border-zinc-200/80 dark:border-zinc-800/80">
              {parsedMetrics.map((m, idx) => (
                <div
                  key={idx}
                  className="flex flex-col gap-1 text-start p-3.5 rounded-xl bg-white/90 dark:bg-[#121215]/90 backdrop-blur-sm border border-zinc-200/60 dark:border-zinc-800/60 shadow-xs"
                >
                  <div className="font-display text-2xl sm:text-3xl font-extrabold text-brand tracking-tight">
                    {m.value}
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-snug font-medium">
                    {m.label}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ===================================================================
            5. MAIN CASE STUDY & STICKY SPECIFICATIONS SIDEBAR
            =================================================================== */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 text-start mb-20">
          {/* Main Case Study Column (Left: 67%) */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            <div className="p-6 sm:p-8 lg:p-9 rounded-3xl bg-white/95 dark:bg-[#121215]/95 backdrop-blur-md border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
              {cleanLongDescription ? (
                <article className="prose prose-zinc dark:prose-invert prose-lg max-w-none text-zinc-700 dark:text-zinc-300 font-body text-[16px] sm:text-[17px] lg:text-[16px] leading-[1.8] sm:leading-[1.85] prose-headings:font-display prose-headings:tracking-tight prose-headings:font-bold prose-h1:text-2xl sm:prose-h1:text-2xl lg:prose-h1:text-3xl prose-h1:mt-12 prose-h1:mb-5 prose-h1:pb-3 prose-h1:border-b prose-h1:border-zinc-200/60 dark:prose-h1:border-zinc-800/60 prose-h2:text-xl sm:prose-h2:text-2xl lg:prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-5 prose-h2:pb-3 prose-h2:border-b prose-h2:border-zinc-200/60 dark:prose-h2:border-zinc-800/60 prose-h3:text-lg sm:prose-h3:text-xl lg:prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3 prose-p:my-5 sm:prose-p:my-6 prose-ul:my-6 prose-ul:space-y-2.5 prose-ol:my-6 prose-ol:space-y-2.5 prose-li:my-1.5 prose-li:leading-relaxed prose-strong:text-zinc-900 dark:prose-strong:text-white prose-a:text-brand hover:prose-a:text-brand-deep prose-img:rounded-2xl prose-img:shadow-md prose-code:font-mono prose-code:text-brand prose-code:bg-zinc-100 dark:prose-code:bg-zinc-900 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-blockquote:border-l-4 prose-blockquote:border-brand prose-blockquote:bg-zinc-50 dark:prose-blockquote:bg-zinc-900/40 prose-blockquote:py-2 prose-blockquote:px-5 prose-blockquote:rounded-r-xl">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeRaw]}
                    components={{
                      aside: ({ node, ...props }) => (
                        <aside
                          {...props}
                          className="my-5 p-4 rounded-xl bg-zinc-100/90 dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800 text-sm text-zinc-700 dark:text-zinc-300 font-mono not-prose"
                        />
                      ),
                      img: ({ node, ...props }) => {
                        const src = props.src?.replace(/ /g, "%20") || "";
                        return (
                          <span className="block my-6 overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              {...props}
                              src={src}
                              loading="lazy"
                              alt={props.alt || "Case study graphic"}
                              className="w-full h-auto object-cover"
                            />
                          </span>
                        );
                      },
                    }}
                  >
                    {cleanLongDescription}
                  </ReactMarkdown>
                </article>
              ) : project.problem || project.solution ? (
                <div className="space-y-8 text-start">
                  <div>
                    <h2 className="heading-display font-display text-2xl font-bold text-zinc-900 dark:text-white mb-3">
                      Overview
                    </h2>
                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-body">
                      {project.description}
                    </p>
                  </div>
                  {project.problem && (
                    <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800">
                      <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-rose-500 mb-2">
                        The Challenge / Tantangan
                      </h3>
                      <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                        {project.problem}
                      </p>
                    </div>
                  )}
                  {project.solution && (
                    <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800">
                      <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-500 mb-2">
                        The Solution & Impact / Solusi
                      </h3>
                      <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
                        {project.solution}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <EmptyState
                  icon={<IconFileDescription className="w-7 h-7 stroke-[1.5]" />}
                  badge="/ DOKUMENTASI KONTEN PROYEK"
                  title="Dokumentasi Detail Sedang Disiapkan"
                  description="Uraian studi kasus lengkap untuk proyek ini sedang dalam tahap dokumentasi & kurasi. Anda dapat meninjau spesifikasi, disiplin, dan teknologi yang digunakan pada panel samping."
                  compact
                  action={{
                    label: "Kembali ke Direktori Proyek",
                    href: "/projects",
                    icon: <IconArrowLeft className="w-4 h-4" />,
                  }}
                />
              )}
            </div>
          </div>

          {/* Sticky Specifications Sidebar (Right: 33%) */}
          <aside className="lg:col-span-4 flex flex-col gap-6">
            <div className="lg:sticky lg:top-28 space-y-6">
              {/* Studio Specification Card */}
              <div className="p-6 sm:p-7 rounded-3xl bg-white/95 dark:bg-[#121215]/95 backdrop-blur-md border border-zinc-200/80 dark:border-zinc-800 shadow-sm flex flex-col gap-6">
                <div className="flex items-center justify-between pb-4 border-b border-zinc-200/80 dark:border-zinc-800">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-brand" />
                    <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
                      Project Specs
                    </h3>
                  </div>
                  <span className="font-mono text-[10px] text-zinc-400 dark:text-zinc-500 uppercase">
                    v1.0
                  </span>
                </div>

                {/* Metadata Specifications List */}
                <div className="flex flex-col gap-4">
                  {specs.map((item, idx) => {
                    const IconComponent = item.icon;
                    return (
                      <div key={idx} className="flex flex-col gap-1">
                        <div className="flex items-center gap-1.5 text-zinc-400 dark:text-zinc-500">
                          <IconComponent className="w-3.5 h-3.5 text-brand stroke-[2]" />
                          <span className="font-mono text-[10.5px] font-bold uppercase tracking-wider">
                            {item.label}
                          </span>
                        </div>
                        <p className="text-zinc-900 dark:text-zinc-100 font-medium text-sm leading-snug pl-5">
                          {item.value}
                        </p>
                      </div>
                    );
                  })}
                </div>

                {/* Tech Stack Pills Cloud */}
                {techList.length > 0 && (
                  <div className="pt-2 flex flex-col gap-2.5">
                    <div className="flex items-center gap-1.5 text-zinc-400 dark:text-zinc-500">
                      <IconCode className="w-3.5 h-3.5 text-brand stroke-[2]" />
                      <span className="font-mono text-[10.5px] font-bold uppercase tracking-wider">
                        Technologies
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {techList.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 text-[11px] font-mono font-medium border border-zinc-200 dark:border-zinc-800 hover:border-brand/40 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Primary CTA (Open Live Project or Internal Tag) */}
                <div className="pt-2 flex flex-col gap-2.5">
                  {project.link && project.link !== "#" ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-brand hover:bg-brand-deep text-white font-mono font-bold text-xs uppercase tracking-wider shadow-brand shadow-[0_12px_24px_-12px_#F0531C] active:scale-98 transition-all w-full"
                    >
                      <span>Open Live Project</span>
                      <IconExternalLink className="w-4 h-4 stroke-[2.5]" />
                    </a>
                  ) : (
                    <div className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-900 text-zinc-400 dark:text-zinc-500 font-mono font-bold text-xs uppercase tracking-wider border border-zinc-200 dark:border-zinc-800 cursor-default w-full">
                      <span>Internal / NDA Case Study</span>
                    </div>
                  )}

                  <Link
                    href="/projects"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 font-mono font-semibold text-xs uppercase tracking-wider transition-colors w-full"
                  >
                    <span>All Projects Directory</span>
                  </Link>
                </div>
              </div>

              {/* Consultation / Hire Banner */}
              <div className="p-6 rounded-3xl bg-zinc-100/80 dark:bg-zinc-900/60 backdrop-blur-sm border border-zinc-200/80 dark:border-zinc-800 text-start flex flex-col gap-3">
                <div className="flex items-center gap-2 text-brand">
                  <IconSparkles className="w-4 h-4" />
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
                    Need a Similar Solution?
                  </h4>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-body">
                  Available for enterprise UI/UX redesigns, design systems, and modern React/Next.js frontend development.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-brand hover:text-brand-deep transition-colors pt-1"
                >
                  <span>Start a Conversation</span>
                  <IconArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </aside>
        </section>

        {/* ===================================================================
            6. PREVIOUS / NEXT PROJECT PAGINATION
            =================================================================== */}
        <section className="pt-12 border-t border-zinc-200/80 dark:border-zinc-800/80">
          <div className="flex items-center justify-between mb-6">
            <div className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand" />
              <span>More Case Studies</span>
            </div>
            <Link
              href="/projects"
              className="font-mono text-xs font-bold text-zinc-500 hover:text-brand transition-colors"
            >
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Previous Project Card */}
            {prevProject ? (
              <Link
                href={`/projects/${prevProject.slug}`}
                className="group p-5 rounded-2xl bg-white/95 dark:bg-[#121215]/95 backdrop-blur-sm border border-zinc-200/80 dark:border-zinc-800 hover:border-brand/40 dark:hover:border-brand/40 shadow-sm transition-all duration-200 flex items-center gap-4 text-start"
              >
                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 flex-shrink-0 border border-zinc-200 dark:border-zinc-800">
                  <Image
                    src={
                      prevProject.image ||
                      prevProject.image_url ||
                      "/og-image.jpg"
                    }
                    alt={prevProject.name}
                    fill
                    sizes="64px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 font-mono text-[10px] uppercase font-bold text-zinc-400 group-hover:text-brand transition-colors">
                    <IconArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-1" />
                    <span>Previous Project</span>
                  </div>
                  <h4 className="font-display text-base font-bold text-zinc-900 dark:text-white truncate">
                    {prevProject.name}
                  </h4>
                  <p className="font-mono text-xs text-zinc-500 truncate">
                    {prevProject.category}
                  </p>
                </div>
              </Link>
            ) : (
              <div className="p-5 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800/80 flex items-center justify-center text-zinc-400 text-xs font-mono">
                First Project in Portfolio
              </div>
            )}

            {/* Next Project Card */}
            {nextProject ? (
              <Link
                href={`/projects/${nextProject.slug}`}
                className="group p-5 rounded-2xl bg-white/95 dark:bg-[#121215]/95 backdrop-blur-sm border border-zinc-200/80 dark:border-zinc-800 hover:border-brand/40 dark:hover:border-brand/40 shadow-sm transition-all duration-200 flex items-center justify-between gap-4 text-start"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 font-mono text-[10px] uppercase font-bold text-zinc-400 group-hover:text-brand transition-colors">
                    <span>Next Project</span>
                    <IconArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                  </div>
                  <h4 className="font-display text-base font-bold text-zinc-900 dark:text-white truncate">
                    {nextProject.name}
                  </h4>
                  <p className="font-mono text-xs text-zinc-500 truncate">
                    {nextProject.category}
                  </p>
                </div>
                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 flex-shrink-0 border border-zinc-200 dark:border-zinc-800">
                  <Image
                    src={
                      nextProject.image ||
                      nextProject.image_url ||
                      "/og-image.jpg"
                    }
                    alt={nextProject.name}
                    fill
                    sizes="64px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </Link>
            ) : (
              <div className="p-5 rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800/80 flex items-center justify-center text-zinc-400 text-xs font-mono">
                Latest Project in Portfolio
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
