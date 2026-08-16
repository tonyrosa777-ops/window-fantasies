import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/data/site";
import CityPageClient from "./CityPageClient";
import { JsonLd } from "@/components/JsonLd";
import { buildServiceAreaSchema } from "@/lib/schema";

/**
 * /service-areas/[city] - Next 16 Promise params (Pattern #66 BINDING).
 * Every `params.<key>` access MUST be on a line preceded by `await`.
 */

interface Props {
  params: Promise<{ city: string }>;
}

export async function generateStaticParams() {
  return siteConfig.serviceAreas.map((a) => ({ city: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  const area = siteConfig.serviceAreas.find((a) => a.slug === city);
  if (!area) return {};
  const title = `Window Treatments in ${area.city}, ${area.state}`;
  const ogTitle = `${title} | ${siteConfig.business.name}`;
  const description = `Custom Hunter Douglas shades, blinds, shutters, drapery, and PowerView® Automation for ${area.city}, ${area.state} homes. We bring the samples to you, measure and install everything, backed by the Hunter Douglas Limited Lifetime Warranty. Free in-home consultation.`;
  return {
    title,
    description,
    alternates: { canonical: `/service-areas/${area.slug}` },
    openGraph: {
      title: ogTitle,
      description,
      type: "website",
      url: `/service-areas/${area.slug}`,
    },
  };
}

/** City FAQ generator. Kept byte-identical to CityPageClient for schema parity. */
function cityFaqs(area: { city: string; state: string }) {
  const city = area.city;
  const faqs = [
    {
      q: `Do you serve ${city}?`,
      a: `Yes. Window Fantasies serves ${city} and all of New England from the office in Salem, NH. There is no store to drive to. We bring the real Hunter Douglas samples to your ${city} home, hold them in your own windows, and measure and install everything ourselves.`,
    },
    {
      q: `How much do Hunter Douglas window treatments cost in ${city}?`,
      a: `Custom window treatments are a premium, made-to-measure purchase, so pricing depends on the window size, the product, and the options. As a rough sense of scale, a single high-end shade can run around $1,600, and most homes have more than one window. That is why the in-home consultation is free: we measure your actual ${city} windows and give you a real installed price at your kitchen table, with no obligation. Yes, it is an investment, and it is built to last.`,
    },
    {
      q: `Do you repair blinds and shades in ${city}?`,
      a: `Yes. Hunter Douglas products carry the Hunter Douglas Limited Lifetime Warranty, subject to the manufacturer's warranty terms, so a covered repair itself costs you nothing, even on treatments you bought elsewhere or from a shop that has closed. Jim can help ${city} homeowners with cords, mechanisms, motors, and fabric. He will tell you the honest path forward, and any service fee for pickup and reinstall is disclosed upfront.`,
    },
    {
      q: `Do you have a showroom near ${city}?`,
      a: `No storefront, and that is on purpose. A shade looks completely different under store lights than it does in your ${city} home at four in the afternoon. So Jim shops at home with you, with the real Hunter Douglas samples, shown in your own light.`,
    },
  ];
  // Out-of-state towns get the honest repair-logistics answer (Paul persona fix).
  // Mirrored in CityPageClient.tsx for visible-accordion parity. Keep in sync.
  if (area.state !== "NH") {
    faqs.splice(3, 0, {
      q: `Do you handle repairs out here in ${city}?`,
      a: `Yes. Covered repairs are handled under the Hunter Douglas Limited Lifetime Warranty, subject to its terms, so a covered repair itself costs you nothing, even in ${city}. The authorized service center is Goedecke Design in Bedford, New Hampshire, and you are welcome to drive a blind there yourself at no cost. If you would rather have Jim handle the pickup, the delivery, and the reinstall, he charges a flat service fee, typically $225 plus $25 per blind. You get the exact number upfront, before anything happens.`,
    });
  }
  return faqs;
}

export default async function CityPage({ params }: Props) {
  const { city } = await params;
  const area = siteConfig.serviceAreas.find((a) => a.slug === city);
  if (!area) notFound();
  const schema = buildServiceAreaSchema(area, cityFaqs(area));
  return (
    <>
      <JsonLd data={schema} id={`service-area-${area.slug}-jsonld`} />
      <CityPageClient area={area} />
    </>
  );
}
