import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { useCart } from "@/context/CartContext";
import { useTheme } from "@/context/ThemeContext";
import { getProduct, getAdjacent } from "@/lib/products";
import { formatPrice } from "@/lib/currency";
import { useCurrency } from "@/context/CurrencyContext";
import { useLanguage } from "@/context/LanguageContext";
import { SpecAccordion, type SpecAccordionItem } from "@/components/SpecAccordion";

export const Route = createFileRoute("/fragrances/$slug")({
  loader: ({ params }) => {
    // Meta tags are rendered server-side, before the visitor's language is known.
    const product = getProduct(params.slug, "en");
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
    const description = `${product.name} — ${product.family}. ${product.notes.join(", ")}. ${formatPrice(product.prices.AED, "AED")}.`;
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
  const { product: loaded } = Route.useLoaderData();
  const { lang, t } = useLanguage();
  const product = getProduct(loaded.slug, lang) ?? loaded;
  const { add } = useCart();
  const { currency, format } = useCurrency();
  const { theme } = useTheme();
  const [qty, setQty] = useState(1);
  const [accordionOpenId, setAccordionOpenId] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();

  const isDark = theme === "night";
  const storyImage = isDark ? product.storyImageDark : product.storyImageLight;
  const isNotes = accordionOpenId === "notes";
  const activeImage = accordionOpenId === "story" ? storyImage : isNotes ? product.image : product.notesImage;

  const adj = getAdjacent(product.slug, lang);
  const prev = adj?.prev ?? product;
  const next = adj?.next ?? product;
  const index = adj?.index ?? 0;
  const total = adj?.total ?? 1;

  const specItems: SpecAccordionItem[] = [
    {
      id: "notes",
      label: t.product.notes,
      content: (
        <div className="flex flex-wrap gap-3 not-italic">
          {product.notes.map((n) => (
            <span
              key={n}
              className="rounded-full border border-[#D9BE8B]/40 px-4 py-2 label-caps text-[#D9BE8B]"
            >
              {n}
            </span>
          ))}
        </div>
      ),
    },
    {
      id: "story",
      label: t.product.story,
      content: product.story,
    },
  ];

  /** Previous / next perfume. Rendered twice: above the copy on phones, at the
      foot of the column from `lg` up. Touch targets keep a 44px hit area via
      padding so the tappable box clears WCAG 2.5.8 without growing the type. */
  function PrevNext() {
    return (
      <nav
        aria-label={t.product.allFragrances}
        className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-3 border-t border-primary/25 bg-background/92 px-5 py-3 backdrop-blur-lg lg:absolute lg:inset-x-20 lg:bottom-4 lg:z-auto lg:mt-0 lg:border-y-0 lg:border-t lg:bg-transparent lg:px-0 lg:backdrop-blur-none"
      >
        <Link
          to="/fragrances/$slug"
          params={{ slug: prev.slug }}
          className="group -my-2 flex min-h-11 items-center gap-3 py-2 text-left"
        >
          <span
            aria-hidden="true"
            className="text-xl text-primary transition-transform group-hover:-translate-x-1"
          >
            ←
          </span>
          <span className="flex flex-col">
            <span className="label-caps text-muted-foreground">{t.product.previous}</span>
            <span className="text-cream transition-colors group-hover:text-primary">
              {prev.name}
            </span>
          </span>
        </Link>

        <span className="label-caps shrink-0 text-muted-foreground/70">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>

        <Link
          to="/fragrances/$slug"
          params={{ slug: next.slug }}
          className="group -my-2 flex min-h-11 items-center gap-3 py-2 text-right"
        >
          <span className="flex flex-col">
            <span className="label-caps text-muted-foreground">{t.product.next}</span>
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
      </nav>
    );
  }

  return (
    <main className="min-h-screen bg-background pb-24 pt-28 lg:pb-0">
      <div className="grid lg:grid-cols-2">
        <div className="relative isolate min-h-[520px] overflow-hidden lg:min-h-[calc(100vh-7rem)]">
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute inset-0 overflow-hidden"
          >
            <AnimatePresence initial={false}>
              <motion.img
                key={activeImage}
                src={activeImage}
                alt={t.product.bottleAlt(product.name)}
                width={1080}
                height={1350}
                initial={
                  reduceMotion ? { opacity: 0 } : { opacity: 0, filter: "blur(16px)", scale: 1.06 }
                }
                animate={{
                  opacity: 1,
                  filter: isDark ? "blur(0px)" : "blur(0px)",
                  scale: 1
                }}
                exit={
                  reduceMotion ? { opacity: 0 } : { opacity: 0, filter: "blur(16px)", scale: 1.06 }
                }
                transition={{ duration: reduceMotion ? 0.3 : 0.9, ease: "easeInOut" }}
                className="absolute inset-0 h-full w-full object-contain"
              />
            </AnimatePresence>
          </motion.div>
        </div>

        <div className="relative flex flex-col justify-center px-6 py-16 lg:px-20">
          <Link to="/fragrances" className="label-caps text-muted-foreground hover:text-primary">
            {t.product.allFragrances}
          </Link>

          {/* On a phone the plate fills the first screen and the copy sits under
              it, so a prev/next parked at the foot of the column meant scrolling
              past the whole product to change perfume. This instance stays
              `fixed` to the bottom edge on phones (see PrevNext), always
              reachable; the wrapper only scopes it below `lg` and takes no
              flow space. */}
          <div className="lg:hidden">
            <PrevNext />
          </div>

          <p className="mt-8 label-caps !text-base font-semibold text-primary">{t.product.profile}</p>
          <p className="mt-2 flex flex-wrap items-center gap-x-2.5 label-caps !text-sm leading-relaxed text-primary">
            {product.profile.split(" · ").map((attribute) => (
              <span key={attribute} className="inline-flex items-center gap-x-2.5">
                <span aria-hidden="true" className="h-1 w-1 rounded-full bg-primary" />
                {attribute}
              </span>
            ))}
          </p>
          <h1 className="mt-4 font-['La_Presse',Georgia,serif] text-5xl text-primary-on-photo sm:text-6xl">{product.name}</h1>
          <SpecAccordion items={specItems} onChange={(id) => setAccordionOpenId(id)} />

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <div className="inline-flex items-center gap-6 rounded-full bg-background px-5 py-3 shadow-[inset_0_2px_6px_rgba(0,0,0,0.8),inset_0_-1px_0_rgba(182,170,132,0.16)]">
              <button
                type="button"
                aria-label={t.product.decreaseQty}
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="text-lg text-primary"
              >
                −
              </button>
              <span className="text-cream">{qty}</span>
              <button
                type="button"
                aria-label={t.product.increaseQty}
                onClick={() => setQty((q) => q + 1)}
                className="text-lg text-primary"
              >
                +
              </button>
            </div>
            <p className="font-display text-3xl font-bold text-cream">{format(product.prices[currency])}</p>
          </div>

          <button
            type="button"
            onClick={() => add(product, qty)}
            className="mt-8 w-full rounded-full bg-primary py-4 label-caps text-primary-foreground sm:w-auto sm:px-16"
          >
            {t.product.addToBag}
          </button>

          <div className="hidden lg:block">
            <PrevNext />
          </div>
        </div>
      </div>
    </main>
  );
}
