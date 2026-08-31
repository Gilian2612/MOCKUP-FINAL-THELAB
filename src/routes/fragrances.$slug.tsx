import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { useCart } from "@/context/CartContext";
import { getProduct, getAdjacent, formatAED } from "@/lib/products";
import { SpecAccordion, type SpecAccordionItem } from "@/components/SpecAccordion";

export const Route = createFileRoute("/fragrances/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Fragrance not found — The Lab Perfumes" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { product } = loaderData;
    const description = `${product.name} — ${product.family}. ${product.notes.join(", ")}. ${formatAED(product.price)}.`;
    return {
      meta: [
        { title: `${product.name} — The Lab Perfumes` },
        { name: "description", content: description },
        { property: "og:title", content: `${product.name} — The Lab Perfumes` },
        { property: "og:description", content: description },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const reduceMotion = useReducedMotion();

  const adj = getAdjacent(product.slug);
  const prev = adj?.prev ?? product;
  const next = adj?.next ?? product;
  const index = adj?.index ?? 0;
  const total = adj?.total ?? 1;

  const specItems: SpecAccordionItem[] = [
    {
      id: "notes",
      label: "Notes",
      content: (
        <div className="flex flex-wrap gap-3 not-italic">
          {product.notes.map((n) => (
            <span
              key={n}
              className="rounded-full border border-primary/40 px-4 py-2 label-caps text-primary"
            >
              {n}
            </span>
          ))}
        </div>
      ),
    },
    {
      id: "story",
      label: "Story",
      content: product.story,
    },
    {
      id: "ingredients",
      label: "Ingredients",
      content: product.ingredients,
    },
    {
      id: "concentration",
      label: "Concentration",
      content: (
        <p>
          {product.concentration}
          <br />
          {product.size} bottle
        </p>
      ),
    },
    {
      id: "origin",
      label: "Origin",
      content: product.origin,
    },
  ];

  return (
    <main className="min-h-screen bg-background pt-28">
      <div className="grid lg:grid-cols-2">
        <div className="relative isolate min-h-[520px] overflow-hidden lg:min-h-[calc(100vh-7rem)]">
          <svg className="absolute h-0 w-0" aria-hidden="true">
            <filter id="wear" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="7" result="n" />
              <feDisplacementMap in="SourceGraphic" in2="n" scale="3.5" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </svg>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-20 opacity-[0.05] mix-blend-overlay"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }}
          />
          <div aria-hidden="true" className="plate-backdrop absolute inset-0" />
          <div
            aria-hidden="true"
            className="plate-frame pointer-events-none absolute inset-3 sm:inset-5"
          />
          <div
            aria-hidden="true"
            className="plate-floor absolute bottom-[12%] left-1/2 h-[5%] w-[44%] -translate-x-1/2 rounded-full"
          />
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <p
              aria-hidden="true"
              className="plate-ghost absolute inset-0 flex select-none items-center justify-center px-6 text-center text-[clamp(3.25rem,11vw,8.5rem)] uppercase"
            >
              {product.family}
            </p>
            <img
              src={product.image}
              alt={`${product.name} perfume bottle`}
              width={1080}
              height={1920}
              className="absolute inset-0 h-full w-full object-contain"
            />
              <div
                aria-hidden="true"
                className="absolute inset-x-5 bottom-5 sm:inset-x-8 sm:bottom-7"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1.5 border-t border-gold/25 pt-3">
                  <p className="label-caps text-gold/90">
                    {product.chapter} · {product.family}
                  </p>
                  <p className="text-[0.6875rem] tracking-[0.22em] text-muted-foreground/90">
                    {product.name}
                  </p>
                </div>
              </div>
          </motion.div>

          <span
            aria-hidden="true"
            style={{ textShadow: "0 0 28px rgba(184,167,106,0.45)", filter: "url(#wear)" }}
            className="pointer-events-none absolute right-4 top-1 select-none font-display text-[clamp(4rem,13vw,9rem)] leading-none text-primary/70 sm:right-8 sm:top-3"
          >
            {product.chapter.replace("Chapter ", "")}
          </span>
        </div>

        <div className="relative flex flex-col justify-center px-6 py-16 lg:px-20">
          <Link
            to="/fragrances"
            className="label-caps text-muted-foreground hover:text-primary"
          >
            ← All fragrances
          </Link>
          <p className="mt-8 label-caps text-primary">
            {product.chapter} · {product.family}
          </p>
          <h1 className="mt-4 font-display text-5xl text-cream sm:text-6xl">
            {product.name}
          </h1>
          <SpecAccordion items={specItems} />

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <div className="inline-flex items-center gap-6 rounded-full bg-background px-5 py-3 shadow-[inset_0_2px_6px_rgba(0,0,0,0.8),inset_0_-1px_0_rgba(182,170,132,0.16)]">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="text-lg text-primary"
              >
                −
              </button>
              <span className="text-cream">{qty}</span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQty((q) => q + 1)}
                className="text-lg text-primary"
              >
                +
              </button>
            </div>
            <p className="font-display text-3xl text-cream">
              {formatAED(product.price)}
            </p>
          </div>

          <button
            type="button"
            onClick={() => add(product, qty)}
            className="mt-8 w-full rounded-full bg-primary py-4 label-caps text-primary-foreground sm:w-auto sm:px-16"
          >
            Add to bag
          </button>

          <div className="relative mt-12 flex items-center justify-between gap-4 border-t border-primary/20 pt-6 lg:absolute lg:inset-x-20 lg:bottom-4 lg:mt-0">
            <Link
              to="/fragrances/$slug"
              params={{ slug: prev.slug }}
              className="group flex items-center gap-3 text-left"
            >
              <span
                aria-hidden="true"
                className="text-xl text-primary transition-transform group-hover:-translate-x-1"
              >
                ←
              </span>
              <span className="flex flex-col">
                <span className="label-caps text-muted-foreground">Previous</span>
                <span className="text-cream transition-colors group-hover:text-primary">
                  {prev.name}
                </span>
              </span>
            </Link>

            <span className="label-caps text-muted-foreground/70">
              {String(index + 1).padStart(2, "0")} /{" "}
              {String(total).padStart(2, "0")}
            </span>

            <Link
              to="/fragrances/$slug"
              params={{ slug: next.slug }}
              className="group flex items-center gap-3 text-right"
            >
              <span className="flex flex-col">
                <span className="label-caps text-muted-foreground">Next</span>
                <span className="text-cream transition-colors group-hover:text-primary">
                  {next.name}
                </span>
              </span>
              <span
                aria-hidden="true"
                className="text-xl text-primary transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
