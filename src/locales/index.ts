import { Dictionary, Locale } from "./types";
import { idDictionary } from "./id";
import { enDictionary } from "./en";

export * from "./types";

export const dictionaries: Record<Locale, Dictionary> = {
  id: idDictionary,
  en: enDictionary,
};

export const DEFAULT_LOCALE: Locale = "id";

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] || dictionaries[DEFAULT_LOCALE];
}
