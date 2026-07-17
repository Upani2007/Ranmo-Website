"use client";

import { FormEvent, useState } from "react";
import { SITE } from "@/data/site";

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full rounded-lg border border-white/15 bg-charcoal-lighter px-4 py-2.5 text-cream placeholder:text-cream-dim/60 focus:border-gold focus:outline-none";
const labelClass = "mb-1.5 block text-sm font-medium text-cream";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append(
      "access_key",
      process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "REPLACE_WITH_REAL_WEB3FORMS_ACCESS_KEY"
    );
    formData.append("subject", `New website message — ${SITE.name}`);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-gold/40 bg-charcoal-lighter p-6 text-center">
        <h3 className="font-display text-xl uppercase tracking-wide text-gold">Message Sent</h3>
        <p className="mt-2 text-sm text-cream-dim">
          Thanks for reaching out — we&rsquo;ll get back to you soon. For anything urgent, call{" "}
          {SITE.phone.display}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <input type="hidden" name="from_name" value={SITE.name} />
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className={labelClass}>
            Name
          </label>
          <input id="contact-name" name="name" type="text" required className={inputClass} placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="contact-email" className={labelClass}>
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            className={inputClass}
            placeholder="you@example.com"
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className={labelClass}>
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          required
          className={inputClass}
          placeholder="How can we help?"
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center justify-center rounded-full bg-gold px-6 py-3 text-sm font-semibold text-charcoal transition-colors hover:bg-gold-light disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send Message"}
      </button>

      {status === "error" && (
        <p className="text-sm text-rust-light">
          Something went wrong sending your message — please call or WhatsApp us at {SITE.phone.display}{" "}
          instead.
        </p>
      )}
    </form>
  );
}
