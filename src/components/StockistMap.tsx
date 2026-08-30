import { useEffect, useRef } from "react";
import maplibreWorkerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?url";

type Point = { center: [number, number]; label: string };

type Props = {
  center?: [number, number];
  zoom?: number;
  label?: string;
  points?: Point[];
};

export default function StockistMap({ center, zoom = 12, label, points }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let map: { remove: () => void } | null = null;
    let cancelled = false;

    const markers =
      points && points.length
        ? points
        : center
          ? [{ center, label: label ?? "" }]
          : [];

    (async () => {
      const maplibregl = await import("maplibre-gl");
      maplibregl.setWorkerUrl(maplibreWorkerUrl);
      if (cancelled || !ref.current) return;

      const bounds = new maplibregl.LngLatBounds();
      markers.forEach((m) => bounds.extend(m.center));

      const instance = new maplibregl.Map({
        container: ref.current,
        style: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
        center: markers[0]?.center ?? center ?? [0, 0],
        zoom,
        attributionControl: false,
      });
      map = instance;

      const base = document.createElement("div");
      base.style.cssText =
        "width:14px;height:14px;border-radius:9999px;background:#B8A76A;box-shadow:0 0 0 5px rgba(184,167,106,0.22);";

      markers.forEach((m) => {
        const el = base.cloneNode(true) as HTMLElement;
        new maplibregl.Marker({ element: el })
          .setLngLat(m.center)
          .setPopup(new maplibregl.Popup({ offset: 18 }).setText(m.label))
          .addTo(instance);
      });

      if (markers.length > 1) {
        instance.fitBounds(bounds, { padding: 64, maxZoom: zoom });
      }
    })();

    return () => {
      cancelled = true;
      map?.remove();
    };
  }, [center, zoom, label, points]);

  return (
    <div
      ref={ref}
      aria-label={label ?? "Stockist locations"}
      className="h-[260px] w-full overflow-hidden rounded-[20px] border border-border"
    />
  );
}
