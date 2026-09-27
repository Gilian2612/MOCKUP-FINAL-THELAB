import React from "react";
type FilmBackdropProps = {
  src: string;
  width?: number;
  height?: number;
  position?: string;
  scale?: string;
  translate?: string;
};

export function FilmBackdrop({
  src,
  width,
  height,
  position = "object-center",
  scale = "scale-100",
  translate,
}: FilmBackdropProps) {
  const bgStyle: React.CSSProperties = {
    backgroundImage: `url(${src})`,
    backgroundSize: "100% auto",
    backgroundPosition: "top",
    backgroundAttachment: "scroll",
    backgroundRepeat: "repeat-y",
  };
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 min-h-full -z-10 overflow-hidden"
      style={bgStyle}
    >
      {/* Full image in flow: defines exact height and extends the document
          so the whole image is scrollable (bg alone is clipped by content height) */}
      <img src={src} alt="" className="block h-auto w-full" />
      <div className="film-warm absolute inset-0" />
      <div className="film-grain absolute inset-0" />
      <div className="film-vignette absolute inset-0" />
      <div className="film-leak absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/20 to-background/50" />
      <div className="absolute inset-0 bg-background/60" />
    </div>
  );
}