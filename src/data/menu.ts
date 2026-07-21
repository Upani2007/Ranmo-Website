import type { CrabSize } from "./types";

// Static, site-structure-only data. Live menu items/prices come from the
// published Google Sheet — see `src/data/menu-source.ts` (`getMenu()`).

export const SERVICE_CHARGE_NOTE = "All prices are subject to a 10% service charge.";

export const CRAB_SIZES: CrabSize[] = [
  { label: "M", weightRange: "300g – 500g", pricePer100g: 2150 },
  { label: "L", weightRange: "500g – 700g", pricePer100g: 2150 },
  { label: "XL", weightRange: "700g – 900g", pricePer100g: 2350 },
  { label: "XXL", weightRange: "900g – 1.2kg", pricePer100g: 2750 },
  { label: "JUMBO", weightRange: "1.2kg up", pricePer100g: 3200 },
];
