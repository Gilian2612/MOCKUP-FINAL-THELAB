import { useEffect, useRef } from "react";

type Point = { center: [number, number]; label: string };

type Props = {
  points: Point[];
  active?: number;
  zoom?: number;
  className?: string;
};

const BOTTLE_PATH =
  "M0.45 0.00 C0.45 0.00 0.42 0.00 0.42 0.03 L0.42 0.10 C0.42 0.115 0.45 0.12 0.45 0.12 L0.45 0.18 C0.45 0.20 0.42 0.215 0.30 0.235 C0.16 0.255 0.14 0.30 0.14 0.40 L0.14 0.86 C0.14 0.93 0.18 0.96 0.26 0.965 L0.74 0.965 C0.82 0.96 0.86 0.93 0.86 0.86 L0.86 0.40 C0.86 0.30 0.84 0.255 0.70 0.235 C0.58 0.215 0.55 0.20 0.55 0.18 L0.55 0.12 C0.55 0.12 0.58 0.115 0.58 0.10 L0.58 0.03 C0.58 0.00 0.55 0.00 0.55 0.00 Z";

export default function StockistMapRotating({
  points,
  active = 0,
  zoom = 13,
  className = "",
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapRef = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const markerRef = useRef<any>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const maplibregl = await import("maplibre-gl");
      if (cancelled || !ref.current) return;
      const instance = new maplibregl.Map({
        container: ref.current,
        style: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
        center: points[active]?.center ?? [0, 0],
        zoom,
        attributionControl: false,
      });
      mapRef.current = instance;

      const el = document.createElement("div");
      el.style.cssText =
        "width:16px;height:16px;border-radius:2px;background:linear-gradient(135deg,#E8D9A0,#8C7A3F);transform:rotate(45deg);box-shadow:0 0 0 4px rgba(184,167,106,0.25),0 0 12px rgba(184,167,106,0.7);";
      markerRef.current = new maplibregl.Marker({ element: el })
        .setLngLat(points[active]?.center ?? [0, 0])
        .addTo(instance);
    })();

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const instance = mapRef.current;
    const c = points[active]?.center;
    if (!instance || !c) return;
    instance.flyTo({ center: c, zoom, speed: 2.4, curve: 1.1, essential: true });
    markerRef.current?.setLngLat(c);
  }, [active, zoom, points]);

  return (
    <div
      className={`relative mx-auto ${className}`}
      style={{ height: 720, width: 430, maxWidth: "100%" }}
    >
      <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id="bottleGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#E8D9A0" />
            <stop offset="0.5" stopColor="#B8A76A" />
            <stop offset="1" stopColor="#8C7A3F" />
          </linearGradient>
          <linearGradient id="bottleGlass" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.10" />
            <stop offset="0.55" stopColor="#B8A76A" stopOpacity="0.04" />
            <stop offset="1" stopColor="#000000" stopOpacity="0.20" />
          </linearGradient>
          <filter id="bottleGlow" x="-25%" y="-25%" width="150%" height="150%">
            <feDropShadow
              dx="0"
              dy="0"
              stdDeviation="4"
              floodColor="#B8A76A"
              floodOpacity="0.6"
            />
          </filter>
          <clipPath id="bottleClip" clipPathUnits="objectBoundingBox">
            <path d={BOTTLE_PATH} />
          </clipPath>
        </defs>
      </svg>

      <div
        className="absolute"
        style={{ inset: "3.5%", clipPath: "url(#bottleClip)" }}
      >
        <div
          ref={ref}
          aria-label="Rotating stockist locations"
          className="h-full w-full overflow-hidden"
        />
      </div>

      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 1 1"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d={BOTTLE_PATH}
          fill="url(#bottleGlass)"
          stroke="url(#bottleGold)"
          strokeWidth="2.5"
          vectorEffect="non-scaling-stroke"
          filter="url(#bottleGlow)"
        />
      </svg>
    </div>
  );
}
