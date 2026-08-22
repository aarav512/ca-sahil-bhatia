import * as React from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "flex h-12 w-full border-b border-border bg-transparent px-0 py-3 text-base text-ink placeholder:text-muted/70 focus-visible:border-champagne",
        className,
      )}
      {...props}
    />
  );
}

export function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "flex min-h-32 w-full border-b border-border bg-transparent px-0 py-3 text-base text-ink placeholder:text-muted/70 focus-visible:border-champagne",
        className,
      )}
      {...props}
    />
  );
}

export function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      className={cn(
        "text-[11px] uppercase tracking-luxury text-walnut/80",
        className,
      )}
      {...props}
    />
  );
}
