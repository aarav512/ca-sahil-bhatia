"use client";

import Link from "next/link";
import { useRef } from "react";
import { PracticeArea } from "@/lib/site";
import { cn } from "@/lib/utils";

export function PracticeCard({
  area,
  index,
  className,
}: {
  area: PracticeArea;
  index?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const rx = ((e.clientY - r.top) / r.height - 0.5) * -7;
    const ry = ((e.clientX - r.left) / r.width - 0.5) * 7;
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
  }

  function onLeave() {
    if (ref.current) ref.current.style.transform = "perspective(900px) rotateX(0) rotateY(0)";
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn(
        "group relative overflow-hidden border border-champagne/35 bg-pearl/70 p-10 shadow-lift transition-transform duration-300 will-change-transform hover:border-gold hover:shadow-glow",
        className,
      )}
    >
      <span className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_30%_20%,rgba(200,169,107,0.12),transparent_55%)]" />
      <Link href={`/practice-areas#${area.slug}`} className="relative block">
        <span className="font-serif text-sm text-champagne">
          {String((index ?? 0) + 1).padStart(2, "0")}
        </span>
        <h3 className="mt-8 font-serif text-2xl font-semibold tracking-tightish text-navy">
          {area.title}
        </h3>
        <p className="mt-4 text-sm font-medium leading-relaxed text-muted">{area.summary}</p>
        <span className="mt-10 inline-block h-px w-8 origin-left bg-gold transition-all duration-500 group-hover:w-20" />
        <p className="mt-5 font-body text-[11px] font-semibold uppercase tracking-luxury text-walnut">
          View scope
        </p>
      </Link>
      <Link
        href={`/consultation?service=${area.slug}`}
        className="relative mt-4 inline-block font-body text-[11px] font-semibold uppercase tracking-luxury text-champagne"
      >
        Get Consultation
      </Link>
    </div>
  );
}
