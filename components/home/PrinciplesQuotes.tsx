import { QuoteCard } from "@/components/QuoteCard";
import { SectionHeading } from "@/components/SectionHeading";

export function PrinciplesQuotes() {
  return (
    <section className="container py-28">
      <SectionHeading
        eyebrow="Notes from the Code"
        title="Professional language, not testimonials"
        description="Client reviews are published only when they are genuine and supplied for this site. None have been added here."
      />
      <div className="mt-16 grid gap-8 lg:grid-cols-2">
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
