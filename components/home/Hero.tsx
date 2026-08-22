"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { LuxuryButton } from "@/components/LuxuryButton";
import { GoldLine } from "@/components/animations/GoldLine";
import { LuxurySceneLazy } from "@/components/3d/LuxurySceneLazy";
import { site } from "@/lib/site";

export function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-hero-item]", {
        y: 40,
        opacity: 0,
        duration: 1.1,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.15,
      });
    }, el);

    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 14;
      const y = (e.clientY / window.innerHeight - 0.5) * 8;
      gsap.to("[data-parallax]", { x, y, duration: 1, ease: "power2.out" });
    };
    window.addEventListener("mousemove", onMove);

    return () => {
      ctx.revert();
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <section
      ref={root}
      className="relative flex min-h-[100svh] items-center overflow-hidden marble-panel"
    >
      <div
        data-parallax
        className="pointer-events-none absolute inset-0 animate-sunlight bg-[radial-gradient(ellipse_at_20%_0%,rgba(255,255,255,0.9),transparent_50%),radial-gradient(ellipse_at_80%_20%,rgba(176,141,87,0.14),transparent_45%)]"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden>
        {Array.from({ length: 22 }).map((_, i) => (
          <span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-champagne/40"
            style={{
              left: `${(i * 17) % 100}%`,
              top: `${(i * 23) % 100}%`,
              animation: `sunlight ${14 + (i % 5)}s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>
      <div className="container relative z-10 grid items-center gap-8 py-24 lg:grid-cols-[1.05fr_0.95fr] lg:py-8">
        <div>
          <p data-hero-item className="text-[11px] uppercase tracking-luxury text-champagne">
            {site.qualification} · {site.institute}
          </p>
          <h1
            data-hero-item
            className="mt-6 max-w-xl font-serif text-4xl leading-[1.08] text-navy sm:text-5xl md:text-6xl lg:text-[3.65rem]"
          >
            Chartered accountancy services for businesses and individuals.
          </h1>
          <GoldLine className="my-8 max-w-md" />
          <p data-hero-item className="max-w-xl text-lg leading-relaxed text-muted">
            Income tax, GST, company law filings, audit, accounting, and related professional
            services — described here as the scope of work, not as promised results.
          </p>
          <div data-hero-item className="mt-10 flex flex-wrap gap-4">
            <LuxuryButton href="/contact#enquiry" variant="gold">
              Schedule a Meeting
            </LuxuryButton>
            <LuxuryButton href="/practice-areas" variant="outline">
              Explore Practice Areas
            </LuxuryButton>
          </div>
        </div>
        <div data-hero-item className="relative min-h-[320px] lg:min-h-[480px]">
          <LuxurySceneLazy compact />
        </div>
      </div>
    </section>
  );
}
