import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { seededPosts, type SeededPost } from "@/data/seededPosts";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Card";
import { FadeUp } from "@/components/animations/FadeUp";
import { PostCard } from "@/components/blog/PostCard";
import { PostBody, extractH2Headings } from "@/components/blog/PostBody";
import { ReadingProgress } from "@/components/blog/ReadingProgress";

/**
 * /blog/[slug] — Article detail page.
 *
 * Pattern #66 BINDING: Next 16 params are Promises. Await before destructure.
 * Pattern #25: seededPosts.ts powers demo mode. Sanity GROQ swap will live
 * behind isSanityConfigured in a later stage; for now every prerendered
 * path comes from seededPosts and the route is fully static.
 *
 * BINDING (CLAUDE.md §6): H1 wears .hero-shimmer .font-display.
 * BINDING (CLAUDE.md §13): ZERO em dashes in any string literal.
 */

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return seededPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = seededPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      authors: [post.authorName],
    },
  };
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

function buildArticleJsonLd(post: SeededPost): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.windowfantasies.com";
  const url = `${siteUrl.replace(/\/$/, "")}/blog/${post.slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    author: {
      "@type": "Person",
      name: post.authorName,
      jobTitle: siteConfig.business.founderTitle,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.business.name,
      url: siteUrl,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    articleSection: post.categoryName,
    inLanguage: "en-US",
  };
  return JSON.stringify(schema);
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = seededPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  // Always recommend 3 next reads: same-category first, then backfill with other
  // recent posts so the grid is never short (a 1-card "Related" row leaves an
  // empty 2-column void — see the pricing posts, which are the only 2 in their category).
  const RELATED_COUNT = 3;
  const sameCategory = seededPosts.filter(
    (p) => p.categoryName === post.categoryName && p.slug !== slug
  );
  const fillers = seededPosts.filter(
    (p) => p.slug !== slug && !sameCategory.some((s) => s.slug === p.slug)
  );
  const related = [...sameCategory, ...fillers].slice(0, RELATED_COUNT);

  const tocHeadings = extractH2Headings(post.body);

  return (
    <>
      <ReadingProgress />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: buildArticleJsonLd(post) }}
      />

      <Section tone="base" id="post-hero" className="pt-32 sm:pt-36 lg:pt-40">
        <Container size="wide">
          <FadeUp className="max-w-5xl mx-auto">
            <div className="relative aspect-[16/8] rounded-2xl overflow-hidden mb-10 border border-[var(--border-dark)]">
              <Image
                src={`/images/blog/${post.slug}-header.jpg`}
                alt={post.mainImageAlt}
                fill
                sizes="(min-width: 1024px) 1024px, 100vw"
                className="object-cover"
                priority
              />
            </div>
            <div className="text-center max-w-3xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-5">
                <span
                  className="font-mono text-[0.7rem] uppercase tracking-widest px-2.5 py-1 rounded-full border"
                  style={{
                    background:
                      "color-mix(in oklab, var(--accent) 14%, transparent)",
                    borderColor:
                      "color-mix(in oklab, var(--accent) 30%, transparent)",
                    color: "var(--accent)",
                  }}
                >
                  {post.categoryName}
                </span>
                {post.isFeatured ? (
                  <Eyebrow className="text-[0.65rem]">Featured</Eyebrow>
                ) : null}
              </div>
              <h1 className="hero-shimmer font-display text-h1 mb-6">
                {post.title}
              </h1>
              <p
                className="font-body text-base md:text-lg leading-relaxed mb-6"
                style={{ color: "var(--text-secondary)" }}
              >
                {post.excerpt}
              </p>
              <div
                className="flex flex-wrap items-center justify-center gap-3 font-mono text-xs"
                style={{ color: "var(--text-secondary)" }}
              >
                <span>By {post.authorName}</span>
                <span aria-hidden="true">·</span>
                <time dateTime={post.publishedAt}>
                  {formatDate(post.publishedAt)}
                </time>
                <span aria-hidden="true">·</span>
                <span>{post.readingTimeMinutes} min read</span>
                {post.updatedAt ? (
                  <>
                    <span aria-hidden="true">·</span>
                    <time dateTime={post.updatedAt}>
                      Last updated {formatDate(post.updatedAt)}
                    </time>
                  </>
                ) : null}
              </div>
            </div>
          </FadeUp>

          {/* The body shares the hero's dark band on purpose: ink and espresso
              both classify as D, so rendering them as two sections produced a
              DD run in the route's tone string (Pattern #98). One merged band
              gives every article a strict D-L-D rhythm against the footer. */}
          <div id="post-body" className="mt-16 md:mt-20 grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">
            <div className="lg:col-span-2 min-w-0">
              <FadeUp>
                <PostBody body={post.body} />
              </FadeUp>
            </div>

            <aside className="lg:col-span-1">
              <div className="lg:sticky lg:top-24 space-y-8">
                {tocHeadings.length > 0 ? (
                  <div
                    className="rounded-xl p-6 border"
                    style={{
                      background: "var(--bg-card)",
                      borderColor: "var(--border-dark)",
                    }}
                  >
                    <p
                      className="font-mono text-[0.65rem] uppercase tracking-widest mb-4"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      In this article
                    </p>
                    <ul className="space-y-3">
                      {tocHeadings.map((h) => (
                        <li key={h.id}>
                          <a
                            href={`#${h.id}`}
                            className="font-body text-sm transition-colors duration-200 hover:text-[var(--primary)]"
                            style={{ color: "var(--text-secondary)" }}
                          >
                            {h.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                <div
                  className="rounded-xl p-6 border"
                  style={{
                    background: "var(--bg-card)",
                    borderColor: "var(--border-dark)",
                  }}
                >
                  <p
                    className="font-mono text-[0.65rem] uppercase tracking-widest mb-3"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    About the author
                  </p>
                  <p
                    className="font-display text-lg mb-1"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {siteConfig.business.founderName}
                  </p>
                  <p
                    className="font-mono text-xs mb-4"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {siteConfig.business.founderTitle}
                  </p>
                  <ul className="space-y-2">
                    {siteConfig.about.credentials.slice(0, 4).map((c, i) => (
                      <li
                        key={i}
                        className="font-body text-xs leading-relaxed"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {c.title}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/about"
                    className="inline-block mt-4 font-mono text-xs uppercase tracking-widest transition-colors duration-200 hover:text-[var(--primary)]"
                    style={{ color: "var(--primary)" }}
                  >
                    More about Jim →
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      {related.length > 0 ? (
        <Section tone="cream" id="post-related">
          <Container size="wide">
            <FadeUp className="text-center mb-10 md:mb-12">
              <p className="eyebrow mb-3" style={{ color: "var(--gold-deep)" }}>Keep reading</p>
              <h2
                className="font-display text-h2"
                style={{ color: "var(--text-on-light)" }}
              >
                Related articles
              </h2>
            </FadeUp>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((p, idx) => (
                <FadeUp key={p.slug} delay={idx * 0.05}>
                  <PostCard
                    tone="light"
                    post={{
                      title: p.title,
                      slug: p.slug,
                      excerpt: p.excerpt,
                      publishedAt: p.publishedAt,
                      categoryName: p.categoryName,
                      mainImageAlt: p.mainImageAlt,
                      isFeatured: p.isFeatured,
                      readingTime: p.readingTimeMinutes,
                    }}
                  />
                </FadeUp>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}
    </>
  );
}
