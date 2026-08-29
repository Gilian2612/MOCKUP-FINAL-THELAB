export type Stockist = {
  flag: string;
  country: string;
  region: string;
  city: string;
  distributor: string;
  address: string;
  coords: [number, number];
};

export const stockists: Stockist[] = [
  { flag: "🇦🇪", country: "UAE", region: "Middle East", city: "Dubai", distributor: "Jovoy Rare Perfumes", address: "Al Wasl Rd, Al Bada'a, Jumeirah 1, Dubai, UAE", coords: [55.263, 25.228] },
  { flag: "🇦🇪", country: "UAE", region: "Middle East", city: "Abu Dhabi", distributor: "Scent Community", address: "Building 26, Saeed Bin Saif Al Falahi St, Al Nahyan / Al Mamoura, Abu Dhabi, UAE", coords: [54.377, 24.452] },
  { flag: "🇦🇪", country: "UAE", region: "Middle East", city: "Dubai", distributor: "Scent Community / LINK Concept Store", address: "Wafi City, Wafi Mall, 1st Floor, Dubai, UAE", coords: [55.318, 25.247] },
  { flag: "🇶🇦", country: "Qatar", region: "Middle East", city: "Doha", distributor: "Jovoy Qatar", address: "Al Mana Business Centre 02, Al Amir Street, Doha, Qatar", coords: [51.533, 25.286] },
  { flag: "🇶🇦", country: "Qatar", region: "Middle East", city: "Al Rayyan / Doha", distributor: "Jovoy – Mall of Qatar", address: "Mall of Qatar, Rawdat Al Jahhaniya, Al Rayyan, Qatar", coords: [51.425, 25.319] },
  { flag: "🇶🇦", country: "Qatar", region: "Middle East", city: "Doha", distributor: "Jovoy – Doha Festival City", address: "Doha Festival City, Al Shamal Rd, Ground Floor, Doha, Qatar", coords: [51.497, 25.378] },
  { flag: "🇪🇸", country: "Spain", region: "Europe", city: "Vila-real", distributor: "Ládano Perfumería", address: "Carrer Colom 14, Vila-real, Castellón, Comunidad Valenciana, España", coords: [-0.102, 39.94] },
  { flag: "🇨🇱", country: "Chile", region: "Americas", city: "Santiago", distributor: "Liquo SpA", address: "Padre Mariano 391, Providencia, Santiago, Chile", coords: [-70.608, -33.432] },
];

export const stockistsByCountry = (() => {
  const groups = stockists.reduce<Record<string, Stockist[]>>((acc, s) => {
    (acc[s.country] ??= []).push(s);
    return acc;
  }, {});
  return Object.entries(groups).map(([country, items]) => ({
    country,
    flag: items[0].flag,
    items,
    points: items.map((s) => ({
      center: s.coords,
      label: `${s.distributor} — ${s.city}`,
    })),
  }));
})();

export const stockistsByRegion = (() => {
  const groups = stockists.reduce<Record<string, Stockist[]>>((acc, s) => {
    (acc[s.region] ??= []).push(s);
    return acc;
  }, {});
  const labels: Record<string, string> = {
    "Middle East": "🌍 Middle East",
    Europe: "🌍 Europe",
    Americas: "🌍 Americas",
  };
  return Object.entries(groups).map(([region, items]) => ({
    region,
    label: labels[region] ?? region,
    items,
    points: items.map((s) => ({
      center: s.coords,
      label: `${s.distributor} — ${s.city}`,
    })),
  }));
})();
