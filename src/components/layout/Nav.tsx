"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

/**
 * Nav — Window Fantasies.
 *
 * Primary links: Products · PowerView · Services · Portfolio · About · Service Areas · Blog.
 * Visible phone (603) 891-5755 and a gold "Free Consultation" button that goes
 * to /request-a-consultation.
 *
 * Transparent over the hero, fading to a warm-dark blur on scroll. The mobile
 * drawer renders as a SIBLING of <header> so its fixed positioning binds to the
 * viewport, not to the blurred header (backdrop-filter containing-block trap).
 */

// Desktop uses the short "PowerView" label: even at the xl (1280px) nav
// transition the full "PowerView Motorization" label crowds the bar and risks a
// wrap. The drawer has room, so it carries the full label (mapped below).
// Full horizontal nav shows at xl (>=1280px) — below that the links + phone + CTA
// cannot fit without wrapping (measured wrap band 1024-1240px, Error #133 family),
// so <xl collapses to the clean hamburger drawer instead. The count dropped 8 -> 7
// when the Pricing link was removed, which MAY leave room to lower the xl threshold;
// that stays as-is until someone RE-MEASURES the wrap band, because guessing a
// breakpoint off a link count is exactly how Error #133 shipped.
// The "⬥ Pricing" internal Optimus sales link was REMOVED from the nav 2026-07-16 and
// the /pricing ROUTE ITSELF WAS DELETED 2026-07-20: Jim closed on Pro 2026-07-13, so the
// demo is over and the Optimus tier menu is not his to show his customers. This clears the
// pre-launch-auditor hard FAIL on a live /pricing. Do NOT re-add a { href: "/pricing" }
// link — the route no longer exists and would 404. The tier menu now lives only in
// pro-plan-deliverables.md (project root); rebuild the page from there for an upsell demo.
const links = [
  { label: "Products", href: "/products" },
  { label: "PowerView", href: "/services/powerview-automation" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Service Areas", href: "/service-areas" },
  { label: "Blog", href: "/blog" },
];

const drawerLinks = [
  ...links.map((l) =>
    l.href === "/services/powerview-automation"
      ? { ...l, label: "PowerView Motorization" }
      : l
  ),
  { label: "Take the Quiz", href: "/quiz" },
  { label: "Reviews", href: "/testimonials" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

const Wordmark = ({ className }: { className?: string }) => (
  <span
    className={cn("font-display leading-none tracking-tight", className)}
    style={{ color: "var(--text-primary)" }}
  >
    Window <span style={{ color: "var(--primary)" }}>Fantasies</span>
  </span>
);

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300",
          scrolled ? "backdrop-blur-md border-b border-[var(--border-dark)]" : ""
        )}
        style={{
          background: scrolled
            ? "color-mix(in oklab, var(--ink) 90%, transparent)"
            : "transparent",
        }}
      >
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 flex items-center justify-between h-20 md:h-24 lg:h-28">
          <Link href="/" aria-label="Window Fantasies home">
            <Wordmark className="text-xl md:text-2xl" />
          </Link>

          <nav className="hidden xl:flex items-center gap-6">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-medium transition-colors duration-200 hover:text-[var(--primary)]"
                style={{ color: "var(--text-secondary)" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden xl:flex items-center gap-4">
            <a
              href={`tel:${siteConfig.business.phone}`}
              className="flex items-center gap-2 text-sm phone-display transition-colors duration-200 hover:text-[var(--primary)]"
              style={{ color: "var(--text-secondary)" }}
            >
              <Phone className="h-3.5 w-3.5" aria-hidden="true" />
              {siteConfig.business.phoneFormatted}
            </a>
            <Button href="/request-a-consultation" variant="primary" size="sm">
              Free Consultation
            </Button>
          </div>

          {/* Mobile cluster: an always-visible tap-to-call (phone-first buyers must
              reach Jim without opening the drawer — five-persona QA "Dot") + hamburger. */}
          <div className="flex items-center gap-1 xl:hidden">
            <a
              href={`tel:${siteConfig.business.phone}`}
              className="flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold"
              style={{ background: "var(--primary)", color: "var(--ink)" }}
              aria-label={`Call Jim at ${siteConfig.business.phoneFormatted}`}
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="p-2"
              aria-label="Open navigation menu"
              style={{ color: "var(--text-primary)" }}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] xl:hidden overflow-y-auto"
            style={{ background: "var(--ink)" }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="flex items-center justify-between h-20 px-6 border-b border-[var(--border-dark)]">
              <Wordmark className="text-xl" />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="p-2"
                aria-label="Close navigation menu"
                style={{ color: "var(--text-primary)" }}
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="px-6 py-10 flex flex-col gap-6">
              {drawerLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="font-display text-2xl"
                  style={{ color: "var(--text-primary)" }}
                >
                  {l.label}
                </Link>
              ))}
              <div className="border-t border-[var(--border-dark)] mt-6 pt-6 flex flex-col gap-4">
                <a
                  href={`tel:${siteConfig.business.phone}`}
                  className="flex items-center gap-2 phone-display text-base"
                  style={{ color: "var(--text-secondary)" }}
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  {siteConfig.business.phoneFormatted}
                </a>
                <Button href="/request-a-consultation" variant="primary" size="md" className="w-full">
                  Request a Free Consultation
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
