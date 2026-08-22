"use client";

import dynamic from "next/dynamic";

const LuxuryScene = dynamic(
  () => import("./LuxuryScene").then((m) => m.LuxuryScene),
  {
    ssr: false,
    loading: () => <div className="marble-panel h-full min-h-[380px] w-full" aria-hidden />,
  },
);

export function LuxurySceneLazy({ compact = false }: { compact?: boolean }) {
  return <LuxuryScene compact={compact} />;
}
