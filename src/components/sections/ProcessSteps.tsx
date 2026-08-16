/**
 * ProcessSteps: Band 5 (light, cream). The 3-step process:
 * Consult -> Measure & Design -> Installed by Jim. Convertible, elevated.
 */

import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { FadeUp } from "@/components/animations/FadeUp";
import { StaggerContainer, StaggerItem } from "@/components/animations/Stagger";

const STEPS = [
  {
    n: "01",
    title: "Free in-home consultation",
    body: "We come to you with the real Hunter Douglas samples, learn the room and the light, and educate you on your options. No cost, no pressure.",
  },
  {
    n: "02",
    title: "Measure and design",
    body: "We measure every window and help you choose the right product, fabric, and controls. We give you an honest installed price at your kitchen table.",
  },
  {
    n: "03",
    title: "Installed by Window Fantasies",
    body: "Your custom treatments arrive built for your exact openings. We install them, remove your old ones, and show you how everything works. We stand behind every install.",
  },
];

export function ProcessSteps() {
  return (
    <section id="process" className="relative py-20 md:py-28" style={{ background: "var(--bg-cream)" }}>
      <Container size="wide">
        <FadeUp className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <p className="eyebrow" style={{ color: "var(--gold-deep)" }}>
            How it works
          </p>
          <h2 className="mt-4 font-display text-h2" style={{ color: "var(--text-on-light)" }}>
            Three simple steps, one company the whole way.
          </h2>
          <p className="mt-4 font-body" style={{ color: "var(--muted-on-light)" }}>
            The team that quotes you is the team that measures, designs, and installs. One company, accountable from the first measurement to the final install.
          </p>
        </FadeUp>

        <StaggerContainer staggerDelay={0.12} className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {STEPS.map((step) => (
            <StaggerItem key={step.n} className="h-full">
              <div
                className="h-full rounded-[8px] p-7 lg:p-8 border flex flex-col gap-4"
                style={{ background: "var(--bg-card-light)", borderColor: "var(--border-light)" }}
              >
                <span
                  className="font-display"
                  style={{ color: "var(--primary)", fontSize: "2.75rem", lineHeight: 1, letterSpacing: "-0.02em" }}
                >
                  {step.n}
                </span>
                <h3 className="font-display" style={{ color: "var(--text-on-light)", fontSize: "1.4rem", lineHeight: 1.2 }}>
                  {step.title}
                </h3>
                <p className="font-body" style={{ color: "var(--muted-on-light)", fontSize: "0.975rem", lineHeight: 1.6 }}>
                  {step.body}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="mt-12 flex justify-center">
          <Link
            href="/request-a-consultation"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-lg transition-all duration-200 hover:brightness-110 hover:-translate-y-px"
            style={{ background: "var(--primary)", color: "var(--ink)" }}
          >
            Request Your Free Consultation
          </Link>
        </div>
      </Container>
    </section>
  );
}

export default ProcessSteps;
