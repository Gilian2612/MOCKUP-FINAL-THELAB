import { useEffect, useRef } from "react";
import * as maplibregl from "maplibre-gl";
import maplibreWorkerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url";
import { createPerfumeMarkerElement } from "./perfumeMarker";

maplibregl.setWorkerUrl(maplibreWorkerUrl);

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
      if (cancelled || !ref.current) return;

      const container = ref.current;
      const waitForSize = (node: HTMLElement) =>
        new Promise<void>((resolve) => {
          const check = () => {
            const rect = node.getBoundingClientRect();
            if (rect.width > 0 && rect.height > 0) resolve();
            else requestAnimationFrame(check);
          };
          check();
        });

      await waitForSize(container);
      if (cancelled) return;

      const bounds = new maplibregl.LngLatBounds();
      markers.forEach((m) => bounds.extend(m.center));

      const instance = new maplibregl.Map({
        container,
        style: {
          version: 8,
          sources: {
            carto: {
              type: "vector",
              tiles: [
                "https://tiles-a.basemaps.cartocdn.com/vectortiles/carto.streets/v1/{z}/{x}/{y}.mvt",
              ],
              maxzoom: 14,
            },
          },
          layers: [
            { id: "bg", type: "background", paint: { "background-color": "#0e0e0e" } },
            {
              id: "water",
              type: "fill",
              source: "carto",
              "source-layer": "water",
              paint: { "fill-color": "#11151f" },
            },
            {
              id: "roads-minor",
              type: "line",
              source: "carto",
              "source-layer": "transportation",
              filter: ["!=", ["get", "class"], "motorway"],
              paint: {
                "line-color": "#232323",
                "line-width": ["interpolate", ["linear"], ["zoom"], 8, 0.4, 14, 1.5],
              },
            },
            {
              id: "roads-major",
              type: "line",
              source: "carto",
              "source-layer": "transportation",
              filter: ["==", ["get", "class"], "motorway"],
              paint: {
                "line-color": "#3c4657",
                "line-width": ["interpolate", ["linear"], ["zoom"], 8, 0.8, 14, 2.4],
              },
            },
          ],
        },
        center: markers[0]?.center ?? center ?? [0, 0],
        zoom,
        attributionControl: false,
        fadeDuration: 0,
        workerCount: 0,
      });
      map = instance;
      instance.on("error", (e: any) => console.error("[MAP]", e.error?.message ?? e));
      instance.on("load", () => console.log("[MAP] tiles loaded"));

      const forceResize = () => instance.resize();
      requestAnimationFrame(forceResize);

      const base = createPerfumeMarkerElement();

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
