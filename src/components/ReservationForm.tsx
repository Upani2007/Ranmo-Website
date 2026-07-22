"use client";

import { FormEvent, useState } from "react";
import { SITE } from "@/data/site";

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full rounded-lg border border-white/15 bg-charcoal-lighter px-4 py-2.5 text-cream placeholder:text-cream-dim/60 focus:border-gold focus:outline-none";
const labelClass = "mb-1.5 block text-sm font-medium text-cream";

export function ReservationForm() {
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
    formData.append("subject", `New reservation request — ${SITE.name}`);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        form.reset();

        fetch("/api/reservation-telegram", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formData.get("name"),
            phone: formData.get("phone"),
            date: formData.get("date"),
            time: formData.get("time"),
            party_size: formData.get("party_size"),
            notes: formData.get("notes"),
          }),
        }).catch(() => {});
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
        <h3 className="font-display text-xl uppercase tracking-wide text-gold">Request Sent</h3>
        <p className="mt-2 text-sm text-cream-dim">
          Thank you — we&rsquo;ve received your reservation request. Our team will call you at the number
          provided to confirm. For urgent requests, please call {SITE.phone.display} directly.
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
          <label htmlFor="res-name" className={labelClass}>
            Name
          </label>
          <input id="res-name" name="name" type="text" required className={inputClass} placeholder="Your full name" />
        </div>
        <div>
          <label htmlFor="res-phone" className={labelClass}>
            Phone
          </label>
          <input
            id="res-phone"
            name="phone"
            type="tel"
            required
            className={inputClass}
            placeholder="07X XXX XXXX"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div>
          <label htmlFor="res-date" className={labelClass}>
            Date
          </label>
          <input id="res-date" name="date" type="date" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="res-time" className={labelClass}>
            Time
          </label>
          <input id="res-time" name="time" type="time" required className={inputClass} />
        </div>
        <div>
          <label htmlFor="res-party" className={labelClass}>
            Party size
          </label>
          <input
            id="res-party"
            name="party_size"
            type="number"
            min={1}
            max={50}
            required
            className={inputClass}
            placeholder="2"
          />
        </div>
      </div>

      <div>
        <label htmlFor="res-notes" className={labelClass}>
          Notes (optional)
        </label>
        <textarea
          id="res-notes"
          name="notes"
          rows={4}
          className={inputClass}
          placeholder="Window table, dietary needs, special occasion, etc."
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-flex items-center justify-center rounded-full bg-gold px-6 py-3 text-sm font-semibold text-charcoal transition-colors hover:bg-gold-light disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Request Reservation"}
      </button>

      {status === "error" && (
        <p className="text-sm text-rust-light">
          Something went wrong sending your request — please call or WhatsApp us at {SITE.phone.display}{" "}
          instead.
        </p>
      )}

      <p className="text-xs text-cream-dim">
        This is a reservation <em>request</em>, not a confirmed booking — our team will call to confirm
        availability.
      </p>
    </form>
  );
}
