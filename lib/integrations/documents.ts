export const documentCategories = [
  "All",
  "Rent & Lease",
  "Property",
  "Affidavits",
  "GST",
  "Income Tax",
  "Identity",
  "Partnership",
  "Company",
  "Other",
] as const;

export type DocumentCategory = (typeof documentCategories)[number];

export type LibraryDocument = {
  id: string;
  title: string;
  description: string;
  category: Exclude<DocumentCategory, "All">;
  updatedAt: string;
  mimeType: string;
  previewUrl?: string;
  downloadUrl?: string;
  source: "drive" | "catalogue";
};

const rules: { test: RegExp; category: LibraryDocument["category"]; description: string }[] = [
  { test: /rent/i, category: "Rent & Lease", description: "Format commonly used for rent arrangements." },
  { test: /lease/i, category: "Rent & Lease", description: "Lease agreement format." },
  { test: /house|property|sale.?deed/i, category: "Property", description: "House or property agreement format." },
  { test: /affidavit/i, category: "Affidavits", description: "Affidavit format for statutory declarations." },
  { test: /gst/i, category: "GST", description: "GST registration or return related form." },
  { test: /itr|income.?tax|declaration/i, category: "Income Tax", description: "Income-tax declaration or return related form." },
  { test: /pan|aadhaar|aadhar/i, category: "Identity", description: "PAN or Aadhaar update form." },
  { test: /partnership|deed/i, category: "Partnership", description: "Partnership deed format." },
  { test: /spi[cć]e|incorporation|company|roc|llp/i, category: "Company", description: "Company or ROC related form." },
];

export function classifyDocument(name: string): Pick<LibraryDocument, "category" | "description"> {
  const hit = rules.find((r) => r.test.test(name));
  if (hit) return { category: hit.category, description: hit.description };
  return {
    category: "Other",
    description: "Legal or tax-related document from the practice library.",
  };
}

/** Shown when Drive is not connected so the library still lists the intended document types. */
export const catalogueDocuments: LibraryDocument[] = [
  {
    id: "cat-rent",
    title: "Rent Agreement",
    description: "Format commonly used for rent arrangements.",
    category: "Rent & Lease",
    updatedAt: "",
    mimeType: "application/pdf",
    source: "catalogue",
  },
  {
    id: "cat-house",
    title: "House / Property Agreement",
    description: "House or property agreement format.",
    category: "Property",
    updatedAt: "",
    mimeType: "application/pdf",
    source: "catalogue",
  },
  {
    id: "cat-lease",
    title: "Lease Agreement",
    description: "Lease agreement format.",
    category: "Rent & Lease",
    updatedAt: "",
    mimeType: "application/pdf",
    source: "catalogue",
  },
  {
    id: "cat-affidavit",
    title: "Affidavit Formats",
    description: "Affidavit format for statutory declarations.",
    category: "Affidavits",
    updatedAt: "",
    mimeType: "application/pdf",
    source: "catalogue",
  },
  {
    id: "cat-gst",
    title: "GST Registration Forms",
    description: "GST registration related forms.",
    category: "GST",
    updatedAt: "",
    mimeType: "application/pdf",
    source: "catalogue",
  },
  {
    id: "cat-it",
    title: "Income Tax Declaration Forms",
    description: "Income-tax declaration related forms.",
    category: "Income Tax",
    updatedAt: "",
    mimeType: "application/pdf",
    source: "catalogue",
  },
  {
    id: "cat-id",
    title: "PAN / Aadhaar Update Forms",
    description: "PAN or Aadhaar update forms.",
    category: "Identity",
    updatedAt: "",
    mimeType: "application/pdf",
    source: "catalogue",
  },
  {
    id: "cat-partnership",
    title: "Partnership Deed Format",
    description: "Partnership deed format.",
    category: "Partnership",
    updatedAt: "",
    mimeType: "application/pdf",
    source: "catalogue",
  },
  {
    id: "cat-company",
    title: "Company Registration Forms",
    description: "Company registration related forms.",
    category: "Company",
    updatedAt: "",
    mimeType: "application/pdf",
    source: "catalogue",
  },
];
