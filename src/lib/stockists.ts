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
  coords: [number, number];
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

const DUBAI: L = { es: "Dubái", en: "Dubai" };
const ABU_DHABI: L = { es: "Abu Dabi", en: "Abu Dhabi" };
const DOHA: L = { es: "Doha", en: "Doha" };

const stockistSources: StockistSource[] = [
  {
    flag: "🇦🇪",
    country: UAE,
    region: MIDDLE_EAST,
    city: DUBAI,
    distributor: "Jovoy Rare Perfumes",
    address: "Al Wasl Rd, Al Bada'a, Jumeirah 1, Dubai, UAE",
    coords: [55.263, 25.228],
  },
  {
    flag: "🇦🇪",
    country: UAE,
    region: MIDDLE_EAST,
    city: ABU_DHABI,
    distributor: "Scent Community",
    address: "Building 26, Saeed Bin Saif Al Falahi St, Al Nahyan / Al Mamoura, Abu Dhabi, UAE",
    coords: [54.377, 24.452],
  },
  {
    flag: "🇦🇪",
    country: UAE,
    region: MIDDLE_EAST,
    city: DUBAI,
    distributor: "Scent Community / LINK Concept Store",
    address: "Wafi City, Wafi Mall, 1st Floor, Dubai, UAE",
    coords: [55.318, 25.247],
  },
  {
    flag: "🇶🇦",
    country: QATAR,
    region: MIDDLE_EAST,
    city: DOHA,
    distributor: "Jovoy Qatar",
    address: "Al Mana Business Centre 02, Al Amir Street, Doha, Qatar",
    coords: [51.533, 25.286],
  },
  {
    flag: "🇶🇦",
    country: QATAR,
    region: MIDDLE_EAST,
    city: { es: "Al Rayyan / Doha", en: "Al Rayyan / Doha" },
    distributor: "Jovoy – Mall of Qatar",
    address: "Mall of Qatar, Rawdat Al Jahhaniya, Al Rayyan, Qatar",
    coords: [51.425, 25.319],
  },
  {
    flag: "🇶🇦",
    country: QATAR,
    region: MIDDLE_EAST,
    city: DOHA,
    distributor: "Jovoy – Doha Festival City",
    address: "Doha Festival City, Al Shamal Rd, Ground Floor, Doha, Qatar",
    coords: [51.497, 25.378],
  },
  {
    flag: "🇪🇸",
    country: SPAIN,
    region: EUROPE,
    city: { es: "Vila-real", en: "Vila-real" },
    distributor: "Ládano Perfumería",
    address: "Carrer Colom 14, Vila-real, Castellón, Comunidad Valenciana, España",
    coords: [-0.102, 39.94],
  },
  {
    flag: "🇨🇱",
    country: CHILE,
    region: AMERICAS,
    city: { es: "Santiago", en: "Santiago" },
    distributor: "Liquo SpA",
    address: "Padre Mariano 391, Providencia, Santiago, Chile",
    coords: [-70.608, -33.432],
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

/** All stockists, in catalogue order, with labels in the given language. */
export const getStockists = (lang: Lang): Stockist[] => cache[lang];

const toPoint = (s: Stockist) => ({
  center: s.coords,
  label: `${s.distributor} — ${s.city}`,
});

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
    label: `🌍 ${region}`,
    items,
    points: items.map(toPoint),
  }));
};
