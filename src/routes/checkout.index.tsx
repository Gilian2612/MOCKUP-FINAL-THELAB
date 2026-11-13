import { createFileRoute, Link } from "@tanstack/react-router";
import PhotoSlot from "@/components/PhotoSlot";
import { useState } from "react";
import { toast } from "sonner";

import { useCart } from "@/context/CartContext";
import { useCurrency } from "@/context/CurrencyContext";
import { useLanguage } from "@/context/LanguageContext";

export const Route = createFileRoute("/checkout/")({
  head: () => ({
    meta: [
      { title: "Checkout — The Lab Perfumes" },
      {
        name: "description",
        content:
          "Complete your order of The Lab Perfumes. Shipping across the GCC, card and Tabby payment.",
      },
      { property: "og:title", content: "Checkout — The Lab Perfumes" },
      {
        property: "og:description",
        content: "Complete your order of The Lab Perfumes.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CheckoutPage,
});

const field =
  "mt-2 w-full rounded-[14px] bg-background px-4 py-3 text-sm text-primary-on-photo outline-none shadow-[inset_0_2px_6px_rgba(0,0,0,0.8)] placeholder:text-muted-foreground focus:ring-1 focus:ring-primary/50";

function CheckoutPage() {
  const { format } = useCurrency();
  const { lines, setQty, subtotal, shipping, tax, total, clear } = useCart();
  const [payment, setPayment] = useState<"card" | "tabby">("card");
  const { t } = useLanguage();
  const c = t.checkout;

  return (
    <main className="min-h-screen bg-background px-6 pb-28 pt-40 lg:px-20">
      <p className="text-[0.95rem] uppercase leading-[1.7] text-primary-on-photo">{c.label}</p>
      <h1 className="mt-6 font-display text-[1.9rem] font-semibold uppercase leading-[1.05] tracking-tight text-primary-on-photo md:text-[2.85rem]">
        {c.titleStart}
        <em className="not-italic text-primary-on-photo">{c.titleEm}</em>
      </h1>

      <div className="mt-14 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        {/* ORDER SUMMARY */}
        <section className="clay h-fit p-7">
          <h2 className="text-[0.95rem] uppercase leading-[1.7] text-primary-on-photo">{c.summary}</h2>

          {lines.length === 0 ? (
            <div className="mt-8">
              <p className="font-display text-[1.9rem] font-semibold uppercase leading-[1.05] tracking-tight text-primary-on-photo">{c.empty}</p>
              <Link
                to="/fragrances"
                className="mt-6 inline-block rounded-full border border-primary/60 px-8 py-3 label-caps text-primary-on-photo"
              >
                {c.browse}
              </Link>
            </div>
          ) : (
            <ul className="mt-8 space-y-6">
              {lines.map((l) => (
                <li key={l.key} className="flex gap-4">
                  <PhotoSlot
                    src={l.image}
                    alt={l.name}
                    loading="lazy"
                    width={90}
                    height={110}
                    className="plate-media h-24 w-20 rounded-[14px] object-contain"
                  />
                  <div className="flex-1">
                    <p className="font-['La_Presse',Georgia,serif] text-[1.5rem] leading-tight text-primary-on-photo">{l.name}</p>
                    <p className="label-caps text-muted-foreground">{l.size}</p>
                    <p className="mt-1 font-display text-[0.95rem] font-bold text-primary-on-photo">{format(l.price)}</p>
                    <div className="mt-3 inline-flex items-center rounded-full border border-primary/40">
                      <button
                        type="button"
                        aria-label={c.decrease(l.name)}
                        onClick={() => setQty(l.key, l.qty - 1)}
                        className="flex h-11 w-11 items-center justify-center rounded-full text-primary hover:bg-primary/10"
                      >
                        −
                      </button>
                      <span aria-live="polite" className="w-6 text-center text-sm tabular-nums text-primary-on-photo">{l.qty}</span>
                      <button
                        type="button"
                        aria-label={c.increase(l.name)}
                        onClick={() => setQty(l.key, l.qty + 1)}
                        disabled={l.qty >= 10}
                        className="flex h-11 w-11 items-center justify-center rounded-full text-primary hover:bg-primary/10 disabled:opacity-40"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <p className="font-display text-[0.95rem] font-bold text-primary-on-photo">{format(l.price * l.qty)}</p>
                </li>
              ))}
            </ul>
          )}

          <dl className="mt-8 space-y-3 border-t border-border pt-6 text-[0.9rem] uppercase leading-[1.75]">
            <div className="flex justify-between text-primary-on-photo">
              <dt>{c.subtotal}</dt>
              <dd>{format(subtotal)}</dd>
            </div>
            <div className="flex justify-between text-primary-on-photo">
              <dt>{c.shipping}</dt>
              <dd>{shipping ? format(shipping) : "—"}</dd>
            </div>
            <div className="flex justify-between text-primary-on-photo">
              <dt>{c.vat}</dt>
              <dd>{format(tax)}</dd>
            </div>
            <div className="flex justify-between border-t border-border gap-4 pt-4 font-display text-[1.4rem] font-semibold leading-[1.05] tracking-tight text-primary-on-photo">
              <dt>{c.total}</dt>
              <dd>{format(total)}</dd>
            </div>
          </dl>
        </section>

        {/* FORM — sin productos no hay nada que pagar */}
        <section className={lines.length === 0 ? "hidden" : "clay p-7 sm:p-10"}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (lines.length === 0) {
                toast.error(c.emptyError);
                return;
              }
              toast.success(c.placedTitle, { description: c.placedText });
              clear();
            }}
          >
            <h2 className="text-[0.95rem] uppercase leading-[1.7] text-primary-on-photo">{c.contact}</h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <label className="block text-[0.8rem] uppercase text-primary-on-photo">
                {c.fullName}
                <input required className={field} placeholder={c.fullNamePlaceholder} />
              </label>
              <label className="block text-[0.8rem] uppercase text-primary-on-photo">
                {c.email}
                <input required type="email" className={field} placeholder={c.emailPlaceholder} />
              </label>
            </div>

            <h2 className="mt-10 text-[0.95rem] uppercase leading-[1.7] text-primary-on-photo">{c.shippingSection}</h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <label className="block text-[0.8rem] uppercase text-primary-on-photo sm:col-span-2">
                {c.address}
                <input required className={field} placeholder={c.addressPlaceholder} />
              </label>
              <label className="block text-[0.8rem] uppercase text-primary-on-photo">
                {c.city}
                <input required className={field} placeholder={c.cityPlaceholder} />
              </label>
              <label className="block text-[0.8rem] uppercase text-primary-on-photo">
                {c.region}
                <input required className={field} placeholder={c.regionPlaceholder} />
              </label>
              <label className="block text-[0.8rem] uppercase text-primary-on-photo">
                {c.postalCode}
                <input className={field} placeholder={c.postalPlaceholder} />
              </label>
              <label className="block text-[0.8rem] uppercase text-primary-on-photo">
                {c.country}
                <input required className={field} placeholder={c.countryPlaceholder} />
              </label>
            </div>

            <h2 className="mt-10 text-[0.95rem] uppercase leading-[1.7] text-primary-on-photo">{c.payment}</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {(["card", "tabby"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setPayment(m)}
                  className={`rounded-[16px] border px-5 py-4 text-left label-caps transition-colors ${
                    payment === m
                      ? "border-primary text-primary-on-photo"
                      : "border-border text-primary-on-photo"
                  }`}
                >
                  {m === "card" ? c.card : c.tabby}
                </button>
              ))}
            </div>

            {payment === "card" ? (
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <label className="block text-[0.8rem] uppercase text-primary-on-photo sm:col-span-2">
                  {c.cardNumber}
                  <input required className={field} placeholder="4242 4242 4242 4242" />
                </label>
                <label className="block text-[0.8rem] uppercase text-primary-on-photo">
                  {c.expiry}
                  <input required className={field} placeholder={c.expiryPlaceholder} />
                </label>
                <label className="block text-[0.8rem] uppercase text-primary-on-photo">
                  {c.cvc}
                  <input required className={field} placeholder="123" />
                </label>
              </div>
            ) : (
              <p className="mt-5 text-[0.9rem] uppercase leading-[1.75] text-primary-on-photo">
                {c.tabbyTextStart}
                <span className="text-primary-on-photo">{format(Math.round(total / 4))}</span>
                {c.tabbyTextEnd}
              </p>
            )}

            <button
              type="submit"
              className="mt-10 w-full rounded-full bg-primary py-4 label-caps text-primary-foreground"
            >
              {c.pay(format(total))}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
