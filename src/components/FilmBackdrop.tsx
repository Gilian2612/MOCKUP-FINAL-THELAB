type FilmBackdropProps = {
  src: string;
  /** CSS `object-position`: aligns the sharp plate inside the filled box. */
  position?: string;
  /** Grade without blur, for plates that must read sharp. */
  sharp?: boolean;
};

/**
 * Full-page film backdrop, matching the live design at thelab-blond.vercel.app.
 *
 * One graded image plus the four film overlays and two scrims. The grade is
 * `film-grade` (sepia, saturation, contrast, brightness, 2px blur) and it is
 * what makes the five section backdrops read as one shoot rather than five
 * unrelated pictures.
 *
 * A single sharp plate per section, edge to edge on every viewport: the
 * `object-cover` layer always fills the box, so there are no empty sides and
 * no second copy of the photo. Cropping is edge-only by construction — each
 * route passes its own focal `position`, hand-set from the photograph's
 * subject, so faces, bottles and labels never get cut.
 *
 * The two scrims are the only thing standing between the copy and the plate,
 * and they are directional on purpose -- `film-scrim` carries the masthead and
 * the closing block, `film-scrim-side` carries the copy column from `lg` up.
 * Neither is a full-surface wash: that is what used to bury the photograph.
 */
export function FilmBackdrop({
  src,
  position = "center 15%",
  sharp = false,
}: FilmBackdropProps) {
  const grade = sharp ? "film-grade-sharp" : "film-grade";
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {/* Single sharp plate, edge to edge, focal point per route. */}
      <img
        src={src}
        alt=""
        className={`${grade} absolute inset-0 h-full w-full object-cover`}
        style={{ objectPosition: position }}
      />
      <div className="film-warm absolute inset-0" />
      <div className="film-grain absolute inset-0" />
      <div className="film-vignette absolute inset-0" />
      <div className="film-leak absolute inset-0" />
      <div className="film-scrim absolute inset-0" />
      <div className="film-scrim-side absolute inset-0" />
    </div>
  );
}
