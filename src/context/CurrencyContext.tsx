import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { CURRENCIES, detectCurrency, formatPrice, type Currency } from "@/lib/currency";

const STORAGE_KEY = "the-lab-currency";

type CurrencyValue = {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  format: (amount: number) => string;
};

const CurrencyContext = createContext<CurrencyValue | null>(null);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>("USD");

  // Resolved after hydration so server and client markup match.
  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(STORAGE_KEY);
    } catch {
      /* storage unavailable (private mode, blocked) */
    }
    const saved = CURRENCIES.find((c) => c === stored);
    setCurrencyState(saved ?? detectCurrency());
  }, []);

  const setCurrency = useCallback((next: Currency) => {
    setCurrencyState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo<CurrencyValue>(
    () => ({ currency, setCurrency, format: (amount) => formatPrice(amount, currency) }),
    [currency, setCurrency],
  );

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within CurrencyProvider");
  return ctx;
}
