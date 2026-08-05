"use client";

import { useState, type ReactNode } from "react";

/**
 * One restaurant, two kitchens — the ground-floor main menu and the
 * second-floor Indian menu. Both live on /menu (the printed QR codes point
 * there), switched client-side rather than split across routes.
 *
 * Both menus stay in the DOM at all times, toggled with `hidden` rather than
 * filtered out, so the whole menu is in the initial HTML for SEO, no-JS users
 * and find-in-page — the same approach the category tabs inside take.
 */
const MENUS = [
  { id: "main", label: "Main Restaurant" },
  { id: "indian", label: "Indian Restaurant" },
] as const;

type MenuId = (typeof MENUS)[number]["id"];

export function MenuSwitcher({ main, indian }: { main: ReactNode; indian: ReactNode }) {
  const [active, setActive] = useState<MenuId>("main");

  return (
    <div>
      <div
        className="inline-flex rounded-full border border-white/15 bg-charcoal-lighter p-1"
        role="tablist"
        aria-label="Restaurant menus"
      >
        {MENUS.map((menu) => (
          <button
            key={menu.id}
            type="button"
            role="tab"
            aria-selected={active === menu.id}
            id={`menu-tab-${menu.id}`}
            aria-controls={`menu-panel-${menu.id}`}
            onClick={() => setActive(menu.id)}
            className={`shrink-0 rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
              active === menu.id ? "bg-gold text-charcoal" : "text-cream-dim hover:text-gold"
            }`}
          >
            {menu.label}
          </button>
        ))}
      </div>

      <div
        id="menu-panel-main"
        role="tabpanel"
        aria-labelledby="menu-tab-main"
        hidden={active !== "main"}
        className="mt-8"
      >
        {main}
      </div>

      <div
        id="menu-panel-indian"
        role="tabpanel"
        aria-labelledby="menu-tab-indian"
        hidden={active !== "indian"}
        className="mt-8"
      >
        <p className="mb-6 text-sm text-cream-dim">Served on our second floor.</p>
        {indian}
      </div>
    </div>
  );
}
