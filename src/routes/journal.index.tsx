import { createFileRoute } from "@tanstack/react-router";

import g2 from "@/assets/gallery-02.png";
import g3 from "@/assets/gallery-03.png";
import g5 from "@/assets/gallery-05.png";

const entries = [
  {
    date: "March 2026",
    title: "Eight weeks in the dark",
    image: g2,
    alt: "Pouring perfume oil into a flask",
    text: "Why every base in the house macerates for a minimum of eight weeks before it ever meets a flacon.",
  },
  {
    date: "January 2026",
    title: "Sourcing oud in Cambodia",
    image: g3,
    alt: "Desert dunes at dusk",
    text: "Notes from a trip between plantations, distillers and the long negotiation over a single kilo of wood.",
  },
  {
    date: "November 2025",
    title: "The flagship, Dubai Mall",
    image: g5,
    alt: "The Lab boutique interior",
    text: "Building a room dark enough to smell in — light, material and the architecture of attention.",
  },
];

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
