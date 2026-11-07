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

import neroliNegroNotes from "@/assets/notes/neroli-negro.svg";
import tobaccoBlancoNotes from "@/assets/notes/tobacco-blanco.svg";
import freshVetiverNotes from "@/assets/notes/fresh-vetiver.svg";
import koshuNotes from "@/assets/notes/koshu.svg";
import mangOudNotes from "@/assets/notes/mang-oud.svg";
import omgNotes from "@/assets/notes/omg.svg";
import amberChocolatNotes from "@/assets/notes/amber-chocolat.svg";
import cestLaVieNotes from "@/assets/notes/cest-la-vie.svg";
import karmaScotchNotes from "@/assets/notes/karma-scotch.svg";
import corintoKushNotes from "@/assets/notes/corinto-kush.svg";
import lotoNotes from "@/assets/notes/loto.svg";

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

import { COP_PER_USD, type Prices } from "@/lib/currency";
import type { Lang } from "@/i18n/translations";

/** A string that exists in both site languages. */
type L = { es: string; en: string };

export type Product = {
  slug: string;
  name: string;
  chapter: string;
  family: string;
  profile: string;
  prices: Prices;
  notes: string[];
  story: string;
  ingredients: string;
  origin: string;
  concentration: string;
  size: string;
  image: string;
  notesImage: string;
  storyImageDark: string;
  storyImageLight: string;
};

type ProductSource = Omit<
  Product,
  "chapter" | "family" | "profile" | "notes" | "story" | "ingredients" | "origin" | "concentration"
> & {
  chapter: L;
  family: L;
  profile: L;
  notes: L[];
  story: L;
  ingredients: L;
  origin: L;
  concentration: L;
};

const prices = (AED: number, USD: number): Prices => ({ AED, USD, COP: USD * COP_PER_USD });

