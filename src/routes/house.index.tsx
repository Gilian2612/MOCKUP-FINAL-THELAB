import { createFileRoute } from "@tanstack/react-router";

import marioStrips from "@/assets/mario-strips.jpg";
import marioSmelling from "@/assets/mario-smelling.jpg";
import brandBases from "@/assets/brand-bases.jpg";
import brandTag from "@/assets/brand-tag.jpg";
import g1 from "@/assets/gallery-01.png";
import g2 from "@/assets/gallery-02.png";
import g3 from "@/assets/gallery-03.png";
import g4 from "@/assets/gallery-04.png";
import g5 from "@/assets/gallery-05.png";
import g6 from "@/assets/gallery-06.png";
import houseBg from "@/assets/house-bg.png";
import { useLanguage } from "@/context/LanguageContext";

const galleryImages = [g1, g2, g3, g4, g5, g6];

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
  const gallery = galleryImages.map((src, i) => ({
    src,
    alt: t.house.galleryAlts[i] ?? "",
  }));
  return (
    <main className="relative isolate min-h-screen bg-background">
      {/* FULL-PAGE BACKDROP */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <img
          src={houseBg}
          alt=""
          width={941}
          height={1672}
          className="absolute inset-0 h-full w-full scale-110 object-cover object-top blur-[8px] opacity-80 -translate-y-[180px]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/20 to-background/50" />
        <div className="absolute inset-0 bg-background/60" />
      </div>

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

      <section className="px-6 pb-28 lg:px-20">
        <p className="label-caps text-primary">{t.house.galleryLabel}</p>
        <h2 className="mt-6 font-display text-4xl text-cream sm:text-5xl">
          {t.house.galleryTitleStart}
          <em className="italic">{t.house.galleryTitleEm}</em>
        </h2>
        <div className="mt-12 columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6">
          {gallery.map((g, i) => (
            <figure key={g.src} className="clay break-inside-avoid overflow-hidden p-2">
              <img
                src={g.src}
                alt={g.alt}
                loading="lazy"
                width={1000}
                height={1000}
                className={`w-full rounded-[20px] object-cover grayscale transition-all duration-700 hover:grayscale-0 ${
                  i % 3 === 1 ? "h-[420px]" : "h-[300px]"
                }`}
              />
            </figure>
          ))}
        </div>
      </section>
    </main>
  );
}
