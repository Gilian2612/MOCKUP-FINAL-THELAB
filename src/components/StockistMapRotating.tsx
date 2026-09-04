import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef } from "react";
import * as maplibregl from "maplibre-gl";
import maplibreWorkerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url";
import { createPerfumeMarkerElement } from "./perfumeMarker";
import labLogo from "@/assets/the-lab-logo.svg";

maplibregl.setWorkerUrl(maplibreWorkerUrl);

type Point = { center: [number, number]; label: string };

type Props = {
  points: Point[];
  active?: number;
  zoom?: number;
  className?: string;
};

// Cap/tapa dorada — tapa de perfume real que cubre TODO el cuello (X 318-820).
// Sigue el contorno del cuello de la botella: la parte superior es una cúpula
// (los hombros del cuello suben desde X 318 y X 820 hasta la parte plana central
// en Y ~0.5), y los laterales bajan rectos por X 318 / X 820 hasta Y 440.
// Se dibuja DESPUÉS del contorno de la botella para cubrirlo, de modo que el
// contorno del cuello no se vea a través de la tapa. El contorno del cuerpo
// (más abajo) sigue viéndose.
const CAP_PATH =
  "M318,440 L318,400 L318,350 L318,300 L318,250 L318,200 L318,150 L318,100 L318.1,58.3 C318.1,56.1 318.0,48.0 318.2,44.9 C318.4,41.8 318.7,41.3 319.1,39.6 C319.6,37.9 320.1,36.2 320.9,34.6 C321.6,33.0 322.6,31.4 323.6,29.9 C324.6,28.4 325.8,27.1 327.1,25.8 C328.4,24.6 329.4,23.6 331.2,22.4 C333.0,21.2 335.3,19.6 338.2,18.4 C341.1,17.2 344.5,16.0 348.4,15.0 C352.3,14.0 356.8,13.3 361.6,12.5 C366.5,11.7 371.8,10.8 377.5,10.0 C383.3,9.2 389.4,8.3 396.1,7.5 C402.8,6.7 409.9,5.9 417.5,5.2 C425.1,4.5 433.1,3.8 441.6,3.3 C450.1,2.8 459.1,2.3 468.5,1.9 C477.9,1.5 493.1,1.1 498.0,0.9 L570.6,0.8 C575.5,0.9 589.4,1.1 600.1,1.4 C610.8,1.7 623.2,2.1 635.0,2.4 C646.8,2.7 658.5,3.0 671.0,3.4 C683.5,3.8 697.0,4.1 710.2,4.8 C723.4,5.5 737.5,6.3 750.4,7.7 C763.3,9.1 778.5,11.2 787.6,13.3 C796.7,15.4 800.2,17.2 805.0,20.2 C809.8,23.2 813.8,27.4 816.4,31.4 C819.0,35.4 819.7,42.0 820.4,44.1 L820.4,100 L820.4,150 L820.4,200 L820.4,250 L820.4,300 L820.4,350 L820.4,400 L820.4,440 Z";

// Contorno de botella del SVG adjunto (para renderizado en viewBox="0 0 1145.4 1791.79")
const BOTTLE_PATH =
  "M1143.57,848.87c1.26,134.91,2.57,274.41-.88,412.04-1.67,65.83-11.26,165.9-47.55,268.68-35.06,99.33-86.19,175.94-151.97,227.72-38.65,30.39-65.07,30.02-98.51,29.54-7.62-.11-15.49-.23-24.35-.04-111.37,2.44-216.08,4.47-318.12,4.47-66.28,0-131.42-.85-196.58-3-7.26-.24-13.77-.31-19.51-.37-36.63-.41-52.96-1.8-89.86-32.65C63.42,1644.31,8.93,1445.73,2.24,1296.91l-.02-.76L.5,644.37c.1-32.68,18.68-58.29,47.32-65.35,23.04-5.69,50.23-7.29,76.51-8.83,11.58-.68,22.51-1.33,32.46-2.29,12.79-1.24,25.58-2.5,38.37-3.76,41.27-4.05,83.76-8.23,126.01-11.67-3.39-44.37-2.19-93.38-1.02-140.78.67-27.81,1.32-54.09,1.11-79.47-.29-34.58-.94-69.85-1.56-103.95-1.11-59.88-2.25-121.78-1.49-182.73v-.86s.1-.88.1-.88c.74-6.78,4.55-19.2,21.61-26.13,7.5-3.04,15.76-4.31,21.79-5.23,1.07-.17,2.09-.32,3.03-.48C456.13-3.33,566.78.21,647.59,2.81c7.09.23,14.22.42,21.42.61,32.7.88,66.53,1.78,99.18,6.51.67.1,1.39.2,2.17.31,6.81.95,17.11,2.38,26.26,5.89,22.1,8.46,24.14,24.12,23.76,31.43v503.25c29.41,2.45,58.93,5.32,87.65,8.1,25.64,2.49,52.14,5.06,78.16,7.29,11.76,1.01,23.89,1.48,36.75,1.97,21.97.85,44.69,1.73,66.13,5.5,27.38,4.81,42.46,17.19,52.01,42.74l1.15,3.06v3.27c-.08,75.41.62,152.03,1.32,226.13Z";

