import type { Metadata } from "next";
import Image from "next/image";
import { getJobs, type JobListing } from "@/data/careers-source";
import { SITE } from "@/data/site";
import { ApplyCallButton, ApplyWhatsAppButton } from "@/components/CtaButtons";
import { JobPostingSchema } from "@/components/JobPostingSchema";

export const metadata: Metadata = {
  title: "Careers",
  description: `Join the team at ${SITE.name} in Kalutara South. See current vacancies and apply by phone or WhatsApp.`,
};

const WHY_US = [
  { title: "Great team environment", text: "A friendly, supportive crew that looks out for each other." },
  { title: "Growth opportunities", text: "Room to learn new skills and take on more responsibility." },
  { title: "Rewarding career", text: "Meaningful work in a busy, well-loved restaurant." },
  { title: "Be part of excellence", text: "Help us keep a high standard for every guest, every day." },
];

function formatPosted(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

function JobCard({ job }: { job: JobListing }) {
  return (
    <article className="rounded-2xl border border-white/10 bg-charcoal-light p-6 sm:p-8">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <h3 className="font-display text-2xl uppercase tracking-wide text-cream">{job.role}</h3>
        {job.employmentType && (
          <span className="rounded-full border border-gold/60 px-3 py-0.5 text-xs font-medium uppercase tracking-wide text-gold">
            {job.employmentType}
          </span>
        )}
      </div>
      {job.posted && <p className="mt-1 text-sm text-cream-dim">Posted {formatPosted(job.posted)}</p>}

      {job.experience && (
        <div className="mt-6">
          <h4 className="font-display text-sm uppercase tracking-[0.2em] text-gold">Experience</h4>
          <p className="mt-2 text-cream-dim">{job.experience}</p>
        </div>
      )}

      {job.requirements.length > 0 && (
        <div className="mt-6">
          <h4 className="font-display text-sm uppercase tracking-[0.2em] text-gold">Requirements</h4>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-cream-dim marker:text-gold">
            {job.requirements.map((req) => (
              <li key={req}>{req}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-8">
        <h4 className="font-display text-sm uppercase tracking-[0.2em] text-gold">How to apply</h4>
        {job.contactE164 ? (
          <div className="mt-3 flex flex-wrap gap-3">
            <ApplyCallButton e164={job.contactE164} display={job.contactDisplay} role={job.role} />
            <ApplyWhatsAppButton e164={job.contactE164} role={job.role} />
          </div>
        ) : (
          <p className="mt-2 text-cream-dim">
            {job.contactDisplay ? `Contact ${job.contactDisplay}.` : "Contact details coming soon."}
          </p>
        )}
      </div>
    </article>
  );
}

export default async function CareersPage() {
  // null = sheet unavailable -> hide the listings section; [] = no open roles.
  const jobs = await getJobs();

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <p className="font-display text-sm uppercase tracking-[0.3em] text-gold">Careers</p>
      <h1 className="mt-2 font-display text-4xl uppercase text-cream sm:text-5xl">Join Our Team</h1>
      <p className="mt-4 max-w-2xl text-cream-dim">
        Work with us at {SITE.name}, lagoon-side in Kalutara South. Have a look at the current vacancies
        below and get in touch to apply.
      </p>

      <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
        {jobs && (
          <section aria-labelledby="vacancies-heading">
            <h2 id="vacancies-heading" className="font-display text-2xl uppercase tracking-wide text-gold">
              Current Vacancies
            </h2>
            {jobs.length > 0 ? (
              <div className="mt-6 space-y-6">
                {jobs.map((job) => (
                  <JobCard key={`${job.role}-${job.posted ?? ""}`} job={job} />
                ))}
              </div>
            ) : (
              <p className="mt-4 text-cream-dim">
                There are no open positions right now &mdash; please check back soon.
              </p>
            )}
            <JobPostingSchema jobs={jobs} />
          </section>
        )}

        {/* Supporting branding only — the listings above are the real content.
            Sits after the text in the DOM so it never leads for screen readers. */}
        <aside className={`mx-auto w-full max-w-sm lg:sticky lg:top-24 ${jobs ? "" : "lg:col-start-1"}`}>
          <Image
            src="/images/careers-poster.jpg"
            alt="Ranmo Tea Bar and Restaurant now hiring a Restaurant Supervisor cum Steward. Contact 077 790 5705."
            width={1080}
            height={1080}
            sizes="(min-width: 1024px) 340px, (min-width: 640px) 384px, 90vw"
            loading="lazy"
            className="h-auto w-full rounded-2xl border border-white/10"
          />
        </aside>
      </div>

      <section className="mt-16" aria-labelledby="why-heading">
        <h2 id="why-heading" className="font-display text-2xl uppercase tracking-wide text-gold">
          Why Work With Us
        </h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_US.map((item) => (
            <li key={item.title} className="rounded-xl border border-white/10 border-t-gold bg-charcoal-light p-5 border-t-2">
              <h3 className="font-display text-lg uppercase tracking-wide text-cream">{item.title}</h3>
              <p className="mt-2 text-sm text-cream-dim">{item.text}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
