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

import neroliNegroStoryDark from "@/assets/story/dark/neroli-negro.svg";
import tobaccoBlancoStoryDark from "@/assets/story/dark/tobacco-blanco.svg";
import freshVetiverStoryDark from "@/assets/story/dark/fresh-vetiver.svg";
import koshuStoryDark from "@/assets/story/dark/koshu.svg";
import mangOudStoryDark from "@/assets/story/dark/mang-oud.svg";
import omgStoryDark from "@/assets/story/dark/omg.svg";
import amberChocolatStoryDark from "@/assets/story/dark/amber-chocolat.svg";
import cestLaVieStoryDark from "@/assets/story/dark/cest-la-vie.svg";
import karmaScotchStoryDark from "@/assets/story/dark/karma-scotch.svg";
import corintoKushStoryDark from "@/assets/story/dark/corinto-kush.svg";
import lotoStoryDark from "@/assets/story/dark/loto.svg";

import neroliNegroStoryLight from "@/assets/story/light/neroli-negro.svg";
import tobaccoBlancoStoryLight from "@/assets/story/light/tobacco-blanco.svg";
import freshVetiverStoryLight from "@/assets/story/light/fresh-vetiver.svg";
import koshuStoryLight from "@/assets/story/light/koshu.svg";
import mangOudStoryLight from "@/assets/story/light/mang-oud.svg";
import omgStoryLight from "@/assets/story/light/omg.svg";
import amberChocolatStoryLight from "@/assets/story/light/amber-chocolat.svg";
import cestLaVieStoryLight from "@/assets/story/light/cest-la-vie.svg";
import karmaScotchStoryLight from "@/assets/story/light/karma-scotch.svg";
import corintoKushStoryLight from "@/assets/story/light/corinto-kush.svg";
import lotoStoryLight from "@/assets/story/light/loto.svg";

import type { Lang } from "@/i18n/translations";

/** A string that exists in both site languages. */
type L = { es: string; en: string };

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
  storyImageDark: string;
  storyImageLight: string;
};

type ProductSource = Omit<
  Product,
  "chapter" | "family" | "notes" | "story" | "ingredients" | "origin" | "concentration"
> & {
  chapter: L;
  family: L;
  notes: [L, L, L];
  story: L;
  ingredients: L;
  origin: L;
  concentration: L;
};

