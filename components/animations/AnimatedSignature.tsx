"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function AnimatedSignature({ name }: { name: string }) {
  const path = useRef<SVGPathElement>(null);

  useEffect(() => {
    const el = path.current;
    if (!el) return;
    const length = el.getTotalLength();
    el.style.strokeDasharray = `${length}`;
    el.style.strokeDashoffset = `${length}`;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.strokeDashoffset = "0";
      return;
    }
    gsap.to(el, {
      strokeDashoffset: 0,
      duration: 2.2,
      ease: "power2.inOut",
      delay: 0.4,
    });
  }, []);

  return (
    <figure>
      <svg viewBox="0 0 280 60" className="w-56 text-walnut" aria-hidden>
        <path
          ref={path}
          d="M8 38 C 40 8, 70 52, 110 28 S 180 10, 240 36"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        />
      </svg>
      <figcaption className="mt-2 font-serif italic text-walnut">{name}</figcaption>
    </figure>
  );
}
