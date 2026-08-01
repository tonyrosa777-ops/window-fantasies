/**
 * roller-woven-motorization.ts. Seven Hunter Douglas product lines:
 * Roller & Solar Shades, Woven Woods, one Roman Shade collection, and
 * PowerView® Automation.
 *
 * ⛔ EVERY PRODUCT CLAIM IN THIS FILE TRACES TO A SOURCE. Hunter Douglas's
 * advertising policy requires a dealer's claims to correlate with the claims HD
 * itself makes, and bars unsubstantiated ones. The sources are the crawled HD
 * product pages under research/crawl/hunter-douglas/ plus the PowerView page at
 * research/crawl/more-products-services/services/window-covering-automation.md.
 * No openness percentage, UV number, material count, or battery life was
 * invented. If HD does not say it, it is not here.
 *
 * Per-line provenance:
 *   designer-screen-shades   shades/roller-shades/designer-screen.md
 *   designer-roller-shades   shades/roller-shades/designer-roller.md
 *   designer-banded-shades   shades/roller-shades/designer-banded.md
 *   skyline-...-panels       blinds/vertical-blinds/skyline.md
 *   provenance-...-shades    shades/woven-shades/provenance.md
 *   alustra-...-roman-shades shades/roman-shades/alustra-woven-textures-roman.md
 *   powerview-gen-3          more-products-services/services/window-covering-automation.md
 *
 * TRADEMARK NOTE. "Designer Screen Shades", "Designer Roller Shades" and
 * "Designer Banded Shades" carry NO symbol: they are absent from HD's 2025
 * trademark list, and asserting a registration HD does not assert is its own
 * violation. Skyline®, Provenance®, Alustra®, Woven Textures®, PowerView®,
 * Duolite®, ClearView®, LiteRise®, UltraGlide®, SoftTouch® take ®. EasyRise™
 * takes ™. See src/data/hunterDouglas.ts before editing any name here.
 *
 * POWERVIEW LEGAL COPY. The last paragraph of the powerview-gen-3 body is
 * mandatory manufacturer legal copy and is reproduced verbatim. Do not
 * paraphrase it, and do not add scheduling or app-control copy to another line
 * without carrying that sentence onto that line's page too.
 *
 * Photo paths and room labels come from
 * assets/hunter-douglas-brite/product-lines.json. Alt text describes what each
 * frame actually shows; the credit names Hunter Douglas as photographer and
 * manufacturer, which is true of their library images.
 */

import type { HDProductLine } from "./shades-sheers";

