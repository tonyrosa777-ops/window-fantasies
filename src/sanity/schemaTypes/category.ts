import { defineField, defineType } from "sanity";

/**
 * Category — Blog taxonomy. Surfaces as filter chips on /blog
 * (server-side via URL params). Color drives the chip tint per
 * design-system.md §2 palette tokens (gold, sage, cream).
 */
export const category = defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "color",
      title: "Color",
      type: "string",
      description: "Token name for the chip tint. One of: gold, sage, cream.",
      options: {
        list: [
          { title: "Brass gold (primary)", value: "gold" },
          { title: "New-England sage (accent)", value: "sage" },
          { title: "Bone cream (neutral)", value: "cream" },
        ],
      },
      initialValue: "gold",
    }),
  ],
});
