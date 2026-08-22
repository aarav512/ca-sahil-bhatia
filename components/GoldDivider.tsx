"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export function GoldDivider({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(el, { scaleX: 1, opacity: 1 });
      return;
    }
    gsap.fromTo(
      el,
      { scaleX: 0, opacity: 0.2 },
      {
        scaleX: 1,
        opacity: 1,
        duration: 1.15,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 88%" },
      },
    );
  }, []);

  return (
    <div
      ref={ref}
      className={cn("gold-line origin-center scale-x-0", className)}
      role="presentation"
    />
  );
}
