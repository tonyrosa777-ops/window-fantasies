import type { CSSProperties } from "react";
import type { SeededPostParagraph } from "@/data/seededPosts";

/**
 * PostBody — Article body renderer for /blog/[slug].
 *
 * Accepts the seededPosts body shape (array of typed paragraph blocks with
 * `type` of "p" | "h2" | "h3" | "ul" | "ol"), a raw string, or an array of
 * paragraph strings. Portable Text arrays (objects with `_type: "block"`)
 * are flattened to plain paragraphs in demo mode, since @portabletext/react
 * is not yet wired in this scaffold.
 *
 * Readability per Pattern #34: max-w-prose container, font-body body copy,
 * drop-cap on the first paragraph's first letter (CSS via inline style on a
 * scoped class). H2s carry hero-shimmer-sage and id attributes for in-page
 * TOC anchor linking from the post detail sidebar.
 *
 * BINDING (CLAUDE.md §13): ZERO em dashes in any string literal.
 */

type PortableTextBlock = {
  _type: "block";
  style?: string;
  children?: { _type?: string; text?: string }[];
};

export type PostBodyContent =
  | string
  | string[]
  | SeededPostParagraph[]
  | PortableTextBlock[];

interface Props {
  body: PostBodyContent;
}

function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function isSeededParagraphArray(
  value: SeededPostParagraph[] | PortableTextBlock[]
): value is SeededPostParagraph[] {
  if (value.length === 0) return true;
  const first = value[0] as SeededPostParagraph & PortableTextBlock;
  return typeof first.type === "string" && first._type !== "block";
}

function flattenPortableTextBlock(block: PortableTextBlock): string {
  if (!block.children) return "";
  return block.children.map((c) => c.text ?? "").join("");
}

const dropCapStyle: CSSProperties = {
  // Drop-cap on the first paragraph's first letter (Pattern #34 readability).
};

const firstPClassName =
  "first-paragraph font-body text-base md:text-lg leading-relaxed mb-6";

