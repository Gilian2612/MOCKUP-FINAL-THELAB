import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef, useState } from "react";
import * as maplibregl from "maplibre-gl";
import maplibreWorkerUrl from "maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url";
import { createPerfumeMarkerElement } from "./perfumeMarker";

maplibregl.setWorkerUrl(maplibreWorkerUrl);

type Point = { center: [number, number]; label: string };

type Props = {
  points: Point[];
  active?: number;
  zoom?: number;
  className?: string;
};

const BOTTLE_PATH =
  "M0.45 0.00 C0.45 0.00 0.42 0.00 0.42 0.03 L0.42 0.10 C0.42 0.115 0.45 0.12 0.45 0.12 L0.45 0.18 C0.45 0.20 0.42 0.215 0.30 0.235 C0.16 0.255 0.14 0.30 0.14 0.40 L0.14 0.86 C0.14 0.93 0.18 0.96 0.26 0.965 L0.74 0.965 C0.82 0.96 0.86 0.93 0.86 0.86 L0.86 0.40 C0.86 0.30 0.84 0.255 0.70 0.235 C0.58 0.215 0.55 0.20 0.55 0.18 L0.55 0.12 C0.55 0.12 0.58 0.115 0.58 0.10 L0.58 0.03 C0.58 0.00 0.55 0.00 0.55 0.00 Z";

// Neck + collar only — painted opaque so the map never shows through the "cap".
const CAP_PATH =
  "M0.45 0.00 C0.45 0.00 0.42 0.00 0.42 0.03 L0.42 0.10 C0.42 0.115 0.45 0.12 0.45 0.12 L0.45 0.18 L0.55 0.18 L0.55 0.12 C0.55 0.12 0.58 0.115 0.58 0.10 L0.58 0.03 C0.58 0.00 0.55 0.00 0.55 0.00 Z";

// Shoulder + body — used only to shade the map area (vignette), not to clip it.
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
  const [diag, setDiag] = useState<string>("");

  useEffect(() => {
    let cancelled = false;

    (async () => {
      if (cancelled || !ref.current) return;
      setDiag("2-ref ok");

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
      setDiag("3-size ok");

      try {
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
          center: points[active]?.center ?? [0, 0],
          zoom,
          attributionControl: false,
          fadeDuration: 0,
          workerCount: 0,
        });
        mapRef.current = instance;
        setDiag("4-map created");
        instance.on("error", (e: any) => {
          const msg = e.error?.message ?? e.message ?? JSON.stringify(e);
          console.error("[MAP]", msg);
          setDiag("ERR: " + msg);
        });
        instance.on("load", () => {
          console.log("[MAP] tiles loaded");
          setDiag("5-TILES LOADED");
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
        setDiag("CREATE ERR: " + (err?.message ?? err));
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
          <clipPath id="bottleClip" clipPathUnits="objectBoundingBox">
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
        viewBox="0 0 1 1"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {/* Opaque cap — hides the map under the neck/collar */}
        <path
          d={CAP_PATH}
          fill="url(#capMetal)"
          stroke="url(#bottleGold)"
          strokeWidth="1.2"
          vectorEffect="non-scaling-stroke"
        />
        {/* Vignette to give the map area depth toward the glass edges */}
        <path d={BODY_PATH} fill="url(#bodyVignette)" style={{ mixBlendMode: "multiply" }} />
        {/* Overall glass tint */}
        <path d={BOTTLE_PATH} fill="url(#bottleGlass)" />
        {/* Diagonal glass reflection */}
        <path
          d={BOTTLE_PATH}
          fill="url(#bottleSheen)"
          style={{ mixBlendMode: "screen" }}
        />
        {/* Crisp gold rim */}
        <path
          d={BOTTLE_PATH}
          fill="none"
          stroke="url(#bottleGold)"
          strokeWidth="2.5"
          vectorEffect="non-scaling-stroke"
          filter="url(#bottleGlow)"
        />
      </svg>

      {/* Engraved wordmark on the cap */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute flex flex-col items-center"
        style={{ top: "3.2%", left: "50%", transform: "translateX(-50%)" }}
      >
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: 9,
            letterSpacing: "0.04em",
            color: "#3d3116",
            mixBlendMode: "multiply",
            lineHeight: 1,
          }}
        >
          The
        </span>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: 17,
            letterSpacing: "0.05em",
            color: "#3d3116",
            mixBlendMode: "multiply",
            lineHeight: 1,
            marginTop: 1,
          }}
        >
          LAB
        </span>
      </div>

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

      {diag && (
        <div className="absolute inset-x-0 bottom-24 z-50 px-4 text-center font-body text-xs leading-tight tracking-wide text-red-400">
          {diag}
        </div>
      )}
    </div>
  );
}
