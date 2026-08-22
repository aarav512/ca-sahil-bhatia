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
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 18, mass: 0.3 });
  const springY = useSpring(y, { stiffness: 180, damping: 18, mass: 0.3 });

  const styles = {
    navy: "bg-navy text-pearl hover:bg-[#0e2a3e]",
    gold: "bg-champagne text-navy hover:bg-[#9c7a48]",
    outline: "border border-navy/25 bg-pearl/40 text-navy hover:border-champagne",
  }[variant];

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.18);
    y.set((e.clientY - r.top - r.height / 2) * 0.18);
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
      style={{ x: springX, y: springY }}
      className={cn(
        "inline-flex h-14 items-center justify-center px-8 text-[12px] font-medium uppercase tracking-[0.2em] transition-colors duration-300",
        styles,
        className,
      )}
    >
      {children}
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
