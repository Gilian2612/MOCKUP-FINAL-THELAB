import type { Lang } from "@/i18n/translations";

/** A string that exists in both site languages. */
type L = { es: string; en: string };

export type Stockist = {
  flag: string;
  country: string;
  region: string;
  city: string;
  distributor: string;
  address: string;
  /** Absent for stockists we cannot plot yet; those are skipped by the map. */
  coords?: [number, number] | undefined;
};

type StockistSource = Omit<Stockist, "country" | "region" | "city"> & {
  country: L;
  region: L;
  city: L;
};

const UAE: L = { es: "EAU", en: "UAE" };
const QATAR: L = { es: "Catar", en: "Qatar" };
const SPAIN: L = { es: "España", en: "Spain" };
const CHILE: L = { es: "Chile", en: "Chile" };

const MIDDLE_EAST: L = { es: "Medio Oriente", en: "Middle East" };
const EUROPE: L = { es: "Europa", en: "Europe" };
const AMERICAS: L = { es: "América", en: "Americas" };
const ASIA_PACIFIC: L = { es: "Asia Pacífico", en: "Asia Pacific" };

const DUBAI: L = { es: "Dubái", en: "Dubai" };
const ABU_DHABI: L = { es: "Abu Dabi", en: "Abu Dhabi" };
const DOHA: L = { es: "Doha", en: "Doha" };

const SAME = (value: string): L => ({ es: value, en: value });

const stockistSources: StockistSource[] = [
  {
    flag: "🇦🇪",
    country: UAE,
    region: MIDDLE_EAST,
    city: DUBAI,
    distributor: "JOVOY RARE PERFUMES",
    address: "Al Wasl Rd, Al Beda'a, Jumeirah 1, Dubai, UAE",
    coords: [55.263, 25.228],
  },
  {
    flag: "🇦🇪",
    country: UAE,
    region: MIDDLE_EAST,
    city: ABU_DHABI,
    distributor: "SCENT COMMUNITY",
    address: "Building 26, Sheesh Zabeer 1, Al Falashi St, Al Mansoura, Abu Dhabi, UAE",
    coords: [54.377, 24.452],
  },
  {
    flag: "🇶🇦",
    country: QATAR,
    region: MIDDLE_EAST,
    city: DOHA,
    distributor: "JOVOY QATAR",
    address: "Al Mana Business Centre 02, Al Amir Street, Doha, Qatar",
    coords: [51.533, 25.286],
  },
  {
    flag: "🇪🇸",
    country: SPAIN,
    region: EUROPE,
    city: { es: "Vila-real", en: "Vila-real" },
    distributor: "LADANO PERFUMERÍA",
    address: "España",
    coords: [-0.102, 39.94],
  },
  {
    flag: "🇨🇱",
    country: CHILE,
    region: AMERICAS,
    city: { es: "Santiago", en: "Santiago" },
    distributor: "LIQUO SPA",
    address: "Chile",
    coords: [-70.608, -33.432],
  },
  /* Las siguientes siete vienen del diseño de PRESENCIA y todavía no tienen
     coordenadas: salen en la lista, no en el mapa, hasta que se focallen. */
  {
    flag: "🇦🇪",
    country: UAE,
    region: MIDDLE_EAST,
    city: ABU_DHABI,
    distributor: "HOB ABU DHABI",
    address: "Delma Mall, Main Entrance, ICAD 1, Abu Dhabi, UAE",
  },
  {
    flag: "🇰🇼",
    country: SAME("Kuwait"),
    region: MIDDLE_EAST,
    city: SAME("Kuwait"),
    distributor: "IMPERIAL PERFUMES",
    address: "Kuwait",
  },
  {
    flag: "🇵🇦",
    country: { es: "Panamá", en: "Panama" },
    region: AMERICAS,
    city: { es: "Panamá", en: "Panama" },
    distributor: "FRAGANCEROS",
    address: "Panamá",
  },
  {
    flag: "🇲🇽",
    country: SAME("Mexico"),
    region: AMERICAS,
    city: SAME("Mexico"),
    distributor: "INFINITY SCENTS",
    address: "Mexico",
  },
  {
    flag: "🇺🇸",
    country: { es: "EE. UU.", en: "USA" },
    region: AMERICAS,
    city: SAME("Texas"),
    distributor: "USA – DIRECT SHIPPING",
    address: "The LAB Perfumes",
  },
  {
    flag: "🇦🇺",
    country: SAME("Australia"),
    region: ASIA_PACIFIC,
    city: SAME("Australia"),
    distributor: "FRAGARTAU",
    address: "Australia",
  },
  {
    flag: "🇮🇶",
    country: { es: "Irak", en: "Iraq" },
    region: ASIA_PACIFIC,
    city: { es: "Irak", en: "Iraq" },
    distributor: "IMAN ALATTAR FRAGRANCES",
    address: "Iraq",
  },
];

const localize = (s: StockistSource, lang: Lang): Stockist => ({
  flag: s.flag,
  country: s.country[lang],
  region: s.region[lang],
  city: s.city[lang],
  distributor: s.distributor,
  address: s.address,
  coords: s.coords,
});

const cache: Record<Lang, Stockist[]> = {
  es: stockistSources.map((s) => localize(s, "es")),
  en: stockistSources.map((s) => localize(s, "en")),
};

/** Every stockist, in catalogue order, with labels in the given language. */
export const getStockists = (lang: Lang): Stockist[] => cache[lang];

/** Only the stockists we can place on the bottle map. */
export type PlottedStockist = Stockist & { coords: [number, number] };

export const getPlottedStockists = (lang: Lang): PlottedStockist[] =>
  cache[lang].filter((s): s is PlottedStockist => s.coords !== undefined);

const toPoint = (s: Stockist) => ({
  center: s.coords!,
  label: `${s.distributor} — ${s.city}`,
});

/**
 * A Google Maps link for any stockist, not only the plotted ones.
 *
 * With coordinates it is an exact pin. Without them it falls back to a text
 * search built from the distributor name, the street address and the city, so
 * every row can hand the reader off to Maps instead of only the five that
 * happen to be geocoded.
 */
export const getMapsUrl = (s: Stockist): string => {
  const query = s.coords
    ? `${s.coords[1]},${s.coords[0]}`
    : [s.distributor, s.address, s.city].filter(Boolean).join(", ");
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
};

export const getStockistsByCountry = (lang: Lang) => {
  const groups = cache[lang].reduce<Record<string, Stockist[]>>((acc, s) => {
    (acc[s.country] ??= []).push(s);
    return acc;
  }, {});
  return Object.entries(groups).map(([country, items]) => ({
    country,
    flag: items[0]!.flag,
    items,
    points: items.map(toPoint),
  }));
};

export const getStockistsByRegion = (lang: Lang) => {
  const groups = cache[lang].reduce<Record<string, Stockist[]>>((acc, s) => {
    (acc[s.region] ??= []).push(s);
    return acc;
  }, {});
  return Object.entries(groups).map(([region, items]) => ({
    region,
    label: region,
    items,
    points: items.map(toPoint),
  }));
};
