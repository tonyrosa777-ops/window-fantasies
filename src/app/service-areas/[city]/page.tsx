import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { siteConfig } from "@/data/site";
import CityPageClient from "./CityPageClient";
import { JsonLd } from "@/components/JsonLd";
import { buildServiceAreaSchema } from "@/lib/schema";

/**
 * /service-areas/[city] — Next 16 Promise params (Pattern #66 BINDING).
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
  const description = `Custom Hunter Douglas shades, blinds, shutters, drapery, and PowerView motorization for ${area.city}, ${area.state} homes. Jim brings the showroom to you, measures and installs by hand, guaranteed for life. Free in-home consultation.`;
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

/** City FAQ generator — kept in sync with CityPageClient for schema parity. */
function cityFaqs(area: { city: string; distance: string }) {
  const city = area.city;
  return [
    {
      q: `Do you serve ${city}?`,
      a: `Yes. Jim serves ${city} and all of New England from the office in Salem, NH. There is no showroom to drive to. Jim brings the real Hunter Douglas samples to your ${city} home, holds them in your own windows, and measures and installs everything by hand.`,
    },
    {
      q: `How much do Hunter Douglas window treatments cost in ${city}?`,
      a: `Hunter Douglas is a premium, fully custom product, so pricing depends on the window, the product, and the options. A single high-end shade can run around $1,600, and most homes have more than one window. That is why the in-home consultation is free: Jim measures your actual ${city} windows and gives you a real installed price at your kitchen table, with no obligation. Yes, it is an investment, and yes, it is guaranteed for life.`,
    },
    {
      q: `Do you repair blinds and shades in ${city}?`,
      a: `Yes. Hunter Douglas products are guaranteed for life, so warranty repairs are free, even on treatments you bought elsewhere or from a shop that has closed. Jim can help ${city} homeowners with cords, mechanisms, motors, and fabric. He will tell you the honest path forward, and any service fee for pickup and reinstall is disclosed upfront.`,
    },
    {
      q: `Do you have a showroom near ${city}?`,
      a: `No showroom, and that is on purpose. A shade looks completely different under store lights than it does in your ${city} home at four in the afternoon. So Jim brings the showroom to you, with the real Hunter Douglas samples, shown in your own light.`,
    },
  ];
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
