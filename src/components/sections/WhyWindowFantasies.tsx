/**
 * WhyWindowFantasies — Band 4 (dark, elevated). The differentiators:
 * "we bring the showroom to you", no pressure, guaranteed for life, repairs even
 * if bought elsewhere. Drawn from siteConfig.painPoints (reframed reassurances).
 */

import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { FadeUp } from "@/components/animations/FadeUp";
import { StaggerContainer, StaggerItem } from "@/components/animations/Stagger";
import { siteConfig } from "@/data/site";

export function WhyWindowFantasies() {
  const items = siteConfig.painPoints;

  return (
    <Section tone="elevated" id="why-window-fantasies">
      <Container size="wide">
        <FadeUp className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <p className="eyebrow" style={{ color: "var(--primary)" }}>
            The Window Fantasies difference
          </p>
          <h2 className="mt-4 font-display text-h2" style={{ color: "var(--text-primary)" }}>
            We bring the showroom to you.
          </h2>
          <p className="mt-4 font-body" style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>
            There is no store to visit, and that is the point. Jim comes to your home with the real samples, holds them in your own windows, and shows you how they behave in your light. You get an education first, then an honest price.
          </p>
        </FadeUp>

        <StaggerContainer staggerDelay={0.08} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <StaggerItem key={item.title} className="h-full">
              <Card className="h-full flex flex-col gap-3">
                <h3 className="font-display text-lg md:text-xl" style={{ color: "var(--text-primary)", lineHeight: 1.25 }}>
                  {item.title}
                </h3>
                <p className="font-body text-sm md:text-base" style={{ color: "var(--text-secondary)", lineHeight: 1.55 }}>
                  {item.body}
                </p>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </Section>
  );
}

export default WhyWindowFantasies;
