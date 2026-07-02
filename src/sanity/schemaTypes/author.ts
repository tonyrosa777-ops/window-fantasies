import { defineField, defineType } from "sanity";

/**
 * Author — Person who writes a post.
 *
 * Owner-named, owner-present voice (design-system.md §9). Jim Garrity is the
 * seeded default author; credentials drive the "30+ years, Hunter Douglas
 * Centurion dealer" trust signal on each article footer.
 */
export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "blockContent",
    }),
    defineField({
      name: "credentials",
      title: "Credentials",
      type: "array",
      of: [{ type: "string" }],
      description: "Short, quantified facts (years, named clients, capabilities).",
    }),
  ],
  preview: {
    select: { title: "name", media: "image" },
  },
});
