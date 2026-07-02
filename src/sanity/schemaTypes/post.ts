import { defineField, defineType } from "sanity";

/**
 * Post — Blog article document type.
 *
 * Drives the /blog index and /blog/[slug] dynamic route. The site falls
 * back to seededPosts.ts when SANITY_PROJECT_ID is blank (Pattern #25
 * demo-mode fallback), so this schema mirrors the seeded post shape:
 * title, slug, publishedAt, author ref, categories ref array,
 * mainImage (with alt + caption), excerpt, body block content, seo
 * object, isFeatured flag.
 *
 * Source: design-system.md Sections Matrix row "Blog (Sanity CMS): Yes
 * (always)" + market-intelligence.md Section 6 AEO content gaps.
 */
export const post = defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: "Buyer question that doubles as the H1 (AEO target).",
      validation: (rule) => rule.required().min(8).max(160),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      validation: (rule) => rule.required(),
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
    }),
    defineField({
      name: "mainImage",
      title: "Main image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          description: "Required for accessibility and AEO surface previews.",
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: "caption",
          title: "Caption",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description: "200-character summary used on the blog index card and OG preview.",
      validation: (rule) => rule.max(200).required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "blockContent",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        defineField({ name: "metaTitle", title: "Meta title", type: "string" }),
        defineField({
          name: "metaDescription",
          title: "Meta description",
          type: "text",
          rows: 3,
        }),
        defineField({
          name: "keywords",
          title: "Keywords",
          type: "array",
          of: [{ type: "string" }],
          options: { layout: "tags" },
        }),
      ],
    }),
    defineField({
      name: "isFeatured",
      title: "Featured",
      type: "boolean",
      description: "Surfaces this post in the featured slot on /blog and the homepage.",
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: "Published date, newest",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", media: "mainImage", date: "publishedAt" },
    prepare({ title, media, date }) {
      const subtitle = date ? new Date(date).toLocaleDateString() : "Unpublished";
      return { title, media, subtitle };
    },
  },
});
