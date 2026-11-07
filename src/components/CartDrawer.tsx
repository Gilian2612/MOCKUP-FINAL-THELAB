import { Link } from "@tanstack/react-router";

import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";
import { useLanguage } from "@/context/LanguageContext";

export default function CartDrawer() {
  const { format } = useCurrency();
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
          <p className="text-[0.95rem] uppercase leading-[1.7] text-primary-on-photo">
            {t.cart.title} ({lines.length})
          </p>
          <button
            type="button"
            onClick={() => setDrawerOpen(false)}
            className="-my-2.5 py-2.5 text-[0.95rem] uppercase text-primary-on-photo hover:text-primary tap-target"
          >
            {t.cart.close}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {lines.length === 0 ? (
            <p className="font-display text-[1.9rem] font-semibold uppercase leading-[1.05] tracking-tight text-primary-on-photo">{t.cart.empty}</p>
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
                    className="plate-media h-24 w-20 rounded-[14px] object-contain"
                  />
                  <div className="flex-1">
                    <p className="font-['La_Presse',Georgia,serif] text-[1.5rem] leading-tight text-primary-on-photo">{l.name}</p>
                    <p className="mt-1 font-display text-[0.95rem] font-bold text-primary-on-photo">{format(l.price)}</p>
                    <div className="mt-3 inline-flex items-center gap-4 rounded-full border border-border px-3 py-1">
                      <button
                        type="button"
                        aria-label={t.cart.decrease(l.name)}
                        onClick={() => setQty(l.slug, l.qty - 1)}
                        className="text-primary"
                      >
                        −
                      </button>
                      <span className="text-sm text-primary-on-photo">{l.qty}</span>
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
          <div className="space-y-2 text-[0.9rem] uppercase leading-[1.75]">
            <div className="flex justify-between text-primary-on-photo">
              <span>{t.cart.subtotal}</span>
              <span>{format(subtotal)}</span>
            </div>
            <div className="flex justify-between text-primary-on-photo">
              <span>{t.cart.shipping}</span>
              <span>{shipping ? format(shipping) : "—"}</span>
            </div>
            <div className="flex justify-between gap-4 pt-2 font-display text-[1.4rem] font-semibold leading-[1.05] tracking-tight text-primary-on-photo">
              <span>{t.cart.total}</span>
              <span>{format(total)}</span>
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
