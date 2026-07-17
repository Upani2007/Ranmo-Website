import type { Metadata } from "next";
import { ReservationForm } from "@/components/ReservationForm";
import { CallButton, WhatsAppButton } from "@/components/CtaButtons";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Reservations",
  description: `Request a table at ${SITE.name}. We'll call to confirm your reservation.`,
};

export default function ReservationsPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <p className="font-display text-sm uppercase tracking-[0.3em] text-gold">Book a Table</p>
      <h1 className="mt-2 font-display text-4xl uppercase text-cream sm:text-5xl">Reservations</h1>
      <p className="mt-4 text-cream-dim">
        Tell us when you&rsquo;d like to visit and we&rsquo;ll call to confirm. For same-day or urgent
        requests, calling or WhatsApping directly is faster.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <CallButton />
        <WhatsAppButton />
      </div>

      <div className="mt-10 rounded-2xl border border-white/10 bg-charcoal-light p-6 sm:p-8">
        <ReservationForm />
      </div>
    </div>
  );
}
