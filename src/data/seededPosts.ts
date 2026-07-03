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

export interface SeededPostSource {
  label: string;
  url: string;
}

export interface SeededPostParagraph {
  type: "p" | "h2" | "h3" | "ul" | "ol" | "table" | "sources";
  text?: string;
  items?: string[];
  /** type "table": column headers + rows. Comparison tables are a GEO lever (engines cite tables accurately). */
  headers?: string[];
  rows?: string[][];
  /** type "sources": the article's cited sources, rendered as a linked footnote block (Princeton GEO credibility trio). */
  sources?: SeededPostSource[];
}

export interface SeededPost {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  /** When set, renders a visible "Last updated" line and feeds Article schema dateModified (GEO freshness signal). */
  updatedAt?: string;
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
    updatedAt: "2026-07-03T12:00:00.000Z",
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
    updatedAt: "2026-07-03T12:00:00.000Z",
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
    updatedAt: "2026-07-03T12:00:00.000Z",
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

  {
    slug: "do-cellular-shades-lower-heating-bills",
    title: "Do cellular shades really lower your heating bill in New England?",
    excerpt:
      "Yes. According to the U.S. Department of Energy, about 30% of a home's heating energy is lost through windows, and tightly installed cellular shades can cut that heat loss by 40% or more. That works out to roughly 10% savings on your heating energy, which is real money in a New England winter.",
    publishedAt: "2026-07-01T13:00:00.000Z",
    updatedAt: "2026-07-03T12:00:00.000Z",
    authorName: "Jim Garrity",
    categoryName: "Energy Efficiency",
    categoryColor: "sage",
    categorySlug: "energy-efficiency",
    isFeatured: false,
    mainImageAlt:
      "Honeycomb cellular shades on a frost-edged New England window in soft winter light.",
    readingTimeMinutes: 5,
    body: [
      {
        type: "p",
        text: "Yes, cellular shades really do lower your heating bill, and the numbers come from the federal government, not a sales brochure. According to the U.S. Department of Energy, about 30 percent of a home's heating energy is lost through its windows, and tightly installed cellular shades can reduce that heat loss through the windows by 40 percent or more. That equates to about 10 percent savings on the energy you use to heat your home.",
      },
      {
        type: "p",
        text: "I am Jim Garrity. I have installed window treatments across New England for more than thirty years, and cellular shades are the product people ask me about most once the first heating bill of the season lands. Stand next to a bare window in Salem in January and you can feel why. The cold pours right through the glass.",
      },
      { type: "h2", text: "How much heat does a house lose through its windows?" },
      {
        type: "p",
        text: "More than most people think. The U.S. Department of Energy puts it at about 30 percent of a home's heating energy. The glass is the weakest link in your walls. Even a good double-pane window insulates far worse than the insulated wall around it, so every window in the house is a small open drain on your heating system all winter long.",
      },
      { type: "h2", text: "How does a honeycomb shade hold the heat in?" },
      {
        type: "p",
        text: "Look at a cellular shade from the side and you see rows of honeycomb-shaped cells. Each cell traps a pocket of still air, and that trapped air is the insulation. Lower the shade and you have put a soft blanket of air between your room and the cold glass. The Hunter Douglas Duette is the honeycomb shade I install most, and like every Hunter Douglas product it is guaranteed for life. It earns its keep twice: it insulates all winter and it looks beautiful doing it.",
      },
      { type: "h2", text: "What do the numbers actually say?" },
      {
        type: "ul",
        items: [
          "About 30 percent of a home's heating energy is lost through windows, per the U.S. Department of Energy.",
          "In heating seasons, tightly installed cellular shades can reduce heat loss through windows by 40 percent or more, which equates to about 10 percent heating energy savings.",
          "In cooling seasons, cellular shades can reduce unwanted solar heat through windows by up to 60 percent, so the same shade that warms your winter also cools your August.",
          "Conventional draperies drawn in cold weather can reduce heat loss from a warm room by up to 10 percent.",
        ],
      },
      {
        type: "p",
        text: "This is not just laboratory math. Researchers at Oak Ridge National Laboratory ran a field study on cellular shades in real homes and confirmed the savings. The science and the field data agree: the shade works.",
      },
      { type: "h2", text: "Do drapes do the same job?" },
      {
        type: "p",
        text: "Drapes help, and I sell plenty of custom drapery. The Department of Energy found that drawn draperies can cut heat loss from a warm room by up to 10 percent. But a cellular shade sits tight to the glass and traps air in engineered cells, so it does the insulating job better. In a lot of New England homes the best answer is both: a honeycomb shade against the glass for warmth, drapery over it for softness and style.",
      },
      { type: "h2", text: "Why does the installation matter so much?" },
      {
        type: "p",
        text: "Notice the Department of Energy says tightly installed cellular shades. That word is doing a lot of work. A shade with gaps at the sides lets warm air slip behind it and wash across the cold glass, and you lose a chunk of the benefit. This is why I measure it, I design it, and I install it myself. A shade cut and fitted to your exact opening is what earns the 40 percent number.",
      },
      {
        type: "p",
        text: "If you want to know what cellular shades would actually save in your house, start with your coldest room. Request a free in-home consultation or call me at (603) 891-5755, and I will bring the samples, take the measurements, and give you an honest answer.",
      },
      {
        type: "sources",
        sources: [
          {
            label: "U.S. Department of Energy, Energy Saver: Energy Efficient Window Coverings",
            url: "https://www.energy.gov/energysaver/energy-efficient-window-coverings",
          },
          {
            label: "Oak Ridge National Laboratory: Pulling the Shades for Energy Savings",
            url: "https://www.ornl.gov/news/pulling-shades-energy-savings",
          },
          {
            label: "Hunter Douglas: Energy Efficient Blinds and Shades",
            url: "https://www.hunterdouglas.com/energy-efficiency",
          },
        ],
      },
    ],
  },

