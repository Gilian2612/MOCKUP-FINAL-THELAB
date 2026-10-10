import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { MapPin } from "lucide-react";

import { getStockistsByRegion, getPlottedStockists, getMapsUrl } from "@/lib/stockists";
import { useLanguage } from "@/context/LanguageContext";
import fondoStockists from "@/assets/landing-bg.webp";
import { FilmBackdrop } from "@/components/FilmBackdrop";

const StockistMapRotating = lazy(() => import("@/components/StockistMapRotating"));

export const Route = createFileRoute("/stockists/")({
  head: () => ({
    meta: [
      { title: "International Stockists — The Lab Perfumes" },
      {
        name: "description",
        content: "Find The Lab Perfumes across the UAE, Qatar, Spain and Chile.",
      },
      { property: "og:title", content: "International Stockists — The Lab Perfumes" },
      {
        property: "og:description",
        content: "Distributors and concept stores where to find The Lab Perfumes.",
      },
    ],
  }),
  component: StockistsPage,
});

function StockistsPage() {
  const { lang, t } = useLanguage();
  const stockistsByRegion = getStockistsByRegion(lang);
  const allStockistPoints = getPlottedStockists(lang).map((s) => ({
    center: s.coords,
    label: `${s.distributor} - ${s.city}`,
  }));
  return (
    <main className="relative isolate min-h-screen bg-background px-6 pb-28 pt-40 lg:px-20">
      {/* FULL-PAGE BACKDROP */}
      <FilmBackdrop src={fondoStockists} position="center 20%" />

      <div className="mb-4 h-3 w-3 border-l border-t border-primary/40" />

      <p className="label-caps text-primary-on-photo">{t.stockists.label}</p>
      <h1 className="mt-6 font-display text-5xl text-cream sm:text-7xl">
        {t.stockists.titleStart}
        <span className="not-italic text-primary-on-photo">{t.stockists.titleEm}</span>
        {t.stockists.titleEnd}
      </h1>
      <p className="label-caps mt-6 text-muted-on-photo">{t.stockists.sub}</p>

      <div className="mt-16 grid gap-16 lg:grid-cols-2">
        <div className="space-y-10">
          {stockistsByRegion.map(({ label, items }) => (
            <div key={label}>
              <p className="label-caps text-primary-on-photo">{label}</p>
              <ul className="mt-4 divide-y divide-border border-y border-border">
                {items.map((s) => (
                  <li
                    key={s.distributor}
                    className="flex items-baseline justify-between gap-6 py-5"
                  >
                    <div>
                      <p className="font-display text-2xl text-cream">{s.distributor}</p>
                      <p className="mt-1 max-w-sm text-xs leading-relaxed text-muted-on-photo">
                        {s.address}
                      </p>
                    </div>
                    <a
                      href={getMapsUrl(s)}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={t.stockists.openInMaps(s.distributor)}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-primary/40 text-primary-on-photo transition-colors hover:border-primary hover:bg-primary/10"
                    >
                      <MapPin className="h-4 w-4" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* El mapa del frasco (antes en la landing) reemplaza los tres
            rectangulos por region: una sola pieza, no cuatro mapas. */}
        <div className="flex justify-center">
            <Suspense fallback={<div className="aspect-[1145.4/1791.79] w-full max-w-[430px] rounded-[20px] bg-muted lg:aspect-auto lg:h-[720px]" />}>
            <StockistMapRotating
              points={allStockistPoints}
              ariaLabel={t.stockists.rotatingMapAria}
            />
          </Suspense>
        </div>
      </div>

      <footer className="mt-28 flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="label-caps text-cream/80">{t.stockists.origin}</p>
        <p className="label-caps text-primary-on-photo">{t.stockists.numeral}</p>
      </footer>
    </main>
  );
}
