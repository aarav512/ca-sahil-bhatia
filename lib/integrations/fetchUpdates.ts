import { integrations } from "./env";
import { officialSources, type TaxUpdate } from "./updates";

function parseFeed(data: unknown): TaxUpdate[] {
  if (!Array.isArray(data)) return [];
  return data
    .map((row, i) => {
      const r = row as Record<string, string>;
      if (!r.title || !r.url) return null;
      return {
        id: r.id || `feed-${i}`,
        title: r.title,
        source: (r.source as TaxUpdate["source"]) || "CBIC",
        category: (r.category as TaxUpdate["category"]) || "Compliance",
        publishedAt: r.publishedAt || r.date || "",
        summary: r.summary || r.title,
        url: r.url,
      } satisfies TaxUpdate;
    })
    .filter((x): x is TaxUpdate => Boolean(x));
}

async function loadJson(url: string) {
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Feed ${res.status}`);
  return res.json();
}

export async function fetchTaxUpdates(): Promise<{
  items: TaxUpdate[];
  live: boolean;
  error?: string;
}> {
  const urls = [integrations.updatesJsonUrl, "/data/updates.json"].filter(
    (url, i, arr) => Boolean(url) && arr.indexOf(url) === i,
  ) as string[];

  const collected: TaxUpdate[] = [];
  const errors: string[] = [];

  for (const target of urls) {
    try {
      const url = integrations.updatesProxy && target.startsWith("http")
        ? `${integrations.updatesProxy}${encodeURIComponent(target)}`
        : target;
      const json = await loadJson(url);
      const items = parseFeed(json.items ?? json);
      collected.push(...items);
    } catch (err) {
      errors.push(err instanceof Error ? err.message : "Feed unavailable");
    }
  }

  const seen = new Set<string>();
  const items = collected.filter((item) => {
    const key = item.url + item.title;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  items.sort((a, b) => (b.publishedAt || "").localeCompare(a.publishedAt || ""));

  if (!items.length) {
    return {
      items: [...officialSources],
      live: false,
      error: errors[0],
    };
  }

  const present = new Set(items.map((item) => item.source));
  officialSources.forEach((portal) => {
    if (!present.has(portal.source)) items.push(portal);
  });
  items.sort((a, b) => (b.publishedAt || "").localeCompare(a.publishedAt || ""));

  return { items, live: true, error: errors[0] };
}

export function isRecent(iso: string, days = 14) {
  if (!iso) return false;
  const t = Date.parse(iso);
  if (Number.isNaN(t)) return false;
  return Date.now() - t < days * 24 * 60 * 60 * 1000;
}
