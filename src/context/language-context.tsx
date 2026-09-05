"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  DEFAULT_LOCALE,
  Dictionary,
  Locale,
  dictionaries,
  getDictionary,
} from "@/locales";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: Dictionary;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

const STORAGE_KEY = "asyaepul_portfolio_locale";

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
  const [mounted, setMounted] = useState(false);

  // Initialize from localStorage or browser preferences on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
      if (saved && (saved === "id" || saved === "en")) {
        setLocaleState(saved);
      } else if (typeof navigator !== "undefined" && navigator.language) {
        // If user's primary language starts with 'en', initialize with English
        if (navigator.language.toLowerCase().startsWith("en")) {
          setLocaleState("en");
        }
      }
    } catch (e) {
      console.warn("Could not read locale from localStorage:", e);
    } finally {
      setMounted(true);
    }
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem(STORAGE_KEY, newLocale);
      document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000;SameSite=Lax`;
      if (typeof document !== "undefined") {
        document.documentElement.lang = newLocale;
      }
    } catch (e) {
      console.warn("Could not persist locale:", e);
    }
  }, []);

  const toggleLocale = useCallback(() => {
    setLocale(locale === "id" ? "en" : "id");
  }, [locale, setLocale]);

  // Keep html lang synchronized
  useEffect(() => {
    if (mounted && typeof document !== "undefined") {
      document.documentElement.lang = locale;
    }
  }, [locale, mounted]);

  const t = useMemo(() => getDictionary(locale), [locale]);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      toggleLocale,
      t,
    }),
    [locale, setLocale, toggleLocale, t]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    // Graceful fallback for components rendered outside provider or during tests
    return {
      locale: DEFAULT_LOCALE,
      setLocale: () => {},
      toggleLocale: () => {},
      t: dictionaries[DEFAULT_LOCALE],
    };
  }
  return context;
}

export const useTranslation = useLanguage;
export default LanguageProvider;
