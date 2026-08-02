"use client";

import { useEffect, useState } from "react";
import { SERVICE_CHARGE_NOTE } from "@/data/menu";
import { TAB_GROUPS, TAB_GROUP_SLUGS, type MenuCategory, type TabGroup } from "@/data/types";
import { MenuItemRow } from "./MenuItemRow";
import { MenuPhotoBreak } from "./MenuPhotoBreak";

const SLUG_TO_TAB: Record<string, TabGroup> = Object.fromEntries(
  TAB_GROUPS.map((tab) => [TAB_GROUP_SLUGS[tab], tab])
) as Record<string, TabGroup>;

// Keyed by menu-category slug (not tab group or position) so a photo break
// stays attached to its dish even if the sheet reorders categories within a
// tab. Only categories with a strong, real photo match get one — six breaks
// across ten tabs, not one everywhere, keeps it a restrained accent rather
// than a wall of images. Photos are the site's existing food photography
// (see src/data/site.ts GALLERY_IMAGES); there's no crab, dessert, or salad
// shot in the asset set, so those tabs are left without a break rather than
// forcing a mismatched image in.
const CATEGORY_PHOTO_BREAKS: Record<string, { src: string; alt: string }> = {
  noodles: {
    src: "/images/food-fried-rice-table.jpg",
    alt: "A plate of Ranmo's Mongolian-style noodles served at a table",
  },
  appetizer: {
    src: "/images/stock/oysters.jpg",
    alt: "Shucked oysters with tabasco and lime",
  },
  "side-dishes-prawns": {
    src: "/images/stock/prawns-lobster.jpg",
    alt: "Grilled prawn in butter sauce",
  },
  kottu: {
    src: "/images/seafood-platter-fries.jpg",
    alt: "A seafood platter with prawns, sausage and French fries",
  },
  snacks: {
    src: "/images/stock/pastries.jpg",
    alt: "Golden-baked short eats fresh off the tray at Ranmo",
  },
  "fresh-juice": {
    src: "/images/drink-icedtea-table.jpg",
    alt: "An iced tea beverage garnished with mint, served at a table inside Ranmo",
  },
};

export function MenuTabs({ categories }: { categories: MenuCategory[] }) {
  const [active, setActive] = useState<TabGroup>(TAB_GROUPS[0]);

  useEffect(() => {
    // `window.location.hash` is only readable client-side; the server-rendered HTML always
    // shows the default tab, so the hash-linked tab (e.g. /menu#rice-noodles from the homepage)
    // can only be applied post-mount. Setting state here is a deliberate one-time sync from
    // an external source (the URL), not a case of derivable render-time state.
    const hash = window.location.hash.replace("#", "");
    if (hash && SLUG_TO_TAB[hash]) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActive(SLUG_TO_TAB[hash]);
    }
  }, []);

  function selectTab(tab: TabGroup) {
    setActive(tab);
    const slug = TAB_GROUP_SLUGS[tab];
    history.replaceState(null, "", `#${slug}`);
  }

  if (categories.length === 0) {
    return (
      <p className="rounded-xl border border-white/10 bg-charcoal-lighter px-4 py-6 text-sm text-cream-dim">
        The menu is temporarily unavailable. Please check back shortly.
      </p>
    );
  }

  return (
    <div>
      <div
        className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0"
        role="tablist"
        aria-label="Menu categories"
      >
        {TAB_GROUPS.map((tab) => (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={active === tab}
            id={`tab-${TAB_GROUP_SLUGS[tab]}`}
            aria-controls={`panel-${TAB_GROUP_SLUGS[tab]}`}
            onClick={() => selectTab(tab)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              active === tab
                ? "bg-gold text-charcoal"
                : "border border-white/15 text-cream-dim hover:border-gold hover:text-gold"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/*
        All tab panels render in the DOM at all times (toggled with `hidden`, not filtered out)
        so the full menu is present in the initial HTML for SEO, no-JS users, and find-in-page —
        only the visual presentation is tabbed.
      */}
      {TAB_GROUPS.map((tab) => {
        const categoriesForTab = categories.filter((cat) => cat.tabGroup === tab);
        return (
          <div
            key={tab}
            id={`panel-${TAB_GROUP_SLUGS[tab]}`}
            role="tabpanel"
            aria-labelledby={`tab-${TAB_GROUP_SLUGS[tab]}`}
            hidden={active !== tab}
            className="mt-8"
          >
            {categoriesForTab.map((cat) => {
              const photoBreak = CATEGORY_PHOTO_BREAKS[cat.slug];
              return (
                <div key={cat.slug}>
                  <div className="mb-10">
                    <h2 className="font-display text-2xl uppercase tracking-wide text-gold">{cat.boardTitle}</h2>
                    {cat.note && <p className="mt-1 text-sm italic text-cream-dim">{cat.note}</p>}
                    <div className="mt-2">
                      {cat.items.map((item) => (
                        <MenuItemRow key={item.name} item={item} />
                      ))}
                    </div>
                  </div>
                  {photoBreak && <MenuPhotoBreak src={photoBreak.src} alt={photoBreak.alt} />}
                </div>
              );
            })}
            <p className="text-xs text-cream-dim">{SERVICE_CHARGE_NOTE}</p>
          </div>
        );
      })}
    </div>
  );
}
