import { createFileRoute } from "@tanstack/react-router";
import { Facebook, Instagram } from "lucide-react";

import fondoLanding from "@/assets/landing-bottle.webp";
import labLogoHorizontal from "@/assets/the-lab-logo-horizontal.svg";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
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
  const { theme } = useTheme();
  const isDark = theme === "night";

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
          <p className="label-caps mt-5 text-primary-on-photo">{t.home.heroFounded}</p>
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
                {line.split(" ").map((word, i) => (
                  <span
                    key={i}
                    className={word === "MUNDO" ? "text-primary-on-photo" : undefined}
                  >
                    {word}{i < line.split(" ").length - 1 ? " " : ""}
                  </span>
                ))}
              </span>
            ))}
          </h2>
          <Rule />
          <p className="max-w-xl text-base leading-relaxed text-cream">
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
            <div className="flex flex-col items-end gap-2">
              <span className="label-caps text-cream">CONTACTO</span>
              <div className="flex items-center gap-3">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-cream/40 text-cream transition-colors hover:border-primary hover:text-primary"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a
                  href="https://www.facebook.com/share/19hAo11X4P/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-cream/40 text-cream transition-colors hover:border-primary hover:text-primary"
                >
                  <Facebook className="h-4 w-4" />
                </a>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-cream/40 text-cream transition-colors hover:border-primary hover:text-primary"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                </a>
                <a
                  href="https://www.tiktok.com/@the.lab.perfumes?_r=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-cream/40 text-cream transition-colors hover:border-primary hover:text-primary"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}