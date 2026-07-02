/**
 * JimStoryTeaser — Band 6 (dark, base). The category-unique asset: a named,
 * real, local human. Firefighter -> Centurion dealer. Photo + teaser + link to
 * /about. (No owner headshot in the hero, per design-system; his face and story
 * live here and on About. A real Jim portrait can replace the install photo.)
 */

import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { FadeUp } from "@/components/animations/FadeUp";
import { ScaleIn } from "@/components/animations/ScaleIn";

export function JimStoryTeaser() {
  return (
    <Section tone="base" id="jim-story">
      <Container size="wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <ScaleIn from={0.96}>
            <div
              className="relative w-full rounded-[8px] border overflow-hidden"
              style={{
                aspectRatio: "4 / 3",
                borderColor: "var(--border-gold)",
                boxShadow: "0 28px 70px rgba(0,0,0,0.55)",
              }}
            >
              <Image
                src="/images/hunter-douglas/p11.jpg"
                alt="Warm golden light through hardwood plantation shutters, a signature Window Fantasies install."
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </ScaleIn>

          <FadeUp delay={0.1} className="flex flex-col gap-5">
            <p className="eyebrow" style={{ color: "var(--primary)" }}>
              Meet Jim
            </p>
            <h2 className="font-display text-h2" style={{ color: "var(--text-primary)", lineHeight: 1.18 }}>
              A retired firefighter who treats your home like the only call that matters.
            </h2>
            <p className="font-body text-base md:text-lg max-w-prose" style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>
              Jim Garrity spent a career as a fire lieutenant, then more than thirty years in window fashions. He owns Window Fantasies and holds Hunter Douglas's top Centurion dealer tier. He measures, designs, and installs every treatment himself.
            </p>
            <p className="font-body text-base md:text-lg max-w-prose" style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>
              Whether you live in a double-wide or a Boston tower, you get the same Jim: the same honesty, the same craft, and the same promise. You call, and he answers.
            </p>
            <div className="pt-2">
              <Button href="/about" variant="secondary" size="md">
                Read Jim&apos;s full story
              </Button>
            </div>
          </FadeUp>
        </div>
      </Container>
    </Section>
  );
}

export default JimStoryTeaser;
