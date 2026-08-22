import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Manrope, Playfair_Display } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { Providers } from "@/components/Providers";
import { faqSchema, organizationSchema, professionalServiceSchema } from "@/lib/schema";
import { site } from "@/lib/site";
import "./globals.css";
import "../styles/tokens.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Chartered Accountant`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "Chartered Accountant",
    "CA Sahil Bhatia",
    "income tax filing",
    "GST registration",
    "GST returns",
    "company registration",
    "ROC compliance",
    "audit",
    "NRI taxation",
    "ICAI",
  ],
  authors: [{ name: site.legalName }],
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: `${site.name} | Chartered Accountant`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Chartered Accountant`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = [organizationSchema(), professionalServiceSchema(), faqSchema()];

  return (
    <html lang="en-IN" className={`${cormorant.variable} ${playfair.variable} ${inter.variable} ${manrope.variable}`}>
      <body className="min-h-screen font-body">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers>
          <a
            href="#content"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[90] focus:bg-navy focus:px-4 focus:py-2 focus:text-pearl"
          >
            Skip to content
          </a>
          <SiteHeader />
          <main id="content">{children}</main>
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
