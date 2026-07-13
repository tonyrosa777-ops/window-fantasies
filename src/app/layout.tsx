import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { siteConfig } from "@/data/site";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import "./globals.css";

/**
 * Fonts: design-system.md §3
 * - Cormorant Garamond (display, luxury editorial serif), Hero H1 + interior H1s + section H2s
 * - Inter (body), all paragraph copy, card body, FAQ answers, form labels, eyebrows
 */

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.business.name} | ${siteConfig.business.tagline}`,
    template: `%s | ${siteConfig.business.name}`,
  },
  description: `Authorized Hunter Douglas Centurion dealer in Salem, NH. ${siteConfig.business.yearsInBusiness}+ years of custom window treatments, shades, blinds, shutters, drapery and motorization, measured, designed and installed by hand across New England. Free in-home consultation, guaranteed for life.`,
  // Resolve absolute URLs (og:image, canonical) off an explicit override first,
  // then Vercel's stable production domain (window-fantasies.vercel.app today,
  // windowfantasies.com once the custom domain is connected), then the final
  // hardcoded fallback. Prevents og:image pointing at the not-yet-live custom
  // domain (which made link-share previews fail on the .vercel.app demo deploy).
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ??
      (process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : "https://www.windowfantasies.com"),
  ),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: siteConfig.business.name,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.business.name} | ${siteConfig.business.tagline}`,
    description: `Custom Hunter Douglas window treatments, measured and installed by hand across New England. Authorized Centurion dealer. Free in-home consultation, guaranteed for life.`,
  },
  robots: {
    index: true,
    follow: true,
  },
  authors: [{ name: siteConfig.business.founderName }],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
