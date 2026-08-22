import type { Metadata } from "next";
import { ProcessTimeline } from "@/components/Timeline";
import { MarbleCard } from "@/components/MarbleCard";
import { SectionHeading } from "@/components/SectionHeading";
import { ConsultationCta } from "@/components/home/ConsultationCta";
import { AnimatedSignature } from "@/components/animations/AnimatedSignature";
import { commitments, philosophy, site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.name}, Chartered Accountant. Name, qualification, and professional commitments — without invented biography or awards.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "About", path: "/about" },
            ]),
          ),
        }}
      />
      <section className="marble-panel border-b border-border">
        <div className="container grid items-end gap-12 py-24 lg:grid-cols-2">
          <div>
            <p className="text-[11px] uppercase tracking-luxury text-champagne">About</p>
            <h1 className="mt-4 font-serif text-5xl text-navy md:text-7xl">{site.name}</h1>
            <p className="mt-6 max-w-lg text-lg text-muted">
              {site.qualification}. {site.institute}.
            </p>
          </div>
          <div className="aspect-[4/5] max-w-md border border-champagne/50 p-8">
            <div className="flex h-full flex-col justify-between">
              <p className="text-[11px] uppercase tracking-luxury text-champagne">
                Professional identity
              </p>
              <div>
                <p className="font-serif text-7xl text-navy">SB</p>
                <div className="mt-4">
                  <AnimatedSignature name={site.legalName} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-24">
        <SectionHeading
          eyebrow="Founder"
          title="Factual particulars only"
          description="A biography, photograph, years of experience, or list of achievements will be published only if supplied by the practitioner for this website. None of those items have been invented here."
        />
        <p className="mt-10 max-w-2xl text-lg leading-relaxed text-muted">
          The practice offers the services listed on the Practice Areas page. Work is
          undertaken under engagement letters. This page does not compare the practice with
          any other chartered accountant or firm.
        </p>
      </section>

      <section className="bg-stone/50 py-24">
        <div className="container">
          <SectionHeading eyebrow="Philosophy" title="How professional work is approached" />
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {philosophy.map((item) => (
              <MarbleCard key={item.title}>
                <h3 className="font-serif text-2xl text-navy">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.body}</p>
              </MarbleCard>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mb-8">
          <SectionHeading
            eyebrow="Process"
            title="How an engagement typically proceeds"
            description="This is a process description, not a career timeline or a promise of speed."
          />
        </div>
        <ProcessTimeline />
      </section>

      <section className="container py-24">
        <SectionHeading
          eyebrow="ICAI"
          title="Professional commitment"
          description="Language on this website is intended to remain within the ICAI Code of Ethics, 2026, including the advertisement guidelines."
        />
        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {commitments.map((c) => (
            <article key={c.title} className="border-t border-champagne/40 pt-6">
              <h3 className="font-serif text-2xl text-navy">{c.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{c.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container pb-24">
        <SectionHeading
          eyebrow="Premises"
          title="Office photographs"
          description="Photographs of the office will be shown only when the practitioner provides them. Stock interiors are not presented as this practice’s chambers."
        />
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="marble-panel h-48 border border-border" />
          <div className="marble-panel h-48 border border-border opacity-80" />
          <div className="marble-panel h-48 border border-border opacity-70" />
        </div>
      </section>

      <ConsultationCta />
    </>
  );
}
