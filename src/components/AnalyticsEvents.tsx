"use client";

import { useEffect } from "react";
import { trackConversion } from "@/lib/analytics";

/**
 * AnalyticsEvents: one delegated, capture-phase click listener that fires GA4
 * key-event hits for the outbound-intent links scattered across the site
 * (phone, email, map directions) without having to wire every Button and anchor
 * individually. Rendered once in the root layout beside GoogleAnalytics.
 *
 * Form conversions (quote_request, booking_confirmed) do NOT run here — they
 * fire from each form's own success handler so they count real submissions, not
 * clicks. trackConversion() no-ops when gtag is absent, so this is inert in dev
 * and on preview hosts.
 */
export function AnalyticsEvents() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const link = target?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      if (href.startsWith("tel:")) trackConversion("phone_click");
      else if (href.startsWith("mailto:")) trackConversion("email_click");
      else if (/(?:google\.[^/]+\/maps|\/maps\/place|maps\.google\.)/i.test(href))
        trackConversion("directions_click");
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
