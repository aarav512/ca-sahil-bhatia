"use client";

import { useState } from "react";
import Link from "next/link";
import { nav, practiceAreas, site } from "@/lib/site";
import { GoldDivider } from "./GoldDivider";

export function SiteFooter() {
  const [note, setNote] = useState("");

  return (
    <footer className="border-t border-border bg-stone paper-linen">
      <div className="container py-24">
        <div className="grid gap-16 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <p className="font-serif text-3xl font-semibold tracking-tightish text-navy">{site.name}</p>
            <p className="mt-3 text-sm font-medium text-muted">
              {site.qualification}
              <br />
              {site.institute}
            </p>
          </div>
          <nav aria-label="Footer">
            <p className="font-body text-[11px] font-medium uppercase tracking-luxury text-champagne">
              Navigate
            </p>
            <ul className="mt-5 space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm font-medium text-navy transition-colors hover:text-champagne"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="font-body text-[11px] font-medium uppercase tracking-luxury text-champagne">
              Practice areas
            </p>
            <ul className="mt-5 space-y-2">
              {practiceAreas.slice(0, 6).map((area) => (
                <li key={area.slug}>
                  <Link
                    href={`/practice-areas#${area.slug}`}
                    className="text-sm font-medium text-navy/80 hover:text-navy"
                  >
                    {area.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-body text-[11px] font-medium uppercase tracking-luxury text-champagne">
              Notes by email
            </p>
            <p className="mt-4 text-sm font-medium leading-relaxed text-muted">
              There is no automated mailing list on this site. Use the consultation form if you wish
              to receive a general note when one is prepared.
            </p>
            <form
              className="mt-5"
              onSubmit={(e) => {
                e.preventDefault();
                setNote("Please use the consultation form. Nothing is subscribed automatically.");
              }}
            >
              <label htmlFor="footer-email" className="sr-only">
                Email
              </label>
              <input
                id="footer-email"
                type="email"
                required
                placeholder="Email"
                className="w-full border-b border-border bg-transparent py-3 text-sm outline-none focus:border-champagne"
              />
              <button
                type="submit"
                className="mt-4 font-body text-[11px] font-semibold uppercase tracking-luxury text-navy"
              >
                Request a note
              </button>
            </form>
            {note ? <p className="mt-3 text-xs text-walnut">{note}</p> : null}
            <p className="mt-8 text-sm font-medium leading-relaxed text-muted">
              Meetings by appointment. Address, telephone, and WhatsApp are shown on the Contact page
              only when supplied for publication.
            </p>
          </div>
        </div>
        <GoldDivider className="my-14" />
        <div className="grid gap-8 md:grid-cols-2">
          <details className="text-sm text-muted">
            <summary className="cursor-pointer font-medium text-navy">Privacy</summary>
            <p className="mt-3 leading-relaxed">
              Enquiries you type into the form remain on this device unless you send them by your own
              email or other channel. This website does not operate an account, login, or client portal.
            </p>
          </details>
          <details className="text-sm text-muted">
            <summary className="cursor-pointer font-medium text-navy">Terms of use</summary>
            <p className="mt-3 leading-relaxed">
              Pages describe professional services. They do not create an engagement. An engagement
              begins only with a written letter accepted by both parties.
            </p>
          </details>
        </div>
        <p className="mt-10 max-w-4xl text-xs leading-relaxed text-muted">{site.disclaimer}</p>
        <p className="mt-6 font-body text-[11px] font-medium tracking-wideish text-walnut/70">
          © {new Date().getFullYear()} {site.name}. All rights reserved. This site does not solicit work
          through comparison, rankings, or promised outcomes.
        </p>
      </div>
    </footer>
  );
}