  {
    slug: "are-corded-blinds-safe-for-kids",
    title: "Are corded blinds safe for kids? What New England parents should know",
    excerpt:
      "Corded blinds are a documented hazard for young children. The Consumer Product Safety Commission reports that on average about 9 children under 5 die each year from window cord strangulation, and it recommends cordless window coverings in any home where children live or visit. Cordless and motorized options remove the risk entirely.",
    publishedAt: "2026-06-26T13:00:00.000Z",
    updatedAt: "2026-07-03T12:00:00.000Z",
    authorName: "Jim Garrity",
    categoryName: "Child Safety",
    categoryColor: "gold",
    categorySlug: "child-safety",
    isFeatured: false,
    mainImageAlt:
      "A nursery with cordless cellular shades and a crib in soft daylight.",
    readingTimeMinutes: 6,
    body: [
      {
        type: "p",
        text: "Corded blinds are not safe in a home with young children, and that is not my opinion. It is the finding of the U.S. Consumer Product Safety Commission, which lists corded window coverings among the top five hidden hazards in American homes. On average, about 9 children under the age of 5 die each year from window cord strangulation. The CPSC recommends cordless window coverings in any home where children live or even visit, and every treatment I sell today can be made with no accessible cords at all.",
      },
      {
        type: "p",
        text: "Before window fashions, I spent thirty years as a fire lieutenant. I learned in that job that most tragedies in a home are quiet ones, hazards that sat in plain sight for years before anyone noticed them. So when I talk to parents and grandparents about window cords, I am not selling. I am telling you what I would want someone to tell my own family.",
      },
      { type: "h2", text: "What does the CPSC say about window cords?" },
      {
        type: "p",
        text: "The Consumer Product Safety Commission has tracked this hazard for decades. A dangling cord sits at exactly the height of a curious toddler, and a child can become entangled in seconds, silently, often while a parent is in the next room. That is why the CPSC puts corded window coverings on its list of the top five hidden home hazards, and why its guidance is simple: in any home where young children live or visit, use cordless window coverings.",
      },
      { type: "h2", text: "What changed with the 2022 federal safety standard?" },
      {
        type: "p",
        text: "In November 2022, the CPSC issued a federal safety standard for custom window coverings. The finding behind it is blunt: custom window coverings with accessible operating cords longer than 8 inches pose an unreasonable risk of strangulation to children 8 years old and younger. Custom products made today must be cordless or use short, inaccessible cords. The industry's own standard, ANSI/WCMA A100.1-2022, was revised the same way. Everything I order for you is built to meet it.",
      },
      { type: "h2", text: "Which windows should go cordless first?" },
      {
        type: "ul",
        items: [
          "The nursery and any room where a child sleeps. A crib should sit away from the window, and the window itself should have nothing dangling.",
          "Any window a bed, couch, or climbable piece of furniture sits near. Kids climb, and a cord within reach from a perch is the classic scenario.",
          "Playrooms and family rooms, where children spend unsupervised minutes every day.",
          "Grandparents' homes. The CPSC guidance says live or visit, and a weekend at Grandma's counts.",
        ],
      },
      { type: "h2", text: "What are the cordless options?" },
      {
        type: "p",
        text: "You do not give anything up by going cordless. Hunter Douglas LiteRise is the simplest option: you push the bottom rail up or pull it down with your hand, it stays exactly where you leave it, and there is no cord anywhere on the window. PowerView motorization goes a step further and removes cords entirely from the equation. The shade moves from a remote, an app, or a schedule, which also solves the tall windows and the ones behind the couch.",
      },
      { type: "h2", text: "What should I do about the corded blinds I already own?" },
      {
        type: "p",
        text: "Start today, before you buy anything. Move cribs, beds, and anything a child can climb away from windows with cords, and keep every cord wrapped up high out of reach. Those steps reduce the risk, but the honest fix is replacing the corded treatments in the rooms where children spend time. You do not have to do the whole house at once. Do the nursery and the playroom first, and we can work through the rest as budget allows.",
      },
      {
        type: "p",
        text: "If you have cords in a home where children live or visit, let me take a look. The consultation is free, we sit down at your kitchen table, and I will give you a straight answer about which windows matter most and what it costs to make them safe. Request a free in-home consultation or call me at (603) 891-5755.",
      },
      {
        type: "sources",
        sources: [
          {
            label: "Federal Register: Safety Standard for Operating Cords on Custom Window Coverings (CPSC, 2022)",
            url: "https://www.federalregister.gov/documents/2022/11/28/2022-25041/safety-standard-for-operating-cords-on-custom-window-coverings",
          },
          {
            label: "U.S. Consumer Product Safety Commission: Are Your Window Coverings Safe?",
            url: "https://www.cpsc.gov/Newsroom/Video/Are-Your-Window-Coverings-Safe",
          },
          {
            label: "Window Covering Manufacturers Association: Revised Safety Standard (ANSI/WCMA A100.1-2022)",
            url: "https://windowcoverings.org/revised-safety-standard-2022/",
          },
        ],
      },
    ],
  },

