import type { Metadata } from "next";
import { SERVICE_CHARGE_NOTE } from "@/data/menu";
import { getMenu } from "@/data/menu-source";
import { formatPriceLines, hasAnyPrice } from "@/lib/formatPrice";
import { SITE } from "@/data/site";
import { PrintTrigger } from "./PrintTrigger";

export const metadata: Metadata = {
  title: "Printable Menu",
  robots: { index: false, follow: false },
};

export default async function MenuPrintPage() {
  const categories = await getMenu();

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

      {categories.length === 0 && (
        <p className="mb-8 text-center text-sm italic text-black/70">
          The menu is temporarily unavailable. Please check back shortly.
        </p>
      )}

      {categories.map((cat) => (
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
