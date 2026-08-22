"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    n: "01",
    title: "Enquiry",
    body: "A written description of the matter and the documents available.",
  },
  {
    n: "02",
    title: "Scope",
    body: "If the matter can be accepted, a letter of engagement states the work and fee basis.",
  },
  {
    n: "03",
    title: "Work",
    body: "Filings and notes are prepared from the papers on the file and the law as then in force.",
  },
  {
    n: "04",
    title: "Confirmation",
    body: "The client reviews computations or forms before they are signed or uploaded.",
  },
  {
    n: "05",
    title: "Record",
    body: "Acknowledgements and workings are retained as professional records.",
  },
];

export function ProcessTimeline() {
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(max-width: 768px)").matches) return;

    const ctx = gsap.context(() => {
      const track = el.querySelector("[data-track]");
      if (!track) return;
      const distance = (track as HTMLElement).scrollWidth - el.offsetWidth;
      gsap.to(track, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          pin: true,
          scrub: 1,
          end: () => `+=${distance}`,
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={scroller} className="overflow-hidden py-8">
      <div data-track className="flex w-max gap-8 px-4 md:px-0">
        {steps.map((step) => (
          <article
            key={step.n}
            className="w-[min(80vw,22rem)] shrink-0 border border-border bg-pearl/70 p-8"
          >
            <p className="font-serif text-champagne">{step.n}</p>
            <h3 className="mt-6 font-serif text-3xl text-navy">{step.title}</h3>
            <p className="mt-4 text-sm leading-relaxed text-muted">{step.body}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
