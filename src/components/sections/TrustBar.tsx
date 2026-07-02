/**
 * TrustSignals — the six proof points, rendered as the BOTTOM STRIP of the hero
 * band (design-system §5 + §11 band 1; Pattern #98 parity fix 2026-07-02: the
 * old standalone dark TrustBar band created a DD seam under the dark hero, so
 * the row merged INTO the hero section — 10 content bands, strict alternation).
 * Pre-empts the trust fear immediately below the hero fold, same warm-dark band.
 */

import { Container } from "@/components/ui/Container";
import { FadeUp } from "@/components/animations/FadeUp";
import { StaggerContainer, StaggerItem } from "@/components/animations/Stagger";

const SIGNALS: { value: string; label: string }[] = [
  { value: "30+", label: "Years in window fashions" },
  { value: "Centurion", label: "Top-tier Hunter Douglas dealer" },
  { value: "Lifetime", label: "Guaranteed for life" },
  { value: "A+", label: "BBB accredited" },
  { value: "5.0", label: "Rated on Google" },
  { value: "New England", label: "NH, MA, ME, VT, and the Cape" },
];

export function TrustSignals() {
  return (
    <div
      id="trust-bar"
      className="relative z-10 py-14 md:py-16"
      style={{
        borderTop: "1px solid var(--border-dark)",
        background: "radial-gradient(ellipse 140% 120% at 50% 115%, rgba(7, 7, 6, 0.95) 40%, rgba(7, 7, 6, 0.55) 100%)",
      }}
    >
      <Container size="wide">
        <FadeUp className="text-center mb-8">
          <p className="eyebrow" style={{ color: "var(--primary)" }}>
            Why homeowners trust Jim
          </p>
        </FadeUp>
        <StaggerContainer
          staggerDelay={0.06}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-8"
        >
          {SIGNALS.map((s) => (
            <StaggerItem key={s.label} className="text-center">
              <p
                className="font-display"
                style={{ color: "var(--primary)", fontSize: "clamp(1.5rem, 3vw, 2.1rem)", lineHeight: 1.05 }}
              >
                {s.value}
              </p>
              <p
                className="mt-2 font-mono text-[11px] uppercase tracking-widest"
                style={{ color: "var(--text-secondary)", lineHeight: 1.4 }}
              >
                {s.label}
              </p>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </Container>
    </div>
  );
}

export default TrustSignals;
