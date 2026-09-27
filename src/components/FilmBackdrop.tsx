import React from "react";

type FilmBackdropProps = {
  src: string;
  width?: number;
  height?: number;
  position?: string;
  scale?: string;
  translate?: string;
};

/**
 * Full-page film backdrop — two-layer technique.
 *
 * Back layer: same image with `cover` + heavy blur. It fills the whole
 * section on every viewport (letterbox areas included) with the image's own
 * colors, so there are no hard edges or seams.
 *
 * Front layer: same image with `cover` — fills the whole section on every
 * viewport; the background image is a seamless stone texture, so the cropped
 * edges are invisible at the section boundary.
 *
 * Single instance per layer (no-repeat) => no horizontal seams or stretching
 * artifacts. Sections keep their natural height (absolute inset-0 wrapper).
 */
export function FilmBackdrop({ src }: FilmBackdropProps) {
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
    backgroundSize: "cover",
    backgroundPosition: "center",
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
