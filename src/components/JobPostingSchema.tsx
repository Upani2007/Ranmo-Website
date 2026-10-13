import { SITE } from "@/data/site";
import type { JobListing } from "@/data/careers-source";

const EMPLOYMENT_TYPES: Record<string, string> = {
  "full-time": "FULL_TIME",
  "full time": "FULL_TIME",
  "part-time": "PART_TIME",
  "part time": "PART_TIME",
  contract: "CONTRACTOR",
  temporary: "TEMPORARY",
  internship: "INTERN",
};

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function describe(job: JobListing): string {
  const parts = [`<p>${escapeHtml(SITE.name)} is hiring a ${escapeHtml(job.role)} at our Kalutara South restaurant.</p>`];
  if (job.experience) parts.push(`<p><strong>Experience:</strong> ${escapeHtml(job.experience)}</p>`);
  if (job.requirements.length) {
    parts.push(`<p><strong>Requirements:</strong></p><ul>${job.requirements.map((r) => `<li>${escapeHtml(r)}</li>`).join("")}</ul>`);
  }
  return parts.join("");
}

function jobPosting(job: JobListing) {
  const years = job.experience.match(/(\d+)\s*(?:\+\s*)?years?/i);
  const employmentType = EMPLOYMENT_TYPES[job.employmentType.toLowerCase()];

  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.role,
    description: describe(job),
    datePosted: job.posted,
    ...(employmentType && { employmentType }),
    directApply: false,
    hiringOrganization: { "@type": "Organization", name: SITE.name, sameAs: SITE.url },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        streetAddress: SITE.address.line1,
        addressLocality: SITE.address.line2,
        addressCountry: "LK",
      },
    },
    ...(years && {
      experienceRequirements: {
        "@type": "OccupationalExperienceRequirements",
        monthsOfExperience: Number(years[1]) * 12,
      },
    }),
    url: `${SITE.url}/careers`,
  };
}

/** One JobPosting JSON-LD block per role. Roles without a valid Posted date are skipped (datePosted is required by Google). */
export function JobPostingSchema({ jobs }: { jobs: JobListing[] }) {
  return (
    <>
      {jobs
        .filter((job) => job.posted)
        .map((job) => (
          <script
            key={job.role}
            type="application/ld+json"
            // "<" escaped so sheet content can never close the script tag.
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jobPosting(job)).replace(/</g, "\\u003c") }}
          />
        ))}
    </>
  );
}
