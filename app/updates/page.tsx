import type { Metadata } from "next";
import { UpdatesFeed } from "@/components/updates/UpdatesFeed";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Latest Tax & Compliance Updates",
  description: `GST, income-tax, ITR, and MCA notifications collected for clients of ${site.name}. Confirm each item on the official government page.`,
  alternates: { canonical: "/updates" },
};

export default function UpdatesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Updates", path: "/updates" },
            ]),
          ),
        }}
      />
      <section className="marble-panel border-b border-border">
        <div className="container py-24">
          <p className="text-[11px] uppercase tracking-luxury text-champagne">
            Tax and compliance
          </p>
          <h1 className="mt-5 max-w-3xl font-serif text-5xl font-semibold tracking-tightish text-navy md:text-7xl">
            Latest tax and compliance updates
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            A single place to open CBIC (GST), Income Tax Department, and MCA notifications. Dates
            and summaries on a live feed must still be checked on the official page.
          </p>
        </div>
      </section>
      <section className="container py-20">
        <UpdatesFeed />
      </section>
    </>
  );
}
