import React from "react";

type FilmBackdropProps = {
  src: string;
  /** `background-position` for the sharp layer. Defaults to top-anchored. */
  position?: string;
};

/**
 * Full-page film backdrop — two-layer technique.
 *
 * Back layer: same image with `cover` + heavy blur. It fills the whole
 * section on every viewport (letterbox areas included) with the image's own
 * colors, so there are no hard edges or seams.
 *
 * Front layer: same image with `contain` — the photograph is 9:16 and no
 * desktop is 9:16, so `cover` here threw away 20-55% of the picture depending
 * on the viewport. `contain` is the only fit mode that shows 100% of it inside
 * a box of any other ratio, and the blurred layer behind fills whatever the
 * fit leaves over, so the surround is the photograph's own colour rather than
 * an empty band.
 *
 * Single instance per layer (no-repeat) => no horizontal seams or stretching
 * artifacts. Sections keep their natural height (absolute inset-0 wrapper).
 *
 * `position` is the sharp layer's `background-position`, and it exists because
 * `contain` behaves differently depending on which axis has slack. In a wide
 * desktop section the 9:16 photo fits the height exactly and the slack is
 * horizontal, so `50%` centres the subject. In a narrow tall section the photo
 * fits the width and the slack is vertical — on mobile `/fragrances` the
 * section is 7341px tall and the photo only 666px, so `50% 50%` pushed the
 * photograph 3300px down the page and left the first screens showing nothing
 * but the blurred fill. `50% 0%` anchors it to the top on tall sections and is
 * a no-op on wide ones, where there is no vertical slack to distribute.
 */
export function FilmBackdrop({ src, position = "50% 0%" }: FilmBackdropProps) {
  const fillStyle: React.CSSProperties = {
    backgroundImage: `url(${src})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    filter: "blur(40px) brightness(0.75) saturate(1.1)",
    transform: "scale(1.12)", // keeps blurred edges from leaking transparency
  };
  const sharpStyle: React.CSSProperties = {
    backgroundImage: `url(${src})`,
    backgroundSize: "contain",
    backgroundPosition: position,
    backgroundRepeat: "no-repeat",
  };
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {/* Blurred cover fill: seamless backdrop everywhere */}
      <div className="absolute inset-0" style={fillStyle} />
      {/* Sharp cover: fills the section on every viewport */}
      <div className="absolute inset-0" style={sharpStyle} />
      <div className="film-warm absolute inset-0" />
      <div className="film-grain absolute inset-0" />
      <div className="film-vignette absolute inset-0" />
      <div className="film-leak absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/20 to-background/50" />
      <div className="absolute inset-0 bg-background/60" />
    </div>
  );
}
