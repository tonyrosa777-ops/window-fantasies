import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { LegalDocument } from "@/components/legal/LegalDocument";

/**
 * /privacy — Privacy Policy. Content lives in siteConfig.legal.privacy.
 * Rendered through the shared LegalDocument component.
 */

const doc = siteConfig.legal.privacy;

export const metadata: Metadata = {
  title: doc.title,
  description: doc.summary,
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: `${doc.title} | ${siteConfig.business.name}`,
    description: doc.summary,
    type: "website",
    url: "/privacy",
  },
};

export default function PrivacyPage() {
  return <LegalDocument doc={doc} />;
}
