import Link from "next/link";
import { PrimaryCtaRow } from "@/components/CtaButtons";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6">
      <p className="font-display text-sm uppercase tracking-[0.3em] text-gold">404</p>
      <h1 className="mt-2 font-display text-4xl uppercase text-cream sm:text-5xl">Page Not Found</h1>
      <p className="mt-4 text-cream-dim">
        This page doesn&rsquo;t exist — but the menu does. Head back home or jump straight to the menu.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-charcoal hover:bg-gold-light"
        >
          Back to Home
        </Link>
      </div>
      <PrimaryCtaRow className="mt-6 justify-center" />
    </div>
  );
}
