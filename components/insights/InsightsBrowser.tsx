"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { insights } from "@/lib/site";
import { formatDate } from "@/lib/utils";
import { Input } from "@/components/ui/input";

const categories = ["All", ...Array.from(new Set(insights.map((i) => i.category)))];

export function InsightsBrowser() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");

  const filtered = useMemo(() => {
    return insights.filter((item) => {
      const hay = `${item.title} ${item.excerpt} ${item.category}`.toLowerCase();
      const matchQ = hay.includes(q.toLowerCase());
      const matchC = cat === "All" || item.category === cat;
      return matchQ && matchC;
    });
  }, [q, cat]);

  const featured = insights.find((i) => i.featured);

  return (
    <div>
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <label className="block w-full max-w-md">
          <span className="text-[11px] uppercase tracking-luxury text-champagne">
            Search notes
          </span>
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by topic"
            aria-label="Search insights"
            className="mt-2"
          />
        </label>
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Categories">
          {categories.map((c) => (
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

      {featured && cat === "All" && !q ? (
        <Link
          href={`/insights/${featured.slug}`}
          className="mt-12 grid gap-8 border border-border bg-pearl/60 p-8 transition-transform hover:-translate-y-1 md:grid-cols-2 md:p-12"
        >
          <div>
            <p className="text-[11px] uppercase tracking-luxury text-champagne">
              Featured note
            </p>
            <h2 className="mt-4 font-serif text-3xl text-navy md:text-4xl">{featured.title}</h2>
            <p className="mt-4 text-muted">{featured.excerpt}</p>
            <p className="mt-6 text-xs text-walnut">
              {formatDate(featured.date)} · {featured.read}
            </p>
          </div>
          <div className="marble-panel min-h-48" />
        </Link>
      ) : null}

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <Link
            key={item.slug}
            href={`/insights/${item.slug}`}
            className="group border border-border bg-ivory p-7 transition-all duration-500 hover:border-champagne/50 hover:shadow-lift"
          >
            <p className="text-[11px] uppercase tracking-luxury text-champagne">
              {item.category}
            </p>
            <h3 className="mt-4 font-serif text-2xl text-navy group-hover:underline decoration-champagne/50 underline-offset-4">
              {item.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{item.excerpt}</p>
            <p className="mt-6 text-xs text-walnut">
              {formatDate(item.date)} · {item.read}
            </p>
          </Link>
        ))}
      </div>
      {filtered.length === 0 ? (
        <p className="mt-12 text-muted">No notes match that search.</p>
      ) : null}
    </div>
  );
}
