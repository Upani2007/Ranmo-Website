import { SERVICE_CHARGE_NOTE } from "@/data/menu";
import type { SimpleMenuCategory } from "@/data/types";
import { MenuItemRow } from "./MenuItemRow";

/**
 * The second-floor Indian kitchen's menu. Only 8 categories, so they render
 * straight down the page — no tab groups, and none of the main menu's food
 * cutout photos: none of that artwork is an Indian dish, and a mismatched
 * photo reads worse than no photo.
 */
export function IndianMenu({ categories }: { categories: SimpleMenuCategory[] }) {
  if (categories.length === 0) {
    return (
      <p className="rounded-xl border border-white/10 bg-charcoal-lighter px-4 py-6 text-sm text-cream-dim">
        The Indian menu is temporarily unavailable. Please check back shortly.
      </p>
    );
  }

  return (
    <div>
      {categories.map((cat) => (
        <div key={cat.slug} className="mb-10">
          <h2 className="font-display text-2xl uppercase tracking-wide text-gold">{cat.boardTitle}</h2>
          {cat.note && <p className="mt-1 text-sm italic text-cream-dim">{cat.note}</p>}
          <div className="mt-2">
            {cat.items.map((item) => (
              <MenuItemRow key={item.name} item={item} />
            ))}
          </div>
        </div>
      ))}
      <p className="text-xs text-cream-dim">{SERVICE_CHARGE_NOTE}</p>
    </div>
  );
}
