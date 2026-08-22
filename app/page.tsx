import { Hero } from "@/components/home/Hero";
import { ExpertiseSticky } from "@/components/home/ExpertiseSticky";
import { AboutPreview } from "@/components/home/AboutPreview";
import { PracticePreview } from "@/components/home/PracticePreview";
import { TrustPrinciples } from "@/components/home/TrustPrinciples";
import { WhyChoose } from "@/components/home/WhyChoose";
import { PrinciplesQuotes } from "@/components/home/PrinciplesQuotes";
import { ConsultationCta } from "@/components/home/ConsultationCta";
import { LuxurySceneLazy } from "@/components/3d/LuxurySceneLazy";
import { SectionHeading } from "@/components/SectionHeading";
import { breadcrumbSchema } from "@/lib/schema";

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema([{ name: "Home", path: "/" }])),
        }}
      />
      <Hero />
      <section className="container py-16 md:py-24">
        <SectionHeading
          eyebrow="Studio"
          title="Quiet objects of the profession"
          description="Marble, brass, and paper — a visual register, not a claim of scale or status."
          align="center"
          className="mb-8"
        />
        <LuxurySceneLazy />
      </section>
      <ExpertiseSticky />
      <AboutPreview />
      <PracticePreview />
      <TrustPrinciples />
      <WhyChoose />
      <PrinciplesQuotes />
      <ConsultationCta />
    </>
  );
}
