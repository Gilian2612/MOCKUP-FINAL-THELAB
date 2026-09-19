import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";

import labLogo from "@/assets/the-lab-logo.svg";
import { useCart } from "@/context/CartContext";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage, type Lang } from "@/context/LanguageContext";

const routes = [
  { key: "fragrances", to: "/fragrances" },
  { key: "house", to: "/house" },
  { key: "stockists", to: "/stockists" },
  { key: "journal", to: "/journal" },
] as const;

export function Logo() {
  return <img src={labLogo} alt="The Lab Perfumes" className="h-8 w-auto object-contain" />;
}

/** ES | EN switch. `size="lg"` is the full-word version used in the mobile menu. */
export function LanguageToggle({ size = "sm" }: { size?: "sm" | "lg" }) {
  const { lang, setLang, t } = useLanguage();
  const { theme } = useTheme();

  const options: { code: Lang; short: string; long: string }[] = [
    { code: "es", short: "ES", long: t.nav.langEs },
    { code: "en", short: "EN", long: t.nav.langEn },
  ];

  const inactive =
    theme === "day" ? "text-neutral-700/60 hover:text-primary" : "text-white/55 hover:text-primary";

  if (size === "lg") {
    return (
      <div
        role="group"
        aria-label={t.nav.switchLang}
        className="flex items-center gap-4 rounded-full border border-primary/40 px-6 py-3"
      >
        {options.map((o, i) => (
          <span key={o.code} className="flex items-center gap-4">
            {i > 0 && <span className="text-border">|</span>}
            <button
              type="button"
              onClick={() => setLang(o.code)}
              aria-pressed={lang === o.code}
              className={`label-caps transition-colors ${
                lang === o.code ? "text-primary" : inactive
              }`}
            >
              {o.long}
            </button>
          </span>
        ))}
      </div>
    );
  }

  return (
    <div
      role="group"
      aria-label={t.nav.switchLang}
      className="flex h-7 items-center gap-1.5 rounded-full border border-primary/40 px-2.5"
    >
      {options.map((o, i) => (
        <span key={o.code} className="flex items-center gap-1.5">
          {i > 0 && <span className="text-[10px] text-primary/40">/</span>}
          <button
            type="button"
            onClick={() => setLang(o.code)}
            aria-pressed={lang === o.code}
            title={o.long}
            className={`label-caps text-[10px] leading-none transition-colors ${
              lang === o.code ? "text-primary" : inactive
            }`}
          >
            {o.short}
          </button>
        </span>
      ))}
    </div>
  );
}

export default function SiteNav() {
  const { count, setDrawerOpen } = useCart();
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = routes.map((r) => ({ to: r.to, label: t.nav[r.key] }));

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? theme === "day"
              ? "border-b border-border/60 bg-white/80 backdrop-blur-xl"
              : "border-b border-border/60 bg-neutral-900/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
          <Link to="/" aria-label={t.nav.home}>
            <Logo />
          </Link>

          <nav className="hidden items-center gap-9 lg:flex">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={
                  theme === "day"
                    ? "label-caps text-neutral-700/80 transition-colors hover:text-primary"
                    : "label-caps text-white/75 transition-colors hover:text-primary"
                }
                activeProps={{ className: "label-caps text-primary!" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4 -translate-x-5">
            <LanguageToggle />
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={theme === "day" ? t.nav.switchToNight : t.nav.switchToDay}
              className="flex h-7 w-7 items-center justify-center rounded-full border border-primary/40 text-primary transition-colors hover:border-primary hover:bg-primary/10"
            >
              {theme === "day" ? <Moon className="h-3.5 w-3.5" /> : <Sun className="h-3.5 w-3.5" />}
            </button>
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className="label-caps text-primary"
            >
              {t.nav.bag} ({count})
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label={t.nav.openMenu}
              aria-expanded={mobileMenuOpen}
              className="flex h-7 w-7 items-center justify-center rounded-full border border-primary/40 text-primary transition-colors hover:border-primary hover:bg-primary/10 lg:hidden"
            >
              <Menu className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[70] flex flex-col bg-background lg:hidden">
          <div className="flex items-center justify-between px-6 py-4">
            <Link to="/" aria-label={t.nav.home} onClick={() => setMobileMenuOpen(false)}>
              <Logo />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              aria-label={t.nav.closeMenu}
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

          <div className="flex justify-center px-6 pb-12">
            <LanguageToggle size="lg" />
          </div>
        </div>
      )}
    </>
  );
}
