import { createFileRoute, Link } from "@tanstack/react-router";

import { useCart } from "@/context/CartContext";
import { getProducts, formatAED } from "@/lib/products";
import { useLanguage } from "@/context/LanguageContext";
import fondoExtra from "@/assets/fragrances-bg-new.png";
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
      <FilmBackdrop src={fondoExtra} position="50% 50%" sharp fixed />

      <div className="mb-4 h-px w-14 bg-primary/40" />

      <p className="label-caps text-primary-on-photo">{t.fragrances.label}</p>
      <h1 className="mt-6 max-w-3xl font-display text-5xl text-cream sm:text-7xl">
        {t.fragrances.titleStart}
        <span className="not-italic text-primary-on-photo">{t.fragrances.titleEm}</span>
        {t.fragrances.titleEnd}
      </h1>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-baseline sm:gap-8">
        <p className="label-caps text-xl text-primary-on-photo">{t.fragrances.sideLabel}</p>
        <p aria-hidden="true" className="label-caps hidden text-primary/60 sm:block">
          /
        </p>
        <p className="label-caps text-xl text-primary-on-photo">{t.fragrances.meta}</p>
      </div>
      <Rule />

      <p className="font-display text-3xl leading-snug text-cream sm:text-4xl tracking-[0.35em]">
        {t.fragrances.pullQuote}
      </p>
      <Rule />

      <div className="w-3/5 space-y-5">
        {t.fragrances.body.map((paragraph) => (
          <p key={paragraph} className="text-base leading-relaxed text-primary-on-photo">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {products.map((p) => (
          <article key={p.slug} className="collection-card group flex h-auto flex-col rounded-[24px] p-2">
            <div className="relative aspect-[4/5] w-full overflow-visible">
              <Link
                to="/fragrances/$slug"
                params={{ slug: p.slug }}
                className="absolute inset-0 flex items-center justify-center overflow-visible"
              >
                <img
                  src={p.image}
                  alt={t.fragrances.bottleAlt(p.name)}
                  loading="lazy"
                  width={900}
                  height={1100}
                  style={{ aspectRatio: "1080 / 1124" }}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </Link>
            </div>
            <div className="mt-2 flex flex-1 flex-col items-start text-left">
              <Link to="/fragrances/$slug" params={{ slug: p.slug }}>
                <h2 className="founder-serif text-[1.5rem] leading-tight text-cream">{p.name}</h2>
              </Link>
              <p className="mt-1.5 min-h-[32px] label-caps leading-snug text-cream/80">
                {p.notes.join(" · ")}
              </p>
              <p className="mt-2.5 mb-3 founder-serif text-xl text-cream">{formatAED(p.price)}</p>
              <button
                type="button"
                onClick={() => add(p)}
                className="mt-auto w-full rounded-full border border-primary/60 px-6 py-2 label-caps text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                {t.fragrances.addToBag}
              </button>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
