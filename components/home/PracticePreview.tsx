import { PracticeCard } from "@/components/PracticeCard";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/animations/Reveal";
import { practiceAreas } from "@/lib/site";

export function PracticePreview() {
  return (
    <section className="bg-stone py-32 paper-linen">
      <div className="container">
        <SectionHeading
          eyebrow="Services"
          title="Professional offerings"
          description="Each heading is a service the practice may undertake. Nothing here promises a departmental outcome."
        />
        <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {practiceAreas.map((area, i) => (
            <Reveal key={area.slug} y={24}>
              <PracticeCard area={area} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
