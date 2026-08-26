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
        summary: r.summary || "",
        url: r.url,
      } satisfies TaxUpdate;
    })
    .filter((x): x is TaxUpdate => Boolean(x));
}

export async function fetchTaxUpdates(): Promise<{
  items: TaxUpdate[];
  live: boolean;
  error?: string;
}> {
  const target = integrations.updatesJsonUrl;
  if (!target) {
    return { items: [...officialSources], live: false };
  }

  const url = integrations.updatesProxy
    ? `${integrations.updatesProxy}${encodeURIComponent(target)}`
    : target;

  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) throw new Error(`Feed ${res.status}`);
    const json = await res.json();
    const items = parseFeed(json.items ?? json);
    if (!items.length) return { items: [...officialSources], live: false };
    items.sort((a, b) => (b.publishedAt || "").localeCompare(a.publishedAt || ""));
    return { items, live: true };
  } catch (err) {
    return {
      items: [...officialSources],
      live: false,
      error: err instanceof Error ? err.message : "Feed unavailable",
    };
  }
}

export function isRecent(iso: string, days = 14) {
  if (!iso) return false;
  const t = Date.parse(iso);
  if (Number.isNaN(t)) return false;
  return Date.now() - t < days * 24 * 60 * 60 * 1000;
}
