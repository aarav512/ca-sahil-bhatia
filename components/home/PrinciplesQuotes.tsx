import { QuoteCard } from "@/components/QuoteCard";
import { SectionHeading } from "@/components/SectionHeading";

export function PrinciplesQuotes() {
  return (
    <section className="container py-32">
      <SectionHeading
        eyebrow="Notes from the Code"
        title="Professional language, not testimonials"
        description="Client reviews are published only when they are genuine and supplied for this site. None have been added here."
      />
      <p className="mt-8 inline-flex items-center gap-2 border border-border px-4 py-2 font-body text-[11px] font-medium uppercase tracking-wideish text-walnut">
        Google reviews — not displayed until the practice supplies verified listings
      </p>
      <div className="mt-16 grid gap-10 lg:grid-cols-2">
        <QuoteCard
          quote="Information on this website is general. It is not legal, tax, accounting, or financial advice for a particular matter."
          attribution="Website disclaimer"
        />
        <QuoteCard
          quote="Registrations, assessments, refunds, and appeals are decided by the competent authority. This practice does not guarantee those outcomes."
          attribution="Scope of professional work"
        />
      </div>
    </section>
  );
}
