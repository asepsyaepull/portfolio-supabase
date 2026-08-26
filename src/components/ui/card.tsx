"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "white" | "dark" | "ghost" | "dashed";
  hoverEffect?: boolean;
}

/**
 * Standard OMD Card container with rounded-24px and signature elevation shadow.
 */
export function Card({
  children,
  variant = "white",
  hoverEffect = false,
  className,
  ...props
}: CardProps) {
  const variantStyles = {
    white: "bg-white border-line text-ink shadow-[0_20px_50px_-32px_rgba(20,19,16,0.32)]",
    dark: "bg-ink border-transparent text-white shadow-[0_20px_50px_-32px_rgba(20,19,16,0.32)]",
    ghost: "bg-white/60 border-line text-ink backdrop-blur-sm",
    dashed: "bg-white/60 border-dashed border-ink/20 text-ink",
  };

  return (
    <div
      className={cn(
        "rounded-[24px] border p-6 md:p-8 transition-all duration-300",
        variantStyles[variant],
        hoverEffect && "hover:shadow-card-hover hover:border-brand/40",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card;
