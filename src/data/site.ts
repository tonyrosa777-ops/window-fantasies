/**
 * site.ts — All site copy and content lives here.
 * Source of truth for every component (no hard-coded strings).
 *
 * Window Fantasies LLC — owner Jim Garrity. Authorized Hunter Douglas Dealer
 * serving all of New England. Voice: educate, do not sell (voice-and-tone.md).
 * Facts: facts-of-record.md wins on conflicts.
 *
 * Public contact ONLY: phone (603) 891-5755, email windowfantasies@gmail.com,
 * office 280 Main Street, Salem, NH 03079. NEVER publish Jim's personal cell.
 *
 * Zero em dashes in any string literal (CLAUDE.md §13 absolute rule).
 *
 * ⚠️ HUNTER DOUGLAS COMPLIANCE. This site operates under HD's Independent
 * Website Waiver program and is reviewed against a 10-point form; failing it
 * delists windowfantasies.com from the hunterdouglas.com dealer locator. Before
 * writing ANY string in this file that names Hunter Douglas or one of their
 * products, read src/data/hunterDouglas.ts. In short:
 *   - "Centurion" / "Pinnacle" are TRADE-ONLY. Consumer-facing is
 *     "Authorized Hunter Douglas Dealer" (HD_DEALER_DESIGNATION).
 *   - Product marks need their own ® or ™ AND a category descriptor:
 *     "Silhouette® Window Shadings", never "Silhouette sheers". Use hdMark().
 *   - "Hunter Douglas Lifetime Warranty", "guaranteed for life" applied to HD's
 *     products, and "Hunter Douglas Showroom" are PROHIBITED phrases. The
 *     warranty is the "Hunter Douglas Limited Lifetime Warranty".
 *   - Jim's promise about his own labour is separate and allowed. Keep them apart.
 * `npm run check:hd` enforces this. Run it before you commit.
 *
 * The interface/type SHAPE below is preserved from the prior scaffold so every
 * component keeps compiling. Fields that do not apply to Window Fantasies
 * (moqTiers pricing, quiz) are kept structurally but neutralized (empty tiers /
 * quote-based) because the components read them defensively.
 */

export interface SiteConfig {
  business: BusinessInfo;
  hero: Hero;
  painPoints: PainPoint[];
  about: About;
  services: Service[];
  brandPartners: BrandPartner[];
  pastClients: PastClient[];
  workItems: WorkItem[];
  productLines: ProductLine[];
  costAnchor: CostAnchor;
  industries: Industry[];
  serviceAreas: ServiceArea[];
  testimonials: Testimonial[];
  reviewSurvey: ReviewSurvey;
  stats: Stat[];
  faq: FaqItem[];
  quiz: Quiz;
  cta: CtaBlock;
  legal: Legal;
}

export interface BusinessInfo {
  name: string;
  legalName: string;
  tagline: string;
  founderName: string;
  founderTitle: string;
  yearsInBusiness: number;
  address: { street: string; city: string; state: string; zip: string };
  phone: string;
  phoneFormatted: string;
  email: string;
  ownerEmail: string;
  serviceRadius: string;
  social: { facebook?: string; linkedin?: string; instagram?: string };
  /**
   * One-click "write a review" deep link for the Google Business Profile.
   *
   * The BEST value here is the official short link from Jim's GBP dashboard
   * (Business Profile > Read Reviews > Get more reviews > Copy link), which looks
   * like https://g.page/r/<opaque-code>/review. That code encodes the listing CID
   * and CANNOT be derived from a Place ID, so it has to be copied out of the
   * dashboard by hand once.
   *
   * Until then this uses the documented-by-behavior writereview endpoint keyed on
   * the Place ID, which resolves to the same review composer.
   */
  googleReviewUrl: string;
}

export interface Hero {
  eyebrow: string;
  h1: string;
  h1WithEmphasis: { text: string; emphasis: string[] };
  subhead: string;
  trustMicrocopy: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
}

export interface PainPoint {
  icon: string;
  title: string;
  body: string;
}

export interface About {
  eyebrow: string;
  h1: string;
  paragraphs: string[];
  credentials: { title: string; description: string }[];
  photo: { src: string; alt: string };
  cta: { label: string; href: string };
}

export interface Service {
  slug: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  features: string[];
  pricingNote: string;
  /** Optional reassurance line rendered near the pricing note; the phone number renders tap-to-call after it. */
  notSureNote?: string;
  /**
   * Mandatory manufacturer legal copy for this service, rendered verbatim.
   * Hunter Douglas requires "The PowerView® App is required for programmed
   * operation." on any creative promoting the PowerView scheduling benefit.
   * Never paraphrase it and never drop it. See src/data/hunterDouglas.ts.
   */
  legalDisclosure?: string;
  imageSrc: string;
  imageAlt: string;
  /** Intrinsic pixel dimensions of imageSrc so the photo renders at its natural aspect. */
  imageW: number;
  imageH: number;
  cta: { label: string; href: string };
}

export interface BrandPartner {
  name: string;
  logoSrc: string;
  pendingPermission?: boolean;
}

export interface PastClient {
  name: string;
  industry: string;
  description: string;
  videoEmbed?: string;
  pendingPermission?: boolean;
}

export interface WorkItem {
  brand: string;
  category: "Shades" | "Blinds" | "Shutters" | "Drapery" | "Motorization";
  /** Room / setting metadata chip shown on gallery tiles ("Kitchen", "Nursery"). */
  room: string;
  /** True for the ~6 installs shown in the featured portfolio reel (rest go to the wall). */
  featured?: boolean;
  image: string;
  alt: string;
  blurb: string;
  /**
   * Photo attribution for Hunter Douglas product photography. HD requires their
   * photography be "clearly labeled with the specific product it was designed to
   * promote", so any item whose `image` is a licensed HD photo MUST set this.
   * Rendered by <HDPhotoCredit /> on the first instance in a section.
   * Leave undefined for photos that are not HD's.
   */
  credit?: string;
  w: number;
  h: number;
}

export interface ProductLine {
  slug: string;
  name: string;
  shortDescription: string;
  /** Window Fantasies is quote-based (no published prices), so this is always empty. */
  moqTiers: { quantity: number; pricePerUnit: number; label?: string }[];
  features: string[];
  imageSrc: string;
  /**
   * Alt text for imageSrc.
   *
   * ⚠️ COMPLIANCE (HD criterion 10). Hunter Douglas MANUFACTURES; Jim measures,
   * designs, and installs. Alt text must never read "<product> by Window
   * Fantasies", which claims Window Fantasies made it. The compliant form names
   * the specific Hunter Douglas product, then Jim's actual role:
   * "Custom Hunter Douglas Parkland® Wood Blinds ..., measured and installed by
   * Window Fantasies." Name the specific product only where the photo plainly
   * shows it; otherwise stay at the category rather than guess a mark.
   *
   * Every surface that renders imageSrc should read this field instead of
   * building a string from `name`.
   */
  imageAlt?: string;
  /** Intrinsic pixel dimensions of imageSrc so the photo renders at its natural aspect. */
  imageW: number;
  imageH: number;
}

/**
 * Shared honest-cost anchor for the product pages (the "Susan" fix). Same
 * plainspoken voice as the Cost FAQ and the homepage CostHonesty band.
 */
export interface CostAnchor {
  eyebrow: string;
  /** Carries the category scale figure. NOT for /products surfaces — see costAnchor. */
  body: string;
  /** Same message, no figure. Required on any surface whose products are all Hunter Douglas. */
  bodyNoFigure: string;
}

export interface Industry {
  slug: string;
  type: "vertical" | "funnel";
  name: string;
  audience: string;
  lossFrame: string;
  mechanism: string;
  useCases: string[];
  faqs: { q: string; a: string }[];
  cta: { label: string; href: string };
  image?: string;
  imageAlt?: string;
}

export interface ServiceArea {
  slug: string;
  city: string;
  state: string;
  population: number;
  distance: string;
  description: string;
  nearbyAreas: string[];
}

/**
 * ReviewSurvey — copy for the interactive star survey on /testimonials.
 *
 * Flow: pick a star rating, then branch. 1-3 routes to a private note that lands
 * only in Jim's inbox. 4-5 collects the review on-site and then hands off to the
 * Google review composer in one click.
 *
 * Ratings collected here are NEVER published or aggregated on the site. The
 * displayed reviews + AggregateRating stay sourced from the curated real set in
 * `testimonials` (research/real-reviews.md). Jim adds a submitted review to that
 * set by hand if he wants it public. Collecting ratings and publishing a
 * rating-filtered average off the same widget is the one thing that would make
 * this a 16 CFR 465.7(b) problem, so the two stay strictly separate.
 */
export interface ReviewSurvey {
  eyebrow: string;
  h2: string;
  intro: string;
  /** Prompt above the star picker. */
  starPrompt: string;
  /** Shown under the stars at rest, before any rating is picked or hovered. */
  starHint: string;
  /** Accessible labels for stars 1-5, index 0 = one star. */
  starLabels: string[];
  /** Branch shown to 1-3 star raters: private, goes only to Jim. */
  privateBranch: {
    h3: string;
    body: string;
    nameLabel: string;
    contactLabel: string;
    contactHint: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitLabel: string;
    sendingLabel: string;
    successH3: string;
    successBody: string;
  };
  /** Branch shown to 4-5 star raters: on-site review, then one click to Google. */
  publicBranch: {
    h3: string;
    body: string;
    nameLabel: string;
    townLabel: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitLabel: string;
    sendingLabel: string;
    successH3: string;
    successBody: string;
    googleCtaLabel: string;
    googleCtaNote: string;
  };
  errorMessage: string;
}

