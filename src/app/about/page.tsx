import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/Reveal";
import { PrimaryCtaRow } from "@/components/CtaButtons";

export const metadata: Metadata = {
  title: "About",
  description:
    "The story behind Ranmo Tea Bar and Restaurant — Sri Lankan tea-bar heritage on a lagoon in Kalutara South, with a coastal railway line running alongside the dining room.",
};

export default function AboutPage() {
  return (
    <div>
      <section className="relative flex min-h-[50vh] items-end overflow-hidden">
        <Image
          src="/images/interior-mural-doorway.jpg"
          alt="The hand-carved wood entrance mural at Ranmo, depicting Sri Lanka's tea country"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-charcoal/10" />
        <div className="relative mx-auto w-full max-w-5xl px-4 pb-12 pt-24 sm:px-6 lg:px-8">
          <p className="font-display text-sm uppercase tracking-[0.3em] text-gold">Our Story</p>
          <h1 className="mt-2 font-display text-4xl uppercase text-cream sm:text-5xl">About Ranmo</h1>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <Reveal>
          <div className="space-y-6 text-lg leading-relaxed text-cream-dim">
            <p>
              Ranmo Tea Bar and Restaurant opens onto a lagoon in Kalutara South, with a coastal railway
              line running right alongside the dining room — trains pass close enough to watch from the
              table. It&rsquo;s a setting that&rsquo;s hard to find anywhere else on this stretch of Galle
              Road.
            </p>
            <p>
              The name comes from the gold oval mark at the door: a nod to Sri Lanka&rsquo;s tea-country
              heritage, carved into the wood entrance itself alongside a mural of the tea fields and the
              people who work them. Inside, warm wood and brass carry that same heritage through the dining
              room.
            </p>
            <p>
              The kitchen is built around Chinese-fusion mains — Mongolian noodles, fried rice, and biryani
              among them. And running through all of it is the Ranmo Special Tea program, brewed the way a
              proper tea bar should.
            </p>
            <p>Open daily, 10:00 AM to 10:00 PM.</p>
          </div>
          <PrimaryCtaRow className="mt-10" />
        </Reveal>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
        <Reveal>
          <h2 className="font-display text-2xl uppercase tracking-wide text-gold">A Story Rooted in Tea</h2>
          <div className="mt-6 space-y-6 text-lg leading-relaxed text-cream-dim">
            <p>
              Ranmo Tea Bar and Restaurant was born from a family&rsquo;s deep-rooted relationship with
              Ceylon tea. Since 1980, Wimal Tea Distributors has sourced, graded, and distributed some of
              Sri Lanka&rsquo;s finest single-origin black teas — hand-selected from the island&rsquo;s
              legendary growing regions of Nuwara Eliya, Dimbula, Uva, Uda Pussellawa, Kandy, Sabaragamuwa,
              and Ruhuna. Every leaf is tasted and graded by experienced tea tasters before it ever reaches
              a cup, a standard of care that has shaped everything we do for over 30 years.
            </p>
            <p>
              Ranmo carries that same philosophy from the tea garden to the table. What began as a tea
              business built on quality and provenance has grown into a full dining destination — a place
              where that same attention to sourcing and craft now extends to a menu spanning Sri Lankan
              classics, Asian flavours, and international favourites.
            </p>
            <p>
              Find us at #362 Galle Road, Kalutara South, where our dining room sits right on the
              water&rsquo;s edge, with a coastal railway line running alongside — one of the most memorable
              settings on the south coast to enjoy a meal. Whether you&rsquo;re here for a bowl of Mongolian
              noodles, a plate of Kottu, or simply a proper cup of Ceylon tea made the way it should be,
              Ranmo brings decades of tea heritage together with a kitchen built for everyone.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="/images/interior-mural-teapicker.jpg"
                alt="Carved wood mural of a tea picker in the fields, inside Ranmo's dining room"
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <Image
                src="/images/exterior-storefront-night.jpg"
                alt="Ranmo Tea Bar and Restaurant's storefront on Galle Road at night"
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
