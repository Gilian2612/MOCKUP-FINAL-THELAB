import neroliNegro from "@/assets/shop-neroli-negro.png";
import tobaccoBlanco from "@/assets/shop-tobacco-blanco.png";
import freshVetiver from "@/assets/shop-fresh-vetiver.png";
import koshu from "@/assets/shop-koshu.png";
import mangOud from "@/assets/shop-mang-oud.png";
import omg from "@/assets/shop-omg.png";
import amberChocolat from "@/assets/shop-amber-chocolat.png";
import cestLaVie from "@/assets/shop-cest-la-vie.png";
import karmaScotch from "@/assets/shop-karma-scotch.png";
import corintoKush from "@/assets/shop-corinto-kush.png";
import loto from "@/assets/shop-loto.png";

export type Product = {
  slug: string;
  name: string;
  chapter: string;
  family: string;
  price: number;
  notes: [string, string, string];
  story: string;
  concentration: string;
  size: string;
  image: string;
};

export const products: Product[] = [
  {
    slug: "neroli-negro",
    name: "Neroli Negro",
    chapter: "Chapter I",
    family: "Floral Noir",
    price: 590,
    notes: ["Neroli", "Black Pepper", "Musk"],
    story:
      "Orange blossom pulled into the dark. Neroli Negro opens luminous and turns opaque within minutes — a white flower photographed at midnight, all contrast and no apology.",
    concentration: "Extrait de Parfum · 22%",
    size: "50 ml",
    image: neroliNegro,
  },
  {
    slug: "tobacco-blanco",
    name: "Tobacco Blanco",
    chapter: "Chapter II",
    family: "Amber Tobacco",
    price: 640,
    notes: ["Blond Tobacco", "Tonka", "Dried Fig"],
    story:
      "The warmth of cured leaf without the smoke. Tobacco Blanco is a pale, powdered sweetness that lingers on wool and skin long after the room has emptied.",
    concentration: "Eau de Parfum · 20%",
    size: "50 ml",
    image: tobaccoBlanco,
  },
  {
    slug: "fresh-vetiver",
    name: "Fresh Vetiver",
    chapter: "Chapter III",
    family: "Woody Green",
    price: 620,
    notes: ["Haitian Vetiver", "Grapefruit", "Dry Cedar"],
    story:
      "Roots washed clean. A bright citrus strike over earth still damp from rain, built for heat and long afternoons.",
    concentration: "Eau de Parfum · 18%",
    size: "50 ml",
    image: freshVetiver,
  },
  {
    slug: "koshu",
    name: "Koshu",
    chapter: "Chapter IV",
    family: "Green Tea Musk",
    price: 660,
    notes: ["Green Tea", "Yuzu", "White Musk"],
    story:
      "Minimalism as a discipline. Koshu is a quiet composition — steeped leaf, cold citrus, and a musk that reads as skin rather than perfume.",
    concentration: "Eau de Parfum · 18%",
    size: "50 ml",
    image: koshu,
  },
  {
    slug: "mang-oud",
    name: "Mang Oud",
    chapter: "Chapter V",
    family: "Fruity Oud",
    price: 690,
    notes: ["Cambodian Oud", "Mango", "Saffron"],
    story:
      "Tropical fruit against resinous wood — the collision that defines the house. Colombian sweetness meets Emirati gravity in a single accord.",
    concentration: "Extrait de Parfum · 24%",
    size: "50 ml",
    image: mangOud,
  },
  {
    slug: "omg",
    name: "OMG",
    chapter: "Chapter VI",
    family: "Ambery Spice",
    price: 640,
    notes: ["Amber", "Cinnamon", "Benzoin"],
    story:
      "Loud, on purpose. OMG is the house at full volume: spice, resin and a projection curve that fills a room in under a minute.",
    concentration: "Extrait de Parfum · 22%",
    size: "50 ml",
    image: omg,
  },
  {
    slug: "amber-chocolat",
    name: "Amber Chocolat",
    chapter: "Chapter VII",
    family: "Gourmand Amber",
    price: 650,
    notes: ["Cacao", "Amber", "Colombian Coffee"],
    story:
      "Bogotá at 6am — bitter cacao, dark roast, and amber melting underneath. Gourmand without ever turning to dessert.",
    concentration: "Extrait de Parfum · 22%",
    size: "50 ml",
    image: amberChocolat,
  },
  {
    slug: "cest-la-vie",
    name: "C'est La Vie",
    chapter: "Chapter VIII",
    family: "Rose Chypre",
    price: 610,
    notes: ["Damask Rose", "Patchouli", "Pink Pepper"],
    story:
      "A rose that shrugs. Peppered, earthy and unsentimental — the antidote to every polite floral you have worn before.",
    concentration: "Eau de Parfum · 20%",
    size: "50 ml",
    image: cestLaVie,
  },
  {
    slug: "karma-scotch",
    name: "Karma Scotch",
    chapter: "Chapter IX",
    family: "Boozy Woods",
    price: 670,
    notes: ["Peated Whisky", "Oak", "Vanilla Absolute"],
    story:
      "Distilled from a late hour. Smoked barrel, sweet spirit and vanilla left uncut — a fragrance with the temperature of a poured dram.",
    concentration: "Extrait de Parfum · 22%",
    size: "50 ml",
    image: karmaScotch,
  },
  {
    slug: "corinto-kush",
    name: "Corinto Kush",
    chapter: "Chapter X",
    family: "Green Resin",
    price: 680,
    notes: ["Hemp Leaf", "Galbanum", "Labdanum"],
    story:
      "Raw green crushed between fingers. Corinto Kush is herbaceous and resinous, a Colombian valley rendered in absolute.",
    concentration: "Extrait de Parfum · 22%",
    size: "50 ml",
    image: corintoKush,
  },
  {
    slug: "loto",
    name: "Loto",
    chapter: "Chapter XI",
    family: "Aquatic Floral",
    price: 630,
    notes: ["Lotus", "Water Lily", "Ambrette"],
    story:
      "Stillness bottled. Loto floats — cool petals over clean water, closing on a soft ambrette that never raises its voice.",
    concentration: "Eau de Parfum · 18%",
    size: "50 ml",
    image: loto,
  },
];

export const getProduct = (slug: string) =>
  products.find((p) => p.slug === slug);

export const formatAED = (n: number) =>
  `${n.toLocaleString("en-US")} AED`;
