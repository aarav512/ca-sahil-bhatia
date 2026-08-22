import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div className={cn(align === "center" && "text-center mx-auto", className)}>
      {eyebrow ? (
        <p className="mb-4 text-[11px] uppercase tracking-luxury text-champagne">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-serif text-4xl leading-tight text-navy md:text-5xl lg:text-[3.25rem]">
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-6 text-base leading-relaxed text-muted md:text-lg",
            align === "center" ? "mx-auto max-w-2xl" : "max-w-xl",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
