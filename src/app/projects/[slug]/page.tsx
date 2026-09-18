import { getStaticClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  IconExternalLink,
  IconBriefcase,
  IconTarget,
  IconArrowLeft,
  IconUser,
  IconCalendar,
  IconTags,
  IconTools,
  IconLayoutGrid,
} from "@tabler/icons-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Metadata, ResolvingMetadata } from "next";

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
FALLBACK_PROJECTS_MAP["crewdible-oms-redesign"] = FALLBACK_PROJECTS_MAP["oms-crewdible"];
FALLBACK_PROJECTS_MAP["tractogo-web-dan-mobile-application-ux-enhancement"] = FALLBACK_PROJECTS_MAP["tractogo"];
FALLBACK_PROJECTS_MAP["isuzu-link-mobile-apps"] = FALLBACK_PROJECTS_MAP["isuzu-link"];

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = await params;

  const supabase = getStaticClient();
  const { data: project } = await supabase
    .from("projects")
    .select("name, description, image, image_url")
    .eq("slug", slug)
    .single();

  const activeProject = project || FALLBACK_PROJECTS_MAP[slug];

  if (!activeProject) {
    return {
      title: "Project Not Found | Asep Syaepul",
    };
  }

  const projectImage = activeProject.image_url || activeProject.image || "/og-image.jpg";

  return {
    title: `${activeProject.name} | Asep Syaepul`,
    description: activeProject.description,
    openGraph: {
      title: `${activeProject.name} | Asep Syaepul`,
      description: activeProject.description,
      images: [
        {
          url: projectImage,
          width: 1200,
          height: 630,
          alt: activeProject.name || "Project image",
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
  const { data: dbProject, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .single();

  const project = dbProject || FALLBACK_PROJECTS_MAP[slug];

  if (!project) {
    notFound();
  }

  const cleanLongDescription = project.long_description || project.description || "";
  const displayImage = project.image_url || project.image || "/og-image.jpg";

  // Normalize tech stack array
  const techList = Array.isArray(project.tech_stack)
    ? project.tech_stack
    : typeof project.tech_stack === "string"
    ? (project.tech_stack as string).split(",").map((s: string) => s.trim())
    : [];

  // Build props from database fields
  const props: Record<string, string> = {};
  if (project.role) props["Role"] = project.role;
  if (project.timeline) props["Timeline"] = project.timeline;
  if (project.tags) props["Tags"] = project.tags;
  if (project.tools) props["Tools"] = project.tools;

  return (
    <div className="relative min-h-screen pt-28 sm:pt-32 pb-24 text-zinc-900 dark:text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-6xl">
        {/* Back Link */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-zinc-500 hover:text-brand transition-colors mb-8 group"
        >
          <IconArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Projects</span>
        </Link>

        {/* Studio Spec Card Shell */}
        <div className="relative w-full">
          {/* Figma Layer Selection Tab */}
          <div className="absolute -top-3.5 left-6 sm:left-8 font-mono text-[11px] font-bold text-brand bg-white dark:bg-[#121214] px-3.5 py-1 rounded-md border border-brand/30 shadow-sm flex items-center gap-1.5 z-30 tracking-wider">
            <IconLayoutGrid className="w-3.5 h-3.5 text-brand" />
            <span>{project.slug}.spec</span>
          </div>

          {/* Main Card Frame */}
          <div className="group relative w-full bg-white dark:bg-[#121215] rounded-3xl md:rounded-[36px] border border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden flex flex-col">
            {/* 4 Corner Figma Handles */}
            <span className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white dark:bg-[#121215] border-2 border-brand rounded-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-40 pointer-events-none" />
            <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white dark:bg-[#121215] border-2 border-brand rounded-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-40 pointer-events-none" />
            <span className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white dark:bg-[#121215] border-2 border-brand rounded-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-40 pointer-events-none" />
            <span className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white dark:bg-[#121215] border-2 border-brand rounded-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-40 pointer-events-none" />

            {/* Top - Hero Image Banner */}
            <div className="relative w-full h-[38vh] md:h-[54vh] shrink-0 bg-zinc-900 overflow-hidden">
              <Image
                src={displayImage}
                alt={project.name || "Project image"}
                fill
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-cover object-top"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121215] via-black/40 to-black/20" />

              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 flex flex-col items-start justify-end text-left z-20">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/90 text-white font-mono font-bold tracking-widest text-[11px] uppercase mb-3 shadow-sm">
                  {project.category}
                </span>
                <h1 className="heading-display font-display text-3xl sm:text-4xl md:text-6xl font-extrabold text-white leading-[1.08] tracking-tight drop-shadow-md">
                  {project.name}
                </h1>
              </div>
            </div>

            {/* Bottom - Content */}
            <div className="w-full px-6 py-8 md:px-12 md:py-14 flex flex-col gap-10 bg-white dark:bg-[#121215]">
              {/* Tech Stack Pills */}
              <div className="flex flex-wrap items-center gap-2">
                {techList.map((tech: string) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 text-xs font-mono font-medium border border-zinc-200 dark:border-zinc-800"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
                {/* Left column - Main Case Study Narrative */}
                <div className="lg:col-span-8 flex flex-col gap-8 text-start">
                  <section className="flex flex-col gap-4">
                    <div className="prose prose-zinc dark:prose-invert prose-p:leading-relaxed prose-a:text-brand prose-a:underline hover:prose-a:text-brand-deep prose-img:rounded-2xl prose-img:shadow-lg max-w-none text-zinc-600 dark:text-zinc-400 font-body">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw]}
                        components={{
                          img: ({ node, ...props }) => {
                            const src = props.src?.replace(/ /g, "%20");
                            return (
                              <img
                                {...props}
                                src={src}
                                loading="lazy"
                                alt={props.alt || ""}
                              />
                            );
                          },
                        }}
                      >
                        {cleanLongDescription}
                      </ReactMarkdown>
                    </div>
                  </section>
                </div>

                {/* Right column - Sidebar Metadata & Action CTA */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                  <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800 flex flex-col gap-5 text-start">
                    {Object.entries(props).length > 0 ? (
                      Object.entries(props).map(([key, value]) => {
                        const Icon =
                          key === "Role"
                            ? IconUser
                            : key === "Timeline"
                            ? IconCalendar
                            : key === "Tags"
                            ? IconTags
                            : IconTools;
                        return (
                          <div key={key} className="flex flex-col gap-1">
                            <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400">
                              <Icon className="w-3.5 h-3.5 text-brand stroke-[2.5]" />
                              <h4 className="font-mono text-[10.5px] font-bold uppercase tracking-wider">
                                {key}
                              </h4>
                            </div>
                            <p className="text-zinc-900 dark:text-white font-medium text-sm leading-relaxed">
                              {value}
                            </p>
                          </div>
                        );
                      })
                    ) : (
                      <>
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400">
                            <IconTarget className="w-3.5 h-3.5 text-brand stroke-[2.5]" />
                            <h4 className="font-mono text-[10.5px] font-bold uppercase tracking-wider">
                              Platform
                            </h4>
                          </div>
                          <p className="text-zinc-900 dark:text-white font-medium text-sm">
                            Web & Mobile Responsive
                          </p>
                        </div>
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400">
                            <IconBriefcase className="w-3.5 h-3.5 text-brand stroke-[2.5]" />
                            <h4 className="font-mono text-[10.5px] font-bold uppercase tracking-wider">
                              Category
                            </h4>
                          </div>
                          <p className="text-zinc-900 dark:text-white font-medium text-sm">
                            {project.category}
                          </p>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Project External Launch Button */}
                  {project.link && project.link !== "#" ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-brand hover:bg-brand-deep text-white font-mono font-bold text-xs uppercase tracking-wider shadow-brand shadow-[0_12px_26px_-12px_#F0531C] active:scale-95 transition-all duration-200 w-full"
                    >
                      <span>Open Live Project</span>
                      <IconExternalLink className="w-4 h-4 stroke-[2.5]" />
                    </a>
                  ) : (
                    <div className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 text-zinc-400 dark:text-zinc-500 font-mono font-bold text-xs uppercase tracking-wider border border-zinc-200 dark:border-zinc-800 cursor-not-allowed opacity-70 w-full">
                      <span>Internal Case Study</span>
                    </div>
                  )}

                  {/* Back to Projects Action */}
                  <Link
                    href="/projects"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white dark:bg-[#121215] hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800 font-mono font-bold text-xs uppercase tracking-wider hover:border-brand/40 transition-colors w-full"
                  >
                    <span>View More Projects</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
