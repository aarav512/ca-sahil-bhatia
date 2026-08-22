import type { Metadata } from "next";
import { Mail, Phone, MessageCircle, Clock } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { OfficeCard } from "@/components/OfficeCard";
import { LuxuryButton } from "@/components/LuxuryButton";
import { FaqList } from "@/components/FaqList";
import { SectionHeading } from "@/components/SectionHeading";
import { faqs, site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${site.name} to book a consultation or request professional assistance.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Contact", path: "/contact" },
            ]),
          ),
        }}
      />
      <section className="marble-panel border-b border-border">
        <div className="container py-24">
          <p className="text-[11px] uppercase tracking-luxury text-champagne">Contact</p>
          <h1 className="mt-4 max-w-3xl font-serif text-5xl text-navy md:text-7xl">
            Schedule a meeting
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted">
            Use the form to request a consultation. Telephone, email, WhatsApp, and a map
            appear only when those particulars are supplied for publication.
          </p>
        </div>
      </section>

      <section className="container grid gap-16 py-20 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <h2 className="font-serif text-3xl text-navy">Consultation form</h2>
          <p className="mt-3 mb-10 text-sm text-muted">
            Required fields are name, email, and a short description of the matter.
          </p>
          <ContactForm />
        </div>
        <div className="space-y-8">
          <OfficeCard />
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3 border border-border bg-pearl/60 p-5">
              <Clock className="mt-0.5 h-4 w-4 text-champagne" aria-hidden />
              <span>
                {site.hours.map((h) => (
                  <span key={h.days} className="block">
                    {h.days}: {h.time}
                  </span>
                ))}
              </span>
            </li>
            {site.phoneDisplay ? (
              <li className="flex items-center gap-3 border border-border bg-pearl/60 p-5">
                <Phone className="h-4 w-4 text-champagne" aria-hidden />
                <a href={`tel:${site.phoneHref}`}>{site.phoneDisplay}</a>
              </li>
            ) : (
              <li className="flex items-center gap-3 border border-border bg-pearl/60 p-5">
                <Phone className="h-4 w-4 text-champagne" aria-hidden />
                <span className="text-muted">Telephone number not published on this site.</span>
              </li>
            )}
            {site.email ? (
              <li className="flex items-center gap-3 border border-border bg-pearl/60 p-5">
                <Mail className="h-4 w-4 text-champagne" aria-hidden />
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
            ) : (
              <li className="flex items-center gap-3 border border-border bg-pearl/60 p-5">
                <Mail className="h-4 w-4 text-champagne" aria-hidden />
                <span className="text-muted">Email address not published on this site.</span>
              </li>
            )}
            {site.whatsapp ? (
              <li>
                <a
                  className="flex items-center gap-3 border border-border bg-pearl/60 p-5"
                  href={`https://wa.me/${site.whatsapp}`}
                >
                  <MessageCircle className="h-4 w-4 text-champagne" aria-hidden />
                  WhatsApp
                </a>
              </li>
            ) : null}
          </ul>
          <LuxuryButton href="#enquiry" variant="outline">
            Book a Consultation
          </LuxuryButton>
        </div>
      </section>

      {site.address ? (
        <section className="container pb-20">
          <h2 className="mb-6 font-serif text-3xl text-navy">Location</h2>
          <iframe
            title="Office map"
            className="h-80 w-full border border-border"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${encodeURIComponent(
              `${site.address.line1} ${site.address.line2} ${site.address.city}`,
            )}&output=embed`}
          />
        </section>
      ) : null}

      <section className="bg-stone/40 py-20">
        <div className="container max-w-3xl">
          <SectionHeading eyebrow="Questions" title="Before you write" />
          <div className="mt-10">
            <FaqList items={[...faqs]} />
          </div>
        </div>
      </section>
    </>
  );
}
