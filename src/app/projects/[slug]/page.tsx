import { getStaticClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  IconArrowLeft,
  IconArrowRight,
  IconArrowUpRight,
  IconTarget,
  IconLayersLinked,
  IconTools,
  IconCalendar,
  IconUser,
  IconTags,
  IconExternalLink,
  IconBriefcase,
  IconSparkles,
  IconCheck,
  IconCircleCheck,
  IconChevronRight,
  IconCode,
  IconCompass,
  IconChartBar,
} from "@tabler/icons-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Metadata, ResolvingMetadata } from "next";
import {
  ProjectHeaderActions,
  ProjectImagePreview,
} from "./ProjectDetailClient";

// Render dinamis langsung dari PostgreSQL VPS (hindari cache dummy saat build GH Actions)
export const dynamic = "force-dynamic";

// Fallback project details if database is unavailable or row is empty
const FALLBACK_PROJECTS_MAP: Record<string, any> = {
  "symbolix-ai": {
    name: "Symbolix.ai",
    slug: "symbolix-ai",
    category: "UI/UX Design",
    description:
      "End-to-end UI/UX redesign and frontend implementation for an advanced ERP & POS system, converting complex business logic into intuitive, accessible interfaces.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop",
    tech_stack: ["React", "TypeScript", "Tailwind CSS", "Design Tokens"],
    problem:
      "Enterprise users experienced slow order reconciliation and cognitive overload due to fragmented multi-module navigation across retail counters.",
    solution:
      "Unified transactional workflows into a consolidated POS interface with keyboard-first shortcut navigation, reducing checkout latency by 45%.",
    role: "Lead UI/UX Designer & Frontend Engineer",
    timeline: "2023 - 2024",
    link: "https://symbolix.ai",
    tags: "ERP, Retail POS, Design System, Enterprise UX",
    tools: "Figma, React, TypeScript, Tailwind CSS, Turborepo",
    long_description: `## Overview
Symbolix.ai is an enterprise-grade ERP and Next-Gen POS platform designed to power omnichannel retail, multi-warehouse inventory logistics, and seamless accounting reconciliations.

### The Challenge
Retail cashiers and inventory analysts faced cumbersome multi-step modal journeys, inconsistent typography scales, and high latency during peak transaction hours, resulting in checkout bottlenecks.

### The Solution & Architecture
- **Unified Design Token System**: Developed strict token-based color, typography, and spacing variables ensuring 100% WCAG AAA accessibility across light and dark interfaces.
- **Keyboard-First Transaction Engine**: Implemented shortcut keys for all core POS actions (item search, discount overrides, tender splitting) which reduced terminal time by 45%.
- **Modular Frontend Architecture**: Engineered reusable React components with zero runtime CSS overhead, optimized bundle splitting, and client-side memory caching.

### Key Metrics & Impact
- **45% Faster** order completion rate during peak retail hours.
- **30% Reduction** in employee onboarding time due to intuitive interface conventions.
- **100% Type-Safe** codebase with end-to-end integration test coverage.`,
  },
  tractogo: {
    name: "TRACtoGO",
    slug: "tractogo",
    category: "Mobile App",
    description:
      "Complete redesign of web and mobile applications for Indonesia's premier vehicle rental ecosystem, reducing design-to-development handoff time by 30%.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    tech_stack: ["React Native", "TypeScript", "Figma", "Redux Toolkit"],
    problem:
      "High drop-off rates during vehicle selection and multi-city rental scheduling on mobile viewports.",
    solution:
      "Architected streamlined 3-step reservation flow, synchronized fleet availability caching, and integrated interactive vehicle pickup mapping.",
    role: "Senior Product Designer & Mobile Specialist",
    timeline: "2022 - 2023",
    link: "https://trac.astra.co.id",
    tags: "Automotive, Fleet Rental, Mobile UX, Design Handoff",
    tools: "Figma, React Native, TypeScript, Redux Toolkit, Mapbox",
    long_description: `## Overview
TRACtoGO is the official digital rental and fleet reservation platform for Astra TRAC, serving thousands of retail and corporate travelers across major Indonesian cities.

### The Challenge
The legacy mobile application suffered from fragmented booking funnels, complex vehicle specification comparisons, and drop-offs during airport terminal pickup coordination.

### The Solution & Architecture
- **Streamlined 3-Step Wizard**: Redesigned vehicle search, insurance tiering, and payment authorization into a progressive disclosure workflow.
- **Interactive Fleet Locator**: Integrated smooth map-based station locators with real-time airport shuttle tracking.
- **Design Handoff Acceleration**: Established a shared Figma-to-Code token repository, cutting handoff cycles by 30%.

### Key Metrics & Impact
- **35% Increase** in mobile app booking completion.
- **30% Accelerated** sprint velocity between product design and engineering teams.`,
  },
  "isuzu-link": {
    name: "Isuzu Link",
    slug: "isuzu-link",
    category: "Web App",
    description:
      "Design and development of customer-facing frontend features, telemetry dashboards, and service scheduling contributing to a 25% growth in user adoption.",
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=800&auto=format&fit=crop",
    tech_stack: ["Next.js", "TypeScript", "Tailwind CSS", "Charts.js"],
    problem:
      "Commercial vehicle fleet owners lacked centralized visibility over predictive maintenance schedules and dealer appointment statuses.",
    solution:
      "Engineered real-time fleet health dashboard with automated maintenance alerts and instantaneous dealer appointment booking.",
    role: "Frontend Developer & UI Consultant",
    timeline: "2021 - 2022",
    link: "https://isuzu-astra.com",
    tags: "Fleet Telemetry, Automotive IoT, Dashboard, Next.js",
    tools: "Next.js, TypeScript, Tailwind CSS, Chart.js, REST APIs",
    long_description: `## Overview
Isuzu Link connects commercial vehicle fleets with real-time telematics, diagnostic health telemetry, and authorized dealer maintenance networks.

### The Challenge
Fleet managers struggled to track vehicle status, leading to unpredicted downtime, missed periodic service intervals, and higher operating expenses.

### The Solution & Architecture
- **Real-Time Telemetry Visualizations**: Designed dynamic vehicle status widgets showing fuel efficiency, engine error alerts, and GPS location.
- **Direct Service Booking**: Built a responsive dealer workshop scheduling system that balanced bay availability in real time.
- **Accessible Dashboard**: Developed high-contrast data visualizations adhering to dark-mode enterprise workstation environments.

### Key Metrics & Impact
- **25% Growth** in active fleet owner adoption within the first two quarters.
- **40% Reduction** in unscheduled commercial vehicle downtime.`,
  },
  "pt-liftech": {
    name: "PT Liftech Digital Transformation",
    slug: "pt-liftech",
    category: "Digital Transformation",
    description:
      "Full-cycle digital transformation from UX auditing and wireframing to technical deployment.",
    image:
      "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=800&auto=format&fit=crop",
    tech_stack: ["TypeScript", "Next.js", "Tailwind CSS"],
    problem:
      "Legacy manual paper workflows caused operational bottlenecks and slow turnaround time across nationwide industrial elevator servicing.",
    solution:
      "Designed and deployed responsive technician portal and automated scheduling system, cutting report turnaround from 48h to real-time.",
    role: "Lead UI/UX Consultant & Frontend Architect",
    timeline: "2023",
    link: "#",
    tags: "Industrial UX, Digital Transformation, Workflow Automation",
    tools: "Figma, Next.js, TypeScript, Tailwind CSS",
    long_description: `## Overview
PT Liftech is an industrial heavy equipment and elevator engineering firm serving major infrastructure hubs across Indonesia.

### The Challenge
Field inspection reports were manually transcribed from physical carbon copies, leading to dispatch delays and fragmented inventory logs.

### The Solution & Architecture
- **Field Technician PWA**: Built an offline-ready mobile web portal with instant equipment ID scanning and automated report generation.
- **Central Dispatch Console**: Created real-time telemetry dashboard for dispatch coordinators to monitor technician status.

### Key Metrics & Impact
- **100% Paperless** transition across all field service teams.
- **60% Acceleration** in customer maintenance certification issuance.`,
  },
  "oms-crewdible": {
    name: "OMS Crewdible",
    slug: "oms-crewdible",
    category: "Web App",
    description:
      "Order Management System revamp increasing conversion rates by 24% with full responsive performance.",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1600&auto=format&fit=crop",
    tech_stack: ["React", "Node.js", "TypeScript", "Tailwind CSS"],
    problem:
      "Merchants on Crewdible experienced fragmented multi-warehouse inventory views and delayed bulk order processing during flash sales.",
    solution:
      "Revamped user flows for order batching, automated stock synchronization across e-commerce marketplaces, and introduced consolidated order tables.",
    role: "Senior UI/UX Designer & Frontend Engineer",
    timeline: "2022",
    link: "https://crewdible.com",
    tags: "E-Commerce, Logistics, Order Management, SaaS",
    tools: "Figma, React, Node.js, TypeScript",
    long_description: `## Overview
Crewdible operates an e-commerce fulfillment network providing on-demand warehousing and order fulfillment for micro and enterprise online sellers.

### The Challenge
When landing on the Crewdible dashboard for the first time, new users had difficulty finding marketplace product settings and getting detailed information on transactions.

### The Solution & Architecture
- **Consolidated Batch Order Processing**: Redesigned bulk dispatch interface reducing clicks per order by 50%.
- **Real-Time Stock Alerts**: Integrated proactive threshold notifications preventing out-of-stock cancellations.

### Key Metrics & Impact
- **24% Increase** in order fulfillment conversion rate.
- **35% Drop** in merchant support tickets regarding inventory discrepancy.`,
  },
  "qr-digital-menu": {
    name: "QR Digital Menu",
    slug: "qr-digital-menu",
    category: "Product Designer",
    description:
      "Contactless restaurant dining and ordering interface featuring instant table QR scanning, custom modifiers, and split bill checkout.",
    image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop",
    tech_stack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    problem:
      "Dine-in restaurants suffered from order bottlenecks during peak rush hours, with high waiter dependency for menu inquiries.",
    solution:
      "Engineered lightweight zero-download mobile web menu with dynamic item modifiers and seamless table-side ordering.",
    role: "Lead Product Designer",
    timeline: "2023",
    link: "#",
    tags: "F&B, QR Ordering, Mobile Web, Micro-interactions",
    tools: "Figma, React, TypeScript, Tailwind CSS",
    long_description: `## Overview
QR Digital Menu is a zero-friction, contactless dining web application designed for fast-paced modern restaurants and cafes.

### The Challenge
Patrons experienced wait times during peak dinner hours waiting for paper menus and waiter dispatch, hurting table turnover rate.

### The Solution & Architecture
- **Fast Loading Mobile Web Experience**: Optimized bundle under 60KB for instant loading via camera QR scan.
- **Visual Modifier Engine**: Interactive dish customization with live price updates.

### Key Metrics & Impact
- **18% Increase** in average order value via suggestive modifier upselling.
- **22% Improvement** in table turnover during peak rush.`,
  },
};

