import type { MetadataRoute } from "next";
import { insights, site } from "@/lib/site";

export const dynamic = "force-static";
export const revalidate = false;

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/about", "/practice-areas", "/consultation", "/documents", "/updates", "/insights", "/contact"].map((path) => ({
    url: `${site.url}${path || "/"}`,
    lastModified: new Date("2026-08-22"),
    changeFrequency: "monthly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const articles = insights.map((article) => ({
    url: `${site.url}/insights/${article.slug}`,
    lastModified: new Date(article.date),
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));

  return [...pages, ...articles];
}
