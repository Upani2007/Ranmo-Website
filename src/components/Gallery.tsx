"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { GALLERY_IMAGES } from "@/data/site";
import { Lightbox } from "./Lightbox";

const CATEGORIES = ["All", "Setting", "Interior", "Exterior", "Food"] as const;

export function Gallery() {
  const [filter, setFilter] = useState<(typeof CATEGORIES)[number]>("All");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const filtered = useMemo(
    () => (filter === "All" ? GALLERY_IMAGES : GALLERY_IMAGES.filter((img) => img.category === filter)),
    [filter]
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter gallery">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            role="tab"
            aria-selected={filter === cat}
            onClick={() => setFilter(cat)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              filter === cat
                ? "bg-gold text-charcoal"
                : "border border-white/15 text-cream-dim hover:border-gold hover:text-gold"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-4">
        {filtered.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setActiveIndex(i)}
            className="group relative aspect-square overflow-hidden rounded-lg bg-charcoal-light"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(min-width: 1024px) 23vw, (min-width: 640px) 32vw, 48vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            {!img.real && (
              <span className="absolute bottom-1.5 right-1.5 rounded bg-charcoal/80 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-cream-dim">
                Reference photo
              </span>
            )}
          </button>
        ))}
      </div>

      <Lightbox
        images={filtered}
        index={activeIndex}
        onClose={() => setActiveIndex(null)}
        onNavigate={setActiveIndex}
      />
    </div>
  );
}
