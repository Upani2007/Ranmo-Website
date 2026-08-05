import "server-only";
import { unstable_rethrow } from "next/navigation";
import { INDIAN_CATEGORIES, type MenuCategory, type MenuItem, type Price, type SimpleMenuCategory, type TabGroup } from "./types";

// Published Google Sheet (File > Share > Publish to web > CSV). Editing the
// sheet updates the live site on the next page load — no redeploy needed.
const MENU_SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTfFEbLn6-aVsdIKNf31fgnOfb5dg-9EBnzdSMIoi2g0SlJJq5rJ58w4dNyOe98AdxvkB1yzgUuVtxF/pub?gid=1608798132&single=true&output=csv";

// The second-floor Indian kitchen's menu — a second tab in the same published
// spreadsheet (different gid), same six columns. Kept as its own sheet and its
// own fetch so the two menus never mix.
const INDIAN_MENU_SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTfFEbLn6-aVsdIKNf31fgnOfb5dg-9EBnzdSMIoi2g0SlJJq5rJ58w4dNyOe98AdxvkB1yzgUuVtxF/pub?gid=1696881426&single=true&output=csv";

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
  Appetizer: { tabGroup: "Starters, Soups & Seafood Bites" },
  "From the Soup Kettle": { tabGroup: "Starters, Soups & Seafood Bites", note: "Served with bread & butter." },
  "Green Salads": { tabGroup: "Salads & Vegetables" },
  "Side Dishes - Vegetables": { tabGroup: "Salads & Vegetables" },
  "Main Dishes": { tabGroup: "Meat & Fish" },
  "Side Dishes - Chicken": { tabGroup: "Meat & Fish" },
  "Side Dishes - Mutton": { tabGroup: "Meat & Fish" },
  "Side Dishes - Beef": { tabGroup: "Meat & Fish" },
  "Side Dishes - Pork": { tabGroup: "Meat & Fish" },
  "Side Dishes - Fish (Thalapath)": { tabGroup: "Meat & Fish" },
  "Side Dishes - Prawns": { tabGroup: "Meat & Fish" },
  "Side Dishes - Calamari": { tabGroup: "Meat & Fish" },
  "Asian Flavour": { tabGroup: "Rice & Noodles" },
  "Chopsuey Rice": { tabGroup: "Rice & Noodles" },
  Noodles: { tabGroup: "Rice & Noodles" },
  "Rice & Curry": { tabGroup: "Rice & Noodles" },
  Kottu: { tabGroup: "Platters, Kottu & Sausages" },
  "Side Dishes - Sausages": { tabGroup: "Platters, Kottu & Sausages" },
  "Italian Flavours": { tabGroup: "Pizza & Pasta" },
  Pizza: { tabGroup: "Pizza & Pasta" },
  Snacks: { tabGroup: "Short Eats & Pastries" },
  "Side Dishes - Omlette": { tabGroup: "Short Eats & Pastries" },
  "Indian Spicy Flavoures": { tabGroup: "Set Menu & Sides" },
  "Fresh Juice": { tabGroup: "Beverages" },
  "Milk Shake": { tabGroup: "Beverages" },
  "Ranmo Special Hot Drinks": { tabGroup: "Beverages" },
  "Icecream - Elephant House": { tabGroup: "Desserts" },
  "Icecream - Imorich": { tabGroup: "Desserts" },
  Desserts: { tabGroup: "Desserts" },
  "Waffle Sunday": { tabGroup: "Desserts" },
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
  const csvText = await fetchSheetCsv(MENU_SHEET_CSV_URL, "[menu]");
  if (csvText == null) return [];
  return parseMenuCsv(csvText);
}

/**
 * Fetches one published sheet as CSV. Returns `null` (already logged) if the
 * sheet can't be fetched, so callers can fall back to an empty menu instead of
 * crashing the page.
 */
async function fetchSheetCsv(url: string, logPrefix: string): Promise<string | null> {
  try {
    const res = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } });
    if (!res.ok) {
      console.error(`${logPrefix} Failed to fetch menu sheet: HTTP ${res.status}`);
      return null;
    }
    return (await res.text()).replace(/^﻿/, "");
  } catch (err) {
    // fetch(..., { next: { revalidate: 0 } }) throws Next's internal
    // DYNAMIC_SERVER_USAGE error during a static-generation attempt to bail
    // the route into dynamic rendering — that's a control-flow signal, not a
    // real failure, and must propagate rather than being swallowed here.
    unstable_rethrow(err);
    console.error(`${logPrefix} Failed to fetch menu sheet:`, err);
    return null;
  }
}

