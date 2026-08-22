import Link from "next/link";
import { LuxuryButton } from "@/components/LuxuryButton";

export default function NotFound() {
  return (
    <section className="container py-32 text-center">
      <p className="text-[11px] uppercase tracking-luxury text-champagne">404</p>
      <h1 className="mt-4 font-serif text-5xl text-navy">Page not found</h1>
      <p className="mt-4 text-muted">The requested address is not part of this website.</p>
      <div className="mt-10 flex justify-center gap-4">
        <LuxuryButton href="/">Home</LuxuryButton>
        <Link href="/contact" className="self-center text-sm text-navy">
          Contact
        </Link>
      </div>
    </section>
  );
}
