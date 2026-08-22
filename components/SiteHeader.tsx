"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { nav, site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { LuxuryButton } from "./LuxuryButton";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-ivory/70 backdrop-blur-xl transition-all duration-500",
        scrolled ? "border-champagne/50 shadow-brass" : "border-border/40",
      )}
    >
      <div
        className={cn(
          "container flex items-center justify-between transition-all duration-500",
          scrolled ? "h-16" : "h-[4.75rem]",
        )}
      >
        <Link href="/" className="group" aria-label={`${site.name} home`}>
          <span className="block font-serif text-xl font-semibold tracking-tightish text-navy md:text-2xl">
            {site.name}
          </span>
          <span className="block font-body text-[10px] font-medium uppercase tracking-luxury text-champagne">
            {site.qualification}
          </span>
        </Link>
        <nav className="hidden items-center gap-9 lg:flex" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group relative font-body text-[11px] font-medium uppercase tracking-wideish text-walnut transition-colors hover:text-navy",
                pathname === item.href && "text-navy",
              )}
            >
              {item.label}
              <span
                className={cn(
                  "absolute -bottom-1 left-0 h-px bg-gold transition-all duration-500",
                  pathname === item.href ? "w-full" : "w-0 group-hover:w-full",
                )}
              />
            </Link>
          ))}
        </nav>
        <div className="hidden lg:block">
          <LuxuryButton href="/contact#enquiry" variant="gold" className="h-11 px-6 text-[11px]">
            Book a Consultation
          </LuxuryButton>
        </div>
        <button
          type="button"
          className="lg:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open ? (
        <div className="border-t border-border bg-ivory/95 px-6 py-8 backdrop-blur-xl lg:hidden">
          <nav className="flex flex-col gap-5" aria-label="Mobile">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-serif text-3xl font-semibold text-navy"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <LuxuryButton href="/contact#enquiry" variant="gold">
              Book a Consultation
            </LuxuryButton>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
