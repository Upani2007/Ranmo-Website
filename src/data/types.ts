export type Price = {
  small?: number | null;
  large?: number | null;
  regular?: number | null;
  basmathiSmall?: number | null;
  basmathiLarge?: number | null;
  basmathiRegular?: number | null;
};

export type MenuItem = {
  name: string;
  description?: string;
  price: Price;
  priceNote?: string;
};

export type MenuCategory = {
  slug: string;
  boardTitle: string;
  tabGroup: string;
  note?: string;
  items: MenuItem[];
};

export const TAB_GROUPS = [
  "Rice & Noodles",
  "Meat & Fish",
  "Starters, Soups & Seafood Bites",
  "Salads & Vegetables",
  "Pizza & Pasta",
  "Platters, Kottu & Sausages",
  "Set Menu & Sides",
  "Desserts",
  "Beverages",
  "Short Eats & Pastries",
] as const;

export type TabGroup = (typeof TAB_GROUPS)[number];

/**
 * The second-floor Indian kitchen's menu. It is the same business as the main
 * restaurant but a completely separate menu: category names and item names
 * overlap with the main menu at different prices (e.g. Vanilla Milkshake), so
 * the two are never merged, deduped, or grouped together.
 *
 * Only 8 categories, so there is no tab-group layer here — these render
 * directly, in this order.
 */
export const INDIAN_CATEGORIES = [
  "Biryani Special",
  "Soups",
  "Curry",
  "Tandoori & Naan Roti",
  "Salad",
  "Fresh Juice & Milkshake",
  "Desserts",
  "Hot Beverages",
] as const;

/** A menu category with no tab grouping — used by the Indian menu. */
export type SimpleMenuCategory = {
  slug: string;
  boardTitle: string;
  note?: string;
  items: MenuItem[];
};

export const TAB_GROUP_SLUGS: Record<TabGroup, string> = {
  "Rice & Noodles": "rice-noodles",
  "Meat & Fish": "meat-fish",
  "Starters, Soups & Seafood Bites": "starters-soups-seafood",
  "Salads & Vegetables": "salads-vegetables",
  "Pizza & Pasta": "pizza-pasta",
  "Platters, Kottu & Sausages": "platters-kottu-sausages",
  "Set Menu & Sides": "set-menu-sides",
  Desserts: "desserts",
  Beverages: "beverages",
  "Short Eats & Pastries": "short-eats-pastries",
};
