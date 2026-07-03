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
 * Primary links: Products · Services · Portfolio · About · Service Areas · Blog.
 * Visible phone (603) 891-5755 and a gold "Free Consultation" button that goes
 * to /request-a-consultation.
 *
 * Transparent over the hero, fading to a warm-dark blur on scroll. The mobile
 * drawer renders as a SIBLING of <header> so its fixed positioning binds to the
 * viewport, not to the blurred header (backdrop-filter containing-block trap).
 */

const links = [
  { label: "Products", href: "/products" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "About", href: "/about" },
  { label: "Service Areas", href: "/service-areas" },
  { label: "Blog", href: "/blog" },
];

const drawerLinks = [
  ...links,
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

          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
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

          <div className="hidden lg:flex items-center gap-4 xl:gap-5">
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
          <div className="flex items-center gap-1 lg:hidden">
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
            className="fixed inset-0 z-[60] lg:hidden overflow-y-auto"
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
