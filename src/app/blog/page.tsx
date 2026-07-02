import type { Metadata } from "next";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Card";
import { FadeUp } from "@/components/animations/FadeUp";
import { PostCard, type PostCardData } from "@/components/blog/PostCard";
import { seededPosts, type SeededPost } from "@/data/seededPosts";
import { isSanityConfigured, getSanityClient } from "@/sanity/lib/client";
import { ALL_POSTS_QUERY } from "@/sanity/lib/queries";
import { siteConfig } from "@/data/site";

/**
 * /blog — Article index.
 *
 * Pattern #25 demo-mode fallback: when NEXT_PUBLIC_SANITY_PROJECT_ID is
 * blank, the page renders from seededPosts.ts. When configured, it runs
 * ALL_POSTS_QUERY; any GROQ error falls back to the seeded array so the
 * site never breaks on a misconfigured CMS.
 *
 * Layout per Pattern #71 (no orphans): 1 featured hero card across full
 * width + 9 regular cards in a centered 3-up flex grid = 3 perfectly even
 * rows on lg (so titles read in full), centered trailing card on md, 1-up
 * on mobile. 3-up chosen over 4-up because 4 columns truncated the titles.
 *
 * BINDING (CLAUDE.md §6): H1 wears .hero-shimmer .font-display.
 * BINDING (CLAUDE.md §13): ZERO em dashes in any string literal.
 */

const PAGE_EYEBROW = "Notes from Jim";
const PAGE_H1 = "Straight answers on custom window treatments";
const PAGE_SUBHEAD =
  "What Hunter Douglas costs, whether motorized shades are worth it, and how repairs work. Honest, plain-spoken guides from Jim Garrity, written to help you decide before you ever spend a dollar.";

interface SanityPostShape {
  _id?: string;
  title?: string;
  slug?: string;
  excerpt?: string;
  publishedAt?: string;
  isFeatured?: boolean;
  categoryName?: string;
  mainImageAlt?: string;
}

export const metadata: Metadata = {
  title: PAGE_H1,
  description:
    "Honest guides from Jim Garrity of Window Fantasies on Hunter Douglas window treatments: what they cost, motorized shades, repairs, and how the free in-home consultation works across New England.",
  openGraph: {
    title: PAGE_H1,
    description: PAGE_SUBHEAD,
    type: "website",
  },
};

function seededToCard(post: SeededPost): PostCardData {
  return {
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    publishedAt: post.publishedAt,
    categoryName: post.categoryName,
    mainImageAlt: post.mainImageAlt,
    isFeatured: post.isFeatured,
    readingTime: post.readingTimeMinutes,
  };
}

function sanityToCard(post: SanityPostShape): PostCardData | null {
  if (!post.title || !post.slug || !post.excerpt || !post.publishedAt) return null;
  return {
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    publishedAt: post.publishedAt,
    categoryName: post.categoryName,
    mainImageAlt: post.mainImageAlt,
    isFeatured: post.isFeatured,
  };
}

async function loadPosts(): Promise<PostCardData[]> {
  const fallback = seededPosts.map(seededToCard);
  if (!isSanityConfigured) return fallback;
  const client = getSanityClient();
  if (!client) return fallback;
  try {
    const result = (await client.fetch(ALL_POSTS_QUERY)) as SanityPostShape[] | null;
    if (!result || result.length === 0) return fallback;
    const mapped = result.map(sanityToCard).filter((p): p is PostCardData => p !== null);
    return mapped.length > 0 ? mapped : fallback;
  } catch {
    return fallback;
  }
}

