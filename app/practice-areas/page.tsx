import type { Metadata } from "next";
import { LuxuryButton } from "@/components/LuxuryButton";
import { GoldDivider } from "@/components/GoldDivider";
import { FaqList } from "@/components/FaqList";
import { PracticeEnquiryForm } from "@/components/practice/PracticeEnquiryForm";
import { PracticeJumpNav } from "@/components/PracticeJumpNav";
import { practiceAreas, site } from "@/lib/site";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Practice Areas",
  description: `Professional services offered by ${site.name}: income tax, GST, company filings, audit, accounting, NRI taxation, and related work.`,
  alternates: { canonical: "/practice-areas" },
};

export default function PracticeAreasPage() {
  const allFaqs = practiceAreas.flatMap((a) => a.faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Practice Areas", path: "/practice-areas" },
            ]),
            faqSchema(allFaqs),
          ]),
        }}
      />
      <section className="marble-panel border-b border-border">
        <div className="container py-24">
          <p className="text-[11px] uppercase tracking-luxury text-champagne">
            Practice areas
          </p>
          <h1 className="mt-5 max-w-3xl font-serif text-5xl font-semibold tracking-tightish text-navy md:text-7xl">
            Professional services
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            The following describes the scope of work. It does not guarantee registrations,
            refunds, audit conclusions, or any other official outcome.
          </p>
        </div>
      </section>

      <PracticeJumpNav />

      <div className="container grid gap-12 py-16 lg:grid-cols-[220px_1fr]">
        <nav
          className="top-28 hidden self-start lg:sticky lg:block"
          aria-label="Practice areas"
        >
          <ul className="space-y-3 border-l border-border pl-4">
            {practiceAreas.map((area) => (
              <li key={area.slug}>
                <a
                  href={`#${area.slug}`}
                  className="text-sm text-muted hover:text-navy"
                >
                  {area.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-24">
          {practiceAreas.map((area) => (
            <article key={area.slug} id={area.slug} className="scroll-mt-32">
              <h2 className="font-serif text-4xl text-navy">{area.title}</h2>
              <GoldDivider className="my-6 max-w-xs" />
              <h3 className="text-[11px] uppercase tracking-luxury text-champagne">
                Scope of service
              </h3>
              <p className="mt-3 max-w-2xl leading-relaxed text-muted">{area.scope}</p>

              <div className="mt-10 grid gap-10 md:grid-cols-2">
                <div>
                  <h3 className="font-serif text-2xl text-navy">Process</h3>
                  <ol className="mt-4 space-y-3 text-sm text-muted">
                    {area.process.map((step, i) => (
                      <li key={step} className="flex gap-3">
                        <span className="text-champagne">{String(i + 1).padStart(2, "0")}</span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
                <div>
                  <h3 className="font-serif text-2xl text-navy">Required documents</h3>
                  <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-muted">
                    {area.documents.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <h3 className="mt-10 font-serif text-2xl text-navy">Applicable laws</h3>
              <ul className="mt-4 space-y-2 text-sm text-muted">
                {area.laws.map((law) => (
                  <li key={law}>{law}</li>
                ))}
              </ul>

              <h3 className="mt-10 font-serif text-2xl text-navy">Questions</h3>
              <div className="mt-4">
                <FaqList items={[...area.faqs]} />
              </div>

              <div className="mt-10">
                <PracticeEnquiryForm serviceName={area.title} />
              </div>
              <div className="mt-6">
                <LuxuryButton href="/contact#enquiry" variant="outline">
                  Request Professional Assistance
                </LuxuryButton>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
