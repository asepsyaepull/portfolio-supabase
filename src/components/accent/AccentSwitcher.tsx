"use client";

import { cn } from "@/lib/utils";
import { useAccent, ACCENTS } from "@/components/accent/AccentContext";

/**
 * Live accent switcher — single source of truth = AccentContext
 * (setAccent persists to localStorage + applies CSS vars globally).
 */
export default function AccentSwitcher({ className }: { className?: string }) {
  const { accent, setAccent } = useAccent();

  return (
    <div
      role="group"
      aria-label="Pilih warna aksen situs"
      className={cn("flex items-center gap-2", className)}
    >
      {ACCENTS.map((a) => {
        const active = accent === a.value;
        return (
          <button
            key={a.value}
            type="button"
            aria-label={`Ganti warna aksen ke ${a.name} (${a.value})`}
            aria-pressed={active}
            onClick={() => setAccent(a.value)}
            style={{ backgroundColor: a.value }}
            className={cn(
              "h-7 w-7 rounded-lg border-2 border-[#16150F]/15 transition-transform duration-150 hover:scale-110",
              active && "ring-2 ring-offset-2 ring-[var(--accent)] scale-110"
            )}
          />
        );
      })}
    </div>
  );
}
