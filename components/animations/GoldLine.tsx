"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function GoldLine({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(el, { scaleX: 1 });
      return;
    }
    gsap.fromTo(
      el,
      { scaleX: 0 },
      { scaleX: 1, duration: 1.4, ease: "power3.inOut", delay: 0.35 },
    );
  }, []);

  return (
    <div
      ref={ref}
      className={`h-px origin-left bg-gradient-to-r from-transparent via-champagne to-transparent ${className}`}
      role="presentation"
    />
  );
}
