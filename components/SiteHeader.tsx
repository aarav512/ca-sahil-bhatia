"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { nav, site } from "@/lib/site";
import { cn } from "@/lib/utils";
import { LuxuryButton } from "./LuxuryButton";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-ivory/90 backdrop-blur-md">
      <div className="container flex h-[4.5rem] items-center justify-between">
        <Link href="/" className="group" aria-label={`${site.name} home`}>
          <span className="block font-serif text-xl tracking-tight text-navy md:text-2xl">
            {site.name}
          </span>
          <span className="block text-[10px] uppercase tracking-luxury text-champagne">
            {site.qualification}
          </span>
        </Link>
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group relative text-[12px] uppercase tracking-wideish text-walnut transition-colors hover:text-navy",
                pathname === item.href && "text-navy",
              )}
            >
              {item.label}
              <span
                className={cn(
                  "absolute -bottom-1 left-0 h-px bg-champagne transition-all duration-300",
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
        <div className="border-t border-border bg-pearl px-6 py-6 lg:hidden">
          <nav className="flex flex-col gap-4" aria-label="Mobile">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-serif text-2xl text-navy"
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
