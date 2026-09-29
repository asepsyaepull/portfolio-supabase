"use client";

import { FigmaTag, FrameLabel } from "@/components/ui/figma-tag";
import { Input, TextArea } from "@/components/ui/input";
import { useLanguage } from "@/context/language-context";
import { cn } from "@/lib/utils";
import {
  IconArrowUpRight,
  IconBolt,
  IconBrandDribbble,
  IconBrandGithub,
  IconBrandLinkedin,
  IconCheck,
  IconChevronDown,
  IconCopy,
  IconDownload,
  IconInfoCircle,
  IconMail,
  IconMapPin,
  IconSend,
  IconShieldCheck,
  IconSparkles,
  IconX,
} from "@tabler/icons-react";
import { AnimatePresence, motion, useMotionTemplate, useMotionValue } from "framer-motion";
import React, { useEffect, useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import { submitContactForm } from "./actions";
import { ProjectEstimatorTab, AppliedEstimateData } from "./ProjectEstimatorTab";

const EMAIL_ADDRESS = "mail.asepsyaepul@gmail.com";

export default function ContactClient() {
  const { t, locale } = useLanguage();
  const contact = t.contactPage;
  const formRef = useRef<HTMLFormElement>(null);

  const [activeTab, setActiveTab] = useState<"message" | "estimator">("message");
  const [hasAppliedEstimate, setHasAppliedEstimate] = useState(false);
  const [messageValue, setMessageValue] = useState<string>("");

  const [isPending, startTransition] = useTransition();
  const [copied, setCopied] = useState(false);
  const [selectedScope, setSelectedScope] = useState<string>("");
  const [subjectValue, setSubjectValue] = useState<string>("");

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL_ADDRESS);
      setCopied(true);
      toast.success(contact.copiedEmailText);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error("Gagal menyalin email ke clipboard.");
    }
  };

  const handleScopeSelect = (scope: string) => {
    if (selectedScope === scope) {
      setSelectedScope("");
      setSubjectValue("");
    } else {
      setSelectedScope(scope);
      setSubjectValue(`[${scope}] Inquiry`);
    }
  };

  const handleApplyEstimate = (data: AppliedEstimateData) => {
    const scopeMap: Record<string, string> = {
      "Landing Page": data.withDev ? "Frontend Web (Next.js/React)" : "UI/UX Design",
      "Full Website": data.withDev ? "Frontend Web (Next.js/React)" : "UI/UX Design",
      "App UI/UX": "Mobile App Design",
      "Custom Dashboard / SaaS": data.withDev ? "Frontend Web (Next.js/React)" : "UI/UX Design",
    };

    const targetScope =
      scopeMap[data.projectType] ||
      contact.scopeChips.find((c) =>
        c.toLowerCase().includes(data.projectType.toLowerCase())
      ) ||
      contact.scopeChips[0];

    setSelectedScope(targetScope);
    setSubjectValue(
      `[${locale === "id" ? "Penawaran Proyek" : "Project Proposal"}: ${data.projectType} (${data.withDev ? (locale === "id" ? "Desain + Kode" : "Design + Code") : (locale === "id" ? "Hanya Desain" : "Design Only")})] - Inquiry`
    );
    setMessageValue(data.summaryText);
    setHasAppliedEstimate(true);
    setActiveTab("message");
    toast.success(
      locale === "id"
        ? "Rincian kebutuhan diterapkan! Silakan lengkapi nama & email untuk mengajukan penawaran."
        : "Project scope applied! Please fill in your name & email to request a custom proposal."
    );
  };

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      const result = await submitContactForm(formData);
      if (result?.error) {
        toast.error(result.error);
      } else if (result?.success) {
        toast.success(contact.successMessage);
        formRef.current?.reset();
        setSelectedScope("");
        setSubjectValue("");
        setMessageValue("");
        setHasAppliedEstimate(false);
      }
    });
  };

  return (
    <div className="relative min-h-screen pt-32 sm:pt-36 lg:pt-40 pb-24 text-zinc-900 dark:text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-6xl">
        {/* ===================================================================
            1. HEADER & INTRO
            =================================================================== */}
        <div className="mb-14 sm:mb-16">
          {/* Frame Label & Dimensions */}
          <div className="mb-4 flex items-center justify-between px-1">
            <FrameLabel name={contact.portalTag} className="!text-brand" />
            <span className="font-mono text-[11px] font-bold text-zinc-400 dark:text-zinc-500">
              1280 × AUTO
            </span>
          </div>

          <div className="flex flex-col items-start text-left max-w-3xl">

            {/* Editorial Title */}
            <h1 className="heading-display font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-zinc-900 dark:text-white tracking-tight leading-[1.05] mb-5">
              {contact.titleLine1}{" "}
              <span className="text-zinc-400 dark:text-zinc-500 block sm:inline">
                {contact.titleLine2}
              </span>
            </h1>

            {/* Narrative Description */}
            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl">
              {contact.description}
            </p>
          </div>
        </div>

        {/* ===================================================================
            2. MAIN STUDIO STAGE (2 Columns)
            =================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-20 sm:mb-24">
          {/* LEFT COLUMN: Channels, Live Status, Socials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-6"
          >

            {/* Direct Communication Channels */}
            <div className="rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-[#121215]/80 backdrop-blur-md p-4 sm:p-6 lg:p-7 shadow-lg space-y-5 sm:space-y-6">
              {/* Email item with Quick Copy */}
              <div className="flex flex-col gap-2">
                <div className="flex flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-zinc-100 dark:bg-zinc-800/60 text-zinc-500 flex items-center justify-center shrink-0">
                      <IconMail className="w-5 h-5 text-brand" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <p className="font-mono text-[10px] uppercase font-bold tracking-wider text-zinc-400 dark:text-zinc-500">
                        {contact.emailLabel}
                      </p>
                      <a
                        href={`mailto:${EMAIL_ADDRESS}`}
                        className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-white hover:text-brand transition-colors truncate break-all sm:break-normal"
                        title={EMAIL_ADDRESS}
                      >
                        {EMAIL_ADDRESS}
                      </a>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className={cn(
                      "inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all duration-200 shrink-0 self-start sm:self-auto",
                      copied
                        ? "bg-emerald-500 text-white shadow-sm"
                        : "bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-brand hover:border-brand/40 border border-zinc-200 dark:border-zinc-700"
                    )}
                  >
                    {copied ? (
                      <>
                        <IconCheck className="w-3.5 h-3.5 stroke-[2.5]" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <IconCopy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-3.5 pt-1">
                <div className="w-9 h-9 rounded-xl bg-zinc-100 dark:bg-zinc-800/60 text-zinc-500 flex items-center justify-center shrink-0">
                  <IconMapPin className="w-5 h-5 text-brand" />
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase font-bold tracking-wider text-zinc-400 dark:text-zinc-500">
                    {contact.locationLabel}
                  </p>
                  <p className="text-xs sm:text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                    {contact.locationValue}
                  </p>
                </div>
              </div>
            </div>

            {/* Socials & Resume Banner */}
            <div className="rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-[#121215]/80 backdrop-blur-md p-4 sm:p-6 lg:p-7 shadow-lg space-y-4">
              <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                {contact.socialHeading}
              </p>
              <div className="grid grid-cols-3 gap-2 w-full">
                <SocialLink
                  href="https://github.com/asepsyaepull"
                  icon={<IconBrandGithub className="w-4 h-4 shrink-0" />}
                  label="GitHub"
                />
                <SocialLink
                  href="https://linkedin.com/in/asepsyaepul"
                  icon={<IconBrandLinkedin className="w-4 h-4 shrink-0" />}
                  label="LinkedIn"
                />
                <SocialLink
                  href="https://dribbble.com/asepsyaepul"
                  icon={<IconBrandDribbble className="w-4 h-4 shrink-0" />}
                  label="Dribbble"
                />
              </div>

              <div className="pt-2">
                <a
                  href="/cv/CV-Asep-Syaepul-Rohman.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 font-mono font-bold text-xs uppercase tracking-wider hover:text-brand hover:border-brand/40 active:scale-95 transition-all duration-200"
                >
                  <IconDownload className="w-4 h-4 stroke-[2.5]" />
                  <span>{locale === "id" ? "Unduh CV / Resume" : "Download CV / Resume"}</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Figma Studio Message Composer Artboard */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <div className="omd-sel relative">
              {/* 4 Corner Figma Handles (Hidden on small screens to prevent horizontal overflow) */}
              <span className="omd-h tl hidden sm:block" aria-hidden />
              <span className="omd-h tr hidden sm:block" aria-hidden />
              <span className="omd-h bl hidden sm:block" aria-hidden />
              <span className="omd-h br hidden sm:block" aria-hidden />

              {/* Floating Figma Artboard Tag */}
              <FigmaTag variant="blue" className="-top-3 left-4 sm:left-6 z-20 max-w-[calc(100%-2rem)] truncate">
                {activeTab === "message" ? contact.formCardTag : "02 project-estimator.fig"}
              </FigmaTag>

              {/* Main Card Frame */}
              <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-[#121215]/90 backdrop-blur-xl p-4 sm:p-7 md:p-8 lg:p-10 shadow-2xl transition-colors duration-300">
                {/* Background Ambient Glow */}
                <div className="absolute -top-12 -right-12 h-56 w-56 bg-brand/10 blur-[90px] -z-10 rounded-full pointer-events-none" />

                {/* SEGMENTED TABS HEADER (Dual-Mode: Direct Message vs Project Estimator) */}
                <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 sm:mb-7 pb-4 sm:pb-5 border-b border-zinc-200/80 dark:border-zinc-800/80">
                  <div className="grid grid-cols-2 w-full sm:w-auto p-1 rounded-xl sm:rounded-2xl bg-zinc-100/90 dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-zinc-800/80 text-xs font-mono font-bold">
                    <button
                      type="button"
                      onClick={() => setActiveTab("message")}
                      className={cn(
                        "flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs transition-all duration-200 cursor-pointer select-none",
                        activeTab === "message"
                          ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                          : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300"
                      )}
                    >
                      <IconMail className="w-3.5 h-3.5 text-brand shrink-0" />
                      <span className="sm:hidden">{locale === "id" ? "Pesan" : "Message"}</span>
                      <span className="hidden sm:inline">{locale === "id" ? "Pesan Langsung" : "Direct Message"}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveTab("estimator")}
                      className={cn(
                        "flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs transition-all duration-200 cursor-pointer select-none",
                        activeTab === "estimator"
                          ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm"
                          : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300"
                      )}
                    >
                      <IconBolt className="w-3.5 h-3.5 text-brand shrink-0" />
                      <span className="sm:hidden">{locale === "id" ? "Estimasi" : "Estimator"}</span>
                      <span className="hidden sm:inline">{locale === "id" ? "Kalkulator Proyek" : "Scope & Proposal"}</span>
                    </button>
                  </div>
                </div>

                {/* CONTENT AREA: TAB 1 (FORM) VS TAB 2 (ESTIMATOR) */}
                {activeTab === "message" ? (
                  <form
                    ref={formRef}
                    action={handleSubmit}
                    className="space-y-4 sm:space-y-5 relative z-10 animate-in fade-in duration-300"
                  >
                    {/* Applied Estimate Alert Banner */}
                    {hasAppliedEstimate && (
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 sm:gap-3 p-3 sm:p-3.5 rounded-xl bg-brand/10 border border-brand/20 text-brand font-mono text-[11px] sm:text-xs">
                        <div className="flex items-center gap-2">
                          <IconSparkles className="w-4 h-4 shrink-0 text-brand" />
                          <span className="leading-snug">
                            {locale === "id"
                              ? "Rincian kebutuhan proyek telah diterapkan ke form!"
                              : "Project requirements and scope applied to form!"}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setHasAppliedEstimate(false);
                            setMessageValue("");
                            setSubjectValue("");
                            setSelectedScope("");
                          }}
                          className="text-[10.5px] sm:text-[11px] underline hover:text-brand-deep cursor-pointer shrink-0 font-bold self-end sm:self-auto"
                        >
                          {locale === "id" ? "Reset Form" : "Reset Form"}
                        </button>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      {/* Name */}
                      <div>
                        <label className="block font-mono text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
                          {contact.fullNameLabel} <span className="text-brand">*</span>
                        </label>
                        <Input
                          name="name"
                          placeholder={contact.namePlaceholder}
                          type="text"
                          required
                          disabled={isPending}
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block font-mono text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
                          {contact.emailAddressLabel} <span className="text-brand">*</span>
                        </label>
                        <Input
                          name="email"
                          placeholder={contact.emailPlaceholder}
                          type="email"
                          required
                          disabled={isPending}
                        />
                      </div>
                    </div>

                    {/* Scope Selection Dropdown */}
                    <ScopeDropdown
                      label={contact.scopeTitle.replace(/:$/, "")}
                      scopeChips={contact.scopeChips}
                      selectedScope={selectedScope}
                      onSelect={(chip) => handleScopeSelect(chip)}
                      onClear={() => {
                        setSelectedScope("");
                        setSubjectValue("");
                      }}
                      disabled={isPending}
                      locale={locale}
                    />

                    {/* Subject */}
                    <div>
                      <label className="block font-mono text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
                        {contact.subjectLabel} <span className="text-brand">*</span>
                      </label>
                      <Input
                        name="subject"
                        value={subjectValue}
                        onChange={(e) => setSubjectValue(e.target.value)}
                        placeholder={contact.subjectPlaceholder}
                        type="text"
                        required
                        disabled={isPending}
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block font-mono text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
                        {contact.messageLabel} <span className="text-brand">*</span>
                      </label>
                      <TextArea
                        name="message"
                        value={messageValue}
                        onChange={(e) => setMessageValue(e.target.value)}
                        placeholder={contact.messagePlaceholder}
                        required
                        disabled={isPending}
                        rows={6}
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isPending}
                        className={cn(
                          "w-full py-4 rounded-xl font-mono font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-3 transition-all duration-200 shadow-brand shadow-[0_12px_26px_-8px_#F0531C] active:scale-98 cursor-pointer",
                          isPending
                            ? "bg-brand/70 text-white cursor-not-allowed opacity-80"
                            : "bg-brand hover:bg-brand-deep text-white"
                        )}
                      >
                        {isPending ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>{contact.submittingButton}</span>
                          </>
                        ) : (
                          <>
                            <span>{contact.submitButton}</span>
                            <IconSend className="w-4 h-4 stroke-[2.5]" />
                          </>
                        )}
                      </button>
                    </div>

                    {/* Privacy / Security Notice */}
                    <div className="flex items-center justify-center gap-2 pt-1 text-center">
                      <IconShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
                      <p className="font-mono text-[10px] text-zinc-400 dark:text-zinc-500">
                        Direct encrypted submission to inbox · 100% spam-free
                      </p>
                    </div>
                  </form>
                ) : (
                  <div className="relative z-10">
                    <ProjectEstimatorTab onApplyEstimate={handleApplyEstimate} />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* ===================================================================
            4. COLLABORATION FAQ / EXPECTATIONS BENTO
            =================================================================== */}
        <div className="pt-10 sm:pt-14 border-t border-zinc-200/80 dark:border-zinc-800/80">
          <div className="max-w-2xl mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 text-brand font-mono text-xs font-bold uppercase tracking-wider mb-2">
              <IconInfoCircle className="w-4 h-4" />
              <span>FAQ / PROTOCOL</span>
            </div>
            <h2 className="heading-display font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight mb-3">
              {contact.faqHeading}
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {contact.faqSubheading}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {contact.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl sm:rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-[#121215]/80 backdrop-blur-md p-5 sm:p-6 shadow-sm hover:border-brand/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold text-brand">
                      0{idx + 1}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-brand/40" />
                  </div>
                  <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white mb-2 leading-snug">
                    {faq.question}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

/* ===================================================================
   HELPER SUB-COMPONENTS
   =================================================================== */

function SocialLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-1 sm:gap-1.5 px-2 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900/80 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 font-mono text-[10.5px] sm:text-xs font-bold uppercase tracking-wider hover:text-brand hover:border-brand/40 transition-all duration-200 w-full"
    >
      <span className="shrink-0">{icon}</span>
      <span className="truncate">{label}</span>
      <IconArrowUpRight className="w-3 h-3 text-zinc-400 shrink-0 hidden sm:inline" />
    </a>
  );
}

interface ScopeDropdownProps {
  label: string;
  scopeChips: string[];
  selectedScope: string;
  onSelect: (chip: string) => void;
  onClear: () => void;
  disabled?: boolean;
  locale: string;
}

function ScopeDropdown({
  label,
  scopeChips,
  selectedScope,
  onSelect,
  onClear,
  disabled,
  locale,
}: ScopeDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const bg = useMotionTemplate`
    radial-gradient(
      ${isHovered ? "100px" : "0px"} circle at ${mouseX}px ${mouseY}px,
      rgba(240, 83, 28, 0.35),
      transparent 80%
    )
  `;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div className="relative z-30" ref={dropdownRef}>
      <label
        htmlFor="scope-dropdown-trigger"
        className="block font-mono text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5 cursor-pointer"
      >
        {label}
      </label>

      <input type="hidden" name="scope" value={selectedScope} />

      <motion.div
        style={{ background: bg }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="p-[1.5px] rounded-xl transition duration-300"
      >
        <button
          id="scope-dropdown-trigger"
          type="button"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          disabled={disabled}
          onClick={() => setIsOpen((prev) => !prev)}
          className={cn(
            "flex h-11 sm:h-12 w-full items-center justify-between rounded-xl border px-3 sm:px-4 py-2 text-xs sm:text-sm shadow-sm transition-all duration-200 cursor-pointer select-none",
            "bg-white/90 dark:bg-[#121215]/90 text-left",
            isOpen
              ? "border-brand ring-2 ring-brand/20 dark:border-brand"
              : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            {selectedScope ? (
              <>
                <span className="w-2 h-2 rounded-full bg-brand shadow-[0_0_8px_#F0531C] shrink-0" />
                <span className="font-mono text-xs sm:text-sm font-bold text-zinc-900 dark:text-white truncate">
                  {selectedScope}
                </span>
              </>
            ) : (
              <span className="text-zinc-400 dark:text-zinc-500 text-xs sm:text-sm font-sans truncate">
                {locale === "id"
                  ? "Pilih kebutuhan / cakupan proyek..."
                  : "Select project scope / service..."}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 shrink-0 ml-2">
            {selectedScope && !disabled && (
              <span
                role="button"
                tabIndex={0}
                aria-label={locale === "id" ? "Hapus pilihan" : "Clear selection"}
                onClick={(e) => {
                  e.stopPropagation();
                  onClear();
                }}
                className="p-1 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <IconX className="w-3.5 h-3.5 stroke-[2.5]" />
              </span>
            )}
            <IconChevronDown
              className={cn(
                "w-4 h-4 text-zinc-400 dark:text-zinc-500 transition-transform duration-200 stroke-[2.5]",
                isOpen && "rotate-180 text-brand"
              )}
            />
          </div>
        </button>
      </motion.div>

      {/* Dropdown Menu Options */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            role="listbox"
            className="absolute left-0 right-0 top-full mt-2 z-50 max-h-60 overflow-y-auto rounded-2xl border border-zinc-200/90 dark:border-zinc-800/90 bg-white/95 dark:bg-[#141417]/95 backdrop-blur-xl p-1.5 shadow-2xl space-y-1"
          >
            {scopeChips.map((chip) => {
              const isActive = selectedScope === chip;
              return (
                <button
                  key={chip}
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  onClick={() => {
                    onSelect(chip);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "w-full px-3 sm:px-3.5 py-2.5 rounded-xl text-left text-xs font-mono transition-all duration-150 flex items-center justify-between cursor-pointer",
                    isActive
                      ? "bg-brand/10 text-brand font-bold border border-brand/20 shadow-sm"
                      : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 hover:text-zinc-900 dark:hover:text-white border border-transparent"
                  )}
                >
                  <div className="flex items-center gap-2.5 min-w-0 pr-2">
                    <span
                      className={cn(
                        "w-1.5 h-1.5 rounded-full shrink-0 transition-colors",
                        isActive ? "bg-brand" : "bg-zinc-300 dark:bg-zinc-600"
                      )}
                    />
                    <span className="text-xs font-mono leading-tight">{chip}</span>
                  </div>
                  {isActive && (
                    <IconCheck className="w-4 h-4 text-brand stroke-[2.5] shrink-0" />
                  )}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
