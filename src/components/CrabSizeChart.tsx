import { CRAB_SIZES } from "@/data/menu";
import { formatLKR } from "@/lib/formatPrice";

export function CrabSizeChart() {
  return (
    <div className="mb-6 overflow-hidden rounded-xl border border-gold/30 bg-charcoal-lighter">
      <h3 className="border-b border-gold/30 px-4 py-3 font-display text-lg uppercase tracking-wide text-gold">
        Pick Your Crab
      </h3>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-cream-dim">
            <th className="px-4 py-2 font-medium">Size</th>
            <th className="px-4 py-2 font-medium">Weight</th>
            <th className="px-4 py-2 text-right font-medium">Price / 100g</th>
          </tr>
        </thead>
        <tbody>
          {CRAB_SIZES.map((size) => (
            <tr key={size.label} className="border-t border-white/10">
              <td className="px-4 py-2 font-semibold text-cream">{size.label}</td>
              <td className="px-4 py-2 text-cream-dim">{size.weightRange}</td>
              <td className="px-4 py-2 text-right font-semibold text-gold">{formatLKR(size.pricePer100g)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
