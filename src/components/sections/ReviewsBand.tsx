/**
 * ReviewsBand — Band 8 (dark, elevated). Real, on-site reviews (no competitor
 * shows any). Shows real testimonials that carry written text; the aggregate
 * rating and count are computed from the real set only, never fabricated.
 */

import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { FadeUp } from "@/components/animations/FadeUp";
import { StaggerContainer, StaggerItem } from "@/components/animations/Stagger";
import { StarRating } from "@/components/ui/StarRating";
import { siteConfig } from "@/data/site";

export function ReviewsBand() {
  const real = siteConfig.testimonials.filter((t) => t.isReal);
  const featured = real.filter((t) => t.body).slice(0, 3);
  const count = real.length;
  const avg =
    count > 0 ? Math.round((real.reduce((s, t) => s + t.rating, 0) / count) * 10) / 10 : 0;

  return (
    <Section tone="elevated" id="reviews">
      <Container size="wide">
        <FadeUp className="text-center max-w-3xl mx-auto mb-12 md:mb-16 flex flex-col items-center gap-4">
          <p className="eyebrow" style={{ color: "var(--primary)" }}>
            In their own words
          </p>
          <h2 className="font-display text-h2" style={{ color: "var(--text-primary)" }}>
            Real reviews from real New England homes.
          </h2>
          <div className="flex flex-col items-center gap-1">
            <StarRating rating={5} size="1.4rem" />
            <p className="font-mono text-xs uppercase tracking-widest" style={{ color: "var(--text-secondary)" }}>
              Rated {avg.toFixed(1)} on Google
            </p>
          </div>
        </FadeUp>

        <StaggerContainer staggerDelay={0.1} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((t) => (
            <StaggerItem key={t.id} className="h-full">
              <Card className="h-full flex flex-col gap-5">
                <StarRating rating={t.rating} size="0.95rem" />
                <blockquote
                  className="font-display italic flex-1"
                  style={{ color: "var(--text-primary)", fontSize: "clamp(1rem, 1.2vw, 1.15rem)", lineHeight: 1.55 }}
                >
                  &ldquo;{t.body}&rdquo;
                </blockquote>
                <div className="h-px w-full" style={{ background: "var(--border-dark)" }} />
                <div className="flex flex-col gap-1">
                  <p className="font-body font-medium text-sm" style={{ color: "var(--text-primary)" }}>
                    {t.name}
                    {t.title ? `, ${t.title}` : ""}
                  </p>
                  <p className="font-mono text-xs uppercase tracking-widest mt-1" style={{ color: "var(--text-muted)" }}>
                    {t.source ?? "Verified"} review{t.date ? ` · ${t.date}` : ""}
                  </p>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="mt-12 flex justify-center">
          <Button href="/testimonials" variant="secondary" size="md">
            Read all reviews
          </Button>
        </div>
      </Container>
    </Section>
  );
}

export default ReviewsBand;
