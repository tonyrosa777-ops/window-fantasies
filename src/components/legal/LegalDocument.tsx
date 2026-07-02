import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Card";
import { FadeUp } from "@/components/animations/FadeUp";
import type { LegalDoc } from "@/data/site";

/**
 * LegalDocument — shared renderer for /privacy and /terms.
 *
 * Long-form legal text: per the Homepage Section Architecture Rule
 * (Background depth & motion), legal pages take the static-gradient
 * exception. Header Section gets the shimmer H1 + FadeUp; the body Section
 * is a calm, readable single column (max-w-prose) with no motion behind
 * the copy. Headings carry scroll-mt for deep-link anchors.
 *
 * BINDING (CLAUDE.md §13): ZERO em dashes in any string literal.
 */

interface Props {
  doc: LegalDoc;
}

export function LegalDocument({ doc }: Props) {
  let firstH2Rendered = false;

  return (
    <>
      {/* Header */}
      <Section tone="base" className="pt-32 sm:pt-36 lg:pt-40">
        <Container size="narrow">
          <FadeUp>
            <Eyebrow>Legal</Eyebrow>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h1 className="text-h1 hero-shimmer font-display mt-4">{doc.title}</h1>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p
              className="mt-5 font-body"
              style={{
                color: "var(--text-secondary)",
                fontSize: "1.0625rem",
                lineHeight: 1.65,
                maxWidth: "60ch",
              }}
            >
              {doc.summary}
            </p>
          </FadeUp>
          <FadeUp delay={0.3}>
            <p
              className="mt-5 font-mono text-xs uppercase tracking-widest"
              style={{ color: "var(--text-muted)" }}
            >
              Last updated {doc.lastUpdated}
            </p>
          </FadeUp>
        </Container>
      </Section>

      {/* Body */}
      <Section tone="elevated">
        <Container size="narrow">
          <div className="max-w-prose">
            {doc.blocks.map((block, i) => {
              const key = `legal-block-${i}`;

              if (block.kind === "h2") {
                const isFirst = !firstH2Rendered;
                firstH2Rendered = true;
                const text = block.content as string;
                return (
                  <h2
                    key={key}
                    id={slugify(text)}
                    className={`font-display text-h3 scroll-mt-28 mb-4 ${isFirst ? "" : "mt-12"}`}
                    style={{
                      color: "var(--text-primary)",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {text}
                  </h2>
                );
              }

              if (block.kind === "ul") {
                return (
                  <ul
                    key={key}
                    className="mb-6 space-y-2 list-disc pl-6 font-body"
                    style={{
                      color: "var(--text-secondary)",
                      fontSize: "1.0625rem",
                      lineHeight: 1.6,
                    }}
                  >
                    {(block.content as string[]).map((item, j) => (
                      <li key={j}>{item}</li>
                    ))}
                  </ul>
                );
              }

              return (
                <p
                  key={key}
                  className="mb-5 font-body"
                  style={{
                    color: "var(--text-secondary)",
                    fontSize: "1.0625rem",
                    lineHeight: 1.75,
                  }}
                >
                  {block.content as string}
                </p>
              );
            })}
          </div>
        </Container>
      </Section>
    </>
  );
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}
