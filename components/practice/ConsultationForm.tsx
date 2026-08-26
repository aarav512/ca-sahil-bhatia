"use client";

import { useSearchParams } from "next/navigation";
import { practiceAreas } from "@/lib/site";
import { PracticeEnquiryForm } from "@/components/practice/PracticeEnquiryForm";

export function ConsultationForm() {
  const params = useSearchParams();
  const slug = params.get("service") || "";
  const area = practiceAreas.find((item) => item.slug === slug);

  return <PracticeEnquiryForm serviceName={area?.title} />;
}
