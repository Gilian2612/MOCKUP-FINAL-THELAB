import { createFileRoute, Link } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

import logo from "@/assets/the-lab-logo.png";
import heroImg from "@/assets/hero-desktop.png";
import marioImg from "@/assets/mario-hero.jpg";
import brandImg from "@/assets/brand-detail.jpg";
import { products, formatAED } from "@/lib/products";


const StockistMap = lazy(() => import("@/components/StockistMap"));

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

const featured = products.slice(0, 3);


const stockists = [
  { city: "Dubai", place: "The Lab Flagship — Dubai Mall, Fashion Avenue" },
  { city: "Abu Dhabi", place: "Yas Mall · Yas Island" },
  { city: "London", place: "Mayfair — 14 Dover Street" },
  { city: "Paris", place: "Le Marais — 8 Rue de Turenne" },
  { city: "New York", place: "SoHo — 112 Greene Street" },
  { city: "Tokyo", place: "Aoyama — 5-2-1 Minami" },
  { city: "Bogotá", place: "Zona G — Calle 70 #6-15" },
];

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <img
        src={logo}
        alt="The Lab Perfumes"
        width={40}
        height={40}
        className="h-10 w-10 object-contain"
      />
      <span className="leading-[0.95] text-primary">
        <span className="block font-display text-sm italic">The</span>
        <span className="block font-display text-lg font-semibold tracking-[0.18em]">
          LAB
        </span>
        <span className="block label-caps text-[8px] text-primary/80">
          Perfumes
        </span>
      </span>
    </div>
  );
}

