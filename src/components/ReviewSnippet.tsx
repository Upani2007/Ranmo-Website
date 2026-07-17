import { REVIEWS_PLACEHOLDER } from "@/data/site";
import { StarIcon } from "./icons";

export function ReviewSnippet() {
  return (
    <section className="rounded-2xl border border-white/10 bg-charcoal-light p-6 sm:p-8">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
        <h2 className="font-display text-2xl uppercase tracking-wide text-gold">What Guests Say</h2>
        <p className="text-xs text-cream-dim">
          Placeholder reviews — will connect to Ranmo&rsquo;s live Google Business Profile rating before launch.
        </p>
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {REVIEWS_PLACEHOLDER.map((review, i) => (
          <blockquote key={i} className="rounded-xl bg-charcoal-lighter p-4">
            <div className="flex gap-0.5 text-gold" aria-label={`${review.rating} out of 5 stars`}>
              {Array.from({ length: 5 }).map((_, idx) => (
                <StarIcon key={idx} className="h-4 w-4" filled={idx < review.rating} />
              ))}
            </div>
            <p className="mt-3 text-sm text-cream">&ldquo;{review.text}&rdquo;</p>
            <cite className="mt-3 block text-xs not-italic text-cream-dim">{review.author}</cite>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
