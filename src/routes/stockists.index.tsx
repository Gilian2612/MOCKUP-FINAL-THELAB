import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

import { maps, stockists } from "@/lib/stockists";

const StockistMap = lazy(() => import("@/components/StockistMap"));

export const Route = createFileRoute("/stockists/")({
  head: () => ({
    meta: [
      { title: "International Stockists — The Lab Perfumes" },
      {
        name: "description",
        content:
          "Find The Lab Perfumes in Dubai, Abu Dhabi, Riyadh, Doha, London, Paris, New York, Tokyo and Bogotá.",
      },
      { property: "og:title", content: "International Stockists — The Lab Perfumes" },
      {
        property: "og:description",
        content:
          "Where to find The Lab Perfumes across the GCC, Europe, the Americas and Asia.",
      },
    ],
  }),
  component: StockistsPage,
});

function StockistsPage() {
  return (
    <main className="min-h-screen bg-background px-6 pb-28 pt-40 lg:px-20">
      <p className="label-caps text-primary">Retail</p>
      <h1 className="mt-6 font-display text-5xl text-cream sm:text-7xl">
        International <em className="italic text-primary">stockists</em>
      </h1>

      <div className="mt-16 grid gap-16 lg:grid-cols-2">
        <ul className="divide-y divide-border border-y border-border">
          {stockists.map((s) => (
            <li
              key={`${s.city}-${s.place}`}
              className="flex items-baseline justify-between gap-6 py-5"
            >
              <span className="font-display text-2xl text-cream">{s.city}</span>
              <span className="text-right text-xs leading-relaxed text-muted-foreground">
                {s.place}
              </span>
            </li>
          ))}
        </ul>

        <div className="space-y-8">
          {maps.map((m) => (
            <div key={m.label} className="clay p-4">
              <p className="label-caps mb-3 px-1 text-primary">{m.label}</p>
              <Suspense
                fallback={<div className="h-[260px] rounded-[20px] bg-muted" />}
              >
                <StockistMap center={m.center} zoom={m.zoom} label={m.label} />
              </Suspense>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
