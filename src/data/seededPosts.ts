/**
 * seededPosts.ts: starter articles for /blog.
 *
 * Pattern #25 demo-mode fallback: when SANITY_PROJECT_ID is blank, the blog
 * routes render from this array instead of hitting Sanity. Each post is
 * answer-first (AEO), written in Jim Garrity's voice for Window Fantasies.
 *
 * BINDING (CLAUDE.md §13): ZERO em dashes in any string literal.
 *
 * Voice rules:
 *  - Every title is a specific buyer question (AEO target).
 *  - First paragraph is a direct answer to that question (citation bait).
 *  - Educate, do not sell. Jim writes in first person.
 *  - Header image path is /images/blog/{slug}-header.jpg.
 */

export interface SeededPostParagraph {
  type: "p" | "h2" | "h3" | "ul" | "ol";
  text?: string;
  items?: string[];
}

export interface SeededPost {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  authorName: string;
  categoryName: string;
  categoryColor: "gold" | "sage" | "cream";
  categorySlug: string;
  isFeatured: boolean;
  mainImageAlt: string;
  readingTimeMinutes: number;
  body: SeededPostParagraph[];
}

export const seededPosts: SeededPost[] = [
  {
    slug: "hunter-douglas-cost-new-hampshire",
    title: "How much do Hunter Douglas window treatments cost in New England?",
    excerpt:
      "Hunter Douglas is a premium, fully custom product, so pricing depends on the window and the product. A single high-end shade can run around $1,600, and the free in-home consultation is where you get a real installed price.",
    publishedAt: "2026-06-20T13:00:00.000Z",
    authorName: "Jim Garrity",
    categoryName: "Buying Guide",
    categoryColor: "gold",
    categorySlug: "buying-guide",
    isFeatured: true,
    mainImageAlt:
      "A premium New England living room with Hunter Douglas Silhouette sheer shades softening the daylight.",
    readingTimeMinutes: 6,
    body: [
      {
        type: "p",
        text: "Hunter Douglas window treatments are premium and fully custom, so the price depends on the size of the window, the product you choose, and the options like blackout or motorization. As a sense of scale, a single high-end shade can run around $1,600, and many homes have far more than one window. The honest number for your home comes from a free in-home consultation, where I measure your actual windows and give you an installed price at your kitchen table.",
      },
      {
        type: "p",
        text: "I am Jim Garrity. I have spent more than thirty years in window fashions, and I hold Hunter Douglas's top Centurion dealer tier. Let me tell you the truth about cost, because a lot of people feel a little sticker shock at first, and I would rather you hear it straight from me.",
      },
      { type: "h2", text: "Why it costs what it costs" },
      {
        type: "p",
        text: "Hunter Douglas is the Mercedes-Benz for your window. It is not a big-box product cut down to fit. Every treatment is fabricated for your exact opening, built to last, and guaranteed for life. You are paying for the engineering, the fabrics, and the fact that it will still look and work beautifully years from now.",
      },
      { type: "h2", text: "What drives the price" },
      {
        type: "ul",
        items: [
          "The product line. Sheers like Silhouette and Luminette sit at the premium end. Cellular and roller shades are more approachable.",
          "The size and number of windows. Wide and tall openings and whole-home packages cost more.",
          "Options like true blackout, top-down bottom-up, and PowerView motorization.",
          "Fabric and material choices, from woven woods to custom drapery.",
        ],
      },
      { type: "h2", text: "Why the consultation is free" },
      {
        type: "p",
        text: "You should not have to guess. The in-home consultation costs you nothing and carries no obligation. I bring the real Hunter Douglas samples to your home, hold them in your own windows, and show you how they look in your light. Then I measure and give you a real installed price that already includes taking down and hauling away your old treatments.",
      },
      {
        type: "p",
        text: "And here is my promise: I sell you what you deserve, not what I want to move. If a simpler product fits your room and your budget better, I will tell you. Whether you live in a double-wide or a Boston tower, you get the same me. To get your real number, request a free consultation or call me at (603) 891-5755.",
      },
    ],
  },

  {
    slug: "are-motorized-shades-worth-it",
    title: "Are motorized shades worth it, and can I control them from my phone?",
    excerpt:
      "Yes. Hunter Douglas PowerView lets you control your shades from your phone, your voice, or a schedule, even from out of state. It is ideal for hard-to-reach windows and for cutting glare and UV automatically.",
    publishedAt: "2026-06-12T14:00:00.000Z",
    authorName: "Jim Garrity",
    categoryName: "Smart Home",
    categoryColor: "sage",
    categorySlug: "smart-home",
    isFeatured: false,
    mainImageAlt:
      "Airy Hunter Douglas Luminette sheer vertical shades with an ocean view, controlled by PowerView motorization.",
    readingTimeMinutes: 5,
    body: [
      {
        type: "p",
        text: "Yes, motorized shades are worth it for most people, and yes, you can control them from your phone. Hunter Douglas PowerView motorization lets you raise and lower your shades from an app, by voice, or on an automatic schedule, and you can even adjust them from out of state. I have snowbirds who run their New England shades from a beach in Florida.",
      },
      { type: "h2", text: "What PowerView actually does" },
      {
        type: "ul",
        items: [
          "Control from your phone, your voice, or a simple wall remote.",
          "Set schedules so shades open in the morning and close at sunset on their own.",
          "Adjust from anywhere, so the house looks lived in even when you travel.",
          "Reach the high windows and stairwell openings you could never reach by hand.",
        ],
      },
      { type: "h2", text: "Sunglasses for your windows" },
      {
        type: "p",
        text: "I like to call solar and sheer shades sunglasses for your windows. They cut glare and block UV so your floors and furniture do not fade, while you still see out. With PowerView, that protection happens automatically as the sun moves, without you lifting a finger.",
      },
      { type: "h2", text: "Is it hard to use?" },
      {
        type: "p",
        text: "No. I set it all up during the install, connect it to your home, and teach you how to use it before I leave. If you ever have a question, you call me and I answer. That is the whole idea. To see it in your own home, request a free consultation or call me at (603) 891-5755.",
      },
    ],
  },

  {
    slug: "hunter-douglas-blind-repair-new-england",
    title: "Can you repair a Hunter Douglas blind, even if I did not buy it from you?",
    excerpt:
      "Yes. Hunter Douglas products are guaranteed for life, so the repair itself is free under warranty, even on treatments bought elsewhere. Jim can pick up, deliver to the authorized service center, and reinstall for a flat service fee.",
    publishedAt: "2026-06-04T14:00:00.000Z",
    authorName: "Jim Garrity",
    categoryName: "Service and Repair",
    categoryColor: "cream",
    categorySlug: "service-and-repair",
    isFeatured: false,
    mainImageAlt:
      "Warm wood blinds installed over a fireplace, the kind of Hunter Douglas product Jim services and repairs.",
    readingTimeMinutes: 4,
    body: [
      {
        type: "p",
        text: "Yes, I can repair a Hunter Douglas blind, even if you did not buy it from me or the shop you bought it from has closed. Because Hunter Douglas products are guaranteed for life, the repair itself is free under the warranty. You have two ways to get it done, and I will tell you both straight up.",
      },
      { type: "h2", text: "Option one: drop it off yourself, free" },
      {
        type: "p",
        text: "The authorized service center is Goedecke Design in Bedford, New Hampshire. I call it the hospital for your blind. You can drive your treatment up there yourself, and the warranty repair costs you nothing but the gas.",
      },
      { type: "h2", text: "Option two: I handle the whole thing" },
      {
        type: "p",
        text: "If you would rather not deal with it, I will take the blind down, drive it up to the service center, bring it back, and reinstall it. There is a flat service fee for that pickup and reinstall, and I tell you the number before anything happens. No surprises. Be upfront, that is how I do everything.",
      },
      { type: "h2", text: "A shade you love should not go in the trash" },
      {
        type: "p",
        text: "A broken cord or a tired mechanism does not mean the end. Tell me what broke and I will tell you the honest path forward, repair or replace. To get help with a repair, request a consultation or call me at (603) 891-5755.",
      },
    ],
  },
];
