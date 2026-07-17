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

export type CrabSize = {
  label: string;
  weightRange: string;
  pricePer100g: number;
};

export const TAB_GROUPS = [
  "Mud Crab",
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

export const TAB_GROUP_SLUGS: Record<TabGroup, string> = {
  "Mud Crab": "mud-crab",
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
