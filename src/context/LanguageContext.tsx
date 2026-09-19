import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { dictionaries, type Dictionary, type Lang } from "@/i18n/translations";

export type { Lang } from "@/i18n/translations";

/** Language shown on first visit (before the visitor picks one). */
export const DEFAULT_LANG: Lang = "es";
const STORAGE_KEY = "the-lab-lang";

type LanguageValue = {
  lang: Lang;
  t: Dictionary;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
};

const LanguageContext = createContext<LanguageValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(DEFAULT_LANG);

  // Read the stored preference after hydration so server and client markup match.
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "es" || stored === "en") setLangState(stored);
    } catch {
      /* storage unavailable (private mode, blocked) — keep default */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore */
    }
  }, [lang]);

  const setLang = useCallback((next: Lang) => setLangState(next), []);
  const toggleLang = useCallback(() => setLangState((l) => (l === "es" ? "en" : "es")), []);

  const value = useMemo<LanguageValue>(
    () => ({ lang, t: dictionaries[lang], setLang, toggleLang }),
    [lang, setLang, toggleLang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}

/**
 * Same as `useLanguage`, but falls back to the default language when rendered
 * outside the provider (root error / not-found boundaries).
 */
export function useOptionalLanguage(): LanguageValue {
  const ctx = useContext(LanguageContext);
  if (ctx) return ctx;
  return {
    lang: DEFAULT_LANG,
    t: dictionaries[DEFAULT_LANG],
    setLang: () => {},
    toggleLang: () => {},
  };
}
