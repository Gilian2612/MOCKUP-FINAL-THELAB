import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

import g5 from "@/assets/gallery-05.png";
import journalBg from "@/assets/journal-bg.png";

const INSTAGRAM_URL = "https://www.instagram.com/thelabperfumes/";
const INSTAGRAM_POST_URL = "https://www.instagram.com/p/Cz0G8OPuyfF/";
const INSTAGRAM_POST_URL_2 = "https://www.instagram.com/p/DadjIU0IuI2/";

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

const entries = [
  {
    date: "November 2025",
    title: "The flagship, Dubai Mall",
    image: g5,
    alt: "The Lab boutique interior",
    text: "Building a room dark enough to smell in — light, material and the architecture of attention.",
  },
];

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
      { title: "Journal — The Lab Perfumes" },
      {
        name: "description",
        content:
          "Field notes from The Lab Perfumes: sourcing trips, maceration, and building the Dubai flagship.",
      },
      { property: "og:title", content: "Journal — The Lab Perfumes" },
      {
        property: "og:description",
        content: "Field notes from an independent Colombian-Emirati perfume house.",
      },
    ],
  }),
  component: JournalPage,
});

function JournalPage() {
  return (
    <main className="relative isolate flex min-h-screen flex-col bg-background px-6 pb-4 pt-[114px] lg:px-20">
      {/* FULL-PAGE BACKDROP */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <img
          src={journalBg}
          alt=""
          width={1023}
          height={1537}
          className="absolute inset-0 h-full w-full scale-100 object-cover object-[center_95%] blur-[3px] opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/20 to-background/50" />
        <div className="absolute inset-0 bg-background/60" />
      </div>

      <p className="label-caps text-primary">Journal</p>
      <h1 className="mt-1 font-display text-2xl text-cream sm:text-4xl">
        Field <span className="not-italic text-primary">notes</span>
      </h1>

      <section className="mt-4 flex flex-col items-center gap-0.5 text-center">
        <p className="label-caps text-muted-foreground">Follow along</p>
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-display text-base text-primary transition-colors hover:text-cream"
        >
          <InstagramIcon className="h-4 w-4" />
          @thelabperfumes
        </a>
        <p className="max-w-md text-xs leading-relaxed text-muted-foreground">
          Behind-the-scenes from the atelier, sourcing trips and new releases — on Instagram.
        </p>
      </section>

      <div className="mx-auto mt-4 grid w-full max-w-3xl gap-4 sm:grid-cols-2">
        <article className="clay p-3">
          <div className="min-h-[320px] overflow-hidden rounded-[16px] bg-background/40">
            <InstagramEmbed url={INSTAGRAM_POST_URL} />
          </div>
        </article>

        <article className="clay p-3">
          <div className="min-h-[320px] overflow-hidden rounded-[16px] bg-background/40">
            <InstagramEmbed url={INSTAGRAM_POST_URL_2} />
          </div>
        </article>
      </div>

      {entries.map((e) => (
        <article
          key={e.title}
          className="clay group mx-auto mt-3 flex w-full max-w-3xl flex-col items-center gap-4 p-3 sm:flex-row"
        >
          <div className="w-full shrink-0 overflow-hidden rounded-[16px] sm:w-36">
            <img
              src={e.image}
              alt={e.alt}
              loading="lazy"
              width={1000}
              height={1000}
              className="h-20 w-full object-cover sepia-photo transition-transform duration-700 group-hover:scale-105 sm:h-full"
            />
          </div>
          <div>
            <p className="label-caps text-muted-foreground">{e.date}</p>
            <h2 className="mt-1 font-display text-lg text-primary">{e.title}</h2>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              {e.text}
            </p>
          </div>
        </article>
      ))}
    </main>
  );
}
