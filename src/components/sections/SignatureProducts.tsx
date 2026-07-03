/**
 * SignatureProducts — Band 7 (light, cream). Real-photo showcase of the headline
 * Hunter Douglas products: Silhouette, Duette, Luminette, PowerView. Photo-led.
 */

import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { FadeUp } from "@/components/animations/FadeUp";
import { StaggerContainer, StaggerItem } from "@/components/animations/Stagger";

const SIGNATURES: { name: string; blurb: string; img: string; href: string }[] = [
  {
    name: "Silhouette",
    blurb: "S-vane sheers that float between two sheers for soft, diffused light and daytime privacy. The signature Hunter Douglas look.",
    img: "/images/signature/silhouette.jpg",
    href: "/products/shades",
  },
  {
    name: "Duette Honeycomb",
    blurb: "Energy-efficient cellular shades, with true blackout via LightLock. Takes a beating and still looks great.",
    img: "/images/signature/duette.jpg",
    href: "/products/shades",
  },
  {
    name: "Luminette",
    blurb: "Drapery-like vertical sheers with rotating vanes, perfect for doors and wide openings.",
    img: "/images/signature/luminette.jpg",
    href: "/products/drapery",
  },
  {
    name: "PowerView Motorization",
    blurb: "Control your shades from your phone, your voice, or a beach in Florida. Sunglasses for your windows, on a schedule.",
    img: "/images/signature/powerview.jpg",
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
          {SIGNATURES.map((s) => (
            <StaggerItem key={s.name} className="h-full">
              <Link
                href={s.href}
                className="group flex flex-col h-full rounded-[8px] overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_48px_rgba(7, 7, 6,0.18)]"
                style={{ background: "var(--bg-card-light)", borderColor: "var(--border-light)" }}
              >
                <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16 / 9" }}>
                  <Image
                    src={s.img}
                    alt={`Hunter Douglas ${s.name} installed in a New England home`}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
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
      </Container>
    </section>
  );
}

export default SignatureProducts;
