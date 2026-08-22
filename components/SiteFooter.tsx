import Link from "next/link";
import { nav, site } from "@/lib/site";
import { GoldDivider } from "./GoldDivider";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-stone/60">
      <div className="container py-16">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <p className="font-serif text-2xl text-navy">{site.name}</p>
            <p className="mt-2 text-sm text-muted">
              {site.qualification}
              <br />
              {site.institute}
            </p>
          </div>
          <nav aria-label="Footer">
            <p className="text-[11px] uppercase tracking-luxury text-champagne">
              Navigate
            </p>
            <ul className="mt-4 space-y-2">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-navy hover:text-walnut">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="text-[11px] uppercase tracking-luxury text-champagne">
              Contact
            </p>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Enquiries are received through the consultation form. Meetings are by appointment.
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-block text-[11px] uppercase tracking-luxury text-navy"
            >
              Request Professional Assistance
            </Link>
          </div>
        </div>
        <GoldDivider className="my-10" />
        <p className="max-w-4xl text-xs leading-relaxed text-muted">{site.disclaimer}</p>
        <p className="mt-6 text-[11px] tracking-wideish text-walnut/70">
          © {new Date().getFullYear()} {site.name}. All rights reserved. This site does not solicit work through comparison, rankings, or promised outcomes.
        </p>
      </div>
    </footer>
  );
}
