import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { toast } from "sonner";

import type { Product } from "@/lib/products";

export type CartLine = {
  slug: string;
  name: string;
  price: number;
  image: string;
  qty: number;
};

type CartValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
  add: (product: Product, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const add = useCallback((product: Product, qty = 1) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.slug === product.slug);
      if (existing) {
        return prev.map((l) =>
          l.slug === product.slug ? { ...l, qty: l.qty + qty } : l,
        );
      }
      return [
        ...prev,
        {
          slug: product.slug,
          name: product.name,
          price: product.price,
          image: product.image,
          qty,
        },
      ];
    });
    toast.success("ADDED TO BAG", { description: product.name });
  }, []);

  const setQty = useCallback((slug: string, qty: number) => {
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => l.slug !== slug)
        : prev.map((l) => (l.slug === slug ? { ...l, qty } : l)),
    );
  }, []);

  const remove = useCallback(
    (slug: string) => setLines((prev) => prev.filter((l) => l.slug !== slug)),
    [],
  );

  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<CartValue>(() => {
    const subtotal = lines.reduce((s, l) => s + l.price * l.qty, 0);
    const shipping = subtotal > 0 ? 45 : 0;
    const tax = Math.round(subtotal * 0.05);
    return {
      lines,
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
  }, [lines, drawerOpen, add, setQty, remove, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
