"use client";

import { useState } from "react";
import { site } from "@/lib/site";
import { LuxuryButton } from "@/components/LuxuryButton";
import { cn } from "@/lib/utils";

function Field({
  id,
  name,
  label,
  type = "text",
  required,
  as = "input",
  error,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  as?: "input" | "textarea";
  error?: string;
}) {
  const [filled, setFilled] = useState(false);
  const Comp = as === "textarea" ? "textarea" : "input";

  return (
    <div className="relative pt-5">
      <Comp
        id={id}
        name={name}
        type={as === "input" ? type : undefined}
        required={required}
        aria-invalid={!!error}
        placeholder=" "
        rows={as === "textarea" ? 5 : undefined}
        onBlur={(e) => setFilled(Boolean((e.target as HTMLInputElement).value))}
        className={cn(
          "peer w-full border-0 border-b border-border bg-transparent px-0 pb-3 pt-2 text-base text-ink outline-none transition-colors focus:border-champagne",
          as === "textarea" && "min-h-32 resize-y",
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

type Errors = Partial<Record<"name" | "email" | "message", string>>;

export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const matter = String(data.get("matter") || "").trim();
    const message = String(data.get("message") || "").trim();
    const next: Errors = {};
    if (name.length < 2) next.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Please enter a valid email address.";
    if (message.length < 12) next.message = "Please describe the matter in a few sentences.";
    setErrors(next);
    if (Object.keys(next).length) return;

    const body = [
      `Enquiry for ${site.name}`,
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Telephone: ${phone}` : "",
      matter ? `Subject: ${matter}` : "",
      "",
      message,
      "",
      "This note is a request for a meeting. It does not create a professional engagement.",
    ]
      .filter((line, i, arr) => line !== "" || arr[i - 1] !== "")
      .join("\n");

    try {
      await navigator.clipboard.writeText(body);
      setCopied(true);
    } catch {
      const blob = new Blob([body], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "enquiry-ca-sahil-bhatia.txt";
      a.click();
      URL.revokeObjectURL(url);
    }

    if (site.email) {
      const href = `mailto:${site.email}?subject=${encodeURIComponent("Consultation request")}&body=${encodeURIComponent(body)}`;
      window.location.href = href;
    }

    setSent(true);
    form.reset();
  }

  if (sent) {
    return (
      <div id="enquiry" className="border border-champagne/40 bg-pearl/80 p-10" role="status">
        <p className="font-serif text-3xl text-navy">Enquiry prepared</p>
        <p className="mt-4 text-muted">
          {copied
            ? "The enquiry text has been copied to your clipboard."
            : "A text file of the enquiry has been downloaded."}{" "}
          {site.email
            ? "Your email application should open if this device allows it."
            : "There is no public email on this website yet. Please send the copied text through the channel you already use with the practice."}
        </p>
      </div>
    );
  }

  return (
    <form id="enquiry" onSubmit={onSubmit} className="space-y-2" noValidate>
      <Field id="name" name="name" label="Name" required error={errors.name} />
      <Field id="email" name="email" label="Email" type="email" required error={errors.email} />
      <Field id="phone" name="phone" label="Telephone (optional)" type="tel" />
      <Field id="matter" name="matter" label="Subject of enquiry" />
      <Field id="message" name="message" label="Matter" as="textarea" required error={errors.message} />
      <p className="pt-6 text-xs leading-relaxed text-muted">
        Submitting this form is a request to speak with the practice. It is not the formation
        of a professional relationship and does not guarantee that the matter will be accepted.
      </p>
      <div className="pt-4">
        <LuxuryButton type="submit" variant="gold">
          Request Professional Assistance
        </LuxuryButton>
      </div>
    </form>
  );
}
