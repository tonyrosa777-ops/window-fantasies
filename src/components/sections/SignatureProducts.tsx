/**
 * SignatureProducts: Band 7 (light, cream). Real-photo showcase of the headline
 * Hunter Douglas products. Photo-led.
 *
 * ⚠️ COMPLIANCE. Every product name here is a Hunter Douglas trademark and must
 * carry its own symbol PLUS its category descriptor, per HD's trademark rules.
 * The traps this file has already stepped in once: PowerView is "PowerView®
 * Automation", never "Motorization", and LightLock is ®, not ™. Names are built
 * from src/data/hunterDouglas.ts so a hand-typed name cannot drift again.
 *
 * This band promotes PowerView® scheduling and app control, so HD's mandatory
 * legal sentence renders at the bottom via <PowerViewDisclosure />. It is not
 * optional and it may not be paraphrased or hidden.
 *
 * ⚠️ THE LABEL SAYS THE PRODUCT, NOT "by Hunter Douglas". These four photos are
 * the site's OWN room stills that DEPICT Hunter Douglas products. They are not
 * HD's licensed photography (that lives in /images/window-fashions/ and is
 * referenced from workItems in site.ts, each carrying its own `credit`). So the
 * lead label is the bare product name, exactly HD's second worked example
 * ("Parkland® Wood Blinds" under a photo): it satisfies "clearly labeled with
 * the specific product" WITHOUT claiming HD shot the picture. Captioning one of
 * these "by Hunter Douglas" would misattribute authorship to HD, which is worse
 * than no caption at all.
 *
 * ⚠️ ALT TEXT: Hunter Douglas manufactures, Jim measures and installs. Alt never
 * reads "<product> by Window Fantasies" (that claims Window Fantasies made it).
 */

import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { FadeUp } from "@/components/animations/FadeUp";
import { StaggerContainer, StaggerItem } from "@/components/animations/Stagger";
import { HDPhotoCredit } from "@/components/brand/HDPhotoCredit";
import { PowerViewDisclosure } from "@/components/brand/PowerViewDisclosure";
import { hdMark } from "@/data/hunterDouglas";

const SIGNATURES: { name: string; blurb: string; img: string; alt: string; href: string }[] = [
  {
    name: hdMark("silhouette"),
    blurb: "S-vane sheers that float between two sheers for soft, diffused light and daytime privacy. The signature Hunter Douglas look.",
    img: "/images/signature/silhouette.webp",
    alt: "Custom Hunter Douglas Silhouette® Window Shadings softening the light across a bay window in a New England living room, measured and installed by Window Fantasies.",
    href: "/products/shades",
  },
  {
    name: hdMark("duette"),
    blurb: "Energy-efficient cellular shades, with room darkening via LightLock®. Takes a beating and still looks great.",
    img: "/images/signature/duette.webp",
    alt: "Custom Hunter Douglas Duette® Honeycomb Shades in a New England home, measured and installed by Window Fantasies.",
    href: "/products/shades",
  },
  {
    name: hdMark("luminette"),
    blurb: "Drapery-like vertical sheers with rotating vanes, perfect for doors and wide openings.",
    img: "/images/signature/luminette.webp",
    alt: "Custom Hunter Douglas Luminette® Privacy Sheers across a wide opening in a New England home, measured and installed by Window Fantasies.",
    href: "/products/drapery",
  },
  {
    name: hdMark("powerview"),
    blurb: "Control your shades from your phone, your voice, or a beach in Florida. Sunglasses for your windows, on a schedule.",
    img: "/images/signature/powerview.webp",
    alt: "Hunter Douglas shades running on PowerView® Automation in a New England home, installed and configured by Window Fantasies.",
    href: "/services/powerview-automation",
  },
];

export function SignatureProducts() {
  return (
    <section id="signature-products" className="relative py-20 md:py-28" style={{ background: "var(--bg-cream)" }}>
      <Container size="wide">
        <FadeUp className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <p className="eyebrow" style={{ color: "var(--gold-deep)" }}>
            Signature products
          </p>
          <h2 className="mt-4 font-display text-h2" style={{ color: "var(--text-on-light)" }}>
            The pieces homeowners fall in love with.
          </h2>
          <p className="mt-4 font-body" style={{ color: "var(--muted-on-light)" }}>
            A few of the Hunter Douglas products Jim installs most. See them in your own light at your free consultation.
          </p>
        </FadeUp>

        <StaggerContainer staggerDelay={0.08} className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {SIGNATURES.map((s, i) => (
            <StaggerItem key={s.name} className="h-full">
              <Link
                href={s.href}
                className="group flex flex-col h-full rounded-[8px] overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_48px_rgba(7, 7, 6,0.18)]"
                style={{ background: "var(--bg-card-light)", borderColor: "var(--border-light)" }}
              >
                <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16 / 9" }}>
                  <Image
                    src={s.img}
                    alt={s.alt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* HD product label on the LEAD photo only (HD first-instance
                      rule). Overlay, not a caption below, so both cards in the
                      top row keep identical heights.

                      Product name ALONE (s.name is already the full trademarked
                      form from hdMark). This is our own still of the product,
                      not HD's photograph, so it must not read "by Hunter
                      Douglas". See the file header. */}
                  {i === 0 ? (
                    <HDPhotoCredit credit={`Hunter Douglas ${s.name}`} variant="overlay" />
                  ) : null}
                </div>
                <div className="p-6 sm:p-7 flex flex-col gap-2">
                  <h3 className="font-display" style={{ color: "var(--text-on-light)", fontSize: "1.6rem", lineHeight: 1.15 }}>
                    {s.name}
                  </h3>
                  <p className="font-body" style={{ color: "var(--muted-on-light)", fontSize: "0.975rem", lineHeight: 1.6 }}>
                    {s.blurb}
                  </p>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* MANDATORY Hunter Douglas legal copy. This band promotes PowerView®
            scheduling and phone control, so HD requires the App sentence here.
            Visible, in the DOM, never aria-hidden. Do not remove. */}
        <FadeUp className="mt-10 flex justify-center">
          <PowerViewDisclosure tone="light" className="text-center" />
        </FadeUp>
      </Container>
    </section>
  );
}

export default SignatureProducts;
