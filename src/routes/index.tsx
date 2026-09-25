import { createFileRoute, Link } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useState } from "react";
import { ChevronDown, ChevronUp, MapPin } from "lucide-react";

import marioImg from "@/assets/mario-hero.jpg";
import brandImg from "@/assets/brand-detail.jpg";
import mario1 from "@/assets/mario1.svg";
import { getStockists } from "@/lib/stockists";
import { useLanguage } from "@/context/LanguageContext";
import { FilmBackdrop } from "@/components/FilmBackdrop";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const STOCKIST_COUNT = getStockists("es").length;

const StockistMapRotating = lazy(() => import("@/components/StockistMapRotating"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Lab Perfumes — Not a Niche House from Colombia" },
      {
        name: "description",
        content:
          "Independent perfumery crafted between Colombia and Dubai. Discover the collection, the founder Mario Galindo, and our stockists.",
      },
      {
        property: "og:title",
        content: "The Lab Perfumes — Not a Niche House from Colombia",
      },
      {
        property: "og:description",
        content:
          "Independent perfumery crafted between Colombia and Dubai. Discover the collection.",
      },
    ],
  }),
  component: Home,
});

// Stockists data (real distributors) is imported from @/lib/stockists

function Home() {
  const { lang, t } = useLanguage();
  const stockists = getStockists(lang);
  const allStockistPoints = stockists.map((s) => ({
    center: s.coords,
    label: `${s.distributor} — ${s.city}`,
  }));
  const [active, setActive] = useState(0);
  const [showComingSoon, setShowComingSoon] = useState(false);

  useEffect(() => {
    setShowComingSoon(true);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      setActive((prev) => (prev + 1) % STOCKIST_COUNT);
    }, 8000);
    return () => clearTimeout(t);
  }, [active]);

  const goToPrevStockist = () => setActive((prev) => (prev - 1 + STOCKIST_COUNT) % STOCKIST_COUNT);
  const goToNextStockist = () => setActive((prev) => (prev + 1) % STOCKIST_COUNT);

  return (
    <main className="relative min-h-screen">
      <Dialog open={showComingSoon} onOpenChange={setShowComingSoon}>
        <DialogContent className="border-border bg-background text-center sm:text-center">
          <DialogHeader className="items-center text-center sm:items-center sm:text-center">
            <p className="label-caps text-primary">{t.home.comingSoon}</p>
            <DialogTitle className="mt-2 font-display text-2xl text-cream">
              {t.home.underConstruction}
            </DialogTitle>
            <DialogDescription className="mt-2">{t.home.underConstructionText}</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* FULL-PAGE BACKDROP — landing background */}
      <FilmBackdrop src={mario1} position="object-[center_15%]" />

      {/* FOUNDER */}
      <section id="founder" className="grid items-center gap-12 px-6 py-24 lg:grid-cols-2 lg:px-20">
        <div className="flex flex-col justify-center">
          <div className="mb-4 h-2 w-2 rotate-45 bg-primary/60" />
          <p className="label-caps text-primary">{t.home.founderLabel}</p>
          <h2 className="mt-6 font-display text-4xl text-cream sm:text-6xl">
            {t.home.founderName}
          </h2>
          <p className="mt-3 font-display text-2xl italic text-muted-foreground">
            {t.home.founderTitle}
          </p>
          <ol className="mt-12 space-y-8 border-t border-border pt-10">
            {t.home.founderPoints.map((point, i) => (
              <li key={point} className="flex gap-6">
                <span className="label-caps pt-1 text-primary">0{i + 1} —</span>
                <span className="max-w-sm font-display text-2xl leading-snug text-cream">
                  {point}
                </span>
              </li>
            ))}
          </ol>
        </div>
        <div className="clay overflow-hidden p-2">
          <img
            src={marioImg}
            alt={t.home.founderAlt}
            loading="lazy"
            width={912}
            height={1200}
            className="h-[520px] w-full rounded-[22px] object-cover sepia-photo"
          />
        </div>
      </section>

      {/* BRAND SYSTEM */}
      <section id="house" className="grid items-center gap-12 px-6 py-24 lg:grid-cols-2 lg:px-20">
        <div>
          <p className="label-caps text-primary">{t.home.houseLabel}</p>
          <ol className="mt-10 divide-y divide-border border-y border-border">
            {t.home.housePoints.map((point, i) => (
              <li key={point} className="flex items-baseline gap-6 py-7">
                <span className="label-caps text-primary">0{i + 1} —</span>
                <span className="font-display text-3xl text-cream">{point}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="clay overflow-hidden p-2">
          <img
            src={brandImg}
            alt={t.home.brandAlt}
            loading="lazy"
            width={912}
            height={1200}
            className="h-[520px] w-full rounded-[22px] object-cover sepia-photo"
          />
        </div>
      </section>

      {/* STOCKISTS */}
      <section id="stockists" className="grid gap-14 px-6 py-24 lg:grid-cols-2 lg:px-20">
        <div>
          <p className="label-caps text-primary">{t.home.stockistsLabel}</p>
          <h2 className="mt-6 font-display text-4xl text-cream sm:text-5xl">
            {t.home.stockistsTitleStart}
            <em className="italic">{t.home.stockistsTitleEm}</em>
          </h2>
          <div className="mt-12">
            {(() => {
              const s = stockists[active]!;
              const n = String(active + 1).padStart(2, "0");
              const total = String(stockists.length).padStart(2, "0");
              return (
                <div key={s.distributor} className="clay flex gap-4 p-6">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <p className="label-caps text-primary/80">
                          {s.flag} {s.country}
                        </p>
                        <a
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                            `${s.distributor}, ${s.address}`,
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={t.home.openInMaps(s.distributor)}
                          className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-primary/40 text-primary transition-colors hover:border-primary hover:bg-primary/10"
                        >
                          <MapPin className="h-3 w-3" />
                        </a>
                      </div>
                      <p className="label-caps text-muted-foreground">
                        {n} / {total}
                      </p>
                    </div>
                    <p className="mt-5 font-display text-3xl text-cream">{s.distributor}</p>
                    <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
                      {s.address}
                    </p>
                  </div>

                  <div className="flex flex-col items-center justify-center gap-2 border-l border-border pl-4">
                    <button
                      type="button"
                      onClick={goToPrevStockist}
                      aria-label={t.home.prevStockist}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/40 text-primary transition-colors hover:border-primary hover:bg-primary/10"
                    >
                      <ChevronUp className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={goToNextStockist}
                      aria-label={t.home.nextStockist}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/40 text-primary transition-colors hover:border-primary hover:bg-primary/10"
                    >
                      <ChevronDown className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>

        <Suspense fallback={<div className="h-[440px] w-full rounded-[20px] bg-muted" />}>
          <StockistMapRotating
            points={allStockistPoints}
            active={active}
            ariaLabel={t.stockists.rotatingMapAria}
          />
        </Suspense>
      </section>
    </main>
  );
}
