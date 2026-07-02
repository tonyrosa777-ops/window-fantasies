/**
 * JsonLd.tsx — Reusable JSON-LD script tag wrapper.
 *
 * Usage:
 *   import { JsonLd } from "@/components/JsonLd";
 *   import { buildHomepageSchema } from "@/lib/schema";
 *
 *   <JsonLd data={buildHomepageSchema()} />
 *
 * Renders a single <script type="application/ld+json"> with the supplied
 * graph stringified. The dangerouslySetInnerHTML pattern is the standard
 * Next.js approach for JSON-LD on server components.
 */

interface JsonLdProps {
  data: unknown;
  id?: string;
}

export function JsonLd({ data, id }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      id={id}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
