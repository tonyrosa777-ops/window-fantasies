import Hero from "@/components/sections/Hero";
import { ProductCategories } from "@/components/sections/ProductCategories";
import { WhyWindowFantasies } from "@/components/sections/WhyWindowFantasies";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { JimStoryTeaser } from "@/components/sections/JimStoryTeaser";
import { SignatureProducts } from "@/components/sections/SignatureProducts";
import { ReviewsBand } from "@/components/sections/ReviewsBand";
import { ServiceAreaTeaser } from "@/components/sections/ServiceAreaTeaser";
import { CostHonesty } from "@/components/sections/CostHonesty";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { JsonLd } from "@/components/JsonLd";
import { buildHomepageSchema } from "@/lib/schema";

/**
 * Homepage — design-system.md §11 bands, footer-anchored, STRICT dark/light
 * alternation (Pattern #98; last band light -> dark footer). The §11 trust bar
 * is the hero band's bottom strip (parity merge 2026-07-02 — the standalone
 * dark band made a DD seam under the dark hero), so 10 content bands render:
 *
 *   #  | Band                          | Tone
 *   -- | ----------------------------- | ---------
 *    1 | Hero (photo) + trust strip    | dark (ink)
 *    2 | Product categories            | light (cream)
 *    3 | Why / bring the showroom      | dark (elevated)
 *    4 | 3-step process                | light (cream)
 *    5 | Jim's story teaser            | dark (base)
 *    6 | Signature products            | light (cream)
 *    7 | Reviews band (real)           | dark (elevated)
 *    8 | Service-area teaser           | light (cream)
 *    9 | Cost-honesty reassurance      | dark (base)
 *   10 | Final CTA                     | light (cream) -> dark footer
 */
export default function Home() {
  return (
    <>
      <JsonLd data={buildHomepageSchema()} id="homepage-jsonld" />
      <Hero />
      <ProductCategories />
      <WhyWindowFantasies />
      <ProcessSteps />
      <JimStoryTeaser />
      <SignatureProducts />
      <ReviewsBand />
      <ServiceAreaTeaser />
      <CostHonesty />
      <FinalCTA />
    </>
  );
}
