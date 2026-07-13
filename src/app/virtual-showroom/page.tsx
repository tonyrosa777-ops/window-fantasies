import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { FadeUp } from "@/components/animations/FadeUp";
import { SHOWROOM_COPY } from "@/data/showroom";
import { features } from "@/data/features";
import { ShowroomClient } from "./ShowroomClient";

/**
 * /virtual-showroom -- the Premium tier's flagship feature, live as a working
 * demo. Visitor picks a room scene, toggles treatment styles rendered in that
 * SAME room, and sends the favorite look to Jim with a consultation request.
 *
 * Demo state: noindex + nofollow, intentionally NOT in the nav and NOT in the
 * sitemap until the Premium package activates it.
 *
 * Band rhythm (footer-anchored, strictly alternating):
 * // [Nav]            -- chrome
 * // Page header      -- DARK  -- orientation (eyebrow, H1, honest note)
 * // Showroom         -- LIGHT -- the tool (scene picker + viewer + pills)
 * // How it works     -- DARK  -- education (three steps)
 * // Form             -- LIGHT -- conversion (consultation form + context)
 * // [Footer]         -- DARK  -- fixed bookend
 * // Tone string: D L D L -- zero DD/LL runs, last content band opposite the dark footer.
 */

export const metadata: Metadata = {
  title: "Virtual Showroom",
  description:
    "Pick a real room, try every Hunter Douglas treatment style in it, and send your favorite look to Jim with your free consultation request.",
  robots: { index: false, follow: false },
};

export default function VirtualShowroomPage() {
  // PREMIUM-gated: Jim is on Pro (features.virtualShowroom = false), so this
  // route is hidden (404). Flip the flag in @/data/features to unlock on upgrade.
  if (!features.virtualShowroom) notFound();

  return (
    <>
      {/* 1. Page header -- DARK. Orientation: what this is, in Jim's voice,
          plus the honest style-preview note. */}
      <Section tone="base" className="pt-32 sm:pt-36 lg:pt-40">
        <Container>
          <FadeUp>
            <p className="eyebrow">{SHOWROOM_COPY.eyebrow}</p>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="text-h1 hero-shimmer font-display mt-4" style={{ maxWidth: "22ch" }}>
              {SHOWROOM_COPY.h1}
            </h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p
              className="mt-6 font-body"
              style={{
                color: "var(--text-secondary)",
                fontSize: "1.125rem",
                lineHeight: 1.6,
                maxWidth: "58ch",
              }}
            >
              {SHOWROOM_COPY.sub}
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <p
              className="mt-6 inline-block rounded-full border px-4 py-2 font-body text-sm"
              style={{ borderColor: "var(--border-gold)", color: "var(--text-secondary)" }}
            >
              {SHOWROOM_COPY.note}
            </p>
          </FadeUp>
        </Container>
      </Section>

      {/* 2-4. Showroom (LIGHT) + How it works (DARK) + Form (LIGHT).
          One client component owns all three so the live scene + treatment
          selection flows into the consultation form's context prop. */}
      <ShowroomClient />
    </>
  );
}
