"use client";

import React from "react";
import { IconLoader2 } from "@tabler/icons-react";

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  loading?: boolean;
  size?: "sm" | "md";
  colorScheme?: "brand" | "amber" | "emerald";
  ariaLabel?: string;
  title?: string;
  iconOn?: React.ReactNode;
  iconOff?: React.ReactNode;
}

export default function ToggleSwitch({
  checked,
  onChange,
  disabled = false,
  loading = false,
  size = "md",
  colorScheme = "brand",
  ariaLabel,
  title,
  iconOn,
  iconOff,
}: ToggleSwitchProps) {
  const isSm = size === "sm";

  // Color classes for active state
  const activeBgClass = {
    brand: "bg-brand border-brand shadow-[0_2px_8px_rgba(240,83,28,0.35)]",
    amber: "bg-amber-500 border-amber-500 shadow-[0_2px_8px_rgba(245,158,11,0.35)]",
    emerald: "bg-emerald-500 border-emerald-500 shadow-[0_2px_8px_rgba(16,185,129,0.35)]",
  }[colorScheme];

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled || loading) return;
    onChange(!checked);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled || loading) return;
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      onChange(!checked);
    }
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      title={title}
      disabled={disabled || loading}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={`relative inline-flex shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-950 ${
        isSm ? "h-5 w-9 border" : "h-6 w-11 border-2"
      } ${
        checked
          ? activeBgClass
          : "bg-zinc-200 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700/80"
      } ${disabled ? "opacity-50 cursor-not-allowed" : "hover:opacity-95"}`}
    >
      <span className="sr-only">{ariaLabel || title || "Toggle"}</span>
      <span
        className={`pointer-events-none inline-flex items-center justify-center rounded-full bg-white shadow-sm ring-0 transition-transform duration-200 ease-in-out dark:bg-zinc-100 ${
          isSm ? "h-3.5 w-3.5" : "h-5 w-5"
        } ${
          isSm
            ? checked
              ? "translate-x-4"
              : "translate-x-0.5"
            : checked
            ? "translate-x-5"
            : "translate-x-0.5"
        }`}
      >
        {loading ? (
          <IconLoader2
            size={isSm ? 10 : 12}
            className="animate-spin text-zinc-600 dark:text-zinc-800"
          />
        ) : checked ? (
          iconOn || null
        ) : (
          iconOff || null
        )}
      </span>
    </button>
  );
}
