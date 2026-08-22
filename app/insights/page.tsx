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
          <h1 className="mt-4 max-w-3xl font-serif text-5xl text-navy md:text-7xl">
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
          <div className="mt-10 overflow-x-auto border border-border bg-pearl/70">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-border text-[11px] uppercase tracking-luxury text-walnut">
                <tr>
                  <th className="px-6 py-4">When</th>
                  <th className="px-6 py-4">Item</th>
                </tr>
              </thead>
              <tbody>
                {taxCalendar.map((row) => (
                  <tr key={row.what} className="border-b border-border/70">
                    <td className="px-6 py-4 text-navy">{row.when}</td>
                    <td className="px-6 py-4 text-muted">{row.what}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="container py-20">
        <SectionHeading
          eyebrow="Checklists"
          title="Request a general guide"
          description="Checklists are sent on request. They are not marketed as paid products or as official forms."
        />
        <ul className="mt-10 divide-y divide-border border border-border">
          {guides.map((g) => (
            <li key={g.title} className="flex items-center justify-between px-6 py-5">
              <span className="font-serif text-xl text-navy">{g.title}</span>
              <Link href={g.href} className="text-[11px] uppercase tracking-luxury text-champagne">
                {g.type}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
