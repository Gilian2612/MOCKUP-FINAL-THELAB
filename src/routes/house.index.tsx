import { createFileRoute } from "@tanstack/react-router";

import marioHero from "@/assets/mario-hero.jpg";
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

const gallery = [
  { src: g1, alt: "Perfumer's glassware in the atelier" },
  { src: g2, alt: "Pouring perfume oil into a flask" },
  { src: g3, alt: "Desert dunes outside Dubai at dusk" },
  { src: g4, alt: "Colombian coffee and tropical botanicals" },
  { src: g5, alt: "The Lab boutique interior" },
  { src: g6, alt: "Perfume mist caught in a light beam" },
];

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
        content:
          "Founder Mario Galindo, the atelier method, and the materials behind the house.",
      },
    ],
  }),
  component: HousePage,
});

function HousePage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="relative flex min-h-[80vh] items-end overflow-hidden">
        <img
          src={marioHero}
          alt="Mario Galindo in the atelier"
          width={1200}
          height={1400}
          className="absolute inset-0 h-full w-full object-cover sepia-photo"
        />
        <div className="absolute inset-0 bg-background/60" />
        <div className="copper-beam left-1/4" />
        <div className="relative w-full px-6 pb-20 lg:px-20">
          <p className="label-caps text-primary">The House</p>
          <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[0.95] text-cream sm:text-7xl">
            A house built <em className="italic text-primary">between</em> two
            deserts and a mountain range
          </h1>
        </div>
      </section>

      <section className="grid items-center gap-12 px-6 py-24 lg:grid-cols-2 lg:px-20">
        <div>
          <p className="label-caps text-primary">The Founder</p>
          <h2 className="mt-6 font-display text-4xl text-cream sm:text-5xl">
            Mario Galindo
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
            Mario began blending in a Bogotá apartment with a hotplate, a scale
            and forty raw materials. Ten years later the same obsession runs a
            house that ships from Dubai to Tokyo — still small batch, still
            signed by hand.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            His rule has not changed: no brief, no focus group, no compromise on
            the material. If a note is expensive, it stays. If a composition is
            polite, it is thrown out.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <img
            src={marioStrips}
            alt="Mario Galindo holding blotter strips"
            loading="lazy"
            width={1000}
            height={1000}
            className="clay h-72 w-full object-cover p-1 sepia-photo"
          />
          <img
            src={marioSmelling}
            alt="Mario Galindo evaluating a blotter"
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
            alt="Shelf of perfume bases in amber bottles"
            loading="lazy"
            width={1000}
            height={1000}
            className="clay h-72 w-full object-cover p-1 sepia-photo"
          />
          <img
            src={brandTag}
            alt="Gold-foiled hang tag on a perfume bottle"
            loading="lazy"
            width={1000}
            height={1000}
            className="clay mt-10 h-72 w-full object-cover p-1 sepia-photo"
          />
        </div>
        <div className="order-1 lg:order-2">
          <p className="label-caps text-primary">The Method</p>
          <h2 className="mt-6 font-display text-4xl text-cream sm:text-5xl">
            Bases before <em className="italic">bottles</em>
          </h2>
          <ol className="mt-10 divide-y divide-border border-y border-border">
            {[
              "Materials sourced direct — Cambodian oud, Colombian cacao",
              "Bases macerated a minimum of eight weeks",
              "Every flacon numbered, tagged and signed",
            ].map((t, i) => (
              <li key={t} className="flex items-baseline gap-6 py-6">
                <span className="label-caps text-primary">0{i + 1} —</span>
                <span className="font-display text-2xl text-cream">{t}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-6 pb-28 lg:px-20">
        <p className="label-caps text-primary">Gallery</p>
        <h2 className="mt-6 font-display text-4xl text-cream sm:text-5xl">
          From the <em className="italic">atelier</em>
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