function Home() {
  return (
    <main className="min-h-screen bg-background">



      {/* HERO */}
      <section className="relative flex min-h-screen items-center overflow-hidden">
        <img
          src={heroImg}
          alt="The Lab Perfumes atelier"
          width={1920}
          height={1088}
          className="absolute inset-0 h-full w-full object-cover sepia-photo"
        />
        <div className="absolute inset-0 bg-background/40" />
        <div className="copper-beam right-1/3" />

        <div className="relative mx-auto w-full max-w-7xl px-6 pt-28">
          <p className="label-caps text-primary">Est. Bogotá — Dubai</p>
          <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[0.95] text-primary sm:text-7xl lg:text-[96px]">
            Not a niche house <em className="italic">from</em> Colombia
          </h1>
          <p className="mt-8 max-w-md text-sm leading-relaxed text-muted-foreground">
            Independent perfumery. Crafted between Colombia and Dubai.
          </p>

          <a
            href="#collection"
            className="group mt-12 inline-flex items-center gap-4"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/50 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
              <svg width="12" height="14" viewBox="0 0 12 14" fill="currentColor">
                <path d="M0 0l12 7-12 7z" />
              </svg>
            </span>
            <span className="label-caps border-b border-primary pb-1 text-cream">
              Discover the collection
            </span>
          </a>
        </div>

        <span className="absolute bottom-8 left-6 label-caps text-muted-foreground">
          | Scroll to explore
        </span>

        <div className="absolute right-6 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-4 md:flex">
          <span className="label-caps text-primary">01</span>
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className={`h-1.5 w-1.5 rounded-full ${i === 0 ? "bg-primary" : "bg-muted-foreground/40"}`}
            />
          ))}
        </div>
      </section>

      {/* FOUNDER */}
      <section id="founder" className="grid lg:grid-cols-2">
        <div className="flex flex-col justify-center px-6 py-24 lg:px-20">
          <p className="label-caps text-primary">The Founder</p>
          <h2 className="mt-6 font-display text-4xl text-cream sm:text-6xl">
            Mario Galindo
          </h2>
          <p className="mt-3 font-display text-2xl italic text-muted-foreground">
            Visionary Perfumer and Entrepreneur
          </p>
          <ol className="mt-12 space-y-8 border-t border-border pt-10">
            {[
              "Crafting distinctive scents that defy tradition",
              "Leading The Lab Perfumes to global prestige",
            ].map((t, i) => (
              <li key={t} className="flex gap-6">
                <span className="label-caps pt-1 text-primary">
                  0{i + 1} —
                </span>
                <span className="max-w-sm font-display text-2xl leading-snug text-cream">
                  {t}
                </span>
              </li>
            ))}
          </ol>
        </div>
        <div className="relative min-h-[520px]">
          <img
            src={marioImg}
            alt="Mario Galindo, founder of The Lab Perfumes"
            loading="lazy"
            width={912}
            height={1200}
            className="absolute inset-0 h-full w-full object-cover sepia-photo"
          />
          <div className="absolute inset-0 bg-background/25" />
        </div>
      </section>

      {/* BRAND SYSTEM */}
      <section id="house" className="grid items-center gap-12 px-6 py-24 lg:grid-cols-2 lg:px-20">
        <div>
          <p className="label-caps text-primary">The House System</p>
          <ol className="mt-10 divide-y divide-border border-y border-border">
            {[
              "Luxury in every detail",
              "Noir cinematic aesthetic",
              "Elegant dark mode interface",
              "Premium sensory experience",
            ].map((t, i) => (
              <li key={t} className="flex items-baseline gap-6 py-7">
                <span className="label-caps text-primary">0{i + 1} —</span>
                <span className="font-display text-3xl text-cream">{t}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="clay overflow-hidden p-2">
          <img
            src={brandImg}
            alt="Detail of an amber perfume flacon and brass cap"
            loading="lazy"
            width={912}
            height={1200}
            className="h-[520px] w-full rounded-[22px] object-cover sepia-photo"
          />
        </div>
      </section>

      {/* FEATURED */}
      <section id="collection" className="px-6 py-24 lg:px-20">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-4xl text-cream sm:text-5xl">
            Featured <em className="italic text-primary">fragrances</em>
          </h2>
          <Link
            to="/fragrances"
            className="label-caps hidden text-muted-foreground hover:text-primary sm:block"
          >
            View all eleven →
          </Link>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {featured.map((f) => (
            <Link
              key={f.slug}
              to="/fragrances/$slug"
              params={{ slug: f.slug }}
              className="clay group p-6"
            >
              <div className="overflow-hidden rounded-[20px] bg-background/40">
                <img
                  src={f.image}
                  alt={`${f.name} perfume bottle`}
                  loading="lazy"
                  width={900}
                  height={1100}
                  className="h-80 w-full object-cover sepia-photo transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="mt-6 font-display text-2xl text-primary">
                {f.name}
              </h3>
              <p className="mt-2 label-caps text-muted-foreground">
                {f.notes.join(" · ")}
              </p>
              <p className="mt-6 font-display text-xl text-cream">
                {formatAED(f.price)}
              </p>
            </Link>
          ))}
        </div>
      </section>


      {/* STOCKISTS */}
      <section id="stockists" className="grid gap-14 px-6 py-24 lg:grid-cols-2 lg:px-20">
        <div>
          <p className="label-caps text-primary">Stockists</p>
          <h2 className="mt-6 font-display text-4xl text-cream sm:text-5xl">
            Where to <em className="italic">find us</em>
          </h2>
          <ul className="mt-12 divide-y divide-border border-y border-border">
            {stockists.map((s) => (
              <li key={s.city} className="flex items-baseline justify-between gap-6 py-5">
                <span className="font-display text-2xl text-cream">{s.city}</span>
                <span className="text-right text-xs leading-relaxed text-muted-foreground">
                  {s.place}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-8">
          <div className="clay p-4">
            <p className="label-caps mb-3 px-1 text-primary">
              The Lab Flagship / Dubai Mall
            </p>
            <Suspense fallback={<div className="h-[260px] rounded-[20px] bg-muted" />}>
              <StockistMap
                center={[55.1713, 25.1124]}
                zoom={14}
                label="The Lab Flagship / Dubai Mall"
              />
            </Suspense>
          </div>
          <div className="clay p-4">
            <p className="label-caps mb-3 px-1 text-primary">
              Yas Mall · Yas Island
            </p>
            <Suspense fallback={<div className="h-[260px] rounded-[20px] bg-muted" />}>
              <StockistMap
                center={[54.3773, 24.4667]}
                zoom={13}
                label="Yas Mall · Yas Island"
              />
            </Suspense>
          </div>
        </div>
      </section>

      <footer className="border-t border-border px-6 py-12 lg:px-20">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <Logo />
          <p className="label-caps text-muted-foreground">
            Bogotá · Dubai — MMXXVI
          </p>
        </div>
      </footer>
    </main>
  );
}
