"use client";

import { CustomCursor } from "./animations/CustomCursor";
import { PageTransition } from "./animations/PageTransition";
import { SmoothScroll } from "./animations/SmoothScroll";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScroll>
      <CustomCursor />
      <PageTransition>{children}</PageTransition>
    </SmoothScroll>
  );
}
