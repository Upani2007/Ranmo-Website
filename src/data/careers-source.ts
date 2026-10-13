import "server-only";
import { unstable_rethrow } from "next/navigation";
import { parseCsv } from "@/lib/csv";

// "Jobs" tab of the same published spreadsheet as the menus (different gid).
// Editing the sheet updates /careers on the next page load — no redeploy.
const JOBS_SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTfFEbLn6-aVsdIKNf31fgnOfb5dg-9EBnzdSMIoi2g0SlJJq5rJ58w4dNyOe98AdxvkB1yzgUuVtxF/pub?gid=169444502&single=true&output=csv";

export type JobListing = {
  role: string;
  employmentType: string;
  experience: string;
  requirements: string[];
  /** Contact number exactly as typed in the sheet, for display. */
  contactDisplay: string;
  /** Digits-only E.164 without the "+" (e.g. 94777905705), or null if unusable. */
  contactE164: string | null;
  /** ISO date (YYYY-MM-DD) or null if the sheet value wasn't a valid date. */
  posted: string | null;
};

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

/** Sri Lankan numbers: "077 790 5705" / "+94 77 790 5705" / "94777905705" -> "94777905705". */
function toE164Digits(raw: string): string | null {
  const digits = raw.replace(/\D/g, "");
  if (digits.startsWith("94") && digits.length === 11) return digits;
  if (digits.startsWith("0") && digits.length === 10) return `94${digits.slice(1)}`;
  return null;
}

function normaliseDate(raw: string): string | null {
  const value = raw.trim();
  if (!ISO_DATE.test(value)) return null;
  return Number.isNaN(Date.parse(value)) ? null : value;
}

/** Pure CSV -> listings parser (active rows only), split out so it's testable without a network call. */
export function parseJobsCsv(csvText: string): JobListing[] {
  const rows = parseCsv(csvText);
  if (rows.length < 2) return [];

  const header = rows[0].map((h) => h.trim().toLowerCase());
  const col = (name: string) => header.indexOf(name);
  const idx = {
    role: col("role"),
    type: col("employment type"),
    experience: col("experience"),
    requirements: col("requirements"),
    contact: col("contact"),
    active: col("active"),
    posted: col("posted"),
  };
  if (idx.role === -1 || idx.active === -1) {
    console.error("[careers] Jobs sheet is missing the Role or Active column; hiding listings.");
    return [];
  }

  const cell = (row: string[], i: number) => (i === -1 ? "" : (row[i] ?? "").trim());
  const jobs: JobListing[] = [];

  for (const row of rows.slice(1)) {
    const role = cell(row, idx.role);
    if (!role) continue; // blank or malformed row
    if (cell(row, idx.active).toLowerCase() !== "yes") continue;

    const contactDisplay = cell(row, idx.contact);
    jobs.push({
      role,
      employmentType: cell(row, idx.type),
      experience: cell(row, idx.experience),
      requirements: cell(row, idx.requirements)
        .split("|")
        .map((r) => r.trim())
        .filter(Boolean),
      contactDisplay,
      contactE164: toE164Digits(contactDisplay),
      posted: normaliseDate(cell(row, idx.posted)),
    });
  }

  return jobs;
}

/**
 * Live job listings. Returns `null` if the sheet can't be fetched or parsed (so
 * the page can hide the section entirely), and `[]` if it loaded fine but has
 * no active roles. Never cached, same as the menus.
 */
export async function getJobs(): Promise<JobListing[] | null> {
  try {
    const res = await fetch(JOBS_SHEET_CSV_URL, { next: { revalidate: 0 } });
    if (!res.ok) {
      console.error(`[careers] Failed to fetch jobs sheet: HTTP ${res.status}`);
      return null;
    }
    const text = (await res.text()).replace(/^﻿/, "");
    // Google serves an HTML sign-in/error page with a 200 for unpublished tabs.
    if (/^\s*<(!doctype|html)/i.test(text)) {
      console.error("[careers] Jobs sheet returned HTML, not CSV — is the tab published?");
      return null;
    }
    return parseJobsCsv(text);
  } catch (err) {
    // Next throws a DYNAMIC_SERVER_USAGE control-flow error here during static
    // generation; it must propagate rather than be swallowed as a failure.
    unstable_rethrow(err);
    console.error("[careers] Failed to fetch jobs sheet:", err);
    return null;
  }
}
