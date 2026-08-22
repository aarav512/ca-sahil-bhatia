import { cn } from "@/lib/utils";

export function MarbleCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "marble-panel border border-border/80 p-8 shadow-lift md:p-10",
        className,
      )}
    >
      {children}
    </div>
  );
}