  {
    slug: "blinds-vs-shades-vs-shutters",
    title: "Blinds vs. shades vs. shutters: which is right for your home?",
    excerpt:
      "Blinds are hard slats you tilt, shades are soft fabric you raise and lower, and shutters are hinged louvered panels built onto the window like millwork. Blinds give precise light control at a friendly price, shades bring softness and insulation, and shutters last the longest and read as part of the house. The right choice comes down to the room.",
    publishedAt: "2026-06-17T13:00:00.000Z",
    updatedAt: "2026-07-03T12:00:00.000Z",
    authorName: "Jim Garrity",
    categoryName: "Buying Guide",
    categoryColor: "gold",
    categorySlug: "buying-guide",
    isFeatured: false,
    mainImageAlt:
      "A room corner with white plantation shutters in the foreground and a roman shade on the adjacent window.",
    readingTimeMinutes: 6,
    body: [
      {
        type: "p",
        text: "Here is the difference in one breath. Blinds are hard slats of wood, faux wood, or metal that tilt open and closed. Shades are soft fabric that raises, lowers, or glides across the window. Shutters are hinged, louvered panels mounted to the window itself, like a piece of millwork. Blinds give you precise light control at an approachable price, shades give you softness and insulation, and shutters give you permanence. The right answer depends on the room, and I will walk you through it room by room.",
      },
      {
        type: "p",
        text: "I have spent more than thirty years helping New England homeowners make this exact choice, and I can tell you the most expensive option is not automatically the right one. My job is to match the treatment to the room, the light, and the way you live in it.",
      },
      { type: "h2", text: "What is the difference between blinds, shades, and shutters?" },
      {
        type: "p",
        text: "The table below is how I explain it at a consultation. Read the row that matches what you care about most, whether that is light, warmth, moisture, or how long it lasts.",
      },
      {
        type: "table",
        headers: ["Treatment", "What it is", "Best for", "Light control", "Lifespan feel"],
        rows: [
          [
            "Blinds",
            "Hard slats of wood, faux wood, or metal that tilt open and closed",
            "Kitchens, baths, home offices, budget-minded rooms",
            "Precise. Tilt the slats to aim daylight exactly where you want it",
            "Solid for years. Quality faux wood shrugs off moisture; cheap vinyl warps and yellows",
          ],
          [
            "Shades",
            "Soft fabric that raises, lowers, or glides, from sheer to true blackout",
            "Bedrooms, living rooms, any room where comfort and insulation matter",
            "The widest range of the three, set by your fabric and opacity choice",
            "Excellent with quality fabric, and built to be repaired rather than thrown away",
          ],
          [
            "Shutters",
            "Hinged, framed panels with louvers, mounted to the window like millwork",
            "Formal rooms, coastal homes, anyone thinking about resale",
            "Strong. Louvers tilt like blinds and the panels swing fully open",
            "The longest of the three. Shutters read as part of the house itself",
          ],
        ],
      },
      { type: "h2", text: "Which is right for a bedroom?" },
      {
        type: "p",
        text: "A shade, almost every time. Bedrooms need darkness for sleep and warmth in winter, and a honeycomb shade with a room-darkening or blackout fabric delivers both. Nothing tilts, nothing rattles, and the fabric hushes the room. For kids' rooms I spec them cordless as a matter of course.",
      },
      { type: "h2", text: "Which is right for a kitchen or bathroom?" },
      {
        type: "p",
        text: "This is where moisture makes the call. Steam and humidity are hard on delicate fabrics, so over a sink or a tub I reach for faux wood blinds or a polysatin shutter like the Hunter Douglas Palm Beach line. Both wipe clean with a damp cloth and neither cares how long your shower runs.",
      },
      { type: "h2", text: "Which is right for a living room?" },
      {
        type: "p",
        text: "The living room is where light does the most work, so I let the light decide. If you love bright daylight but hate glare, a sheer shading like the Hunter Douglas Silhouette shapes the sun beautifully. If the house leans traditional or coastal, shutters give the room a finished, architectural feel. Both are right answers; they are just different rooms to live in.",
      },
      { type: "h2", text: "Which adds the most long-term value?" },
      {
        type: "p",
        text: "Shutters have the strongest claim. They mount to the window itself, they stay with the house when you sell, and buyers read them as a built-in feature rather than a furnishing. That said, the treatment that adds the most value to your life is the one matched to the room. A blackout shade in the bedroom of a night-shift nurse is worth more than any shutter.",
      },
      { type: "h2", text: "How do I decide without guessing?" },
      {
        type: "ul",
        items: [
          "Start with the room's job: sleep, cooking, bathing, gathering. The job narrows the field fast.",
          "Then the light: do you want to aim it, soften it, or block it?",
          "Then moisture: kitchens and baths rule out delicate fabrics on their own.",
          "Then the house itself: a 1780 colonial and a new lake house want different things.",
          "Then budget, honestly. There is a right answer at every price point, and I will tell you which one it is.",
        ],
      },
      {
        type: "p",
        text: "You do not have to sort this out from a website. I bring the showroom to you, hold real samples in your own windows, and tell you which of the three actually fits each room. Request a free in-home consultation or call me at (603) 891-5755.",
      },
    ],
  },

