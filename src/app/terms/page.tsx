import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { LegalDocument } from "@/components/legal/LegalDocument";

/**
 * /terms — Terms of Service. Content lives in siteConfig.legal.terms.
 * Rendered through the shared LegalDocument component.
 */

const doc = siteConfig.legal.terms;

export const metadata: Metadata = {
  title: doc.title,
  description: doc.summary,
  alternates: { canonical: "/terms" },
  openGraph: {
    title: `${doc.title} | ${siteConfig.business.name}`,
    description: doc.summary,
    type: "website",
    url: "/terms",
  },
};

export default function TermsPage() {
  return <LegalDocument doc={doc} />;
}
