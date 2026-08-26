import { integrations } from "./env";

export const enquiryAccept =
  ".pdf,.jpg,.jpeg,.png,.doc,.docx,application/pdf,image/jpeg,image/png,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

const allowed = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export function isAllowedEnquiryFile(file: File) {
  const name = file.name.toLowerCase();
  const extOk = [".pdf", ".jpg", ".jpeg", ".png", ".doc", ".docx"].some((e) =>
    name.endsWith(e),
  );
  return extOk && (allowed.includes(file.type) || file.type === "" || name.endsWith(".doc") || name.endsWith(".docx"));
}

export type EnquiryPayload = {
  fullName: string;
  mobile: string;
  email: string;
  city: string;
  serviceName: string;
  message: string;
  files: File[];
};

export async function submitEnquiry(payload: EnquiryPayload): Promise<{ ok: boolean; message: string }> {
  if (integrations.enquiryWebhook) {
    const body = new FormData();
    body.append("fullName", payload.fullName);
    body.append("mobile", payload.mobile);
    body.append("email", payload.email);
    body.append("city", payload.city);
    body.append("serviceName", payload.serviceName);
    body.append("message", payload.message);
    payload.files.forEach((file, i) => body.append(`file_${i}`, file, file.name));
    const res = await fetch(integrations.enquiryWebhook, { method: "POST", body });
    if (!res.ok) throw new Error("Webhook declined the enquiry.");
    return { ok: true, message: "Enquiry received. Supporting files were sent to the practice Drive folder." };
  }

  const names = payload.files.map((f) => f.name).join(", ") || "None";
  const text = [
    `Enquiry for ${payload.serviceName}`,
    `Name: ${payload.fullName}`,
    `Mobile: ${payload.mobile}`,
    `Email: ${payload.email}`,
    payload.city ? `City: ${payload.city}` : "",
    "",
    payload.message,
    "",
    `Attachments named: ${names}`,
    "",
    "Set NEXT_PUBLIC_ENQUIRY_WEBHOOK_URL to store this enquiry and files in Google Drive.",
  ]
    .filter((line) => line !== "")
    .join("\n");

  try {
    await navigator.clipboard.writeText(text);
  } catch {
    /* ignore */
  }
  return {
    ok: true,
    message:
      "Enquiry text was copied on this device. Connect NEXT_PUBLIC_ENQUIRY_WEBHOOK_URL so files are stored in Google Drive automatically.",
  };
}
