import { createFileRoute } from "@tanstack/react-router";

import houseBg from "@/assets/house-bg.webp";
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
      <FilmBackdrop src={houseBg} position="top" scale={1.1} translateY={-180} />

      <section className="relative flex min-h-[80vh] items-end overflow-hidden">
        <div className="copper-beam left-1/4" />
        <div className="relative w-full px-6 pb-20 lg:px-20">
          <p className="label-caps text-primary-on-photo">{t.house.label}</p>
          <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[0.95] text-cream sm:text-7xl">
            {t.house.heroStart}
            <span className="not-italic text-primary-on-photo">{t.house.heroEm}</span>
            {t.house.heroEnd}
          </h1>
          <p className="label-caps mt-6 text-muted-on-photo">
            {t.house.heroSub.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
        </div>
      </section>

      <section className="relative px-6 py-24 lg:px-20">
        {/* Reading surface. The page runs on one photograph for its whole
            length, and the copy sits low where that plate is darkest. In day
            mode the `-on-photo` tokens assume a light surface, so without this
            local veil the gold labels fall onto Mario's face and disappear.
            It is a veil, not a card: no border, no radius, no shadow. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-[1]"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, color-mix(in srgb, var(--background) 72%, transparent) 20%, color-mix(in srgb, var(--background) 88%, transparent) 52%, var(--background) 100%)",
          }}
        />
        <p className="max-w-3xl font-display text-xl leading-relaxed text-cream/90 md:text-2xl">
          {t.house.lead}
        </p>

        {/* NUESTRA FILOSOFIA | NUESTROS PRINCIPIOS
            The two text columns stand side by side the way the design sets them,
            split by a single hairline. No plates, no cards: the atelier
            photograph behind is the only image this section needs. */}
        <div className="mt-20 grid gap-14 lg:grid-cols-2 lg:gap-0">
          <div className="lg:flex lg:flex-col lg:pr-14">
            <p className="label-caps text-primary-on-photo">{t.house.philosophyLabel}</p>
            <div className="mt-8 flex-1 space-y-6 max-w-xl">
              {t.house.philosophy.map((paragraph) => (
                <p key={paragraph} className="text-sm leading-relaxed text-muted-on-photo">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="border-t border-border pt-14 lg:border-l lg:border-t-0 lg:pl-14 lg:pt-0">
            <p className="label-caps text-primary-on-photo">{t.house.principlesLabel}</p>
            <ol className="mt-8 divide-y divide-border border-y border-border">
              {t.house.principles.map((principle, i) => (
                <li key={principle.title} className="py-6">
                  <p className="label-caps text-primary-on-photo">0{i + 1} —</p>
                  <p className="mt-3 font-display text-2xl text-cream">{principle.title}</p>
                  <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-on-photo">
                    {principle.text}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </main>
  );
}