export interface Testimonial {
  id: string;
  body: string;
  name: string;
  /** Star rating 1-5. Real reviews are all 5. */
  rating: number;
  /** Relative date as shown on the source profile, e.g. "4 months ago". */
  date?: string;
  /** Origin of the review, e.g. "Google", "Yelp". Drives the verified-source label. */
  source?: string;
  /** Optional for manual/legacy testimonials. */
  title?: string;
  company?: string;
  industry?: string;
  isReal: boolean;
}

export interface Stat {
  number: string;
  suffix?: string;
  label: string;
}

export interface FaqItem {
  q: string;
  a: string;
  category?: string;
}

/** A research-backed statistic with its primary source, for on-site citation. */
export interface ValueStat {
  stat: string;
  label: string;
  source: string;
}

export interface Quiz {
  intro: { eyebrow: string; h1: string; subhead: string; ctaStart: string };
  steps: QuizStep[];
  results: QuizResult[];
  valueProof: {
    heading: string;
    intro: string;
    stats: ValueStat[];
    sourceNote: string;
  };
}

export interface QuizStep {
  id: string;
  question: string;
  type: "single" | "multi";
  options: { value: string; label: string; emoji: string }[];
}

export interface QuizResult {
  id: string;
  matchScore: { stepId: string; answerValue: string; weight: number }[];
  recommendation: string;
  body: string;
  whyItWorks: string;
  categoryStats: ValueStat[];
  serveGuidance: string;
  primaryProductSlug: string;
  cta: { label: string; href: string };
}

export interface CtaBlock {
  h1: string;
  subhead: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
}

export interface LegalBlock {
  kind: "h2" | "p" | "ul";
  content: string | string[];
}
export interface LegalDoc {
  title: string;
  lastUpdated: string;
  summary: string;
  blocks: LegalBlock[];
}
export interface Legal {
  privacy: LegalDoc;
  terms: LegalDoc;
}

/* ============================================================================
   Site config — Window Fantasies. Tone: educate, do not sell. Zero em dashes.
   ============================================================================ */

const CONSULT_HREF = "/request-a-consultation";
const PHONE_TEL = "6038915755";
const PHONE_FMT = "(603) 891-5755";

/**
 * Google review composer deep link for Window Fantasies.
 * Full derivation + source URLs: research/google-review-deep-link.md
 *
 * This is the canonical Maps write-review URL: the SAME destination that the
 * Places API `googleMapsLinks.writeAReviewUri` field returns and that the GBP
 * dashboard's `g.page/r/<code>/review` short link redirects to. Built from the
 * verified FID:CID pair for the listing. The trailing `!12e1` is the segment that
 * makes Maps open the review composer instead of the profile.
 *
 *   Place ID : ChIJr9eihMSGMEkRWY1hwcmJr1Q
 *   FID:CID  : 0x493086c484a2d7af:0x54af89c9c1618d59
 *   CID      : 6102247519736139097  (google.com/maps?cid=... round-trips to the profile)
 *
 * Verified 2026-07-16: returns 200 directly, no ServiceLogin bounce.
 *
 * Deliberately NOT `search.google.com/local/writereview?placeid=`, which is the
 * format most guides recommend. That endpoint is undocumented, Google closed the
 * request to support it as "Won't Fix (Infeasible)", it has a history of unfixed
 * regional breakage, and google.com publishes no iOS app association for it, so it
 * can never hand off to the Maps app on an iPhone. `/maps/place/*` IS claimed by
 * the Maps app on both iOS and Android, so this one opens in-app on a phone.
 */
const GOOGLE_REVIEW_URL =
  "https://www.google.com/maps/place//data=!4m3!3m2!1s0x493086c484a2d7af:0x54af89c9c1618d59!12e1";

