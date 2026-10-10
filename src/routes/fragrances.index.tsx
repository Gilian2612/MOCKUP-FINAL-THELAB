import { createFileRoute, Link } from "@tanstack/react-router";

import { useCart } from "@/context/CartContext";
import { getProducts, formatAED } from "@/lib/products";
import { useLanguage } from "@/context/LanguageContext";
import fondoExtra from "@/assets/fragrances-bg.webp";
import { FilmBackdrop } from "@/components/FilmBackdrop";

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

/** The thin gold rule the design sets between the collection's title block. */
function Rule() {
  return <div aria-hidden="true" className="my-6 h-px w-14 bg-primary/70" />;
}

function FragrancesPage() {
  const { add } = useCart();
  const { lang, t } = useLanguage();
  const products = getProducts(lang);

  return (
    <main className="relative isolate min-h-screen bg-background px-6 pb-24 pt-40 lg:px-20">
      {/* FULL-PAGE BACKDROP */}
      <FilmBackdrop src={fondoExtra} position="70% 40%" />

      <div className="mb-4 h-px w-14 bg-primary/40" />

      <p className="label-caps text-primary-on-photo">{t.fragrances.label}</p>
      <h1 className="mt-6 max-w-3xl font-display text-5xl text-cream sm:text-7xl">
        {t.fragrances.titleStart}
        <span className="not-italic text-primary-on-photo">{t.fragrances.titleEm}</span>
        {t.fragrances.titleEnd}
      </h1>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-baseline sm:gap-8">
        <p className="label-caps text-muted-on-photo">{t.fragrances.sideLabel}</p>
        <p aria-hidden="true" className="label-caps hidden text-primary/60 sm:block">
          /
        </p>
        <p className="label-caps text-muted-on-photo">{t.fragrances.meta}</p>
      </div>
      <Rule />

      <p className="font-display text-2xl leading-snug text-cream sm:text-3xl">
        {t.fragrances.pullQuote}
      </p>
      <Rule />

      <div className="max-w-2xl space-y-5">
        {t.fragrances.body.map((paragraph) => (
          <p key={paragraph} className="text-sm leading-relaxed text-muted-on-photo">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <article key={p.slug} className="glass-surface group flex flex-col rounded-[26px] p-6">
            <Link
              to="/fragrances/$slug"
              params={{ slug: p.slug }}
              className="plate-media overflow-hidden rounded-[20px]"
            >
              <img
                src={p.image}
                alt={t.fragrances.bottleAlt(p.name)}
                loading="lazy"
                width={900}
                height={1100}
                className="h-80 w-full object-contain transition-transform duration-700 group-hover:scale-105"
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
