/**
 * blinds-shutters.ts: the eight Hunter Douglas blind and shutter lines
 * Window Fantasies sells, written for the product catalog pages.
 *
 * ⚠️ HUNTER DOUGLAS COMPLIANCE. Read src/data/hunterDouglas.ts before editing a
 * single string in here. Every mark carries its own ® or ™ plus its official
 * category descriptor, never a plural, never as a generic category word, and
 * always near the Hunter Douglas name so HD reads as the manufacturer.
 * `npm run check:hd` enforces it and runs first in `npm run build`.
 *
 * SOURCE OF TRUTH FOR EVERY PRODUCT CLAIM. HD's advertising policy requires a
 * dealer's claims to correlate with HD's own product claims and bars
 * unsubstantiated ones. Nothing below was written from memory. Each line traces
 * to the crawl of Hunter Douglas's own product pages at
 * research/crawl/hunter-douglas/:
 *   parkland-wood-blinds                    blinds/wood-blinds/parkland.md
 *   everwood-alternative-wood-blinds        blinds/wood-blinds/everwood.md
 *   aria-soft-blinds                        blinds/fabric-blinds/aria.md
 *   modern-precious-metals-aluminum-blinds  blinds/metal-blinds/modern-precious-metals.md
 *   somner-custom-vertical-blinds           blinds/vertical-blinds/somner.md
 *   heritance-hardwood-shutters             shutters/heritance.md
 *   newstyle-hybrid-shutters                shutters/newstyle.md
 *   palm-beach-polysatin-shutters           shutters/palm-beach.md
 * Colour counts come from the category index pages (blinds.md, shutters.md).
 * If the crawl does not support a fact, it is not in here. Never invent a
 * warranty term, a colour count, or a performance number.
 *
 * NO PRICING, ANYWHERE. HD sets minimum advertised pricing and bars dealers
 * from publishing per-square-foot or per-window figures, shutters especially.
 * The call to action is always the free in-home consultation.
 *
 * JIM DOES NOT FABRICATE. HD compliance criterion 10 bars the dealer from
 * fabricating product. Hunter Douglas manufactures; Jim measures, designs, and
 * installs. Nothing in here may imply he builds, mills, assembles, or finishes
 * a treatment.
 *
 * Photo paths come from assets/hunter-douglas-brite/product-lines.json and are
 * copied verbatim. Credit format is fixed: "<full trademarked name> by Hunter
 * Douglas", identical on every photo of a line, because these are Hunter
 * Douglas's own photography.
 *
 * Zero em dashes in this file, comments included.
 */

import { POWERVIEW_APP_DISCLOSURE } from "@/data/hunterDouglas";

import type { HDProductLine } from "./shades-sheers";

/*
 * WHY THE NAMES ARE LITERAL HERE AND NOT hdMark() CALLS.
 * Seven of these eight lines round-trip through HD_MARKS correctly. The eighth
 * does not: HD_MARKS.aria is registered as a feature-level mark with an EMPTY
 * category descriptor, so hdMark("aria") returns "Aria" plus its symbol with no
 * "Soft Blinds" after it, which fails HD's descriptor rule. Rather than call the
 * helper seven times and hand-write the eighth, every name, short name, and photo
 * credit below is spelled out and byte-checked against HD's own product pages.
 * The one string that must never drift, HD's mandatory PowerView® footnote, is
 * imported so it cannot be paraphrased.
 * FOLLOW-UP for whoever owns hunterDouglas.ts: give the aria entry the descriptor
 * "Soft Blinds" (HD's own pages and blinds.md both use "Aria™ Soft Blinds"), then
 * this file can move to the helpers wholesale.
 */

