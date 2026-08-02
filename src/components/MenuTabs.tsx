"use client";

import { useEffect, useState } from "react";
import { SERVICE_CHARGE_NOTE } from "@/data/menu";
import { TAB_GROUPS, TAB_GROUP_SLUGS, type MenuCategory, type TabGroup } from "@/data/types";
import { MenuItemRow } from "./MenuItemRow";
import { MenuDishImage } from "./MenuDishImage";

const SLUG_TO_TAB: Record<string, TabGroup> = Object.fromEntries(
  TAB_GROUPS.map((tab) => [TAB_GROUP_SLUGS[tab], tab])
) as Record<string, TabGroup>;

// Keyed by menu-category slug (not tab group or position) so a dish photo
// stays attached to its category even if the sheet reorders categories
// within a tab. Photos are real Ranmo menu-board photography (cut out from
// the July 2026 menu photoset, background removed) — only categories with a
// genuine matching photo get one, so a few tabs (Beverages, Pizza toppings,
// Set Menu sides beyond the one shown) are left without one rather than
// forcing a mismatched image in. `side` alternates right/right/left in the
// order these appear on the page, per the repeating rhythm requested.
const CATEGORY_PHOTO_BREAKS: Record<
  string,
  { src: string; alt: string; width: number; height: number; side: "left" | "right" }
> = {
  "chopsuey-rice": {
    src: "/images/menu-photos/chopsuey-rice.png",
    alt: "Seafood chopsuey rice with calamari, mussels and fish",
    width: 1100,
    height: 377,
    side: "right",
  },
  "main-dishes": {
    src: "/images/menu-photos/main-dishes.png",
    alt: "Grilled seafood platter with prawns, calamari, asparagus and fries",
    width: 1100,
    height: 522,
    side: "right",
  },
  "side-dishes-mutton": {
    src: "/images/menu-photos/side-dishes-mutton.png",
    alt: "Mutton curry with ginger and coriander",
    width: 1100,
    height: 1023,
    side: "left",
  },
  "side-dishes-pork": {
    src: "/images/menu-photos/side-dishes-pork.png",
    alt: "Black pepper pork with chilli",
    width: 980,
    height: 969,
    side: "right",
  },
  "side-dishes-prawns": {
    src: "/images/menu-photos/side-dishes-prawns.png",
    alt: "Hot garlic prawns arranged on a plate",
    width: 1010,
    height: 929,
    side: "right",
  },
  "from-the-soup-kettle": {
    src: "/images/menu-photos/from-the-soup-kettle.png",
    alt: "Cream of chicken soup garnished with parsley",
    width: 1100,
    height: 521,
    side: "left",
  },
  "green-salads": {
    src: "/images/menu-photos/green-salads.png",
    alt: "Chef's salad with chicken, ham, egg and olives",
    width: 1100,
    height: 793,
    side: "right",
  },
  "side-dishes-vegetables": {
    src: "/images/menu-photos/side-dishes-vegetables.png",
    alt: "Vegetable chopsuey with baby corn, mushroom and bok choy",
    width: 684,
    height: 1100,
    side: "right",
  },
  "italian-flavours": {
    src: "/images/menu-photos/italian-flavours.png",
    alt: "Penne pasta with tomato sauce, basil and parmesan",
    width: 1100,
    height: 642,
    side: "left",
  },
  kottu: {
    src: "/images/menu-photos/kottu.png",
    alt: "Chicken kottu with coriander and chilli",
    width: 667,
    height: 747,
    side: "right",
  },
  "indian-spicy-flavoures": {
    src: "/images/menu-photos/indian-spicy-flavoures.png",
    alt: "Paneer chicken masala with naan bread",
    width: 1100,
    height: 561,
    side: "right",
  },
  "icecream-imorich": {
    src: "/images/menu-photos/icecream-imorich.png",
    alt: "Four Imorich ice cream cones fanned out",
    width: 1100,
    height: 621,
    side: "left",
  },
  desserts: {
    src: "/images/menu-photos/desserts.png",
    alt: "A slice of chocolate cake with cashews and cardamom",
    width: 1100,
    height: 970,
    side: "right",
  },
  "side-dishes-omlette": {
    src: "/images/menu-photos/side-dishes-omlette.png",
    alt: "A folded omelette garnished with chives",
    width: 1000,
    height: 959,
    side: "right",
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
              const dish = CATEGORY_PHOTO_BREAKS[cat.slug];
              return (
                <div
                  key={cat.slug}
                  className={`mb-10 md:flex md:items-start md:gap-10 ${
                    dish?.side === "left" ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <div className="min-w-0 md:flex-1">
                    <h2 className="font-display text-2xl uppercase tracking-wide text-gold">{cat.boardTitle}</h2>
                    {cat.note && <p className="mt-1 text-sm italic text-cream-dim">{cat.note}</p>}
                    <div className="mt-2">
                      {cat.items.map((item) => (
                        <MenuItemRow key={item.name} item={item} />
                      ))}
                    </div>
                  </div>
                  {dish && (
                    <div className="mt-6 shrink-0 md:mt-0 md:w-56 lg:w-64">
                      <MenuDishImage src={dish.src} alt={dish.alt} width={dish.width} height={dish.height} />
                    </div>
                  )}
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
