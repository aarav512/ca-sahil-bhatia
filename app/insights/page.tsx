import type { Metadata } from "next";
import Link from "next/link";
import { InsightsBrowser } from "@/components/insights/InsightsBrowser";
import { SectionHeading } from "@/components/SectionHeading";
import { guides, site, taxCalendar } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Insights",
  description: `General notes on tax and company-law compliance from ${site.name}. Not professional advice.`,
  alternates: { canonical: "/insights" },
};

export default function InsightsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Insights", path: "/insights" },
            ]),
          ),
        }}
      />
      <section className="marble-panel border-b border-border">
        <div className="container py-24">
          <p className="text-[11px] uppercase tracking-luxury text-champagne">Insights</p>
          <h1 className="mt-5 max-w-3xl font-serif text-5xl font-semibold tracking-tightish text-navy md:text-7xl">
            Notes for general information
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            These articles are educational. They are not advice for a particular person or
            transaction. Confirm current due dates from official notifications.
          </p>
        </div>
      </section>

      <section className="container py-20">
        <InsightsBrowser />
      </section>

      <section className="bg-stone/50 py-20">
        <div className="container">
          <SectionHeading
            eyebrow="Calendar"
            title="Statutory due dates"
            description="Dates change by notification. Treat the following as a reminder to check the official calendar — not as a filing timetable for any year."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {taxCalendar.map((row) => (
              <article
                key={row.what}
                className="border border-champagne/30 bg-pearl/70 p-8 transition-shadow hover:shadow-lift"
              >
                <p className="font-body text-[11px] font-medium uppercase tracking-luxury text-champagne">
                  {row.when}
                </p>
                <p className="mt-4 font-serif text-xl font-semibold text-navy">{row.what}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-20">
        <SectionHeading
          eyebrow="Checklists"
          title="Request a general guide"
          description="Checklists are sent on request. They are not marketed as paid products or as official forms."
        />
        <ul className="mt-12 grid gap-6 md:grid-cols-3">
          {guides.map((g) => (
            <li key={g.title}>
              <Link
                href={g.href}
                className="block h-full border border-champagne/35 bg-pearl/70 p-8 transition-all hover:-translate-y-1 hover:border-gold hover:shadow-lift"
              >
                <span className="font-serif text-xl font-semibold text-navy">{g.title}</span>
                <span className="mt-6 block font-body text-[11px] font-semibold uppercase tracking-luxury text-champagne">
                  {g.type}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
