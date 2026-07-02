/**
 * CostHonesty — Band 10 (dark, base). The sticker-shock solvent (AEO exploit).
 * Answer-first honesty on cost, then the reassurance: the consultation is free
 * and the value is guaranteed for life.
 */

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { FadeUp } from "@/components/animations/FadeUp";
import { StaggerContainer, StaggerItem } from "@/components/animations/Stagger";

const POINTS: { title: string; body: string }[] = [
  {
    title: "Yes, it is an investment",
    body: "Hunter Douglas is custom and premium, the Mercedes-Benz for your window. A single high-end shade can run around $1,600, and every treatment is built for your exact opening.",
  },
  {
    title: "The consultation is always free",
    body: "You pay nothing to have Jim come out, educate you, and measure. You will know the real installed price before you commit to anything, no obligation.",
  },
  {
    title: "Jim sells you what you deserve",
    body: "Not what he wants to move. If a simpler product fits your situation, he will tell you. Everyone gets the same honest advice, whether it is one window or thirty.",
  },
  {
    title: "It is guaranteed for life",
    body: "You are not just buying shades, you are buying permanence. Guaranteed for life, serviced by the person who installed it. You call Jim, and he answers.",
  },
];

export function CostHonesty() {
  return (
    <Section tone="base" id="cost-honesty">
      <Container size="wide">
        <FadeUp className="max-w-3xl mb-12 md:mb-16">
          <p className="eyebrow" style={{ color: "var(--primary)" }}>
            Let us talk about cost
          </p>
          <h2 className="mt-4 font-display text-h2" style={{ color: "var(--text-primary)" }}>
            &ldquo;Who knew shades could cost so much?&rdquo; Here is the honest answer.
          </h2>
          <p className="mt-4 font-body text-lg" style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>
            A lot of people feel a little sticker shock at first, and that is fair. So Jim is straight with you about it, then he makes sure you get a fair deal on a product built to last a lifetime.
          </p>
        </FadeUp>

        <StaggerContainer staggerDelay={0.08} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {POINTS.map((p) => (
            <StaggerItem key={p.title} className="h-full">
              <div
                className="h-full rounded-[8px] p-6 sm:p-7 border flex gap-4"
                style={{ background: "var(--bg-card)", borderColor: "var(--border-dark)" }}
              >
                <span
                  className="flex-shrink-0 mt-2"
                  style={{ width: "8px", height: "8px", borderRadius: "999px", background: "var(--primary)" }}
                  aria-hidden="true"
                />
                <div className="flex flex-col gap-2">
                  <h3 className="font-display" style={{ color: "var(--text-primary)", fontSize: "1.25rem", lineHeight: 1.25 }}>
                    {p.title}
                  </h3>
                  <p className="font-body" style={{ color: "var(--text-secondary)", fontSize: "0.975rem", lineHeight: 1.6 }}>
                    {p.body}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </Section>
  );
}

export default CostHonesty;
