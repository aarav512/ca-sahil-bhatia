import type { Metadata } from "next";
import { Suspense } from "react";
import { ConsultationForm } from "@/components/practice/ConsultationForm";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Consultation",
  description: `Request a consultation with ${site.name}. Attach supporting documents with the enquiry.`,
  alternates: { canonical: "/consultation" },
};

export default function ConsultationPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Consultation", path: "/consultation" },
            ]),
          ),
        }}
      />
      <section className="marble-panel border-b border-border">
        <div className="container py-24">
          <p className="text-[11px] uppercase tracking-luxury text-champagne">Consultation</p>
          <h1 className="mt-5 max-w-3xl font-serif text-5xl font-semibold tracking-tightish text-navy md:text-7xl">
            Submit your case
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            Use this form to request professional assistance. If you opened it from a practice
            area, the service required is already selected. Upload PDF, JPG, PNG, DOC, or DOCX files.
          </p>
        </div>
      </section>
      <section className="container max-w-3xl py-20">
        <Suspense
          fallback={<div className="h-96 animate-pulse border border-border bg-stone/50" />}
        >
          <ConsultationForm />
        </Suspense>
      </section>
    </>
  );
}
