import Link from "next/link";
import { Reveal, MaskReveal } from "@/components/animations/Reveal";
import { AnimatedSignature } from "@/components/animations/AnimatedSignature";
import { site } from "@/lib/site";

export function AboutPreview() {
  return (
    <section className="container grid items-center gap-16 py-28 lg:grid-cols-2">
      <MaskReveal>
        <div className="relative aspect-[4/5] marble-panel border border-border p-6">
          <div className="flex h-full flex-col justify-between border border-champagne/40 p-8">
            <p className="text-[11px] uppercase tracking-luxury text-champagne">
              Chartered Accountant
            </p>
            <div>
              <p className="font-serif text-6xl text-navy md:text-7xl">SB</p>
              <div className="mt-6">
                <AnimatedSignature name={site.name} />
              </div>
            </div>
          </div>
        </div>
      </MaskReveal>
      <Reveal>
        <p className="text-[11px] uppercase tracking-luxury text-champagne">The practice</p>
        <h2 className="mt-4 font-serif text-4xl text-navy md:text-5xl">
          {site.name}
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-muted">
          {site.qualification}, {site.institute}. This website states the name, qualification,
          and the professional services offered. It does not present rankings, awards, client
          lists, or measured results.
        </p>
        <p className="mt-4 leading-relaxed text-muted">
          Matters are accepted under a letter of engagement. Work is limited to the scope
          agreed in writing.
        </p>
        <Link
          href="/about"
          className="mt-8 inline-block text-[11px] uppercase tracking-luxury text-navy after:mt-1 after:block after:h-px after:w-10 after:bg-champagne after:transition-all hover:after:w-16"
        >
          Read about the practice
        </Link>
      </Reveal>
    </section>
  );
}