const productSources: ProductSource[] = [
  {
    slug: "neroli-negro",
    name: "Neroli Negro",
    chapter: { es: "Capítulo I", en: "Chapter I" },
    family: { es: "Floral Noir", en: "Floral Noir" },
    profile: { es: "Potente · Cítrico · Floral · Denso · Duradero", en: "Powerful · Citrus · Floral · Dense · Long-lasting" },
    prices: prices(1140, 330),
    notes: [
      { es: "Neroli", en: "Neroli" },
      { es: "Whisky", en: "Whisky" },
      { es: "Rosa", en: "Rose" },
      { es: "Oud", en: "Oud" },
      { es: "Incienso", en: "Incense" },
    ],
    story: {
      es: "Considerado el rey de la colección, Neroli Negro es conocido por su potencia y persistencia. Abre con neroli y whisky, seguido de un corazón de rosa y una base densa de oud e incienso.",
      en: "Regarded as the king of the collection, Neroli Negro is known for its power and persistence. It opens with neroli and whisky, followed by a heart of rose and a dense base of oud and incense.",
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
    size: "100 ml",
    image: neroliNegro,
    notesImage: neroliNegroNotes,
    storyImageDark: neroliNegroStoryDark,
    storyImageLight: neroliNegroStoryLight,
  },
  {
    slug: "tobacco-blanco",
    name: "Tobacco Blanco",
    chapter: { es: "Capítulo II", en: "Chapter II" },
    family: { es: "Ámbar Tabaco", en: "Amber Tobacco" },
    profile: { es: "Tabaco · Fresco · Seco · Unisex · Distintivo", en: "Tobacco · Fresh · Dry · Unisex · Distinctive" },
    prices: prices(980, 280),
    notes: [
      { es: "Toronja", en: "Grapefruit" },
      { es: "Café", en: "Coffee" },
      { es: "Palo santo", en: "Palo Santo" },
      { es: "Vainilla", en: "Vanilla" },
      { es: "Tabaco", en: "Tobacco" },
      { es: "Corteza de roble", en: "Oak bark" },
    ],
    story: {
      es: "Construida sobre el contraste entre el tabaco profundo y la frescura frutal de la toronja. El café aporta un sutil toque de apertura, mientras que el palo santo, la vainilla, el tabaco y la corteza de roble crean una estela masculina, seca y distintiva.",
      en: "Built on the contrast between deep tobacco and the fruity freshness of grapefruit. Coffee adds a subtle opening touch, while palo santo, vanilla, tobacco and oak bark create a masculine, dry and distinctive trail.",
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
    size: "100 ml",
    image: tobaccoBlanco,
    notesImage: tobaccoBlancoNotes,
    storyImageDark: tobaccoBlancoStoryDark,
    storyImageLight: tobaccoBlancoStoryLight,
  },
  {
    slug: "fresh-vetiver",
    name: "Fresh Vetiver",
    chapter: { es: "Capítulo III", en: "Chapter III" },
    family: { es: "Amaderado Verde", en: "Woody Green" },
    profile: { es: "Fresco · Verde · Amaderado · Elegante · Seco", en: "Fresh · Green · Woody · Elegant · Dry" },
    prices: prices(780, 220),
    notes: [
      { es: "Cítricos", en: "Citrus" },
      { es: "Hierbas aromáticas", en: "Aromatic Herbs" },
      { es: "Vetiver", en: "Vetiver" },
      { es: "Madera de cedro", en: "Cedarwood" },
      { es: "Almizcle", en: "Musk" },
    ],
    story: {
      es: "Una reinterpretación contemporánea del vetiver: limpia, luminosa y elegante. Fresh Vetiver se aleja del perfil terroso tradicional para revelar una composición fresca, seca y sofisticada.",
      en: "A contemporary reinterpretation of vetiver: clean, luminous and elegant. Fresh Vetiver moves away from the traditional earthy profile to reveal a fresh, dry and sophisticated composition.",
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
    size: "100 ml",
    image: freshVetiver,
    notesImage: freshVetiverNotes,
    storyImageDark: freshVetiverStoryDark,
    storyImageLight: freshVetiverStoryLight,
  },
  {
    slug: "koshu",
    name: "Koshu",
    chapter: { es: "Capítulo IV", en: "Chapter IV" },
    family: { es: "Té Verde Almizcle", en: "Green Tea Musk" },
    profile: { es: "Frutal · Cálido · Ambarado · Sofisticado · Elegante", en: "Fruity · Warm · Ambery · Sophisticated · Elegant" },
    prices: prices(1060, 280),
    notes: [
      { es: "Cereza", en: "Cherry" },
      { es: "Mandarina", en: "Mandarin" },
      { es: "Ambroxan", en: "Ambroxan" },
      { es: "Rosa", en: "Rose" },
      { es: "Bálsamo de Sumatra", en: "Sumatra balsam" },
      { es: "Castóreo", en: "Castoreum" },
      { es: "Oud", en: "Oud" },
    ],
    story: {
      es: "Una fragancia unisex y versátil, construida sobre el equilibrio entre frescura y profundidad. La cereza abre con un dulzor jugoso, la mandarina aporta luminosidad, y la rosa y el ambroxan conducen a una base cálida de bálsamos, castóreo y oud.",
      en: "A unisex and versatile fragrance built on the balance between freshness and depth. Cherry opens with juicy sweetness, mandarin adds brightness, while rose and ambroxan lead into a warm base of balsams, castoreum and oud.",
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
    size: "100 ml",
    image: koshu,
    notesImage: koshuNotes,
    storyImageDark: koshuStoryDark,
    storyImageLight: koshuStoryLight,
  },
  {
    slug: "mang-oud",
    name: "Mang Oud",
    chapter: { es: "Capítulo V", en: "Chapter V" },
    family: { es: "Oud Frutal", en: "Fruity Oud" },
    profile: { es: "Natural · Exótico · Oud · Frutal · Artístico", en: "Natural · Exotic · Oud · Fruity · Artistic" },
    prices: prices(980, 280),
    notes: [
      { es: "Mango", en: "Mango" },
      { es: "Oud natural certificado", en: "Certified natural oud" },
      { es: "Oud de Camboya", en: "Cambodian oud" },
      { es: "Oud hindi", en: "Hindi oud" },
      { es: "Oud Prashine", en: "Prashine oud" },
    ],
    story: {
      es: "Mangoud abre la línea de private blends de The Lab: una dirección más natural y artística, enfocada en materias primas exóticas, aceites puros y una calidad de ingredientes sin concesiones. Su composición se define por un oud natural certificado, que aporta profundidad, autenticidad y carácter, combinado con la presencia jugosa del mango latino.",
      en: "Mangoud opens The Lab's private blends line: a more natural and artistic direction focused on exotic raw materials, pure oils and uncompromising ingredient quality. Its composition is defined by certified natural oud, bringing depth, authenticity and character, combined with the juicy presence of Latin mango.",
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
    size: "100 ml",
    image: mangOud,
    notesImage: mangOudNotes,
    storyImageDark: mangOudStoryDark,
    storyImageLight: mangOudStoryLight,
  },
  {
    slug: "omg",
    name: "OMG",
    chapter: { es: "Capítulo VI", en: "Chapter VI" },
    family: { es: "Especiado Ambarado", en: "Ambery Spice" },
    profile: { es: "Dulce · Terroso · Amaderado · Elegante · Moderno", en: "Sweet · Earthy · Woody · Elegant · Modern" },
    prices: prices(780, 220),
    notes: [
      { es: "Miel", en: "Honey" },
      { es: "Vetiver", en: "Vetiver" },
      { es: "Vainilla", en: "Vanilla" },
      { es: "Oud", en: "Oud" },
      { es: "Rosa", en: "Rose" },
    ],
    story: {
      es: "Una fragancia unisex de vanguardia con una estructura sofisticada. La miel aporta un dulzor envolvente, mientras que el vetiver y el oud suman profundidad terrosa y estructura. La vainilla suaviza la composición con un dulzor delicado, y la rosa refuerza una estela elegante y moderna.",
      en: "A vanguard unisex fragrance with a sophisticated structure. Honey brings enveloping sweetness, while vetiver and oud add earthy depth and structure. Vanilla softens the composition with delicate sweetness, and rose reinforces an elegant, modern trail.",
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
    size: "100 ml",
    image: omg,
    notesImage: omgNotes,
    storyImageDark: omgStoryDark,
    storyImageLight: omgStoryLight,
  },
  {
    slug: "amber-chocolat",
    name: "Amber Chocolat",
    chapter: { es: "Capítulo VII", en: "Chapter VII" },
    family: { es: "Ámbar Gourmand", en: "Gourmand Amber" },
    profile: { es: "Gourmand · Sensual · Ambarado · Oriental · Envolvente", en: "Gourmand · Sensual · Ambery · Oriental · Enveloping" },
    prices: prices(925, 260),
    notes: [
      { es: "Chocolate", en: "Chocolate" },
      { es: "Tabaco", en: "Tobacco" },
      { es: "Ámbar gris", en: "Ambergris" },
      { es: "Notas ambaradas", en: "Ambery notes" },
      { es: "Ambroxan", en: "Ambroxan" },
      { es: "Benjuí", en: "Benzoin" },
      { es: "Clavo", en: "Cloves" },
    ],
    story: {
      es: "El segundo gourmand de la colección y su fragancia más sensual, pensada para momentos especiales, la noche y la intimidad. El chocolate amargo abre con un toque de dulzor de tabaco, mientras que el ámbar gris y las notas ambaradas aportan profundidad, sensualidad y un fondo complejo.",
      en: "The collection's second gourmand and most sensual fragrance, designed for special moments, nighttime and intimacy. Bitter chocolate opens with a touch of tobacco sweetness, while ambergris and ambery notes bring depth, sensuality and a complex dry-down.",
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
    size: "100 ml",
    image: amberChocolat,
    notesImage: amberChocolatNotes,
    storyImageDark: amberChocolatStoryDark,
    storyImageLight: amberChocolatStoryLight,
  },
  {
    slug: "cest-la-vie",
    name: "C'est La Vie",
    chapter: { es: "Capítulo VIII", en: "Chapter VIII" },
    family: { es: "Chipre de Rosa", en: "Rose Chypre" },
    profile: { es: "Amaderado · Fresco · Terroso · Resinoso · Sofisticado", en: "Woody · Fresh · Earthy · Resinous · Sophisticated" },
    prices: prices(780, 220),
    notes: [
      { es: "Azahar", en: "Orange blossom" },
      { es: "Manzana", en: "Apple" },
      { es: "Cáscara de naranja", en: "Orange peel" },
      { es: "Pachulí", en: "Patchouli" },
      { es: "Oud", en: "Oud" },
    ],
    story: {
      es: "Una fragancia unisex amaderada, construida sobre una apertura fresca de azahar y manzana, realzada por la luminosidad cítrica de la cáscara de naranja.",
      en: "A woody unisex fragrance built on a fresh opening of orange blossom and apple, enhanced by the citrus brightness of orange peel.",
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
    size: "100 ml",
    image: cestLaVie,
    notesImage: cestLaVieNotes,
    storyImageDark: cestLaVieStoryDark,
    storyImageLight: cestLaVieStoryLight,
  },
  {
    slug: "karma-scotch",
    name: "Karma Scotch",
    chapter: { es: "Capítulo IX", en: "Chapter IX" },
    family: { es: "Maderas Licorosas", en: "Boozy Woods" },
    profile: { es: "Ámbar · Licoroso · Cálido · Suave · Elegante", en: "Amber · Boozy · Warm · Smooth · Elegant" },
    prices: prices(780, 220),
    notes: [
      { es: "Whisky", en: "Whisky" },
      { es: "Amaretto", en: "Amaretto" },
      { es: "Vainilla", en: "Vanilla" },
      { es: "Ámbar", en: "Amber" },
      { es: "Corteza de roble", en: "Oak bark" },
    ],
    story: {
      es: "Una fragancia ambarada de perfil licoroso que evoca la calidez de un whisky fino. La vainilla aporta suavidad y redondez, mientras que el ámbar y la corteza de roble refuerzan un carácter elegante, denso y duradero.",
      en: "An amber fragrance with a boozy profile that evokes the warmth of fine whisky. Vanilla adds smoothness and roundness, while amber and oak bark reinforce an elegant, dense and long-lasting character.",
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
    size: "100 ml",
    image: karmaScotch,
    notesImage: karmaScotchNotes,
    storyImageDark: karmaScotchStoryDark,
    storyImageLight: karmaScotchStoryLight,
  },
  {
    slug: "corinto-kush",
    name: "Corinto Kush",
    chapter: { es: "Capítulo X", en: "Chapter X" },
    family: { es: "Resina Verde", en: "Green Resin" },
    profile: { es: "Verde · Punzante · Resinoso · Denso · Magnético", en: "Green · Sharp · Resinous · Dense · Magnetic" },
    prices: prices(925, 250),
    notes: [
      { es: "Maracuyá", en: "Passion fruit" },
      { es: "Cannabis", en: "Cannabis" },
      { es: "Resinas balsámicas", en: "Balsamic resins" },
      { es: "Bálsamo de Tolú", en: "Tolu balsam" },
    ],
    story: {
      es: "Una fragancia distintiva construida alrededor del cannabis, inspirada en los paisajes montañosos de Colombia. La maracuyá aporta acidez exótica y frescura, mientras que el cannabis ofrece un carácter verde y resinoso, y profundidad aromática.",
      en: "A distinctive fragrance built around cannabis, inspired by the mountainous landscapes of Colombia. Passion fruit adds exotic acidity and freshness, while cannabis brings green, resinous character and aromatic depth.",
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
    size: "100 ml",
    image: corintoKush,
    notesImage: corintoKushNotes,
    storyImageDark: corintoKushStoryDark,
    storyImageLight: corintoKushStoryLight,
  },
  {
    slug: "loto",
    name: "Loto",
    chapter: { es: "Capítulo XI", en: "Chapter XI" },
    family: { es: "Floral Acuático", en: "Aquatic Floral" },
    profile: { es: "Floral limpio · Jugoso · Terroso · Sofisticado", en: "Clean floral · Juicy · Earthy · Sophisticated" },
    prices: prices(780, 220),
    notes: [
      { es: "Flor de loto", en: "Lotus flower" },
      { es: "Toronja", en: "Grapefruit" },
      { es: "Granada", en: "Pomegranate" },
      { es: "Orquídea", en: "Orchid" },
      { es: "Vetiver", en: "Vetiver" },
    ],
    story: {
      es: "Una fragancia unisex construida alrededor de la flor de loto, con un carácter floral limpio y un equilibrio entre luminosidad y profundidad.",
      en: "A unisex fragrance built around lotus flower, with a clean floral character and a balance between brightness and depth.",
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
    size: "100 ml",
    image: loto,
    notesImage: lotoNotes,
    storyImageDark: lotoStoryDark,
    storyImageLight: lotoStoryLight,
  },
];

const localize = (p: ProductSource, lang: Lang): Product => ({
  slug: p.slug,
  name: p.name,
  chapter: p.chapter[lang],
  family: p.family[lang],
  profile: p.profile[lang],
  prices: p.prices,
  notes: p.notes.map((note) => note[lang]),
  story: p.story[lang],
  ingredients: p.ingredients[lang],
  origin: p.origin[lang],
  concentration: p.concentration[lang],
  size: p.size,
  image: p.image,
  notesImage: p.notesImage,
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

