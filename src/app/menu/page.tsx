import type { Metadata } from "next";
import Link from "next/link";
import { MenuTabs } from "@/components/MenuTabs";
import { MENU_ITEM_COUNT } from "@/data/menu";

export const metadata: Metadata = {
  title: "Menu",
  description: `The full Ranmo Tea Bar and Restaurant menu — ${MENU_ITEM_COUNT}+ dishes across mud crab, rice, noodles, seafood, pizza, pasta, and more. Prices in LKR.`,
};

export default function MenuPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-display text-sm uppercase tracking-[0.3em] text-gold">The Full Menu</p>
          <h1 className="mt-2 font-display text-4xl uppercase text-cream sm:text-5xl">Menu</h1>
        </div>
        <Link
          href="/menu/print"
          target="_blank"
          className="inline-flex w-fit items-center justify-center rounded-full border border-gold/60 px-5 py-2.5 text-sm font-semibold text-cream transition-colors hover:border-gold hover:text-gold"
        >
          Download PDF Menu
        </Link>
      </div>

      <div className="mt-10">
        <MenuTabs />
      </div>
    </div>
  );
}
