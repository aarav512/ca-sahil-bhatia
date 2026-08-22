"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

type Props = {
  href?: string;
  children: React.ReactNode;
  variant?: "navy" | "gold" | "outline";
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
};

export function LuxuryButton({
  href,
  children,
  variant = "navy",
  className,
  type = "button",
  onClick,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 16, mass: 0.25 });
  const springY = useSpring(y, { stiffness: 200, damping: 16, mass: 0.25 });

  const styles = {
    navy: "border border-[#17324D] bg-navy text-pearl",
    gold: "border border-champagne bg-champagne text-navy",
    outline: "border border-champagne/70 bg-transparent text-navy",
  }[variant];

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.22);
    y.set((e.clientY - r.top - r.height / 2) * 0.22);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
  }

  const inner = (
    <motion.span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileTap={{ scale: 0.98 }}
      style={{ x: springX, y: springY }}
      className={cn(
        "group/btn relative inline-flex h-14 items-center justify-center overflow-hidden px-9 font-body text-[12px] font-semibold uppercase tracking-[0.22em] shadow-brass transition-shadow duration-500 hover:shadow-glow",
        styles,
        className,
      )}
    >
      <span
        className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/35 to-transparent opacity-0 transition-opacity duration-300 group-hover/btn:animate-shine group-hover/btn:opacity-100"
        aria-hidden
      />
      <span className="relative z-10">{children}</span>
    </motion.span>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block" onClick={onClick}>
        {inner}
      </Link>
    );
  }

  return (
    <button type={type} className="inline-block" onClick={onClick}>
      {inner}
    </button>
  );
}
