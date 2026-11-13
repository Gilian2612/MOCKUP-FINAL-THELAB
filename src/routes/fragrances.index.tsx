import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import PhotoSlot from "@/components/PhotoSlot";

import { useCart } from "@/context/CartContext";
import { getProducts } from "@/lib/products";
import { useCurrency } from "@/context/CurrencyContext";
import { useLanguage } from "@/context/LanguageContext";
import fondoExtra from "@/assets/fragrances-bg-loto-lab.jpeg";
import { FilmBackdrop } from "@/components/FilmBackdrop";

export const Route = createFileRoute("/fragrances/")({
  head: () => ({
    meta: [
      { title: "Fragrances — The Lab Perfumes Collection" },
      {
        name: "description",
        content:
          "Eleven independent extraits and eaux de parfum from The Lab Perfumes, composed between Bogotá and Dubai.",
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
  const { currency, format } = useCurrency();
  const { lang, t } = useLanguage();
  const products = getProducts(lang);
  const [expanded, setExpanded] = useState(false);

  return (
    <main className="relative isolate min-h-screen bg-background px-6 pb-24 pt-20 md:px-10 lg:px-20">
      {/* FULL-PAGE BACKDROP */}
      <FilmBackdrop src={fondoExtra} position="50% 50%" sharp fixed />

      {/* ---------------- HERO (misma arquitectura que la landing) ---------------- */}
      <section aria-labelledby="collection-title">
        <p className="uppercase text-[0.95rem] leading-[1.7] text-primary-on-photo">
          {t.fragrances.label}
        </p>
        <Rule />
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:justify-between sm:gap-6 md:gap-10">
          <h1
            id="collection-title"
            className="font-display text-[2.25rem] sm:whitespace-nowrap font-semibold leading-none tracking-tight text-primary-on-photo md:text-[3.75rem]"
          >
            {t.fragrances.titleStart}
            {t.fragrances.titleEm}
            {t.fragrances.titleEnd}
          </h1>
          <div className="shrink-0 sm:-translate-x-5 lg:-translate-x-6">
            <p className="whitespace-nowrap sm:-mr-[0.25em] sm:text-right text-[0.6rem] uppercase leading-[1.7] tracking-[0.25em] text-primary-on-photo md:text-[0.8rem]">
              {t.fragrances.sideLabelLines.map((line) => (
                <span key={line} className={line === "MARIO GALINDO" ? "block font-bold" : "block"}>
                  {line}
                </span>
              ))}
            </p>
            <div aria-hidden="true" className="mt-2 h-px w-10 bg-primary/70 sm:ml-auto" />
          </div>
        </div>
        <p className="mt-4 uppercase text-[0.95rem] leading-[1.9] text-primary-on-photo">
          {t.fragrances.meta}
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
          {t.fragrances.body.map((paragraph, i) => (
            <p
              key={paragraph}
              className={`text-[0.9rem] uppercase leading-[1.75] tracking-normal text-primary-on-photo md:block md:text-[1.1rem] ${
                i > 0 && !expanded ? "hidden" : ""
              }`}
            >
              {paragraph}
            </p>
          ))}
        </div>
        {t.fragrances.body.length > 1 && (
          <button
            type="button"
            aria-expanded={expanded}
            onClick={() => setExpanded((v) => !v)}
            className="mt-4 min-h-11 label-caps text-primary-on-photo underline underline-offset-4 decoration-[#b84a1e] md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b84a1e]"
          >
            {expanded ? t.fragrances.readLess : t.fragrances.readMore}
          </button>
        )}
      </section>

      <div className="mt-8 grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {products.map((p) => (
          <article key={p.slug} className="collection-card group flex h-auto flex-col rounded-[24px] p-2">
            <div className="relative aspect-[4/5] w-full overflow-visible">
              <Link
                to="/fragrances/$slug"
                params={{ slug: p.slug }}
                className="absolute inset-0 flex items-center justify-center overflow-visible"
              >
                <PhotoSlot
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
            <div className="mt-2 flex flex-1 flex-col items-center text-center">
              <Link to="/fragrances/$slug" params={{ slug: p.slug }} className="w-full">
                <h2 className="text-center font-['La_Presse',Georgia,serif] text-[1.15rem] sm:text-[1.5rem] leading-tight text-primary-on-photo">{p.name}</h2>
              </Link>
              <p className="mt-1.5 min-h-[32px] w-full label-caps leading-snug text-primary-on-photo">
                {p.notes.join(" · ")}
              </p>
              <p className="mt-2.5 mb-3 whitespace-nowrap font-display text-base font-bold sm:text-xl text-primary-on-photo">{format(p.prices[currency])}</p>
              <button
                type="button"
                onClick={() => add(p)}
                className="mt-auto w-full rounded-full border border-primary/60 px-2 py-2.5 sm:px-6 label-caps max-sm:tracking-[0.12em] text-primary-on-photo transition-colors hover:bg-primary hover:text-primary-foreground"
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
