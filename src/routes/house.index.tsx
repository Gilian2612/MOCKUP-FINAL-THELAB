import { createFileRoute } from "@tanstack/react-router";

import houseBg from "@/assets/house-bg.webp";
import { useLanguage } from "@/context/LanguageContext";
import { FilmBackdrop } from "@/components/FilmBackdrop";

export const Route = createFileRoute("/house/")({
  head: () => ({
    meta: [
      { title: "The Founder — Mario Galindo | The Lab Perfumes" },
      {
        name: "description",
        content:
          "Mario Galindo learned the art of perfumery in the United States. The Lab Perfumes stands as his work: author perfumery with global presence.",
      },
      { property: "og:title", content: "The Founder — Mario Galindo" },
      {
        property: "og:description",
        content: "Founder & Creative Director of The Lab Perfumes.",
      },
    ],
  }),
  component: HousePage,
});

function HousePage() {
  const { t } = useLanguage();
  const profile = t.house.founderProfile;
  return (
    <main className="relative isolate min-h-screen bg-background">
      {/* FULL-PAGE BACKDROP */}
      <FilmBackdrop src={houseBg} position="center 35%" />

      <section className="relative flex min-h-[42vh] items-end overflow-hidden">
        <div className="copper-beam left-1/4" />
        <div className="relative w-full px-6 pb-12 lg:px-20">
          <h1 className="mt-6 font-display text-5xl leading-[0.95] text-cream sm:text-7xl md:ml-auto md:max-w-xl">
            {profile.title.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
        </div>
      </section>

      <section className="relative px-6 py-14 lg:px-20">
        {/* Reading surface. The page runs on one photograph for its whole
            length, and the copy sits low where that plate is darkest. In day
            mode the `-on-photo` tokens assume a light surface, so without this
            local veil the gold labels fall onto Mario's face and disappear.
            It is a veil, not a card: no border, no radius, no shadow. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-[1]"
          style={{
            background:
              "linear-gradient(to bottom, transparent 0%, color-mix(in srgb, var(--background) 72%, transparent) 20%, color-mix(in srgb, var(--background) 88%, transparent) 52%, var(--background) 100%)",
          }}
        />
        <div className="max-w-2xl space-y-6 md:ml-auto">
          {profile.body.map((paragraph) => (
            <p key={paragraph} className="text-sm leading-relaxed text-cream/90">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-12 max-w-2xl md:ml-auto">
          <p className="font-display text-xl italic text-cream">{profile.signoffName}</p>
          <p className="label-caps mt-2 text-muted-on-photo">{profile.signoffRole}</p>
        </div>

        <div className="mt-20 border-t border-border pt-6">
          {profile.niche.map((line) => (
            <p key={line} className="label-caps text-muted-on-photo">
              {line}
            </p>
          ))}
        </div>
      </section>
    </main>
  );
}
