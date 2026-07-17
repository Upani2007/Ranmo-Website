import type { Metadata } from "next";
import { MENU, SERVICE_CHARGE_NOTE, CRAB_SIZES } from "@/data/menu";
import { formatLKR, formatPriceLines, hasAnyPrice } from "@/lib/formatPrice";
import { SITE } from "@/data/site";
import { PrintTrigger } from "./PrintTrigger";

export const metadata: Metadata = {
  title: "Printable Menu",
  robots: { index: false, follow: false },
};

export default function MenuPrintPage() {
  return (
    <div className="mx-auto max-w-3xl bg-white px-6 py-10 text-black print:px-0 print:py-0">
      <PrintTrigger />

      <header className="mb-8 border-b-2 border-black pb-4 text-center">
        <h1 className="text-3xl font-bold uppercase tracking-wide">{SITE.name}</h1>
        <p className="mt-1 text-sm">{SITE.address.full}</p>
        <p className="text-sm">
          {SITE.phone.display} &middot; {SITE.hours.display}
        </p>
      </header>

      <section className="mb-8 break-inside-avoid">
        <h2 className="text-xl font-bold uppercase">Pick Your Crab</h2>
        <table className="mt-2 w-full text-sm">
          <thead>
            <tr className="border-b border-black text-left">
              <th className="py-1">Size</th>
              <th className="py-1">Weight</th>
              <th className="py-1 text-right">Price / 100g</th>
            </tr>
          </thead>
          <tbody>
            {CRAB_SIZES.map((s) => (
              <tr key={s.label} className="border-b border-black/20">
                <td className="py-1 font-semibold">{s.label}</td>
                <td className="py-1">{s.weightRange}</td>
                <td className="py-1 text-right">{formatLKR(s.pricePer100g)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {MENU.map((cat) => (
        <section key={cat.slug} className="mb-8 break-inside-avoid">
          <h2 className="text-xl font-bold uppercase">{cat.boardTitle}</h2>
          {cat.note && <p className="text-xs italic">{cat.note}</p>}
          <div className="mt-2 divide-y divide-black/15">
            {cat.items.map((item) => {
              const lines = formatPriceLines(item.price);
              const priced = hasAnyPrice(item.price);
              return (
                <div key={item.name} className="flex items-start justify-between gap-4 py-2">
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    {item.description && <p className="text-xs text-black/70">{item.description}</p>}
                  </div>
                  <div className="shrink-0 whitespace-nowrap text-right text-sm">
                    {priced ? (
                      lines.map((line, i) => (
                        <p key={i}>
                          {line.label && <span className="mr-1 text-black/60">{line.label}</span>}
                          {line.value}
                        </p>
                      ))
                    ) : (
                      <p>{item.priceNote?.startsWith("Priced") ? "See size chart" : "Price on request"}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}

      <p className="mt-8 text-center text-xs text-black/70">{SERVICE_CHARGE_NOTE}</p>
    </div>
  );
}
