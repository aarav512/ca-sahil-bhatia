export function QuoteCard({
  quote,
  attribution,
}: {
  quote: string;
  attribution?: string;
}) {
  return (
    <blockquote className="group border-l-[1.5px] border-gold bg-pearl/60 px-8 py-12 transition-shadow duration-500 hover:shadow-lift md:px-12">
      <p className="font-serif text-2xl font-semibold leading-snug tracking-tightish text-navy md:text-[1.85rem]">
        {quote}
      </p>
      {attribution ? (
        <footer className="mt-10 font-body text-[11px] font-medium uppercase tracking-luxury text-walnut">
          {attribution}
        </footer>
      ) : null}
    </blockquote>
  );
}