const productSources: ProductSource[] = [
  {
    slug: "neroli-negro",
    name: "Neroli Negro",
    chapter: { es: "Capítulo I", en: "Chapter I" },
    family: { es: "Floral Noir", en: "Floral Noir" },
    price: 590,
    notes: [
      { es: "Neroli", en: "Neroli" },
      { es: "Pimienta Negra", en: "Black Pepper" },
      { es: "Almizcle", en: "Musk" },
    ],
    story: {
      es: "Azahar arrastrado a la oscuridad. Neroli Negro abre luminoso y se vuelve opaco en minutos — una flor blanca fotografiada a medianoche, puro contraste y sin disculpas.",
      en: "Orange blossom pulled into the dark. Neroli Negro opens luminous and turns opaque within minutes — a white flower photographed at midnight, all contrast and no apology.",
    },
    ingredients: {
      es: "Absoluto de neroli destilado al vapor, pimienta negra quebrada y una base limpia de almizcle blanco, en capas para mantener el corazón floral nítido en lugar de dulce.",
      en: "Steam-distilled neroli absolute, cracked black peppercorn, and a clean white musk base, layered to keep the floral heart sharp rather than sweet.",
    },
    origin: {
      es: "El neroli se cosecha en los naranjales amargos de la península de Cap Bon, en Túnez, y se destila pocas horas después de la recolección para conservar su filo verde, casi amargo.",
      en: "The neroli is harvested from bitter orange groves along Tunisia's Cap Bon peninsula, distilled within hours of picking to preserve its green, almost bitter edge.",
    },
    concentration: { es: "Extrait de Parfum · 22%", en: "Extrait de Parfum · 22%" },
    size: "50 ml",
    image: neroliNegro,
    storyImageDark: neroliNegroStoryDark,
    storyImageLight: neroliNegroStoryLight,
  },
  {
    slug: "tobacco-blanco",
    name: "Tobacco Blanco",
    chapter: { es: "Capítulo II", en: "Chapter II" },
    family: { es: "Ámbar Tabaco", en: "Amber Tobacco" },
    price: 640,
    notes: [
      { es: "Tabaco Rubio", en: "Blond Tobacco" },
      { es: "Tonka", en: "Tonka" },
      { es: "Higo Seco", en: "Dried Fig" },
    ],
    story: {
      es: "La calidez de la hoja curada sin el humo. Tobacco Blanco es una dulzura pálida y empolvada que permanece en la lana y en la piel mucho después de que la sala se ha vaciado.",
      en: "The warmth of cured leaf without the smoke. Tobacco Blanco is a pale, powdered sweetness that lingers on wool and skin long after the room has emptied.",
    },
    ingredients: {
      es: "Absoluto de hoja de tabaco rubio Virginia, haba tonka rica en cumarina y un acorde de higo seco para una nota frutal que nunca se vuelve empalagosa.",
      en: "Blond Virginia tobacco leaf absolute, tonka bean rich in coumarin, and a dried fig accord for a fruit note that never turns jammy.",
    },
    origin: {
      es: "La hoja de tabaco se cura en el valle del Cibao, en República Dominicana, y se añeja lentamente antes de la destilación para suavizarla hasta algo más cercano al heno que al humo.",
      en: "The tobacco leaf is cured in the Cibao valley of the Dominican Republic, aged slowly before distillation to soften it into something closer to hay than smoke.",
    },
    concentration: { es: "Eau de Parfum · 20%", en: "Eau de Parfum · 20%" },
    size: "50 ml",
    image: tobaccoBlanco,
    storyImageDark: tobaccoBlancoStoryDark,
    storyImageLight: tobaccoBlancoStoryLight,
  },
  {
    slug: "fresh-vetiver",
    name: "Fresh Vetiver",
    chapter: { es: "Capítulo III", en: "Chapter III" },
    family: { es: "Amaderado Verde", en: "Woody Green" },
    price: 620,
    notes: [
      { es: "Vetiver de Haití", en: "Haitian Vetiver" },
      { es: "Pomelo", en: "Grapefruit" },
      { es: "Cedro Seco", en: "Dry Cedar" },
    ],
    story: {
      es: "Raíces lavadas hasta quedar limpias. Un golpe cítrico brillante sobre tierra aún húmeda de lluvia, hecho para el calor y las tardes largas.",
      en: "Roots washed clean. A bright citrus strike over earth still damp from rain, built for heat and long afternoons.",
    },
    ingredients: {
      es: "Aceite de raíz de vetiver extraída a mano, pomelo rosado prensado en frío y un acorde de cedro seco que evita que la composición se vuelva dulce.",
      en: "Hand-dug vetiver root oil, cold-pressed pink grapefruit, and a dry cedarwood accord that keeps the composition from ever turning sweet.",
    },
    origin: {
      es: "La raíz de vetiver se extrae y se lava a mano cerca de Les Cayes, Haití, considerado todavía el mejor terroir del mundo para esta hierba.",
      en: "The vetiver root is dug and hand-washed near Les Cayes, Haiti, still regarded as the finest terroir for the grass anywhere in the world.",
    },
    concentration: { es: "Eau de Parfum · 18%", en: "Eau de Parfum · 18%" },
    size: "50 ml",
    image: freshVetiver,
    storyImageDark: freshVetiverStoryDark,
    storyImageLight: freshVetiverStoryLight,
  },
  {
    slug: "koshu",
    name: "Koshu",
    chapter: { es: "Capítulo IV", en: "Chapter IV" },
    family: { es: "Té Verde Almizcle", en: "Green Tea Musk" },
    price: 660,
    notes: [
      { es: "Té Verde", en: "Green Tea" },
      { es: "Yuzu", en: "Yuzu" },
      { es: "Almizcle Blanco", en: "White Musk" },
    ],
    story: {
      es: "El minimalismo como disciplina. Koshu es una composición silenciosa — hoja infusionada, cítrico frío y un almizcle que se lee como piel y no como perfume.",
      en: "Minimalism as a discipline. Koshu is a quiet composition — steeped leaf, cold citrus, and a musk that reads as skin rather than perfume.",
    },
    ingredients: {
      es: "Té verde sencha cultivado a la sombra, cáscara de yuzu prensada en frío y un almizcle blanco transparente creado para desaparecer en el aroma propio de quien lo lleva.",
      en: "Shade-grown sencha green tea, cold-pressed yuzu peel, and a transparent white musk built to disappear into the wearer's own scent.",
    },
    origin: {
      es: "La hoja de té se cultiva en las laderas brumosas de Koshu, en la prefectura japonesa de Yamanashi, recogida a mano en la primera cosecha de primavera.",
      en: "The tea leaf is grown in the misted hillsides of Koshu, in Japan's Yamanashi prefecture, hand-picked in the first spring flush.",
    },
    concentration: { es: "Eau de Parfum · 18%", en: "Eau de Parfum · 18%" },
    size: "50 ml",
    image: koshu,
    storyImageDark: koshuStoryDark,
    storyImageLight: koshuStoryLight,
  },
  {
    slug: "mang-oud",
    name: "Mang Oud",
    chapter: { es: "Capítulo V", en: "Chapter V" },
    family: { es: "Oud Frutal", en: "Fruity Oud" },
    price: 690,
    notes: [
      { es: "Oud de Camboya", en: "Cambodian Oud" },
      { es: "Mango", en: "Mango" },
      { es: "Azafrán", en: "Saffron" },
    ],
    story: {
      es: "Fruta tropical contra madera resinosa — la colisión que define a la casa. La dulzura colombiana se encuentra con la gravedad emiratí en un solo acorde.",
      en: "Tropical fruit against resinous wood — the collision that defines the house. Colombian sweetness meets Emirati gravity in a single accord.",
    },
    ingredients: {
      es: "Aceite de oud camboyano de recolección silvestre, acorde de mango maduro y un hilo de azafrán de Cachemira para dar calidez sin volverse medicinal.",
      en: "Wild-harvested Cambodian oud oil, ripe mango accord, and a thread of Kashmiri saffron for warmth without turning medicinal.",
    },
    origin: {
      es: "El oud se destila en los bosques de Pursat, en Camboya, y luego se añeja y se mezcla en Dubái, donde la casa prueba cada lote contra el calor de la región.",
      en: "The oud is distilled in Cambodia's Pursat forests, then aged and blended in Dubai, where the house tests every batch against the region's heat.",
    },
    concentration: { es: "Extrait de Parfum · 24%", en: "Extrait de Parfum · 24%" },
    size: "50 ml",
    image: mangOud,
    storyImageDark: mangOudStoryDark,
    storyImageLight: mangOudStoryLight,
  },
  {
    slug: "omg",
    name: "OMG",
    chapter: { es: "Capítulo VI", en: "Chapter VI" },
    family: { es: "Especiado Ambarado", en: "Ambery Spice" },
    price: 640,
    notes: [
      { es: "Ámbar", en: "Amber" },
      { es: "Canela", en: "Cinnamon" },
      { es: "Benjuí", en: "Benzoin" },
    ],
    story: {
      es: "Ruidoso, a propósito. OMG es la casa a todo volumen: especia, resina y una curva de proyección que llena una sala en menos de un minuto.",
      en: "Loud, on purpose. OMG is the house at full volume: spice, resin and a projection curve that fills a room in under a minute.",
    },
    ingredients: {
      es: "Resina de ámbar mineral, corteza de canela de Ceilán y benjuí de Laos, llevados a concentraciones que la mayoría de las casas reservan solo para su línea extrait.",
      en: "Mineral amber resin, Ceylon cinnamon bark, and Laotian benzoin, pushed to concentrations most houses reserve for their extrait line alone.",
    },
    origin: {
      es: "La corteza de canela proviene de las colinas de Kandy, en Sri Lanka, y la resina de benjuí se extrae de árboles de estoraque en Laos, para luego resolverse en el laboratorio de la casa.",
      en: "The cinnamon bark is sourced from Sri Lanka's Kandy hills and the benzoin resin tapped from Laotian styrax trees, then resolved in the house lab.",
    },
    concentration: { es: "Extrait de Parfum · 22%", en: "Extrait de Parfum · 22%" },
    size: "50 ml",
    image: omg,
    storyImageDark: omgStoryDark,
    storyImageLight: omgStoryLight,
  },
  {
    slug: "amber-chocolat",
    name: "Amber Chocolat",
    chapter: { es: "Capítulo VII", en: "Chapter VII" },
    family: { es: "Ámbar Gourmand", en: "Gourmand Amber" },
    price: 650,
    notes: [
      { es: "Cacao", en: "Cacao" },
      { es: "Ámbar", en: "Amber" },
      { es: "Café Colombiano", en: "Colombian Coffee" },
    ],
    story: {
      es: "Bogotá a las 6 de la mañana — cacao amargo, tueste oscuro y ámbar derritiéndose por debajo. Gourmand sin convertirse nunca en postre.",
      en: "Bogotá at 6am — bitter cacao, dark roast, and amber melting underneath. Gourmand without ever turning to dessert.",
    },
    ingredients: {
      es: "Absoluto de cacao de tueste oscuro, extracto de café colombiano de origen único y una base de ámbar mineral que mantiene la dulzura contenida.",
      en: "Dark-roasted cacao absolute, single-origin Colombian coffee extract, and a mineral amber base that keeps the sweetness restrained.",
    },
    origin: {
      es: "El cacao y el café provienen de pequeñas fincas del departamento del Huila, en Colombia, y se tuestan localmente antes de la extracción.",
      en: "Cacao and coffee are both sourced from smallholder farms in Colombia's Huila department, roasted locally before extraction.",
    },
    concentration: { es: "Extrait de Parfum · 22%", en: "Extrait de Parfum · 22%" },
    size: "50 ml",
    image: amberChocolat,
    storyImageDark: amberChocolatStoryDark,
    storyImageLight: amberChocolatStoryLight,
  },
  {
    slug: "cest-la-vie",
    name: "C'est La Vie",
    chapter: { es: "Capítulo VIII", en: "Chapter VIII" },
    family: { es: "Chipre de Rosa", en: "Rose Chypre" },
    price: 610,
    notes: [
      { es: "Rosa de Damasco", en: "Damask Rose" },
      { es: "Pachulí", en: "Patchouli" },
      { es: "Pimienta Rosa", en: "Pink Pepper" },
    ],
    story: {
      es: "Una rosa que se encoge de hombros. Pimentada, terrosa y nada sentimental — el antídoto contra todo floral educado que hayas llevado antes.",
      en: "A rose that shrugs. Peppered, earthy and unsentimental — the antidote to every polite floral you have worn before.",
    },
    ingredients: {
      es: "Absoluto de rosa de Damasco destilado al vapor, pachulí oscuro de Indonesia y aceite de pimienta rosa para un rasguño en las notas de salida.",
      en: "Steam-distilled damask rose absolute, dark Indonesian patchouli, and pink peppercorn oil for a rasp across the top notes.",
    },
    origin: {
      es: "La rosa se cosecha al amanecer en el Valle de las Rosas, en Bulgaria, antes de que el sol evapore los aceites que dan al absoluto su profundidad.",
      en: "The rose is harvested at dawn in Bulgaria's Rose Valley, before the sun burns off the oils that give the absolute its depth.",
    },
    concentration: { es: "Eau de Parfum · 20%", en: "Eau de Parfum · 20%" },
    size: "50 ml",
    image: cestLaVie,
    storyImageDark: cestLaVieStoryDark,
    storyImageLight: cestLaVieStoryLight,
  },
  {
    slug: "karma-scotch",
    name: "Karma Scotch",
    chapter: { es: "Capítulo IX", en: "Chapter IX" },
    family: { es: "Maderas Licorosas", en: "Boozy Woods" },
    price: 670,
    notes: [
      { es: "Whisky Turbado", en: "Peated Whisky" },
      { es: "Roble", en: "Oak" },
      { es: "Absoluto de Vainilla", en: "Vanilla Absolute" },
    ],
    story: {
      es: "Destilado de una hora tardía. Barrica ahumada, espíritu dulce y vainilla sin diluir — una fragancia con la temperatura de un trago recién servido.",
      en: "Distilled from a late hour. Smoked barrel, sweet spirit and vanilla left uncut — a fragrance with the temperature of a poured dram.",
    },
    ingredients: {
      es: "Un acorde de whisky turbado construido sobre malta ahumada, roble americano extraído de duelas de ex-bourbon y absoluto de vainilla entera de Madagascar.",
      en: "A peated whisky accord built on smoked malt, American oak extracted from ex-bourbon staves, and whole Madagascar vanilla absolute.",
    },
    origin: {
      es: "El carácter de turba está inspirado en barricas añejadas en la costa de Islay, Escocia, donde la brisa marina y el humo son inseparables del espíritu.",
      en: "The peat character is modeled on barrels aged on Scotland's Islay coast, where sea spray and smoke are inseparable from the spirit.",
    },
    concentration: { es: "Extrait de Parfum · 22%", en: "Extrait de Parfum · 22%" },
    size: "50 ml",
    image: karmaScotch,
    storyImageDark: karmaScotchStoryDark,
    storyImageLight: karmaScotchStoryLight,
  },
  {
    slug: "corinto-kush",
    name: "Corinto Kush",
    chapter: { es: "Capítulo X", en: "Chapter X" },
    family: { es: "Resina Verde", en: "Green Resin" },
    price: 680,
    notes: [
      { es: "Hoja de Cáñamo", en: "Hemp Leaf" },
      { es: "Gálbano", en: "Galbanum" },
      { es: "Ládano", en: "Labdanum" },
    ],
    story: {
      es: "Verde crudo triturado entre los dedos. Corinto Kush es herbáceo y resinoso, un valle colombiano convertido en absoluto.",
      en: "Raw green crushed between fingers. Corinto Kush is herbaceous and resinous, a Colombian valley rendered in absolute.",
    },
    ingredients: {
      es: "Un acorde de hoja de cáñamo, resina de gálbano verde-amarga y absoluto de ládano para una base que se vuelve ambarina y cálida al asentarse.",
      en: "A hemp leaf accord, bitter-green galbanum resin, and labdanum absolute for a base that turns amber and warm as it settles.",
    },
    origin: {
      es: "Inspirado en el valle del Cauca alrededor de Corinto, Colombia, donde la casa registró por primera vez el mordisco exacto de la hoja triturada contra la piedra húmeda.",
      en: "Modeled on the Cauca valley around Corinto, Colombia, where the house first noted the exact bite of crushed leaf against wet stone.",
    },
    concentration: { es: "Extrait de Parfum · 22%", en: "Extrait de Parfum · 22%" },
    size: "50 ml",
    image: corintoKush,
    storyImageDark: corintoKushStoryDark,
    storyImageLight: corintoKushStoryLight,
  },
  {
    slug: "loto",
    name: "Loto",
    chapter: { es: "Capítulo XI", en: "Chapter XI" },
    family: { es: "Floral Acuático", en: "Aquatic Floral" },
    price: 630,
    notes: [
      { es: "Loto", en: "Lotus" },
      { es: "Nenúfar", en: "Water Lily" },
      { es: "Ambreta", en: "Ambrette" },
    ],
    story: {
      es: "Quietud embotellada. Loto flota — pétalos frescos sobre agua limpia, cerrando en una ambreta suave que nunca levanta la voz.",
      en: "Stillness bottled. Loto floats — cool petals over clean water, closing on a soft ambrette that never raises its voice.",
    },
    ingredients: {
      es: "Absoluto de loto azul, un acorde transparente de nenúfar y extracto de semilla de ambreta en lugar del almizcle, sin ninguna nota animal.",
      en: "Blue lotus absolute, a transparent water lily accord, and ambrette seed extract standing in for musk without any animal note.",
    },
    origin: {
      es: "El loto azul se cultiva en estanques poco profundos del delta del Nilo, en Egipto, y todavía se cosecha a mano con la primera luz, cuando las flores se abren.",
      en: "The blue lotus is grown in shallow ponds along the Nile delta in Egypt, still harvested by hand at first light as the flowers open.",
    },
    concentration: { es: "Eau de Parfum · 18%", en: "Eau de Parfum · 18%" },
    size: "50 ml",
    image: loto,
    storyImageDark: lotoStoryDark,
    storyImageLight: lotoStoryLight,
  },
];

