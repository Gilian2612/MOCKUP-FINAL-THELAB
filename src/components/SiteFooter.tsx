import { Instagram } from "lucide-react";

import labLogo from "@/assets/the-lab-logo.svg";

const INSTAGRAM_URL = "https://www.instagram.com/thelabperfumes/";

export default function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background px-6 py-12 lg:px-20">
      <div className="flex flex-col items-center gap-6 sm:grid sm:grid-cols-3 sm:items-center">
        <img
          src={labLogo}
          alt="The Lab Perfumes"
          className="h-10 w-auto object-contain sm:justify-self-start"
        />
        <p className="label-caps text-muted-foreground sm:justify-self-center">
          Colombia · UAE
        </p>
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="The Lab Perfumes on Instagram"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/40 text-primary transition-colors hover:border-primary hover:bg-primary/10 sm:justify-self-end"
        >
          <Instagram className="h-4 w-4" />
        </a>
      </div>
    </footer>
  );
}
