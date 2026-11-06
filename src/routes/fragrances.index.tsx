import { createFileRoute, Link } from "@tanstack/react-router";

import { useCart } from "@/context/CartContext";
import { getProducts, formatAED } from "@/lib/products";
import { useLanguage } from "@/context/LanguageContext";
import fondoExtra from "@/assets/fragrances-bg-lab.jpeg";
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
    <main className="relative isolate min-h-screen bg-background px-6 pb-24 pt-20 md:px-10 lg:px-20">
      {/* FULL-PAGE BACKDROP */}
      <FilmBackdrop src={fondoExtra} position="50% 50%" sharp fixed />

      {/* ---------------- HERO (misma arquitectura que la landing) ---------------- */}
      <section aria-labelledby="collection-title" className="max-w-[21rem] md:max-w-[32rem]">
        <p className="uppercase text-[0.95rem] leading-[1.7] text-primary-on-photo">
          {t.fragrances.label}
        </p>
        <Rule />
        <h1
          id="collection-title"
          className="font-display text-[2.25rem] leading-none text-primary-on-photo md:text-[3.75rem]"
        >
          {t.fragrances.titleStart}
          {t.fragrances.titleEm}
          {t.fragrances.titleEnd}
        </h1>
        <p className="mt-4 uppercase text-[0.95rem] leading-[1.9] text-primary-on-photo">
          <span className="block">{t.fragrances.sideLabel}</span>
          <span className="block">{t.fragrances.meta}</span>
        </p>
      </section>

      {/* ---------------- PROPÓSITO DE LA COLECCIÓN ---------------- */}
      <section
        aria-labelledby="collection-purpose-title"
        className="mt-6 max-w-[21rem] md:max-w-[32rem]"
      >
        <h2
          id="collection-purpose-title"
          className="font-display text-[1.9rem] font-semibold leading-[1.05] tracking-tight text-primary-on-photo md:text-[2.85rem]"
        >
          {t.fragrances.pullQuote}
        </h2>
        <div className="mt-5 space-y-5">
          {t.fragrances.body.map((paragraph) => (
            <p
              key={paragraph}
              className="text-[0.9rem] uppercase leading-[1.75] tracking-normal text-primary-on-photo md:text-[1.1rem]"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </section>

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
                <h2 className="founder-serif text-[1.5rem] leading-tight text-primary-on-photo">{p.name}</h2>
              </Link>
              <p className="mt-1.5 min-h-[32px] label-caps leading-snug text-primary-on-photo">
                {p.notes.join(" · ")}
              </p>
              <p className="mt-2.5 mb-3 founder-serif text-xl text-primary-on-photo">{formatAED(p.price)}</p>
              <button
                type="button"
                onClick={() => add(p)}
                className="mt-auto w-full rounded-full border border-primary/60 px-6 py-2 label-caps text-primary-on-photo transition-colors hover:bg-primary hover:text-primary-foreground"
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
