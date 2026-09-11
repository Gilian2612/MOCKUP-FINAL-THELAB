import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";

import labLogo from "@/assets/the-lab-logo.svg";
import { useCart } from "@/context/CartContext";
import { useTheme } from "@/context/ThemeContext";

const links = [
  { label: "Fragrances", to: "/fragrances" },
  { label: "The House", to: "/house" },
  { label: "Stockists", to: "/stockists" },
  { label: "Journal", to: "/journal" },
] as const;

export function Logo() {
  return (
    <img
      src={labLogo}
      alt="The Lab Perfumes"
      className="h-8 w-auto object-contain"
    />
  );
}

export default function SiteNav() {
  const { count, setDrawerOpen } = useCart();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
          ? "border-b border-border/60 bg-neutral-900/80 backdrop-blur-xl"
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

        <div className="flex items-center gap-4 -translate-x-5">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              theme === "day" ? "Switch to night mode" : "Switch to day mode"
            }
            className="flex h-7 w-7 items-center justify-center rounded-full border border-primary/40 text-primary transition-colors hover:border-primary hover:bg-primary/10"
          >
            {theme === "day" ? (
              <Moon className="h-3.5 w-3.5" />
            ) : (
              <Sun className="h-3.5 w-3.5" />
            )}
          </button>
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
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileMenuOpen}
            className="flex h-7 w-7 items-center justify-center rounded-full border border-primary/40 text-primary transition-colors hover:border-primary hover:bg-primary/10 lg:hidden"
          >
            <Menu className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[70] flex flex-col bg-background lg:hidden">
          <div className="flex items-center justify-between px-6 py-4">
            <Link
              to="/"
              aria-label="The Lab Perfumes — home"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Logo />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/40 text-primary transition-colors hover:border-primary hover:bg-primary/10"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex flex-1 flex-col items-center justify-center gap-10">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setMobileMenuOpen(false)}
                className="font-display text-4xl text-cream transition-colors hover:text-primary"
                activeProps={{ className: "font-display text-4xl text-primary" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
