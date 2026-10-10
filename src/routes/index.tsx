import { createFileRoute } from "@tanstack/react-router";

import fondoLanding from "@/assets/landing-bottle.webp";
import labLogo from "@/assets/the-lab-logo.svg";
import labLogoHorizontal from "@/assets/the-lab-logo-horizontal.svg";
import { useLanguage } from "@/context/LanguageContext";
import { FilmBackdrop } from "@/components/FilmBackdrop";

const INSTAGRAM_URL = "https://www.instagram.com/thelabperfumes/";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Lab Perfumes — Perfumes de autor hechos en Colombia" },
      {
        name: "description",
        content:
          "Una casa de perfumería de autor desde 2011. Representar a Colombia ante el mundo.",
      },
      {
        property: "og:title",
        content: "The Lab Perfumes — Perfumes de autor hechos en Colombia",
      },
      {
        property: "og:description",
        content:
          "Una casa de perfumería de autor desde 2011. Descubrí la colección.",
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
    <main className="relative flex min-h-screen flex-col">
      {/* Boticario ámbar: encuadre sobre la botella (derecha) para que mande ella. */}
      <FilmBackdrop src={fondoLanding} position="75% center" sharp />

      <div className="flex flex-1 flex-col px-6 pb-10 pt-28 md:px-10 md:pt-32 lg:px-20">
        {/* ---------------- HERO ---------------- */}
        <section aria-labelledby="hero-title">
          <p className="label-caps text-primary-on-photo">
            {t.home.heroEyebrow.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
          <Rule />
            <h1 id="hero-title">
              <img
                src={labLogoHorizontal}
                alt="The Lab Perfumes"
                className="h-10 w-auto object-contain brightness-0 invert md:h-12"
              />
            </h1>
          <p className="label-caps mt-5 text-muted-on-photo">{t.home.heroFounded}</p>
        </section>

        {/* ---------------- NUESTRO PROPÓSITO ---------------- */}
        <section aria-labelledby="purpose-title" className="mt-24 md:mt-[16vh]">
          <p className="label-caps text-primary-on-photo">{t.home.purposeEyebrow}</p>
          <h2
            id="purpose-title"
            className="mt-5 font-display text-4xl font-semibold leading-[0.95] text-cream md:text-5xl xl:text-6xl"
          >
            {t.home.purposeTitle.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <Rule />
          <p className="max-w-xl text-base leading-relaxed text-cream/90">
            {t.home.purposeBody}
          </p>
        </section>

        {/* ---------------- CIERRE ---------------- */}
        <footer className="mt-24 border-t border-cream/25 pt-6 md:mt-auto">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              {t.home.footerOrigin.map((line) => (
                <p key={line} className="label-caps text-muted-on-photo">
                  {line}
                </p>
              ))}
            </div>
            <img
              src={labLogo}
              alt="The Lab Perfumes"
              className="h-8 w-auto object-contain"
            />
            <div className="flex items-center gap-6">
              {t.home.footerLinks.map((link) =>
                link === "INSTAGRAM" ? (
                  <a
                    key={link}
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="label-caps text-cream transition-colors hover:text-primary"
                  >
                    {link}
                  </a>
                ) : (
                  <span key={link} className="label-caps text-cream">
                    {link}
                  </span>
                ),
              )}
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
