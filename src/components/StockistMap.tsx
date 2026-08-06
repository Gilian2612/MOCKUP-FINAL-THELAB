import { useEffect, useRef } from "react";

type Props = {
  center: [number, number];
  zoom: number;
  label: string;
};

export default function StockistMap({ center, zoom, label }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let map: { remove: () => void } | null = null;
    let cancelled = false;

    (async () => {
      const maplibregl = await import("maplibre-gl");
      if (cancelled || !ref.current) return;

      const instance = new maplibregl.Map({
        container: ref.current,
        style: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
        center,
        zoom,
        attributionControl: false,
      });
      map = instance;

      const el = document.createElement("div");
      el.style.cssText =
        "width:14px;height:14px;border-radius:9999px;background:#B8935A;box-shadow:0 0 0 5px rgba(184,147,90,0.22);";

      new maplibregl.Marker({ element: el })
        .setLngLat(center)
        .setPopup(new maplibregl.Popup({ offset: 18 }).setText(label))
        .addTo(instance);
    })();

    return () => {
      cancelled = true;
      map?.remove();
    };
  }, [center, zoom, label]);

  return (
    <div
      ref={ref}
      aria-label={label}
      className="h-[260px] w-full overflow-hidden rounded-[20px] border border-border"
    />
  );
}
