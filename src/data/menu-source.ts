import "server-only";
import type { MenuCategory, MenuItem, Price, TabGroup } from "./types";

// Published Google Sheet (File > Share > Publish to web > CSV). Editing the
// sheet updates the live site on the next page load — no redeploy needed.
const MENU_SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTfFEbLn6-aVsdIKNf31fgnOfb5dg-9EBnzdSMIoi2g0SlJJq5rJ58w4dNyOe98AdxvkB1yzgUuVtxF/pub?gid=1608798132&single=true&output=csv";

// 0 = never cache; every page load fetches the sheet fresh, in both dev and
// production. Trades away Next's Data Cache (and the reduced Google Sheets
// request volume that comes with it) for menu changes always being current.
const REVALIDATE_SECONDS = 0;

// The sheet only carries flat "Category" names (e.g. "Bites – Beef"). Which
// tab those group under, and any per-category display note, is site
// structure rather than menu content, so it stays hardcoded here. A category
// in the sheet that isn't listed here still renders (under a fallback tab)
// but logs a warning so it can be added.
const FALLBACK_TAB_GROUP: TabGroup = "Set Menu & Sides";

const CATEGORY_CONFIG: Record<string, { tabGroup: TabGroup; note?: string; priceNoteWhenUnpriced?: string }> = {
  "Sri Lankan Mud Crab": {
    tabGroup: "Mud Crab",
    note: "Priced by weight — pick your size (see chart) for Kochchi, Garlic or Black Pepper Crab.",
    priceNoteWhenUnpriced: "Priced per 100g by size — see crab size chart",
  },
  "Main Course – Rice": { tabGroup: "Rice & Noodles" },
  "Main Course – Noodles": { tabGroup: "Rice & Noodles" },
  "Main Course – Meat": { tabGroup: "Meat & Fish" },
  "Main Course – Fish": { tabGroup: "Meat & Fish" },
  "Bites – Beef": { tabGroup: "Meat & Fish" },
  "Bites – Chicken": { tabGroup: "Meat & Fish" },
  "Bites – Mutton": { tabGroup: "Meat & Fish" },
  "Starters – Appetizer": { tabGroup: "Starters, Soups & Seafood Bites" },
  "Starters – Soups": { tabGroup: "Starters, Soups & Seafood Bites", note: "Served with bread & butter." },
  "Bites – Seafood": { tabGroup: "Starters, Soups & Seafood Bites" },
  Salads: { tabGroup: "Salads & Vegetables" },
  "Bites – Vegetables": { tabGroup: "Salads & Vegetables" },
  "Pizza – Thin Crust": { tabGroup: "Pizza & Pasta" },
  "Main Course – Pasta": { tabGroup: "Pizza & Pasta" },
  "Platters – BBQ Platters": { tabGroup: "Platters, Kottu & Sausages" },
  Kottu: { tabGroup: "Platters, Kottu & Sausages" },
  "Bites – Sausages": { tabGroup: "Platters, Kottu & Sausages" },
  "Set Menu": { tabGroup: "Set Menu & Sides" },
  "Bites – Omelette": { tabGroup: "Set Menu & Sides" },
  "Bites – Snacks": { tabGroup: "Set Menu & Sides" },
  Desserts: { tabGroup: "Desserts" },
  "Cool Drinks": { tabGroup: "Beverages" },
  "Milk Shakes": { tabGroup: "Beverages" },
  "Fresh Juice": { tabGroup: "Beverages" },
  "Ranmo Special Tea": { tabGroup: "Beverages" },
  "Pastries / Short Eats": { tabGroup: "Short Eats & Pastries" },
};

type ColumnKey = "category" | "itemName" | "description" | "smallPrice" | "largePrice" | "available";

const HEADER_TO_KEY: Record<string, ColumnKey> = {
  category: "category",
  "item name": "itemName",
  description: "description",
  "small price": "smallPrice",
  "large price": "largePrice",
  available: "available",
};

/** Minimal RFC4180-ish CSV parser: handles quoted fields, escaped quotes, and CRLF/LF. */
function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];

    if (inQuotes) {
      if (char === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += char;
      }
      continue;
    }

    if (char === '"') {
      inQuotes = true;
    } else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\n" || char === "\r") {
      if (char === "\r" && text[i + 1] === "\n") i++;
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += char;
    }
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  return rows.filter((r) => !(r.length === 1 && r[0].trim() === ""));
}

function slugify(value: string): string {
  return (
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "category"
  );
}

