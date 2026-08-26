export const site = {
  name: "CA Sahil Bhatia",
  legalName: "Sahil Bhatia, Chartered Accountant",
  qualification: "Chartered Accountant",
  institute: "Institute of Chartered Accountants of India",
  tagline: "Chartered accountancy services for businesses and individuals.",
  description:
    "Practice of CA Sahil Bhatia, Chartered Accountant, offering professional services in income tax, GST, company law compliance, audit, accounting, and related advisory. Information on this website is general in nature.",
  url: "https://www.casahilbhatia.in",
  locale: "en_IN",
  /** Contact particulars — populate only with client-verified details. */
  email: "" as string,
  phoneDisplay: "" as string,
  phoneHref: "" as string,
  whatsapp: "" as string,
  address: null as null | {
    line1: string;
    line2: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
  },
  hours: [
    { days: "Weekdays", time: "Meetings by prior appointment" },
    { days: "Weekends", time: "By prior appointment, if scheduled" },
  ],
  disclaimer:
    "The information provided on this website is for general informational purposes only and should not be construed as legal, tax, accounting, or financial advice. Professional advice should be obtained for specific matters.",
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/practice-areas", label: "Practice Areas" },
  { href: "/documents", label: "Documents" },
  { href: "/updates", label: "Updates" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
] as const;

export type PracticeArea = {
  slug: string;
  title: string;
  summary: string;
  scope: string;
  process: string[];
  documents: string[];
  laws: string[];
  faqs: { q: string; a: string }[];
};

export const practiceAreas: PracticeArea[] = [
  {
    slug: "income-tax-filing",
    title: "Income Tax Filing",
    summary:
      "Preparation and filing of income-tax returns based on documents and information provided by the client.",
    scope:
      "This service covers computation support and electronic filing of returns under the Income-tax Act, 1961, for individuals, firms, and companies, as applicable. Positions taken in a return follow the facts and documents on record. The assessing authority remains responsible for assessment.",
    process: [
      "Collect financial statements, Form 16/16A, AIS/TIS, and other source documents.",
      "Review residential status, heads of income, and disclosures required in the return.",
      "Prepare computation and draft return for client confirmation.",
      "File the return after written confirmation and share the acknowledgement.",
    ],
    documents: [
      "PAN, Aadhaar (where applicable), and bank statements",
      "Form 16, 16A, 26AS, AIS/TIS",
      "Books, trial balance, or investment statements as relevant",
      "Prior-year return and notices, if any",
    ],
    laws: [
      "Income-tax Act, 1961 and rules thereunder",
      "Finance Act as applicable to the relevant assessment year",
      "CBDT circulars and notifications, where relied upon",
    ],
    faqs: [
      {
        q: "Does filing a return conclude the tax matter?",
        a: "No. Filing is a statutory compliance step. Assessment, notices, and refunds (if any) are determined by the Income Tax Department under the Act.",
      },
      {
        q: "Can a particular refund or liability be assured?",
        a: "No. Tax payable or refundable depends on law and facts. This practice does not guarantee refunds, savings, or assessment outcomes.",
      },
    ],
  },
  {
    slug: "gst-registration",
    title: "GST Registration",
    summary:
      "Assistance with GST registration applications on the GST portal, based on eligibility and documents supplied.",
    scope:
      "Support for making or amending a registration application under the Central Goods and Services Tax Act, 2017 and related State Acts. Grant of registration is a decision of the tax administration.",
    process: [
      "Confirm whether registration is compulsory or voluntary on the facts given.",
      "Assemble identity, address, and business documents required by the portal.",
      "Prepare and submit the application after client review.",
      "Respond to portal queries with information the client provides.",
    ],
    documents: [
      "PAN, Aadhaar, photographs of authorised persons",
      "Proof of principal place of business",
      "Constitution documents (MOA/AOA, partnership deed, etc.)",
      "Bank account proof and authorisation resolutions, as applicable",
    ],
    laws: [
      "CGST Act, 2017, IGST Act, 2017, and applicable SGST/UTGST Acts",
      "CGST Rules and GST portal procedures",
    ],
    faqs: [
      {
        q: "Is registration guaranteed once papers are uploaded?",
        a: "No. The proper officer may seek clarification or reject an application in accordance with the law. This practice cannot guarantee allotment of a GSTIN.",
      },
    ],
  },
  {
    slug: "gst-returns",
    title: "GST Returns",
    summary:
      "Preparation and filing of GST returns from books and invoices the client maintains.",
    scope:
      "Periodic return support (including GSTR-1 and GSTR-3B where applicable) and related reconciliations. Input tax credit is reported only to the extent supported by law and the client’s records. Departmental audits and assessments are separate matters.",
    process: [
      "Receive sales, purchase, and credit notes data.",
      "Reconcile with books and, where relevant, auto-drafted statements on the portal.",
      "Share a draft working for confirmation.",
      "File after confirmation and retain workings on the engagement file.",
    ],
    documents: [
      "Invoice registers and e-invoice data, if applicable",
      "Purchase register and credit notes",
      "GST portal statements (e.g. GSTR-2B) as available",
      "Books of account for the tax period",
    ],
    laws: [
      "CGST Act, 2017 and rules (including time of supply and ITC provisions)",
      "Notifications on due dates as in force for the period",
    ],
    faqs: [
      {
        q: "Will every invoice yield input tax credit?",
        a: "Credit is available only if statutory conditions are met. Blocked credits and vendor non-compliance can restrict credit. No credit outcome is guaranteed.",
      },
    ],
  },
  {
    slug: "company-registration",
    title: "Company Registration",
    summary:
      "Coordination of incorporation filings with the Ministry of Corporate Affairs for structures the client chooses.",
    scope:
      "Assistance with SPICe+ and related forms for incorporating a company or LLP, as instructed. Name approval and incorporation are decisions of the Registrar. Choice of entity has tax and legal consequences; it is documented, not promised as an advantage.",
    process: [
      "Record proposed name, objects, subscribers, and registered office facts.",
      "Arrange DSC/DIN steps as required for the proposed directors or partners.",
      "Prepare incorporation forms for review and digital signature.",
      "File and share MCA acknowledgements and, if issued, incorporation documents.",
    ],
    documents: [
      "Identity and address proofs of proposed directors/subscribers",
      "Registered office proof and NOC, as applicable",
      "MOA/AOA or LLP agreement drafts for confirmation",
      "Consent and declaration forms prescribed by MCA",
    ],
    laws: [
      "Companies Act, 2013 or Limited Liability Partnership Act, 2008, as applicable",
      "MCA rules and SPICe+ process notes",
    ],
    faqs: [
      {
        q: "Can a company be incorporated by a stated date?",
        a: "Timelines depend on MCA processing, name availability, and completeness of documents. Dates of incorporation are not guaranteed.",
      },
    ],
  },
  {
    slug: "roc-compliance",
    title: "ROC Compliance",
    summary:
      "Assistance with event-based and annual filings with the Registrar of Companies, as applicable to the entity.",
    scope:
      "Support for forms and registers that the Companies Act, 2013 (or LLP law) requires, based on information from the company and its directors. Penalties for delay are statutory; this practice does not waive them.",
    process: [
      "Map the entity’s filing calendar and events (allotment, director change, etc.).",
      "Draft forms and attachments for authorised signatory review.",
      "File after digital signatures are affixed.",
      "Update a simple compliance checklist for the year.",
    ],
    documents: [
      "Last financial statements and annual return, if any",
      "Board/shareholder resolutions and statutory registers",
      "Director KYC and DSC details",
      "Event documents (share certificates, resignation letters, etc.)",
    ],
    laws: [
      "Companies Act, 2013 and Companies (Registration Offices and Fees) Rules",
      "LLP Act and rules, where the entity is an LLP",
    ],
    faqs: [
      {
        q: "Does filing cure every past default?",
        a: "No. Additional fees, adjudication, or compounding may still apply under the Act. Past defaults are addressed only as the law permits.",
      },
    ],
  },
  {
    slug: "audit-assurance",
    title: "Audit & Assurance",
    summary:
      "Statutory audit, tax audit, and related assurance engagements accepted only where independence can be maintained.",
    scope:
      "Audits are conducted in accordance with Standards on Auditing and the ICAI Code of Ethics. An audit opinion is not a guarantee of future viability, fraud absence, or tax finality. Engagements may be declined where independence or information is insufficient.",
    process: [
      "Issue an engagement letter describing scope, independence, and limitations.",
      "Plan the audit, including risk assessment and materiality.",
      "Obtain evidence through inquiry, inspection, and testing as appropriate.",
      "Report in the form required by law or the terms of engagement.",
    ],
    documents: [
      "Books of account, ledgers, and supporting vouchers",
      "Bank confirmations, inventory records, and contracts",
      "Minutes, registers, and related-party details",
      "Management representation as requested",
    ],
    laws: [
      "Companies Act, 2013 (statutory audit, where applicable)",
      "Income-tax Act, 1961 (tax audit under section 44AB, where applicable)",
      "Standards on Auditing issued by ICAI",
    ],
    faqs: [
      {
        q: "Does an audit certificate mean the return will be accepted as filed?",
        a: "No. Audit and tax assessment are distinct. The Department may still examine the return under the Act.",
      },
    ],
  },
  {
    slug: "accounting",
    title: "Accounting",
    summary:
      "Bookkeeping and accounting support from source documents the client retains.",
    scope:
      "Recording of transactions, period close, and preparation of trial balances or financial statements as agreed in the engagement letter. Management remains responsible for internal control and the completeness of records provided.",
    process: [
      "Agree the chart of accounts and reporting frequency.",
      "Record transactions from invoices, banks, and payroll data supplied.",
      "Prepare period reports for client review.",
      "Hand over workings used for tax or audit files, as scoped.",
    ],
    documents: [
      "Bank and cash records",
      "Sales and purchase invoices",
      "Payroll and statutory payment challans",
      "Opening balances and fixed-asset registers",
    ],
    laws: [
      "Applicable Accounting Standards / Ind AS as adopted by the entity",
      "Books-of-account requirements under company and tax law, where relevant",
    ],
    faqs: [
      {
        q: "Does outsourcing books transfer legal responsibility?",
        a: "No. Directors and proprietors remain responsible under applicable law for true and fair records. Accounting support is performed on information provided.",
      },
    ],
  },
  {
    slug: "nri-taxation",
    title: "NRI Taxation",
    summary:
      "Return filing and information support for persons who may be non-resident, based on stay and income facts they document.",
    scope:
      "Assistance with residential-status analysis under the Income-tax Act, reporting of India-source income, and related forms. Treaty relief, if claimed, depends on residence, the relevant DTAA, and documents (including tax residency certificates). FEMA matters may require separate authorised-dealer or legal advice.",
    process: [
      "Record days of stay and nature of Indian and foreign income as stated by the client.",
      "Identify applicable return form and disclosures.",
      "Prepare computation and any treaty-related workings for confirmation.",
      "File after confirmation; share acknowledgements.",
    ],
    documents: [
      "Passport, travel summary, and visa history as relevant",
      "Indian income proofs (property, deposits, employment)",
      "Foreign tax residency certificate and Form 10F, if treaty relief is claimed",
      "Property sale documents, if a transfer occurred",
    ],
    laws: [
      "Income-tax Act, 1961 (including section 6 and charging provisions)",
      "Applicable Double Taxation Avoidance Agreement, if relied upon",
      "FEMA / RBI directions, to the extent flagged for specialist advice",
    ],
    faqs: [
      {
        q: "Can non-resident status be confirmed without travel records?",
        a: "Residential status follows the Act and facts. This practice will not certify a status that the documents do not support.",
      },
    ],
  },
  {
    slug: "business-advisory",
    title: "Business Advisory",
    summary:
      "Discussion of entity form, compliance calendars, and tax positions as they arise from the client’s facts — without promised commercial outcomes.",
    scope:
      "Advisory notes set out options, statutory references, and compliance implications. They are not investment solicitation, credit ratings, or assurances of profit, valuation, or departmental acceptance.",
    process: [
      "Record the question, facts, and documents provided.",
      "Identify applicable company, tax, and GST provisions.",
      "Set out options and filing consequences in writing.",
      "Implement only the steps the client instructs, under a separate scope if needed.",
    ],
    documents: [
      "Existing constitutional documents and cap table, if any",
      "Recent financials and tax filings",
      "Contracts relevant to the question",
      "A written list of assumptions the client wishes to be used",
    ],
    laws: [
      "Companies Act, 2013 / partnership or LLP law, as applicable",
      "Income-tax Act, 1961 and GST law, as relevant to the question",
    ],
    faqs: [
      {
        q: "Will advisory reduce tax by a stated amount?",
        a: "No amount of tax saving is promised. Any illustration is hypothetical and subject to law, facts, and the view of the tax authority.",
      },
    ],
  },
  {
    slug: "digital-signature",
    title: "Digital Signature",
    summary:
      "Assistance with applying for class of Digital Signature Certificates used for MCA, income-tax, and GST filings, through licensed certifying authorities.",
    scope:
      "Help with application paperwork for DSCs issued by licensed Certifying Authorities under the Information Technology Act, 2000. Issuance, validity, and e-token delivery are controlled by the CA and the subscriber’s KYC — not by this practice.",
    process: [
      "Identify the filing purpose (MCA, income-tax, GST) and the person who must sign.",
      "Complete the CA’s application and video/KYC steps as prescribed.",
      "The Certifying Authority issues the DSC if KYC is accepted.",
      "Confirm the certificate is installed for the intended portal.",
    ],
    documents: [
      "Identity and address proof of the subscriber",
      "Photographs and attestation as the CA requires",
      "Authorisation board resolution, for company applicants",
    ],
    laws: [
      "Information Technology Act, 2000",
      "CCA / Certifying Authority practice guidelines",
    ],
    faqs: [
      {
        q: "Can a DSC be issued the same day in every case?",
        a: "Issuance depends on the Certifying Authority and completeness of KYC. Turnaround is not guaranteed by this practice.",
      },
    ],
  },
];

export const philosophy = [
  {
    title: "Professional competence",
    body: "Work is undertaken only in areas of professional competence, in accordance with the ICAI Code of Ethics.",
  },
  {
    title: "Integrity",
    body: "Information is reported as supported by documents. Engagements that require concealment or false statements are not accepted.",
  },
  {
    title: "Confidentiality",
    body: "Client information obtained in professional work is treated as confidential, subject to law and client instruction.",
  },
  {
    title: "Independence",
    body: "Assurance engagements are accepted only where independence can be maintained under the Code of Ethics.",
  },
] as const;

export const commitments = [
  {
    title: "Professionalism",
    body: "Conduct of this practice is intended to follow the ICAI Code of Ethics, 2026 edition, and applicable law. This website describes services. It does not claim superiority over any other professional.",
  },
  {
    title: "Integrity",
    body: "Advice and filings are based on facts the client provides and on the law as understood at the time of the engagement.",
  },
  {
    title: "Confidentiality",
    body: "Papers and communications are handled as confidential professional records.",
  },
  {
    title: "Compliance",
    body: "The objective of an engagement is accurate, timely compliance and a documented professional opinion — not a promised departmental outcome.",
  },
] as const;

/** General notes — not legal advice. No invented author biography. */
export const insights = [
  {
    slug: "income-tax-return-documents",
    title: "Documents commonly required for an income-tax return",
    category: "Income Tax",
    date: "2026-04-01",
    read: "6 min",
    excerpt:
      "A general list of papers often used when preparing an income-tax return. Requirements vary by facts and the return form.",
    featured: true,
    body: [
      "An income-tax return is prepared from documents, not from informal estimates. Typical papers include PAN details, Form 26AS, Annual Information Statement (AIS), taxpayer information summary (TIS), Form 16 or 16A, bank statements, and, for business income, a trial balance or financial statements.",
      "Residential status, heads of income, and disclosures in the applicable ITR form must match the facts. Where AIS and books differ, the difference should be understood before filing.",
      "Due dates and form versions change with CBDT notifications. Confirm the rules for the relevant assessment year. This note is general information, not advice for a particular person.",
    ],
  },
  {
    slug: "gst-return-sequence",
    title: "A plain sequence for periodic GST returns",
    category: "GST",
    date: "2026-03-15",
    read: "5 min",
    excerpt:
      "How outward supplies, portal statements, and GSTR-3B generally relate. Filing still depends on the taxpayer’s records and current notifications.",
    featured: false,
    body: [
      "GST returns are filed on the GST portal in the forms and on the due dates then in force. A common working sequence is to complete outward supply reporting, review auto-drafted inward statements, and then file the summary return after reconciling with books.",
      "Input tax credit is a statutory entitlement only when conditions in the CGST Act and rules are met. Portal figures do not, by themselves, create credit.",
      "This note does not replace the Act, rules, or a review of a specific set of invoices.",
    ],
  },
  {
    slug: "incorporation-filings-overview",
    title: "Incorporation filings: what the Registrar decides",
    category: "Company Law",
    date: "2026-02-10",
    read: "5 min",
    excerpt:
      "SPICe+ and related forms are applications. Name approval and incorporation are decisions of the Ministry of Corporate Affairs.",
    featured: false,
    body: [
      "Incorporating a company involves prescribed forms, identity documents of subscribers and directors, and proof of registered office. The Registrar may approve, query, or reject filings under the Companies Act, 2013.",
      "Choice among a company, LLP, or partnership has continuing compliance and tax consequences. Those consequences should be understood before filing, not assumed as a benefit.",
      "No incorporation date or name can be assured by a professional preparing the application.",
    ],
  },
  {
    slug: "tax-audit-when-it-applies",
    title: "Tax audit: a statutory trigger, not a product",
    category: "Audit",
    date: "2026-01-20",
    read: "4 min",
    excerpt:
      "Section 44AB applies when the Act’s conditions are met. Thresholds and due dates must be read from the law in force for that year.",
    featured: false,
    body: [
      "A tax audit under section 44AB of the Income-tax Act, 1961 is required when the statutory conditions for that previous year are satisfied. Thresholds, presumptive schemes, and due dates are amended from time to time.",
      "The tax audit report is a prescribed form of reporting. It is not a certificate that the return will be accepted without further inquiry.",
      "Whether an audit applies to a particular person depends on that person’s turnover, receipts, and elections under the Act.",
    ],
  },
  {
    slug: "nri-residential-status-facts",
    title: "Residential status: days and documents",
    category: "NRI",
    date: "2025-12-08",
    read: "6 min",
    excerpt:
      "Section 6 turns on facts such as days of stay. Informal descriptions of ‘NRI status’ are not a substitute for the Act.",
    featured: false,
    body: [
      "Residential status for income-tax is determined under section 6 of the Income-tax Act, 1961, using the rules applicable to the relevant previous year. Travel records and the nature of income in India are part of that factual record.",
      "Relief under a Double Taxation Avoidance Agreement, if claimed, requires the treaty to apply and the documents that the Indian law and the treaty contemplate.",
      "This practice will not assert a residential status that the documents do not support.",
    ],
  },
  {
    slug: "digital-signature-use",
    title: "Digital signatures for statutory filings",
    category: "Compliance",
    date: "2025-11-12",
    read: "3 min",
    excerpt:
      "DSCs are issued by licensed Certifying Authorities. They are used to authenticate filings on MCA, income-tax, and GST systems.",
    featured: false,
    body: [
      "A Digital Signature Certificate used for company, tax, or GST filings is issued under the Information Technology Act, 2000 by a licensed Certifying Authority after KYC.",
      "The subscriber is responsible for control of the e-token or credentials. This practice may help with the application paperwork; it does not issue certificates.",
    ],
  },
] as const;

export const taxCalendar = [
  {
    when: "As notified",
    what: "TDS/TCS deposit due dates — confirm the Income-tax calendar for the month",
  },
  {
    when: "As notified",
    what: "GSTR-1 / IFF — confirm GST notifications for the tax period",
  },
  {
    when: "As notified",
    what: "GSTR-3B — confirm GST notifications for the tax period",
  },
  {
    when: "As notified",
    what: "Income-tax return due dates — confirm CBDT circulars for the assessment year",
  },
  {
    when: "As notified",
    what: "Tax audit report due dates — where section 44AB applies",
  },
  {
    when: "Event-based",
    what: "MCA forms on allotment, director change, and other events — as prescribed",
  },
] as const;

export const guides = [
  {
    title: "Income-tax document checklist (general)",
    type: "Request",
    href: "/contact",
  },
  {
    title: "GST return working checklist (general)",
    type: "Request",
    href: "/contact",
  },
  {
    title: "Incorporation document list (general)",
    type: "Request",
    href: "/contact",
  },
] as const;

export const faqs = [
  {
    q: "Does this website give tax or legal advice?",
    a: "No. Content is general information. Advice is given only after an engagement, on the facts of that matter.",
  },
  {
    q: "Are results of filings or disputes guaranteed?",
    a: "No. Registrations, assessments, refunds, and appeals are decided by the competent authority under the law. This practice does not guarantee outcomes.",
  },
  {
    q: "How do I request professional assistance?",
    a: "Use the contact form to describe the matter and your preferred meeting time. A response will follow using the details you provide.",
  },
] as const;
