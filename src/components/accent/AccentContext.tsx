"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export const ACCENTS = [
  { name: "Violet", value: "#4B41F0", rgb: "75, 65, 240", soft: "#E3E1FC" },
  { name: "Amber", value: "#D97706", rgb: "217, 119, 6", soft: "#FBE8CC" },
  { name: "Emerald", value: "#059669", rgb: "5, 150, 105", soft: "#CFEFE2" },
  { name: "Red", value: "#DC2626", rgb: "220, 38, 38", soft: "#FADCDC" },
] as const;

const STORAGE_KEY = "portfolio-accent";
export const DEFAULT_ACCENT = ACCENTS[0].value;

type AccentContextValue = {
  accent: string;
  setAccent: (value: string) => void;
};

const AccentContext = createContext<AccentContextValue>({
  accent: DEFAULT_ACCENT,
  setAccent: () => {},
});

function applyAccent(value: string) {
  if (typeof document === "undefined") return;
  const found = ACCENTS.find((a) => a.value === value) ?? ACCENTS[0];
  const el = document.documentElement.style;
  el.setProperty("--accent", found.value);
  el.setProperty("--accent-soft", found.soft);
  el.setProperty("--accent-rgb", found.rgb);
}

export function AccentProvider({ children }: { children: ReactNode }) {
  const [accent, setAccentState] = useState<string>(DEFAULT_ACCENT);

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const initial =
      stored && ACCENTS.some((a) => a.value === stored) ? stored : DEFAULT_ACCENT;
    setAccentState(initial);
    applyAccent(initial);
  }, []);

  const setAccent = useCallback((value: string) => {
    setAccentState(value);
    window.localStorage.setItem(STORAGE_KEY, value);
    applyAccent(value);
  }, []);

  return (
    <AccentContext.Provider value={{ accent, setAccent }}>
      {children}
    </AccentContext.Provider>
  );
}

export function useAccent() {
  return useContext(AccentContext);
}
