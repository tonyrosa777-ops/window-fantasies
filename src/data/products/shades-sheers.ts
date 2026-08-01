/**
 * shades-sheers.ts. Product copy for the eight Hunter Douglas SHADES lines
 * Window Fantasies sells: the sheers and shadings, the cellular honeycomb
 * shades, and the modern Roman shade.
 *
 * ⚠️ HUNTER DOUGLAS COMPLIANCE. Every product claim in this file traces to
 * Hunter Douglas's own product pages (crawled to research/crawl/hunter-douglas/)
 * or to hunter-douglas-products.md. HD's advertising policy requires dealer
 * claims to correlate with HD's own product claims and bars unsubstantiated
 * ones, so nothing here is inferred, rounded, or embellished. If HD does not
 * say it, this file does not say it either.
 *
 * Trademark forms are NOT typed by hand. `name`, `shortName` and `credit` all
 * come from src/data/hunterDouglas.ts via hdMark / hdMarkShort / hdPhotoCredit,
 * so a symbol can never drift out of sync with HD's trademark list. Prose
 * carries the marks inline and is checked by `npm run check:hd`.
 *
 * Two rules that bite in prose, restated because they are easy to break:
 *   - The mark needs its category descriptor on first instance in every
 *     paragraph. "Silhouette® Window Shadings", never bare "Silhouette".
 *   - A mark is never a generic category. "Silhouette sheers", "Duette
 *     honeycomb" and "Vignette Roman shades" are all violations.
 *
 * NO PRICING. HD bars dealer sites from publishing product prices. Every line
 * closes on the free in-home consultation instead.
 *
 * Photo paths come verbatim from assets/hunter-douglas-brite/product-lines.json
 * and the files already exist under web/public/images/product-lines/.
 *
 * Zero em dashes in any string literal (CLAUDE.md absolute rule).
 */

import {
  hdMark,
  hdMarkShort,
  hdPhotoCredit,
  POWERVIEW_APP_DISCLOSURE,
} from "@/data/hunterDouglas";

export type HDProductLine = {
  slug: string;
  /** Full trademarked name, first-instance form. */
  name: string;
  /** Short form for breadcrumbs/cards, e.g. "Silhouette®". */
  shortName: string;
  /** One of: "shades" | "blinds" | "shutters" | "motorization" */
  siteCategory: string;
  /** HD's own category, e.g. "Sheers & Shadings". */
  hdCategory: string;
  /** One sentence, what it is. Used as the card blurb + meta description base. */
  tagline: string;
  /** 2-3 short paragraphs in Jim's voice. What it is, who it suits, why he installs it. */
  body: string[];
  /** 4-6 concrete features, each traceable to HD's own copy. */
  features: string[];
  /** 2-3 Q&A. Real buyer questions. Answers must be substantiated. */
  faq: { q: string; a: string }[];
  /** Photos, from product-lines.json. First is the page hero. */
  photos: { src: string; alt: string; credit: string }[];
};

