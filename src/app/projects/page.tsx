import { from } from "@/lib/pg-client";
import ProjectsClient from "./ProjectsClient";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Projects | Asep Syaepul",
  description:
    "Explore case studies in UI/UX design and production frontend engineering by Asep Syaepul — enterprise ERP platforms, modern retail POS, and mobile applications.",
  alternates: {
    canonical: "https://asyaepul.id/projects",
  },
  openGraph: {
    title: "Projects | Asep Syaepul",
    description:
      "Production-ready UI/UX design and frontend case studies: enterprise ERP, retail POS, vehicle rental mobile app, and automotive ecosystems.",
    url: "https://asyaepul.id/projects",
    siteName: "Asep Syaepul Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Asep Syaepul - Selected Projects",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Asep Syaepul",
    description:
      "Production-ready UI/UX design and frontend case studies by Asep Syaepul.",
    images: ["/og-image.jpg"],
  },
};

export default async function ProjectsPage() {
  const { data: projects, error } = await from("projects")
    .select(
      "id, name, slug, category, description, image, tech_stack, problem, solution, link, is_featured, role, timeline"
    )
    .order("order_index", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching projects detail:", {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
      full: error,
    });
  }

  // Fetch UI gallery shots from PostgreSQL
  const { data: galleries, error: galleryError } = await from("ui_gallery")
    .select(
      "id, title, slug, category, description, image_url, thumbnail_url, tools, aspect_ratio, figma_url, preview_url, is_featured, order_index, created_at"
    )
    .order("order_index", { ascending: true })
    .order("created_at", { ascending: false });

  if (galleryError) {
    console.warn("UI Gallery table not yet queried or empty, using curated fallback:", galleryError.message);
  }

  // Fallback UI Gallery items
  const fallbackGalleries = [
    {
      id: "g1",
      title: "Fintech Telemetry & Liquidity Dashboard",
      slug: "fintech-telemetry-dashboard",
      category: "Web Dashboard",
      description:
        "Eksplorasi antarmuka analitik keuangan dense-data dengan palet gelap, grafik real-time telemetry, dan panel liquiditas interaktif.",
      image_url:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop",
      tools: ["Figma", "AutoLayout", "Tailwind CSS", "Design Tokens"],
      aspect_ratio: "16/10",
      figma_url: "https://figma.com",
      preview_url: null,
      is_featured: true,
    },
    {
      id: "g2",
      title: "AetherPay - Minimalist Mobile Wallet & Split Bill",
      slug: "aetherpay-mobile-wallet",
      category: "Mobile App",
      description:
        "Konsep aplikasi dompet digital iOS dengan interaksi split bill gestural, micro-haptics feedback, dan hierarki tipografi ultra-bersih.",
      image_url:
        "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1600&auto=format&fit=crop",
      tools: ["Figma", "iOS HIG", "Design System", "Prototyping"],
      aspect_ratio: "4/3",
      figma_url: "https://figma.com",
      preview_url: null,
      is_featured: true,
    },
    {
      id: "g3",
      title: "Pulse AI - Developer Cloud Platform Landing Page",
      slug: "pulse-ai-cloud-landing",
      category: "Landing Page",
      description:
        "Desain halaman arahan developer tool modern beraksen gelap dengan glow aksen oranye, animated code terminal preview, dan bento feature grid.",
      image_url:
        "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1600&auto=format&fit=crop",
      tools: ["Figma", "Tailwind CSS", "Framer Motion"],
      aspect_ratio: "16/10",
      figma_url: "https://figma.com",
      preview_url: "https://pulse-ai.preview.com",
      is_featured: true,
    },
    {
      id: "g4",
      title: "Studio Token - Core UI Design System Components",
      slug: "studio-token-design-system",
      category: "Design System",
      description:
        "Spesifikasi token komponen atomik untuk status pills, segmented switches, dynamic form fields, dan color variables yang siap di-code ke frontend.",
      image_url:
        "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=1600&auto=format&fit=crop",
      tools: ["Figma Variables", "Design Tokens", "Accessibility WCAG"],
      aspect_ratio: "16/10",
      figma_url: "https://figma.com",
      preview_url: null,
      is_featured: true,
    },
    {
      id: "g5",
      title: "Nexus Logistics - Realtime Fleet Dispatch Console",
      slug: "nexus-fleet-dispatch-console",
      category: "Web Dashboard",
      description:
        "Desain konsol armada truk operasional dengan peta pelacakan langsung, routing efisiensi bahan bakar, dan quick actions dispatch.",
      image_url:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop",
      tools: ["Figma", "GIS Mapping", "AutoLayout"],
      aspect_ratio: "16/10",
      figma_url: "https://figma.com",
      preview_url: null,
      is_featured: true,
    },
    {
      id: "g6",
      title: "Vanguard E-Commerce - Luxury Watchmaker Storefront",
      slug: "vanguard-luxury-storefront",
      category: "Landing Page",
      description:
        "Eksplorasi visual editorial storefront dengan fotografi sinematik, micro-animations hover showcase, dan minimal checkout drawer.",
      image_url:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1600&auto=format&fit=crop",
      tools: ["Figma", "Editorial Layout", "Prototyping"],
      aspect_ratio: "4/3",
      figma_url: "https://figma.com",
      preview_url: null,
      is_featured: true,
    },
  ];

  const displayGalleries =
    galleries && galleries.length > 0 ? galleries : fallbackGalleries;

  // Gunakan data fallback jika query error atau tabel kosong
  const displayProjects =
    projects && projects.length > 0
      ? projects
      : [
          {
            id: 1,
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
            is_featured: true,
          },
          {
            id: 2,
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
            is_featured: true,
          },
          {
            id: 3,
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
            is_featured: true,
          },
          {
            id: 4,
            name: "PT Liftech Digital Transformation",
            slug: "pt-liftech",
            category: "Digital Transformation",
            description:
              "Full-cycle digital transformation from UX auditing and wireframing to technical deployment.",
            image:
              "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=800&auto=format&fit=crop",
            tech_stack: ["TypeScript", "Next.js"],
            problem:
              "Legacy manual paper workflows caused operational bottlenecks and slow turnaround time across nationwide industrial elevator servicing.",
            solution:
              "Designed and deployed responsive technician portal and automated scheduling system, cutting report turnaround from 48h to real-time.",
            role: "Lead UI/UX Consultant & Frontend Architect",
            timeline: "2023",
            link: "#",
            is_featured: true,
          },
          {
            id: 5,
            name: "OMS Crewdible",
            slug: "oms-crewdible",
            category: "Web App",
            description:
              "Order Management System revamp increasing conversion rates by 24% with full responsive performance.",
            image:
              "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1600&auto=format&fit=crop",
            tech_stack: ["React", "Node.js"],
            problem:
              "Merchants on Crewdible experienced fragmented multi-warehouse inventory views and delayed bulk order processing during flash sales.",
            solution:
              "Revamped user flows for order batching, automated stock synchronization across e-commerce marketplaces, and introduced consolidated order tables.",
            role: "Senior UI/UX Designer & Frontend Engineer",
            timeline: "2022",
            link: "https://crewdible.com",
            is_featured: true,
          },
        ];

  return (
    <ProjectsClient
      projects={displayProjects as any[]}
      galleries={displayGalleries as any[]}
    />
  );
}
