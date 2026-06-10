import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/en/admin/", "/fr/admin/"],
      },
    ],
    sitemap: "https://ormania.ca/sitemap.xml",
  };
}
