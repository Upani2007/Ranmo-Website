import type { Metadata } from "next";
import { MapEmbed } from "@/components/MapEmbed";
import { ContactForm } from "@/components/ContactForm";
import { CallButton, WhatsAppButton } from "@/components/CtaButtons";
import { ClockIcon, MapPinIcon, PhoneIcon } from "@/components/icons";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Location & Contact",
  description: `Find Ranmo Tea Bar and Restaurant at ${SITE.address.full}. Open ${SITE.hours.display}. Call, WhatsApp, or send us a message.`,
};

export default function LocationPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <p className="font-display text-sm uppercase tracking-[0.3em] text-gold">Find Us</p>
      <h1 className="mt-2 font-display text-4xl uppercase text-cream sm:text-5xl">Location &amp; Contact</h1>

      <div className="mt-10 grid gap-10 lg:grid-cols-2">
        <div>
          <MapEmbed />

          <dl className="mt-8 space-y-5">
            <div className="flex items-start gap-3">
              <MapPinIcon className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
              <div>
                <dt className="text-sm font-medium text-cream-dim">Address</dt>
                <dd className="text-cream">{SITE.address.full}</dd>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <ClockIcon className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
              <div>
                <dt className="text-sm font-medium text-cream-dim">Hours</dt>
                <dd className="text-cream">{SITE.hours.display}</dd>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <PhoneIcon className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
              <div>
                <dt className="text-sm font-medium text-cream-dim">Phone</dt>
                <dd>
                  <a href={SITE.phone.href} className="text-cream hover:text-gold">
                    {SITE.phone.display}
                  </a>
                </dd>
              </div>
            </div>
          </dl>

          <div className="mt-8 flex flex-wrap gap-3">
            <CallButton />
            <WhatsAppButton />
          </div>
        </div>

        <div>
          <h2 className="font-display text-2xl uppercase tracking-wide text-gold">Send a Message</h2>
          <p className="mt-2 text-sm text-cream-dim">
            For reservations, use the{" "}
            <a href="/reservations" className="underline hover:text-gold">
              reservations page
            </a>{" "}
            instead — this form is for general questions.
          </p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
