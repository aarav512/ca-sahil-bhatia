import { UpdatesFeed } from "@/components/updates/UpdatesFeed";
import { SectionHeading } from "@/components/SectionHeading";

export function UpdatesPreview() {
  return (
    <section className="bg-stone py-32 paper-linen">
      <div className="container">
        <SectionHeading
          eyebrow="Official sources"
          title="Latest tax and compliance updates"
          description="GST, income-tax, ITR, and company-law notices from CBIC, the Income Tax Department, and MCA — without substituting for the official text."
        />
        <UpdatesFeed compact />
      </div>
    </section>
  );
}