const BODY_PATH =
  "M0.45 0.18 C0.45 0.20 0.42 0.215 0.30 0.235 C0.16 0.255 0.14 0.30 0.14 0.40 L0.14 0.86 C0.14 0.93 0.18 0.96 0.26 0.965 L0.74 0.965 C0.82 0.96 0.86 0.93 0.86 0.86 L0.86 0.40 C0.86 0.30 0.84 0.255 0.70 0.235 C0.58 0.215 0.55 0.20 0.55 0.18 Z";

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

      // Post-SSR/hydration: ensure layout is settled so the canvas gets a real size
      // before MapLibre starts its render loop (fixes blank tiles on Vercel).
      await waitForSize(container);
      if (cancelled) return;

      try {
        const instance = new maplibregl.Map({
          container,
          style: {
            version: 8,
            glyphs: "https://tiles.basemaps.cartocdn.com/fonts/{fontstack}/{range}.pbf",
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
              {
                id: "roadname-minor",
                type: "symbol",
                source: "carto",
                "source-layer": "transportation_name",
                filter: ["in", ["get", "class"], ["literal", ["minor", "service"]]],
                layout: {
                  "symbol-placement": "line",
                  "text-field": ["get", "name"],
                  "text-font": ["Open Sans Regular", "Noto Sans Regular"],
                  "text-size": 9,
                  "text-letter-spacing": 0.02,
                },
                paint: {
                  "text-color": "#8a8a8a",
                  "text-halo-color": "#0e0e0e",
                  "text-halo-width": 1,
                },
              },
              {
                id: "roadname-major",
                type: "symbol",
                source: "carto",
                "source-layer": "transportation_name",
                filter: ["in", ["get", "class"], ["literal", ["primary", "trunk", "motorway"]]],
                layout: {
                  "symbol-placement": "line",
                  "text-field": ["get", "name"],
                  "text-font": ["Open Sans Regular", "Noto Sans Regular"],
                  "text-size": 10,
                  "text-letter-spacing": 0.02,
                },
                paint: {
                  "text-color": "#9a9a9a",
                  "text-halo-color": "#0e0e0e",
                  "text-halo-width": 1,
                },
              },
              {
                id: "place-country",
                type: "symbol",
                source: "carto",
                "source-layer": "place",
                filter: ["==", ["get", "class"], "country"],
                layout: {
                  "text-field": ["get", "name_en"],
                  "text-font": ["Open Sans Bold", "Noto Sans Regular"],
                  "text-size": 12,
                  "text-transform": "uppercase",
                  "text-letter-spacing": 0.08,
                },
                paint: {
                  "text-color": "#c9b98a",
                  "text-halo-color": "#0e0e0e",
                  "text-halo-width": 1.2,
                },
              },
              {
                id: "place-city",
                type: "symbol",
                source: "carto",
                "source-layer": "place",
                filter: ["==", ["get", "class"], "city"],
                layout: {
                  "text-field": ["get", "name_en"],
                  "text-font": ["Open Sans Bold", "Noto Sans Regular"],
                  "text-size": 11,
                  "text-transform": "uppercase",
                  "text-letter-spacing": 0.04,
                },
                paint: {
                  "text-color": "#b8a76a",
                  "text-halo-color": "#0e0e0e",
                  "text-halo-width": 1.2,
                },
              },
            ],
          },
          center: points[active]?.center ?? [0, 0],
          zoom,
          attributionControl: false,
          fadeDuration: 0,
        });
        mapRef.current = instance;
        instance.on("error", (e: any) => {
          const msg = e.error?.message ?? e.message ?? JSON.stringify(e);
          console.error("[MAP]", msg);
        });
        instance.on("load", () => {
          console.log("[MAP] tiles loaded");
        });

      // Force re-resize after mount so the canvas repaints once laid out.
      const forceResize = () => instance.resize();
      requestAnimationFrame(forceResize);

      const el = createPerfumeMarkerElement();
      markerRef.current = new maplibregl.Marker({ element: el })
        .setLngLat(points[active]?.center ?? [0, 0])
        .addTo(instance);
      } catch (err: any) {
        console.error("[MAP] create", err);
      }
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
      {/* Ambient glow behind the bottle */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{
          top: "8%",
          left: "50%",
          width: "150%",
          height: "84%",
          transform: "translateX(-50%)",
          background:
            "radial-gradient(closest-side, rgba(184,167,106,0.20), rgba(184,167,106,0) 70%)",
          filter: "blur(30px)",
        }}
      />

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
          <linearGradient id="capMetal" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#8C7A3F" />
            <stop offset="0.25" stopColor="#F3E4B0" />
            <stop offset="0.5" stopColor="#B8A76A" />
            <stop offset="0.75" stopColor="#F3E4B0" />
            <stop offset="1" stopColor="#7a6836" />
          </linearGradient>
          <linearGradient
            id="bottleSheen"
            x1="0"
            y1="0.05"
            x2="0.65"
            y2="1"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="0.4" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="0.47" stopColor="#ffffff" stopOpacity="0.55" />
            <stop offset="0.54" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <radialGradient
            id="bodyVignette"
            cx="0.5"
            cy="0.42"
            r="0.62"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#000000" stopOpacity="0" />
            <stop offset="0.62" stopColor="#000000" stopOpacity="0" />
            <stop offset="1" stopColor="#000000" stopOpacity="0.62" />
          </radialGradient>
          <filter id="bottleGlow" x="-25%" y="-25%" width="150%" height="150%">
            <feDropShadow
              dx="0"
              dy="0"
              stdDeviation="4"
              floodColor="#B8A76A"
              floodOpacity="0.6"
            />
          </filter>
          <clipPath
            id="bottleClip"
            clipPathUnits="userSpaceOnUse"
            transform={`scale(${430 / 1145.4} ${720 / 1791.79})`}
          >
            <path d={BOTTLE_PATH} />
          </clipPath>
        </defs>
      </svg>

      <div
        className="absolute inset-0"
        style={{ clipPath: "url(#bottleClip)" }}
      >
        <div
          ref={ref}
          aria-label="Rotating stockist locations"
          className="h-full w-full overflow-hidden"
        />
      </div>

      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 1145.4 1791.79"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {/* Contorno dorado de la botella (from contorno.svg) — dibujado PRIMERO,
            debajo de la tapa, para que la tapa cubra el contorno del cuello */}
        <path
          d={BOTTLE_PATH}
          fill="none"
          stroke="#B8A76A"
          strokeWidth="2"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          filter="url(#bottleGlow)"
        />
        {/* Opaque cap — cubre el cuello y el contorno del cuello (dibujado encima) */}
        <path
          d={CAP_PATH}
          fill="url(#capMetal)"
          stroke="none"
        />
      </svg>

      {/* Engraved logo on the cap */}
      <img
        src={labLogo}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{
          top: "9%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "28%",
          height: "auto",
          mixBlendMode: "multiply",
          filter: "brightness(0.4)",
          opacity: 0.95,
        }}
      />

      {/* Grounding shadow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{
          bottom: "-1%",
          left: "50%",
          width: "56%",
          height: "5%",
          transform: "translateX(-50%)",
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.55), rgba(0,0,0,0) 72%)",
          filter: "blur(6px)",
        }}
      />
    </div>
  );
}
