import { faqs, site } from "./site";

export function organizationSchema() {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    description: site.description,
  };
  if (site.email) schema.email = site.email;
  if (site.phoneDisplay) schema.telephone = site.phoneDisplay;
  if (site.address) {
    schema.address = {
      "@type": "PostalAddress",
      streetAddress: `${site.address.line1}, ${site.address.line2}`,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      postalCode: site.address.postalCode,
      addressCountry: "IN",
    };
  }
  return schema;
}

export function professionalServiceSchema() {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    description: site.description,
    url: site.url,
    areaServed: "IN",
    provider: {
      "@type": "Person",
      name: site.legalName,
      jobTitle: site.qualification,
    },
  };
  if (site.email) schema.email = site.email;
  if (site.phoneDisplay) schema.telephone = site.phoneDisplay;
  return schema;
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${site.url}${item.path}`,
    })),
  };
}

export function faqSchema(items: { q: string; a: string }[] = [...faqs]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}
