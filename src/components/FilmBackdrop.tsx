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
 * Full-page film backdrop.
 *
 * Option C: `background-size: 100% 100%` stretches the image to fill each
 * section exactly — the whole image stays visible (distorted to the section's
 * aspect ratio), there are no side gaps, and sections keep their natural
 * height instead of being forced taller by the image.
 */
export function FilmBackdrop({ src }: FilmBackdropProps) {
  const bgStyle: React.CSSProperties = {
    backgroundImage: `url(${src})`,
    backgroundSize: "100% 100%",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      style={bgStyle}
    >
      <div className="film-warm absolute inset-0" />
      <div className="film-grain absolute inset-0" />
      <div className="film-vignette absolute inset-0" />
      <div className="film-leak absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/20 to-background/50" />
      <div className="absolute inset-0 bg-background/60" />
    </div>
  );
}