function renderSeededBody(body: SeededPostParagraph[]) {
  const nodes: React.ReactNode[] = [];
  let firstParagraphRendered = false;

  body.forEach((block, idx) => {
    const key = `block-${idx}`;
    if (block.type === "p" && block.text) {
      const isFirst = !firstParagraphRendered;
      firstParagraphRendered = true;
      nodes.push(
        <p
          key={key}
          className={
            isFirst
              ? firstPClassName
              : "font-body text-base md:text-lg leading-relaxed mb-6"
          }
          style={{ color: "var(--text-secondary)", ...dropCapStyle }}
        >
          {block.text}
        </p>
      );
      return;
    }
    if (block.type === "h2" && block.text) {
      nodes.push(
        <h2
          key={key}
          id={slugifyHeading(block.text)}
          className="font-display text-h2 hero-shimmer-sage mt-12 mb-5 scroll-mt-24"
        >
          {block.text}
        </h2>
      );
      return;
    }
    if (block.type === "h3" && block.text) {
      nodes.push(
        <h3
          key={key}
          id={slugifyHeading(block.text)}
          className="font-display text-h3 mt-8 mb-4 scroll-mt-24"
          style={{ color: "var(--text-primary)" }}
        >
          {block.text}
        </h3>
      );
      return;
    }
    if (block.type === "ul" && block.items) {
      nodes.push(
        <ul
          key={key}
          className="font-body text-base md:text-lg leading-relaxed mb-6 space-y-2 list-disc pl-6"
          style={{ color: "var(--text-secondary)" }}
        >
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
      return;
    }
    if (block.type === "ol" && block.items) {
      nodes.push(
        <ol
          key={key}
          className="font-body text-base md:text-lg leading-relaxed mb-6 space-y-2 list-decimal pl-6"
          style={{ color: "var(--text-secondary)" }}
        >
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ol>
      );
      return;
    }
    if (block.type === "table" && block.headers && block.rows) {
      nodes.push(
        <div key={key} className="overflow-x-auto mb-8 rounded-lg border" style={{ borderColor: "var(--border-dark)" }}>
          <table className="w-full font-body text-sm md:text-base" style={{ borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "color-mix(in oklab, var(--primary) 10%, transparent)" }}>
                {block.headers.map((h, i) => (
                  <th
                    key={i}
                    className="text-left font-semibold px-4 py-3 border-b"
                    style={{ color: "var(--text-primary)", borderColor: "var(--border-dark)" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, r) => (
                <tr key={r}>
                  {row.map((cell, c) => (
                    <td
                      key={c}
                      className="px-4 py-3 border-b align-top"
                      style={{
                        color: c === 0 ? "var(--text-primary)" : "var(--text-secondary)",
                        borderColor: "var(--border-dark)",
                      }}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      return;
    }
    if (block.type === "sources" && block.sources) {
      nodes.push(
        <div
          key={key}
          className="mt-12 pt-6 border-t"
          style={{ borderColor: "var(--border-dark)" }}
        >
          <p
            className="font-mono text-xs uppercase tracking-widest mb-3"
            style={{ color: "var(--text-muted)" }}
          >
            Sources
          </p>
          <ul className="font-body text-sm space-y-2" style={{ color: "var(--text-secondary)" }}>
            {block.sources.map((s, i) => (
              <li key={i}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 transition-colors hover:text-[var(--primary)]"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      );
      return;
    }
  });

  return nodes;
}

function renderStringParagraphs(paragraphs: string[]) {
  return paragraphs.map((text, idx) => (
    <p
      key={`p-${idx}`}
      className={
        idx === 0
          ? firstPClassName
          : "font-body text-base md:text-lg leading-relaxed mb-6"
      }
      style={{ color: "var(--text-secondary)" }}
    >
      {text}
    </p>
  ));
}

function renderPortableTextFallback(blocks: PortableTextBlock[]) {
  return blocks.map((block, idx) => {
    const text = flattenPortableTextBlock(block);
    if (!text) return null;
    if (block.style === "h2") {
      return (
        <h2
          key={`pt-${idx}`}
          id={slugifyHeading(text)}
          className="font-display text-h2 hero-shimmer-sage mt-12 mb-5 scroll-mt-24"
        >
          {text}
        </h2>
      );
    }
    if (block.style === "h3") {
      return (
        <h3
          key={`pt-${idx}`}
          id={slugifyHeading(text)}
          className="font-display text-h3 mt-8 mb-4 scroll-mt-24"
          style={{ color: "var(--text-primary)" }}
        >
          {text}
        </h3>
      );
    }
    return (
      <p
        key={`pt-${idx}`}
        className={
          idx === 0
            ? firstPClassName
            : "font-body text-base md:text-lg leading-relaxed mb-6"
        }
        style={{ color: "var(--text-secondary)" }}
      >
        {text}
      </p>
    );
  });
}

export function PostBody({ body }: Props) {
  let rendered: React.ReactNode;

  if (typeof body === "string") {
    const paragraphs = body
      .split(/\n{2,}/)
      .map((p) => p.trim())
      .filter(Boolean);
    rendered = renderStringParagraphs(paragraphs);
  } else if (Array.isArray(body)) {
    if (body.length > 0 && typeof body[0] === "string") {
      rendered = renderStringParagraphs(body as string[]);
    } else {
      const blockArray = body as SeededPostParagraph[] | PortableTextBlock[];
      if (isSeededParagraphArray(blockArray)) {
        rendered = renderSeededBody(blockArray);
      } else {
        rendered = renderPortableTextFallback(blockArray as PortableTextBlock[]);
      }
    }
  } else {
    rendered = null;
  }

  return (
    <>
      <style>{`
        .post-body .first-paragraph::first-letter {
          font-family: var(--font-display), Georgia, serif;
          font-size: 3.75rem;
          line-height: 1;
          font-weight: 600;
          float: left;
          margin: 0.35rem 0.75rem 0 0;
          color: var(--primary);
        }
      `}</style>
      <article className="post-body max-w-prose">{rendered}</article>
    </>
  );
}

/**
 * Utility: extract H2 headings from a SeededPost body so the post detail
 * page can render a Table of Contents in its sidebar. Returns [] when no
 * H2 blocks exist (e.g. very short article).
 */
export function extractH2Headings(body: PostBodyContent): { id: string; text: string }[] {
  if (!Array.isArray(body)) return [];
  if (body.length === 0) return [];
  const first = body[0];
  if (typeof first === "string") return [];
  const blocks = body as SeededPostParagraph[] | PortableTextBlock[];
  if (isSeededParagraphArray(blocks)) {
    return blocks
      .filter((b) => b.type === "h2" && b.text)
      .map((b) => ({ id: slugifyHeading(b.text!), text: b.text! }));
  }
  return (blocks as PortableTextBlock[])
    .filter((b) => b.style === "h2")
    .map((b) => {
      const text = flattenPortableTextBlock(b);
      return { id: slugifyHeading(text), text };
    });
}
