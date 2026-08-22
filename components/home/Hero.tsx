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
      gsap.from("[data-hero-kicker]", {
        y: 18,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      });
      gsap.from("[data-hero-title]", {
        y: 56,
        opacity: 0,
        duration: 1.25,
        ease: "power4.out",
        delay: 0.12,
      });
      gsap.from("[data-hero-copy]", {
        y: 24,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.32,
      });
      gsap.from("[data-hero-cta]", {
        y: 28,
        opacity: 0,
        duration: 0.95,
        ease: "power3.out",
        delay: 0.48,
      });
    }, el);

    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 18;
      const y = (e.clientY / window.innerHeight - 0.5) * 10;
      gsap.to("[data-parallax]", { x, y, duration: 1.15, ease: "power2.out" });
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
        className="pointer-events-none absolute inset-0 animate-sunlight bg-[radial-gradient(ellipse_at_18%_0%,rgba(255,255,255,0.92),transparent_52%),radial-gradient(ellipse_at_82%_18%,rgba(200,169,107,0.16),transparent_46%)]"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 opacity-45" aria-hidden>
        {Array.from({ length: 26 }).map((_, i) => (
          <span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-gold/50"
            style={{
              left: `${(i * 17) % 100}%`,
              top: `${(i * 23) % 100}%`,
              animation: `sunlight ${14 + (i % 5)}s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>
      <div className="container relative z-10 grid items-center gap-12 py-28 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-12">
        <div>
          <p
            data-hero-kicker
            className="font-body text-[11px] font-medium uppercase tracking-luxury text-champagne"
          >
            {site.qualification} · {site.institute}
          </p>
          <h1
            data-hero-title
            className="mt-7 max-w-xl font-serif text-4xl font-semibold leading-[1.06] tracking-tightish text-navy sm:text-5xl md:text-6xl lg:text-[3.85rem]"
          >
            Chartered accountancy services for businesses and individuals.
          </h1>
          <GoldLine className="my-10 max-w-md" />
          <p data-hero-copy className="max-w-xl text-lg font-medium leading-relaxed text-muted">
            Income tax, GST, company law filings, audit, accounting, and related professional
            services — described here as the scope of work, not as promised results.
          </p>
          <div data-hero-cta className="mt-12 flex flex-wrap gap-4">
            <LuxuryButton href="/contact#enquiry" variant="gold">
              Schedule a Meeting
            </LuxuryButton>
            <LuxuryButton href="/practice-areas" variant="outline">
              Explore Practice Areas
            </LuxuryButton>
          </div>
        </div>
        <div className="relative min-h-[340px] lg:min-h-[520px]">
          <LuxurySceneLazy compact />
        </div>
      </div>
    </section>
  );
}
