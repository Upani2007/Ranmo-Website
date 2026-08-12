import { GOOGLE_LISTING_URL, TESTIMONIALS, type Testimonial } from "@/data/testimonials";
import { Reveal } from "./Reveal";
import { StarIcon } from "./icons";

/**
 * A hand-picked set of real Google reviews.
 *
 * Deliberately not presented as a live feed, and deliberately showing no
 * average rating or review total — see the note in src/data/testimonials.ts.
 */
export function Testimonials() {
  if (TESTIMONIALS.length === 0) return null;

  return (
    <section
      aria-labelledby="testimonials-heading"
      className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8"
    >
      <Reveal>
        <div className="rounded-2xl border border-white/10 bg-charcoal-light p-6 sm:p-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
            <h2
              id="testimonials-heading"
              className="font-display text-2xl uppercase tracking-wide text-gold"
            >
              What our guests say
            </h2>
            <a
              href={GOOGLE_LISTING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-cream-dim underline underline-offset-2 hover:text-gold"
            >
              Read all reviews on Google
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>

          <ul className="mt-6 grid list-none gap-4 sm:grid-cols-2">
            {TESTIMONIALS.map((testimonial) => (
              <li key={testimonial.author}>
                <TestimonialCard testimonial={testimonial} />
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const { author, localGuide, rating, relativeDate, text } = testimonial;

  return (
    <figure className="flex h-full flex-col rounded-xl bg-charcoal-lighter p-4">
      <Stars rating={rating} />
      <blockquote className="mt-3 grow">
        <p className="text-sm leading-relaxed text-cream">&ldquo;{text}&rdquo;</p>
      </blockquote>
      <figcaption className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-cream-dim">
        <cite className="font-medium not-italic text-cream">{author}</cite>
        {localGuide && (
          <span className="rounded-full border border-gold/40 px-2 py-0.5 text-[0.65rem] uppercase tracking-wide text-gold">
            Local Guide
          </span>
        )}
        <span aria-hidden="true">&middot;</span>
        <span>{relativeDate}</span>
      </figcaption>
    </figure>
  );
}

/**
 * Star rating. The row carries `role="img"` plus a text label so screen
 * readers announce "Rated 4 out of 5 stars" instead of walking five decorative
 * SVGs — a bare <div aria-label> on a generic element isn't reliably announced.
 */
function Stars({ rating }: { rating: number }) {
  return (
    <span
      role="img"
      aria-label={`Rated ${rating} out of 5 stars`}
      className="flex gap-0.5 text-gold"
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon key={i} className="h-4 w-4" filled={i < rating} />
      ))}
    </span>
  );
}
