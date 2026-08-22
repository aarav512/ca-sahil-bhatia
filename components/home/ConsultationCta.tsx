import { LuxuryButton } from "@/components/LuxuryButton";

export function ConsultationCta() {
  return (
    <section className="marble-panel border-y border-border">
      <div className="container py-32 text-center">
        <p className="font-body text-[11px] font-medium uppercase tracking-luxury text-champagne">
          Consultation
        </p>
        <h2 className="mx-auto mt-6 max-w-3xl font-serif text-4xl font-semibold tracking-tightish text-navy md:text-6xl">
          Book a consultation to discuss a specific matter.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-muted">
          Describe the facts you wish to share. A meeting is scheduled only after the enquiry
          is reviewed. No outcome is implied by accepting a meeting.
        </p>
        <div className="mt-10 flex justify-center">
          <LuxuryButton href="/contact#enquiry" variant="gold">
            Schedule a Meeting
          </LuxuryButton>
        </div>
      </div>
    </section>
  );
}
