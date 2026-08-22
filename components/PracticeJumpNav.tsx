"use client";

import { practiceAreas } from "@/lib/site";

export function PracticeJumpNav() {
  return (
    <div className="sticky top-[4.5rem] z-30 border-b border-border bg-ivory/95 py-3 backdrop-blur lg:hidden">
      <label className="sr-only" htmlFor="practice-jump">
        Jump to a practice area
      </label>
      <select
        id="practice-jump"
        className="w-full border border-border bg-pearl px-3 py-2 text-sm text-navy"
        defaultValue=""
        onChange={(e) => {
          const id = e.target.value;
          if (!id) return;
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <option value="" disabled>
          Jump to a service
        </option>
        {practiceAreas.map((area) => (
          <option key={area.slug} value={area.slug}>
            {area.title}
          </option>
        ))}
      </select>
    </div>
  );
}
