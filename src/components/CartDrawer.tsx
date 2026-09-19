import { Link } from "@tanstack/react-router";

import { useCart } from "@/context/CartContext";
import { formatAED } from "@/lib/products";
import { useLanguage } from "@/context/LanguageContext";

export default function CartDrawer() {
  const { lines, drawerOpen, setDrawerOpen, setQty, subtotal, shipping, total } = useCart();
  const { t } = useLanguage();

  return (
    <>
      <div
        onClick={() => setDrawerOpen(false)}
        className={`fixed inset-0 z-[60] bg-background/70 backdrop-blur-sm transition-opacity duration-300 ${
          drawerOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        aria-label={t.cart.aria}
        className={`fixed right-0 top-0 z-[61] flex h-full w-full max-w-[420px] flex-col bg-surface shadow-[0_0_80px_rgba(0,0,0,0.9)] transition-transform duration-500 ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <p className="label-caps text-primary">
            {t.cart.title} ({lines.length})
          </p>
          <button
            type="button"
            onClick={() => setDrawerOpen(false)}
            className="label-caps text-muted-foreground hover:text-primary"
          >
            {t.cart.close}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {lines.length === 0 ? (
            <p className="font-display text-2xl text-muted-foreground">{t.cart.empty}</p>
          ) : (
            <ul className="space-y-6">
              {lines.map((l) => (
                <li key={l.slug} className="flex gap-4">
                  <img
                    src={l.image}
                    alt={l.name}
                    loading="lazy"
                    width={90}
                    height={110}
                    className="h-24 w-20 rounded-[14px] object-cover sepia-photo"
                  />
                  <div className="flex-1">
                    <p className="font-display text-xl text-primary">{l.name}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{formatAED(l.price)}</p>
                    <div className="mt-3 inline-flex items-center gap-4 rounded-full border border-border px-3 py-1">
                      <button
                        type="button"
                        aria-label={t.cart.decrease(l.name)}
                        onClick={() => setQty(l.slug, l.qty - 1)}
                        className="text-primary"
                      >
                        −
                      </button>
                      <span className="text-sm text-cream">{l.qty}</span>
                      <button
                        type="button"
                        aria-label={t.cart.increase(l.name)}
                        onClick={() => setQty(l.slug, l.qty + 1)}
                        className="text-primary"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border-t border-border px-6 py-6">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>{t.cart.subtotal}</span>
              <span>{formatAED(subtotal)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>{t.cart.shipping}</span>
              <span>{shipping ? formatAED(shipping) : "—"}</span>
            </div>
            <div className="flex justify-between pt-2 font-display text-2xl text-cream">
              <span>{t.cart.total}</span>
              <span>{formatAED(total)}</span>
            </div>
          </div>
          <Link
            to="/checkout"
            onClick={() => setDrawerOpen(false)}
            className="mt-6 block rounded-full bg-primary py-4 text-center label-caps text-primary-foreground"
          >
            {t.cart.checkout}
          </Link>
        </div>
      </aside>
    </>
  );
}
