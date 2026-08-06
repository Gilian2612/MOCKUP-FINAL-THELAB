import { createFileRoute, Link } from "@tanstack/react-router";

import { useCart } from "@/context/CartContext";
import { products, formatAED } from "@/lib/products";

export const Route = createFileRoute("/fragrances/")({
  head: () => ({
    meta: [
      { title: "Fragrances — The Lab Perfumes Collection" },
      {
        name: "description",
        content:
          "Eleven independent extraits and eaux de parfum from The Lab Perfumes, composed between Bogotá and Dubai. Prices in AED.",
      },
      { property: "og:title", content: "Fragrances — The Lab Perfumes" },
      {
        property: "og:description",
        content:
          "Eleven independent extraits and eaux de parfum composed between Bogotá and Dubai.",
      },
    ],
  }),
  component: FragrancesPage,
});

function FragrancesPage() {
  const { add } = useCart();

  return (
    <main className="min-h-screen bg-background px-6 pb-24 pt-40 lg:px-20">
      <p className="label-caps text-primary">The Collection</p>
      <h1 className="mt-6 max-w-3xl font-display text-5xl text-cream sm:text-7xl">
        Eleven <em className="italic text-primary">chapters</em> of the house
      </h1>
      <p className="mt-6 max-w-lg text-sm leading-relaxed text-muted-foreground">
        Every composition is bottled in small batches between Bogotá and Dubai.
        Shipping across the GCC in 2–4 days.
      </p>

      <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <article key={p.slug} className="clay group flex flex-col p-6">
            <Link
              to="/fragrances/$slug"
              params={{ slug: p.slug }}
              className="overflow-hidden rounded-[20px] bg-background/40"
            >
              <img
                src={p.image}
                alt={`${p.name} perfume bottle`}
                loading="lazy"
                width={900}
                height={1100}
                className="h-80 w-full object-cover sepia-photo transition-transform duration-700 group-hover:scale-105"
              />
            </Link>
            <Link to="/fragrances/$slug" params={{ slug: p.slug }}>
              <h2 className="mt-6 font-display text-2xl text-primary">
                {p.name}
              </h2>
            </Link>
            <p className="mt-2 label-caps text-muted-foreground">
              {p.notes.join(" · ")}
            </p>
            <p className="mt-6 font-display text-xl text-cream">
              {formatAED(p.price)}
            </p>
            <button
              type="button"
              onClick={() => add(p)}
              className="mt-6 rounded-full border border-primary/60 py-3 label-caps text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Add to bag
            </button>
          </article>
        ))}
      </div>
    </main>
  );
}
