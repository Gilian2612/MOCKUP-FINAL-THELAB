export type Stockist = { city: string; place: string };

export const stockists: Stockist[] = [
  { city: "Dubai", place: "The Lab Flagship — Dubai Mall, Fashion Avenue" },
  { city: "Dubai", place: "Mall of the Emirates — Level 1, Perfume Hall" },
  { city: "Abu Dhabi", place: "Yas Mall · Yas Island" },
  { city: "Abu Dhabi", place: "The Galleria — Al Maryah Island" },
  { city: "Sharjah", place: "Al Zahia City Centre" },
  { city: "Riyadh", place: "Solitaire Mall — Northern Ring Road" },
  { city: "Doha", place: "Place Vendôme — Lusail" },
  { city: "London", place: "Mayfair — 14 Dover Street" },
  { city: "Paris", place: "Le Marais — 8 Rue de Turenne" },
  { city: "New York", place: "SoHo — 112 Greene Street" },
  { city: "Tokyo", place: "Aoyama — 5-2-1 Minami" },
  { city: "Bogotá", place: "Zona G — Calle 70 #6-15" },
  { city: "Medellín", place: "El Poblado — Carrera 37 #8-15" },
];

export const maps = [
  {
    label: "The Lab Flagship / Dubai Mall",
    center: [55.1713, 25.1124] as [number, number],
    zoom: 14,
  },
  {
    label: "Yas Mall · Yas Island",
    center: [54.3773, 24.4667] as [number, number],
    zoom: 13,
  },
];
