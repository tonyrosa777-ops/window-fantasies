import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { siteConfig } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { RisingAsh } from "@/components/animations/RisingAsh";
import { hdCopyrightLine, HD_SEPARATE_ENTITIES_DISCLAIMER } from "@/data/hunterDouglas";

/**
 * Footer — Window Fantasies. Dark (--ink). NAP, product + service-area links,
 * trust badges, legal links.
 *
 * ⚠️ COMPLIANCE: the footer carries the two disclosures Hunter Douglas requires
 * site-wide, and they must appear on every page:
 *
 *  1. The dated HD copyright + trademark attribution line. HD requires this on
 *     advertising creative that uses their name and marks.
 *  2. The separate-entities disclaimer. HD permits a dealer to reference their
 *     name only where the communication "clearly describes the two companies as
 *     separate entities". Window Fantasies LLC is not Hunter Douglas, and this
 *     line is what says so.
 *
 * Neither is optional and neither may be moved behind a toggle, shrunk to
 * unreadable, or dropped in a redesign. Both render from src/data/hunterDouglas.ts
 * so their wording stays in one place. See that file before editing this one.
 */

type FooterLink = { label: string; href: string; external?: boolean };

const footerLinks: Record<string, FooterLink[]> = {
  Products: [
    { label: "Shades", href: "/products/shades" },
    { label: "Blinds", href: "/products/blinds" },
    { label: "Shutters", href: "/products/shutters" },
    { label: "Drapery", href: "/products/drapery" },
    { label: "PowerView® Automation", href: "/services/powerview-automation" },
  ],
  Company: [
    { label: "About Jim", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Reviews", href: "/testimonials" },
    { label: "Service Areas", href: "/service-areas" },
    { label: "Blog", href: "/blog" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ],
  "Get Started": [
    { label: "Request a Free Consultation", href: "/request-a-consultation" },
    { label: "Ask Us About a Repair", href: "/request-a-consultation" },
  ],
};

// ⚠️ "Centurion" is a TRADE-ONLY Hunter Douglas designation that may not be shown
// to consumers, and "Guaranteed for Life" is a warranty claim HD does not permit
// in that form. The two strings below are the compliant replacements. Do not
// revert them. See src/data/hunterDouglas.ts.
const trustBadges = [
  "Authorized Hunter Douglas Dealer",
  "Hunter Douglas Limited Lifetime Warranty",
  "BBB A+ Accredited",
  "5.0 Stars on Google",
  "All of New England",
];

export function Footer() {
  const year = new Date().getFullYear();
  const b = siteConfig.business;

  return (
    <footer className="relative overflow-hidden border-t border-[var(--border-dark)]" style={{ background: "var(--ink)" }}>
      {/* Ambient backdrop: the footer is a plain-ink <footer> element, so the
          globals.css section[...] gradient auto-styling never matches it. The
          ash field is the footer's ONE motion layer (CSS transform/opacity
          only, hidden under prefers-reduced-motion). */}
      <RisingAsh />
      <Container className="relative z-10 py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="block">
              <span className="font-display text-2xl leading-none tracking-tight whitespace-nowrap" style={{ color: "var(--text-primary)" }}>
                Window <span style={{ color: "var(--primary)" }}>Fantasies</span>
                <span className="ml-1.5 font-body text-[0.42em] font-semibold uppercase tracking-[0.18em] align-[0.35em]" style={{ color: "var(--text-secondary)" }}>
                  LLC
                </span>
              </span>
            </Link>
            <p className="font-body text-base max-w-sm" style={{ color: "var(--text-secondary)" }}>
              {b.tagline}
            </p>
            <div className="space-y-3 text-sm" style={{ color: "var(--text-secondary)" }}>
              <a href={`tel:${b.phone}`} className="flex items-center gap-3 phone-display hover:text-[var(--primary)] transition-colors">
                <Phone className="h-4 w-4" aria-hidden="true" />
                {b.phoneFormatted}
              </a>
              <a href={`mailto:${b.email}`} className="flex items-center gap-3 hover:text-[var(--primary)] transition-colors">
                <Mail className="h-4 w-4" aria-hidden="true" />
                {b.email}
              </a>
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" aria-hidden="true" />
                <span>
                  {b.address.street}
                  <br />
                  {b.address.city}, {b.address.state} {b.address.zip}
                  <br />
                  <span style={{ color: "var(--text-muted)" }}>By appointment. We bring the samples to you.</span>
                </span>
              </div>
            </div>
          </div>

          {Object.entries(footerLinks).map(([heading, items]) => (
            <div key={heading} className="space-y-4">
              <p className="font-mono text-xs uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>
                {heading}
              </p>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className="text-sm transition-colors hover:text-[var(--primary)]" style={{ color: "var(--text-secondary)" }}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Trust badge row */}
        <div className="mt-14 pt-8 border-t border-[var(--border-dark)]">
          <ul className="flex flex-wrap gap-x-3 gap-y-3">
            {trustBadges.map((badge) => (
              <li
                key={badge}
                className="font-mono text-[11px] uppercase tracking-widest rounded-full px-4 py-2 border"
                style={{ color: "var(--text-secondary)", borderColor: "var(--border-gold)" }}
              >
                {badge}
              </li>
            ))}
          </ul>
        </div>

        {/* ⚠️ HUNTER DOUGLAS REQUIRED DISCLOSURES — site-wide, every page.
            Separate-entities disclaimer + dated HD copyright/trademark
            attribution. Both are mandatory under HD's dealer advertising policy.
            Do not delete, hide, or shrink below legibility. */}
        <div className="mt-10 pt-8 border-t border-[var(--border-dark)] space-y-2">
          <p className="text-xs leading-relaxed max-w-3xl" style={{ color: "var(--text-secondary)" }}>
            {HD_SEPARATE_ENTITIES_DISCLAIMER}
          </p>
          <p className="text-xs leading-relaxed max-w-3xl" style={{ color: "var(--text-muted)" }}>
            {hdCopyrightLine(year)}
          </p>
        </div>

        <div className="mt-8 pt-8 border-t border-[var(--border-dark)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="font-mono text-xs" style={{ color: "var(--text-muted)" }}>
            © {year} {b.legalName}. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs font-mono" style={{ color: "var(--text-muted)" }}>
            <Link href="/privacy" className="hover:text-[var(--primary)] transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-[var(--primary)] transition-colors">Terms</Link>
            <Link href="/accessibility" className="hover:text-[var(--primary)] transition-colors">Accessibility</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
