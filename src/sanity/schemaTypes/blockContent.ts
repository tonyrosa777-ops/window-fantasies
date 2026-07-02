import { defineArrayMember, defineType } from "sanity";

/**
 * blockContent — Portable Text rich body schema.
 *
 * Standard Sanity block content with code blocks, images, quotes, and
 * external/internal links. Used by post.body and author.bio.
 *
 * Annotation set is intentionally narrow: link only. Lists, blockquotes,
 * and code spans cover the AEO long-form needs without bloating Studio.
 */
export const blockContent = defineType({
  name: "blockContent",
  title: "Block content",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Number", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
          { title: "Code", value: "code" },
        ],
        annotations: [
          {
            name: "link",
            type: "object",
            title: "Link",
            fields: [
              {
                name: "href",
                type: "url",
                title: "URL",
                validation: (rule) =>
                  rule.uri({ scheme: ["http", "https", "mailto", "tel"] }),
              },
              {
                name: "blank",
                type: "boolean",
                title: "Open in new tab",
                initialValue: false,
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alt text",
          validation: (rule) => rule.required(),
        },
        { name: "caption", type: "string", title: "Caption" },
      ],
    }),
    defineArrayMember({
      type: "object",
      name: "code",
      title: "Code block",
      fields: [
        { name: "language", type: "string", title: "Language" },
        { name: "code", type: "text", title: "Code", rows: 12 },
      ],
    }),
  ],
});
