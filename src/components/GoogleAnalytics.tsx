import Script from "next/script";

/**
 * GoogleAnalytics — GA4 (gtag.js) for Window Fantasies.
 *
 * Loads via next/script (strategy="afterInteractive"), the documented Next way to
 * load analytics. GA4 Enhanced Measurement captures App Router client navigations
 * without custom router wiring.
 *
 * The Measurement ID is read from NEXT_PUBLIC_GA_ID. When it is blank (the current
 * state until Jim's GA4 property is provisioned) nothing renders, so no hits are
 * sent. Skipped entirely in development so local traffic never pollutes the property.
 *
 * HOSTNAME GUARD: the init script only configures GA on the production apex/www host,
 * so preview deploys do not send hits.
 */

const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

const ALLOWED_HOSTS = ["windowfantasies.com", "www.windowfantasies.com"];

export function GoogleAnalytics() {
  if (process.env.NODE_ENV !== "production") return null;
  if (!GA_ID) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
if (${JSON.stringify(ALLOWED_HOSTS)}.indexOf(location.hostname) !== -1) {
  gtag('js', new Date());
  gtag('config', '${GA_ID}');
}`}
      </Script>
    </>
  );
}