const localize = (p: ProductSource, lang: Lang): Product => ({
  slug: p.slug,
  name: p.name,
  chapter: p.chapter[lang],
  family: p.family[lang],
  price: p.price,
  notes: [p.notes[0][lang], p.notes[1][lang], p.notes[2][lang]],
  story: p.story[lang],
  ingredients: p.ingredients[lang],
  origin: p.origin[lang],
  concentration: p.concentration[lang],
  size: p.size,
  image: p.image,
  storyImageDark: p.storyImageDark,
  storyImageLight: p.storyImageLight,
});

const cache: Record<Lang, Product[]> = {
  es: productSources.map((p) => localize(p, "es")),
  en: productSources.map((p) => localize(p, "en")),
};

/** Full catalogue in the given language. */
export const getProducts = (lang: Lang): Product[] => cache[lang];

export const getProduct = (slug: string, lang: Lang) => cache[lang].find((p) => p.slug === slug);

export const getAdjacent = (slug: string, lang: Lang) => {
  const list = cache[lang];
  const index = list.findIndex((p) => p.slug === slug);
  if (index === -1) return null;
  const total = list.length;
  const prev = list[(index - 1 + total) % total]!;
  const next = list[(index + 1) % total]!;
  return { prev, next, index, total };
};

export const formatAED = (n: number) => `${n.toLocaleString("en-US")} AED`;
