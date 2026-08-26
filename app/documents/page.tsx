import type { Metadata } from "next";
import { DocumentLibrary } from "@/components/documents/DocumentLibrary";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Document Library",
  description: `Download commonly requested forms and agreement formats from ${site.name}. Files are managed in Google Drive when connected.`,
  alternates: { canonical: "/documents" },
};

export default function DocumentsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Document Library", path: "/documents" },
            ]),
          ),
        }}
      />
      <section className="marble-panel border-b border-border">
        <div className="container py-24">
          <p className="text-[11px] uppercase tracking-luxury text-champagne">Document library</p>
          <h1 className="mt-5 max-w-3xl font-serif text-5xl font-semibold tracking-tightish text-navy md:text-7xl">
            Forms and agreements
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">
            Commonly requested formats for clients to download. This is not a portal for uploading
            client papers. Formats are general; they are not advice for a particular transaction.
          </p>
        </div>
      </section>
      <section className="container py-20">
        <DocumentLibrary />
      </section>
    </>
  );
}
