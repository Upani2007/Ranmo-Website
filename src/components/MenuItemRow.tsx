import type { MenuItem } from "@/data/types";
import { formatPriceLines, hasAnyPrice } from "@/lib/formatPrice";

export function MenuItemRow({ item }: { item: MenuItem }) {
  const lines = formatPriceLines(item.price);
  const priced = hasAnyPrice(item.price);
  const pricedByWeight = !priced && item.priceNote?.startsWith("Priced");
  const missingPrice = !priced && !pricedByWeight;

  return (
    <div className="flex flex-col gap-1 border-b border-white/10 py-4 last:border-b-0 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
      <div className="min-w-0">
        <h3 className="font-display text-base uppercase tracking-wide text-cream">{item.name}</h3>
        {item.description && <p className="mt-1 text-sm text-cream-dim">{item.description}</p>}
      </div>
      <div className="shrink-0 text-left sm:text-right">
        {priced ? (
          lines.map((line, i) => (
            <p key={i} className="whitespace-nowrap text-sm font-semibold text-gold">
              {line.label && <span className="mr-2 font-normal text-cream-dim">{line.label}</span>}
              {line.value}
            </p>
          ))
        ) : (
          <p className="whitespace-nowrap text-sm font-semibold text-gold">
            {pricedByWeight ? "See size chart" : "Price on request"}
          </p>
        )}
        {missingPrice && (
          <p className="mt-0.5 max-w-[16rem] text-xs text-cream-dim">Price to be confirmed</p>
        )}
      </div>
    </div>
  );
}
