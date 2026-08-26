/**
 * Public runtime config for Google Drive and notification feeds.
 * All NEXT_PUBLIC_* values are safe to expose; never put a service-account JSON in the client.
 *
 * Google Drive (document library):
 * 1. Create a Drive folder. Share it as “Anyone with the link can view”.
 * 2. Enable Drive API on a Google Cloud project. Create an API key restricted to Drive API + your domain.
 * 3. Set NEXT_PUBLIC_GOOGLE_DRIVE_FOLDER_ID and NEXT_PUBLIC_GOOGLE_DRIVE_API_KEY.
 * Files added, renamed, replaced, or deleted in that folder appear on the next library refresh.
 *
 * Enquiry uploads:
 * Set NEXT_PUBLIC_ENQUIRY_WEBHOOK_URL to a Google Apps Script / Cloud Function that
 * writes the form fields and attachments into a Drive folder. Static Pages hosting cannot
 * hold a service-account secret.
 *
 * Tax updates:
 * public/data/updates.json is generated at build time and every 6 hours via GitHub Actions
 * from CBIC, Income Tax, and MCA public pages. Optional NEXT_PUBLIC_UPDATES_JSON_URL can
 * override or supplement that file.
 */
export const integrations = {
  driveFolderId: process.env.NEXT_PUBLIC_GOOGLE_DRIVE_FOLDER_ID ?? "",
  driveApiKey: process.env.NEXT_PUBLIC_GOOGLE_DRIVE_API_KEY ?? "",
  enquiryWebhook: process.env.NEXT_PUBLIC_ENQUIRY_WEBHOOK_URL ?? "",
  updatesJsonUrl: process.env.NEXT_PUBLIC_UPDATES_JSON_URL ?? "",
  updatesProxy: process.env.NEXT_PUBLIC_UPDATES_PROXY ?? "",
  updatesRefreshMs: 30 * 60 * 1000,
};

export function isDriveConfigured() {
  return Boolean(integrations.driveFolderId && integrations.driveApiKey);
}
