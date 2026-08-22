"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const tl = gsap.timeline();
    tl.fromTo(
      "[data-page]",
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
    );
  }, [pathname]);

  return <div data-page>{children}</div>;
}
