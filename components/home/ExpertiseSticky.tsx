"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Scale, Landmark, FileSpreadsheet, PenLine } from "lucide-react";
import { practiceAreas } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger);

const icons = [Scale, Landmark, FileSpreadsheet, PenLine];

export function ExpertiseSticky() {
  const pin = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = pin.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const panels = el.querySelectorAll("[data-panel]");
    const ctx = gsap.context(() => {
      panels.forEach((panel) => {
        gsap.from(panel, {
          opacity: 0.15,
          y: 40,
          scrollTrigger: {
            trigger: panel,
            start: "top 75%",
            end: "top 40%",
            scrub: true,
          },
        });
      });
    }, el);

    return () => ctx.revert();
  }, []);

  const featured = practiceAreas.slice(0, 4);

  return (
    <section className="border-y border-border bg-ivory py-32">
      <div ref={pin} className="container grid gap-16 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="text-[11px] uppercase tracking-luxury text-champagne">
            Scope of work
          </p>
          <h2 className="mt-4 font-serif text-4xl text-navy md:text-5xl">
            Practice areas, stated without ornament.
          </h2>
          <p className="mt-6 max-w-md text-muted leading-relaxed">
            Each desk is a professional service. Filings and opinions follow statute and
            the papers on the file. Competent authorities decide registrations, assessments, and refunds.
          </p>
        </div>
        <div className="space-y-8">
          {featured.map((area, i) => {
            const Icon = icons[i % icons.length];
            return (
              <article
                key={area.slug}
                data-panel
                className="border border-border bg-pearl/70 p-8"
              >
                <Icon className="h-6 w-6 text-champagne" aria-hidden />
                <h3 className="mt-5 font-serif text-2xl text-navy">{area.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{area.scope}</p>
                <a
                  href={`/consultation?service=${area.slug}`}
                  className="mt-6 inline-block text-[11px] uppercase tracking-luxury text-champagne"
                >
                  Get Consultation
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
