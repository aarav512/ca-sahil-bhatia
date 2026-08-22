"use client";

import { CustomCursor } from "./animations/CustomCursor";
import { PageTransition } from "./animations/PageTransition";
import { ScrollProgress } from "./animations/ScrollProgress";
import { SmoothScroll } from "./animations/SmoothScroll";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <ScrollProgress />
      <CustomCursor />
      <PageTransition>{children}</PageTransition>
    </SmoothScroll>
  );
}