export const siteConfig: SiteConfig = {
  business: {
    name: "Window Fantasies",
    legalName: "Window Fantasies LLC",
    tagline: "Measure, design, and install. We do it all.",
    founderName: "Jim Garrity",
    founderTitle: "Owner",
    yearsInBusiness: 30,
    address: { street: "280 Main Street", city: "Salem", state: "NH", zip: "03079" },
    phone: PHONE_TEL,
    phoneFormatted: PHONE_FMT,
    email: "windowfantasies@gmail.com",
    ownerEmail: "windowfantasies@gmail.com",
    serviceRadius: "All of New England (NH, MA, ME, VT, and Cape Cod)",
    social: {},
    googleReviewUrl: GOOGLE_REVIEW_URL,
  },

  hero: {
    eyebrow: "Authorized Hunter Douglas Dealer · All of New England",
    h1: "Measure, design, and install. We do it all.",
    h1WithEmphasis: {
      text: "Measure, design, and install. We do it all.",
      emphasis: ["all"],
    },
    subhead:
      "Windows are your connection to the outside world, and how much of that do you really control? Window Fantasies helps you take back your view, with custom Hunter Douglas shades, blinds, shutters, and drapery, backed by the Hunter Douglas Limited Lifetime Warranty, subject to the manufacturer's warranty terms. We bring the samples to your home, and we handle it all: measure, design, and install.",
    trustMicrocopy: "Free in-home consultation. We bring the samples to you.",
    ctaPrimary: { label: "Request Your Free In-Home Consultation", href: CONSULT_HREF },
    ctaSecondary: { label: "Take the Quiz", href: "/quiz" },
  },

  // Reframed as "why Jim shops at home with you" reassurances, answer-first.
  painPoints: [
    {
      icon: "home",
      title: "Shop at home, on purpose",
      body: "You cannot judge a shade under fluorescent store lights. We bring the real Hunter Douglas samples to your home, hold them in your own windows, and show you how they look in your light, at your time of day.",
    },
    {
      icon: "shield",
      title: "Backed by the Hunter Douglas Limited Lifetime Warranty",
      body: "Hunter Douglas products carry the Hunter Douglas Limited Lifetime Warranty, subject to the manufacturer's warranty terms, and we stand behind every install we do. You bought Hunter Douglas, you call Window Fantasies, and we answer. That is the whole promise.",
    },
    {
      icon: "wrench",
      title: "Repairs, even if you bought it elsewhere",
      body: "Broke a shade you bought from a shop that closed? We still help. Covered repairs are handled under the Hunter Douglas Limited Lifetime Warranty, subject to its terms, and we can take the blind up to the authorized service center and bring it back.",
    },
    {
      icon: "handshake",
      title: "No pressure, ever",
      body: "We sell you what you deserve, not what we want to move. Whether you live in a trailer or a penthouse, you get the same education, the same honesty, and the same care.",
    },
  ],

  about: {
    eyebrow: "About Jim",
    h1: "A retired firefighter who will change your view.",
    paragraphs: [
      "Welcome to Window Fantasies. I am the owner, Jim Garrity, and your connection to the finest in window treatments for home and office. I am also a retired fire lieutenant from Methuen, Massachusetts, where I spent more than thirty years dealing not just with fire, but with home fashion emergencies too. Choosing the right window treatment can feel a little overwhelming, so let us help you navigate the many options Hunter Douglas has to offer.",
      "In July of 2023, I bought Window Fantasies after nearly twenty-five years helping my predecessor, Herb Brown, build it into the successful business it had been for over thirty-five years. When Herb retired, I moved Window Fantasies to 280 Main Street in Salem, New Hampshire. We still service the Nashua area, but we made the move to give Salem, southern New Hampshire, and the Seacoast the chance to enjoy the same quality that Hunter Douglas and Window Fantasies provide.",
      "Window Fantasies is an Authorized Hunter Douglas Dealer, and has earned that standing for well over three decades. What that means for you is simple: you get the full line of Hunter Douglas window fashions, and someone who actually knows how to design and fit them into the windows of your home or workplace.",
      "There is no storefront and no showroom, and that is on purpose. We bring the showroom to you. Window Fantasies comes to your home or workplace with samples you can see and touch. We hold them in your windows and show you exactly what you are getting before you commit to anything. Let us take the stress out of dressing up your windows. We measure, design, and install. We do it all.",
      "Hunter Douglas is the industry's finest in custom window treatments. They have set the standard for decades, with treatments like honeycomb shades, roller shades, Roman shades, and shutters. Each one is built for your exact window opening and carries the Hunter Douglas Limited Lifetime Warranty, subject to the manufacturer's warranty terms.",
      "If there is ever an issue, all you do is call your authorized Hunter Douglas dealer. That is us, Window Fantasies, and we will get it repaired or replaced under the warranty. That is what buying quality should feel like.",
      "Everyone gets the same level of care and expertise at Window Fantasies. We are about building relationships while helping you change your point of view, one window at a time. Window Fantasies LLC, your Salem, New Hampshire Authorized Hunter Douglas Dealer.",
    ],
    credentials: [
      { title: "Authorized Hunter Douglas Dealer", description: "Jim carries the full Hunter Douglas line, including the newest releases, with three decades of hands-on product knowledge behind every recommendation." },
      { title: "30+ Years in Window Fashions", description: "More than three decades measuring, designing, and installing custom window treatments across New England." },
      { title: "Retired Fire Lieutenant", description: "A career in the Methuen Fire Department. Same calm-under-pressure, tell-you-the-truth approach brought to every home consultation." },
      { title: "Hunter Douglas Limited Lifetime Warranty", description: "Hunter Douglas products carry the Hunter Douglas Limited Lifetime Warranty, subject to the manufacturer's warranty terms, and Jim services them personally. He repairs even treatments bought elsewhere." },
      { title: "BBB A+ Accredited", description: "Accredited by the Better Business Bureau with an A+ rating." },
      { title: "Measure, Design, and Install. We Do It All.", description: "Window Fantasies handles every step in-house, from the first measurement to the final install, and stands behind the work. One company, accountable start to finish." },
    ],
    photo: { src: "/images/about/jim-headshot.jpg", alt: "Jim Garrity, the owner of Window Fantasies. Retired Methuen fire lieutenant and Authorized Hunter Douglas Dealer." },
    cta: { label: "Request a Free Consultation", href: CONSULT_HREF },
  },

  // The 7 services (design-system §11 + facts-of-record). Photo-led.
  services: [
    {
      slug: "in-home-consultation",
      name: "Free In-Home Consultation",
      shortDescription: "We bring the real Hunter Douglas samples to your home, hold them in your own windows, and give you an installed price at your kitchen table. No cost, no pressure.",
      longDescription: "There is no store to drive to, and that is by design. A shade looks one way in a store and another way in your home. We come to you with the actual Hunter Douglas samples, hold them in your windows, and show you how each one behaves in your light. You get an education first, then an honest, installed price. The consultation is always free.",
      features: [
        "Real Hunter Douglas samples viewed in your own light",
        "We measure every window for you",
        "Installed price quoted at your kitchen table",
        "Price includes install and removal of your old treatments",
        "Educate first, never a hard sell",
        "Serving all of New England",
      ],
      pricingNote: "Always free. The consultation costs you nothing.",
      imageSrc: "/images/services/in-home-consultation.webp",
      imageW: 2528,
      imageH: 1685,
      imageAlt: "Hands holding a Hunter Douglas fabric sample during an in-home consultation.",
      cta: { label: "Request a Free Consultation", href: CONSULT_HREF },
    },
    {
      slug: "interior-design",
      name: "Interior Design Guidance",
      shortDescription: "Not sure what fits the room? We read the light, the architecture, and how you live, then match the right Hunter Douglas product to it. Design help built into every consultation.",
      longDescription: "Choosing window treatments is a design decision, not just a purchase. We look at how the light moves through the room, the style of the home, and how you actually use the space, then recommend what belongs there. Sheers for diffused light, cellular for a bedroom you want dark, shutters for a timeless look. The guidance comes standard.",
      features: [
        "Product matched to your room and your light",
        "Fabric, color, and texture guidance with real samples",
        "Layering options like drapery over sheers",
        "Recommendations for privacy, glare, and energy savings",
        "Advice you can trust, sell you what you deserve",
        "No design fee, it is part of the consultation",
      ],
      pricingNote: "Included with your free consultation.",
      imageSrc: "/images/services/interior-design.webp",
      imageW: 2528,
      imageH: 1685,
      imageAlt: "A navy drapery treatment in a modern loft with a city view.",
      cta: { label: "Request a Free Consultation", href: CONSULT_HREF },
    },
    {
      slug: "free-estimates",
      name: "Free Estimates",
      shortDescription: "Every quote is free and it is the real, installed number. It includes installation and removal of your existing treatments. No surprise add-ons after the fact.",
      longDescription: "Hunter Douglas is custom and premium, so pricing comes from a real measurement, not a guess online. We give you the installed price at your table, and it already includes taking down and hauling away your old blinds. You will know exactly what you are spending before you commit to anything.",
      features: [
        "Installed price, not a teaser",
        "Includes removal and disposal of old treatments",
        "Priced from our own measurements",
        "No obligation to buy",
        "Straight answers on cost, always",
        "Financing questions welcome",
      ],
      pricingNote: "Free. Quotes are always no-obligation.",
      imageSrc: "/images/services/free-estimates.webp",
      imageW: 2528,
      imageH: 1685,
      imageAlt: "A refined living room with Roman shades and a grand piano.",
      cta: { label: "Request a Free Estimate", href: CONSULT_HREF },
    },
    {
      slug: "measuring-and-installation",
      name: "Measuring and Installation",
      shortDescription: "We measure every opening and install every treatment ourselves. Custom Hunter Douglas treatments are built for your exact window, so a precise measure and a clean install are everything.",
      longDescription: "Custom window treatments are fabricated to your exact opening, which means the measure has to be right the first time. We take every measurement ourselves and install the finished product ourselves. No subcontractors, no handoffs. The people who measure and install are the same people who quoted you.",
      features: [
        "Precise measurement of every opening",
        "Products fabricated for your exact windows",
        "A clean install, handled start to finish",
        "Old treatments removed and disposed of",
        "One company accountable from measure to install",
        "Backed by the Hunter Douglas Limited Lifetime Warranty",
      ],
      pricingNote: "Installation is included in your quoted price.",
      imageSrc: "/images/services/measuring-and-installation.webp",
      imageW: 2528,
      imageH: 1685,
      imageAlt: "Warm wood blinds installed cleanly over a fireplace.",
      cta: { label: "Request a Free Consultation", href: CONSULT_HREF },
    },
    {
      slug: "installs-and-repairs",
      name: "Installs and Repairs",
      shortDescription: "New installs and repairs, both. Covered repairs are handled under the Hunter Douglas Limited Lifetime Warranty. We can pick up, deliver to the authorized service center, and reinstall for you.",
      longDescription: "Hunter Douglas products carry the Hunter Douglas Limited Lifetime Warranty, subject to the manufacturer's warranty terms, so a covered repair itself costs nothing. The authorized service center is Goedecke Design in Bedford, New Hampshire, the hospital for your blind. You can drive it there yourself at no charge, or we can take it down, drive it up, and reinstall it for a flat service fee that covers the time and travel. We will tell you the number straight up, before anything happens.",
      features: [
        "New Hunter Douglas installs across New England",
        "Covered repairs handled under the Hunter Douglas Limited Lifetime Warranty",
        "Authorized service center: Goedecke Design, Bedford NH",
        "No-charge option: drop your blind off yourself",
        "Full-service option: we handle pickup, repair, and reinstall",
        "The service fee is disclosed upfront, no surprises",
      ],
      pricingNote: "A covered repair is handled under the Hunter Douglas Limited Lifetime Warranty, subject to its terms. A flat service fee applies if we handle pickup and reinstall.",
      notSureNote: "Not sure if yours is Hunter Douglas? Call us, we will tell you.",
      imageSrc: "/images/services/installs-and-repairs.webp",
      imageW: 2528,
      imageH: 1685,
      imageAlt: "Plantation shutters framing French doors with an ocean view.",
      cta: { label: "Ask Us About a Repair", href: CONSULT_HREF },
    },
    {
      slug: "blind-and-shade-repairs",
      name: "Blind and Shade Repairs",
      shortDescription: "Here is the good news: the fix is often covered under the Hunter Douglas Limited Lifetime Warranty. Cords, mechanisms, motors, and fabric, we get it repaired, even if you bought it somewhere else or from a shop that has closed.",
      longDescription: "Start with the good news: Hunter Douglas products carry the Hunter Douglas Limited Lifetime Warranty, subject to the manufacturer's warranty terms, so the fix is often covered. A shade you love should not go in the trash over a broken cord or a tired mechanism. We handle Hunter Douglas repairs of all kinds, and we help even when you did not buy it from us or the original shop is long gone. Tell us what broke and we will tell you the honest path forward.",
      features: [
        "Covered repairs handled under the Hunter Douglas Limited Lifetime Warranty",
        "Cord, mechanism, and hardware repairs",
        "Motor and PowerView® Automation troubleshooting",
        "Help even if you bought it elsewhere",
        "Honest guidance on repair versus replace",
        "Flat, disclosed service fee for full pickup and reinstall",
      ],
      pricingNote: "A covered repair is handled under the Hunter Douglas Limited Lifetime Warranty, subject to its terms. Flat service fee for full pickup and reinstall, disclosed upfront.",
      notSureNote: "Not sure if yours is Hunter Douglas? Call us, we will tell you.",
      imageSrc: "/images/services/blind-and-shade-repairs.webp",
      imageW: 2528,
      imageH: 1685,
      imageAlt: "A bright kitchen with cellular honeycomb shades and someone reading nearby.",
      cta: { label: "Ask Us About a Repair", href: CONSULT_HREF },
    },
    {
      slug: "powerview-automation",
      name: "PowerView® Automation",
      shortDescription: "Adjust your shades from your phone, your voice, or from a beach in Florida. Hunter Douglas PowerView® Automation moves your treatments on a schedule or on command. Sunglasses for your windows.",
      longDescription: "Hunter Douglas PowerView® Automation is motorization done right. Your shades move on a schedule, react to the sun, or respond to your voice, and you can control them from anywhere. Snowbirds run their New England shades from Florida. Think of solar and sheer shades as sunglasses for your windows: they cut glare and UV while you still see out. We set it all up and show you how to use it.",
      features: [
        "Control from phone, voice, or a wall remote",
        "Schedule shades to open and close automatically",
        "Adjust from anywhere, even out of state",
        "Great for hard-to-reach and high windows",
        "Cuts glare and UV, sunglasses for your windows",
        "We configure it and teach you to use it",
      ],
      // HD mandatory legal copy: any creative promoting the PowerView scheduling
      // benefit must carry this sentence. Rendered by <PowerViewDisclosure />.
      legalDisclosure: "The PowerView® App is required for programmed operation.",
      pricingNote: "Quote-based. Motorization is priced at your free consultation.",
      imageSrc: "/images/services/powerview-automation.webp",
      imageW: 2528,
      imageH: 1685,
      imageAlt: "Airy Hunter Douglas Luminette® Privacy Sheers with an ocean view.",
      cta: { label: "Request a Free Consultation", href: CONSULT_HREF },
    },
  ],

  // Trust badges (rendered as a badge row). The Hunter Douglas BRAND LOGO is a
  // separate, licensed asset rendered by <HunterDouglasLogo /> in the hero, per
  // HD's requirement that it appear above the fold and separate from the dealer's
  // own mark. These text badges must never carry an HD logo image.
  brandPartners: [
    { name: "Authorized Hunter Douglas Dealer", logoSrc: "" },
    { name: "Hunter Douglas Limited Lifetime Warranty", logoSrc: "" },
    { name: "BBB A+ Accredited", logoSrc: "" },
    { name: "30+ Years Experience", logoSrc: "" },
    { name: "5.0 Stars on Google", logoSrc: "" },
    { name: "All of New England", logoSrc: "" },
  ],

  // Signature Hunter Douglas products (used on the /portfolio + signature band).
  // Names carry their trademark symbol + category descriptor per HD's Trademark
  // Usage rules. Verify any change against src/data/hunterDouglas.ts.
  pastClients: [
    { name: "Silhouette® Window Shadings", industry: "Shades", description: "S-vane sheers that float between two sheers for diffused light and daytime privacy. The signature Hunter Douglas look." },
    { name: "Duette® Honeycomb Shades", industry: "Shades", description: "Energy-efficient cellular shades from Hunter Douglas with room darkening via LightLock®. Takes a beating and still looks great." },
    { name: "Luminette® Privacy Sheers", industry: "Shades", description: "Drapery-like vertical sheers from Hunter Douglas with rotating vanes for doors and wide windows." },
    { name: "Pirouette® Window Shadings", industry: "Shades", description: "Soft fabric vanes over a single back sheer for a gentle, contoured look." },
    { name: "Plantation Shutters", industry: "Shutters", description: "Timeless hardwood and poly shutters from Hunter Douglas that never go out of style." },
    { name: "PowerView® Automation", industry: "Motorization", description: "Motorized control from Hunter Douglas on a schedule, by voice, or from anywhere in the world." },
  ],

  // Portfolio items (real HD photos). Category typed to the union above.
  workItems: [
    {
      brand: "Pirouette® Window Shadings",
      credit: "Pirouette® Window Shadings by Hunter Douglas",
      category: "Shades",
      room: "Living room",
      featured: true,
      image: "/images/window-fashions/p04.webp",
      alt: "A premium New England living room with Hunter Douglas Pirouette® Window Shadings softening the daylight.",
      blurb: "Pirouette® Window Shadings diffusing golden-hour light in a premium living room. Daytime privacy without losing the view.",
      w: 2050,
      h: 1025,
    },
    {
      brand: "Parkland® Wood Blinds",
      credit: "Parkland® Wood Blinds by Hunter Douglas",
      category: "Blinds",
      room: "Dining room",
      image: "/images/window-fashions/p02.webp",
      alt: "A modern dining room with warm Hunter Douglas Parkland® Wood Blinds.",
      blurb: "Parkland® Wood Blinds bringing warmth to a modern dining room. Classic real-wood in dozens of finishes.",
      w: 2050,
      h: 1025,
    },
    {
      brand: "Duette® Honeycomb Shades",
      credit: "Duette® Honeycomb Shades by Hunter Douglas",
      category: "Shades",
      room: "Kitchen",
      image: "/images/window-fashions/p06.webp",
      alt: "A bright kitchen with Hunter Douglas Duette® Honeycomb Shades.",
      blurb: "Duette® Honeycomb Shades in a sunny kitchen. Energy-efficient, and available in room-darkening fabrics.",
      w: 900,
      h: 600,
    },
    {
      brand: "Provenance® Woven Wood Shades",
      credit: "Provenance® Woven Wood Shades by Hunter Douglas",
      category: "Shades",
      room: "City loft",
      image: "/images/window-fashions/p05.webp",
      alt: "Hunter Douglas Provenance® Woven Wood Shades filtering a city view in a modern loft.",
      blurb: "Provenance® Woven Wood Shades in a city loft. Woods, reeds and grasses woven to soften hard light.",
      w: 1025,
      h: 513,
    },
    {
      brand: "Designer Roller Shades",
      credit: "Designer Roller Shades by Hunter Douglas",
      category: "Shades",
      room: "Great room",
      image: "/images/window-fashions/p08.webp",
      alt: "Clean Hunter Douglas Designer Roller Shades in a large rustic-modern room.",
      blurb: "Designer Roller Shades in a rustic-modern great room. Sunglasses for your windows, glare and UV handled.",
      w: 2050,
      h: 1025,
    },
    {
      brand: "NewStyle® Hybrid Shutters",
      credit: "NewStyle® Hybrid Shutters by Hunter Douglas",
      category: "Shutters",
      room: "Dining room",
      image: "/images/window-fashions/p11.webp",
      alt: "Hunter Douglas NewStyle® Hybrid Shutters on a bypass track in warm golden light.",
      blurb: "NewStyle® Hybrid Shutters on a bypass track. Timeless, and built to last.",
      w: 1025,
      h: 513,
    },
    {
      brand: "Luminette® Privacy Sheers",
      credit: "Luminette® Privacy Sheers by Hunter Douglas",
      category: "Shades",
      room: "Patio doors",
      image: "/images/window-fashions/p07.webp",
      alt: "Hunter Douglas Luminette® Privacy Sheers across a wide patio-door opening, vertical vanes rotating to diffuse the light.",
      blurb: "Luminette® Privacy Sheers on a wide ocean-view opening. Drapery softness with the light control of a shade.",
      w: 1025,
      h: 513,
    },
    {
      brand: "Vignette® Modern Roman Shades",
      credit: "Vignette® Modern Roman Shades by Hunter Douglas",
      category: "Shades",
      room: "Music room",
      image: "/images/window-fashions/p10.webp",
      alt: "Tailored Hunter Douglas Vignette® Modern Roman Shades in a refined living room with a grand piano.",
      blurb: "Vignette® Modern Roman Shades in a refined living room. Tailored folds, no exposed cords or rings.",
      w: 2560,
      h: 1714,
    },
    {
      brand: "Pirouette® Window Shadings",
      credit: "Pirouette® Window Shadings by Hunter Douglas",
      category: "Shades",
      room: "Great room",
      featured: true,
      image: "/images/portfolio/pf-09.webp",
      alt: "Hunter Douglas Pirouette® Window Shadings softening arched windows in a coastal New England great room.",
      blurb: "Pirouette® Window Shadings diffusing sea light in a vaulted coastal great room.",
      w: 2400,
      h: 1800,
    },
    {
      brand: "Duette® Honeycomb Shades",
      credit: "Duette® Honeycomb Shades by Hunter Douglas",
      category: "Shades",
      room: "Kitchen",
      image: "/images/portfolio/pf-10.webp",
      alt: "Hunter Douglas Duette® Honeycomb Shades in a warm chef's kitchen at golden hour.",
      blurb: "Duette® Honeycomb Shades warming a chef's kitchen in golden-hour light.",
      w: 2400,
      h: 1800,
    },
    {
      brand: "Silhouette® Window Shadings",
      credit: "Silhouette® Window Shadings by Hunter Douglas",
      category: "Shades",
      room: "Bedroom",
      image: "/images/portfolio/pf-11.webp",
      alt: "Hunter Douglas Silhouette® Window Shadings in a serene primary bedroom.",
      blurb: "Silhouette® Window Shadings in a calm sage-toned primary bedroom.",
      w: 2400,
      h: 1800,
    },
    {
      brand: "Designer Screen Shades",
      credit: "Designer Screen Shades by Hunter Douglas",
      category: "Shades",
      room: "Home office",
      featured: true,
      image: "/images/portfolio/pf-12.webp",
      alt: "Hunter Douglas Designer Screen Shades in a handsome home office, light falling across a walnut desk.",
      blurb: "Designer Screen Shades striping warm light across a home-office desk.",
      w: 2400,
      h: 1800,
    },
    {
      brand: "Applause® Honeycomb Shades",
      credit: "Applause® Honeycomb Shades by Hunter Douglas",
      category: "Shades",
      room: "Dining room",
      image: "/images/portfolio/pf-13.webp",
      alt: "Hunter Douglas Applause® Honeycomb Shades in a formal dining room beneath a brass chandelier.",
      blurb: "Applause® Honeycomb Shades framing a formal dining room in raking light.",
      w: 2400,
      h: 1800,
    },
    {
      brand: "Somner® Custom Vertical Blinds",
      credit: "Somner® Custom Vertical Blinds by Hunter Douglas",
      category: "Blinds",
      room: "Sunroom",
      featured: true,
      image: "/images/portfolio/pf-14.webp",
      alt: "Hunter Douglas Somner® Custom Vertical Blinds in a bright sunroom with terracotta tile.",
      blurb: "Somner® Custom Vertical Blinds filtering light across a plant-filled sunroom.",
      w: 2400,
      h: 1800,
    },
    {
      brand: "Designer Banded Shades",
      credit: "Designer Banded Shades by Hunter Douglas",
      category: "Shades",
      room: "Nursery",
      image: "/images/portfolio/pf-15.webp",
      alt: "Hunter Douglas Designer Banded Shades in a soft nursery beside a wooden crib.",
      blurb: "Designer Banded Shades in a warm, restful nursery.",
      w: 2400,
      h: 1800,
    },
    {
      brand: "Sonnette® Cellular Roller Shades",
      credit: "Sonnette® Cellular Roller Shades by Hunter Douglas",
      category: "Shades",
      room: "Media room",
      featured: true,
      image: "/images/portfolio/pf-16.webp",
      alt: "Hunter Douglas Sonnette® Cellular Roller Shades in a walnut-paneled media room.",
      blurb: "Sonnette® Cellular Roller Shades in a warm walnut media room.",
      w: 2400,
      h: 1800,
    },
    {
      brand: "Parkland® Wood Blinds",
      credit: "Parkland® Wood Blinds by Hunter Douglas",
      category: "Blinds",
      room: "Entryway",
      image: "/images/portfolio/pf-17.webp",
      alt: "Hunter Douglas Parkland® Wood Blinds in a farmhouse entry with a rustic bench and baskets.",
      blurb: "Parkland® Wood Blinds bringing privacy and light to a farmhouse entry.",
      w: 2400,
      h: 1800,
    },
    {
      brand: "Modern Precious Metals® Aluminum Blinds",
      credit: "Modern Precious Metals® Aluminum Blinds by Hunter Douglas",
      category: "Blinds",
      room: "Loft",
      image: "/images/portfolio/pf-18.webp",
      alt: "Hunter Douglas Modern Precious Metals® Aluminum Blinds on the steel windows of an exposed-brick loft.",
      blurb: "Modern Precious Metals® Aluminum Blinds against a brick-and-steel loft.",
      w: 2400,
      h: 1800,
    },
    {
      brand: "Palm Beach™ Polysatin™ Shutters",
      credit: "Palm Beach™ Polysatin™ Shutters by Hunter Douglas",
      category: "Shutters",
      room: "Bathroom",
      image: "/images/portfolio/pf-19.webp",
      alt: "Hunter Douglas Palm Beach™ Polysatin™ Shutters in a marble spa bathroom, built for humidity.",
      blurb: "Palm Beach™ Polysatin™ Shutters balancing light and privacy in a spa bath.",
      w: 2400,
      h: 1800,
    },
    {
      brand: "Nantucket™ Window Shadings",
      credit: "Nantucket™ Window Shadings by Hunter Douglas",
      category: "Shades",
      room: "Lake house",
      featured: true,
      image: "/images/portfolio/pf-20.webp",
      alt: "Hunter Douglas Nantucket™ Window Shadings in a lake-house living room with a stone fireplace.",
      blurb: "Nantucket™ Window Shadings framing a golden lake view.",
      w: 2400,
      h: 1800,
    },
  ],

  // The 4 Hunter Douglas categories (Products index). Quote-based, so moqTiers is empty.
  productLines: [
    {
      slug: "shades",
      name: "Shades",
      shortDescription: "The flagship Hunter Douglas category. Silhouette® Window Shadings, Pirouette® Window Shadings, Luminette® Privacy Sheers, Duette® Honeycomb Shades, Vignette® Modern Roman Shades, Designer Roller Shades, and Designer Screen Shades. Diffused light, daytime privacy, and room darkening when you want it.",
      moqTiers: [],
      features: [
        "Silhouette® Window Shadings: S-vane sheers for diffused light and daytime privacy",
        "Duette® Honeycomb Shades: energy efficient, with room darkening via LightLock®",
        "Luminette® Privacy Sheers: drapery-like vertical sheers for doors and wide windows",
        "Vignette® Modern Roman Shades: tailored folds, no exposed cords",
        "Designer Roller Shades and Designer Screen Shades: clean lines, sunglasses for your windows",
        "PowerView® Automation available across the line",
      ],
      imageSrc: "/images/products/shades.webp",
      imageAlt: "Hunter Douglas Silhouette® Window Shadings filtering daylight over a freestanding tub in a calm New England bath, measured and installed by Window Fantasies.",
      imageW: 2528,
      imageH: 1685,
    },
    {
      slug: "blinds",
      name: "Blinds",
      shortDescription: "Real-wood warmth and sleek modern options from Hunter Douglas. Parkland® Wood Blinds in 50-plus colors, Modern Precious Metals® Aluminum Blinds, soft fabric blinds, and Skyline® Gliding Window Panels for tall and wide windows.",
      moqTiers: [],
      features: [
        "Parkland® Wood Blinds: classic warmth, 50-plus finishes",
        "Modern Precious Metals® Aluminum Blinds: sleek, durable, 70-plus colors",
        // "Aria™ soft blinds" was removed 2026-07-31: "soft blinds" is not an
        // official Hunter Douglas category descriptor, and Aria™ appears in HD's
        // 2025 list only under Alustra® Silhouette® fabrics, not as a blind.
        // Replaced with a blind HD actually lists, using HD's own descriptor
        // ("Soft Vertical Blinds") straight from src/data/hunterDouglas.ts.
        "Skyline® Gliding Window Panels: gliding panels for tall or wide openings",
        "Precise light and privacy control",
        "Backed by the Hunter Douglas Limited Lifetime Warranty",
      ],
      imageSrc: "/images/products/blinds.webp",
      imageAlt: "Custom Hunter Douglas Parkland® Wood Blinds with cloth tapes in a warm home library, measured and installed by Window Fantasies.",
      imageW: 2528,
      imageH: 1685,
    },
    {
      slug: "shutters",
      name: "Shutters",
      shortDescription: "Timeless and built to last. Hunter Douglas Heritance® Hardwood Shutters, Palm Beach™ Polysatin™ Shutters built UV resistant against warping and fading, and NewStyle® Hybrid Shutters that pair a hardwood look with added strength.",
      moqTiers: [],
      features: [
        "Heritance® Hardwood Shutters: 100 percent hardwood, dovetail construction",
        "Palm Beach™ Polysatin™ Shutters: UV resistant against warping, cracking, and fading",
        "NewStyle® Hybrid Shutters: wood and composite, hardwood look with strength",
        "Ideal for humid rooms, doors, and coastal homes",
        "A classic look that never dates the room",
        "Backed by the Hunter Douglas Limited Lifetime Warranty",
      ],
      imageSrc: "/images/products/shutters.webp",
      // The photo shows white plantation shutters, but not clearly enough to
      // tell Heritance® hardwood from Palm Beach™ Polysatin™. Naming the wrong
      // mark is itself a violation, so this alt stays at the category.
      imageAlt: "Custom Hunter Douglas plantation shutters on a bay window in a bright New England breakfast nook, measured and installed by Window Fantasies.",
      imageW: 2528,
      imageH: 1685,
    },
    {
      slug: "drapery",
      name: "Drapery",
      shortDescription: "Soften a room and control the light. Carole Fabrics™ Custom Drapery and Side Panels, from a Hunter Douglas partner company, with 4,000-plus fabric choices, Luminette® Privacy Sheers, and Provenance® Woven Wood Shades in natural materials.",
      moqTiers: [],
      features: [
        "Carole Fabrics™ Custom Drapery and Side Panels, from a Hunter Douglas partner company: 4,000-plus fabric and color choices",
        "Layer over sheers or hang standalone",
        "Luminette® Privacy Sheers: light diffusing with integrated vanes",
        "Provenance® Woven Wood Shades: natural reeds, woods, and bamboo",
        "Pleated, non-pleated, and Ripplefold™ styles with premium hardware",
        "Coordinated with your shades and shutters",
      ],
      imageSrc: "/images/products/drapery.webp",
      imageAlt: "Hunter Douglas Luminette® Privacy Sheers diffusing daylight across a wide New England window wall, measured and installed by Window Fantasies.",
      imageW: 2528,
      imageH: 1685,
    },
  ],

  // Honest-cost anchor rendered on /products and every /products/[slug] page.
  // Same voice as the Cost FAQ below and the homepage CostHonesty band.
  //
  // ⚠️ COMPLIANCE: HD's Independent Website Waiver rules bar a dealer site from
  // providing "web-based Hunter Douglas product price quotes". The figure below
  // is deliberately framed as a CATEGORY scale anchor for premium made-to-measure
  // window treatments, never as a Hunter Douglas price. Do not put a dollar
  // amount next to the Hunter Douglas name, and never publish a per-window,
  // per-product, or per-square-foot price. The real number comes from the
  // in-home measure, which is the whole point of this band.
  /**
   * ⚠️ HD COMPLIANCE — the figure and the no-figure variant are NOT interchangeable.
   *
   * HD bars dealers from publishing "web-based Hunter Douglas product price quotes".
   * `body` carries a category scale figure that is deliberately decoupled from the
   * HD name, and HD's own reviewer passed the pricing criteria with it live.
   *
   * What changed on 2026-08-01: the site gained 23 pages whose products are 100%
   * Hunter Douglas. On a page titled "Hunter Douglas Product Lines", "a single
   * high-end shade" is unambiguously an HD shade, so the same sentence stops being
   * a category figure and starts reading as an HD price. Two independent compliance
   * reviewers flagged it there.
   *
   * So: `bodyNoFigure` on every /products surface, `body` everywhere else, where the
   * framing is genuinely category-level and unchanged since HD's review. Same
   * conversion job either way — the free consultation is the point, not the number.
   */
  costAnchor: {
    eyebrow: "Honest pricing, upfront",
    body: "Custom window treatments are a premium, made-to-measure purchase. As a sense of scale, a single high-end shade can run around $1,600. That is exactly why the in-home consultation is free: we measure your actual windows and give you a real installed price at your kitchen table, with no obligation and no surprises. Yes, it is an investment, and it is built to last.",
    bodyNoFigure: "Custom window treatments are a premium, made-to-measure purchase, and the price depends on the size of the opening, the product, and the options you choose. That is exactly why the in-home consultation is free: we measure your actual windows and give you a real installed price at your kitchen table, with no obligation and no surprises. Yes, it is an investment, and it is built to last.",
  },

  // Not used by Window Fantasies (the /industries route is removed). Empty but valid.
  industries: [],

  // Service areas: all of New England, organized by tier (design-system §11).
  serviceAreas: [
    {
      slug: "salem-nh",
      city: "Salem",
      state: "NH",
      population: 30089,
      distance: "Home base",
      description: "Salem is home. The office is at 280 Main Street, and that is where the sample books live between visits. Most consultations start close to here, and we can often be at a Salem home the same week. There is no showroom to visit, we bring the Hunter Douglas samples to you.",
      nearbyAreas: ["windham-nh", "derry-nh", "methuen-ma", "atkinson-nh", "hampstead-nh"],
    },
    {
      slug: "windham-nh",
      city: "Windham",
      state: "NH",
      population: 15817,
      distance: "Southern NH",
      description: "Windham homeowners rely on Window Fantasies for custom Hunter Douglas shades, blinds, shutters, and drapery. We bring the samples to your home so you see every color in your own light.",
      nearbyAreas: ["salem-nh", "derry-nh", "londonderry-nh", "nashua-nh", "hampstead-nh"],
    },
    {
      slug: "nashua-nh",
      city: "Nashua",
      state: "NH",
      population: 91322,
      distance: "Southern NH",
      description: "Nashua is one of the most active markets we serve. Custom window treatments for condos, single-family homes, and lakeside properties, all measured, designed, and installed with care.",
      nearbyAreas: ["windham-nh", "manchester-nh", "salem-nh", "londonderry-nh", "derry-nh"],
    },
    {
      slug: "manchester-nh",
      city: "Manchester",
      state: "NH",
      population: 115644,
      distance: "Southern NH",
      description: "Manchester is New Hampshire's largest city and a steady market for premium Hunter Douglas treatments. From downtown condos to established neighborhoods, we measure and install everything ourselves.",
      nearbyAreas: ["bedford-nh", "londonderry-nh", "derry-nh", "nashua-nh", "salem-nh"],
    },
    {
      slug: "derry-nh",
      city: "Derry",
      state: "NH",
      population: 34317,
      distance: "Southern NH",
      description: "Derry homeowners choose Window Fantasies for custom shades, shutters, and motorized shades. One company from measure to install, and we stand behind every install.",
      nearbyAreas: ["londonderry-nh", "windham-nh", "salem-nh", "hampstead-nh", "manchester-nh"],
    },
    {
      slug: "londonderry-nh",
      city: "Londonderry",
      state: "NH",
      population: 26368,
      distance: "Southern NH",
      description: "Londonderry families rely on Window Fantasies for everything from one set of Hunter Douglas Luminette® Privacy Sheers on a patio door to a whole-home package. Samples viewed in your home, installed price at your table.",
      nearbyAreas: ["derry-nh", "manchester-nh", "windham-nh", "salem-nh", "bedford-nh"],
    },
    {
      slug: "atkinson-nh",
      city: "Atkinson",
      state: "NH",
      population: 7193,
      distance: "Southern NH",
      description: "Atkinson is one of the closest towns to our Salem office. Custom Hunter Douglas shades, blinds, shutters, and drapery, measured and installed with care.",
      nearbyAreas: ["salem-nh", "hampstead-nh", "windham-nh", "haverhill-ma", "plaistow-nh"],
    },
    {
      slug: "hampstead-nh",
      city: "Hampstead",
      state: "NH",
      population: 8998,
      distance: "Southern NH",
      description: "Hampstead homeowners rely on Window Fantasies for premium custom window treatments. In-home consultation, no store to drive to, and we stand behind every install.",
      nearbyAreas: ["atkinson-nh", "derry-nh", "salem-nh", "windham-nh", "plaistow-nh"],
    },
    {
      slug: "plaistow-nh",
      city: "Plaistow",
      state: "NH",
      population: 7609,
      distance: "Southern NH",
      description: "Plaistow homeowners choose Window Fantasies for custom Hunter Douglas treatments and repairs. We handle the measure, the design, and the install ourselves.",
      nearbyAreas: ["atkinson-nh", "haverhill-ma", "salem-nh", "hampstead-nh", "kingston-nh"],
    },
    {
      slug: "kingston-nh",
      city: "Kingston",
      state: "NH",
      population: 6202,
      distance: "Southern NH",
      description: "Kingston homeowners use Window Fantasies for custom shades, shutters, and motorized shades. One accountable company, and we stand behind every install.",
      nearbyAreas: ["hampstead-nh", "plaistow-nh", "exeter-nh", "salem-nh", "atkinson-nh"],
    },
    {
      slug: "bedford-nh",
      city: "Bedford",
      state: "NH",
      population: 24011,
      distance: "Southern NH",
      description: "Bedford is home to some of the region's finest properties, and to Goedecke Design, the authorized service center. We install and service premium treatments across Bedford.",
      nearbyAreas: ["manchester-nh", "nashua-nh", "londonderry-nh", "derry-nh", "salem-nh"],
    },
    {
      slug: "portsmouth-nh",
      city: "Portsmouth",
      state: "NH",
      population: 21956,
      distance: "Seacoast NH",
      description: "Portsmouth and the Seacoast are a core market for Window Fantasies. Coastal homes, condos, and historic properties, all fitted with custom Hunter Douglas treatments measured and installed with care.",
      nearbyAreas: ["exeter-nh", "hampton-nh", "stratham-nh", "dover-nh", "newburyport-ma"],
    },
    {
      slug: "exeter-nh",
      city: "Exeter",
      state: "NH",
      population: 16097,
      distance: "Seacoast NH",
      description: "Exeter homeowners choose Window Fantasies for custom shades, shutters, and drapery. Samples viewed in your own light, and we stand behind every install.",
      nearbyAreas: ["stratham-nh", "hampton-nh", "portsmouth-nh", "kingston-nh", "seabrook-nh"],
    },
    {
      slug: "hampton-nh",
      city: "Hampton",
      state: "NH",
      population: 15853,
      distance: "Seacoast NH",
      description: "Hampton and the beaches are perfect for Hunter Douglas Palm Beach™ Polysatin™ Shutters and solar shades that stand up to sun and salt air. We measure and install it all ourselves.",
      nearbyAreas: ["seabrook-nh", "exeter-nh", "portsmouth-nh", "stratham-nh", "newburyport-ma"],
    },
    {
      slug: "stratham-nh",
      city: "Stratham",
      state: "NH",
      population: 7255,
      distance: "Seacoast NH",
      description: "Stratham homeowners rely on Window Fantasies for premium custom window treatments. In-home consultation, one company from measure to install.",
      nearbyAreas: ["exeter-nh", "portsmouth-nh", "hampton-nh", "dover-nh", "seabrook-nh"],
    },
    {
      slug: "seabrook-nh",
      city: "Seabrook",
      state: "NH",
      population: 8693,
      distance: "Seacoast NH",
      description: "Seabrook homeowners choose Window Fantasies for custom Hunter Douglas treatments and repairs. The same care whether it is one window or the whole home.",
      nearbyAreas: ["hampton-nh", "exeter-nh", "newburyport-ma", "amesbury-ma", "portsmouth-nh"],
    },
    {
      slug: "dover-nh",
      city: "Dover",
      state: "NH",
      population: 32741,
      distance: "Seacoast NH",
      description: "Dover homeowners use Window Fantasies for shades, blinds, shutters, and motorization. Serviced by Window Fantasies, and we stand behind every install.",
      nearbyAreas: ["portsmouth-nh", "stratham-nh", "exeter-nh", "hampton-nh", "newburyport-ma"],
    },
    {
      slug: "methuen-ma",
      city: "Methuen",
      state: "MA",
      population: 53059,
      distance: "Merrimack Valley MA",
      description: "Methuen is home ground for Window Fantasies. Our founder spent his firefighting career here, and we serve Methuen homes with custom Hunter Douglas treatments measured and installed with care.",
      nearbyAreas: ["andover-ma", "haverhill-ma", "lawrence-ma", "salem-nh", "north-andover-ma"],
    },
    {
      slug: "andover-ma",
      city: "Andover",
      state: "MA",
      population: 36569,
      distance: "Merrimack Valley MA",
      description: "Andover's established homes are a strong fit for premium Hunter Douglas shades, shutters, and drapery. We bring the samples to you and install everything ourselves.",
      nearbyAreas: ["north-andover-ma", "methuen-ma", "haverhill-ma", "lawrence-ma", "plaistow-nh"],
    },
    {
      slug: "north-andover-ma",
      city: "North Andover",
      state: "MA",
      population: 30915,
      distance: "Merrimack Valley MA",
      description: "North Andover homeowners choose Window Fantasies for custom window treatments, measured and installed with care, and we stand behind every install.",
      nearbyAreas: ["andover-ma", "methuen-ma", "haverhill-ma", "lawrence-ma", "plaistow-nh"],
    },
    {
      slug: "haverhill-ma",
      city: "Haverhill",
      state: "MA",
      population: 67787,
      distance: "Merrimack Valley MA",
      description: "Haverhill homeowners rely on Window Fantasies for custom Hunter Douglas treatments and repairs. Samples viewed in your home, installed price at your table.",
      nearbyAreas: ["methuen-ma", "andover-ma", "north-andover-ma", "plaistow-nh", "atkinson-nh"],
    },
    {
      slug: "lawrence-ma",
      city: "Lawrence",
      state: "MA",
      population: 89143,
      distance: "Merrimack Valley MA",
      description: "Lawrence homeowners rely on Window Fantasies for premium custom treatments. One accountable company, and we stand behind every install.",
      nearbyAreas: ["methuen-ma", "andover-ma", "north-andover-ma", "haverhill-ma", "salem-nh"],
    },
    {
      slug: "newburyport-ma",
      city: "Newburyport",
      state: "MA",
      population: 18289,
      distance: "North Shore MA",
      description: "Newburyport's coastal and historic homes are a beautiful fit for custom shutters, sheers, and drapery. We measure, design, and install it all ourselves.",
      nearbyAreas: ["amesbury-ma", "seabrook-nh", "hampton-nh", "haverhill-ma", "portsmouth-nh"],
    },
    {
      slug: "amesbury-ma",
      city: "Amesbury",
      state: "MA",
      population: 17366,
      distance: "North Shore MA",
      description: "Amesbury homeowners choose Window Fantasies for custom Hunter Douglas window treatments, serviced personally by our team.",
      nearbyAreas: ["newburyport-ma", "seabrook-nh", "haverhill-ma", "hampton-nh", "plaistow-nh"],
    },
    {
      slug: "boston-ma",
      city: "Boston",
      state: "MA",
      population: 675647,
      distance: "Greater Boston MA",
      description: "Window Fantasies serves Boston condos and towers, including the South End, with high-end custom Hunter Douglas treatments and PowerView® Automation. There is no place in New England we will not travel.",
      nearbyAreas: ["cambridge-ma", "andover-ma", "lawrence-ma", "methuen-ma", "north-andover-ma"],
    },
    {
      slug: "cambridge-ma",
      city: "Cambridge",
      state: "MA",
      population: 118403,
      distance: "Greater Boston MA",
      description: "Cambridge homeowners and condo owners use Window Fantasies for custom shades, sheers, and motorization. We bring the samples to your home and install everything ourselves.",
      nearbyAreas: ["boston-ma", "andover-ma", "methuen-ma", "lawrence-ma", "haverhill-ma"],
    },
    {
      slug: "hyannis-ma",
      city: "Hyannis",
      state: "MA",
      population: 14120,
      distance: "Cape Cod MA",
      description: "On Cape Cod, sun and salt air call for Hunter Douglas Palm Beach™ Polysatin™ Shutters and solar shades built to resist warping and fading. We travel the Cape for custom Hunter Douglas installs, from the bridge to the tip.",
      // Cape Cod has no sibling town pages yet; link the real MA pages so the band renders.
      nearbyAreas: ["boston-ma", "cambridge-ma"],
    },
    {
      slug: "portland-me",
      city: "Portland",
      state: "ME",
      population: 68408,
      distance: "Southern Maine",
      description: "Southern Maine is part of the range. Portland homes and condos get the same custom Hunter Douglas treatments and professional installation as everywhere else we serve. Distance may carry a travel charge.",
      // No other Maine pages exist yet; the nearest real pages are the NH Seacoast towns.
      nearbyAreas: ["portsmouth-nh", "dover-nh", "hampton-nh", "exeter-nh", "stratham-nh"],
    },
    {
      slug: "burlington-vt",
      city: "Burlington",
      state: "VT",
      population: 44743,
      distance: "Vermont",
      description: "Vermont is on the map too. We travel for the right project, bringing custom Hunter Douglas treatments, motorization, and professional installation to Burlington-area homes. Distance may carry a travel charge.",
      nearbyAreas: ["portland-me", "manchester-nh", "nashua-nh", "salem-nh", "bedford-nh"],
    },
  ],

  // Real reviews only (research/real-reviews.md). No fabrication.
  testimonials: [
    {
      id: "t01",
      body: "I am a contractor and hired Window Fantasies to provide and install luxury window dressings for several of my clients. Jimmy was well mannered, knowledgeable, and straight forward about expectations. I will continue to work with this company.",
      name: "Tony Squillini",
      rating: 5,
      date: "5 months ago",
      source: "Google",
      title: "Contractor",
      isReal: true,
    },
    {
      id: "t02",
      body: "One of the top outfits in the Southern NH and New England region for luxury blinds. Highly recommend!",
      name: "Jonathan Hahn",
      rating: 5,
      date: "4 months ago",
      source: "Google",
      isReal: true,
    },
    {
      // Vicky O left a real 5-star Google review; the written text was truncated
      // in the source screenshot, so we render this as a rating-only card and
      // never fabricate a quote. Pull full text before adding a body.
      id: "t03",
      body: "",
      name: "Vicky O",
      rating: 5,
      date: "4 months ago",
      source: "Google",
      isReal: true,
    },
    {
      id: "t04",
      body: "Excellent service all the way around.",
      name: "Loren C.",
      rating: 5,
      source: "Yelp",
      isReal: true,
    },
    {
      id: "t05",
      body: "When I saw the price I had some sticker shock. After doing some research and comparing prices I feel like I got a good deal, and the quality is exactly what you would expect from Hunter Douglas.",
      name: "Banjo A.",
      rating: 5,
      source: "Yelp",
      title: "Nashua, NH",
      isReal: true,
    },
    {
      id: "t06",
      body: "Barbara left a positive review on Facebook.",
      name: "Barbara P.",
      rating: 5,
      source: "Facebook",
      title: "Peterborough, NH",
      isReal: true,
    },
  ],

  reviewSurvey: {
    eyebrow: "Real reviews, real names",
    h2: "A small, real, five-star record.",
    intro:
      "Every review above is verbatim from a New England homeowner or contractor, pulled straight from Google, Yelp, and Facebook. If Jim has measured your windows, add yours below.",
    starPrompt: "How did Jim do?",
    /** Sits in the label slot at rest, so the reserved line carries the affordance
     *  instead of holding an empty void under the stars. */
    starHint: "Choose a rating to start.",
    starLabels: [
      "1 star, poor",
      "2 stars, below expectations",
      "3 stars, it was fine",
      "4 stars, very good",
      "5 stars, excellent",
    ],
    privateBranch: {
      h3: "Tell Jim what went wrong.",
      body: "This one goes straight to Jim and stays between the two of you. He answers his own phone, he installed the work himself, and he stands behind every job he has ever done. Tell him what happened and he will make it right.",
      nameLabel: "Your name",
      contactLabel: "Phone or email",
      contactHint: "So Jim can reach you directly.",
      messageLabel: "What happened?",
      messagePlaceholder: "Tell Jim what went wrong, and what would make it right.",
      submitLabel: "Send this to Jim",
      sendingLabel: "Sending...",
      successH3: "Jim has it.",
      successBody:
        "He reads these himself, usually the same day, and he will call you. Thank you for telling him directly. It is the only way he can put it right.",
    },
    publicBranch: {
      h3: "Glad to hear it.",
      body: "Tell the next New England homeowner what the work was like. Jim reads every one of these himself.",
      nameLabel: "Your name",
      townLabel: "Your town",
      messageLabel: "How did it go?",
      messagePlaceholder: "What did Jim do for you, and how did it turn out?",
      submitLabel: "Submit my review",
      sendingLabel: "Sending...",
      successH3: "Thank you. That means a lot to a small shop.",
      successBody:
        "Jim has your review. One more thing, and it is the single biggest help you can hand a small business: post it on Google, where the next homeowner hunting for a real Hunter Douglas dealer will actually find it.",
      googleCtaLabel: "Post it on Google",
      googleCtaNote: "Opens Google in a new tab. Takes about 30 seconds.",
    },
    errorMessage:
      "Something went wrong sending that. Please call Jim at (603) 891-5755 and he will take care of it himself.",
  },

  stats: [
    { number: "30", suffix: "+", label: "Years in window fashions across New England" },
    { number: "5.0", label: "Star rating on Google, in customers' own words" },
    { number: "4", label: "New England states we cover, plus Cape Cod" },
  ],

  // Answer-first FAQ built from the market's real buyer questions (AEO).
  faq: [
    {
      q: "How much do Hunter Douglas window treatments cost in New Hampshire?",
      a: "Custom window treatments are a premium, made-to-measure purchase, so pricing depends on the window size, the product, and the options. As a rough sense of scale, a single high-end shade can run around $1,600, and many homes have far more than one window. That is exactly why the in-home consultation is free: we measure your actual windows and give you a real installed price at your kitchen table, with no obligation and no surprises. Yes, it is an investment, and it is built to last.",
      category: "Cost",
    },
    {
      q: "Are Hunter Douglas shades worth the price?",
      a: "For most homeowners, yes. You are buying the luxury end of the window: a custom product built for your exact opening, backed by the Hunter Douglas Limited Lifetime Warranty, and serviced by the person who installed it. They last for years, they hold their look, and options like room darkening and motorization solve real problems. We will also tell you honestly if a simpler product fits your situation better. We sell you what you deserve, not the most expensive thing on the truck.",
      category: "Value",
    },
    {
      q: "Do you repair Hunter Douglas blinds, even if I did not buy them from you?",
      a: "Yes. Hunter Douglas products carry the Hunter Douglas Limited Lifetime Warranty, subject to the manufacturer's warranty terms, so a covered repair itself costs you nothing, even on treatments you bought elsewhere or from a shop that has closed. The authorized service center is Goedecke Design in Bedford, New Hampshire. You can drive your blind there yourself at no cost, or we can take it down, deliver it, and reinstall it for a flat service fee that covers the time and travel. We will tell you that number upfront, before anything happens.",
      category: "Repairs",
    },
    {
      q: "How long does it take to get custom window treatments installed?",
      a: "It starts with a free in-home consultation where we measure and help you choose. Because every treatment is custom-fabricated for your exact windows, there is a build time after you order, and then we schedule the install. We will give you a realistic timeline on the visit. Rush situations are worth a conversation, so just ask.",
      category: "Timeline",
    },
    {
      q: "Do you offer smart or motorized shades I can control from my phone?",
      a: "Yes. Hunter Douglas PowerView® Automation lets you control your shades from your phone, your voice, or a remote, and set them on automatic schedules. You can even adjust them from out of state. Snowbirds run their New England shades from Florida. It is ideal for hard-to-reach windows and for cutting glare and UV automatically. We set it all up and teach you how to use it.",
      category: "Smart Home",
    },
    {
      q: "Do I need to measure my own windows before the consultation?",
      a: "No. We measure every window during the free in-home visit. Custom Hunter Douglas products are fabricated to your exact opening, so a precise professional measurement matters, and it is part of the service. All you need to do is book the consultation.",
      category: "Measuring",
    },
    {
      q: "Do you have a showroom I can visit?",
      a: "No storefront, and that is on purpose. A shade looks completely different under store lights than it does in your home at four in the afternoon. So we shop at home with you. We come to your home with the real Hunter Douglas samples, hold them in your windows, and show you how they look in your own light.",
      category: "Consultation",
    },
    {
      q: "What areas do you serve?",
      a: "All of New England. New Hampshire, Massachusetts, Maine, Vermont, and Cape Cod. We travel from the tip of the Cape to Maine and Vermont. There is no place in New England we will not go, though longer distances may carry a travel charge. We will tell you upfront.",
      category: "Service Area",
    },
  ],

  // Legacy scaffold shape, kept empty-but-valid so the type holds. The LIVE
  // quiz (the /quiz archetype experience) reads src/data/quiz.ts instead;
  // no component renders this object.
  quiz: {
    intro: { eyebrow: "", h1: "", subhead: "", ctaStart: "" },
    steps: [],
    results: [],
    valueProof: { heading: "", intro: "", stats: [], sourceNote: "" },
  },

  cta: {
    h1: "Let us bring the samples to you.",
    subhead:
      "The in-home consultation is free. We bring the real Hunter Douglas samples, measure your windows, and give you an honest installed price at your kitchen table. No pressure, no store to drive to, and we stand behind every install.",
    ctaPrimary: { label: "Request Your Free In-Home Consultation", href: CONSULT_HREF },
    ctaSecondary: { label: "Call Us", href: `tel:+1${PHONE_TEL}` },
  },

  // [DEMO COPY — pending attorney review] Plain-language, NH governing law.
  legal: {
    privacy: {
      title: "Privacy Policy",
      lastUpdated: "June 30, 2026",
      summary:
        "What information Window Fantasies collects when you request a consultation, how we use it, who we share it with, and the choices you have. Plain language, by design.",
      blocks: [
        { kind: "p", content: "Window Fantasies LLC is an Authorized Hunter Douglas Dealer based in Salem, New Hampshire, serving all of New England. This Privacy Policy explains what information we collect when you use our website or request a consultation, how we use it, who we share it with, and the choices you have. We wrote it in plain language on purpose. If anything here is unclear, call (603) 891-5755 and ask." },

        { kind: "h2", content: "Information we collect" },
        { kind: "p", content: "We collect information you give us directly. When you request a consultation, ask about a repair, or contact us, we collect your name, phone number, email, town or address, and the project details you share, such as the rooms, windows, and products you are interested in." },
        { kind: "p", content: "We also collect standard technical data automatically. When you visit the site, our hosting and analytics tools record information such as your IP address, browser and device type, the pages you view, and the site that referred you. This helps us keep the site running and useful." },

        { kind: "h2", content: "How we use your information" },
        { kind: "ul", content: [
          "Schedule and prepare for your free in-home consultation",
          "Answer questions about products, repairs, and service",
          "Send follow-ups, quotes, and appointment details",
          "Provide warranty service and repairs",
          "Measure and improve how the website performs",
          "Meet our legal, tax, and accounting obligations",
        ] },

        { kind: "h2", content: "We do not sell your information" },
        { kind: "p", content: "We do not sell your personal information, and we do not share it for cross-context behavioral advertising. Your contact details stay between you and Window Fantasies." },

        { kind: "h2", content: "Service providers we rely on" },
        { kind: "p", content: "We use a small number of trusted third-party services to run the business, such as website hosting, analytics, and email delivery. Each one processes only the data it needs and is bound by its own privacy terms." },

        { kind: "h2", content: "Your privacy rights" },
        { kind: "p", content: "Depending on where you live, you may have the right to access, correct, or delete the personal information we hold about you, and to opt out of any sale or sharing. To exercise any of these rights, email windowfantasies@gmail.com or call (603) 891-5755. We will not discriminate against you for exercising a privacy right." },

        { kind: "h2", content: "Contact us" },
        { kind: "p", content: "Window Fantasies LLC, 280 Main Street, Salem, NH 03079. Email windowfantasies@gmail.com or call (603) 891-5755 with any privacy question." },
      ],
    },
    terms: {
      title: "Terms of Service",
      lastUpdated: "June 30, 2026",
      summary:
        "The terms that govern your use of this website and any consultation or order you place with Window Fantasies. Short and readable, with your written quote as the controlling document.",
      blocks: [
        { kind: "p", content: "These Terms of Service govern your use of this website and any consultation, quote, or order you place with Window Fantasies LLC of Salem, New Hampshire. By using the site or requesting a consultation, you agree to these terms. We kept them short and readable. The written quote we give you at your consultation is the controlling document for any specific order." },

        { kind: "h2", content: "Consultations and quotes" },
        { kind: "p", content: "The in-home consultation is free and carries no obligation to buy. Quotes are based on the measurements Jim takes at your home and are valid for the period stated on the quote. An order is accepted once you approve the written quote and any deposit terms in writing." },

        { kind: "h2", content: "Custom products" },
        { kind: "p", content: "Hunter Douglas window treatments are custom-fabricated for your exact windows. Because of that, orders generally cannot be cancelled or returned once fabrication begins. Jim will confirm the products, colors, and options with you before the order is placed." },

        { kind: "h2", content: "Warranty and repairs" },
        { kind: "p", content: "Hunter Douglas products carry the Hunter Douglas Limited Lifetime Warranty, subject to the manufacturer's warranty terms. A covered warranty repair itself costs you nothing. If you ask Jim to handle pickup, delivery to the authorized service center, and reinstallation, a flat service fee applies, disclosed to you in advance." },

        { kind: "h2", content: "Governing law" },
        { kind: "p", content: "These terms are governed by the laws of the State of New Hampshire. Any dispute that cannot be resolved by a direct conversation will be handled in the state or federal courts located in New Hampshire. We would always rather pick up the phone and fix it first." },

        { kind: "h2", content: "Contact us" },
        { kind: "p", content: "Window Fantasies LLC, 280 Main Street, Salem, NH 03079. Email windowfantasies@gmail.com or call (603) 891-5755 with any question about these terms." },
      ],
    },
  },
};

export default siteConfig;