export const SHADES_SHEERS: HDProductLine[] = [
  /* ───────────────────────── Sheers & Shadings ───────────────────────── */

  {
    slug: "silhouette-window-shadings",
    name: hdMark("silhouette"),
    shortName: hdMarkShort("silhouette"),
    siteCategory: "shades",
    hdCategory: "Sheers & Shadings",
    tagline:
      "Silhouette® Window Shadings float S-shaped fabric vanes between two sheers, for diffused daylight and daytime privacy in the same window.",
    body: [
      "Silhouette® Window Shadings are the shade most people picture when they picture Hunter Douglas. Two sheer facings, with S-shaped fabric vanes floating in between. Tilt the vanes open and you get a view out with the light spread across the whole room. Tilt them closed and the room goes private without going dark.",
      "I hang these in living rooms and front-facing bedrooms more than anything else. The sheers cut the UV that fades furniture and flooring, and the vanes come in 2 inch, 3 inch, and 4 inch, so the scale can match the window instead of fighting it. There are more than 150 fabric and color choices, which sounds like plenty until you are standing in your own room at four in the afternoon. That is why I bring the samples to you and hold them in the opening.",
      "Silhouette® Window Shadings are available with PowerView® Automation, and also run on the UltraGlide® retractable wand, the cordless LiteRise® push and pull system, the EasyRise™ cord loop, or SoftTouch® Motorization. If you want one window filtering light by day and darkening at night, the Duolite® system puts two fabrics on a single headrail. Every shade is built to your exact opening and carries the Hunter Douglas Limited Lifetime Warranty, subject to the manufacturer's warranty terms.",
      POWERVIEW_APP_DISCLOSURE,
    ],
    features: [
      "S-shaped fabric vanes suspended between two sheers, for diffused light and a daytime view out",
      "Daytime privacy and light control, by tilting the fabric vanes",
      "UV protection that helps keep furniture and flooring from fading",
      "Vane sizes in 2 inch, 3 inch, and 4 inch",
      "More than 150 fabric and color choices, with ClearView® sheers for superior view-through",
      "Light control and room darkening in one window, with the Duolite® system",
    ],
    faq: [
      {
        q: "Will these give me privacy at night?",
        a: "Hunter Douglas calls it daytime privacy, and that is the honest answer. With the vanes closed you have privacy through the day. After dark, with the lamps on inside, a sheer still behaves like a sheer. If you want that same window dark at night, the Duolite® system pairs the sheer with a room-darkening fabric on one headrail. I will show you both in your own window before you decide.",
      },
      {
        q: "Which vane size should I pick?",
        a: "Silhouette® Window Shadings come in 2 inch, 3 inch, and 4 inch vanes. Taller windows generally carry the larger vane better, and a small bath or kitchen window usually wants the 2 inch. This is one of the reasons I measure in person. I hold the samples in the opening so you can see the scale against your own trim before anything gets ordered.",
      },
      {
        q: "Can they go on an arched or angled window?",
        a: "Yes. Hunter Douglas builds Silhouette® Window Shadings for arches, angles, trapezoids, circles and ovals, bay and corner windows, patio and sliding-glass doors, French doors, and sidelights. Specialty shapes are where measuring matters most, so I take those numbers myself.",
      },
    ],
    photos: [
      {
        src: "/images/product-lines/silhouette-window-shadings/silhouette-window-shadings-sil-lb-03-full-27651.webp",
        alt: "Hunter Douglas Silhouette® Window Shadings running the length of a corner window wall in a living room, vanes open to a hillside view.",
        credit: hdPhotoCredit("silhouette"),
      },
      {
        src: "/images/product-lines/silhouette-window-shadings/silhouette-window-shadings--04-lum-hard-stack-var-25643.webp",
        alt: "Hunter Douglas Silhouette® Window Shadings across the windows of an open living room, with Hunter Douglas Luminette® Privacy Sheers drawn over the glass door.",
        credit: hdPhotoCredit("silhouette"),
      },
      {
        src: "/images/product-lines/silhouette-window-shadings/silhouette-window-shadings-sil-lb-05-full-27081.webp",
        alt: "Hunter Douglas Silhouette® Window Shadings in soft grey lowered across a wide living room window, one shade partly raised.",
        credit: hdPhotoCredit("silhouette"),
      },
      {
        src: "/images/product-lines/silhouette-window-shadings/silhouette-window-shadings-sil-lb-06-close-26123.webp",
        alt: "Close view of Hunter Douglas Silhouette® Window Shadings, the S-shaped vanes tilted open to a treed view beyond the glass.",
        credit: hdPhotoCredit("silhouette"),
      },
      {
        src: "/images/product-lines/silhouette-window-shadings/silhouette-window-shadings-sil-lb-06-full-26071.webp",
        alt: "Hunter Douglas Silhouette® Window Shadings filling a window wall behind the island of an open kitchen and sitting area.",
        credit: hdPhotoCredit("silhouette"),
      },
    ],
  },

  {
    slug: "pirouette-window-shadings",
    name: hdMark("pirouette"),
    shortName: hdMarkShort("pirouette"),
    siteCategory: "shades",
    hdCategory: "Sheers & Shadings",
    tagline:
      "Pirouette® Window Shadings drape softly contoured fabric vanes over a single back sheer, so the shape of the light changes as the shade moves.",
    body: [
      "Pirouette® Window Shadings are the sculptural one in the Hunter Douglas sheer lineup. Contoured fabric vanes ride over a single sheer at the back. Lower the shade and the vanes open into soft horizontal folds. Raise it and they flatten against the sheer. The shade changes shape while you are looking at it, which is a hard thing to describe and an easy thing to show.",
      "The vane is a single 5 inch, so it reads as fabric rather than as a blind. That suits a formal living room, a dining room, an entry people can see from the street. The back sheer keeps a soft view out and buffers the UV that fades a rug. There are more than 90 fabric and color choices, and The Alustra® Collection adds an exclusive group on top of that.",
      "Pirouette® Window Shadings are available with PowerView® Automation, and also run on the UltraGlide® retractable wand, the EasyRise™ cord loop, or SoftTouch® Motorization. When a room has to go dark, Hunter Douglas offers a design that combines a sheer shade and a room-darkening roller fabric in a single headrail. Every shade is built to your exact opening and carries the Hunter Douglas Limited Lifetime Warranty, subject to the manufacturer's warranty terms.",
      POWERVIEW_APP_DISCLOSURE,
    ],
    features: [
      "Softly contoured fabric vanes over a single back sheer, for light control and privacy",
      "A single 5 inch vane size",
      "UV protection that helps keep furniture and flooring from fading",
      "More than 90 fabric and color choices",
      "Superior view-through with ClearView® sheers",
      "Exclusive fabrics from The Alustra® Collection",
    ],
    faq: [
      {
        q: "How is this different from Silhouette® Window Shadings?",
        a: "Both are Hunter Douglas sheers, and they solve the same problem two different ways. Silhouette® Window Shadings float S-shaped vanes between two sheers, in 2 inch, 3 inch, and 4 inch. Pirouette® Window Shadings lay contoured fabric vanes over a single sheer at the back, in one 5 inch vane. Pirouette® reads more like fabric, Silhouette® reads more like light. I bring both to the consultation and hold them in the same window.",
      },
      {
        q: "Can I still see out?",
        a: "Yes, through the back sheer. With the vanes open you get a soft, filtered view, and ClearView® sheers are the option when the view is the reason you bought the house. A sheer filters light rather than stopping it, so if a room has to go dark I will show you the two-fabric option instead.",
      },
      {
        q: "Will they fit my windows?",
        a: "Hunter Douglas builds Pirouette® Window Shadings for arches, angles, trapezoids, circles and ovals, bay and corner windows, patio and sliding-glass doors, and French doors. Odd openings are the ones people assume they cannot cover. Usually they can, and I will tell you at the measure.",
      },
    ],
    photos: [
      {
        src: "/images/product-lines/pirouette-window-shadings/pirouette-window-shadings-2020-pir-lum-stria-kitchen.webp",
        alt: "Hunter Douglas Pirouette® Window Shadings softening daylight over a kitchen window.",
        credit: hdPhotoCredit("pirouette"),
      },
      {
        src: "/images/product-lines/pirouette-window-shadings/pirouette-window-shadings--and-after-living-room-after.webp",
        alt: "Hunter Douglas Pirouette® Window Shadings lowered across a living room window, the vanes open to filtered afternoon light.",
        credit: hdPhotoCredit("pirouette"),
      },
      {
        src: "/images/product-lines/pirouette-window-shadings/pirouette-window-shadings-in-entry-closed-dualcharging.webp",
        alt: "Hunter Douglas Pirouette® Window Shadings closed across an entryway window for privacy at the front of the house.",
        credit: hdPhotoCredit("pirouette"),
      },
      {
        src: "/images/product-lines/pirouette-window-shadings/pirouette-window-shadings-2020-pir-pv-satin-entry-open.webp",
        alt: "Hunter Douglas Pirouette® Window Shadings with the vanes open in a bright entryway.",
        credit: hdPhotoCredit("pirouette"),
      },
      {
        src: "/images/product-lines/pirouette-window-shadings/pirouette-window-shadings-nursery-medium-detail-closed.webp",
        alt: "Close view of Hunter Douglas Pirouette® Window Shadings closed in a nursery, showing the contoured fabric vanes.",
        credit: hdPhotoCredit("pirouette"),
      },
    ],
  },

  {
    slug: "luminette-privacy-sheers",
    name: hdMark("luminette"),
    shortName: hdMarkShort("luminette"),
    siteCategory: "shades",
    hdCategory: "Sheers & Shadings",
    tagline:
      "Luminette® Privacy Sheers hang like drapery across a slider or a wide window, with rotating fabric vanes built into one light-diffusing sheer.",
    body: [
      "Luminette® Privacy Sheers are the Hunter Douglas answer for a sliding door or a window wall. One light-diffusing sheer panel with vertical fabric vanes integrated behind it, so it hangs and traverses like drapery and rotates like a blind. Draw it open and the whole opening clears. Close it, rotate the vanes, and you set the light and the privacy without giving up the glow.",
      "This is what I hang on the back slider everybody complains about. The 3 1/2 inch vanes rotate to control light and privacy, and the sheer puts a buffer between your interior and the sun. There are more than 80 fabric and color choices, plus The Alustra® Collection. Luminette® Privacy Sheers were also chosen as the 2022 Product of the Year by the Window Covering Manufacturers Association.",
      "Luminette® Privacy Sheers are available with PowerView® Automation, and also run on a combination wand and cord or a traveling wand. Hunter Douglas builds them for patio and sliding-glass doors, French doors, and the sidelights beside an entry. Every panel is made to your exact opening and carries the Hunter Douglas Limited Lifetime Warranty, subject to the manufacturer's warranty terms.",
      POWERVIEW_APP_DISCLOSURE,
    ],
    features: [
      "One light-diffusing sheer panel with fully integrated vertical fabric vanes",
      "Light control and privacy from rotating fabric vanes",
      "3 1/2 inch vane size",
      "UV protection that puts a buffer between your interior and the sun",
      "More than 80 fabric and color choices, plus exclusive fabrics from The Alustra® Collection",
      "Built for patio and sliding-glass doors, French doors, and sidelights",
    ],
    faq: [
      {
        q: "What is the right treatment for a sliding glass door?",
        a: "Luminette® Privacy Sheers are what I reach for most on a slider. The panel traverses to one side so the door still works like a door, and the vanes rotate for light and privacy instead of blacking the opening out. Hunter Douglas also builds them for French doors and for the sidelights beside an entry.",
      },
      {
        q: "Do the vanes really give privacy?",
        a: "The vanes rotate, so you set how open they sit. Closed, you get privacy and a soft glow rather than a dark panel across the room. This is a sheer, so it controls light rather than eliminating it. If a room needs true darkness I will say so at the consultation and show you a product that does it.",
      },
      {
        q: "Can a panel that wide be motorized?",
        a: "Yes. Luminette® Privacy Sheers are available with PowerView® Automation, controlled by app, remote, or a smart-home system. The manual options are a combination wand and cord or a traveling wand. On a door I usually put both in your hand before we decide, because how a treatment feels to operate every day matters more than how it sounds on paper.",
      },
    ],
    photos: [
      {
        src: "/images/product-lines/luminette-privacy-sheers/luminette-privacy-sheers-2020-lum-orginale-pv-detail.webp",
        alt: "Close view of Hunter Douglas Luminette® Privacy Sheers, the vertical fabric vanes rotated to soften afternoon sun at a glass wall.",
        credit: hdPhotoCredit("luminette"),
      },
      {
        src: "/images/product-lines/luminette-privacy-sheers/luminette-privacy-sheers--lum-orginale-whs-pv-kitchen.webp",
        alt: "Hunter Douglas Luminette® Privacy Sheers drawn across a wide kitchen window.",
        credit: hdPhotoCredit("luminette"),
      },
      {
        src: "/images/product-lines/luminette-privacy-sheers/luminette-privacy-sheers--lum-stria-pv-living-room-02.webp",
        alt: "Hunter Douglas Luminette® Privacy Sheers hanging like drapery along a living room window wall.",
        credit: hdPhotoCredit("luminette"),
      },
      {
        src: "/images/product-lines/luminette-privacy-sheers/luminette-privacy-sheers-tria-pv-living-room-extended.webp",
        alt: "Hunter Douglas Luminette® Privacy Sheers traversed fully closed across a living room slider.",
        credit: hdPhotoCredit("luminette"),
      },
      {
        src: "/images/product-lines/luminette-privacy-sheers/luminette-privacy-sheers-s-stria-pv-living-room-bench.webp",
        alt: "Hunter Douglas Luminette® Privacy Sheers glowing behind a window bench in a living room.",
        credit: hdPhotoCredit("luminette"),
      },
    ],
  },

  {
    slug: "nantucket-window-shadings",
    name: hdMark("nantucket"),
    shortName: hdMarkShort("nantucket"),
    siteCategory: "shades",
    hdCategory: "Sheers & Shadings",
    tagline:
      "Nantucket™ Window Shadings set S-shaped vanes in casual fabrics between two sheers, for the warm, diffused light of an easygoing room.",
    body: [
      "Nantucket™ Window Shadings are the relaxed member of the Hunter Douglas sheer family. Same working idea as the dressier sheers, S-shaped vanes paired between two sheers, but the fabrics are casual and the vane is a single 3 inch. The light comes through warm rather than crisp.",
      "I put these in the rooms people actually live in. A den, a kids' room, a lake house, a New England cape where the furniture is comfortable and a formal treatment would look out of place. Tilt the vanes to trade view for privacy. The sheers cut the UV that fades a couch and a hardwood floor.",
      "Nantucket™ Window Shadings are available with PowerView® Automation, and also run on the UltraGlide® retractable wand, the cordless LiteRise® push and pull system, the EasyRise™ cord loop, or SoftTouch® Motorization. Hunter Douglas builds them for arches, angles, bay and corner windows, patio and sliding-glass doors, and French doors, and they carry the Hunter Douglas Limited Lifetime Warranty, subject to the manufacturer's warranty terms.",
      POWERVIEW_APP_DISCLOSURE,
    ],
    features: [
      "S-shaped fabric vanes paired between two sheers, in casual fabrics",
      "Privacy and light control, by tilting the fabric vanes",
      "UV protection that helps keep furniture and flooring from fading",
      "A single 3 inch vane size",
      "An optional design that adds a room-darkening fabric, for light control and room darkening in one window",
      "Cordless, corded, and motorized operation, including the LiteRise® system and PowerView® Automation",
    ],
    faq: [
      {
        q: "How is this different from the other Hunter Douglas sheers?",
        a: "Same idea, different register. Nantucket™ Window Shadings use casual fabrics and one vane size, 3 inch. Silhouette® Window Shadings run 2 inch, 3 inch, and 4 inch vanes with a much wider fabric selection. If the room is dressy, we usually land on Silhouette® Window Shadings. If the room is easygoing, Nantucket™ Window Shadings tend to look more at home in it.",
      },
      {
        q: "Can I get a room dark with these?",
        a: "This is a sheer, so on its own it softens light rather than stopping it. Hunter Douglas offers an optional design that adds a room-darkening fabric so one window does both. In a bedroom I will usually show you that, or point you toward a honeycomb shade, and let you make the call standing in the room.",
      },
      {
        q: "Will they work on a slider or a bay window?",
        a: "Yes. Hunter Douglas builds Nantucket™ Window Shadings for patio and sliding-glass doors, French doors, bay and corner windows, arches, and angles. A bay is three or more separate measurements, not one, which is exactly why I take them myself.",
      },
    ],
    photos: [
      {
        src: "/images/product-lines/nantucket-window-shadings/nantucket-window-shadings--nan-boardwalk-ug-livingroom.webp",
        alt: "Hunter Douglas Nantucket™ Window Shadings filtering daylight across a living room window.",
        credit: hdPhotoCredit("nantucket"),
      },
      {
        src: "/images/product-lines/nantucket-window-shadings/nantucket-window-shadings-n-brant-point-lr-dining-room.webp",
        alt: "Hunter Douglas Nantucket™ Window Shadings lowered in a dining room, the vanes tilted open to warm the light over the table.",
        credit: hdPhotoCredit("nantucket"),
      },
      {
        src: "/images/product-lines/nantucket-window-shadings/nantucket-window-shadings-nan-centre-ug-living-room-02.webp",
        alt: "Hunter Douglas Nantucket™ Window Shadings in a living room, the S-shaped vanes catching late-day sun.",
        credit: hdPhotoCredit("nantucket"),
      },
      {
        src: "/images/product-lines/nantucket-window-shadings/nantucket-window-shadings--front-street-st-dining-room.webp",
        alt: "Hunter Douglas Nantucket™ Window Shadings across a dining room window in a casual woven fabric.",
        credit: hdPhotoCredit("nantucket"),
      },
      {
        src: "/images/product-lines/nantucket-window-shadings/nantucket-window-shadings--nan-misty-harbor-st-bedroom.webp",
        alt: "Hunter Douglas Nantucket™ Window Shadings closed for privacy in a quiet bedroom.",
        credit: hdPhotoCredit("nantucket"),
      },
    ],
  },

  /* ─────────────────── Cellular Honeycomb Shades ─────────────────── */

  {
    slug: "duette-honeycomb-shades",
    name: hdMark("duette"),
    shortName: hdMarkShort("duette"),
    siteCategory: "shades",
    hdCategory: "Cellular Honeycomb Shades",
    tagline:
      "Duette® Honeycomb Shades hold a pocket of air against the glass in an insulating cellular design, so the house stays snug in the cold and cool in the heat.",
    body: [
      "Duette® Honeycomb Shades are the Hunter Douglas shade I recommend most often in New England, and the reason is the honeycomb. The cells hold air against the glass, so the shade insulates instead of just covering. In January that is the difference between a room you use and a room you close off.",
      "The same construction absorbs sound, which people notice in a bedroom on a busy street. Pleats come in 3/4 inch and 1 1/4 inch, and there are more than 150 fabric and color choices, including fabrics made from over 50 percent recycled content. Hunter Douglas builds Duette® Architella® Honeycomb Shades when you want more energy efficiency than the standard cell, and Duette® Honeycomb Shades with LightLock® when a room has to go dark.",
      "Duette® Honeycomb Shades are available with PowerView® Automation, and also run on the UltraGlide® retractable wand, the cordless LiteRise® push and pull system, or the EasyRise™ cord loop. A Top-Down or Top-Down/Bottom-Up design drops the top of the shade for daylight while the bottom stays closed, which is the trick for a first-floor bathroom. Hunter Douglas even builds them for skylights and for cut-outs around a window crank. They received a 2024 Good Housekeeping Home Renovation Award, and they carry the Hunter Douglas Limited Lifetime Warranty, subject to the manufacturer's warranty terms.",
      POWERVIEW_APP_DISCLOSURE,
    ],
    features: [
      "An insulating cellular design that helps keep the house snug when it is cold and cool when it is hot",
      "Sound absorption, for a quieter room",
      "Pleat sizes in 3/4 inch and 1 1/4 inch",
      "More than 150 fabric and color choices, including fabrics made from over 50 percent recycled content",
      "Top-Down, Top-Down/Bottom-Up, and Duolite® designs for light control and privacy in one shade",
      "Recipient of a 2024 Good Housekeeping Home Renovation Award",
    ],
    faq: [
      {
        q: "Do honeycomb shades really help with heating and cooling?",
        a: "Hunter Douglas builds Duette® Honeycomb Shades around an insulating cellular design, and the claim I stand behind is theirs: the honeycomb helps keep your house snug when it is cold and cool when it is hot. How much you feel it depends on your glass, your exposure, and how many windows we are talking about. At the consultation I walk the house with you and tell you which windows are worth treating first.",
      },
      {
        q: "Can I get true room darkening?",
        a: "Yes. Hunter Douglas builds Duette® Honeycomb Shades with LightLock® for room darkening. In a nursery, or a bedroom for somebody who sleeps days, that is usually the conversation. I will bring both a room-darkening fabric and the LightLock® version and put them in your own window before you commit.",
      },
      {
        q: "What is Top-Down/Bottom-Up actually for?",
        a: "It splits the window. You lower the top rail for daylight and a view of the sky while the bottom of the shade stays closed for privacy. That is the answer for a first-floor bathroom, a street-facing bedroom, and any window where the neighbor is closer than you would like. Hunter Douglas offers it as a Top-Down or a Top-Down/Bottom-Up design on Duette® Honeycomb Shades.",
      },
    ],
    photos: [
      {
        src: "/images/product-lines/duette-honeycomb-shades/duette-honeycomb-shades--lightlock-kidsroom-chairtif.webp",
        alt: "Hunter Douglas Duette® Honeycomb Shades with LightLock® lowered in a child's room beside a reading chair.",
        credit: hdPhotoCredit("duette"),
      },
      {
        src: "/images/product-lines/duette-honeycomb-shades/duette-honeycomb-shades-te-lightlock-kidsroom-closed.webp",
        alt: "Hunter Douglas Duette® Honeycomb Shades with LightLock® closed across a child's bedroom window to darken the room.",
        credit: hdPhotoCredit("duette"),
      },
      {
        src: "/images/product-lines/duette-honeycomb-shades/duette-honeycomb-shades--lightlock-livingroom-closed.webp",
        alt: "Hunter Douglas Duette® Honeycomb Shades with LightLock® closed across a living room window wall.",
        credit: hdPhotoCredit("duette"),
      },
      {
        src: "/images/product-lines/duette-honeycomb-shades/duette-honeycomb-shades-tte-lightlock-livingroom-pv2.webp",
        alt: "Hunter Douglas Duette® Honeycomb Shades lowered in a living room, holding the winter heat at the glass.",
        credit: hdPhotoCredit("duette"),
      },
      {
        src: "/images/product-lines/duette-honeycomb-shades/duette-honeycomb-shades-v-tdbu-solasta-office-detail.webp",
        alt: "Close view of Hunter Douglas Duette® Honeycomb Shades in a Top-Down/Bottom-Up design at an office window.",
        credit: hdPhotoCredit("duette"),
      },
    ],
  },

  {
    slug: "applause-honeycomb-shades",
    name: hdMark("applause"),
    shortName: hdMarkShort("applause"),
    siteCategory: "shades",
    hdCategory: "Cellular Honeycomb Shades",
    tagline:
      "Applause® Honeycomb Shades put an insulating double-cellular honeycomb on the window, in a streamlined selection of fabrics, colors, and operating systems.",
    body: [
      "Applause® Honeycomb Shades are the straightforward cellular shade in the Hunter Douglas line. A double-cellular honeycomb that insulates, in a tighter selection of fabrics, colors, and operating systems than the flagship. It helps keep the house comfortable whether the temperature is hot or cold, which in New Hampshire is both, sometimes in the same week.",
      "I specify these when a house needs cellular shades on a lot of windows and the priority is comfort rather than a big fabric decision at every opening. Pleats come in 3/4 inch or a double pleat. A Top-Down or Top-Down/Bottom-Up design drops the top rail for daylight while the bottom stays closed, and the Duolite® system puts two fabrics on one headrail so a single window handles light control and privacy.",
      "For a slider or a set of French doors, the cordless Vertiglide® system runs the same cellular fabric vertically. Applause® Honeycomb Shades are available with PowerView® Automation, and also run on the UltraGlide® retractable wand, the cordless LiteRise® push and pull system, or the EasyRise™ cord loop. Hunter Douglas builds them for arches, angles, cut-outs, skylights, and sidelights, and they carry the Hunter Douglas Limited Lifetime Warranty, subject to the manufacturer's warranty terms.",
      POWERVIEW_APP_DISCLOSURE,
    ],
    features: [
      "An insulating, double-cellular design for year-round comfort",
      "Pleat sizes in 3/4 inch or a double pleat",
      "The cordless Vertiglide® system for sliding-glass and French doors",
      "Top-Down, Top-Down/Bottom-Up, and Duolite® designs for light control and privacy in one shade",
      "Cordless, corded, and motorized operation, including the LiteRise® system and PowerView® Automation",
      "Built for arches, angles, trapezoids, bay and corner windows, cut-outs, skylights, and sidelights",
    ],
    faq: [
      {
        q: "How is this different from Duette® Honeycomb Shades?",
        a: "Both are Hunter Douglas honeycomb shades and both insulate. Duette® Honeycomb Shades carry the wider fabric range, two pleat sizes, sound absorption, and the room-darkening LightLock® version. Applause® Honeycomb Shades are the streamlined version, a double-cellular design in a select group of fabrics, colors, and operating systems. On a whole-house job I have specified both, Duette® in the rooms you live in and Applause® in the ones that mainly need to be covered well.",
      },
      {
        q: "What can I do about a sliding door?",
        a: "The cordless Vertiglide® system runs the same cellular fabric vertically, so a slider or a set of French doors gets the same insulating honeycomb the windows get. Cordless matters on a door, where a hanging cord is always in the way of the thing you are trying to walk through.",
      },
      {
        q: "Do these work on skylights?",
        a: "Yes. Hunter Douglas builds Applause® Honeycomb Shades for skylights, along with arches, angles, trapezoids, circles and ovals, bay and corner windows, cut-outs around a crank, and sidelights. A skylight is a measure-twice job, and I go up and take those numbers myself.",
      },
    ],
    photos: [
      {
        src: "/images/product-lines/applause-honeycomb-shades/applause-honeycomb-shades--grayscale-diningroom-detail.webp",
        alt: "Close view of Hunter Douglas Applause® Honeycomb Shades at a dining room window, showing the pleats of the cellular fabric.",
        credit: hdPhotoCredit("applause"),
      },
      {
        src: "/images/product-lines/applause-honeycomb-shades/applause-honeycomb-shades-v-amity-grayscale-diningroom.webp",
        alt: "Hunter Douglas Applause® Honeycomb Shades lowered across a dining room window in a soft grey fabric.",
        credit: hdPhotoCredit("applause"),
      },
      {
        src: "/images/product-lines/applause-honeycomb-shades/applause-honeycomb-shades-pp-pv-kinship-bedroom-detail.webp",
        alt: "Close view of Hunter Douglas Applause® Honeycomb Shades in a bedroom, the honeycomb cells catching morning light.",
        credit: hdPhotoCredit("applause"),
      },
      {
        src: "/images/product-lines/applause-honeycomb-shades/applause-honeycomb-shades-2023-app-pv-kinship-bedroom.webp",
        alt: "Hunter Douglas Applause® Honeycomb Shades covering a bedroom window for privacy and insulation.",
        credit: hdPhotoCredit("applause"),
      },
      {
        src: "/images/product-lines/applause-honeycomb-shades/applause-honeycomb-shades-vintage-cafe-au-lait-nursery.webp",
        alt: "Hunter Douglas Applause® Honeycomb Shades in a room-darkening fabric closed across a nursery window.",
        credit: hdPhotoCredit("applause"),
      },
    ],
  },

  {
    slug: "sonnette-cellular-roller-shades",
    name: hdMark("sonnette"),
    shortName: hdMarkShort("sonnette"),
    siteCategory: "shades",
    hdCategory: "Cellular Honeycomb Shades",
    tagline:
      "Sonnette® Cellular Roller Shades wrap a roller shade around an insulating cellular fabric, for soft, radial light and year-round comfort.",
    body: [
      "Sonnette® Cellular Roller Shades are what Hunter Douglas built for people who want the clean look of a roller shade without giving up insulation. Two layers of fabric form a curved cell that rolls up on a tube. Light comes through diffused and soft instead of flat, and the cell keeps working on the temperature all year.",
      "The curve is the part people react to. A flat shade reads as a screen. This one has dimension, so it looks like a treatment rather than a covering. Cells are 2 inch, fabrics come semi-opaque or room darkening, and there are more than 50 fabric and color choices. If your window has a crank or a handle in the way, the fabric can roll off the front to clear it.",
      "Sonnette® Cellular Roller Shades are available with PowerView® Automation, and also run on the cordless LiteRise® push and pull system, SoftTouch® Motorization, or a beaded loop. Hunter Douglas builds them for bay and corner windows, patio and sliding-glass doors, and French doors. Every shade is made to your opening and carries the Hunter Douglas Limited Lifetime Warranty, subject to the manufacturer's warranty terms.",
      POWERVIEW_APP_DISCLOSURE,
    ],
    features: [
      "An insulating cellular design inside a roller shade, for comfort all year long",
      "Gentle curves that add dimension to a flat window",
      "Soft, radial light diffusion from two layers of fabric",
      "Semi-opaque and room-darkening fabric opacities",
      "A 2 inch cell size, in more than 50 fabric and color choices",
      "Front-rolling fabric that clears window handles and cranks",
    ],
    faq: [
      {
        q: "Is this a roller shade or a cellular shade?",
        a: "Both, and that is the point. Sonnette® Cellular Roller Shades roll up on a tube the way a roller shade does, and the fabric itself is a cell that insulates and diffuses the light. You get the clean roller profile at the top of the window and the comfort of a cellular design across the glass.",
      },
      {
        q: "Can it darken a bedroom?",
        a: "Hunter Douglas offers Sonnette® Cellular Roller Shades in semi-opaque and room-darkening fabric opacities, so a bedroom is on the table. Which one you want depends on how dark the room has to get and how much light that window throws at six in the morning. I bring both opacities and hold them in the opening before you decide.",
      },
      {
        q: "My windows have cranks. Can they still be covered?",
        a: "Yes. Sonnette® Cellular Roller Shades can be built with a front-rolling fabric, which moves the roll forward to clear handles and cranks. Casement windows in older New England houses are exactly why that option exists. It is also the kind of thing I catch at the measure, not after the shade shows up.",
      },
    ],
    photos: [
      {
        src: "/images/product-lines/sonnette-cellular-roller-shades/sonnette-cellular-roller-shades-ey-office-drapery-med-detail.webp",
        alt: "Hunter Douglas Sonnette® Cellular Roller Shades at an office window, layered behind drapery panels.",
        credit: hdPhotoCredit("sonnette"),
      },
      {
        src: "/images/product-lines/sonnette-cellular-roller-shades/sonnette-cellular-roller-shades-t-thatcher-living-room-after.webp",
        alt: "Hunter Douglas Sonnette® Cellular Roller Shades bringing soft, diffused light into a living room.",
        credit: hdPhotoCredit("sonnette"),
      },
      {
        src: "/images/product-lines/sonnette-cellular-roller-shades/sonnette-cellular-roller-shades-ble-med-detail-rs-forcaption.webp",
        alt: "Hunter Douglas Sonnette® Cellular Roller Shades over a kitchen table, the cellular fabric diffusing midday sun.",
        credit: hdPhotoCredit("sonnette"),
      },
      {
        src: "/images/product-lines/sonnette-cellular-roller-shades/sonnette-cellular-roller-shades-2020-son-pv-ainsley-kitchen.webp",
        alt: "Hunter Douglas Sonnette® Cellular Roller Shades covering the windows of a bright kitchen.",
        credit: hdPhotoCredit("sonnette"),
      },
      {
        src: "/images/product-lines/sonnette-cellular-roller-shades/sonnette-cellular-roller-shades-kback-thatcher-medium-detail.webp",
        alt: "Close view of Hunter Douglas Sonnette® Cellular Roller Shades lowered beside a round dining table, showing the texture of the cellular fabric.",
        credit: hdPhotoCredit("sonnette"),
      },
    ],
  },

  /* ───────────────────────────── Roman Shades ───────────────────────────── */

  {
    slug: "vignette-roman-shades",
    name: hdMark("vignette"),
    shortName: hdMarkShort("vignette"),
    siteCategory: "shades",
    hdCategory: "Roman Shades",
    tagline:
      "Vignette® Modern Roman Shades hold tailored fabric folds with no exposed rear cords, in a 4 inch full fold or a 6 inch flat fold.",
    body: [
      "Vignette® Modern Roman Shades are the Hunter Douglas take on a Roman shade, cleaned up. The design carries no exposed rear cords, so the folds stay even and the whole treatment reads tailored rather than draped. Clean, crisp, and contemporary is how Hunter Douglas describes it, and that is exactly how it hangs.",
      "You pick the fold and the way it moves. Full folds at 4 inch or flat folds at 6 inch, and a rolling or a stacking shade. Fabrics run sheer, light filtering, or room darkening, across more than 25 fabric and color choices, with The Alustra® Collection on top of that. The shade insulates well on its own, and the room-darkening fabrics block heat gain, which matters on a west-facing room in July.",
      "Vignette® Modern Roman Shades are available with PowerView® Automation, and also run on the UltraGlide® retractable wand, the cordless LiteRise® push and pull system, or the EasyRise™ cord loop. A Top-Down/Bottom-Up design or the Duolite® system gives one window light control and privacy together. Hunter Douglas builds them for arches, angles, trapezoids, circles and ovals, bay and corner windows, patio and sliding-glass doors, and French doors, and they carry the Hunter Douglas Limited Lifetime Warranty, subject to the manufacturer's warranty terms.",
      POWERVIEW_APP_DISCLOSURE,
    ],
    features: [
      "Tailored fabric folds with no exposed rear cords",
      "Fold sizes in a 4 inch full fold or a 6 inch flat fold",
      "A rolling or a stacking style, depending on how you want the shade to gather",
      "Sheer, light-filtering, and room-darkening fabric opacities, across more than 25 fabric and color choices",
      "Insulates well, and room-darkening fabrics block heat gain",
      "Top-Down/Bottom-Up and Duolite® designs, plus exclusive fabrics from The Alustra® Collection",
    ],
    faq: [
      {
        q: "What is the difference between a rolling and a stacking shade?",
        a: "Hunter Douglas offers Vignette® Modern Roman Shades as a rolling shade or a stacking shade. The choice changes what the window looks like when the shade is up, and it is far easier to see than to describe. I bring both to the consultation and raise them in your own window so you can watch the difference.",
      },
      {
        q: "Can a Roman shade darken a bedroom?",
        a: "Yes. Vignette® Modern Roman Shades come in sheer, light-filtering, and room-darkening fabric opacities, and Hunter Douglas notes that the room-darkening fabrics block heat gain as well. If you want the same window filtering light by day and going dark at night, the Duolite® system puts both fabrics on one headrail.",
      },
      {
        q: "Are there cords hanging down the back?",
        a: "No, and that is the design change. Vignette® Modern Roman Shades carry no exposed rear cords, which is why the folds stay even fold after fold. Operating options are the UltraGlide® wand, the cordless LiteRise® system, the EasyRise™ cord loop, and PowerView® Automation.",
      },
    ],
    photos: [
      {
        src: "/images/product-lines/vignette-roman-shades/vignette-roman-shades-king-pv-siena-hallway-stairs.webp",
        alt: "Hunter Douglas Vignette® Modern Roman Shades in a stacking style at a hallway stairwell window.",
        credit: hdPhotoCredit("vignette"),
      },
      {
        src: "/images/product-lines/vignette-roman-shades/vignette-roman-shades--vig-accents-pv-battery-wand.webp",
        alt: "Hunter Douglas Vignette® Modern Roman Shades lowered in a sitting room, the tailored folds holding their shape.",
        credit: hdPhotoCredit("vignette"),
      },
      {
        src: "/images/product-lines/vignette-roman-shades/vignette-roman-shades-lite-rolling-flat-bedroom-02.webp",
        alt: "Hunter Douglas Vignette® Modern Roman Shades in a flat fold across a bedroom window.",
        credit: hdPhotoCredit("vignette"),
      },
      {
        src: "/images/product-lines/vignette-roman-shades/vignette-roman-shades-2021-vig-opacity-lf-office.webp",
        alt: "Hunter Douglas Vignette® Modern Roman Shades in a light-filtering fabric at an office window.",
        credit: hdPhotoCredit("vignette"),
      },
      {
        src: "/images/product-lines/vignette-roman-shades/vignette-roman-shades-acity-rd-sitting-area-closed.webp",
        alt: "Hunter Douglas Vignette® Modern Roman Shades in a room-darkening fabric closed across a sitting area window.",
        credit: hdPhotoCredit("vignette"),
      },
    ],
  },
];
