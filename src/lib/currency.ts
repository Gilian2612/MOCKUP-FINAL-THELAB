export const CURRENCIES = ["AED", "USD", "COP"] as const;
export type Currency = (typeof CURRENCIES)[number];
export type Prices = Record<Currency, number>;

/**
 * TEMPORARY: there is no official COP price list yet, so COP is USD times this
 * rate. Replace it with the real COP prices before publishing.
 */
export const COP_PER_USD = 4000;

export const SHIPPING: Prices = { AED: 45, USD: 12, COP: 12 * COP_PER_USD };

const GULF_TIME_ZONES = new Set([
  "Asia/Dubai",
  "Asia/Muscat",
  "Asia/Riyadh",
  "Asia/Kuwait",
  "Asia/Qatar",
  "Asia/Bahrain",
]);

/** Best guess from the visitor's device time zone: Colombia, the Gulf, or the rest. */
export function detectCurrency(): Currency {
  const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (zone === "America/Bogota") return "COP";
  return GULF_TIME_ZONES.has(zone) ? "AED" : "USD";
}

export function formatPrice(amount: number, currency: Currency) {
  if (currency === "COP") return `$ ${amount.toLocaleString("es-CO")} COP`;
  if (currency === "USD") return `$ ${amount.toLocaleString("en-US")} USD`;
  return `${amount.toLocaleString("en-US")} AED`;
}
