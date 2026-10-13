import Link from "next/link";
import { SITE } from "@/data/site";
import { MapPinIcon, MenuBookIcon, PhoneIcon, WhatsAppIcon } from "./icons";

type Variant = "primary" | "outline";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold";

const variants: Record<Variant, string> = {
  primary: "bg-gold text-charcoal hover:bg-gold-light",
  outline: "border border-gold/60 text-cream hover:border-gold hover:text-gold",
};

export function CallButton({ variant = "primary", className = "" }: { variant?: Variant; className?: string }) {
  return (
    <a href={SITE.phone.href} className={`${base} ${variants[variant]} ${className}`}>
      <PhoneIcon className="h-4 w-4" />
      Call {SITE.phone.display}
    </a>
  );
}

export function WhatsAppButton({ variant = "outline", className = "" }: { variant?: Variant; className?: string }) {
  return (
    <a href={SITE.whatsapp.href} target="_blank" rel="noopener noreferrer" className={`${base} ${variants[variant]} ${className}`}>
      <WhatsAppIcon className="h-4 w-4" />
      WhatsApp
    </a>
  );
}

export function DirectionsButton({ variant = "outline", className = "" }: { variant?: Variant; className?: string }) {
  return (
    <a href={SITE.map.directionsHref} target="_blank" rel="noopener noreferrer" className={`${base} ${variants[variant]} ${className}`}>
      <MapPinIcon className="h-4 w-4" />
      Get Directions
    </a>
  );
}

export function ViewMenuButton({ variant = "primary", className = "" }: { variant?: Variant; className?: string }) {
  return (
    <Link href="/menu" className={`${base} ${variants[variant]} ${className}`}>
      <MenuBookIcon className="h-4 w-4" />
      View Menu
    </Link>
  );
}

export function PrimaryCtaRow({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <CallButton variant="primary" />
      <ViewMenuButton variant="outline" />
      <DirectionsButton variant="outline" />
      <WhatsAppButton variant="outline" />
    </div>
  );
}

// Recruitment line — comes from the Careers sheet per role, deliberately NOT
// SITE.phone, which is the restaurant's customer-facing number.
export function ApplyCallButton({ e164, display, role, className = "" }: { e164: string; display: string; role: string; className?: string }) {
  return (
    <a href={`tel:+${e164}`} aria-label={`Call ${display} to apply for ${role}`} className={`${base} ${variants.primary} ${className}`}>
      <PhoneIcon className="h-4 w-4" />
      Call {display}
    </a>
  );
}

export function ApplyWhatsAppButton({ e164, role, className = "" }: { e164: string; role: string; className?: string }) {
  const text = encodeURIComponent(`Hi, I'd like to apply for the ${role} position at Ranmo.`);
  return (
    <a
      href={`https://wa.me/${e164}?text=${text}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Apply for ${role} on WhatsApp (opens in a new tab)`}
      className={`${base} ${variants.outline} ${className}`}
    >
      <WhatsAppIcon className="h-4 w-4" />
      Apply on WhatsApp
    </a>
  );
}
