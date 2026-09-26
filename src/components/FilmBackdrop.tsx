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
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <img
        src={src}
        alt=""
        width={width}
        height={height}
        className={`film-grade absolute inset-0 h-full w-full ${scale} object-contain ${position} ${translate ?? ""}`}
      />
      <div className="film-warm absolute inset-0" />
      <div className="film-grain absolute inset-0" />
      <div className="film-vignette absolute inset-0" />
      <div className="film-leak absolute inset-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/20 to-background/50" />
      <div className="absolute inset-0 bg-background/60" />
    </div>
  );
}