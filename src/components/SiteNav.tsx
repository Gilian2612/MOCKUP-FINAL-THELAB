import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import logo from "@/assets/the-lab-logo.png";
import { useCart } from "@/context/CartContext";

const links = [
  { label: "Fragrances", to: "/fragrances" },
  { label: "The House", to: "/house" },
  { label: "Stockists", to: "/stockists" },
  { label: "Journal", to: "/journal" },
] as const;

export function Logo() {
  return (
    <span className="flex items-center gap-3">
      <img
        src={logo}
        alt="The Lab Perfumes"
        width={40}
        height={40}
        className="h-9 w-9 object-contain"
      />
      <span className="leading-[0.95] text-primary">
        <span className="block font-display text-xs italic">The</span>
        <span className="block font-display text-base font-semibold tracking-[0.18em]">
          LAB
        </span>
        <span className="block label-caps text-[8px] text-primary/80">
          Perfumes
        </span>
      </span>
    </span>
  );
}

export default function SiteNav() {
  const { count, setDrawerOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-border/60 bg-[rgba(10,9,8,0.88)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
        <Link to="/" aria-label="The Lab Perfumes — home">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-9 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="label-caps text-muted-foreground transition-colors hover:text-primary"
              activeProps={{ className: "label-caps text-primary" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button
            type="button"
            className="label-caps hidden text-muted-foreground transition-colors hover:text-primary sm:block"
          >
            Search
          </button>
          <span className="hidden text-border sm:block">|</span>
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className="label-caps text-primary"
          >
            Bag ({count})
          </button>
        </div>
      </div>

      <nav className="flex items-center justify-center gap-6 overflow-x-auto border-t border-border/40 px-6 py-2 lg:hidden">
        {links.map((l) => (
          <Link
            key={l.to}
            to={l.to}
            className="label-caps whitespace-nowrap text-muted-foreground"
            activeProps={{ className: "label-caps whitespace-nowrap text-primary" }}
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
