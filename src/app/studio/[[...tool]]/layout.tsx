import type { Metadata } from "next";

/**
 * /studio layout — Sanity Studio nested layout.
 *
 * Studio renders its own chrome (sidebar, top bar, document panes), so this
 * layout is intentionally minimal. The root layout still wraps with Nav and
 * Footer; Studio occupies the full viewport inside it. Robots are blocked
 * site-wide via the metadata robots field below in addition to next-sitemap
 * conventions.
 */

export const metadata: Metadata = {
  title: "Window Fantasies Studio",
  robots: { index: false, follow: false },
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
