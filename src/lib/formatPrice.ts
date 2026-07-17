import type { Price } from "@/data/types";

export function formatLKR(n: number): string {
  return `Rs.${n.toLocaleString("en-LK")}`;
}

export type PriceLine = { label: string; value: string };

/** Turns a menu item's Price object into one or two display lines, e.g. "Small / Large" and "Basmathi S / L". */
export function formatPriceLines(price: Price): PriceLine[] {
  const lines: PriceLine[] = [];

  if (price.small != null || price.large != null) {
    const parts: string[] = [];
    if (price.small != null) parts.push(`Small ${formatLKR(price.small)}`);
    if (price.large != null) parts.push(`Large ${formatLKR(price.large)}`);
    if (parts.length) lines.push({ label: "", value: parts.join("  |  ") });
  } else if (price.regular != null) {
    lines.push({ label: "", value: formatLKR(price.regular) });
  }

  if (price.basmathiSmall != null || price.basmathiLarge != null) {
    const parts: string[] = [];
    if (price.basmathiSmall != null) parts.push(`S ${formatLKR(price.basmathiSmall)}`);
    if (price.basmathiLarge != null) parts.push(`L ${formatLKR(price.basmathiLarge)}`);
    if (parts.length) lines.push({ label: "Basmathi Rice", value: parts.join("  |  ") });
  } else if (price.basmathiRegular != null) {
    lines.push({ label: "Basmathi Rice", value: formatLKR(price.basmathiRegular) });
  }

  return lines;
}

export function hasAnyPrice(price: Price): boolean {
  return (
    price.small != null ||
    price.large != null ||
    price.regular != null ||
    price.basmathiSmall != null ||
    price.basmathiLarge != null ||
    price.basmathiRegular != null
  );
}
