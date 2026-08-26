"use client";

import { useState } from "react";
import { LuxuryButton } from "@/components/LuxuryButton";
import { cn } from "@/lib/utils";
import {
  enquiryAccept,
  isAllowedEnquiryFile,
  submitEnquiry,
} from "@/lib/integrations/enquiry";

function Field({
  id,
  name,
  label,
  type = "text",
  required,
  as = "input",
  error,
  defaultValue,
  readOnly,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  as?: "input" | "textarea";
  error?: string;
  defaultValue?: string;
  readOnly?: boolean;
}) {
  const [filled, setFilled] = useState(Boolean(defaultValue));
  const Comp = as === "textarea" ? "textarea" : "input";

  return (
    <div className="relative pt-5">
      <Comp
        id={id}
        name={name}
        type={as === "input" ? type : undefined}
        required={required}
        readOnly={readOnly}
        defaultValue={defaultValue}
        aria-invalid={!!error}
        placeholder=" "
        rows={as === "textarea" ? 5 : undefined}
        onBlur={(e) => setFilled(Boolean((e.target as HTMLInputElement).value))}
        className={cn(
          "peer w-full border-0 border-b border-border bg-transparent px-0 pb-3 pt-2 text-base text-ink outline-none transition-colors duration-300 focus:border-gold",
          as === "textarea" && "min-h-32 resize-y",
          readOnly && "text-muted",
        )}
      />
      <label
        htmlFor={id}
        className={cn(
          "pointer-events-none absolute left-0 top-6 text-sm text-muted transition-all duration-300 peer-focus:top-0 peer-focus:text-[11px] peer-focus:uppercase peer-focus:tracking-luxury peer-focus:text-champagne",
          "peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-[11px] peer-[:not(:placeholder-shown)]:uppercase peer-[:not(:placeholder-shown)]:tracking-luxury",
          filled && "top-0 text-[11px] uppercase tracking-luxury",
        )}
      >
        {label}
      </label>
      {error ? <p className="mt-2 text-sm text-walnut">{error}</p> : null}
    </div>
  );
}

type Errors = Partial<Record<"fullName" | "mobile" | "email" | "message" | "files", string>>;

export function PracticeEnquiryForm({ serviceName }: { serviceName: string }) {
  const [errors, setErrors] = useState<Errors>({});
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  function onFiles(list: FileList | null) {
    if (!list) return;
    const next = [...files];
    Array.from(list).forEach((file) => {
      if (!isAllowedEnquiryFile(file)) {
        setErrors((e) => ({ ...e, files: "Use PDF, JPG, PNG, DOC, or DOCX only." }));
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setErrors((e) => ({ ...e, files: "Each file must be under 10 MB." }));
        return;
      }
      next.push(file);
    });
    setFiles(next);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const fullName = String(data.get("fullName") || "").trim();
    const mobile = String(data.get("mobile") || "").trim();
    const email = String(data.get("email") || "").trim();
    const city = String(data.get("city") || "").trim();
    const message = String(data.get("message") || "").trim();
    const next: Errors = {};
    if (fullName.length < 2) next.fullName = "Please enter your full name.";
    if (!/^[0-9+\s-]{8,15}$/.test(mobile)) next.mobile = "Please enter a valid mobile number.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Please enter a valid email address.";
    if (message.length < 12) next.message = "Please describe the matter in a few sentences.";
    setErrors(next);
    if (Object.keys(next).length) return;

    setBusy(true);
    try {
      const res = await submitEnquiry({
        fullName,
        mobile,
        email,
        city,
        serviceName,
        message,
        files,
      });
      setStatus(res.message);
      setFiles([]);
      e.currentTarget.reset();
    } catch {
      setErrors({ files: "The enquiry could not be sent. Please try again or use the Contact page." });
    } finally {
      setBusy(false);
    }
  }

  if (status) {
    return (
      <div className="border border-champagne/40 bg-pearl/80 p-8" role="status">
        <p className="font-serif text-2xl text-navy">Enquiry prepared</p>
        <p className="mt-3 text-sm text-muted">{status}</p>
      </div>
    );
  }

  const prefix = serviceName.replace(/\s+/g, "-").toLowerCase();

  return (
    <form onSubmit={onSubmit} className="border border-champagne/30 bg-pearl/60 p-8 md:p-10" noValidate>
      <h3 className="font-serif text-2xl text-navy">Request professional assistance</h3>
      <p className="mt-2 text-sm text-muted">
        Attach GST invoices, returns, property papers, or other supporting files if useful. This does
        not create an engagement until a letter is issued.
      </p>
      <Field id={`${prefix}-name`} name="fullName" label="Full name" required error={errors.fullName} />
      <Field id={`${prefix}-mobile`} name="mobile" label="Mobile number" type="tel" required error={errors.mobile} />
      <Field id={`${prefix}-email`} name="email" label="Email address" type="email" required error={errors.email} />
      <Field id={`${prefix}-city`} name="city" label="City (optional)" />
      <Field
        id={`${prefix}-service`}
        name="serviceName"
        label="Service"
        defaultValue={serviceName}
        readOnly
      />
      <Field
        id={`${prefix}-message`}
        name="message"
        label="Message / case description"
        as="textarea"
        required
        error={errors.message}
      />
      <div className="pt-8">
        <label htmlFor={`${prefix}-files`} className="text-[11px] uppercase tracking-luxury text-champagne">
          Supporting documents
        </label>
        <input
          id={`${prefix}-files`}
          name="files"
          type="file"
          multiple
          accept={enquiryAccept}
          className="mt-3 block w-full text-sm text-ink file:mr-4 file:border file:border-champagne/50 file:bg-ivory file:px-4 file:py-2 file:text-[11px] file:uppercase file:tracking-luxury"
          onChange={(e) => onFiles(e.target.files)}
        />
        {files.length ? (
          <ul className="mt-3 list-disc pl-5 text-sm text-muted">
            {files.map((f) => (
              <li key={f.name}>{f.name}</li>
            ))}
          </ul>
        ) : null}
        {errors.files ? <p className="mt-2 text-sm text-walnut">{errors.files}</p> : null}
      </div>
      <div className="pt-8">
        <LuxuryButton type="submit" variant="gold">
          {busy ? "Sending…" : "Submit enquiry"}
        </LuxuryButton>
      </div>
    </form>
  );
}
