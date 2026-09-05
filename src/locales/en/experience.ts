import { ExperienceDictionary } from "../types";

export const experienceEn: ExperienceDictionary = {
  tag: "experience.fig",
  titlePrefix: "Work",
  titleHighlight: "Experience",
  subtitle:
    "7+ years crafting digital products and building enterprise-grade frontend architectures.",
  items: [
    {
      id: "symbolix",
      company: "Symbolix.ai",
      role: "Lead UI/UX Developer",
      period: "Jan 2026 - Jul 2026",
      duration: "7 mos",
      type: "Contract",
      location: "Jakarta, ID",
      project: "ERP & POS Ecosystem",
      description:
        "Redesigned the point-of-sale transaction interface and unified ERP workflows to streamline day-to-day operations for cashiers and store managers.",
      contributions: [
        "Architected a scalable Next.js & TypeScript UI with modular, testable components.",
        "Engineered multi-branch POS navigation with an expedited checkout flow.",
        "Facilitated on-site usability testing with cashier staff to validate checkout velocity.",
      ],
      tech: ["Figma", "React", "Next.js", "TypeScript", "Tailwind CSS"],
    },
    {
      id: "korlantas",
      company: "Korlantas Polri",
      role: "Software Developer",
      period: "Jul 2025 - Feb 2026",
      duration: "8 mos",
      type: "Enterprise",
      location: "Jakarta, ID",
      project: "National Traffic Monitoring",
      description:
        "Engineered a nationwide traffic accident monitoring web application for the National Police Traffic Corps, focusing on component stability and low-latency live telemetry.",
      contributions: [
        "Implemented high-performance UI components handling high-throughput telemetry data.",
        "Guaranteed cross-browser resilience across legacy and modern enterprise environments.",
        "Optimized page rendering latency for large tabular datasets and live status maps.",
      ],
      tech: ["React", "JavaScript", "PHP", "Laravel", "HTML5", "CSS3", "REST API", "Git"],
    },
    {
      id: "tractogo",
      company: "TRACtoGO (Astra SERA)",
      role: "UI/UX Designer",
      period: "Dec 2024 - May 2025",
      duration: "6 mos",
      type: "Contract",
      location: "Jakarta, ID",
      project: "Fleet Rental Platform",
      description:
        "Revamped the fleet booking experience across web and mobile apps, establishing unified design system tokens to accelerate feature delivery.",
      contributions: [
        "Built a structured Design System bridging product design and frontend engineering teams.",
        "Streamlined the vehicle reservation funnel into a faster, frictionless multi-step flow.",
        "Prepared comprehensive interaction specs for handoff to the React Native engineering team.",
      ],
      tech: ["Figma", "Design Systems", "Prototyping", "User Research"],
    },
    {
      id: "gizalab",
      company: "Gizalab",
      role: "Product Designer & Frontend",
      period: "Oct 2023 - Aug 2024",
      duration: "11 mos",
      type: "Full-time",
      location: "Bandung, ID (Remote)",
      project: "Healthcare Suite",
      description:
        "Designed end-to-end product flows from conceptual wireframes to high-fidelity prototypes for a digital banking application.",
      contributions: [
        "Designed banking data management dashboards with clear visual hierarchies and intuitive navigation.",
        "Authored comprehensive design specifications for seamless engineering handoff.",
        "Constructed interactive prototypes to communicate and validate complex financial workflows.",
        "Optimized layout responsiveness for both desktop monitors and mobile devices.",
      ],
      tech: ["Figma", "Design Tokens", "Prototyping"],
    },
    {
      id: "crewdible",
      company: "Crewdible",
      role: "UI/UX Designer",
      period: "May 2022 - Apr 2023",
      duration: "1 yr",
      type: "Full-time",
      location: "Jakarta, ID",
      project: "Order Management System",
      description:
        "Redesigned the Order Management System (OMS) and warehouse inventory management interfaces serving thousands of e-commerce merchants.",
      contributions: [
        "Redesigned SKU stock tracking and automated fulfillment status interfaces.",
        "Constructed interactive prototypes for workflow validation prior to backend sprint planning.",
        "Optimized responsiveness for both rugged warehouse desktop monitors and handheld devices.",
      ],
      tech: ["Figma", "Responsive Web", "Wireframing", "Prototyping"],
    },
    {
      id: "isuzu",
      company: "Isuzu Link (Astra Graphia)",
      role: "UI/UX Designer",
      period: "Jun 2019 - Apr 2022",
      duration: "2 yrs 11 mos",
      type: "Full-time",
      location: "Jakarta, ID",
      project: "Automotive Telematics",
      description:
        "Designed commercial fleet telematics dashboards for vehicle route tracking, maintenance scheduling, and engine performance diagnostics.",
      contributions: [
        "Crafted fleet route tracking visualizations and fuel consumption audit reports.",
        "Managed shared design asset libraries across parallel cross-functional squads.",
        "Partnered with backend engineers during QA cycles to verify telemetry data fidelity.",
      ],
      tech: ["Figma", "Information Architecture", "Prototyping", "Illustrator"],
    },
  ],
};
