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

      <section
        className="mt-16 rounded-2xl border border-gold/40 bg-gradient-to-br from-gold/15 via-gold/5 to-transparent p-5 shadow-[0_0_40px_-12px_rgba(217,164,65,0.35)] sm:p-8"
        aria-labelledby="gallery-video-heading">
        <h2 id="gallery-video-heading" className="font-display text-2xl uppercase text-cream sm:text-3xl">
          Watch
        </h2>
        <div className="mt-3 h-px w-16 bg-gold" aria-hidden="true" />
        <div className="mt-6 aspect-video w-full max-w-4xl overflow-hidden rounded-lg bg-charcoal-light ring-1 ring-gold/50">
          <video
            className="h-full w-full object-cover"
            width={1280}
            height={720}
            controls
            playsInline
            muted
            preload="none"
            poster="/images/ranmo-gallery-poster.webp"
            aria-label="Video tour of Ranmo Tea Bar and Restaurant"
          >
            <source src="/video/ranmo-gallery-video.mp4" type="video/mp4" />
            Your browser does not support HTML5 video.
          </video>
        </div>
      </section>
    </div>
  );
}
