import { LuxuryButton } from "@/components/LuxuryButton";

export function ConsultationCta() {
  return (
    <section className="marble-panel border-y border-border">
      <div className="container py-24 text-center">
        <p className="text-[11px] uppercase tracking-luxury text-champagne">
          Consultation
        </p>
        <h2 className="mx-auto mt-4 max-w-3xl font-serif text-4xl text-navy md:text-6xl">
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
