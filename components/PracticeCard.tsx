import Link from "next/link";
import { PracticeArea } from "@/lib/site";
import { cn } from "@/lib/utils";

export function PracticeCard({
  area,
  index,
  className,
}: {
  area: PracticeArea;
  index?: number;
  className?: string;
}) {
  return (
    <Link
      href={`/practice-areas#${area.slug}`}
      className={cn(
        "group relative block border border-border bg-pearl/60 p-8 transition-all duration-500 hover:-translate-y-1 hover:border-champagne/60 hover:shadow-lift",
        className,
      )}
    >
      <span className="font-serif text-sm text-champagne">
        {String((index ?? 0) + 1).padStart(2, "0")}
      </span>
      <h3 className="mt-6 font-serif text-2xl text-navy">{area.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted">{area.summary}</p>
      <span className="mt-8 inline-block h-px w-8 origin-left bg-champagne transition-all duration-500 group-hover:w-16" />
      <p className="mt-4 text-[11px] uppercase tracking-luxury text-walnut">
        View scope
      </p>
    </Link>
  );
}
