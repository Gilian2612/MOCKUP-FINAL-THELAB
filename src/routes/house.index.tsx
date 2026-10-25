import { createFileRoute } from "@tanstack/react-router";

import houseBg from "@/assets/founder-portrait.jpg";
import signature from "@/assets/signature-mario.png";
import { useLanguage } from "@/context/LanguageContext";

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
    <main className="relative min-h-screen overflow-x-hidden bg-background">
      {/* The photograph is the plate: full-bleed, pinned behind the copy. */}
      <div className="pointer-events-none absolute inset-0 z-0 lg:fixed">
        <img
          src={houseBg}
          alt={profile.signoffName}
          className="h-[68vh] w-full object-cover object-[78%_50%] sm:h-[76vh] lg:h-full lg:object-[center_42%]"
        />

        {/* Top scrim keeps the fixed navigation legible over the plate. */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-40"
          style={{
            background:
              "linear-gradient(to bottom, color-mix(in srgb, var(--background) 72%, transparent), transparent)",
          }}
        />

        {/* Mobile / tablet: fade the plate into the page under the copy. */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-[68vh] sm:h-[76vh] lg:hidden"
          style={{
            background:
              "linear-gradient(to bottom, transparent 40%, color-mix(in srgb, var(--background) 55%, transparent) 63%, var(--background) 86%)",
          }}
        />

        {/* Desktop: side scrim so the copy sits in shadow beside the portrait. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 hidden lg:block"
          style={{
            background:
              "linear-gradient(to left, transparent 0%, transparent 50%, color-mix(in srgb, var(--background) 42%, transparent) 64%, color-mix(in srgb, var(--background) 90%, transparent) 76%, var(--background) 86%)",
          }}
        />

        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 hidden h-40 lg:block"
          style={{
            background:
              "linear-gradient(to top, color-mix(in srgb, var(--background) 80%, transparent), transparent)",
          }}
        />
      </div>

      {/* Copy — set exactly as in the reference plate. */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1800px] flex-col lg:min-h-screen lg:flex-row lg:justify-start">
        <div className="flex w-full flex-col px-6 pb-20 pt-[54vh] sm:px-10 sm:pt-[60vh] lg:w-[clamp(380px,32vw,560px)] lg:shrink-0 lg:justify-center lg:px-0 lg:pb-24 lg:pt-32 lg:pl-[clamp(2rem,5vw,6rem)]">
          <h1 className="founder-serif text-[clamp(2.75rem,4vw,4.25rem)] leading-[0.95] text-cream">
            {profile.title.map((line, i) => (
              <span
                key={line}
                className={`block ${i === 0 ? "text-cream" : "text-gold-bright"}`}
              >
                {line}
              </span>
            ))}
          </h1>

          <div aria-hidden="true" className="mt-3 h-[3px] w-24 bg-gold-bright" />

          <blockquote className="founder-serif mt-8 max-w-[600px] text-2xl leading-[1.2] text-cream sm:text-3xl xl:text-4xl">
            “{profile.quote}”
          </blockquote>

          <div aria-hidden="true" className="mt-7 h-[2px] w-20 bg-gold-bright" />

          <div className="mt-7 max-w-[600px] space-y-3.5">
            {profile.body.map((paragraph) => (
              <p
                key={paragraph}
                className="founder-serif text-[0.95rem] leading-[1.6] text-cream/90 sm:text-base"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div aria-hidden="true" className="mt-8 h-[2px] w-20 bg-gold-bright" />

          <div
            role="img"
            aria-label={profile.signoffName}
            className="mt-5 h-[104px] w-[156px] bg-cream"
            style={{
              maskImage: `url(${signature})`,
              maskRepeat: "no-repeat",
              maskSize: "contain",
              WebkitMaskImage: `url(${signature})`,
              WebkitMaskRepeat: "no-repeat",
              WebkitMaskSize: "contain",
            }}
          />

          <p className="founder-serif mt-3 text-lg text-cream sm:text-xl">
            {profile.signoffName}
          </p>
          <p className="founder-serif text-lg text-cream/85 sm:text-xl">
            {profile.signoffRole}
          </p>
        </div>
      </div>
    </main>
  );
}
