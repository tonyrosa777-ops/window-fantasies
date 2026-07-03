import Link from "next/link";
import Image from "next/image";
import { Card, Eyebrow } from "@/components/ui/Card";

/**
 * PostCard — Blog index article card.
 *
 * Renders a single post tile inside the /blog grid (Pattern #71: 1 featured +
 * 8 regular = 4-col rows with no orphans). Category chip color tracks
 * isFeatured (gold for featured, sage for regular). Title clamps to 2 lines,
 * excerpt to 3, so cards stay equal-height in the CSS grid.
 *
 * tone="light" flips the card to a white surface with ink text so it reads on
 * a cream band (design-system.md §4 alternation).
 *
 * BINDING (CLAUDE.md §13): ZERO em dashes in any string literal.
 */

export interface PostCardData {
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  categoryName?: string;
  mainImageAlt?: string;
  isFeatured?: boolean;
  readingTime?: number;
}

interface Props {
  post: PostCardData;
  variant?: "default" | "featured";
  tone?: "dark" | "light";
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function PostCard({ post, variant = "default", tone = "dark" }: Props) {
  const isFeatured = variant === "featured" || Boolean(post.isFeatured);
  const isLight = tone === "light";
  const chipBg = isFeatured
    ? "color-mix(in oklab, var(--primary) 18%, transparent)"
    : "color-mix(in oklab, var(--accent) 14%, transparent)";
  const chipBorder = isFeatured
    ? "color-mix(in oklab, var(--primary) 38%, transparent)"
    : "color-mix(in oklab, var(--accent) 30%, transparent)";
  const chipColor = isLight
    ? "var(--gold-deep)"
    : isFeatured
    ? "var(--primary)"
    : "var(--accent)";
  const titleColor = isLight ? "var(--text-on-light)" : "var(--text-primary)";
  const bodyColor = isLight ? "var(--muted-on-light)" : "var(--text-secondary)";
  const metaColor = isLight ? "var(--muted-on-light)" : "var(--text-secondary)";
  const metaBorder = isLight ? "var(--border-light)" : "var(--border-dark)";
  const linkColor = isLight ? "var(--gold-deep)" : "var(--primary)";

  const cardImage = `/images/blog/${post.slug}-card.jpg`;
  const altText = post.mainImageAlt ?? post.title;

  const Inner = (
    <>
      <Link
        href={`/blog/${post.slug}`}
        className="block relative aspect-[4/3] overflow-hidden"
        style={{ background: "var(--bg-elevated)" }}
      >
        <Image
          src={cardImage}
          alt={altText}
          fill
          sizes="(min-width: 1024px) 300px, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
      </Link>

      <div className="flex flex-col flex-1 p-6 sm:p-7">
        <div className="flex items-center gap-3 mb-4">
          {post.categoryName ? (
            <span
              className="font-mono text-[0.7rem] uppercase tracking-widest px-2.5 py-1 rounded-full border"
              style={{
                background: chipBg,
                borderColor: chipBorder,
                color: chipColor,
              }}
            >
              {post.categoryName}
            </span>
          ) : null}
          {isFeatured ? (
            <Eyebrow className="text-[0.65rem]">Featured</Eyebrow>
          ) : null}
        </div>

        <Link href={`/blog/${post.slug}`} className="group block flex-1">
          <h3
            className="font-display text-h3 line-clamp-3 mb-3 transition-colors duration-200 group-hover:text-[var(--primary)]"
            style={{ color: titleColor }}
          >
            {post.title}
          </h3>
          <p
            className="font-body text-sm line-clamp-3 mb-6"
            style={{ color: bodyColor }}
          >
            {post.excerpt}
          </p>
        </Link>

        <div
          className="mt-auto pt-4 border-t flex items-center justify-between"
          style={{ borderColor: metaBorder }}
        >
          <div className="font-mono text-xs" style={{ color: metaColor }}>
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            {typeof post.readingTime === "number" ? (
              <>
                <span aria-hidden="true"> · </span>
                <span>{post.readingTime} min read</span>
              </>
            ) : null}
          </div>
          <Link
            href={`/blog/${post.slug}`}
            className="font-mono text-xs uppercase tracking-widest transition-colors duration-200 hover:text-[var(--primary)]"
            style={{ color: linkColor }}
          >
            Read more →
          </Link>
        </div>
      </div>
    </>
  );

  if (isLight) {
    return (
      <div
        className="h-full flex flex-col overflow-hidden rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_48px_rgba(7, 7, 6,0.18)]"
        style={{ background: "var(--bg-card-light)", borderColor: "var(--border-light)" }}
      >
        {Inner}
      </div>
    );
  }

  return (
    <Card hoverable={true} className="h-full flex flex-col !p-0 overflow-hidden">
      {Inner}
    </Card>
  );
}
