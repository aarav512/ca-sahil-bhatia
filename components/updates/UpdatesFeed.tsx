"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { fetchTaxUpdates, isRecent } from "@/lib/integrations/fetchUpdates";
import { integrations } from "@/lib/integrations/env";
import { updateCategories, type TaxUpdate } from "@/lib/integrations/updates";
import { formatDate } from "@/lib/utils";
import { Input } from "@/components/ui/input";

export function UpdatesFeed({ compact = false }: { compact?: boolean }) {
  const [items, setItems] = useState<TaxUpdate[]>([]);
  const [live, setLive] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<(typeof updateCategories)[number]>("All");

  useEffect(() => {
    let liveFlag = true;
    const load = () =>
      fetchTaxUpdates().then((res) => {
        if (!liveFlag) return;
        setItems(res.items);
        setLive(res.live);
        setError(res.error);
        setLoading(false);
      });
    load();
    const t = window.setInterval(load, integrations.updatesRefreshMs);
    return () => {
      liveFlag = false;
      window.clearInterval(t);
    };
  }, []);

  const filtered = useMemo(() => {
    return items.filter((d) => {
      const hay = `${d.title} ${d.summary} ${d.source} ${d.category}`.toLowerCase();
      const matchQ = hay.includes(q.toLowerCase());
      const matchC = cat === "All" || d.category === cat;
      return matchQ && matchC;
    });
  }, [items, q, cat]);

  const shown = compact ? filtered.slice(0, 6) : filtered;

  return (
    <div>
      {!compact ? (
        <>
          <p className="mb-8 text-sm text-muted">
            {live
              ? "Notifications are collected automatically from the official CBIC, Income Tax, and MCA websites. Confirm each item on the government page before relying on it."
              : "Until the next successful collection from official websites, these cards open the CBIC, Income Tax, and MCA portals. They are not invented notifications."}
          </p>
          {error ? <p className="mb-6 text-sm text-walnut">{error}</p> : null}
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <label className="block w-full max-w-md">
              <span className="text-[11px] uppercase tracking-luxury text-champagne">Search</span>
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search updates"
                aria-label="Search updates"
                className="mt-2"
              />
            </label>
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Update categories">
              {updateCategories.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCat(c)}
                  className={`px-4 py-2 text-[11px] uppercase tracking-wideish ${
                    cat === c ? "bg-navy text-pearl" : "border border-border text-navy"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </>
      ) : null}

      {loading ? (
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: compact ? 3 : 6 }).map((_, i) => (
            <div key={i} className="h-48 animate-pulse border border-border bg-stone/50" />
          ))}
        </div>
      ) : shown.length === 0 ? (
        <p className="mt-10 text-muted">No updates match that search.</p>
      ) : (
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {shown.map((item) => (
            <article key={item.id} className="flex flex-col border border-champagne/30 bg-pearl/70 p-8">
              <div className="flex flex-wrap items-center gap-2">
                <span className="border border-border px-2 py-1 text-[10px] uppercase tracking-wideish text-navy">
                  {item.source}
                </span>
                {isRecent(item.publishedAt) ? (
                  <span className="bg-champagne/20 px-2 py-1 text-[10px] uppercase tracking-wideish text-walnut">
                    New
                  </span>
                ) : null}
              </div>
              <h3 className="mt-4 font-serif text-2xl text-navy">{item.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{item.summary}</p>
              <p className="mt-4 text-xs text-walnut">
                {item.publishedAt ? formatDate(item.publishedAt) : "See official page for dates"}
              </p>
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block text-[11px] uppercase tracking-luxury text-champagne"
              >
                Read Official Notification
              </a>
            </article>
          ))}
        </div>
      )}

      {compact ? (
        <p className="mt-10">
          <Link href="/updates" className="text-[11px] uppercase tracking-luxury text-navy">
            All tax and compliance updates
          </Link>
        </p>
      ) : null}
    </div>
  );
}
