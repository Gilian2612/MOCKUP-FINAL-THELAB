import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { toast } from "sonner";

import type { Product } from "@/lib/products";
import { useLanguage } from "@/context/LanguageContext";
import { useCurrency } from "@/context/CurrencyContext";
import { SHIPPING, type Prices } from "@/lib/currency";

export type Variant = "full" | "mini";

type StoredLine = {
  /** slug + presentación: el mismo perfume en 100 ml y 25 ml son líneas distintas. */
  key: string;
  slug: string;
  size: string;
  name: string;
  prices: Prices;
  image: string;
  qty: number;
};

export type CartLine = StoredLine & { price: number };

type CartValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
  add: (product: Product, qty?: number, variant?: Variant) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<StoredLine[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { t } = useLanguage();
  const { currency } = useCurrency();
  const addedToast = t.cart.addedToast;

  const add = useCallback(
    (product: Product, qty = 1, variant: Variant = "full") => {
      const mini = variant === "mini" ? product.mini : null;
      const key = mini ? `${product.slug}-mini` : product.slug;
      const size = mini ? mini.size : product.size;
      setLines((prev) => {
        const existing = prev.find((l) => l.key === key);
        if (existing) {
          return prev.map((l) => (l.key === key ? { ...l, qty: Math.min(10, l.qty + qty) } : l));
        }
        return [
          ...prev,
          {
            key,
            slug: product.slug,
            size,
            name: product.name,
            prices: mini ? mini.prices : product.prices,
            image: mini ? mini.image : product.image,
            qty,
          },
        ];
      });
      toast.success(addedToast, { description: `${product.name} · ${size}` });
    },
    [addedToast],
  );

  const setQty = useCallback((key: string, qty: number) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.key !== key)
        : prev.map((l) => (l.key === key ? { ...l, qty: Math.min(10, qty) } : l)),
    );
  }, []);

  const remove = useCallback(
    (key: string) => setLines((prev) => prev.filter((l) => l.key !== key)),
    [],
  );

  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<CartValue>(() => {
    const priced = lines.map((l) => ({ ...l, price: l.prices[currency] }));
    const subtotal = priced.reduce((s, l) => s + l.price * l.qty, 0);
    const shipping = subtotal > 0 ? SHIPPING[currency] : 0;
    const tax = Math.round(subtotal * 0.05);
    return {
      lines: priced,
      count: lines.reduce((s, l) => s + l.qty, 0),
      subtotal,
      shipping,
      tax,
      total: subtotal + shipping + tax,
      drawerOpen,
      setDrawerOpen,
      add,
      setQty,
      remove,
      clear,
    };
  }, [lines, currency, drawerOpen, add, setQty, remove, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
