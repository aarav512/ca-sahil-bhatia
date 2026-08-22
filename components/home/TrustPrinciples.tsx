import { ShieldCheck, Scale, BookOpen, Landmark } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { site } from "@/lib/site";

const items = [
  {
    icon: Landmark,
    title: "Institute",
    body: `Qualification stated as ${site.qualification}, ${site.institute}. Membership number is published only if the client supplies it for this site.`,
  },
  {
    icon: Scale,
    title: "Code of Ethics",
    body: "Presentation of services follows the ICAI Code of Ethics, 2026 edition, including rules on advertising and solicitation.",
  },
  {
    icon: ShieldCheck,
    title: "No rankings",
    body: "This site does not claim to be first, best, or leading, and does not compare the practice with any other professional.",
  },
  {
    icon: BookOpen,
    title: "No fabricated metrics",
    body: "Client counts, ratings, years of practice, and success percentages appear only if independently verified and supplied for publication.",
  },
];

export function TrustPrinciples() {
  return (
    <section className="container py-28">
      <SectionHeading
        eyebrow="Professional standing"
        title="What this website will and will not say"
        description="Trust is a matter of conduct and the file — not of marketing statistics."
      />
      <div className="mt-16 grid gap-8 md:grid-cols-2">
        {items.map((item) => (
          <article key={item.title} className="border border-border bg-pearl/50 p-8">
            <item.icon className="h-5 w-5 text-champagne" aria-hidden />
            <h3 className="mt-5 font-serif text-2xl text-navy">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
