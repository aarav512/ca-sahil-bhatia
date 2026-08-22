import { MapPin, Clock } from "lucide-react";
import { site } from "@/lib/site";
import { MarbleCard } from "./MarbleCard";

export function OfficeCard() {
  return (
    <MarbleCard>
      <p className="text-[11px] uppercase tracking-luxury text-champagne">
        The practice
      </p>
      <h3 className="mt-4 font-serif text-3xl text-navy">{site.name}</h3>
      <p className="mt-2 text-sm text-muted">{site.qualification}</p>
      <p className="mt-1 text-sm text-muted">{site.institute}</p>
      <ul className="mt-8 space-y-4 text-sm text-ink">
        {site.address ? (
          <li className="flex gap-3">
            <MapPin className="mt-0.5 h-4 w-4 text-champagne" aria-hidden />
            <span>
              {site.address.line1}
              <br />
              {site.address.line2}
              <br />
              {site.address.city} {site.address.postalCode}
            </span>
          </li>
        ) : (
          <li className="flex gap-3">
            <MapPin className="mt-0.5 h-4 w-4 text-champagne" aria-hidden />
            <span>Meetings are held by appointment. Address particulars are shared when a meeting is scheduled.</span>
          </li>
        )}
        <li className="flex gap-3">
          <Clock className="mt-0.5 h-4 w-4 text-champagne" aria-hidden />
          <span>
            {site.hours.map((h) => (
              <span key={h.days} className="block">
                {h.days}: {h.time}
              </span>
            ))}
          </span>
        </li>
      </ul>
    </MarbleCard>
  );
}
