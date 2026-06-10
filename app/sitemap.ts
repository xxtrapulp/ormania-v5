import type { MetadataRoute } from "next";
import { IG_POSTS } from "@/lib/data";

export const dynamic = "force-static";

const BASE = "https://ormania.ca";
const PAGES = ["", "collections", "instagram", "custom", "repairs", "engagement", "visit", "explore"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  for (const lang of ["en", "fr"]) {
    for (const page of PAGES) {
      entries.push({
        url: `${BASE}/${lang}${page ? `/${page}` : ""}/`,
        changeFrequency: page === "" || page === "instagram" ? "weekly" : "monthly",
        priority: page === "" ? 1 : page === "instagram" ? 0.9 : 0.7,
      });
    }
    for (const p of IG_POSTS) {
      entries.push({
        url: `${BASE}/${lang}/product/${p.code}/`,
        changeFrequency: "weekly",
        priority: 0.6,
      });
    }
  }
  return entries;
}
