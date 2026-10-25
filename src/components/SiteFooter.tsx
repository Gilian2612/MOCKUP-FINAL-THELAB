import { Instagram } from "lucide-react";

import { useLanguage } from "@/context/LanguageContext";

const INSTAGRAM_URL = "https://www.instagram.com/thelabperfumes/";

export default function SiteFooter() {
  const { t } = useLanguage();
  return (
    <footer className="border-t border-border bg-background px-6 py-12 lg:px-20">
      <div className="flex flex-col sm:items-start sm:gap-6 sm:pb-8">
        <p className="label-caps text-muted-foreground sm:justify-self-center">
          {t.footer.location}
        </p>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.footer.instagram}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/40 text-primary transition-colors hover:border-primary hover:bg-primary/10"
          >
            <Instagram className="h-4 w-4" />
          </a>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <input
            type="email"
            placeholder="tu@ejemplo.com"
            className="border border-border rounded-md px-3 py-2 text-sm flex-1 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            className="bg-primary text-white px-4 py-2 rounded-md text-sm hover:opacity-90 transition-opacity"
          >
            Suscribirse
          </button>
        </div>
      </div>
    </footer>
  );
}