/** Returns the parsed number, `null` for a blank field, or `"invalid"` for unparseable input. */
function parsePrice(raw: string): number | null | "invalid" {
  if (raw.trim() === "") return null;
  const n = Number(raw.replace(/,/g, "").trim());
  if (!Number.isFinite(n) || n < 0) return "invalid";
  return n;
}

function mapHeader(headerRow: string[]): Partial<Record<ColumnKey, number>> {
  const map: Partial<Record<ColumnKey, number>> = {};
  headerRow.forEach((raw, index) => {
    const key = HEADER_TO_KEY[raw.trim().toLowerCase()];
    if (key) map[key] = index;
  });
  return map;
}

/**
 * Fetches and parses the published menu Google Sheet into the same
 * `MenuCategory[]` shape the site renders. Never cached (`REVALIDATE_SECONDS`
 * is 0), so every page load reflects the sheet's current state — sheet edits
 * (price changes, new items, `Available` toggles) show up without a redeploy.
 *
 * Malformed rows are skipped and logged rather than throwing, so one bad
 * row in the sheet can't take down the menu page. If the sheet can't be
 * fetched or parsed at all, an empty array is returned (also logged) and
 * the page falls back to an "unavailable" message instead of crashing.
 */
export async function getMenu(): Promise<MenuCategory[]> {
  let csvText: string;
  try {
    const res = await fetch(MENU_SHEET_CSV_URL, { next: { revalidate: REVALIDATE_SECONDS } });
    if (!res.ok) {
      console.error(`[menu] Failed to fetch menu sheet: HTTP ${res.status}`);
      return [];
    }
    csvText = (await res.text()).replace(/^﻿/, "");
  } catch (err) {
    console.error("[menu] Failed to fetch menu sheet:", err);
    return [];
  }

  return parseMenuCsv(csvText);
}

/** Pure CSV -> MenuCategory[] parser, split out from `getMenu` so it's testable without a network call. */
export function parseMenuCsv(csvText: string): MenuCategory[] {
  const rows = parseCsv(csvText);
  if (rows.length === 0) {
    console.error("[menu] Menu sheet returned no rows");
    return [];
  }

  const [headerRow, ...dataRows] = rows;
  const columns = mapHeader(headerRow);
  if (columns.category === undefined || columns.itemName === undefined) {
    console.error('[menu] Menu sheet is missing a required "Category" or "Item Name" column');
    return [];
  }

  const categoryOrder: string[] = [];
  const itemsByCategory = new Map<string, MenuItem[]>();

  dataRows.forEach((cols, i) => {
    const rowNumber = i + 2; // +1 for the header row, +1 for 1-indexing
    const get = (key: ColumnKey) => (columns[key] !== undefined ? (cols[columns[key]!] ?? "").trim() : "");

    const category = get("category");
    const itemName = get("itemName");

    if (!category || !itemName) {
      if (cols.some((c) => c.trim() !== "")) {
        console.warn(`[menu] Skipping row ${rowNumber}: missing Category or Item Name`);
      }
      return;
    }

    const small = parsePrice(get("smallPrice"));
    const large = parsePrice(get("largePrice"));
    if (small === "invalid" || large === "invalid") {
      console.warn(`[menu] Skipping row ${rowNumber} ("${itemName}"): Small/Large Price is not a valid number`);
      return;
    }

    const availableRaw = get("available").toLowerCase();
    if (availableRaw === "no") return; // explicitly hidden — not a malformed row

    const price: Price = {};
    if (small != null && large != null) {
      price.small = small;
      price.large = large;
    } else if (small != null) {
      price.regular = small;
    } else if (large != null) {
      price.regular = large;
    }

    const config = CATEGORY_CONFIG[category];
    const description = get("description");
    const item: MenuItem = { name: itemName, price };
    if (description) item.description = description;
    if (small == null && large == null && config?.priceNoteWhenUnpriced) {
      item.priceNote = config.priceNoteWhenUnpriced;
    }

    if (!itemsByCategory.has(category)) {
      itemsByCategory.set(category, []);
      categoryOrder.push(category);
    }
    itemsByCategory.get(category)!.push(item);
  });

  return categoryOrder.map((category) => {
    const config = CATEGORY_CONFIG[category];
    if (!config) {
      console.warn(`[menu] Category "${category}" has no tab-group mapping; defaulting to "${FALLBACK_TAB_GROUP}"`);
    }
    return {
      slug: slugify(category),
      boardTitle: category,
      tabGroup: config?.tabGroup ?? FALLBACK_TAB_GROUP,
      note: config?.note,
      items: itemsByCategory.get(category)!,
    };
  });
}

export async function getMenuItemCount(): Promise<number> {
  const categories = await getMenu();
  return categories.reduce((sum, cat) => sum + cat.items.length, 0);
}
