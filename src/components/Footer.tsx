import Image from "next/image";
import Link from "next/link";
import { NAV_LINKS, SITE } from "@/data/site";
import { ClockIcon, MapPinIcon, PhoneIcon } from "./icons";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-charcoal-light">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <Image
            src="/images/logo-mark.png"
            alt="Ranmo Tea Bar and Restaurant logo"
            width={140}
            height={88}
            className="h-12 w-auto"
          />
          <p className="mt-4 max-w-xs text-sm text-cream-dim">{SITE.description}</p>
        </div>

        <div>
          <h2 className="font-display text-lg uppercase tracking-wide text-gold">Hours &amp; Contact</h2>
          <ul className="mt-4 space-y-3 text-sm text-cream-dim">
            <li className="flex items-start gap-2">
              <ClockIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              {SITE.hours.display}
            </li>
            <li className="flex items-start gap-2">
              <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>
                {SITE.address.line1}
                <br />
                {SITE.address.line2}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <span>
                <a href={SITE.phone.href} className="hover:text-gold">
                  {SITE.phone.display}
                </a>
                <br />
                <a href={SITE.phoneAlt.href} className="hover:text-gold">
                  {SITE.phoneAlt.display}
                </a>
              </span>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-display text-lg uppercase tracking-wide text-gold">Quick Links</h2>
          <ul className="mt-4 space-y-2 text-sm text-cream-dim">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-gold">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/privacy" className="hover:text-gold">
                Privacy
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-display text-lg uppercase tracking-wide text-gold">Find Us</h2>
          <a
            href={SITE.map.directionsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 block overflow-hidden rounded-lg border border-white/10 transition-opacity hover:opacity-90"
          >
            <Image
              src="/images/exterior-storefront-night.jpg"
              alt="Ranmo's storefront on Galle Road — tap for directions"
              width={400}
              height={280}
              className="h-32 w-full object-cover"
            />
            <span className="block bg-charcoal-lighter px-3 py-2 text-xs font-medium text-gold">
              Get Directions →
            </span>
          </a>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-6 text-center text-xs text-cream-dim sm:px-6 lg:px-8">
        © {new Date().getFullYear()} {SITE.name}. All rights reserved.
      </div>
    </footer>
  );
}
