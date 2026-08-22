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
    <div className={cn(align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? (
        <p className="mb-5 font-body text-[11px] font-medium uppercase tracking-luxury text-champagne">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="font-serif text-4xl font-semibold leading-[1.12] tracking-tightish text-navy md:text-5xl lg:text-[3.4rem]">
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-7 text-base font-medium leading-relaxed text-muted md:text-lg",
            align === "center" ? "mx-auto max-w-2xl" : "max-w-xl",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