// Aliases for legacy and DB slugs
FALLBACK_PROJECTS_MAP["crewdible-oms-redesign"] =
  FALLBACK_PROJECTS_MAP["oms-crewdible"];
FALLBACK_PROJECTS_MAP[
  "tractogo-web-dan-mobile-application-ux-enhancement"
] = FALLBACK_PROJECTS_MAP["tractogo"];
FALLBACK_PROJECTS_MAP["isuzu-link-mobile-apps"] =
  FALLBACK_PROJECTS_MAP["isuzu-link"];

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
  const supabase = getStaticClient();
  const { data: projects } = await supabase.from("projects").select("slug");
  const slugs = new Set<string>();

  if (projects && projects.length > 0) {
    projects.forEach((p: any) => {
      if (p.slug) slugs.add(p.slug);
    });
  }
  Object.keys(FALLBACK_PROJECTS_MAP).forEach((slug) => slugs.add(slug));

  return Array.from(slugs).map((slug) => ({ slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;

  const supabase = getStaticClient();
  const { data: project } = await supabase
    .from("projects")
    .select("name, description, image")
    .eq("slug", slug)
    .single();

  const activeProject = project || FALLBACK_PROJECTS_MAP[slug];

  if (!activeProject) {
    return {
      title: "Project Not Found | Asep Syaepul",
    };
  }

  const projectImage =
    activeProject.image || activeProject.image_url || "/og-image.jpg";

  return {
    title: `${activeProject.name} — Case Study | Asep Syaepul`,
    description: activeProject.description,
    openGraph: {
      title: `${activeProject.name} — UI/UX & Frontend Case Study | Asep Syaepul`,
      description: activeProject.description,
      images: [
        {
          url: projectImage,
          width: 1200,
          height: 630,
          alt: activeProject.name || "Project preview",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${activeProject.name} | Asep Syaepul`,
      description: activeProject.description,
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

  const supabase = getStaticClient();

  // Fetch active project
  const { data: dbProject } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .single();

  const project = dbProject || FALLBACK_PROJECTS_MAP[slug];

  if (!project) {
    notFound();
  }

  // Fetch all projects for Previous / Next navigation
  const { data: allDbProjects } = await supabase
    .from("projects")
    .select("id, name, slug, category, image, description")
    .order("order_index", { ascending: true })
    .order("created_at", { ascending: false });

  const fallbackList = Object.values(FALLBACK_PROJECTS_MAP);
  const projectList =
    allDbProjects && allDbProjects.length > 0 ? allDbProjects : fallbackList;

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
    <div className="relative min-h-screen pt-28 sm:pt-32 pb-24 text-zinc-900 dark:text-white bg-[var(--canvas)] transition-colors">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-6xl">
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 border border-brand/20 text-brand font-mono tracking-widest text-[11px] font-bold uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-brand animate-pulse" />
            <span>{project.category}</span>
          </div>

          {/* Headline Display */}
          <h1 className="heading-display font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-zinc-900 dark:text-white tracking-tight leading-[1.08] mb-5">
            {project.name}
          </h1>

          {/* Executive Summary */}
          {cleanSummary && (
            <p className="text-base sm:text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-3xl leading-relaxed mb-6 font-normal">
              {cleanSummary}
            </p>
          )}

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
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 sm:p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/80 dark:border-zinc-800/80">
              {parsedMetrics.map((m, idx) => (
                <div
                  key={idx}
                  className="flex flex-col gap-1 text-start p-3.5 rounded-xl bg-white dark:bg-[#121215] border border-zinc-200/60 dark:border-zinc-800/60"
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
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 text-start mb-20">
          {/* Main Case Study Column (Left: 68%) */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-[#121215] border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
              <article className="prose prose-zinc dark:prose-invert max-w-none text-zinc-700 dark:text-zinc-300 font-body leading-relaxed prose-headings:font-display prose-headings:tracking-tight prose-headings:font-bold prose-h1:text-2xl sm:prose-h1:text-3xl prose-h1:mt-10 prose-h1:mb-4 prose-h1:pb-2 prose-h1:border-b prose-h1:border-zinc-200/60 dark:prose-h1:border-zinc-800/60 prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-zinc-200/60 dark:prose-h2:border-zinc-800/60 prose-h3:text-lg sm:prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:my-4 prose-ul:my-4 prose-ol:my-4 prose-li:my-1.5 prose-strong:text-zinc-900 dark:prose-strong:text-white prose-a:text-brand hover:prose-a:text-brand-deep prose-img:rounded-2xl prose-img:shadow-md prose-code:font-mono prose-code:text-brand prose-code:bg-zinc-100 dark:prose-code:bg-zinc-900 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md">
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
            </div>
          </div>

          {/* Sticky Specifications Sidebar (Right: 32%) */}
          <aside className="lg:col-span-4 flex flex-col gap-6">
            <div className="lg:sticky lg:top-28 space-y-6">
              {/* Studio Specification Card */}
              <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#121215] border border-zinc-200/80 dark:border-zinc-800 shadow-sm flex flex-col gap-6">
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
              <div className="p-6 rounded-3xl bg-zinc-100 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800 text-start flex flex-col gap-3">
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
                className="group p-5 rounded-2xl bg-white dark:bg-[#121215] border border-zinc-200/80 dark:border-zinc-800 hover:border-brand/40 dark:hover:border-brand/40 shadow-sm transition-all duration-200 flex items-center gap-4 text-start"
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
                className="group p-5 rounded-2xl bg-white dark:bg-[#121215] border border-zinc-200/80 dark:border-zinc-800 hover:border-brand/40 dark:hover:border-brand/40 shadow-sm transition-all duration-200 flex items-center justify-between gap-4 text-start"
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