type CollectedRows = {
  /** Category names in the order they first appear in the sheet. */
  categoryOrder: string[];
  itemsByCategory: Map<string, MenuItem[]>;
};

/**
 * Shared CSV -> items-by-category pass for both menus: same column mapping,
 * same blank-price handling, same skip-and-log treatment of malformed rows.
 * Returns `null` when the sheet is unusable as a whole (no rows, or missing a
 * required column). What the categories then *mean* — tab groups for the main
 * menu, a fixed order for the Indian menu — is the caller's business.
 */
function collectRows(
  csvText: string,
  logPrefix: string,
  priceNoteWhenUnpriced?: (category: string) => string | undefined
): CollectedRows | null {
  const rows = parseCsv(csvText);
  if (rows.length === 0) {
    console.error(`${logPrefix} Menu sheet returned no rows`);
    return null;
  }

  const [headerRow, ...dataRows] = rows;
  const columns = mapHeader(headerRow);
  if (columns.category === undefined || columns.itemName === undefined) {
    console.error(`${logPrefix} Menu sheet is missing a required "Category" or "Item Name" column`);
    return null;
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
        console.warn(`${logPrefix} Skipping row ${rowNumber}: missing Category or Item Name`);
      }
      return;
    }

    const small = parsePrice(get("smallPrice"));
    const large = parsePrice(get("largePrice"));
    if (small === "invalid" || large === "invalid") {
      console.warn(`${logPrefix} Skipping row ${rowNumber} ("${itemName}"): Small/Large Price is not a valid number`);
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

    const description = get("description");
    const item: MenuItem = { name: itemName, price };
    if (description) item.description = description;
    if (small == null && large == null) {
      const note = priceNoteWhenUnpriced?.(category);
      if (note) item.priceNote = note;
    }

    if (!itemsByCategory.has(category)) {
      itemsByCategory.set(category, []);
      categoryOrder.push(category);
    }
    itemsByCategory.get(category)!.push(item);
  });

  return { categoryOrder, itemsByCategory };
}

/** Pure CSV -> MenuCategory[] parser, split out from `getMenu` so it's testable without a network call. */
export function parseMenuCsv(csvText: string): MenuCategory[] {
  const collected = collectRows(csvText, "[menu]", (category) => CATEGORY_CONFIG[category]?.priceNoteWhenUnpriced);
  if (!collected) return [];
  const { categoryOrder, itemsByCategory } = collected;

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

/**
 * Fetches the Indian (second-floor) menu from its own sheet, with the same
 * always-fresh behaviour and the same tolerance for blank prices and malformed
 * rows as `getMenu()`.
 *
 * Deliberately independent of the main menu: no shared categories, no merging
 * or deduping. Several category and item names appear in both menus at
 * different prices, and each menu must show its own.
 */
export async function getIndianMenu(): Promise<SimpleMenuCategory[]> {
  const csvText = await fetchSheetCsv(INDIAN_MENU_SHEET_CSV_URL, "[menu:indian]");
  if (csvText == null) return [];
  return parseIndianMenuCsv(csvText);
}

/** Pure CSV -> SimpleMenuCategory[] parser, split out from `getIndianMenu` so it's testable without a network call. */
export function parseIndianMenuCsv(csvText: string): SimpleMenuCategory[] {
  const collected = collectRows(csvText, "[menu:indian]");
  if (!collected) return [];
  const { categoryOrder, itemsByCategory } = collected;

  // The Indian menu has no tab-group layer — its categories render directly, in
  // the printed menu's order. Anything the sheet grows that isn't in that list
  // still renders (after the known ones) but logs a warning so it can be added.
  const known = INDIAN_CATEGORIES.filter((category) => itemsByCategory.has(category)) as string[];
  const unknown = categoryOrder.filter((category) => !INDIAN_CATEGORIES.includes(category as never));
  unknown.forEach((category) => {
    console.warn(`[menu:indian] Category "${category}" is not in INDIAN_CATEGORIES; appending it at the end`);
  });

  return [...known, ...unknown].map((category) => ({
    slug: slugify(category),
    boardTitle: category,
    items: itemsByCategory.get(category)!,
  }));
}

export async function getIndianMenuItemCount(): Promise<number> {
  const categories = await getIndianMenu();
  return categories.reduce((sum, cat) => sum + cat.items.length, 0);
}
