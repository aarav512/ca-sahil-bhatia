# CA Sahil Bhatia — Practice Website

Ivory, navy, forest, and champagne gold website for **CA Sahil Bhatia**, Chartered Accountant. Copy is written to stay within the **ICAI Code of Ethics, 2026** advertising rules: no superiority claims, no invented testimonials, ratings, client counts, awards, office photos, or contact details.

## Run locally

```bash
cd ca-sahil-bhatia
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Publishable particulars

Edit `lib/site.ts` only with verified data:

- Email, telephone, WhatsApp
- Office address (enables postal schema)
- ICAI membership number, if it should appear
- Genuine Google reviews (do not rewrite)
- Years of experience, if documented
- Office photographs, if provided

Until those fields are filled, the site omits them rather than inventing them.

## Document library, enquiries, and tax updates

Copy `.env.example` to `.env.local` on Cloudflare (Pages environment variables) and locally.

- **Documents** (`/documents`): set `NEXT_PUBLIC_GOOGLE_DRIVE_FOLDER_ID` and `NEXT_PUBLIC_GOOGLE_DRIVE_API_KEY`. Share the folder as view-with-link. Files in that folder appear automatically.
- **Practice-area enquiry files**: set `NEXT_PUBLIC_ENQUIRY_WEBHOOK_URL` to a Google Apps Script or function that writes fields and attachments into Drive. Static hosting cannot keep a service-account secret.
- **Updates** (`/updates`): set `NEXT_PUBLIC_UPDATES_JSON_URL` to a JSON feed of notifications. Until then, cards open the official CBIC, Income Tax, and MCA sites.

## Stack

Next.js 15, TypeScript, Tailwind CSS, GSAP, Lenis, Framer Motion, React Three Fiber, Drei.

There is no backend. The contact form validates on the client and does not send mail until you connect an endpoint.

## Deploy on Cloudflare Pages

This site is a **static export**. Cloudflare 404s if the build output is `.next` (a Node server) instead of `out` (HTML files).

In Workers & Pages → your project → **Settings → Builds**:

| Setting | Value |
| --- | --- |
| Framework preset | **Next.js (Static HTML Export)** or **None** |
| Build command | `npx next build` |
| Build output directory | `out` |
| Root directory | `/` (leave empty) |
| Node version | `20` (add env var `NODE_VERSION` = `20`) |

Then **Retry deployment** / **Save and Deploy**. The site will be at `https://ca-sahil-bhatia.pages.dev/` after a successful build that lists `out/index.html`.

