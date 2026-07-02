import { defineQuery } from "next-sanity";

/**
 * GROQ queries — each typed via defineQuery so next-sanity can derive a
 * static type. The /blog index uses ALL_POSTS_QUERY; /blog/[slug] uses
 * POST_BY_SLUG_QUERY; the homepage uses FEATURED_POSTS_QUERY for its
 * "Latest from the workshop" teaser; category chips on /blog filter via
 * POSTS_BY_CATEGORY_QUERY.
 */

export const ALL_POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    isFeatured,
    "categoryName": categories[0]->title,
    "categoryColor": categories[0]->color,
    "categorySlug": categories[0]->slug.current,
    "mainImageAlt": mainImage.alt,
    mainImage,
    "authorName": author->name
  }
`);

export const POST_BY_SLUG_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    body,
    isFeatured,
    "categoryName": categories[0]->title,
    "categoryColor": categories[0]->color,
    "categorySlug": categories[0]->slug.current,
    mainImage,
    "mainImageAlt": mainImage.alt,
    "authorName": author->name,
    "authorBio": author->bio,
    "authorCredentials": author->credentials,
    "authorImage": author->image,
    seo
  }
`);

export const FEATURED_POSTS_QUERY = defineQuery(`
  *[_type == "post" && isFeatured == true && defined(slug.current)]
    | order(publishedAt desc) [0...3] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    "categoryName": categories[0]->title
  }
`);

export const POSTS_BY_CATEGORY_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)
    && $categorySlug in categories[]->slug.current]
    | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    isFeatured,
    "categoryName": categories[0]->title,
    "categoryColor": categories[0]->color,
    "categorySlug": categories[0]->slug.current,
    "mainImageAlt": mainImage.alt
  }
`);

export const ALL_CATEGORIES_QUERY = defineQuery(`
  *[_type == "category"] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    color
  }
`);

export const ALL_POST_SLUGS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current)][].slug.current
`);
