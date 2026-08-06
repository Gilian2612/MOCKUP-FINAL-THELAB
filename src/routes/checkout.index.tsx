import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { useCart } from "@/context/CartContext";
import { formatAED } from "@/lib/products";

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
  "mt-2 w-full rounded-[14px] bg-[#14100D] px-4 py-3 text-sm text-cream outline-none shadow-[inset_0_2px_6px_rgba(0,0,0,0.8)] placeholder:text-muted-foreground/60 focus:ring-1 focus:ring-primary/50";

function CheckoutPage() {
  const { lines, setQty, subtotal, shipping, tax, total, clear } = useCart();
  const [payment, setPayment] = useState<"card" | "tabby">("card");

  return (
    <main className="min-h-screen bg-background px-6 pb-28 pt-40 lg:px-20">
      <p className="label-caps text-primary">Checkout</p>
      <h1 className="mt-6 font-display text-5xl text-cream sm:text-6xl">
        Complete your <em className="italic text-primary">order</em>
      </h1>

      <div className="mt-14 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        {/* ORDER SUMMARY */}
        <section className="clay h-fit p-7">
          <h2 className="label-caps text-primary">Order summary</h2>

          {lines.length === 0 ? (
            <div className="mt-8">
              <p className="font-display text-2xl text-muted-foreground">
                Your bag is empty.
              </p>
              <Link
                to="/fragrances"
                className="mt-6 inline-block rounded-full border border-primary/60 px-8 py-3 label-caps text-primary"
              >
                Browse fragrances
              </Link>
            </div>
          ) : (
            <ul className="mt-8 space-y-6">
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
                    <p className="mt-1 text-xs text-muted-foreground">
                      {formatAED(l.price)}
                    </p>
                    <div className="mt-3 inline-flex items-center gap-5 rounded-full bg-[#14100D] px-4 py-1.5 shadow-[inset_0_2px_6px_rgba(0,0,0,0.8)]">
                      <button
                        type="button"
                        aria-label={`Decrease ${l.name}`}
                        onClick={() => setQty(l.slug, l.qty - 1)}
                        className="text-primary"
                      >
                        −
                      </button>
                      <span className="text-sm text-cream">{l.qty}</span>
                      <button
                        type="button"
                        aria-label={`Increase ${l.name}`}
                        onClick={() => setQty(l.slug, l.qty + 1)}
                        className="text-primary"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <p className="font-display text-lg text-cream">
                    {formatAED(l.price * l.qty)}
                  </p>
                </li>
              ))}
            </ul>
          )}

          <dl className="mt-8 space-y-3 border-t border-border pt-6 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <dt>Subtotal</dt>
              <dd>{formatAED(subtotal)}</dd>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <dt>Shipping</dt>
              <dd>{shipping ? formatAED(shipping) : "—"}</dd>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <dt>VAT (5%)</dt>
              <dd>{formatAED(tax)}</dd>
            </div>
            <div className="flex justify-between border-t border-border pt-4 font-display text-2xl text-cream">
              <dt>Total</dt>
              <dd>{formatAED(total)}</dd>
            </div>
          </dl>
        </section>

        {/* FORM */}
        <section className="clay p-7 sm:p-10">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (lines.length === 0) {
                toast.error("Your bag is empty");
                return;
              }
              toast.success("ORDER PLACED", {
                description: `Thank you — confirmation on its way.`,
              });
              clear();
            }}
          >
            <h2 className="label-caps text-primary">Contact</h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <label className="block text-xs text-muted-foreground">
                Full name
                <input required className={field} placeholder="Mario Galindo" />
              </label>
              <label className="block text-xs text-muted-foreground">
                Email
                <input
                  required
                  type="email"
                  className={field}
                  placeholder="you@example.com"
                />
              </label>
            </div>

            <h2 className="mt-10 label-caps text-primary">Shipping</h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <label className="block text-xs text-muted-foreground sm:col-span-2">
                Address
                <input required className={field} placeholder="Street address" />
              </label>
              <label className="block text-xs text-muted-foreground">
                City
                <input required className={field} placeholder="Dubai" />
              </label>
              <label className="block text-xs text-muted-foreground">
                Region / Emirate
                <input required className={field} placeholder="Dubai" />
              </label>
              <label className="block text-xs text-muted-foreground">
                Postal code
                <input className={field} placeholder="00000" />
              </label>
              <label className="block text-xs text-muted-foreground">
                Country
                <input required className={field} placeholder="United Arab Emirates" />
              </label>
            </div>

            <h2 className="mt-10 label-caps text-primary">Payment</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {(["card", "tabby"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setPayment(m)}
                  className={`rounded-[16px] border px-5 py-4 text-left label-caps transition-colors ${
                    payment === m
                      ? "border-primary text-primary"
                      : "border-border text-muted-foreground"
                  }`}
                >
                  {m === "card" ? "Card" : "Tabby — 4 payments"}
                </button>
              ))}
            </div>

            {payment === "card" ? (
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <label className="block text-xs text-muted-foreground sm:col-span-2">
                  Card number
                  <input required className={field} placeholder="4242 4242 4242 4242" />
                </label>
                <label className="block text-xs text-muted-foreground">
                  Expiry
                  <input required className={field} placeholder="MM / YY" />
                </label>
                <label className="block text-xs text-muted-foreground">
                  CVC
                  <input required className={field} placeholder="123" />
                </label>
              </div>
            ) : (
              <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
                Split into 4 interest-free payments of{" "}
                <span className="text-cream">{formatAED(Math.round(total / 4))}</span>.
                You will be redirected to Tabby to confirm.
              </p>
            )}

            <button
              type="submit"
              className="mt-10 w-full rounded-full bg-primary py-4 label-caps text-primary-foreground"
            >
              Pay AED {total.toLocaleString("en-US")} →
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
