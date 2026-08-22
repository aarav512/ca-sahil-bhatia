import { Reveal } from "@/components/animations/Reveal";
import { commitments } from "@/lib/site";

export function WhyChoose() {
  return (
    <section className="grid lg:grid-cols-2">
      <div className="marble-panel flex min-h-[420px] flex-col justify-end border-y border-border p-10 lg:border-r lg:p-16">
        <p className="text-[11px] uppercase tracking-luxury text-champagne">ICAI Code of Ethics, 2026</p>
        <p className="mt-6 max-w-md font-serif text-3xl leading-snug text-navy">
          Services are described. Outcomes are not promised. Rankings are not claimed.
        </p>
      </div>
      <div className="bg-forest px-8 py-20 text-pearl md:px-16">
        <p className="text-[11px] uppercase tracking-luxury text-champagne">Engagement</p>
        <h2 className="mt-4 font-serif text-4xl md:text-5xl">How the practice is conducted</h2>
        <div className="mt-12 space-y-10">
          {commitments.map((c) => (
            <Reveal key={c.title}>
              <h3 className="font-serif text-2xl text-champagne">{c.title}</h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-pearl/80">{c.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
