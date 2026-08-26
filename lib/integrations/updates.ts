export type UpdateSource = "CBIC" | "Income Tax" | "MCA";
export type UpdateCategory = "GST" | "Income Tax" | "ITR" | "MCA" | "Compliance";

export type TaxUpdate = {
  id: string;
  title: string;
  source: UpdateSource;
  category: UpdateCategory;
  publishedAt: string;
  summary: string;
  url: string;
};

/** Official landing pages used when a JSON/proxy feed is not configured. */
export const officialSources = [
  {
    id: "cbic-gst",
    title: "CBIC — GST notifications and circulars",
    source: "CBIC" as const,
    category: "GST" as const,
    publishedAt: "",
    summary:
      "Central Board of Indirect Taxes and Customs publishes GST notifications, circulars, and orders. Open the official page for the current list.",
    url: "https://taxinformation.cbic.gov.in/",
  },
  {
    id: "it-dept",
    title: "Income Tax Department — notifications and ITR utilities",
    source: "Income Tax" as const,
    category: "Income Tax" as const,
    publishedAt: "",
    summary:
      "Income-tax notifications, circulars, and ITR related releases are published by the Income Tax Department.",
    url: "https://www.incometax.gov.in/iec/foportal/",
  },
  {
    id: "it-press",
    title: "Income Tax Department — press releases",
    source: "Income Tax" as const,
    category: "ITR" as const,
    publishedAt: "",
    summary: "Press releases relating to returns, utilities, and compliance dates, as issued by the Department.",
    url: "https://incometaxindia.gov.in/Pages/press-releases.aspx",
  },
  {
    id: "mca",
    title: "Ministry of Corporate Affairs — notifications and circulars",
    source: "MCA" as const,
    category: "MCA" as const,
    publishedAt: "",
    summary:
      "Company-law notifications, circulars, and e-governance updates are published on the MCA portal.",
    url: "https://www.mca.gov.in/",
  },
  {
    id: "mca-notices",
    title: "MCA — important notices",
    source: "MCA" as const,
    category: "Compliance" as const,
    publishedAt: "",
    summary: "Important notices and compliance communications from the Ministry of Corporate Affairs.",
    url: "https://www.mca.gov.in/content/mca/global/en/home.html",
  },
] satisfies TaxUpdate[];

export const updateCategories = ["All", "GST", "Income Tax", "ITR", "MCA", "Compliance"] as const;
