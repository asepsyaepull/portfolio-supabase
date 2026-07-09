"use client";
import React from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Dribbble, Send, MapPin } from "lucide-react";
import { Spotlight } from "@/components/ui/spotlight";
import { Input, TextArea } from "@/components/ui/input";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { cn } from "@/lib/utils";

import { useState, useTransition } from "react";
import { submitContactForm } from "./actions";

export default function ContactPage() {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ type: "success" | "error", text: string } | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setMessage(null);
    startTransition(async () => {
      const result = await submitContactForm(formData);
      if (result.error) {
        setMessage({ type: "error", text: result.error });
      } else if (result.success) {
        setMessage({ type: "success", text: "Pesan Anda berhasil dikirim! Saya akan segera membalasnya." });
        const form = document.getElementById("contact-form") as HTMLFormElement;
        form.reset();
      }
    });
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-gray-950 relative overflow-hidden flex flex-col items-center justify-center py-20 md:py-32 transition-colors duration-300">
      {/* Background Effects */}
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="rgba(163, 230, 53, 0.2)"
      />
      
      <div className="container mx-auto px-4 md:px-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Context & Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-lime-600 dark:text-lime-500 font-mono tracking-widest text-xs md:text-sm uppercase mb-4 block">/ CONTACT PORTAL</span>
            <h1 className="text-4xl md:text-7xl font-bold text-zinc-900 dark:text-white mb-6 md:mb-8 leading-tight transition-colors">
                Let's Build <br />
                <span className="text-zinc-500">Something Great.</span>
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400 text-base md:text-xl leading-relaxed mb-8 md:mb-12 max-w-md transition-colors">
                Have a project in mind or a complex business problem to solve? 
                I'm currently available for freelance work and full-time opportunities.
            </p>

            <div className="space-y-8">
                <ContactInfoItem 
                    icon={<Mail className="text-lime-500" />} 
                    label="Email" 
                    value="mail.asepsyaepul@gmail.com" 
                    href="mailto:mail.asepsyaepul@gmail.com"
                />
                <ContactInfoItem 
                    icon={<MapPin className="text-lime-500" />} 
                    label="Location" 
                    value="Cilandak, Jakarta Selatan" 
                />
            </div>

            <div className="mt-16 pt-8 border-t border-black/5 dark:border-white/5 transition-colors">
                <h4 className="text-zinc-500 text-sm font-bold uppercase tracking-widest mb-6">Social Connections</h4>
                <div className="flex gap-6">
                    <SocialIcon icon={<Linkedin />} href="https://linkedin.com/in/asepsyaepul" label="LinkedIn" />
                    <SocialIcon icon={<Github />} href="https://github.com/asepsyaepull" label="GitHub" />
                    <SocialIcon icon={<Dribbble />} href="#" label="Dribbble" />
                </div>
            </div>
          </motion.div>

          {/* Right Column: Premium Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/50 dark:bg-zinc-900/40 backdrop-blur-md p-8 md:p-12 rounded-[40px] border border-black/5 dark:border-white/5 relative overflow-hidden transition-colors duration-300"
          >
            <div className="absolute top-0 right-0 h-40 w-40 bg-lime-500/5 blur-[80px] -z-10" />
            
            <form id="contact-form" action={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid md:grid-cols-2 gap-6">
                <LabelInputContainer>
                    <label className="text-zinc-600 dark:text-zinc-400 text-xs font-bold uppercase ml-1 mb-2 transition-colors">Full Name</label>
                    <Input name="name" placeholder="John Doe" type="text" required disabled={isPending} />
                </LabelInputContainer>
                <LabelInputContainer>
                    <label className="text-zinc-600 dark:text-zinc-400 text-xs font-bold uppercase ml-1 mb-2 transition-colors">Email Address</label>
                    <Input name="email" placeholder="john@example.com" type="email" required disabled={isPending} />
                </LabelInputContainer>
              </div>

              <LabelInputContainer>
                <label className="text-zinc-600 dark:text-zinc-400 text-xs font-bold uppercase ml-1 mb-2 transition-colors">Subject</label>
                <Input name="subject" placeholder="How can I help you?" type="text" required disabled={isPending} />
              </LabelInputContainer>

              <LabelInputContainer>
                <label className="text-zinc-600 dark:text-zinc-400 text-xs font-bold uppercase ml-1 mb-2 transition-colors">Message</label>
                <TextArea name="message" placeholder="Tell me about your project..." required disabled={isPending} />
              </LabelInputContainer>

              {message && (
                <div className={cn(
                  "p-4 rounded-xl text-sm font-medium",
                  message.type === "success" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" : "bg-red-500/10 text-red-600 dark:text-red-400"
                )}>
                  {message.text}
                </div>
              )}

              <div className="pt-4">
                  <HoverBorderGradient
                    containerClassName="rounded-xl w-full"
                    as="button"
                    type="submit"
                    className="font-bold w-full py-4 flex items-center justify-center gap-3 bg-white dark:bg-zinc-950 text-lime-600 dark:text-lime-500 group-hover:text-lime-700 dark:group-hover:text-lime-400 transition-colors"
                  >
                    <span>{isPending ? "SENDING..." : "SEND MESSAGE"}</span>
                    <Send size={18} />
                  </HoverBorderGradient>
              </div>
            </form>
          </motion.div>

        </div>
      </div>
    </div>
  );
}

const ContactInfoItem = ({ icon, label, value, href }: { icon: React.ReactNode, label: string, value: string, href?: string }) => (
    <div className="flex items-center gap-5 group">
        <div className="h-12 w-12 rounded-2xl bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/5 flex items-center justify-center group-hover:border-lime-500/50 transition-colors duration-300">
            {icon}
        </div>
        <div>
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-tighter">{label}</p>
            {href ? (
                <a href={href} className="text-zinc-900 dark:text-white text-lg font-medium hover:text-lime-600 dark:hover:text-lime-500 transition-colors">{value}</a>
            ) : (
                <p className="text-zinc-900 dark:text-white text-lg font-medium transition-colors">{value}</p>
            )}
        </div>
    </div>
);

const SocialIcon = ({ icon, href, label }: { icon: React.ReactNode, href: string, label: string }) => (
    <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer"
        aria-label={label}
        className="h-12 w-12 rounded-full bg-white dark:bg-zinc-900 border border-black/5 dark:border-white/5 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:text-lime-600 hover:border-lime-500/50 dark:hover:text-lime-500 dark:hover:border-lime-500/50 transition-all duration-300"
    >
        {React.cloneElement(icon as React.ReactElement, { size: 20 })}
    </a>
);

const LabelInputContainer = ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => {
    return (
      <div className={cn("flex flex-col space-y-2 w-full", className)}>
        {children}
      </div>
    );
  };
