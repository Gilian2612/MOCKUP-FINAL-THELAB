import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

import collage from "@/assets/journal-collage.jpg";
import dubai from "@/assets/journal-dubai.jpg";
import etapaDigital from "@/assets/journal-etapa-digital.jpg";
import granada from "@/assets/journal-granada.jpg";
import penon from "@/assets/journal-penon.jpg";
import spiwak from "@/assets/journal-spiwak.png";
import { useLanguage } from "@/context/LanguageContext";

const INSTAGRAM_URL = "https://www.instagram.com/thelabperfumes/";
const INSTAGRAM_POST_URL = "https://www.instagram.com/p/DadjIU0IuI2/";

/** Plate per stage, in the order the timeline is authored (see `journal.timeline`). */
const timelineMedia = [
  { src: granada, position: "center 50%" },
  { src: penon, position: "center 50%" },
  { src: spiwak, position: "center 45%" },
  { src: etapaDigital, position: "center 50%" },
  { src: dubai, position: "center 60%" },
];

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

function InstagramEmbed({ url }: { url: string }) {
  useEffect(() => {
    if (window.instgrm) {
      window.instgrm.Embeds.process();
      return;
    }
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src="https://www.instagram.com/embed.js"]',
    );
    if (existing) {
      existing.addEventListener("load", () => window.instgrm?.Embeds.process());
      return;
    }
    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
  }, [url]);

  return (
    <blockquote
      className="instagram-media"
      data-instgrm-permalink={url}
      data-instgrm-version="14"
      style={{ margin: 0, width: "100%", background: "transparent" }}
    />
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  );
}

export const Route = createFileRoute("/journal/")({
  head: () => ({
    meta: [
      { title: "Pasado y Presente — The Lab Perfumes" },
      {
        name: "description",
        content:
          "The history of The Lab Perfumes: from Granada and El Peñón in Cali to Hotel Spiwak, the digital era and Dubai.",
      },
      { property: "og:title", content: "Pasado y Presente — The Lab Perfumes" },
      {
        property: "og:description",
        content: "The timeline of an independent Colombian-Emirati perfume house.",
      },
    ],
  }),
  component: JournalPage,
});

function JournalPage() {
  const { t } = useLanguage();
  const journal = t.journal;

  return (
    <main className="relative isolate min-h-screen overflow-x-hidden bg-background pb-24 pt-[104px] lg:pt-[120px]">
      {/* The product collage is the plate; the scrim keeps the copy readable. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <img
          src={collage}
          alt=""
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-background/78" />
        <div className="film-vignette absolute inset-0 opacity-80" />
        <div
          className="absolute inset-x-0 top-0 h-48"
          style={{
            background:
              "linear-gradient(to bottom, color-mix(in srgb, var(--background) 88%, transparent), transparent)",
          }}
        />
      </div>

      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-14">
        <div className="grid gap-14 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
          {/* Masthead + story */}
          <section>
            <h1 className="font-display text-[clamp(2.6rem,5.4vw,5.4rem)] font-bold uppercase leading-[0.86] tracking-[-0.015em] text-cream">
              <span className="block">{journal.titleTop}</span>
              <span className="mt-1 block text-gold-bright">{journal.titleBottom}</span>
            </h1>
            <div aria-hidden="true" className="mt-6 h-[3px] w-28 bg-gold-bright" />

            <div className="mt-8 max-w-[60ch] space-y-5">
              {journal.story.map((paragraph, i) => (
                <p
                  key={i}
                  className="founder-serif text-[1rem] leading-[1.65] text-cream/90 sm:text-[1.06rem]"
                >
                  {paragraph.map((segment, j) =>
                    segment.bold ? (
                      <strong key={j} className="font-bold text-cream">
                        {segment.text}
                      </strong>
                    ) : (
                      <span key={j}>{segment.text}</span>
                    ),
                  )}
                </p>
              ))}
            </div>
          </section>

          {/* Instagram */}
          <section className="lg:pt-4">
            <h2 className="font-display text-[clamp(1.85rem,3.3vw,3.1rem)] font-bold uppercase leading-[0.95] tracking-[-0.01em] text-cream">
              {journal.instagramTitle.before}
              <span className="text-gold-bright">{journal.instagramTitle.accent}</span>
              {journal.instagramTitle.after}
            </h2>
            <div aria-hidden="true" className="mt-4 h-[2px] w-full bg-gold-bright/70" />
            <p className="mt-5 max-w-[52ch] founder-serif text-[1rem] leading-[1.6] text-cream/85">
              {journal.instagramText}
            </p>

            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-[0.8rem] uppercase tracking-[0.22em] text-gold-bright transition-colors hover:text-cream"
            >
              <InstagramIcon className="h-4 w-4" />
              @thelabperfumes
            </a>

            <div className="mx-auto mt-6 w-full max-w-[460px] rounded-[16px] bg-white p-2 shadow-[0_30px_60px_-25px_rgba(0,0,0,0.9)]">
              <div className="overflow-hidden rounded-[10px]">
                <InstagramEmbed url={INSTAGRAM_POST_URL} />
              </div>
            </div>
          </section>
        </div>

        {/* Timeline */}
        <section className="mt-20 lg:mt-24">
          <div className="flex items-center gap-5 sm:gap-8">
            <span aria-hidden="true" className="hidden h-px flex-1 bg-gold-bright/40 sm:block" />
            <h2 className="mx-auto text-center font-display text-[clamp(1.4rem,2.5vw,2.3rem)] font-bold uppercase tracking-[0.08em] text-cream">
              {journal.timelineTitle}
            </h2>
            <span aria-hidden="true" className="hidden h-px flex-1 bg-gold-bright/40 sm:block" />
          </div>

          <div className="mt-12 grid gap-x-7 gap-y-14 sm:grid-cols-2 lg:mt-14 lg:grid-cols-5">
            {journal.timeline.map((stage, i) => {
              const media = timelineMedia[i] ?? { src: granada, position: "center 50%" };
              return (
                <article key={stage.title} className="flex flex-col items-center text-center">
                  <p className="font-display text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-cream/90">
                    {stage.year}
                  </p>

                  <div aria-hidden="true" className="my-4 flex w-full items-center gap-2">
                    <span className="h-px flex-1 bg-gold-bright/35" />
                    <span className="h-1 w-1 rounded-full bg-gold-bright/60" />
                    <span className="h-px flex-1 bg-gold-bright/35" />
                  </div>

                  <div className="w-full overflow-hidden border border-gold-bright/70">
                    <img
                      src={media.src}
                      alt={stage.alt}
                      loading="lazy"
                      className="aspect-[16/9] w-full object-cover"
                      style={{ objectPosition: media.position }}
                    />
                  </div>

                  <h3 className="mt-4 founder-serif text-[1.35rem] uppercase leading-tight tracking-[0.05em] text-cream">
                    {stage.title}
                  </h3>
                  <p className="founder-serif text-[0.98rem] text-cream/80">{stage.place}</p>

                  <div className="mt-3 space-y-2.5">
                    {stage.text.map((paragraph, j) => (
                      <p
                        key={j}
                        className="founder-serif text-[0.8rem] leading-[1.55] text-cream/75"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
