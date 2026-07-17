"use client";

import { useEffect } from "react";

export function PrintTrigger() {
  useEffect(() => {
    const t = setTimeout(() => window.print(), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="no-print mb-8 inline-flex items-center justify-center rounded-full bg-charcoal px-5 py-2.5 text-sm font-semibold text-white print:hidden"
    >
      Print / Save as PDF
    </button>
  );
}