export default async function BlogIndexPage() {
  const posts = await loadPosts();
  const featured = posts.find((p) => p.isFeatured) ?? posts[0];
  const rest = posts.filter((p) => p.slug !== featured?.slug);

  return (
    <>
      <Section tone="elevated" id="blog-header" bgImage="/images/headers/blog.jpg" bgImageAlt="A cozy reading nook beside a light-filtering roller shade." className="pt-32 sm:pt-36 lg:pt-40">
        <Container size="wide">
          <FadeUp className="text-center max-w-3xl mx-auto">
            <Eyebrow className="mb-4">{PAGE_EYEBROW}</Eyebrow>
            <h1 className="hero-shimmer font-display text-h1 mb-5">
              {PAGE_H1}
            </h1>
            <p
              className="font-body text-base md:text-lg leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              {PAGE_SUBHEAD}
            </p>
          </FadeUp>
        </Container>
      </Section>

      <Section tone="cream" id="blog-grid">
        <Container size="wide">
          {featured ? (
            <FadeUp className="mb-12 md:mb-16">
              <FeaturedPostCard post={featured} />
            </FadeUp>
          ) : null}

          {rest.length > 0 ? (
            // 3-up so titles read in full. 8 cards => 3+3+2, so a centered
            // flex row keeps the trailing pair centered instead of orphaning a
            // ragged empty cell on the right (design-symmetry: no lopsided voids).
            <div className="flex flex-wrap justify-center gap-6">
              {rest.map((post, idx) => (
                <FadeUp
                  key={post.slug}
                  delay={idx * 0.05}
                  className="basis-full md:basis-[calc(50%-0.75rem)] lg:basis-[calc(33.333%-1rem)]"
                >
                  <PostCard post={post} tone="light" />
                </FadeUp>
              ))}
            </div>
          ) : (
            <p
              className="font-body text-center"
              style={{ color: "var(--muted-on-light)" }}
            >
              More field notes from the workshop are on the way.
            </p>
          )}
        </Container>
      </Section>
    </>
  );
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

function FeaturedPostCard({ post }: { post: PostCardData }) {
  const headerImage = `/images/blog/${post.slug}-header.jpg`;
  const altText = post.mainImageAlt ?? post.title;
  return (
    <article
      className="relative rounded-2xl border transition-all duration-300 hover:shadow-[0_24px_60px_rgba(7, 7, 6,0.18)] overflow-hidden grid md:grid-cols-2 gap-0"
      style={{
        background: "#FFFFFF",
        borderColor: "color-mix(in oklab, var(--primary) 45%, var(--border-light))",
      }}
    >
      <a href={`/blog/${post.slug}`} className="block relative aspect-[16/10] md:aspect-auto md:min-h-[360px] overflow-hidden">
        <Image
          src={headerImage}
          alt={altText}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 hover:scale-105"
          priority
        />
      </a>

      <div className="flex flex-col p-8 md:p-10 lg:p-12">
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <span
          className="font-mono text-[0.7rem] uppercase tracking-widest px-2.5 py-1 rounded-full border"
          style={{
            background: "color-mix(in oklab, var(--primary) 18%, transparent)",
            borderColor: "color-mix(in oklab, var(--primary) 45%, transparent)",
            color: "var(--gold-deep)",
          }}
        >
          {post.categoryName ?? "Featured"}
        </span>
        <span className="font-mono text-[0.65rem] uppercase tracking-widest" style={{ color: "var(--gold-deep)" }}>
          Featured article
        </span>
      </div>

      <a href={`/blog/${post.slug}`} className="group block">
        <h2
          className="font-display text-h2 mb-5 transition-colors duration-200 group-hover:text-[var(--gold-deep)]"
          style={{ color: "var(--text-on-light)" }}
        >
          {post.title}
        </h2>
        <p
          className="font-body text-base md:text-lg leading-relaxed mb-6"
          style={{ color: "var(--muted-on-light)" }}
        >
          {post.excerpt}
        </p>
      </a>

      <div className="flex flex-wrap items-center gap-4 mt-auto pt-5 border-t" style={{ borderColor: "var(--border-light)" }}>
        <span
          className="font-mono text-xs"
          style={{ color: "var(--muted-on-light)" }}
        >
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          {typeof post.readingTime === "number" ? (
            <>
              <span aria-hidden="true"> · </span>
              <span>{post.readingTime} min read</span>
            </>
          ) : null}
        </span>
        <span aria-hidden="true" style={{ color: "var(--muted-on-light)" }}>·</span>
        <span
          className="font-mono text-xs"
          style={{ color: "var(--muted-on-light)" }}
        >
          By {siteConfig.business.founderName}
        </span>
        <a
          href={`/blog/${post.slug}`}
          className="ml-auto font-mono text-xs uppercase tracking-widest transition-colors duration-200 hover:text-[var(--gold-deep)]"
          style={{ color: "var(--gold-deep)" }}
        >
          Read the full article →
        </a>
      </div>
      </div>
    </article>
  );
}
