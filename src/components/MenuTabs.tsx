"use client";

import { useEffect, useState } from "react";
import { SERVICE_CHARGE_NOTE } from "@/data/menu";
import { TAB_GROUPS, TAB_GROUP_SLUGS, type MenuCategory, type TabGroup } from "@/data/types";
import { MenuItemRow } from "./MenuItemRow";
import { CrabSizeChart } from "./CrabSizeChart";

const SLUG_TO_TAB: Record<string, TabGroup> = Object.fromEntries(
  TAB_GROUPS.map((tab) => [TAB_GROUP_SLUGS[tab], tab])
) as Record<string, TabGroup>;

export function MenuTabs({ categories }: { categories: MenuCategory[] }) {
  const [active, setActive] = useState<TabGroup>(TAB_GROUPS[0]);

  useEffect(() => {
    // `window.location.hash` is only readable client-side; the server-rendered HTML always
    // shows the default tab, so the hash-linked tab (e.g. /menu#mud-crab from the homepage)
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
            {tab === "Mud Crab" && <CrabSizeChart />}
            {categoriesForTab.map((cat) => (
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
      })}
    </div>
  );
}
