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
  ingredients: string;
  origin: string;
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
    ingredients:
      "Steam-distilled neroli absolute, cracked black peppercorn, and a clean white musk base, layered to keep the floral heart sharp rather than sweet.",
    origin:
      "The neroli is harvested from bitter orange groves along Tunisia's Cap Bon peninsula, distilled within hours of picking to preserve its green, almost bitter edge.",
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
    ingredients:
      "Blond Virginia tobacco leaf absolute, tonka bean rich in coumarin, and a dried fig accord for a fruit note that never turns jammy.",
    origin:
      "The tobacco leaf is cured in the Cibao valley of the Dominican Republic, aged slowly before distillation to soften it into something closer to hay than smoke.",
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
    ingredients:
      "Hand-dug vetiver root oil, cold-pressed pink grapefruit, and a dry cedarwood accord that keeps the composition from ever turning sweet.",
    origin:
      "The vetiver root is dug and hand-washed near Les Cayes, Haiti, still regarded as the finest terroir for the grass anywhere in the world.",
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
    ingredients:
      "Shade-grown sencha green tea, cold-pressed yuzu peel, and a transparent white musk built to disappear into the wearer's own scent.",
    origin:
      "The tea leaf is grown in the misted hillsides of Koshu, in Japan's Yamanashi prefecture, hand-picked in the first spring flush.",
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
    ingredients:
      "Wild-harvested Cambodian oud oil, ripe mango accord, and a thread of Kashmiri saffron for warmth without turning medicinal.",
    origin:
      "The oud is distilled in Cambodia's Pursat forests, then aged and blended in Dubai, where the house tests every batch against the region's heat.",
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
    ingredients:
      "Mineral amber resin, Ceylon cinnamon bark, and Laotian benzoin, pushed to concentrations most houses reserve for their extrait line alone.",
    origin:
      "The cinnamon bark is sourced from Sri Lanka's Kandy hills and the benzoin resin tapped from Laotian styrax trees, then resolved in the house lab.",
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
    ingredients:
      "Dark-roasted cacao absolute, single-origin Colombian coffee extract, and a mineral amber base that keeps the sweetness restrained.",
    origin:
      "Cacao and coffee are both sourced from smallholder farms in Colombia's Huila department, roasted locally before extraction.",
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
    ingredients:
      "Steam-distilled damask rose absolute, dark Indonesian patchouli, and pink peppercorn oil for a rasp across the top notes.",
    origin:
      "The rose is harvested at dawn in Bulgaria's Rose Valley, before the sun burns off the oils that give the absolute its depth.",
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
    ingredients:
      "A peated whisky accord built on smoked malt, American oak extracted from ex-bourbon staves, and whole Madagascar vanilla absolute.",
    origin:
      "The peat character is modeled on barrels aged on Scotland's Islay coast, where sea spray and smoke are inseparable from the spirit.",
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
    ingredients:
      "A hemp leaf accord, bitter-green galbanum resin, and labdanum absolute for a base that turns amber and warm as it settles.",
    origin:
      "Modeled on the Cauca valley around Corinto, Colombia, where the house first noted the exact bite of crushed leaf against wet stone.",
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
    ingredients:
      "Blue lotus absolute, a transparent water lily accord, and ambrette seed extract standing in for musk without any animal note.",
    origin:
      "The blue lotus is grown in shallow ponds along the Nile delta in Egypt, still harvested by hand at first light as the flowers open.",
    concentration: "Eau de Parfum · 18%",
    size: "50 ml",
    image: loto,
  },
];

export const getProduct = (slug: string) =>
  products.find((p) => p.slug === slug);

export const formatAED = (n: number) =>
  `${n.toLocaleString("en-US")} AED`;
