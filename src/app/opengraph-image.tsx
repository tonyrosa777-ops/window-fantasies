import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site";

/**
 * opengraph-image.tsx — homepage OG image, generated at build time.
 *
 * Brand tokens (design-system.md §2): warm near-black (--ink #070706),
 * brass gold (--primary #CDAD69), warm bone-cream text (#F6F1E1).
 * Edge-runtime safe: no fetch, no URL font loading (system serif).
 */

export const alt = `${siteConfig.business.name} — ${siteConfig.business.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const b = siteConfig.business;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          backgroundColor: "#070706",
          backgroundImage:
            "radial-gradient(ellipse 70% 60% at 50% 45%, rgba(205, 173, 105,0.20) 0%, rgba(205, 173, 105,0.06) 40%, #070706 78%)",
          color: "#F6F1E1",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: "22px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#CDAD69",
            fontFamily: "monospace",
          }}
        >
          <span>Hunter Douglas Centurion Dealer</span>
          <span style={{ opacity: 0.4 }}>·</span>
          <span>New England</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px", fontFamily: "serif" }}>
          <div
            style={{
              fontSize: "78px",
              fontWeight: 700,
              lineHeight: 1.06,
              letterSpacing: "-0.02em",
              color: "#F6F1E1",
              display: "flex",
              flexWrap: "wrap",
              gap: "0.25em",
            }}
          >
            <span>The finest window treatments in New England,</span>
            <span style={{ color: "#F4E185", fontStyle: "italic" }}>by hand.</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid rgba(246, 241, 225,0.18)",
            paddingTop: "32px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <span style={{ fontSize: "42px", fontWeight: 600, color: "#CDAD69", fontFamily: "serif", letterSpacing: "-0.01em" }}>
              {b.name}
            </span>
            <span style={{ fontSize: "22px", color: "rgba(246, 241, 225,0.72)", fontFamily: "sans-serif" }}>
              Measured, designed, and installed by {b.founderName}
            </span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "flex-end" }}>
            <span style={{ fontSize: "22px", color: "#F6F1E1", fontFamily: "monospace", letterSpacing: "0.08em" }}>
              windowfantasies.com
            </span>
            <span style={{ fontSize: "22px", color: "rgba(246, 241, 225,0.72)", fontFamily: "monospace" }}>
              {b.phoneFormatted}
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