export const ROLLER_WOVEN_MOTORIZATION: HDProductLine[] = [
  /* ───────────────────────── Roller & Solar Shades ───────────────────────── */
  {
    slug: "designer-screen-shades",
    name: "Designer Screen Shades",
    shortName: "Screen Shades",
    siteCategory: "shades",
    hdCategory: "Roller & Solar Shades",
    tagline:
      "Designer Screen Shades curb harsh UV rays and hold on to your view at the same time.",
    body: [
      "Hunter Douglas Designer Screen Shades are what I bring out when a room has a view worth keeping and a sun problem that will not quit. The fabric is woven like a screen, so the daylight and the view come through while the harsh part of the sun gets cut down. Sunglasses for your windows.",
      "That protection matters more than people expect. UV is what fades a hardwood floor, a rug, and the arm of a sofa that sits in the afternoon sun. Designer Screen Shades keep furniture and flooring from fading, and they control sun and glare while you keep looking outside.",
      "The fabric opacity is the decision that changes the room, and there are five to choose from. There is also an Eco Collection crafted from recovered shoreline plastic or recycled yarns. I bring the samples to your house and hold them in your own window at the hour the sun actually bothers you, because that is the only way to know.",
    ],
    features: [
      "UV protection that keeps furniture and flooring from fading",
      "Five fabric opacities, so you set how much light and view come through",
      "An Eco Collection of fabrics crafted from recovered shoreline plastic or recycled yarns",
      "Beaded Loop control that moves the shade smoothly and evenly",
      "Optional Duolite® system or Dual Roller design for light control and privacy on one window",
      "Control options from PowerView® Automation and SoftTouch® Motorization to the UltraGlide® wand and LiteRise® cordless push and pull",
    ],
    faq: [
      {
        q: "Will I still be able to see out?",
        a: "Yes. The weave is open enough to hold the view during the day while it controls sun and glare. How much you see through comes down to the fabric opacity you pick, and there are five. I hold the samples in your own window so you look through them before you decide anything.",
      },
      {
        q: "Do screen shades give me privacy at night?",
        a: "A screen fabric is woven to keep the view, so it is not the fabric to lean on after dark. When a window needs both, I put two fabrics on it with the Duolite® system or a Dual Roller design: the screen for daytime sun and view, a second fabric for privacy at night.",
      },
      {
        q: "Which rooms do you put these in most?",
        a: "Rooms that take the afternoon sun and rooms with a view I do not want to cover. Sunrooms, west-facing living rooms, a kitchen window over the sink, and any room where the television washes out at four o'clock. If it is a bedroom you want dark, I will tell you a different product is the better fit and show you both.",
      },
    ],
    photos: [
      {
        src: "/images/product-lines/designer-screen-shades/designer-screen-shades-dss-pv-barista-4-living-room.webp",
        alt: "Designer Screen Shades covering a two-story window wall in a living room, with trees showing through the woven fabric above a brick fireplace.",
        credit: "Designer Screen Shades by Hunter Douglas",
      },
      {
        src: "/images/product-lines/designer-screen-shades/designer-screen-shades--dss-pv-panama-5-living-room.webp",
        alt: "Designer Screen Shades softening the glare in a bright oceanfront living room, with the horizon still visible through the fabric.",
        credit: "Designer Screen Shades by Hunter Douglas",
      },
      {
        src: "/images/product-lines/designer-screen-shades/designer-screen-shades-ss-pv-umbria-5-bedroom-after.webp",
        alt: "Designer Screen Shades lowered partway across the wraparound windows of a corner bedroom, layered under floor-length drapery panels.",
        credit: "Designer Screen Shades by Hunter Douglas",
      },
      {
        src: "/images/product-lines/designer-screen-shades/designer-screen-shades-020-dss-pv-empire-3-stairway.webp",
        alt: "A Designer Screen Shade on a tall stairway window, keeping the trees and patio in view while cutting the glare on the wood treads.",
        credit: "Designer Screen Shades by Hunter Douglas",
      },
      {
        src: "/images/product-lines/designer-screen-shades/designer-screen-shades-ss-pv-umbria-5-fabric-detail.webp",
        alt: "A close look at the woven fabric of a Designer Screen Shade above a window bench stacked with gray and taupe pillows.",
        credit: "Designer Screen Shades by Hunter Douglas",
      },
    ],
  },

  {
    slug: "designer-roller-shades",
    name: "Designer Roller Shades",
    shortName: "Roller Shades",
    siteCategory: "shades",
    hdCategory: "Roller & Solar Shades",
    tagline:
      "Designer Roller Shades keep a window simple: one flat fabric, a clean line, and over 370 options behind it.",
    body: [
      "Hunter Douglas Designer Roller Shades are the most versatile thing I hang. One flat fabric on a roller, a clean line across the top, nothing fussy to look at. They belong in a modern condo and they belong in an 1890s colonial, and people are always surprised how different two rollers can look depending on the fabric.",
      "The selection is the real story. Designer Roller Shades come in over 370 fabric options, from sheer to opaque, sourced from around the world, in textures, prints and patterns. That range is why I can put a roller in a room where somebody walked in convinced they wanted drapery.",
      "They move on a Beaded Loop, smoothly and evenly, and there are cordless and motorized options if you would rather have no cord at all. Add a decorative accent at the top or the bottom and a plain roller starts reading as custom, which it is.",
    ],
    features: [
      "Over 370 fabric options, from sheer to opaque, including exclusive fabrics",
      "Globally sourced fabrics in textures, prints and patterns",
      "Beaded Loop control that moves the shade smoothly and evenly",
      "Decorative accents available for the top or the bottom",
      "Optional Duolite® system or Dual Roller design for light control and privacy on one window",
      "Cordless and motorized control options, including PowerView® Automation, SoftTouch® Motorization, the UltraGlide® wand and LiteRise® push and pull",
    ],
    faq: [
      {
        q: "What is the difference between a roller shade and a solar screen?",
        a: "Same mechanism, different fabric. Designer Roller Shades run from sheer to opaque, so the fabric decides how much light the window gives you. Designer Screen Shades use a screen weave built to curb UV and control glare while holding the view. If the problem is sun on a window you want to look out of, I lean screen. If the problem is privacy or a room you want darker, I lean roller.",
      },
      {
        q: "Will a roller shade work on a bay or corner window?",
        a: "Yes. Designer Roller Shades are made for bay and corner windows, which covers most of the awkward glass in a New England house. Those openings need a measure that accounts for the angle, and I take every one myself.",
      },
      {
        q: "Can I get privacy and a view on the same window?",
        a: "That is what the Duolite® system and the Dual Roller design do. Two fabrics on one headrail, a sheer for the daytime and a heavier fabric for night, and you choose which one is down. Not every window in a house needs it. I will tell you which ones in yours actually do.",
      },
    ],
    photos: [
      {
        src: "/images/product-lines/designer-roller-shades/designer-roller-shades-017-drs-sky-pv-maya-heroshot.webp",
        alt: "Designer Roller Shades in a woven gray fabric lowered across a wide living room window, with a city skyline showing beneath the hem.",
        credit: "Designer Roller Shades by Hunter Douglas",
      },
      {
        src: "/images/product-lines/designer-roller-shades/designer-roller-shades-2020-drs-cc-amato-livingroom.webp",
        alt: "A cream Designer Roller Shade over a black-framed picture window in a formal living room, with flowering trees outside and a leather armchair beside it.",
        credit: "Designer Roller Shades by Hunter Douglas",
      },
      {
        src: "/images/product-lines/designer-roller-shades/designer-roller-shades-0-drs-sky-cc-formosa-kitchen.webp",
        alt: "Designer Roller Shades running across a row of windows in a modern kitchen with walnut cabinets and a concrete floor.",
        credit: "Designer Roller Shades by Hunter Douglas",
      },
      {
        src: "/images/product-lines/designer-roller-shades/designer-roller-shades--cc-abilene-livingroomdetail.webp",
        alt: "A close view of two textured Designer Roller Shades meeting at a corner window above a marble table.",
        credit: "Designer Roller Shades by Hunter Douglas",
      },
      {
        src: "/images/product-lines/designer-roller-shades/designer-roller-shades-rs-pv-abilene-bedroom-detail.webp",
        alt: "A soft white Designer Roller Shade lowered over a sunlit window, with a slim remote resting on a stack of books on the wood credenza below.",
        credit: "Designer Roller Shades by Hunter Douglas",
      },
    ],
  },

  {
    slug: "designer-banded-shades",
    name: "Designer Banded Shades",
    shortName: "Banded Shades",
    siteCategory: "shades",
    hdCategory: "Roller & Solar Shades",
    tagline:
      "Designer Banded Shades layer sheer and solid fabric in one shade: line the bands up for the view, stagger them for privacy.",
    body: [
      "Hunter Douglas Designer Banded Shades are a roller and a sheer in the same shade. Alternating bands of sheer and solid fabric run down one piece of fabric. Line the bands up and you get light and your view. Stagger them and the solid bands close the gaps. One shade, two jobs, changed with one pull.",
      "This is what I show the person who cannot decide between a shade and a sheer. Designer Banded Shades create varying dimensions of light through the day, and that is the part you feel in a room rather than see in a photograph. The bands come in a medium or a large height, and the fabrics run through colors, textures and geometric patterns.",
      "The headrail is covered in the same fabric, so the top of the window looks finished instead of mechanical. Opacities are light filtering and light dimming. If the view is the whole reason for the window, ask me about ClearView® sheers, which give you a better look through the open bands.",
    ],
    features: [
      "Alternating sheer and solid bands: aligned for light and view, staggered for privacy",
      "Light filtering and light dimming fabric opacities",
      "A medium or large band height, which changes the whole look of the window",
      "A fabric-covered headrail for a finished top",
      "Optional ClearView® sheers for superior view-through",
      "Control options including PowerView® Automation, a beaded loop, the UltraGlide® wand, LiteRise® push and pull, and SoftTouch® Motorization",
    ],
    faq: [
      {
        q: "How does one shade give me both privacy and a view?",
        a: "The fabric alternates sheer bands with solid bands. Line the bands up and the sheer sections sit over each other, so you see out. Move the shade a little and the solid bands slide across the sheer ones and close the gaps. Same shade, two settings, no second treatment on the window.",
      },
      {
        q: "Do they work on a slider or French doors?",
        a: "Yes. Designer Banded Shades are made for patio and sliding-glass doors and for French doors, along with bay and corner windows. Doors are where the measure matters most, because the treatment has to clear the handle and the swing. I take those measurements myself.",
      },
      {
        q: "What are ClearView® sheers?",
        a: "A sheer built for superior view-through, so what you see through the open bands is sharper. On a window where the view is the reason you are spending the money, it is worth asking about. On an interior window that faces a fence, I will tell you to skip it.",
      },
    ],
    photos: [
      {
        src: "/images/product-lines/designer-banded-shades/designer-banded-shades-d-pv-everly-shade-position-2.webp",
        alt: "Designer Banded Shades on two windows of a sunlit living room, bands aligned so the trees outside show through the sheer sections.",
        credit: "Designer Banded Shades by Hunter Douglas",
      },
      {
        src: "/images/product-lines/designer-banded-shades/designer-banded-shades-d-pv-everly-shade-position-3.webp",
        alt: "The same living room with one Designer Banded Shade open to the view and the second staggered closed for privacy.",
        credit: "Designer Banded Shades by Hunter Douglas",
      },
      {
        src: "/images/product-lines/designer-banded-shades/designer-banded-shades--fairy-glen-clearview-detail.webp",
        alt: "A close view of a gray Designer Banded Shade with the bands aligned on autumn foliage, beside a gray armchair and a dark wood side table.",
        credit: "Designer Banded Shades by Hunter Douglas",
      },
      {
        src: "/images/product-lines/designer-banded-shades/designer-banded-shades--bnd-pv-winslow-child-safety.webp",
        alt: "Designer Banded Shades on a double window in a bright playroom, with floor cushions and stuffed animals under the sill.",
        credit: "Designer Banded Shades by Hunter Douglas",
      },
      {
        src: "/images/product-lines/designer-banded-shades/designer-banded-shades-d-pv-everly-shade-position-4.webp",
        alt: "Designer Banded Shades in a living room with the left shade lowered to solid bands and the right shade raised partway.",
        credit: "Designer Banded Shades by Hunter Douglas",
      },
    ],
  },

  {
    slug: "skyline-gliding-window-panels",
    name: "Skyline® Gliding Window Panels",
    shortName: "Skyline® Panels",
    // Hunter Douglas file this under BLINDS on their own consumer site
    // (/hunter-douglas/blinds/vertical-blinds/skyline), and the media kit groups
    // it as "Panel Shades" -- their two sources disagree. We follow the consumer
    // site, because that is the taxonomy a reviewer compares against, and because
    // /products/blinds already lists Skyline in its features: filing the page
    // under "shades" meant the category that promoted it was not the category it
    // linked back to.
    siteCategory: "blinds",
    hdCategory: "Panel Shades",
    tagline:
      "Skyline® Gliding Window Panels are built for the wide openings: fabric panels that glide across and stack tightly at the side.",
    body: [
      "Hunter Douglas Skyline® Gliding Window Panels are what I bring to a wall of glass. Flat fabric panels hang from a track and glide sideways, and when they are open they stack tightly and leave the view unobstructed. Short window, tall window, a slider that takes up a whole wall: the panels handle all three.",
      "The panels come in two widths, 11½ inches or 17 inches, and the fabric collection runs over 450 color choices. An interlocking bottom weight keeps them hanging straight and moving smoothly, which is the difference between a panel system that feels expensive and one that does not.",
      "Ceiling mount them and Skyline® Gliding Window Panels stop being a window treatment and become a room divider. In an open floor plan that is a real solution, and it is one of the few times I get to fix a problem that has nothing to do with a window.",
    ],
    features: [
      "Fabric panels that glide across the opening and stack tightly when open",
      "Over 450 color choices in the fabric collection",
      "Panel widths of 11½ inches or 17 inches",
      "An interlocking bottom weight for smooth operation",
      "Ceiling mount them and they work as a room divider",
      "Wand control, or PowerView® Automation on the openings you would rather not walk to",
    ],
    faq: [
      {
        q: "What kind of window are these for?",
        a: "Short, tall and wide. They are the answer on a slider or a wall of glass, where one shade would be a monster to lift and a row of blinds would look busy. Open, the panels stack tightly to the side and the glass stays clear.",
      },
      {
        q: "Can I use them as a room divider?",
        a: "Yes, when they are ceiling mounted. In an open plan it is often the cleanest way to close off a space without framing a wall. I will tell you at the measure whether your ceiling will take the mount.",
      },
      {
        q: "How do they operate?",
        a: "A wand, or PowerView® Automation. On a very wide opening the motorized version earns its keep, because a long panel run is a long reach twice a day. On a single door, the wand is usually all you need and I will say so.",
      },
    ],
    photos: [
      {
        src: "/images/product-lines/skyline-gliding-window-panels/skyline-gliding-window-panels--wand-control-denton-kitchen.webp",
        alt: "Skyline® Gliding Window Panels drawn across a wide dining room window above a built-in bench, with a second set on the corner window beside it.",
        credit: "Skyline® Gliding Window Panels by Hunter Douglas",
      },
    ],
  },

  /* ───────────────────────────── Woven Woods ─────────────────────────────── */
  {
    slug: "provenance-woven-wood-shades",
    name: "Provenance® Woven Wood Shades",
    shortName: "Provenance® Woven Woods",
    siteCategory: "shades",
    hdCategory: "Woven Woods",
    tagline:
      "Provenance® Woven Wood Shades are handcrafted from wood, reeds, grasses and bamboo, and they give a room the texture paint cannot.",
    body: [
      "Hunter Douglas Provenance® Woven Wood Shades are handcrafted from wood, reeds, grasses and bamboo, and they are what I reach for when a room feels flat. A woven natural material catches the light differently at every hour of the day. It brings a touch of the outdoors in, and a smooth fabric shade simply does not do that.",
      "You are not locked into one shape. Provenance® Woven Wood Shades come in Roman, Waterfall Roman, Recessed Roman and Vertical Drapery styles, and the materials run from airy sheers to full opaques, including the refined, lighter weight Fine Weaves. A heavy weave and a Fine Weave in the same room are two completely different rooms.",
      "Natural material has to be built right or it fails, so these are made to resist stretching, bowing and breaking. If you want the weave and you also want the room private, an independent liner goes behind it for flexible light control and improved energy efficiency, and the Top-Down/Bottom-Up design gives you light at the top with privacy at the bottom.",
    ],
    features: [
      "Handcrafted from wood, reeds, grasses and bamboo",
      "Roman, Waterfall Roman, Recessed Roman and Vertical Drapery styles",
      "Materials from airy sheers to full opaques, including the lighter weight Fine Weaves",
      "Built for durability, with minimal stretching, bowing or breaking",
      "Optional independent liner for flexible light control and improved energy efficiency, or Top-Down/Bottom-Up for light and privacy on one shade",
      "Control options including PowerView® Automation, the UltraGlide® wand, LiteRise® push and pull, and the EasyRise™ cord loop",
    ],
    faq: [
      {
        q: "Do woven wood shades give you privacy?",
        a: "On their own, how much they give depends on how tight the weave is. The materials run from airy sheers all the way to full opaques. When a room needs real privacy and you still want the texture, I add the independent liner behind the weave, or I use Top-Down/Bottom-Up so the top is open and the bottom is covered.",
      },
      {
        q: "Which style should I pick?",
        a: "Roman, Waterfall Roman, Recessed Roman or Vertical Drapery, and the right one depends on the opening and where the stack sits in your sightline. That is a call I make standing in the room with the samples in my hand, not one you should make off a catalog page.",
      },
      {
        q: "Will they hold up?",
        a: "They are built to resist the stretching, bowing and breaking that ruins a natural-material shade, and they carry the Hunter Douglas Limited Lifetime Warranty, subject to the manufacturer's warranty terms. I stand behind every install I do. If something goes wrong, you call me and I answer.",
      },
    ],
    photos: [
      {
        src: "/images/product-lines/provenance-woven-wood-shades/provenance-woven-wood-shades-v-pv-calliope-coastal-living.webp",
        alt: "Provenance® Woven Wood Shades in a pale weave lowered across an ocean-view window and the French doors of a coastal living room.",
        credit: "Provenance® Woven Wood Shades by Hunter Douglas",
      },
      {
        src: "/images/product-lines/provenance-woven-wood-shades/provenance-woven-wood-shades-2023-prov-pv-antigua-kitchen.webp",
        alt: "Black Provenance® Woven Wood Shades on a tall kitchen window and a corner window, with a city view showing beneath the hem.",
        credit: "Provenance® Woven Wood Shades by Hunter Douglas",
      },
      {
        src: "/images/product-lines/provenance-woven-wood-shades/provenance-woven-wood-shades-2023-prov-pv-antigua-detail.webp",
        alt: "A close view of the folds and weave of a black Provenance® Woven Wood Shade raised above a city skyline.",
        credit: "Provenance® Woven Wood Shades by Hunter Douglas",
      },
    ],
  },

  /* ──────────────────────────── Roman Shades ─────────────────────────────── */
  {
    slug: "alustra-woven-textures-roman-shades",
    name: "The Alustra® Collection of Woven Textures®",
    shortName: "Alustra® Woven Textures®",
    siteCategory: "shades",
    hdCategory: "Roman Shades",
    tagline:
      "The Alustra® Collection of Woven Textures® Roman Shades puts exclusive, globally sourced fabrics into a tailored Roman fold.",
    body: [
      "The Alustra® Collection of Woven Textures® Roman Shades is where Hunter Douglas puts its exclusive fabrics, and the fabric is the whole reason to buy it. They are unique and globally sourced, including new fabrics from the designer Lori Weitzner. You are choosing a textile first and a window treatment second.",
      "The style is transitional, which is a designer's way of saying it will not fight the room it is in. The Alustra® Collection of Woven Textures® comes in sheer, semi-sheer and semi-opaque opacities, with a variety of top and bottom treatments to finish the shade.",
      "Because those are the three opacities, light control is the conversation to have up front. An independent liner behind the shade gives you flexible light control, and Top-Down/Bottom-Up gives you light at the top with privacy at the bottom. This is a product I want you to see in your own light before you decide. A photograph of a textile only tells you so much.",
    ],
    features: [
      "Exclusive, globally sourced fabrics, including new fabrics from designer Lori Weitzner",
      "Sheer, semi-sheer and semi-opaque fabric opacities",
      "A variety of top and bottom treatments for a finished look",
      "Optional independent liner for flexible light control",
      "Top-Down/Bottom-Up available for light control and privacy on one shade",
      "Control options including PowerView® Automation, the UltraGlide® wand, LiteRise® push and pull, and the EasyRise™ cord loop",
    ],
    faq: [
      {
        q: "What makes this collection different from a standard Roman shade?",
        a: "The fabric. The Alustra® Collection of Woven Textures® is exclusive and globally sourced, including new fabrics from designer Lori Weitzner, and the opacities run sheer, semi-sheer and semi-opaque. If the textile is what you care about, this is the book I open first.",
      },
      {
        q: "How much light will they let through?",
        a: "That depends which of the three opacities you choose: sheer, semi-sheer or semi-opaque. None of them is a blackout. If you want this fabric and you also want the room dark, the independent liner goes behind it, or Top-Down/Bottom-Up keeps the top open and the bottom closed. For a bedroom you need truly dark, I will show you a different product for that window.",
      },
      {
        q: "Where do these belong in a house?",
        a: "Anywhere people see them up close. Dining rooms, living rooms, a window you walk past every day. The texture is the reason to buy, so I put them where the texture gets noticed. On a back hallway window, I will steer you to something simpler.",
      },
    ],
    photos: [
      {
        src: "/images/product-lines/alustra-woven-textures-roman-shades/alustra-woven-textures-roman-shades--medium-detail-lori-weitzner.webp",
        alt: "The Alustra® Collection of Woven Textures® Roman Shades in a cream weave, lowered over dining room doors above a table set for dinner, with a garden beyond the glass.",
        credit: "The Alustra® Collection of Woven Textures® by Hunter Douglas",
      },
    ],
  },

  /* ──────────────────────────── Motorization ─────────────────────────────── */
  {
    slug: "powerview-gen-3",
    name: "PowerView® Automation",
    shortName: "PowerView®",
    siteCategory: "motorization",
    hdCategory: "Motorization",
    tagline:
      "PowerView® Automation runs your shades from an app, a remote, or a smart-home system.",
    body: [
      "PowerView® Automation is the motorization system from Hunter Douglas, and it is the upgrade people tell me they wish they had done sooner. You control and schedule your shades with the PowerView® App on your phone, with a handheld remote, or through a smart-home system, and you can voice activate them through that system.",
      "The real argument for it is the windows nobody ever touches. The two-story wall of glass, the shade over the kitchen sink, the row of windows in a sunroom. Automated window coverings make rooms more comfortable through the day, and they can be programmed to open and close at different times of the day to suit how you actually live. Snowbirds buy it for a different reason: you can be in Florida in February and still run the shades in Salem.",
      "The PowerView® App is required for programmed operation.",
    ],
    features: [
      "Control from the PowerView® App on your phone, a handheld remote, or a smart-home system",
      "Voice activation through your smart-home system",
      "Shades can be programmed to open and close at different times of the day",
      "Available on many Hunter Douglas lines, including roller and screen shades, woven woods, Roman shades and gliding panels",
      "Set up and programmed in your home by Jim, who does not leave until you have run it yourself once",
    ],
    faq: [
      {
        q: "What can I actually do with it?",
        a: "Open and close one shade, or a whole room of them, from the app, a remote, or a smart-home system, and voice activate them through that system. You can also set shades to open and close at different times of the day. The PowerView® App is required for programmed operation.",
      },
      {
        q: "Can PowerView® Automation be added to shades I already own?",
        a: "Sometimes, and sometimes not. It depends on the product and how old it is. Raise it at the consultation, and I will look at what is actually hanging in your windows and tell you straight whether it is worth doing or whether you are better off replacing the shade.",
      },
      {
        q: "Is it worth motorizing every window?",
        a: "No, and I will tell you which ones deserve it. Motorization earns its keep on the windows that are hard to reach, the ones too big to lift comfortably, and the ones you want moving on a routine. On a small window you open once a season, a cord or a wand is the honest answer.",
      },
    ],
    photos: [
      {
        src: "/images/product-lines/powerview-gen-3/powerview-gen-3-2025-hd-pv-pebble.webp",
        alt: "A rounded white PowerView® Automation remote with numbered channel buttons and open and close controls, resting on a linen-bound book on gold velvet.",
        credit: "PowerView® Automation by Hunter Douglas",
      },
      {
        src: "/images/product-lines/powerview-gen-3/powerview-gen-3-gateway-lb-0006.webp",
        alt: "A compact white PowerView® Automation gateway glowing softly on a stainless steel counter beside two white ceramic cups.",
        credit: "PowerView® Automation by Hunter Douglas",
      },
      {
        src: "/images/product-lines/powerview-gen-3/powerview-gen-3-able-battery-wand-lb-03-0041.webp",
        alt: "A rechargeable PowerView® Automation battery wand standing upright in its charging base on a kitchen counter, in front of a lowered shade.",
        credit: "PowerView® Automation by Hunter Douglas",
      },
      {
        src: "/images/product-lines/powerview-gen-3/powerview-gen-3-ebble-remote-clear-noglasses.webp",
        alt: "A frosted PowerView® Automation remote on a black oak console beside a walnut box and a row of books.",
        credit: "PowerView® Automation by Hunter Douglas",
      },
    ],
  },
];
