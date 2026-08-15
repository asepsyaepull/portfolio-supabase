"use client";
import { motion } from "framer-motion";
import { Check, ArrowRight, Clock } from "lucide-react";
import Link from "next/link";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

type PricingTier = {
  name: string;
  description: string;
  price: string;
  unit: string;
  tagline: string;
  features: string[];
  cta: string;
  popular?: boolean;
};

const tiers: PricingTier[] = [
  {
    name: "Landing Page",
    description: "Single-page website or campaign page that converts visitors into leads.",
    price: "Rp 3.5jt",
    unit: "per project",
    tagline: "1-2 weeks delivery",
    features: [
      "UI/UX design in Figma (1 page)",
      "Responsive design (mobile-first)",
      "1 revision round",
      "Design handoff (Figma + assets)",
      "Deployment support (Next.js)",
    ],
    cta: "Start a landing page",
  },
  {
    name: "Full Website",
    description: "Multi-page website with design system, CMS-ready, and production build.",
    price: "Rp 8jt",
    unit: "per project",
    tagline: "2-4 weeks delivery",
    popular: true,
    features: [
      "UI/UX design up to 8 pages",
      "Design system + reusable components",
      "Interactive prototype (Figma)",
      "2 revision rounds",
      "Frontend development (Next.js/React)",
      "SEO & performance optimization",
      "Deployment & post-launch support",
    ],
    cta: "Start a full website",
  },
  {
    name: "App UI/UX",
    description: "End-to-end product design for web/mobile apps, from flow to high-fidelity UI.",
    price: "Rp 15jt",
    unit: "per project",
    tagline: "3-6 weeks delivery",
    features: [
      "UX audit & user flows",
      "Wireframes + high-fidelity UI",
      "Design system (Figma variables)",
      "Interactive prototype",
      "3 revision rounds",
      "Developer handoff & QA support",
    ],
    cta: "Start an app project",
  },
];

const hourlyNote = [
  "Design & frontend support per hour",
  "Minimum 10 hours engagement",
  "For audits, reviews, or small tasks",
];

export function PricingSection() {
  return (
    <section className="py-24 bg-zinc-50 dark:bg-gray-950 transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-lime-600 dark:text-lime-500 font-bold tracking-widest text-sm uppercase transition-colors">
            / Pricing
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-zinc-900 dark:text-white mt-4 mb-4 tracking-tight transition-colors">
            Simple, transparent <span className="text-lime-600 dark:text-lime-500 transition-colors">pricing.</span>
          </h2>
          <p className="text-zinc-600 dark:text-gray-400 max-w-2xl mx-auto transition-colors">
            Fixed price per project — no hidden fees, no surprises. Every package includes
            design + development. Need something custom? Let's talk.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers.map((tier, idx) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`relative flex flex-col rounded-3xl p-8 transition-all duration-300 ${
                tier.popular
                  ? "bg-white dark:bg-zinc-900 border-2 border-lime-500/60 dark:border-lime-500/40 shadow-xl shadow-lime-500/10 md:-translate-y-2"
                  : "bg-white/60 dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/[0.06] hover:border-lime-500/40 dark:hover:border-lime-500/30"
              }`}
            >
              {tier.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 text-[10px] font-black tracking-widest uppercase bg-lime-500 text-black px-4 py-1.5 rounded-full">
                  Most Popular
                </span>
              )}

              <h3 className="text-xl font-bold text-zinc-900 dark:text-white transition-colors">
                {tier.name}
              </h3>
              <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed transition-colors">
                {tier.description}
              </p>

              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-4xl font-black text-zinc-900 dark:text-white transition-colors">
                  {tier.price}
                </span>
                <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium transition-colors">
                  {tier.unit}
                </span>
              </div>
              <div className="mt-2 flex items-center gap-1.5 text-xs text-lime-600 dark:text-lime-500 font-bold transition-colors">
                <Clock className="w-3.5 h-3.5" />
                {tier.tagline}
              </div>

              <div className="my-6 h-px bg-zinc-200 dark:bg-white/[0.06] transition-colors" />

              <ul className="flex flex-col gap-3 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm text-zinc-600 dark:text-zinc-300 transition-colors">
                    <Check className="w-4 h-4 mt-0.5 shrink-0 text-lime-600 dark:text-lime-500" />
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-auto">
                <Link href="/contact" className="block w-full">
                  <HoverBorderGradient
                    containerClassName="rounded-full w-full"
                    as="div"
                    className={`w-full flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold transition-all ${
                      tier.popular
                        ? "bg-lime-500 text-black"
                        : "bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white border border-zinc-200 dark:border-white/10"
                    }`}
                  >
                    <span>{tier.cta}</span>
                    <ArrowRight className="w-4 h-4" />
                  </HoverBorderGradient>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Hourly Rate Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-14 max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex flex-col items-center gap-4 p-6 md:p-8 rounded-3xl border border-dashed border-zinc-300 dark:border-white/10 bg-white/40 dark:bg-zinc-900/40 transition-colors w-full">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-lime-600 dark:text-lime-500" />
              <span className="text-sm font-black uppercase tracking-widest text-zinc-700 dark:text-zinc-200 transition-colors">
                Need hourly support?
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-zinc-900 dark:text-white transition-colors">
                Rp 200rb
              </span>
              <span className="text-sm text-zinc-500 dark:text-zinc-400 transition-colors">/ hour</span>
            </div>
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              {hourlyNote.map((note) => (
                <li key={note} className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 transition-colors">
                  <Check className="w-3 h-3 text-lime-600 dark:text-lime-500" />
                  {note}
                </li>
              ))}
            </ul>
            <Link href="/contact">
              <HoverBorderGradient
                containerClassName="rounded-full"
                as="div"
                className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white px-6 py-3 text-sm font-bold transition-colors"
              >
                <span>Ask about hourly work</span>
              </HoverBorderGradient>
            </Link>
          </div>
        </motion.div>

        <p className="mt-10 text-center text-xs text-zinc-400 dark:text-zinc-600 transition-colors">
          All prices negotiable based on scope. Open to fixed-price or milestone-based payment.
        </p>
      </div>
    </section>
  );
}
