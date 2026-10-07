type FilmBackdropProps = {
  src: string;
  /** CSS `object-position`. The plates are 9:16, so each one is framed by hand. */
  position?: string;
  /** CSS `scale`, so an edge can be overshot instead of leaving a hairline. */
  scale?: number;
  /** CSS `translate` in px on Y, for plates whose subject sits above centre. */
  translateY?: number;
};

/**
 * Full-page film backdrop, matching the live design at thelab-blond.vercel.app.
 *
 * One graded image plus the four film overlays and two scrims. The grade is
 * `film-grade` (sepia, saturation, contrast, brightness, 2px blur) and it is
 * what makes the five section backdrops read as one shoot rather than five
 * unrelated pictures.
 *
 * Every plate is a 9:16 photograph filling a box of some other ratio, so each
 * route passes its own `position`, and where a subject sits off-centre the
 * route passes `scale` or `translateY` to overshoot. Framing is per image on
 * purpose: centring them all crops the faces out of three of the five.
 *
 * `object-cover` fills the section edge to edge, so there are no letterbox
 * bands at the left or right.
 *
 * The two scrims are the only thing standing between the copy and the plate,
 * and they are directional on purpose -- `film-scrim` carries the masthead and
 * the closing block, `film-scrim-side` carries the copy column from `lg` up.
 * Neither is a full-surface wash: that is what used to bury the photograph.
 */
export function FilmBackdrop({
  src,
  position = "center 15%",
  scale,
  translateY,
}: FilmBackdropProps) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <img
        src={src}
        alt=""
        className="film-grade absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: position, scale, translate: translateY ? `0 ${translateY}px` : undefined }}
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