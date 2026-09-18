/**
 * trackConversion — fire a GA4 event through the gtag global that
 * GoogleAnalytics.tsx installs. SSR-safe, and a no-op whenever gtag is absent
 * (development, a blank NEXT_PUBLIC_GA_ID, or a non-production host where the
 * ga4-init guard skipped gtag('config')). Keeping every call behind this helper
 * means a page never has to know whether analytics is live.
 *
 * The event names below are the site's conversion taxonomy for this lead-gen
 * SAB; each is marked a Key event in the GA4 property. Outbound-intent clicks
 * (phone/email/directions) fire from AnalyticsEvents' delegated listener; the
 * two lead forms fire quote_request / booking_confirmed from their own success
 * handlers.
 */
export type ConversionEvent =
  | "phone_click"
  | "email_click"
  | "directions_click"
  | "quote_request"
  | "booking_confirmed";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackConversion(
  name: ConversionEvent,
  params?: Record<string, unknown>,
): void {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;
  window.gtag("event", name, params ?? {});
}
