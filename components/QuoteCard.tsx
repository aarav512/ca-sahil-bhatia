export function QuoteCard({
  quote,
  attribution,
}: {
  quote: string;
  attribution?: string;
}) {
  return (
    <blockquote className="border-l border-champagne/70 bg-pearl/50 py-10 pl-8 pr-6 md:pl-12">
      <p className="font-serif text-2xl leading-snug text-navy md:text-3xl">
        {quote}
      </p>
      {attribution ? (
        <footer className="mt-8 text-[11px] uppercase tracking-luxury text-walnut">
          {attribution}
        </footer>
      ) : null}
    </blockquote>
  );
}
