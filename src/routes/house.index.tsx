import { createFileRoute } from "@tanstack/react-router";

import marioStrips from "@/assets/mario-strips.jpg";
import marioSmelling from "@/assets/mario-smelling.jpg";
import brandBases from "@/assets/brand-bases.jpg";
import brandTag from "@/assets/brand-tag.jpg";
import houseBg from "@/assets/house-bg.png";
import { useLanguage } from "@/context/LanguageContext";
import { FilmBackdrop } from "@/components/FilmBackdrop";

export const Route = createFileRoute("/house/")({
  head: () => ({
    meta: [
      { title: "The House — The Lab Perfumes, Bogotá & Dubai" },
      {
        name: "description",
        content:
          "Inside The Lab Perfumes: founder Mario Galindo, the atelier method, and the materials behind an independent Colombian-Emirati perfume house.",
      },
      { property: "og:title", content: "The House — The Lab Perfumes" },
      {
        property: "og:description",
        content: "Founder Mario Galindo, the atelier method, and the materials behind the house.",
      },
    ],
  }),
  component: HousePage,
});

function HousePage() {
  const { t } = useLanguage();
  return (
    <main className="relative isolate min-h-screen bg-background">
      {/* FULL-PAGE BACKDROP */}
      <FilmBackdrop
        src={houseBg}
        width={941}
        height={1672}
        position="object-top"
        scale="scale-110"
        translate="-translate-y-[180px]"
      />

      <section className="relative flex min-h-[80vh] items-end overflow-hidden">
        <div className="copper-beam left-1/4" />
        <div className="relative w-full px-6 pb-20 lg:px-20">
          <p className="label-caps text-primary">{t.house.label}</p>
          <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[0.95] text-cream sm:text-7xl">
            {t.house.heroStart}
            <span className="not-italic text-primary">{t.house.heroEm}</span>
            {t.house.heroEnd}
          </h1>
        </div>
      </section>

      <section className="grid items-center gap-12 px-6 py-24 lg:grid-cols-2 lg:px-20">
        <div>
          <p className="label-caps text-primary">{t.house.founderLabel}</p>
          <h2 className="mt-6 font-display text-4xl text-cream sm:text-5xl">
            {t.house.founderName}
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">{t.house.founderP1}</p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{t.house.founderP2}</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <img
            src={marioStrips}
            alt={t.house.marioStripsAlt}
            loading="lazy"
            width={1000}
            height={1000}
            className="clay h-72 w-full object-cover p-1 sepia-photo"
          />
          <img
            src={marioSmelling}
            alt={t.house.marioSmellingAlt}
            loading="lazy"
            width={1000}
            height={1000}
            className="clay mt-10 h-72 w-full object-cover p-1 sepia-photo"
          />
        </div>
      </section>

      <section className="grid items-center gap-12 px-6 py-24 lg:grid-cols-2 lg:px-20">
        <div className="order-2 grid grid-cols-2 gap-4 lg:order-1">
          <img
            src={brandBases}
            alt={t.house.basesAlt}
            loading="lazy"
            width={1000}
            height={1000}
            className="clay h-72 w-full object-cover p-1 sepia-photo"
          />
          <img
            src={brandTag}
            alt={t.house.tagAlt}
            loading="lazy"
            width={1000}
            height={1000}
            className="clay mt-10 h-72 w-full object-cover p-1 sepia-photo"
          />
        </div>
        <div className="order-1 lg:order-2">
          <p className="label-caps text-primary">{t.house.methodLabel}</p>
          <h2 className="mt-6 font-display text-4xl text-cream sm:text-5xl">
            {t.house.methodTitleStart}
            <em className="italic">{t.house.methodTitleEm}</em>
          </h2>
          <ol className="mt-10 divide-y divide-border border-y border-border">
            {t.house.methodPoints.map((point, i) => (
              <li key={point} className="flex items-baseline gap-6 py-6">
                <span className="label-caps text-primary">0{i + 1} —</span>
                <span className="font-display text-2xl text-cream">{point}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </main>
  );
}
