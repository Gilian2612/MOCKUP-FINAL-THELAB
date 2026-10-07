import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import fondoLanding from "@/assets/landing-bg.webp";
import { useLanguage } from "@/context/LanguageContext";
import { FilmBackdrop } from "@/components/FilmBackdrop";

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

/** The thin gold rule the design sets above and below the hero lines. */
function Rule() {
  return <div aria-hidden="true" className="my-6 h-px w-14 bg-primary/70" />;
}

function Home() {
  const { t } = useLanguage();

  return (
    <main className="relative min-h-screen">
      {/* La foto del founder es el fondo de toda la landing, tal cual el diseno. */}
      <FilmBackdrop src={fondoLanding} position="center 15%" />

      <div className="grid gap-16 px-6 pb-32 pt-28 md:grid-cols-2 md:gap-10 md:px-10 md:pt-32 lg:gap-20 lg:px-20">
        {/* ---------------- COLUMNA IZQUIERDA ---------------- */}
        <div className="min-w-0">
          {/* HERO */}
          <section aria-labelledby="hero-title">
            <p className="label-caps text-primary-on-photo">
              {t.home.heroEyebrow.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
            <Rule />
            <h1
              id="hero-title"
              className="font-display text-5xl leading-[0.9] text-cream md:text-6xl xl:text-8xl"
            >
              {t.home.heroTitle}
            </h1>
            <p className="label-caps mt-5 text-muted-on-photo">{t.home.heroFounded}</p>
            <Rule />
            <p className="font-display text-xl leading-snug text-cream md:text-2xl xl:text-3xl">
              {t.home.heroTagline.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
          </section>

          {/* THE FOUNDER */}
          <section id="founder" aria-labelledby="founder-heading" className="mt-28 lg:mt-44">
            <h2
              id="founder-heading"
              className="label-caps text-primary-on-photo"
            >
              {t.home.founderSection}
            </h2>
            <p className="mt-5 font-display text-4xl leading-none text-cream md:text-5xl xl:text-6xl">
              {t.home.founderName}
            </p>
            <p className="label-caps mt-4 text-muted-on-photo">
              {t.home.founderRole.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
            <Rule />
            <p className="max-w-xl font-display text-base leading-relaxed text-cream/90 md:text-lg">
              {t.home.founderBio}
            </p>
            <Rule />
            <Link
              to="/house"
              className="group inline-flex items-center gap-4 label-caps text-cream transition-colors hover:text-primary"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/50 transition-colors group-hover:border-primary group-hover:bg-primary/10">
                <ArrowRight className="h-4 w-4" />
              </span>
              {t.home.founderCta}
            </Link>
          </section>
        </div>

        {/* ---------------- COLUMNA DERECHA ---------------- */}
        <div className="mt-28 min-w-0 md:mt-0">
          {/* WHERE WE ARE */}
          <section id="where" aria-labelledby="where-heading">
            <h2 id="where-heading" className="label-caps text-primary-on-photo">
              {t.home.whereSection}
            </h2>
            <p className="label-caps mt-3 text-muted-on-photo">{t.home.whereSub}</p>
            <Rule />
            <p className="font-display text-xl leading-snug text-cream md:text-2xl xl:text-3xl">
              {t.home.wherePull}
            </p>
            <Rule />

            <h3 className="label-caps text-primary-on-photo">{t.home.retailersLabel}</h3>
            <ul className="mt-4 divide-y divide-border border-y border-border">
              {t.home.retailers.map((place) => (
                <li key={place} className="py-2.5 text-sm leading-relaxed text-cream">
                  {place}
                </li>
              ))}
            </ul>

            <h3 className="label-caps mt-8 text-primary-on-photo">{t.home.distributorsLabel}</h3>
            <ul className="mt-4 divide-y divide-border border-y border-border">
              {t.home.distributors.map((place) => (
                <li key={place} className="py-2.5 text-sm leading-relaxed text-cream">
                  {place}
                </li>
              ))}
            </ul>

            <Link
              to="/stockists"
              className="group mt-8 inline-flex items-center gap-4 label-caps text-cream transition-colors hover:text-primary"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/50 transition-colors group-hover:border-primary group-hover:bg-primary/10">
                <ArrowRight className="h-4 w-4" />
              </span>
              {t.home.distributorsCta}
            </Link>
          </section>
        </div>
      </div>
    </main>
  );
}
