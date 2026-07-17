import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/menu/print"],
    },
    sitemap: "https://ranmo.example.com/sitemap.xml",
  };
}