  {
    slug: "best-window-treatments-for-sliding-glass-doors",
    title: "What are the best window treatments for sliding glass doors and big windows?",
    excerpt:
      "The best treatments for sliding glass doors are vertical sheers like the Hunter Douglas Luminette, panel-track systems, vertical cellular shades, and custom drapery. The right one depends on how often you use the door, what the view is worth, and where the sun hits. Old vertical vinyl blinds are the one option I steer people away from.",
    publishedAt: "2026-06-09T13:00:00.000Z",
    updatedAt: "2026-07-03T12:00:00.000Z",
    authorName: "Jim Garrity",
    categoryName: "Buying Guide",
    categoryColor: "gold",
    categorySlug: "buying-guide",
    isFeatured: false,
    mainImageAlt:
      "Sheer vertical panels on a wide sliding glass door opening to a green backyard.",
    readingTimeMinutes: 6,
    body: [
      {
        type: "p",
        text: "The best window treatments for sliding glass doors are vertical sheers like the Hunter Douglas Luminette, panel-track systems that glide flat fabric panels along a rail, vertical cellular shades, and custom drapery. Each one moves side to side the way the door does, stacks out of the way, and covers a wide span cleanly. The right pick depends on three things: how often the door gets used, what is on the other side of the glass, and where the sun hits.",
      },
      {
        type: "p",
        text: "New England gave us some of the best walls of glass anywhere: lake houses on Winnipesaukee, coastal places on Cape Cod, great rooms that frame a treeline. A slider or a picture-window wall is usually the biggest opening in the house, which makes it the biggest glare problem, the biggest heat-loss problem, and the biggest privacy question all at once. It deserves better than the builder-grade vinyl it probably came with.",
      },
      { type: "h2", text: "Why do old vertical vinyl blinds disappoint?" },
      {
        type: "p",
        text: "You know the ones. The vanes yellow in the sun, they warp, they clatter every time the heat kicks on or the door slides, and sooner or later one carrier breaks so a single vane hangs crooked forever. Cheap vinyl verticals date a room the way shag carpet does. They were the default in the eighties because nothing better existed for wide openings. Better exists now.",
      },
      { type: "h2", text: "What should I use instead?" },
      {
        type: "p",
        text: "Hunter Douglas publishes a buyer's guide for sliding glass door treatments, and the four options below are the ones from it that I install most across New England.",
      },
      { type: "h3", text: "Luminette vertical sheers" },
      {
        type: "p",
        text: "The Luminette is the treatment that made people forget vertical blinds. Soft sheer fabric hangs like a drape, with rotating vanes inside it, so you swing from an open view to soft filtered light to full privacy. On a lake or ocean view they are sunglasses for your windows: the glare off the water disappears and the view stays.",
      },
      { type: "h3", text: "Panel-track gliding panels" },
      {
        type: "p",
        text: "A panel-track system, like the Hunter Douglas Skyline, glides large flat fabric panels along a rail. The look is clean and modern, the panels stack tight to one side, and it handles very wide spans with ease. If your house leans contemporary, this is usually my first suggestion.",
      },
      { type: "h3", text: "Vertical cellular shades" },
      {
        type: "p",
        text: "This is the honeycomb shade turned on its side: the same air-trapping cells that insulate a window, built to traverse a door. A big slider leaks a lot of heat in a New England winter, and a vertical cellular shade is the option that actually does something about it. It stacks into a compact column when you want the whole opening clear.",
      },
      { type: "h3", text: "Custom drapery" },
      {
        type: "p",
        text: "Drapery is the classic for a reason. Full-height panels soften a big glass wall, give you true blackout if you want it, and layer beautifully over a sheer or a cellular shade. For a formal room or a dramatic two-story window, custom drapery is still the most beautiful answer there is.",
      },
      { type: "h2", text: "How do I choose between them?" },
      {
        type: "ol",
        items: [
          "Ask how often the door opens. A daily-use slider needs a treatment that stacks fully clear of the opening, so nothing gets pushed through or caught.",
          "Ask what the glass looks out on. A water view or a wooded lot deserves a sheer that keeps the view. A neighbor's driveway makes privacy the priority.",
          "Ask where the sun comes from. West-facing glass takes hard afternoon glare and UV that fades floors, so light control leads. North-facing glass can go softer.",
          "Ask if the room runs cold in winter. If you can feel the slider from the couch in January, insulation matters, and that points to vertical cellular.",
        ],
      },
      { type: "h2", text: "What about tall windows and whole walls of glass?" },
      {
        type: "p",
        text: "The bigger the treatment, the stronger the case for PowerView motorization. A wide bank of panels or a two-story drape glides open at the touch of a button or on a schedule, with no wand to crank and no cord to haul. On tall great-room glass, motorization is the difference between a treatment you use every day and one you gave up on by February.",
      },
      {
        type: "p",
        text: "If you have a slider or a wall of glass wearing tired vinyl, let me show you what it could look like instead. I come to you, measure the actual opening, and hold real fabric in your real light. Request a free in-home consultation or call me at (603) 891-5755.",
      },
      {
        type: "sources",
        sources: [
          {
            label: "Hunter Douglas Buyer's Guide: Window Treatments for Sliding-Glass Doors",
            url: "https://www.hunterdouglas.com/stories/buyers-guides/window-treatments-patio-sliding-glass-doors",
          },
        ],
      },
    ],
  },

