import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // The menu is fetched live from a Google Sheet (src/data/menu-source.ts).
    // Without this, `next dev` caches that fetch across ordinary reloads, so
    // sheet edits don't show up locally until a hard refresh (or don't show
    // up at all, since a hard refresh doesn't reliably repopulate the cache
    // either). Production revalidation is unaffected — that's governed by
    // `next: { revalidate: 300 }` on the fetch call itself.
    serverComponentsHmrCache: false,
  },
};

export default nextConfig;
