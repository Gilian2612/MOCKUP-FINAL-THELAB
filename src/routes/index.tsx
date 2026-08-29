import { createFileRoute, Link } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useState } from "react";
import { MapPin } from "lucide-react";

import labLogo from "@/assets/the-lab-logo.svg";
import heroImg from "@/assets/hero-desktop.png";
import marioImg from "@/assets/mario-hero.jpg";
import brandImg from "@/assets/brand-detail.jpg";
import landingBg1 from "@/assets/landing-bg-1.png";
import { products, formatAED } from "@/lib/products";
import { stockists } from "@/lib/stockists";

const allStockistPoints = stockists.map((s) => ({
  center: s.coords,
  label: `${s.distributor} — ${s.city}`,
}));


const StockistMapRotating = lazy(() => import("@/components/StockistMapRotating"));

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


// Stockists data (real distributors) is imported from @/lib/stockists

function Logo() {
  return (
    <img
      src={labLogo}
      alt="The Lab Perfumes"
      className="h-10 w-auto object-contain"
    />
  );
}

function Home() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setActive((prev) => (prev + 1) % allStockistPoints.length);
    }, 8000);
    return () => clearInterval(t);
  }, []);

  return (
    <main className="relative min-h-screen">
      {/* FULL-PAGE BACKDROP — landing background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <img
          src={landingBg1}
          alt=""
          width={939}
          height={1668}
          className="absolute inset-0 h-full w-full scale-110 object-cover blur-[3px] opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/20 to-background/50" />
      </div>



      {/* HERO — glass cristal panel */}
      <section className="relative flex min-h-screen items-center overflow-hidden px-6 pb-24 pt-28 lg:px-20">
        <div className="glass-surface relative mx-auto w-full max-w-7xl overflow-hidden rounded-3xl lg:rounded-[32px]">
          <img
            src={heroImg}
            alt="The Lab Perfumes atelier"
            width={1920}
            height={1088}
            className="absolute inset-0 h-full w-full object-cover sepia-photo opacity-45"
          />
          <div className="absolute inset-0 bg-background/40" />
          <div className="copper-beam right-1/3 hidden lg:block" />

          <div className="relative px-6 py-20 sm:px-10 lg:px-16 lg:py-24">
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

          <span className="absolute bottom-6 left-6 label-caps text-muted-foreground">
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
        </div>
      </section>

      {/* FOUNDER */}
      <section id="founder" className="grid items-center gap-12 px-6 py-24 lg:grid-cols-2 lg:px-20">
        <div className="flex flex-col justify-center">
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
        <div className="clay overflow-hidden p-2">
          <img
            src={marioImg}
            alt="Mario Galindo, founder of The Lab Perfumes"
            loading="lazy"
            width={912}
            height={1200}
            className="h-[520px] w-full rounded-[22px] object-cover sepia-photo"
          />
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
          <div className="mt-12">
            {(() => {
              const s = stockists[active];
              const n = String(active + 1).padStart(2, "0");
              const total = String(stockists.length).padStart(2, "0");
              return (
                <div key={s.distributor} className="clay p-6">
                  <div className="flex items-center justify-between">
                    <p className="label-caps text-primary/80">{s.flag} {s.country}</p>
                    <p className="label-caps text-muted-foreground">{n} / {total}</p>
                  </div>
                  <p className="mt-5 font-display text-3xl text-cream">{s.distributor}</p>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
                    {s.address}
                  </p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      `${s.distributor}, ${s.address}`,
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${s.distributor} in Google Maps`}
                    className="mt-6 inline-flex h-9 w-9 items-center justify-center rounded-full border border-primary/40 text-primary transition-colors hover:border-primary hover:bg-primary/10"
                  >
                    <MapPin className="h-4 w-4" />
                  </a>
                </div>
              );
            })()}
          </div>
        </div>

        <Suspense
          fallback={<div className="h-[440px] w-full rounded-[20px] bg-muted" />}
        >
          <StockistMapRotating
            points={allStockistPoints}
            active={active}
          />
        </Suspense>
      </section>

      <footer className="border-t border-border bg-background px-6 py-12 lg:px-20">
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