  {
    slug: "how-long-do-blinds-last",
    title: "How long do blinds last, and should you repair or replace them?",
    excerpt:
      "Most window treatments last about seven to eight years on average, and budget aluminum or vinyl blinds often give out in three to five. Quality wood and premium custom products last far longer. If yours is a Hunter Douglas, the repair is often free under the lifetime guarantee, so check that before you pay for a replacement.",
    publishedAt: "2026-05-28T13:00:00.000Z",
    updatedAt: "2026-07-03T12:00:00.000Z",
    authorName: "Jim Garrity",
    categoryName: "Service and Repair",
    categoryColor: "cream",
    categorySlug: "service-and-repair",
    isFeatured: false,
    mainImageAlt:
      "Hands dusting warm wood blinds in soft morning light, the kind of simple care that stretches a blind's lifespan.",
    readingTimeMinutes: 5,
    body: [
      {
        type: "p",
        text: "Most window treatments last about seven to eight years on average, according to Gotcha Covered, a national window treatment company. Budget aluminum and vinyl blinds often give out in three to five years, while quality wood and premium custom products last far longer. And if the blind in question is a Hunter Douglas, the repair is often free under the lifetime guarantee, which changes the repair-or-replace math entirely.",
      },
      {
        type: "p",
        text: "I am Jim Garrity. I have installed and repaired window treatments across New England for more than thirty years, and I will give you the honest version: some blinds are worth fixing, some are not, and the answer depends on what is hanging in your window.",
      },
      { type: "h2", text: "How long do different blinds actually last?" },
      {
        type: "p",
        text: "The industry numbers line up closely. Gotcha Covered put the average lifespan of home window treatments at about seven to eight years in a March 2024 guide. Shop Love Is Blinds, a Hunter Douglas certified dealer in Missouri, breaks it down by material, and their ranges match what I see in New England homes every week.",
      },
      {
        type: "table",
        headers: ["Material", "Typical lifespan", "Repair outlook"],
        rows: [
          [
            "Budget aluminum or vinyl blinds",
            "3 to 5 years",
            "Rarely worth repairing. A replacement often costs about the same as the fix.",
          ],
          [
            "Wood and faux wood blinds",
            "5 to 10 years",
            "Worth repairing while the slats are sound. Moisture warping is usually the end.",
          ],
          [
            "Fabric and cellular shades",
            "7 to 10 years",
            "Cords and mechanisms can be repaired. Faded or frayed fabric cannot.",
          ],
          [
            "Hunter Douglas custom treatments",
            "Far longer with basic care",
            "Repair first. The lifetime guarantee typically covers the repair itself.",
          ],
        ],
      },
      { type: "h2", text: "What are the signs you need to replace your blinds?" },
      {
        type: "p",
        text: "Age alone is not the verdict. Look for these instead:",
      },
      {
        type: "ul",
        items: [
          "Slats that are bent, cracked, or warped so they no longer close flush. That means light leaks and lost privacy.",
          "Cords that are frayed, tangled, or need a hard yank. Frayed cords are also a safety hazard around young children.",
          "Fading or yellowing across a large share of the slats, especially on the sunny side of the house.",
          "Lift or tilt mechanisms that grind, slip, or stopped responding.",
          "Rooms that run hotter in summer and colder in winter than they used to. Worn treatments lose their insulating value.",
          "A style that fights the room after a remodel.",
        ],
      },
      {
        type: "p",
        text: "One broken slat is a repair. Most of that list at once is a replacement.",
      },
      { type: "h2", text: "How does the Hunter Douglas lifetime guarantee change the math?" },
      {
        type: "p",
        text: "Hunter Douglas products are guaranteed for life. If a cord, a mechanism, or an internal part fails, the repair itself is typically free under warranty, even if you bought the treatment from a shop that has since closed. So before anyone sells you a replacement, the first honest question is: is this a Hunter Douglas? If it is, I will tell you to repair it before I will ever quote you a new one.",
      },
      {
        type: "p",
        text: "The authorized service center for our area is Goedecke Design in Bedford, New Hampshire. I call it the hospital for your blind. You can drop your treatment off there yourself, and the warranty repair costs you nothing but the drive. If you would rather skip the errand, I will take the blind down, deliver it, bring it back, and reinstall it for a flat service fee I quote before anything happens.",
      },
      { type: "h2", text: "When is replacement the smarter call?" },
      {
        type: "p",
        text: "Replacement wins when a budget blind is near the end of its life, when fabric has faded past saving, or when your needs have changed: blackout for a new nursery, cordless because the grandkids visit, motorization for the two-story window nobody can reach. A repair cannot fix a shade that was never right for the room.",
      },
      {
        type: "p",
        text: "If you are staring at a tired blind and wondering which way to go, ask me. Tell me what broke and I will give you the honest path, repair or replace, before you spend a dollar. Request a free in-home consultation or call me at (603) 891-5755.",
      },
      {
        type: "sources",
        sources: [
          {
            label: "Gotcha Covered: Signs You Need to Replace Your Window Treatments (March 2024)",
            url: "https://www.gotchacovered.com/blog/2024/march/signs-you-need-to-replace-your-window-treatments/",
          },
          {
            label: "Shop Love Is Blinds: How Do I Know When It's Time to Replace My Blinds?",
            url: "https://www.shoploveisblinds.com/how-do-i-know-when-its-time-to-replace-my-blinds",
          },
        ],
      },
    ],
  },