export const BLINDS_SHUTTERS: HDProductLine[] = [
  /* ─────────────────────────── Horizontal Blinds ─────────────────────────── */
  {
    slug: "parkland-wood-blinds",
    name: "Parkland® Wood Blinds",
    shortName: "Parkland®",
    siteCategory: "blinds",
    hdCategory: "Horizontal Blinds",
    tagline:
      "Hunter Douglas Parkland® Wood Blinds put real wood back in the window, in more than fifty stains and paint colors.",
    body: [
      "Hunter Douglas Parkland® Wood Blinds are made from real wood, and you can tell the moment you put a hand on a slat. Slats come 2 inch or 2 1/2 inch, in more than fifty wood stains and solid paint colors, and Hunter Douglas harvests the wood from responsibly managed forests. When a room reads cold to you, this is usually the first thing I reach for.",
      "Tilt the slats and you set the light and the privacy without ever raising the blind. Open them and you keep the view of the yard. Decorative tapes are available if you want the ladders to read as a design line, and a matching cornice if you want the headrail covered. The line is available with PowerView® Automation, so a tall bank of windows moves at a tap instead of a step stool.",
      POWERVIEW_APP_DISCLOSURE,
    ],
    features: [
      "Real wood slats in 2 inch or 2 1/2 inch",
      "More than fifty wood stains and solid paint colors",
      "Light control and privacy from a tilt of the slats, with the view kept when they are open",
      "Wood harvested from responsibly managed forests",
      "Made for specialty shapes: arches, angles, bay and corner windows, French doors, and cut-outs for cranks and handles",
      "Available with PowerView® Automation, the LiteRise® push and pull system, or the SimpleLift™ push button system",
    ],
    faq: [
      {
        q: "Are Parkland® Wood Blinds actually real wood?",
        a: "Yes. Hunter Douglas builds them from real wood, with a large selection of stains and solid paint colors, and the wood is harvested from responsibly managed forests. If the room is a bath or anywhere with steady moisture, I will steer you to EverWood® Alternative Wood Blinds instead and tell you why.",
      },
      {
        q: "Which slat size should I pick, 2 inch or 2 1/2 inch?",
        a: "Both are in the sample book. The wider slat reads bolder on a large window, the 2 inch reads more traditional on a smaller one. I hold both in your actual opening at the consultation so you are looking at it instead of guessing from a photo.",
      },
      {
        q: "Can I motorize wood blinds?",
        a: "Yes. Parkland® Wood Blinds are available with PowerView® Automation, which you operate by app, remote, or a smart home system. Ask me at your free in-home consultation and I will run it on a working sample in front of you.",
      },
    ],
    photos: [
      {
        src: "/images/product-lines/parkland-wood-blinds/parkland-wood-blinds-pv-premier-after-living-room.webp",
        alt: "Hunter Douglas Parkland® Wood Blinds in a dark stain, tilted across a six panel window wall in a beamed living room.",
        credit: "Parkland® Wood Blinds by Hunter Douglas",
      },
      {
        src: "/images/product-lines/parkland-wood-blinds/parkland-wood-blinds-r-lr-basswood-dining-room-rt.webp",
        alt: "Hunter Douglas Parkland® Wood Blinds in a warm honey stain with decorative tapes on two dining room windows.",
        credit: "Parkland® Wood Blinds by Hunter Douglas",
      },
      {
        src: "/images/product-lines/parkland-wood-blinds/parkland-wood-blinds-lr-basswood-fabric-detail-rt.webp",
        alt: "A close view of the slats on Hunter Douglas Parkland® Wood Blinds, showing the wood grain under the stain.",
        credit: "Parkland® Wood Blinds by Hunter Douglas",
      },
      {
        src: "/images/product-lines/parkland-wood-blinds/parkland-wood-blinds--basswood-hardware-detail-rt.webp",
        alt: "A close view of the headrail and hardware on Hunter Douglas Parkland® Wood Blinds.",
        credit: "Parkland® Wood Blinds by Hunter Douglas",
      },
      {
        src: "/images/product-lines/parkland-wood-blinds/parkland-wood-blinds-v-premier-before-living-room.webp",
        alt: "The same living room photographed before the Hunter Douglas Parkland® Wood Blinds went in, with bare windows and full glare across the seating.",
        credit: "Parkland® Wood Blinds by Hunter Douglas",
      },
    ],
  },

  {
    slug: "everwood-alternative-wood-blinds",
    name: "EverWood® Alternative Wood Blinds",
    shortName: "EverWood®",
    siteCategory: "blinds",
    hdCategory: "Horizontal Blinds",
    tagline:
      "Hunter Douglas EverWood® Alternative Wood Blinds give you the wood look in the rooms where real wood has a hard time.",
    body: [
      "Hunter Douglas EverWood® Alternative Wood Blinds are built for the rooms that are hard on a real wood blind. A bathroom with the shower running twice a day. A kitchen window over the sink. A sunroom that takes sun all afternoon. Hunter Douglas builds this line to stand up to humidity and sun, with Performance Plus™ Protection against fading, discoloring, warping, and bowing.",
      "Slats come 2 inch or 2 1/2 inch in more than fifty colors and finishes, and they tilt for light and privacy the same way a wood blind does, view kept, nothing to raise. Decorative tapes are available, and Hunter Douglas can cut the blind around a window crank or a door handle so it still sits flush. It is available with PowerView® Automation and with the SimpleLift™ push button system.",
      POWERVIEW_APP_DISCLOSURE,
    ],
    features: [
      "Built to stand up to humidity and sun, which suits bathrooms, kitchens, and sunrooms",
      "Performance Plus™ Protection against fading, discoloring, warping, and bowing",
      "Slats in 2 inch or 2 1/2 inch, in more than fifty colors and finishes",
      "Light control and privacy from a tilt of the slats, with the view kept when they are open",
      "Cut-outs for window cranks, door handles, and other obstructions",
      "Available with PowerView® Automation or the SimpleLift™ push button system",
    ],
    faq: [
      {
        q: "Will EverWood® Alternative Wood Blinds hold up in a bathroom?",
        a: "That is exactly what the line is for. Hunter Douglas builds it to stand up to humidity and sun, with Performance Plus™ Protection against fading, discoloring, warping, and bowing. In a bath or a sunroom I put EverWood® in ahead of a real wood blind nearly every time.",
      },
      {
        q: "How is it different from Parkland® Wood Blinds?",
        a: "Parkland® Wood Blinds are real wood and they belong in a dining room or a study where the grain matters. EverWood® Alternative Wood Blinds are the alternative wood version, built for moisture and sun. Same tilt, same view, same slat sizes. I bring both samples to the consultation so you can compare them in your own light.",
      },
      {
        q: "My window has a crank on it. Does that rule out a blind?",
        a: "No. Hunter Douglas cuts the blind around cranks, handles, and other obstructions so it still sits flat and operates cleanly. I measure the obstruction on site, because that measurement has to be right the first time.",
      },
    ],
    photos: [
      {
        src: "/images/product-lines/everwood-alternative-wood-blinds/everwood-alternative-wood-blinds--slpv-trugrain-after-kitchen.webp",
        alt: "Hunter Douglas EverWood® Alternative Wood Blinds lowered over a kitchen window, slats tilted to cut the glare.",
        credit: "EverWood® Alternative Wood Blinds by Hunter Douglas",
      },
      {
        src: "/images/product-lines/everwood-alternative-wood-blinds/everwood-alternative-wood-blinds--ew-lr-faux-wood-bathroom-rt.webp",
        alt: "Hunter Douglas EverWood® Alternative Wood Blinds in a bathroom, the room where humidity is hardest on a real wood blind.",
        credit: "EverWood® Alternative Wood Blinds by Hunter Douglas",
      },
      {
        src: "/images/product-lines/everwood-alternative-wood-blinds/everwood-alternative-wood-blinds-0-ew-sl-distinctions-bedroom.webp",
        alt: "Hunter Douglas EverWood® Alternative Wood Blinds closed across a bedroom window for privacy.",
        credit: "EverWood® Alternative Wood Blinds by Hunter Douglas",
      },
      {
        src: "/images/product-lines/everwood-alternative-wood-blinds/everwood-alternative-wood-blinds-3-ew-lr-faux-wood-kitchen-rt.webp",
        alt: "Hunter Douglas EverWood® Alternative Wood Blinds over a kitchen window, tilted open to the daylight.",
        credit: "EverWood® Alternative Wood Blinds by Hunter Douglas",
      },
      {
        src: "/images/product-lines/everwood-alternative-wood-blinds/everwood-alternative-wood-blinds-021-everwood-securerise-nook.webp",
        alt: "Hunter Douglas EverWood® Alternative Wood Blinds in a sunny breakfast nook.",
        credit: "EverWood® Alternative Wood Blinds by Hunter Douglas",
      },
    ],
  },

  {
    slug: "aria-soft-blinds",
    name: "Aria™ Soft Blinds",
    shortName: "Aria™",
    siteCategory: "blinds",
    hdCategory: "Horizontal Blinds",
    tagline:
      "Hunter Douglas Aria™ Soft Blinds trade the hard slat for a soft fabric vane, so daylight arrives as an even glow.",
    body: [
      "Hunter Douglas Aria™ Soft Blinds are a horizontal blind made of fabric instead of wood or metal. The fabric is lightweight and translucent, so the sun comes through as a gentle, even radiance rather than hard stripes across the floor. Hunter Douglas offers fourteen fabric and color choices, all textured neutrals.",
      "The vanes tilt with a push or a pull of the tilt bar, no wand to twist, and they close for privacy. Open them and you still see out without raising anything. Hunter Douglas built this line for dramatically large windows, so it is a real answer for the wall of glass that nothing else fits. There is also a light dimming option that puts two opacities in one blind: tilt the vanes down for soft dimming, up for room darkening. Aria™ Soft Blinds are available with PowerView® Automation.",
      POWERVIEW_APP_DISCLOSURE,
    ],
    features: [
      "Lightweight, translucent fabric vanes that turn sunlight into an even glow",
      "Fourteen fabric and color choices, textured neutrals",
      "Built for extra large windows",
      "Vanes adjust with a tilt bar, with no twisting",
      "Optional light dimming: tilt the vanes down for soft dimming, up for room darkening",
      "Available with PowerView® Automation or the LiteRise® push and pull system",
    ],
    faq: [
      {
        q: "What makes Aria™ Soft Blinds different from a wood or metal blind?",
        a: "The vane is fabric, not a hard slat. Hunter Douglas uses a lightweight translucent fabric, so the light that comes through is soft and even instead of a hard line. You still get the tilt for privacy and the view out when they are open.",
      },
      {
        q: "Will they cover a very wide window?",
        a: "Yes. Hunter Douglas designed this line for dramatically large windows, which is why I bring it up when a client has a wall of glass in a living room. Have me out for the free in-home consultation, I will measure the opening and tell you honestly whether this is the right line for it.",
      },
      {
        q: "Can I darken a room with them?",
        a: "There is a light dimming option that gives you two opacities in one blind. Tilt the vanes down for soft dimming and up for room darkening. If full room darkening is the whole point of the window, say so at the consultation and I will show you the Hunter Douglas lines built specifically for that.",
      },
    ],
    photos: [
      {
        src: "/images/product-lines/aria-soft-blinds/aria-soft-blinds--elan-birch-bark-living-room.webp",
        alt: "Hunter Douglas Aria™ Soft Blinds diffusing daylight across a wall of windows in a modern living room.",
        credit: "Aria™ Soft Blinds by Hunter Douglas",
      },
      {
        src: "/images/product-lines/aria-soft-blinds/aria-soft-blinds-highline-daisy-white-kitchen.webp",
        alt: "Hunter Douglas Aria™ Soft Blinds in white over a kitchen window, softening the midday light.",
        credit: "Aria™ Soft Blinds by Hunter Douglas",
      },
      {
        src: "/images/product-lines/aria-soft-blinds/aria-soft-blinds--pearl-gray-livingroom-after.webp",
        alt: "Hunter Douglas Aria™ Soft Blinds in pearl gray lowered across a living room window.",
        credit: "Aria™ Soft Blinds by Hunter Douglas",
      },
      {
        src: "/images/product-lines/aria-soft-blinds/aria-soft-blinds-desert-sands-dining-room-dog.webp",
        alt: "Hunter Douglas Aria™ Soft Blinds in a warm sand tone across a dining room window.",
        credit: "Aria™ Soft Blinds by Hunter Douglas",
      },
      {
        src: "/images/product-lines/aria-soft-blinds/aria-soft-blinds-alvary-bedroom-medium-detail.webp",
        alt: "A closer view of the soft fabric vanes on Hunter Douglas Aria™ Soft Blinds in a bedroom.",
        credit: "Aria™ Soft Blinds by Hunter Douglas",
      },
    ],
  },

  {
    slug: "modern-precious-metals-aluminum-blinds",
    name: "Modern Precious Metals® Aluminum Blinds",
    shortName: "Modern Precious Metals®",
    siteCategory: "blinds",
    hdCategory: "Horizontal Blinds",
    tagline:
      "Hunter Douglas Modern Precious Metals® Aluminum Blinds are the sleek, hard wearing option, in more than seventy colors and finishes.",
    body: [
      "Hunter Douglas Modern Precious Metals® Aluminum Blinds are aluminum slats with a clean, flat profile. Hunter Douglas builds them to stand up to daily wear and tear, which is why I put them in busy houses: kids' rooms, kitchens, home offices, anywhere a blind gets handled every day. There are more than seventy colors and finishes, so matching a trim color or a cabinet finish is usually easy.",
      "Slats come in 1/2 inch, 1 inch, or 2 inch. The half inch reads fine and modern across the glass, the 2 inch reads more like a traditional blind. Tilt for light and privacy, open for the view. Hunter Douglas can cut them around cranks and handles, and they fit sidelights beside an entry door, which is a spot most products miss. The line is available with PowerView® Automation.",
      POWERVIEW_APP_DISCLOSURE,
    ],
    features: [
      "Aluminum slats in 1/2 inch, 1 inch, or 2 inch",
      "More than seventy colors and finishes",
      "Built to stand up to daily wear and tear in high traffic rooms",
      "Light control and privacy from a tilt of the slats, with the view kept when they are open",
      "Fits sidelights, bay and corner windows, and French doors, with cut-outs for cranks and handles",
      "Available with PowerView® Automation, the LiteRise® push and pull system, or the SimpleLift™ push button system",
    ],
    faq: [
      {
        q: "Are aluminum blinds still a premium product?",
        a: "These are. Hunter Douglas builds Modern Precious Metals® Aluminum Blinds with a sleek slat, a finish range more than seventy deep, and the durability to take daily wear and tear. I use them where a clean modern line and toughness matter more than the warmth of wood.",
      },
      {
        q: "Which slat size works best?",
        a: "Half inch, 1 inch, or 2 inch. On a small window the half inch usually looks right, on a big one it can read busy, and the 2 inch reads closer to a traditional blind. I hold the samples in the opening at the consultation so you can see the difference in your own room.",
      },
      {
        q: "Can you do the narrow windows beside my front door?",
        a: "Yes. Hunter Douglas makes this line for sidelights, those tall narrow windows flanking an entry door, along with bay and corner windows and French doors. Those openings are unforgiving on measurement, so I take them myself.",
      },
    ],
    photos: [
      {
        src: "/images/product-lines/modern-precious-metals-aluminum-blinds/modern-precious-metals-aluminum-blinds-ivingroom-black-variation-rt.webp",
        alt: "Hunter Douglas Modern Precious Metals® Aluminum Blinds in black across a living room window.",
        credit: "Modern Precious Metals® Aluminum Blinds by Hunter Douglas",
      },
      {
        src: "/images/product-lines/modern-precious-metals-aluminum-blinds/modern-precious-metals-aluminum-blinds-1-mpm-macro-tapes-livingroom.webp",
        alt: "Hunter Douglas Modern Precious Metals® Aluminum Blinds in a soft taupe with decorative tapes on a dining room window.",
        credit: "Modern Precious Metals® Aluminum Blinds by Hunter Douglas",
      },
      {
        src: "/images/product-lines/modern-precious-metals-aluminum-blinds/modern-precious-metals-aluminum-blinds--mpm-macro-kitchen-variation.webp",
        alt: "Hunter Douglas Modern Precious Metals® Aluminum Blinds tilted open over a kitchen window.",
        credit: "Modern Precious Metals® Aluminum Blinds by Hunter Douglas",
      },
      {
        src: "/images/product-lines/modern-precious-metals-aluminum-blinds/modern-precious-metals-aluminum-blinds-2021-mpm-decor-office-detail.webp",
        alt: "A close view of the slats on Hunter Douglas Modern Precious Metals® Aluminum Blinds in a home office.",
        credit: "Modern Precious Metals® Aluminum Blinds by Hunter Douglas",
      },
      {
        src: "/images/product-lines/modern-precious-metals-aluminum-blinds/modern-precious-metals-aluminum-blinds-2021-mpm-pv-hardware-detail.webp",
        alt: "A close view of the headrail and hardware on Hunter Douglas Modern Precious Metals® Aluminum Blinds.",
        credit: "Modern Precious Metals® Aluminum Blinds by Hunter Douglas",
      },
    ],
  },

  /* ──────────────────────────── Vertical Blinds ──────────────────────────── */
  {
    slug: "somner-custom-vertical-blinds",
    name: "Somner® Custom Vertical Blinds",
    shortName: "Somner®",
    siteCategory: "blinds",
    hdCategory: "Vertical Blinds",
    tagline:
      "Hunter Douglas Somner® Custom Vertical Blinds are still the cleanest answer for a slider, in fabric, vinyl, or aluminum.",
    body: [
      "Hunter Douglas Somner® Custom Vertical Blinds cover the openings a horizontal blind fights: a patio slider, a French door, a wide run of glass. Louvers come in fabric, vinyl, and aluminum, with more than one hundred and seventy material and color choices, at a 3 1/2 inch louver.",
      "You choose which way they stack, left, right, split, or center, so the louvers park clear of the door you actually use. Hunter Douglas runs them on a patented headrail, which is what keeps a wide opening moving smoothly. Operation is the PermAssure® Safety Wand, a straightforward push and pull. A dust cover valance is available if you want the headrail hidden.",
      "Verticals earned a bad name years ago, back when they rattled. What Hunter Douglas builds now reads differently. The fabrics have real texture, the metals have a finish, and a wide slider done right looks intentional. I will bring the samples out and hold them at the door so you can judge it for yourself.",
    ],
    features: [
      "Fabric, vinyl, and aluminum louvers, with more than one hundred and seventy material and color choices",
      "3 1/2 inch louvers",
      "Stacks left, right, split, or center, so the louvers park clear of the door",
      "Patented Hunter Douglas headrail for smooth movement across a wide opening",
      "Operated with the PermAssure® Safety Wand",
      "Optional dust cover valance",
    ],
    faq: [
      {
        q: "Are Somner® Custom Vertical Blinds only for sliding doors?",
        a: "They are made for large vertical expanses of glass, which usually means a patio slider or a French door, and that is where I use them most. They also suit a tall window when you want the lines running vertical instead of across.",
      },
      {
        q: "Which way should the louvers stack?",
        a: "Left, right, split, or center. It comes down to where the door handle is and how you walk through the room. Get it wrong and the stack parks itself in front of the opening you use every day, so it is one of the first questions I ask at the measure.",
      },
      {
        q: "What materials can I choose from?",
        a: "Fabric, vinyl, or aluminum, with more than one hundred and seventy material and color choices. Fabric brings texture, vinyl keeps it simple, aluminum reads modern. I bring all three to the free in-home consultation so you can handle them before you decide.",
      },
    ],
    photos: [
      {
        src: "/images/product-lines/somner-custom-vertical-blinds/somner-custom-vertical-blinds--bondi-sandhills-living-room.webp",
        alt: "Hunter Douglas Somner® Custom Vertical Blinds drawn across a sliding glass door and a side window in a bright living room.",
        credit: "Somner® Custom Vertical Blinds by Hunter Douglas",
      },
      {
        src: "/images/product-lines/somner-custom-vertical-blinds/somner-custom-vertical-blinds-022-som-bridger-gold-kitchen.webp",
        alt: "Hunter Douglas Somner® Custom Vertical Blinds in a warm gold tone in a kitchen.",
        credit: "Somner® Custom Vertical Blinds by Hunter Douglas",
      },
      {
        src: "/images/product-lines/somner-custom-vertical-blinds/somner-custom-vertical-blinds-022-som-everly-raven-bedroom.webp",
        alt: "Hunter Douglas Somner® Custom Vertical Blinds in a deep raven tone closed across a bedroom window.",
        credit: "Somner® Custom Vertical Blinds by Hunter Douglas",
      },
      {
        src: "/images/product-lines/somner-custom-vertical-blinds/somner-custom-vertical-blinds-bondi-sandhills-vinyl-detail.webp",
        alt: "A close view of the vinyl louvers on Hunter Douglas Somner® Custom Vertical Blinds.",
        credit: "Somner® Custom Vertical Blinds by Hunter Douglas",
      },
      {
        src: "/images/product-lines/somner-custom-vertical-blinds/somner-custom-vertical-blinds-om-bridger-gold-vinyl-detail.webp",
        alt: "A close view of the texture on a gold toned vinyl louver from Hunter Douglas Somner® Custom Vertical Blinds.",
        credit: "Somner® Custom Vertical Blinds by Hunter Douglas",
      },
    ],
  },

  /* ─────────────────────────────── Shutters ──────────────────────────────── */
  {
    slug: "heritance-hardwood-shutters",
    name: "Heritance® Hardwood Shutters",
    shortName: "Heritance®",
    siteCategory: "shutters",
    hdCategory: "Shutters",
    tagline:
      "Hunter Douglas Heritance® Hardwood Shutters are genuine hardwood, dovetailed and finished, and they read as part of the house itself.",
    body: [
      "Hunter Douglas Heritance® Hardwood Shutters are made from 100% natural hardwood. Hunter Douglas uses Truemill® dovetail construction and their Integra™ finish, and the hardwood is harvested from responsibly managed forests. There are more than twenty colors, plus custom paints and stains when you are matching existing millwork.",
      "Louvers come 2 1/2 inch, 3 1/2 inch, or 4 1/2 inch. The wider louver reads bolder on a tall window, the 2 1/2 inch reads finer and more traditional. You also choose how the panels move: standard hinged panels that pull inward, a bi-fold track that folds them back, or a bypass track that slides one panel past another on a wide opening. Louvers tilt from a front tilt bar or from a hidden tilt with no bar on the face, and the optional SoftClose™ louvers with Quick Align™ shut in one touch, the way good cabinetry closes.",
      "A shutter is the one treatment people notice from the street, so the fit has to be right. Hunter Douglas makes this line for arches, angles, trapezoids, hexagons, circles and ovals, bay and corner windows, French doors, and sidelights. Hunter Douglas manufactures the shutter. My job is the measurement, the design, and the install, and I do all three myself.",
    ],
    features: [
      "100% natural hardwood, harvested from responsibly managed forests",
      "Truemill® dovetail construction and the Integra™ finish",
      "Louvers in 2 1/2 inch, 3 1/2 inch, or 4 1/2 inch",
      "More than twenty colors, plus custom paints and stains",
      "Panels hinged, bi-fold, or on a bypass track, with a front tilt bar or a hidden tilt",
      "Optional SoftClose™ louvers with Quick Align™ for one touch closure",
    ],
    faq: [
      {
        q: "Are Heritance® Hardwood Shutters real wood?",
        a: "Yes, 100% natural hardwood, built by Hunter Douglas with Truemill® dovetail construction and finished with their Integra™ finish. If the room is a bath, a laundry, or anywhere with steady moisture, I will point you at Palm Beach™ Polysatin™ Shutters instead and explain the tradeoff.",
      },
      {
        q: "Can they be made for an arched or a round window?",
        a: "Yes. Hunter Douglas makes this line for arches, angles, trapezoids, hexagons, circles and ovals, bay and corner windows, French doors, and sidelights. A specialty shape lives or dies on the measurement, so I take that one myself.",
      },
      {
        q: "How do the panels open?",
        a: "Three ways. Standard hinged panels pull inward, a bi-fold track folds them back against the frame, and a bypass track slides one panel past another on a wide opening like a slider. Which one is right depends on your furniture and how you move through the room, so we have that conversation standing at the window.",
      },
    ],
    photos: [
      {
        src: "/images/product-lines/heritance-hardwood-shutters/heritance-hardwood-shutters-anels-livingroom-open-wchair.webp",
        alt: "Hunter Douglas Heritance® Hardwood Shutters with the louvers open beside a reading chair in a living room.",
        credit: "Heritance® Hardwood Shutters by Hunter Douglas",
      },
      {
        src: "/images/product-lines/heritance-hardwood-shutters/heritance-hardwood-shutters--panels-livingroom-ee-closed.webp",
        alt: "Hunter Douglas Heritance® Hardwood Shutters closed across a living room window for privacy.",
        credit: "Heritance® Hardwood Shutters by Hunter Douglas",
      },
      {
        src: "/images/product-lines/heritance-hardwood-shutters/heritance-hardwood-shutters-her-03-kitchen-corner-window.webp",
        alt: "Hunter Douglas Heritance® Hardwood Shutters fitted to a corner window in a kitchen.",
        credit: "Heritance® Hardwood Shutters by Hunter Douglas",
      },
      {
        src: "/images/product-lines/heritance-hardwood-shutters/heritance-hardwood-shutters-specialtyshape-nursey-closed.webp",
        alt: "Hunter Douglas Heritance® Hardwood Shutters closed on a nursery window, with a round shutter fitted to a circular window on the far wall.",
        credit: "Heritance® Hardwood Shutters by Hunter Douglas",
      },
    ],
  },

  {
    slug: "newstyle-hybrid-shutters",
    name: "NewStyle® Hybrid Shutters",
    shortName: "NewStyle®",
    siteCategory: "shutters",
    hdCategory: "Shutters",
    tagline:
      "Hunter Douglas NewStyle® Hybrid Shutters pair the look of finely painted wood with composite strength, for rooms that take a beating.",
    body: [
      "Hunter Douglas NewStyle® Hybrid Shutters combine the look of genuine wood with the durability of composite materials. Hunter Douglas gives them a low luster Finetech® finish, so they read like finely painted wood, and builds them with the same Truemill® dovetail construction used on their hardwood shutters. There are eight colors.",
      "Louvers come 2 1/2 inch, 3 1/2 inch, or 4 1/2 inch, and the panels work the way the hardwood ones do: hinged, bi-fold, or on a bypass track, with a front tilt bar or a hidden tilt. Add the optional SoftClose™ louvers with Quick Align™ and they close in one touch. This is the line I bring up for a high energy house, a playroom, a hallway where a door swings, anywhere the shutter is going to get handled every single day.",
      "Hunter Douglas NewStyle® Hybrid Shutters also fit the openings people assume a shutter cannot cover: arches, angles, circles and ovals, bay and corner windows, French doors, and sidelights. Hunter Douglas builds every panel to your exact opening. I measure it, and I hang it.",
    ],
    features: [
      "The look of genuine wood with the durability of composite materials",
      "Low luster Finetech® finish, the look of finely painted wood",
      "Truemill® dovetail construction",
      "Louvers in 2 1/2 inch, 3 1/2 inch, or 4 1/2 inch",
      "Eight colors",
      "Panels hinged, bi-fold, or on a bypass track, with optional SoftClose™ louvers with Quick Align™",
    ],
    faq: [
      {
        q: "How do NewStyle® Hybrid Shutters compare to Heritance® Hardwood Shutters?",
        a: "Heritance® Hardwood Shutters are 100% natural hardwood, with more than twenty colors plus custom paints and stains. NewStyle® Hybrid Shutters are the hybrid, a wood look with composite strength, in eight colors, built for rooms that take daily handling. Both use Truemill® dovetail construction and the same panel and tilt options. I bring both samples and most people know within a minute which one is theirs.",
      },
      {
        q: "Will they hold up in a kid's room or a busy hallway?",
        a: "That is the point of the line. Hunter Douglas builds NewStyle® Hybrid Shutters to take wear and tear, with composite strength behind the wood look. It is the shutter I recommend for a high energy household.",
      },
      {
        q: "Can I get louvers that close softly?",
        a: "Yes. SoftClose™ louvers with Quick Align™ are an option on this line. They close softly and in one touch, similar to the soft close hardware on high end cabinetry. Feel it once on a sample at the consultation and it is hard to go back.",
      },
    ],
    photos: [
      {
        src: "/images/product-lines/newstyle-hybrid-shutters/newstyle-hybrid-shutters-ns-standard-hinged-ht-living.webp",
        alt: "Hunter Douglas NewStyle® Hybrid Shutters on hinged panels across a living room window.",
        credit: "NewStyle® Hybrid Shutters by Hunter Douglas",
      },
      {
        src: "/images/product-lines/newstyle-hybrid-shutters/newstyle-hybrid-shutters-tracksystem-sanddune-kitchen.webp",
        alt: "Hunter Douglas NewStyle® Hybrid Shutters in a sand tone in a kitchen, with a wide bypass track panel beside two smaller shuttered windows.",
        credit: "NewStyle® Hybrid Shutters by Hunter Douglas",
      },
      {
        src: "/images/product-lines/newstyle-hybrid-shutters/newstyle-hybrid-shutters-d-hinged-ht-arch-top-bedroom.webp",
        alt: "Hunter Douglas NewStyle® Hybrid Shutters under an arch top window in a bedroom.",
        credit: "NewStyle® Hybrid Shutters by Hunter Douglas",
      },
      {
        src: "/images/product-lines/newstyle-hybrid-shutters/newstyle-hybrid-shutters-d-hinged-ft-arch-top-library.webp",
        alt: "Hunter Douglas NewStyle® Hybrid Shutters with a front tilt bar on an arch top window in a library.",
        credit: "NewStyle® Hybrid Shutters by Hunter Douglas",
      },
      {
        src: "/images/product-lines/newstyle-hybrid-shutters/newstyle-hybrid-shutters-ns-standard-hinged-ht-office.webp",
        alt: "Hunter Douglas NewStyle® Hybrid Shutters filtering the light in a home office.",
        credit: "NewStyle® Hybrid Shutters by Hunter Douglas",
      },
    ],
  },

  {
    slug: "palm-beach-polysatin-shutters",
    name: "Palm Beach™ Polysatin™ Shutters",
    shortName: "Palm Beach™ Shutters",
    siteCategory: "shutters",
    hdCategory: "Shutters",
    tagline:
      "Hunter Douglas Palm Beach™ Polysatin™ Shutters are the shutter for a bathroom, a kitchen, or a window that takes hard sun.",
    body: [
      "Hunter Douglas Palm Beach™ Polysatin™ Shutters are built from a Polysatin™ compound that resists water, and Hunter Douglas designed them for intense sunlight and moisture. Hunter Douglas builds them UV resistant against warping, cracking, fading, chipping, peeling, and discoloring. Inside the panels there is aluminum bracing and resin blocks for strength. There are three colors.",
      "That makes this the shutter I put in the rooms that are hardest on a treatment. A bathroom with the shower running twice a day. The window over the kitchen sink. A south facing sunroom that cooks all afternoon. A shore house that stays damp all summer. Louvers come 2 1/2 inch, 3 1/2 inch, or 4 1/2 inch, the panels hinge, fold, or slide on a bypass track, and a decorative sill cover can hide a rough sill or create one where there is none. The line is available with PowerView® Automation.",
      POWERVIEW_APP_DISCLOSURE,
    ],
    features: [
      "Polysatin™ compound that resists water, built for moisture and intense sunlight",
      "UV resistant against warping, cracking, fading, chipping, peeling, and discoloring",
      "Interior aluminum bracing and resin blocks for strength",
      "Louvers in 2 1/2 inch, 3 1/2 inch, or 4 1/2 inch, in three colors",
      "Optional SoftClose™ louvers with Quick Align™ and a decorative sill cover",
      "Available with PowerView® Automation",
    ],
    faq: [
      {
        q: "Can I really put shutters in a bathroom?",
        a: "With this line, yes. Hunter Douglas builds Palm Beach™ Polysatin™ Shutters for moisture and hard sun, water resistant through the Polysatin™ compound and UV resistant against warping, cracking, fading, chipping, peeling, and discoloring. It is the first thing I suggest for a bath or a laundry room.",
      },
      {
        q: "Only three colors?",
        a: "Three, and all three are whites, which is the trade for the material and works against most standard trim. If you want a stain or a custom paint, that is Heritance® Hardwood Shutters territory and I will bring those samples too.",
      },
      {
        q: "What do they feel like up close?",
        a: "Solid. Hunter Douglas braces the panels with interior aluminum and resin blocks. I hand you a full size sample at the free in-home consultation, because holding a shutter is the only honest way to judge one.",
      },
    ],
    photos: [
      {
        src: "/images/product-lines/palm-beach-polysatin-shutters/palm-beach-polysatin-shutters-ngroom-mediumdetail-notalent.webp",
        alt: "Hunter Douglas Palm Beach™ Polysatin™ Shutters in bright white across a living room window.",
        credit: "Palm Beach™ Polysatin™ Shutters by Hunter Douglas",
      },
      {
        src: "/images/product-lines/palm-beach-polysatin-shutters/palm-beach-polysatin-shutters-ndardhinged-ht-bathroom-prod.webp",
        alt: "Hunter Douglas Palm Beach™ Polysatin™ Shutters on a bathroom window, the room where moisture is hardest on a treatment.",
        credit: "Palm Beach™ Polysatin™ Shutters by Hunter Douglas",
      },
      {
        src: "/images/product-lines/palm-beach-polysatin-shutters/palm-beach-polysatin-shutters-dturn-windowsopen-right-prod.webp",
        alt: "Hunter Douglas Palm Beach™ Polysatin™ Shutters in a dining room, with one panel swung open and the window tilted open behind it.",
        credit: "Palm Beach™ Polysatin™ Shutters by Hunter Douglas",
      },
      {
        src: "/images/product-lines/palm-beach-polysatin-shutters/palm-beach-polysatin-shutters-ltandturn-windowsclosed-prod.webp",
        alt: "Hunter Douglas Palm Beach™ Polysatin™ Shutters across a bay of dining room windows with every panel closed.",
        credit: "Palm Beach™ Polysatin™ Shutters by Hunter Douglas",
      },
      {
        src: "/images/product-lines/palm-beach-polysatin-shutters/palm-beach-polysatin-shutters-pb-pv-bedroom-detail-02-prod.webp",
        alt: "A close view of the louvers on Hunter Douglas Palm Beach™ Polysatin™ Shutters in a bedroom.",
        credit: "Palm Beach™ Polysatin™ Shutters by Hunter Douglas",
      },
    ],
  },
];
