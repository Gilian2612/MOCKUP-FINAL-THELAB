import { createFileRoute, Link } from "@tanstack/react-router";

import { useCart } from "@/context/CartContext";
import { getProducts, formatAED } from "@/lib/products";
import { useLanguage } from "@/context/LanguageContext";
import fragrancesBg from "@/assets/fragrances-bg.png";

export const Route = createFileRoute("/fragrances/")({
  head: () => ({
    meta: [
      { title: "Fragrances — The Lab Perfumes Collection" },
      {
        name: "description",
        content:
          "Eleven independent extraits and eaux de parfum from The Lab Perfumes, composed between Bogotá and Dubai. Prices in AED.",
      },
      { property: "og:title", content: "Fragrances — The Lab Perfumes" },
      {
        property: "og:description",
        content:
          "Eleven independent extraits and eaux de parfum composed between Bogotá and Dubai.",
      },
    ],
  }),
  component: FragrancesPage,
});

function FragrancesPage() {
  const { add } = useCart();
  const { lang, t } = useLanguage();
  const products = getProducts(lang);

  return (
    <main className="relative isolate min-h-screen bg-background px-6 pb-24 pt-40 lg:px-20">
      {/* FULL-PAGE BACKDROP */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <img
          src={fragrancesBg}
          alt=""
          width={941}
          height={1672}
          className="absolute inset-0 h-full w-full scale-110 object-cover object-[center_25%] blur-[8px] opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/10 to-background/50" />
        <div className="absolute inset-0 bg-background/60" />
      </div>

      <div className="mb-4 h-px w-14 bg-primary/40" />

      <p className="label-caps text-primary">{t.fragrances.label}</p>
      <h1 className="mt-6 max-w-3xl font-display text-5xl text-cream sm:text-7xl">
        {t.fragrances.titleStart}
        <span className="not-italic text-primary">{t.fragrances.titleEm}</span>
        {t.fragrances.titleEnd}
      </h1>
      <p className="mt-6 max-w-lg text-sm leading-relaxed text-muted-foreground">
        {t.fragrances.intro}
      </p>

      <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <article key={p.slug} className="clay group flex flex-col p-6">
            <Link
              to="/fragrances/$slug"
              params={{ slug: p.slug }}
              className="overflow-hidden rounded-[20px] bg-background/40"
            >
              <img
                src={p.image}
                alt={t.fragrances.bottleAlt(p.name)}
                loading="lazy"
                width={900}
                height={1100}
                className="h-80 w-full object-cover sepia-photo transition-transform duration-700 group-hover:scale-105"
              />
            </Link>
            <Link to="/fragrances/$slug" params={{ slug: p.slug }}>
              <h2 className="mt-6 font-display text-2xl text-primary">{p.name}</h2>
            </Link>
            <p className="mt-2 label-caps text-muted-foreground">{p.notes.join(" · ")}</p>
            <p className="mt-6 font-display text-xl text-cream">{formatAED(p.price)}</p>
            <button
              type="button"
              onClick={() => add(p)}
              className="mt-6 rounded-full border border-primary/60 py-3 label-caps text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              {t.fragrances.addToBag}
            </button>
          </article>
        ))}
      </div>
    </main>
  );
}
