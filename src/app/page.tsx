import Image from "next/image";
import Link from "next/link";
import { PrimaryCtaRow } from "@/components/CtaButtons";
import { MapEmbed } from "@/components/MapEmbed";
import { ReviewSnippet } from "@/components/ReviewSnippet";
import { Reveal } from "@/components/Reveal";
import { SIGNATURE_DISHES, SITE } from "@/data/site";
import { ClockIcon, MapPinIcon } from "@/components/icons";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[85vh] items-end overflow-hidden sm:min-h-[90vh]">
        {/* Mobile crop: tightly framed on the RANMO wordmark so it survives the tall, narrow object-cover crop */}
        <Image
          src="/images/hero-storefront-mobile.jpg"
          alt="Ranmo Tea Bar and Restaurant's illuminated storefront at night, with red lanterns at the entrance"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_8%] sm:hidden"
        />
        {/* Desktop crop: full-width banner sign + entrance. No `priority` here — mobile is the
            primary audience per the brief, so only the mobile crop gets preloaded; this one still
            loads promptly since it's in the initial HTML above the fold. */}
        <Image
          src="/images/hero-storefront.jpg"
          alt="Ranmo Tea Bar and Restaurant's illuminated storefront at night, with red lanterns at the entrance"
          fill
          sizes="100vw"
          className="hidden object-cover object-[center_12%] sm:block"
        />
        {/* Busier, more colorful photo than a plain backdrop — a flat tint plus a stronger bottom
            pool keeps the headline and CTA text legible without flattening the shot entirely. */}
        <div className="absolute inset-0 bg-charcoal/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-transparent" />
        <div className="relative mx-auto w-full max-w-7xl px-4 pb-14 pt-32 sm:px-6 sm:pb-20 lg:px-8">
          <Reveal>
            <p className="font-display text-sm uppercase tracking-[0.3em] text-gold">
              Kalutara South &middot; Lagoon-side
            </p>
            <h1 className="mt-3 max-w-2xl font-display text-4xl uppercase leading-[1.05] text-cream sm:text-6xl">
              Sri Lankan tea-bar heritage, served lagoon-side.
            </h1>
            <p className="mt-5 max-w-xl text-base text-cream-dim sm:text-lg">
              Ranmo Tea Bar and Restaurant sits right on the water, with a coastal railway line running
              alongside the dining room. Chinese-fusion mains and a full tea program — open every
              day, 10:00 AM to 10:00 PM.
            </p>
            <PrimaryCtaRow className="mt-8" />
          </Reveal>
        </div>
      </section>

      {/* Signature dishes */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <Reveal>
          <h2 className="font-display text-3xl uppercase tracking-wide text-gold sm:text-4xl">
            Signature Dishes
          </h2>
          <p className="mt-2 max-w-2xl text-cream-dim">
            Three reasons regulars keep coming back to Ranmo.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {SIGNATURE_DISHES.map((dish, i) => (
            <Reveal key={dish.name} delay={i * 0.08}>
              <Link href={dish.href} className="group block overflow-hidden rounded-2xl bg-charcoal-light">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-xl uppercase tracking-wide text-cream group-hover:text-gold">
                    {dish.name}
                  </h3>
                  <p className="mt-2 text-sm text-cream-dim">{dish.description}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Hours + map teaser */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
        <Reveal>
          <div className="grid gap-10 rounded-2xl border border-white/10 bg-charcoal-light p-6 sm:p-10 lg:grid-cols-2">
            <div>
              <h2 className="font-display text-3xl uppercase tracking-wide text-gold">Visit Us</h2>
              <ul className="mt-6 space-y-4 text-cream-dim">
                <li className="flex items-start gap-3">
                  <ClockIcon className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                  <span>{SITE.hours.display}</span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPinIcon className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                  <span>{SITE.address.full}</span>
                </li>
              </ul>
              <PrimaryCtaRow className="mt-8" />
            </div>
            <MapEmbed />
          </div>
        </Reveal>
      </section>

      {/* Reviews */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
        <Reveal>
          <ReviewSnippet />
        </Reveal>
      </section>
    </>
  );
}
