import type { Metadata } from "next";
import { Gallery } from "@/components/Gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Photos of Ranmo Tea Bar and Restaurant — the lagoon and railway view, the carved wood interior, and dishes from the menu.",
};

export default function GalleryPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <p className="font-display text-sm uppercase tracking-[0.3em] text-gold">In Pictures</p>
      <h1 className="mt-2 font-display text-4xl uppercase text-cream sm:text-5xl">Gallery</h1>
      <p className="mt-4 max-w-2xl text-cream-dim">
        The setting, the interior, and a few dishes. Photos marked &ldquo;reference photo&rdquo; are from
        Ranmo&rsquo;s printed menu boards rather than on-site photography.
      </p>
      <div className="mt-10">
        <Gallery />
      </div>
    </div>
  );
}