  {
    slug: "do-blackout-shades-help-you-sleep",
    title: "Do blackout shades actually help you sleep better?",
    excerpt:
      "Yes, for many people they do. Peer-reviewed research links light in the bedroom at night to circadian disruption and reduced melatonin, and a blackout shade removes that light at the source. The key is choosing honestly between room darkening and true blackout, because they are different products.",
    publishedAt: "2026-05-20T13:00:00.000Z",
    updatedAt: "2026-07-03T12:00:00.000Z",
    authorName: "Jim Garrity",
    categoryName: "Sleep and Comfort",
    categoryColor: "sage",
    categorySlug: "sleep-and-comfort",
    isFeatured: false,
    mainImageAlt:
      "A dark, serene bedroom with blackout cellular shades holding back all but a thin edge of morning light.",
    readingTimeMinutes: 5,
    body: [
      {
        type: "p",
        text: "Yes, for a lot of people blackout shades make a real difference. Peer-reviewed research shows that light in the bedroom at night disrupts your circadian rhythm and interferes with melatonin, the hormone that tells your body it is time to sleep. A true blackout shade removes that light at the source, so the room stays dark until you decide otherwise.",
      },
      {
        type: "p",
        text: "I have put blackout shades into hundreds of New England bedrooms, and the note I get afterward is almost always the same: I did not know this room could get that dark. So let me cover what the science supports, who benefits most, and the honest difference between room darkening and blackout.",
      },
      { type: "h2", text: "What does the science say about light and sleep?" },
      {
        type: "p",
        text: "Researchers on the Sister Study, a large study of women's health published through the National Institutes of Health, reported that exposure to artificial light at night likely causes circadian disruption, and that late-night light exposure is associated with reduced melatonin. In that study, women who slept with a light or a television on had more short sleep and more insomnia symptoms than women who slept in the dark.",
      },
      {
        type: "p",
        text: "WebMD's consumer overview of blackout curtains puts it in plain terms: keeping light out of the bedroom prevents it from disrupting melatonin production, which helps you fall asleep faster and stay asleep longer. None of this is fringe science. Darkness is one of the strongest sleep signals your body has, and your windows are where the light gets in.",
      },
      { type: "h2", text: "Who benefits most from blackout shades?" },
      {
        type: "ul",
        items: [
          "Light sleepers. If a streetlight, headlights, or a neighbor's porch light wakes you, a blackout shade solves it at the window instead of with an eye mask.",
          "Night-shift workers. Nurses, first responders, plant workers. Sleeping at 9 a.m. requires a room your body believes is nighttime.",
          "Kids and nap schedules. A genuinely dark room makes a 1 p.m. nap possible in July, and a 7 p.m. bedtime possible before sunset.",
          "Anyone in New England in June. The summer sun comes up around 5 a.m. here. Your alarm should decide when your day starts, not the sunrise.",
        ],
      },
      { type: "h2", text: "What is the difference between room darkening and blackout?" },
      {
        type: "p",
        text: "They are different products, and the industry blurs the two. Room-darkening fabrics block most light but let a soft glow through. Blackout fabrics block essentially all light through the fabric itself. Room darkening is the right call for most adults who want a restful room that still hints at morning. True blackout is the right call for shift workers, nurseries, and anyone whose sleep is fragile. I will tell you which one your situation actually needs, because selling a night nurse a room-darkening shade helps nobody.",
      },
      {
        type: "p",
        text: "One more honest note: even a blackout fabric leaks light around its edges, because a shade needs a little clearance to move inside the window frame. That thin halo around the shade is called the light gap, and it is the part most blackout products never solve.",
      },
      { type: "h2", text: "How do you get true blackout without the light gap?" },
      {
        type: "p",
        text: "This is where Hunter Douglas earns its reputation. The Duette shade with the LightLock option adds side channels that overlap the edges of the shade, so light has no path around it. It is the closest thing to genuine darkness I can put in a window, and I have watched it turn a sunlit bedroom to midnight in the middle of the afternoon. Paired with PowerView motorization, it can even close itself on a schedule before you head to bed.",
      },
      {
        type: "p",
        text: "If sleep is the problem, tell me about the room. I bring the actual fabrics to your home, hold them in your own window, and show you the difference between room darkening and blackout in your own light, right at your kitchen table. Request a free in-home consultation or call me at (603) 891-5755.",
      },
      {
        type: "sources",
        sources: [
          {
            label:
              "Exposure to indoor light at night in relation to multiple dimensions of sleep health: findings from the Sister Study (PubMed Central, PMC10851850)",
            url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10851850/",
          },
          {
            label: "WebMD: What to Know About Blackout Curtains",
            url: "https://www.webmd.com/sleep-disorders/what-to-know-about-blackout-curtains",
          },
        ],
      },
    ],
  },

