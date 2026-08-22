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

