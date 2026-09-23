"use client";

import { FigmaTag, FrameLabel } from "@/components/ui/figma-tag";
import { Input, TextArea } from "@/components/ui/input";
import { useLanguage } from "@/context/language-context";
import { cn } from "@/lib/utils";
import {
  IconArrowUpRight,
  IconBrandDribbble,
  IconBrandGithub,
  IconBrandLinkedin,
  IconCheck,
  IconCopy,
  IconDownload,
  IconMail,
  IconMapPin,
  IconSend,
  IconShieldCheck,
  IconSparkles
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import React, { useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import { submitContactForm } from "./actions";

const EMAIL_ADDRESS = "mail.asepsyaepul@gmail.com";

export default function ContactClient() {
  const { t } = useLanguage();
  const contact = t.contactPage;
  const formRef = useRef<HTMLFormElement>(null);

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
      }
    });
  };

  return (
    <div className="relative min-h-screen pt-28 sm:pt-32 pb-24 text-zinc-900 dark:text-white">
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
            <h1 className="heading-display font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-zinc-900 dark:text-white tracking-tight leading-[1.05] mb-5">
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-24">
          {/* LEFT COLUMN: Channels, Live Status, Socials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-6"
          >

            {/* Direct Communication Channels */}
            <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-[#121215]/80 backdrop-blur-md p-6 sm:p-7 shadow-lg space-y-6">
              {/* Email item with Quick Copy */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-zinc-100 dark:bg-zinc-800/60 text-zinc-500 flex items-center justify-center shrink-0">
                      <IconMail className="w-5 h-5 text-brand" />
                    </div>
                    <div className="flex flex-col truncate">
                      <p className="font-mono text-[10px] uppercase font-bold tracking-wider text-zinc-400 dark:text-zinc-500">
                        {contact.emailLabel}
                      </p>
                      <a
                        href={`mailto:${EMAIL_ADDRESS}`}
                        className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-white hover:text-brand transition-colors truncate"
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
                      "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all duration-200 shrink-0",
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
            <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-[#121215]/80 backdrop-blur-md p-6 sm:p-7 shadow-lg space-y-4">
              <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                {contact.socialHeading}
              </p>
              <div className="flex flex-wrap items-center gap-2.5">
                <SocialLink
                  href="https://github.com/asepsyaepull"
                  icon={<IconBrandGithub className="w-4 h-4" />}
                  label="GitHub"
                />
                <SocialLink
                  href="https://linkedin.com/in/asepsyaepul"
                  icon={<IconBrandLinkedin className="w-4 h-4" />}
                  label="LinkedIn"
                />
                <SocialLink
                  href="https://dribbble.com/asepsyaepul"
                  icon={<IconBrandDribbble className="w-4 h-4" />}
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
                  <span>{t.common.buttons.downloadCv}</span>
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
              {/* 4 Corner Figma Handles */}
              <span className="omd-h tl" aria-hidden />
              <span className="omd-h tr" aria-hidden />
              <span className="omd-h bl" aria-hidden />
              <span className="omd-h br" aria-hidden />

              {/* Floating Figma Artboard Tag */}
              <FigmaTag variant="blue" className="-top-3 left-6 z-20">
                {contact.formCardTag}
              </FigmaTag>

              {/* Main Card Frame */}
              <div className="relative overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white/90 dark:bg-[#121215]/90 backdrop-blur-xl p-6 sm:p-8 md:p-10 shadow-2xl transition-colors duration-300">
                {/* Background Ambient Glow */}
                <div className="absolute -top-12 -right-12 h-56 w-56 bg-brand/10 blur-[90px] -z-10 rounded-full pointer-events-none" />

                {/* The Contact Form */}
                <form
                  ref={formRef}
                  action={handleSubmit}
                  className="space-y-5 relative z-10"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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

                  {/* Scope Selection Chips */}
                  <div className="mb-7">
                    <label className="block font-mono text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
                      {contact.scopeTitle}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {contact.scopeChips.map((chip) => {
                        const isActive = selectedScope === chip;
                        return (
                          <button
                            key={chip}
                            type="button"
                            onClick={() => handleScopeSelect(chip)}
                            className={cn(
                              "px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all duration-200 border cursor-pointer",
                              isActive
                                ? "bg-brand text-white border-brand shadow-[0_4px_14px_-2px_#F0531C] scale-[1.02]"
                                : "bg-zinc-100/90 dark:bg-zinc-900/80 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 hover:border-brand/40"
                            )}
                          >
                            {chip}
                          </button>
                        );
                      })}
                    </div>
                  </div>

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
                      placeholder={contact.messagePlaceholder}
                      required
                      disabled={isPending}
                      rows={5}
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
              </div>
            </div>
          </motion.div>
        </div>

        {/* ===================================================================
            4. COLLABORATION FAQ / EXPECTATIONS BENTO
            =================================================================== */}

      </div>
    </div>
  );
}

/* ===================================================================
   HELPER SUB-COMPONENTS
   =================================================================== */

function SpecCard({
  num,
  label,
  desc,
}: {
  num: string;
  label: string;
  desc: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/70 dark:bg-[#121215]/70 backdrop-blur-md p-4 sm:p-5 shadow-sm hover:border-brand/40 transition-all duration-300 group">
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-xs font-bold text-brand tracking-wider">
          {num}
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-brand/40 group-hover:bg-brand transition-colors" />
      </div>
      <p className="font-mono text-[10px] uppercase font-bold tracking-wider text-zinc-400 dark:text-zinc-500 mb-1">
        {label}
      </p>
      <p className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-zinc-100 leading-snug">
        {desc}
      </p>
    </div>
  );
}

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
      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-900/80 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 font-mono text-xs font-bold uppercase tracking-wider hover:text-brand hover:border-brand/40 transition-all duration-200"
    >
      {icon}
      <span>{label}</span>
      <IconArrowUpRight className="w-3 h-3 text-zinc-400" />
    </a>
  );
}
