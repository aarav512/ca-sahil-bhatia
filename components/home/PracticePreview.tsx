import { PracticeCard } from "@/components/PracticeCard";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/animations/Reveal";
import { practiceAreas } from "@/lib/site";

export function PracticePreview() {
  return (
    <section className="bg-stone/40 py-28">
      <div className="container">
        <SectionHeading
          eyebrow="Services"
          title="Professional offerings"
          description="Each heading is a service the practice may undertake. Nothing here promises a departmental outcome."
        />
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
