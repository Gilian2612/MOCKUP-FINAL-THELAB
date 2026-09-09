import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

import g5 from "@/assets/gallery-05.png";

const INSTAGRAM_URL = "https://www.instagram.com/thelabperfumes/";
const INSTAGRAM_POST_URL = "https://www.instagram.com/p/Db1w1l4NSRF/";
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
    <main className="min-h-screen bg-background px-6 pb-28 pt-40 lg:px-20">
      <p className="label-caps text-primary">Journal</p>
      <h1 className="mt-6 font-display text-5xl text-cream sm:text-7xl">
        Field <em className="italic text-primary">notes</em>
      </h1>

      <div className="mt-16 grid gap-8 md:grid-cols-3">
        <article className="clay flex flex-col p-6">
          <div className="overflow-hidden rounded-[20px]">
            <InstagramEmbed url={INSTAGRAM_POST_URL} />
          </div>
          <p className="mt-6 label-caps text-muted-foreground">Follow along</p>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 font-display text-2xl text-primary transition-colors hover:text-cream"
          >
            <InstagramIcon className="h-5 w-5" />
            @thelabperfumes
          </a>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Behind-the-scenes from the atelier, sourcing trips and new releases — on Instagram.
          </p>
        </article>

        <article className="clay p-6">
          <div className="overflow-hidden rounded-[20px]">
            <InstagramEmbed url={INSTAGRAM_POST_URL_2} />
          </div>
        </article>

        {entries.map((e) => (
          <article key={e.title} className="clay group p-6">
            <div className="overflow-hidden rounded-[20px]">
              <img
                src={e.image}
                alt={e.alt}
                loading="lazy"
                width={1000}
                height={1000}
                className="h-64 w-full object-cover sepia-photo transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <p className="mt-6 label-caps text-muted-foreground">{e.date}</p>
            <h2 className="mt-3 font-display text-2xl text-primary">{e.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {e.text}
            </p>
          </article>
        ))}
      </div>
    </main>
  );
}
