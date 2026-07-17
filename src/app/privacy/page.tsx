import type { Metadata } from "next";
import { SITE } from "@/data/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for the ${SITE.name} website.`,
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <h1 className="font-display text-4xl uppercase text-cream sm:text-5xl">Privacy Policy</h1>
      <div className="mt-8 space-y-6 text-cream-dim">
        <p>
          This website is operated by {SITE.name}. This page explains what information we collect through
          the site and how it&rsquo;s used.
        </p>

        <h2 className="font-display text-xl uppercase tracking-wide text-gold">Information We Collect</h2>
        <p>
          When you submit the Reservations or Contact form, we collect the information you provide — such
          as your name, phone number, email address, and any notes or message content — solely to respond
          to your request. Form submissions are delivered to us by email via a third-party form service
          (Web3Forms) and are not sold or shared with other third parties for marketing purposes.
        </p>

        <h2 className="font-display text-xl uppercase tracking-wide text-gold">Cookies &amp; Analytics</h2>
        <p>
          This site may use standard analytics tools (such as Google Analytics) to understand how visitors
          use the site. These tools may set cookies in your browser. You can disable cookies in your browser
          settings at any time.
        </p>

        <h2 className="font-display text-xl uppercase tracking-wide text-gold">Third-Party Services</h2>
        <p>
          We use Google Maps to display our location and Web3Forms to process form submissions. These
          services have their own privacy policies governing the data they process.
        </p>

        <h2 className="font-display text-xl uppercase tracking-wide text-gold">Contact</h2>
        <p>
          Questions about this policy can be directed to us at {SITE.phone.display} or via the{" "}
          <a href="/location" className="underline hover:text-gold">
            contact form
          </a>
          .
        </p>
      </div>
    </div>
  );
}
