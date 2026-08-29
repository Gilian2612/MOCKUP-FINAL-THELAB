import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { MapPin } from "lucide-react";

import { stockistsByCountry, stockistsByRegion } from "@/lib/stockists";

const StockistMap = lazy(() => import("@/components/StockistMap"));

export const Route = createFileRoute("/stockists/")({
  head: () => ({
    meta: [
      { title: "International Stockists — The Lab Perfumes" },
      {
        name: "description",
        content:
          "Find The Lab Perfumes across the UAE, Qatar, Spain and Chile.",
      },
      { property: "og:title", content: "International Stockists — The Lab Perfumes" },
      {
        property: "og:description",
        content:
          "Distributors and concept stores where to find The Lab Perfumes.",
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
        <div className="space-y-10">
          {stockistsByCountry.map(({ country, flag, items }) => (
            <div key={country}>
              <p className="label-caps text-primary/80">{flag} {country}</p>
              <ul className="mt-4 divide-y divide-border border-y border-border">
                {items.map((s) => (
                  <li
                    key={s.distributor}
                    className="flex items-baseline justify-between gap-6 py-5"
                  >
                    <div>
                      <p className="font-display text-2xl text-cream">
                        {s.distributor}
                      </p>
                      <p className="mt-1 max-w-sm text-xs leading-relaxed text-muted-foreground">
                        {s.address}
                      </p>
                    </div>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${s.coords[1]},${s.coords[0]}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${s.distributor} in Google Maps`}
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-primary/40 text-primary transition-colors hover:border-primary hover:bg-primary/10"
                    >
                      <MapPin className="h-3.5 w-3.5" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="space-y-8">
          {stockistsByRegion.map(({ label, points }) => (
            <div key={label} className="clay p-4">
              <div className="mb-3 flex items-center justify-between px-1">
                <p className="label-caps text-primary">{label}</p>
              </div>
              <Suspense
                fallback={<div className="h-[260px] rounded-[20px] bg-muted" />}
              >
                <StockistMap
                  zoom={points.length > 1 ? 9 : 13}
                  points={points}
                />
              </Suspense>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