  {
    slug: "do-window-treatments-add-home-value",
    title: "Do plantation shutters and custom window treatments add home value?",
    excerpt:
      "Real estate professionals consistently treat plantation shutters as a value-add because they read as permanent architecture and sell with the house. Basic blinds are expected and add no premium. Quality window treatments still earn their keep by helping a home show and photograph better.",
    publishedAt: "2026-05-12T13:00:00.000Z",
    updatedAt: "2026-07-03T12:00:00.000Z",
    authorName: "Jim Garrity",
    categoryName: "Home Value",
    categoryColor: "gold",
    categorySlug: "home-value",
    isFeatured: false,
    mainImageAlt:
      "A classic New England colonial living room with crisp white plantation shutters, styled like a real estate listing photo.",
    readingTimeMinutes: 5,
    body: [
      {
        type: "p",
        text: "Plantation shutters are the one window treatment real estate professionals consistently treat as a value-add. They read as permanent architecture, they convey with the house, and agents call them out by name in listings. Basic blinds add no premium, because buyers simply expect them. Quality window treatments earn their keep a different way: they help a home show better, photograph better, and feel finished.",
      },
      {
        type: "p",
        text: "I am Jim Garrity, and after more than thirty years installing window treatments across New England, shutters are the only product I hear buyers ask for by name. What follows is what agents and appraisers actually say, not what a brochure says.",
      },
      { type: "h2", text: "What do real estate professionals say about plantation shutters?" },
      {
        type: "p",
        text: "Sherry Ajluni, a real estate CEO with Compass in Atlanta, told the shutter dealer Acadia Shutters that plantation shutters \"do add value to the sale\" and pointed out that shutters have their own selection field in the MLS listing agents use to market a home. In the same piece, Candy Watts, an appraiser with more than twelve years and thousands of appraisals behind her, said quality shutters \"will bring you the most money back\" among window treatments.",
      },
      {
        type: "p",
        text: "That squares with what the realtors I work with across New England tell me. Shutters read as part of the house, like wainscoting or built-ins. Blinds read as furnishings the last owner happened to leave behind.",
      },
      { type: "h2", text: "Why do shutters count when basic blinds do not?" },
      {
        type: "ul",
        items: [
          "Shutters are fixtures. They are custom-built to the opening and mounted to the frame, so they sell with the house.",
          "Shutters are a named feature. Agents can select them in the MLS and feature them in listing copy. Nobody writes listing copy about vinyl mini blinds.",
          "Shutters never look temporary. A white louvered shutter reads as millwork, and millwork holds its appeal across decades.",
          "Shutters photograph clean. Crisp louvers frame a window in listing photos the way good trim does.",
        ],
      },
      {
        type: "p",
        text: "Covering Windows, a window treatment company, makes the same point from the blinds side: standard blinds rarely move the sale price on their own. What they move is perceived value, meaning how the home looks and feels when a buyer walks through the door.",
      },
      { type: "h2", text: "Do window treatments help a home sell, even without raising the price?" },
      {
        type: "p",
        text: "The agents say yes, and for a simple reason: buyers want a home that feels done. Ajluni put it plainly in that same interview, saying today's buyers are picky, want everything handled for them, and \"love having nice window treatments already in place.\" A home with finished windows shows better in person, reads better in photos, and signals a house that has been cared for.",
      },
      {
        type: "p",
        text: "I will give you the same straight answer I give at every consultation: nobody can honestly promise you a specific dollar return on a window treatment, and I would rather lose a sale than invent a number. The verifiable claim is qualitative, and the professionals agree on it. Shutters carry weight with buyers. Bare or broken blinds cost you.",
      },
      { type: "h2", text: "What should you buy if you might sell someday?" },
      {
        type: "p",
        text: "Buy quality that outlives trends. A classic white plantation shutter looked right in a New England colonial forty years ago and it looks right today. Hunter Douglas builds theirs to last, stands behind them with a lifetime guarantee, and I measure, design, and install them myself so they fit the opening like they were born there. Save the fashion-forward fabrics for rooms you will enjoy them in. The shutter is the safe bet on the windows a buyer will judge.",
      },
      {
        type: "p",
        text: "If you are weighing shutters, or any treatment, for a home you might sell one day, let us talk it through. I bring the showroom to you, we look at your actual windows, and you get a real installed price with no guessing. Request a free in-home consultation or call me at (603) 891-5755.",
      },
      {
        type: "sources",
        sources: [
          {
            label: "Acadia Shutters: Do Window Treatments Increase Home Value?",
            url: "https://www.acadiashutters.com/do-window-treatments-increase-home-value-2/",
          },
          {
            label: "Covering Windows: Do Blinds Add Value to a Home? Here's What Real Estate Experts Say",
            url: "https://coveringwindows.com/do-blinds-add-value-to-a-home/",
          },
        ],
      },
    ],
  },
];
