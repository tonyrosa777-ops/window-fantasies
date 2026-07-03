/**
 * site.ts — All site copy and content lives here.
 * Source of truth for every component (no hard-coded strings).
 *
 * Window Fantasies LLC — owner Jim Garrity. Authorized Hunter Douglas Centurion
 * dealer serving all of New England. Voice: educate, do not sell (voice-and-tone.md).
 * Facts: facts-of-record.md wins on conflicts.
 *
 * Public contact ONLY: phone (603) 891-5755, email windowfantasies@gmail.com,
 * office 280 Main Street, Salem, NH 03079. NEVER publish Jim's personal cell.
 *
 * Zero em dashes in any string literal (CLAUDE.md §13 absolute rule).
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
  image: string;
  alt: string;
  blurb: string;
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
  body: string;
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

export const siteConfig: SiteConfig = {
  business: {
    name: "Window Fantasies",
    legalName: "Window Fantasies LLC",
    tagline: "The finest window treatments in New England, by hand.",
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
  },

  hero: {
    eyebrow: "Authorized Hunter Douglas Centurion Dealer · All of New England",
    h1: "The finest window treatments in New England, by hand.",
    h1WithEmphasis: {
      text: "The finest window treatments in New England, by hand.",
      emphasis: ["hand"],
    },
    subhead:
      "Measured, designed, and installed by Jim himself. Guaranteed for life. Motorized shades you control from your phone, or a beach in Florida.",
    trustMicrocopy: "Free in-home consultation. Jim brings the showroom to you.",
    ctaPrimary: { label: "Request Your Free In-Home Consultation", href: CONSULT_HREF },
    ctaSecondary: { label: "Call Jim", href: `tel:+1${PHONE_TEL}` },
  },

  // Reframed as "why the showroom comes to you" reassurances, answer-first.
  painPoints: [
    {
      icon: "home",
      title: "No showroom, on purpose",
      body: "You cannot judge a shade under fluorescent store lights. Jim brings the real Hunter Douglas samples to your home, holds them in your own windows, and shows you how they look in your light, at your time of day.",
    },
    {
      icon: "shield",
      title: "Guaranteed for life",
      body: "Hunter Douglas products are guaranteed for life, and Jim stands behind every install. You bought Hunter Douglas, you call Jim, and he answers. That is the whole promise.",
    },
    {
      icon: "wrench",
      title: "Repairs, even if you bought it elsewhere",
      body: "Broke a shade you bought from a shop that closed? Jim still helps. Hunter Douglas repairs are free under the lifetime warranty, and Jim can take the blind up to the authorized service center and bring it back.",
    },
    {
      icon: "handshake",
      title: "No pressure, ever",
      body: "Jim sells you what you deserve, not what he wants to move. Whether you live in a trailer or a penthouse, you get the same education, the same honesty, and the same Jim.",
    },
  ],

  about: {
    eyebrow: "About Jim",
    h1: "A retired firefighter who measures, designs, and installs it all by hand.",
    paragraphs: [
      "I am Jim Garrity. I am a retired fire lieutenant out of Methuen, and I have spent more than thirty years in window fashions. A few years ago I bought Window Fantasies outright, and I moved the Hunter Douglas Centurion dealership the previous owner spent decades earning down to Salem, New Hampshire.",
      "Centurion is the top tier Hunter Douglas gives a dealer. It is not a title you buy, it is one you earn. What it means for you is simple: you get the full line, the newest products, and someone who actually knows how to fit them to your home.",
      "I do not have a showroom, and that is on purpose. A shade looks one way under store lights and a completely different way in your kitchen at four in the afternoon. So I bring the showroom to you. I come to your home with the real samples, I hold them in your windows, and I show you exactly what you are getting before you spend a dollar.",
      "I measure it, I design it, and I install it myself. When I am in your home, I treat it the way I treated a call for thirty years. You do not want to be talked at, you want the truth and a clear plan. I give you both.",
      "Hunter Douglas is the Mercedes-Benz for your window. It is custom, it is built for your exact opening, and it is guaranteed for life. If something ever goes wrong, you call me and I answer. And if God ever takes me home, you call Hunter Douglas and they will tell you who took my place. That is what buying quality should feel like.",
      "Everyone gets the same me. The lady in a double-wide who scratched a lucky ticket and wants one Luminette in her kitchen gets the same care as the client with thirty windows in a Boston tower. I built this business on that, and I am not about to change it.",
    ],
    credentials: [
      { title: "Authorized Hunter Douglas Centurion Dealer", description: "Centurion is the top dealer tier Hunter Douglas offers. Full product line, newest releases, and factory-level product knowledge." },
      { title: "30+ Years in Window Fashions", description: "More than three decades measuring, designing, and installing custom window treatments across New England." },
      { title: "Retired Fire Lieutenant", description: "A career in the Methuen Fire Department. Same calm-under-pressure, tell-you-the-truth approach brought to every home consultation." },
      { title: "Guaranteed for Life", description: "Hunter Douglas products carry a lifetime guarantee, and Jim services them personally. He repairs even treatments bought elsewhere." },
      { title: "BBB A+ Accredited", description: "Accredited by the Better Business Bureau with an A+ rating." },
      { title: "Measure, Design, and Install by Hand", description: "Jim personally handles every step. No sales team, no subcontractors, no call center. When you call, you get Jim." },
    ],
    photo: { src: "/images/about/jim-portrait.jpg", alt: "Jim Garrity, the owner, beside a Hunter Douglas window treatment he measured and installed by hand." },
    cta: { label: "Request a Free Consultation", href: CONSULT_HREF },
  },

  // The 7 services (design-system §11 + facts-of-record). Photo-led.
  services: [
    {
      slug: "in-home-consultation",
      name: "Free In-Home Consultation",
      shortDescription: "Jim brings the Hunter Douglas showroom to your home, holds real samples in your own windows, and gives you an installed price at your kitchen table. No cost, no pressure.",
      longDescription: "There is no showroom to drive to, and that is by design. A shade looks one way in a store and another way in your home. Jim comes to you with the actual Hunter Douglas samples, holds them in your windows, and shows you how each one behaves in your light. You get an education first, then an honest, installed price. The consultation is always free.",
      features: [
        "Real Hunter Douglas samples viewed in your own light",
        "Jim measures every window himself",
        "Installed price quoted at your kitchen table",
        "Price includes install and removal of your old treatments",
        "Educate first, never a hard sell",
        "Serving all of New England",
      ],
      pricingNote: "Always free. The consultation costs you nothing.",
      imageSrc: "/images/services/in-home-consultation.jpg",
      imageW: 2528,
      imageH: 1685,
      imageAlt: "Hands holding a Hunter Douglas fabric sample during an in-home consultation.",
      cta: { label: "Request a Free Consultation", href: CONSULT_HREF },
    },
    {
      slug: "interior-design",
      name: "Interior Design Guidance",
      shortDescription: "Not sure what fits the room? Jim reads the light, the architecture, and how you live, then matches the right Hunter Douglas product to it. Design help built into every consultation.",
      longDescription: "Choosing window treatments is a design decision, not just a purchase. Jim looks at how the light moves through the room, the style of the home, and how you actually use the space, then recommends what belongs there. Sheers for diffused light, cellular for a bedroom you want dark, shutters for a timeless look. The guidance comes standard.",
      features: [
        "Product matched to your room and your light",
        "Fabric, color, and texture guidance with real samples",
        "Layering options like drapery over sheers",
        "Recommendations for privacy, glare, and energy savings",
        "Advice you can trust, sell you what you deserve",
        "No design fee, it is part of the consultation",
      ],
      pricingNote: "Included with your free consultation.",
      imageSrc: "/images/services/interior-design.jpg",
      imageW: 2528,
      imageH: 1685,
      imageAlt: "A navy drapery treatment in a modern loft with a city view.",
      cta: { label: "Request a Free Consultation", href: CONSULT_HREF },
    },
    {
      slug: "free-estimates",
      name: "Free Estimates",
      shortDescription: "Every quote is free and it is the real, installed number. It includes installation and removal of your existing treatments. No surprise add-ons after the fact.",
      longDescription: "Hunter Douglas is custom and premium, so pricing comes from a real measurement, not a guess online. Jim gives you the installed price at your table, and it already includes taking down and hauling away your old blinds. You will know exactly what you are spending before you commit to anything.",
      features: [
        "Installed price, not a teaser",
        "Includes removal and disposal of old treatments",
        "Priced from Jim's own measurements",
        "No obligation to buy",
        "Straight answers on cost, always",
        "Financing questions welcome",
      ],
      pricingNote: "Free. Quotes are always no-obligation.",
      imageSrc: "/images/services/free-estimates.jpg",
      imageW: 2528,
      imageH: 1685,
      imageAlt: "A refined living room with Roman shades and a grand piano.",
      cta: { label: "Request a Free Estimate", href: CONSULT_HREF },
    },
    {
      slug: "measuring-and-installation",
      name: "Measuring and Certified Installation",
      shortDescription: "Jim measures every opening and installs every treatment himself. Custom Hunter Douglas is built for your exact window, so a precise measure and a clean install are everything.",
      longDescription: "Custom window treatments are fabricated to your exact opening, which means the measure has to be right the first time. Jim takes every measurement personally and installs the finished product himself. No subcontractors, no handoffs. The people who measure and install are the same person who quoted you.",
      features: [
        "Precise measurement of every opening by Jim",
        "Products fabricated for your exact windows",
        "Clean, certified installation",
        "Old treatments removed and disposed of",
        "One person accountable from measure to install",
        "Guaranteed for life",
      ],
      pricingNote: "Installation is included in your quoted price.",
      imageSrc: "/images/services/measuring-and-installation.jpg",
      imageW: 2528,
      imageH: 1685,
      imageAlt: "Warm wood blinds installed cleanly over a fireplace.",
      cta: { label: "Request a Free Consultation", href: CONSULT_HREF },
    },
    {
      slug: "installs-and-repairs",
      name: "Installs and Repairs",
      shortDescription: "New installs and repairs, both. Hunter Douglas is guaranteed for life, so warranty repairs are free. Jim can pick up, deliver to the authorized service center, and reinstall for you.",
      longDescription: "Hunter Douglas products are guaranteed for life, so a warranty repair itself costs nothing. The authorized service center is Goedecke Design in Bedford, New Hampshire, the hospital for your blind. You can drive it there yourself for free, or Jim can take it down, drive it up, and reinstall it for a flat service fee that covers his time and travel. He will tell you the number straight up, before anything happens.",
      features: [
        "New Hunter Douglas installs across New England",
        "Warranty repairs are free under the lifetime guarantee",
        "Authorized service center: Goedecke Design, Bedford NH",
        "Free option: drop your blind off yourself",
        "Full-service option: Jim handles pickup, repair, and reinstall",
        "The service fee is disclosed upfront, no surprises",
      ],
      pricingNote: "Repair itself is free under warranty. A flat service fee applies if Jim handles pickup and reinstall.",
      notSureNote: "Not sure if yours is Hunter Douglas? Call Jim, he will tell you.",
      imageSrc: "/images/services/installs-and-repairs.jpg",
      imageW: 2528,
      imageH: 1685,
      imageAlt: "Plantation shutters framing French doors with an ocean view.",
      cta: { label: "Ask Jim About a Repair", href: CONSULT_HREF },
    },
    {
      slug: "blind-and-shade-repairs",
      name: "Blind and Shade Repairs",
      shortDescription: "Here is the good news: the fix is often free under the Hunter Douglas lifetime warranty. Cords, mechanisms, motors, and fabric, Jim gets it repaired, even if you bought it somewhere else or from a shop that has closed.",
      longDescription: "Start with the good news: Hunter Douglas products are guaranteed for life, so the fix is often free under warranty. A shade you love should not go in the trash over a broken cord or a tired mechanism. Jim handles Hunter Douglas repairs of all kinds, and he helps even when you did not buy it from him or the original shop is long gone. Tell Jim what broke and he will tell you the honest path forward.",
      features: [
        "Free repairs under the Hunter Douglas lifetime warranty",
        "Cord, mechanism, and hardware repairs",
        "Motor and PowerView troubleshooting",
        "Help even if you bought it elsewhere",
        "Honest guidance on repair versus replace",
        "Flat, disclosed service fee for full pickup and reinstall",
      ],
      pricingNote: "Free under warranty. Flat service fee for full pickup and reinstall, disclosed upfront.",
      notSureNote: "Not sure if yours is Hunter Douglas? Call Jim, he will tell you.",
      imageSrc: "/images/services/blind-and-shade-repairs.jpg",
      imageW: 2528,
      imageH: 1685,
      imageAlt: "A bright kitchen with cellular honeycomb shades and someone reading nearby.",
      cta: { label: "Ask Jim About a Repair", href: CONSULT_HREF },
    },
    {
      slug: "powerview-automation",
      name: "PowerView Motorization",
      shortDescription: "Adjust your shades from your phone, your voice, or from a beach in Florida. Hunter Douglas PowerView automates your treatments on a schedule or on command. Sunglasses for your windows.",
      longDescription: "PowerView is Hunter Douglas motorization done right. Your shades move on a schedule, react to the sun, or respond to your voice, and you can control them from anywhere. Snowbirds run their New England shades from Florida. Think of solar and sheer shades as sunglasses for your windows: they cut glare and UV while you still see out. Jim sets it all up and shows you how to use it.",
      features: [
        "Control from phone, voice, or a wall remote",
        "Schedule shades to open and close automatically",
        "Adjust from anywhere, even out of state",
        "Great for hard-to-reach and high windows",
        "Cuts glare and UV, sunglasses for your windows",
        "Jim configures it and teaches you to use it",
      ],
      pricingNote: "Quote-based. Motorization is priced at your free consultation.",
      imageSrc: "/images/services/powerview-automation.jpg",
      imageW: 2528,
      imageH: 1685,
      imageAlt: "Airy Luminette sheer vertical shades with an ocean view.",
      cta: { label: "Request a Free Consultation", href: CONSULT_HREF },
    },
  ],

  // Trust badges (rendered as a badge row, not licensed logos).
  brandPartners: [
    { name: "Hunter Douglas Centurion Dealer", logoSrc: "" },
    { name: "Guaranteed for Life", logoSrc: "" },
    { name: "BBB A+ Accredited", logoSrc: "" },
    { name: "30+ Years Experience", logoSrc: "" },
    { name: "5.0 Stars on Google", logoSrc: "" },
    { name: "All of New England", logoSrc: "" },
  ],

  // Signature Hunter Douglas products (used on the /portfolio + signature band).
  pastClients: [
    { name: "Silhouette", industry: "Shades", description: "S-vane sheers that float between two sheers for diffused light and daytime privacy. The signature Hunter Douglas look." },
    { name: "Duette Honeycomb", industry: "Shades", description: "Energy-efficient cellular shades with true blackout via LightLock. Takes a beating and still looks great." },
    { name: "Luminette", industry: "Shades", description: "Drapery-like vertical sheers with rotating vanes for doors and wide windows." },
    { name: "Pirouette", industry: "Shades", description: "Soft fabric vanes over a single back sheer for a gentle, contoured look." },
    { name: "Plantation Shutters", industry: "Shutters", description: "Timeless hardwood and poly shutters that never go out of style." },
    { name: "PowerView Automation", industry: "Motorization", description: "Motorized control on a schedule, by voice, or from anywhere in the world." },
  ],

  // Portfolio items (real HD photos). Category typed to the union above.
  workItems: [
    {
      brand: "Silhouette Sheer Shades",
      category: "Shades",
      image: "/images/hunter-douglas/p04.jpg",
      alt: "A premium New England living room with Hunter Douglas Silhouette sheer shades softening the daylight.",
      blurb: "Silhouette sheers diffusing golden-hour light in a premium living room. Daytime privacy without losing the view.",
      w: 2050,
      h: 1025,
    },
    {
      brand: "Wood Blinds",
      category: "Blinds",
      image: "/images/hunter-douglas/p02.jpg",
      alt: "A modern dining room with warm Hunter Douglas wood blinds.",
      blurb: "Parkland wood blinds bringing warmth to a modern dining room. Classic real-wood in dozens of finishes.",
      w: 2050,
      h: 1025,
    },
    {
      brand: "Cellular Shades",
      category: "Shades",
      image: "/images/hunter-douglas/p06.jpg",
      alt: "A bright kitchen with Hunter Douglas Duette cellular honeycomb shades.",
      blurb: "Duette honeycomb shades in a sunny kitchen. Energy-efficient, and available in true blackout.",
      w: 900,
      h: 600,
    },
    {
      brand: "Custom Drapery",
      category: "Drapery",
      image: "/images/hunter-douglas/p05.jpg",
      alt: "Navy custom drapery framing a city view in a modern loft.",
      blurb: "Custom drapery in a city loft, layered for drama and light control. Thousands of fabrics to choose from.",
      w: 1025,
      h: 513,
    },
    {
      brand: "Roller and Solar Shades",
      category: "Shades",
      image: "/images/hunter-douglas/p08.jpg",
      alt: "Clean roller shades in a large rustic-modern room.",
      blurb: "Roller and solar shades in a rustic-modern great room. Sunglasses for your windows, glare and UV handled.",
      w: 2050,
      h: 1025,
    },
    {
      brand: "Plantation Shutters",
      category: "Shutters",
      image: "/images/hunter-douglas/p11.jpg",
      alt: "Wood plantation shutters in warm golden light.",
      blurb: "Hardwood plantation shutters in golden light. Timeless, and built to last a lifetime.",
      w: 1025,
      h: 513,
    },
    {
      brand: "Luminette Sheers",
      category: "Drapery",
      image: "/images/hunter-douglas/p07.jpg",
      alt: "Airy Luminette sheer vertical shades with an ocean view.",
      blurb: "Luminette vertical sheers on a wide ocean-view opening. Drapery softness with the light control of a shade.",
      w: 1025,
      h: 513,
    },
    {
      brand: "Roman Shades",
      category: "Shades",
      image: "/images/hunter-douglas/p10.jpg",
      alt: "Tailored Roman shades in a refined living room with a grand piano.",
      blurb: "Vignette Roman shades in a refined living room. Tailored folds, no exposed cords or rings.",
      w: 2560,
      h: 1714,
    },
    {
      brand: "Coastal Great Room Sheers",
      category: "Shades",
      image: "/images/portfolio/pf-09.jpg",
      alt: "A coastal New England great room with sheer shades softening arched windows and an ocean view.",
      blurb: "Sheer shades diffusing sea light in a vaulted coastal great room.",
      w: 2400,
      h: 1800,
    },
    {
      brand: "Chef's Kitchen Roller Shades",
      category: "Shades",
      image: "/images/portfolio/pf-10.jpg",
      alt: "A warm chef's kitchen with natural woven roller shades at golden hour.",
      blurb: "Woven roller shades warming a chef's kitchen in golden-hour light.",
      w: 2400,
      h: 1800,
    },
    {
      brand: "Primary Bedroom Cellular",
      category: "Shades",
      image: "/images/portfolio/pf-11.jpg",
      alt: "A serene primary bedroom with room-darkening cellular honeycomb shades.",
      blurb: "Room-darkening cellular shades in a calm sage-toned primary bedroom.",
      w: 2400,
      h: 1800,
    },
    {
      brand: "Home Office Wood Blinds",
      category: "Blinds",
      image: "/images/portfolio/pf-12.jpg",
      alt: "A handsome home office with warm wood blinds casting light bars across a walnut desk.",
      blurb: "Real wood blinds striping warm light across a home-office desk.",
      w: 2400,
      h: 1800,
    },
    {
      brand: "Formal Dining Roman Shades",
      category: "Shades",
      image: "/images/portfolio/pf-13.jpg",
      alt: "A formal dining room with botanical-linen Roman shades and a brass chandelier.",
      blurb: "Botanical Roman shades framing a formal dining room in raking light.",
      w: 2400,
      h: 1800,
    },
    {
      brand: "Sunroom Plantation Shutters",
      category: "Shutters",
      image: "/images/portfolio/pf-14.jpg",
      alt: "A bright sunroom with wide-louver white plantation shutters and terracotta tile.",
      blurb: "White plantation shutters filtering light across a plant-filled sunroom.",
      w: 2400,
      h: 1800,
    },
    {
      brand: "Nursery Blackout Shades",
      category: "Shades",
      image: "/images/portfolio/pf-15.jpg",
      alt: "A soft nursery with blush blackout roller shades beside a wooden crib.",
      blurb: "Gentle blackout roller shades in a warm, restful nursery.",
      w: 2400,
      h: 1800,
    },
    {
      brand: "Media Room Blackout",
      category: "Shades",
      image: "/images/portfolio/pf-16.jpg",
      alt: "A walnut-paneled media room with a charcoal motorized blackout shade.",
      blurb: "A motorized blackout shade darkening a warm walnut media room.",
      w: 2400,
      h: 1800,
    },
    {
      brand: "Farmhouse Entry Cafe Shutters",
      category: "Shutters",
      image: "/images/portfolio/pf-17.jpg",
      alt: "A farmhouse entry with lower-half cafe shutters, a rustic bench and baskets.",
      blurb: "Cafe-height shutters bringing privacy and light to a farmhouse entry.",
      w: 2400,
      h: 1800,
    },
    {
      brand: "Loft Floor-to-Ceiling Drapery",
      category: "Drapery",
      image: "/images/portfolio/pf-18.jpg",
      alt: "An exposed-brick loft with floor-to-ceiling greige pinch-pleat drapery on steel windows.",
      blurb: "Floor-to-ceiling drapery softening a brick-and-steel loft.",
      w: 2400,
      h: 1800,
    },
    {
      brand: "Spa Bath Top-Down Shades",
      category: "Shades",
      image: "/images/portfolio/pf-19.jpg",
      alt: "A marble spa bathroom with a top-down-bottom-up cellular shade for light and privacy.",
      blurb: "Top-down-bottom-up shades balancing light and privacy in a spa bath.",
      w: 2400,
      h: 1800,
    },
    {
      brand: "Lake House Drapery & Sheers",
      category: "Drapery",
      image: "/images/portfolio/pf-20.jpg",
      alt: "A lake-house living room with layered sheers under tied-back linen drapery and a stone fireplace.",
      blurb: "Layered sheers and linen drapery framing a golden lake view.",
      w: 2400,
      h: 1800,
    },
  ],

  // The 4 Hunter Douglas categories (Products index). Quote-based, so moqTiers is empty.
  productLines: [
    {
      slug: "shades",
      name: "Shades",
      shortDescription: "The flagship Hunter Douglas category. Silhouette, Pirouette, Luminette, Duette honeycomb, Vignette Roman, and roller and solar shades. Diffused light, daytime privacy, and true blackout when you want it.",
      moqTiers: [],
      features: [
        "Silhouette: S-vane sheers for diffused light and daytime privacy",
        "Duette honeycomb: energy efficient, with true blackout via LightLock",
        "Luminette: drapery-like vertical sheers for doors and wide windows",
        "Vignette: tailored modern Roman folds, no exposed cords",
        "Roller and solar: clean lines, sunglasses for your windows",
        "PowerView motorization available across the line",
      ],
      imageSrc: "/images/products/shades.jpg",
      imageW: 2528,
      imageH: 1685,
    },
    {
      slug: "blinds",
      name: "Blinds",
      shortDescription: "Real-wood warmth and sleek modern options. Parkland wood blinds in 50-plus colors, Modern Precious Metals, soft fabric blinds, and panel-track systems for tall and wide windows.",
      moqTiers: [],
      features: [
        "Parkland wood blinds: classic warmth, 50-plus finishes",
        "Modern Precious Metals: sleek, durable, 70-plus colors",
        "Aria soft blinds: lightweight translucent glow",
        "Skyline panel-track: gliding panels for tall or wide openings",
        "Precise light and privacy control",
        "Guaranteed for life",
      ],
      imageSrc: "/images/products/blinds.jpg",
      imageW: 2528,
      imageH: 1685,
    },
    {
      slug: "shutters",
      name: "Shutters",
      shortDescription: "Timeless and built to last. Heritance hardwood shutters, Palm Beach polysatin that never warps or fades, and NewStyle hybrids that pair a hardwood look with added strength.",
      moqTiers: [],
      features: [
        "Heritance: 100 percent hardwood, dovetail construction",
        "Palm Beach: polysatin that never warps, cracks, or fades",
        "NewStyle: wood and composite hybrid, hardwood look with strength",
        "Ideal for humid rooms, doors, and coastal homes",
        "A classic look that never dates the room",
        "Guaranteed for life",
      ],
      imageSrc: "/images/products/shutters.jpg",
      imageW: 2528,
      imageH: 1685,
    },
    {
      slug: "drapery",
      name: "Drapery",
      shortDescription: "Soften a room and control the light. Carole Fabrics custom drapes with 4,000-plus fabric choices, Luminette sheer panels, and Provenance woven-wood drapes in natural materials.",
      moqTiers: [],
      features: [
        "Carole Fabrics custom drapes: 4,000-plus fabric and color choices",
        "Layer over sheers or hang standalone",
        "Luminette sheer panels: light diffusing with integrated vanes",
        "Provenance woven wood: natural reeds, woods, and bamboo",
        "Adds warmth, softness, and insulation",
        "Coordinated with your shades and shutters",
      ],
      imageSrc: "/images/products/drapery.jpg",
      imageW: 2528,
      imageH: 1685,
    },
  ],

  // Honest-cost anchor rendered on /products and every /products/[slug] page.
  // Same voice as the Cost FAQ below and the homepage CostHonesty band.
  costAnchor: {
    eyebrow: "Honest pricing, upfront",
    body: "Hunter Douglas is custom and premium. As a sense of scale, a single high-end shade can run around $1,600. That is exactly why the in-home consultation is free: Jim measures your actual windows and gives you a real installed price at your kitchen table, with no obligation and no surprises. Yes, it is an investment, and yes, it is guaranteed for life.",
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
      description: "Salem is home. The office and workroom are at 280 Main Street. Most consultations start close to here, and Jim can often be at a Salem home the same week. There is no showroom to visit, Jim brings the Hunter Douglas samples to you.",
      nearbyAreas: ["windham-nh", "derry-nh", "methuen-ma", "atkinson-nh", "hampstead-nh"],
    },
    {
      slug: "windham-nh",
      city: "Windham",
      state: "NH",
      population: 15817,
      distance: "Southern NH",
      description: "Windham homeowners rely on Window Fantasies for custom Hunter Douglas shades, blinds, shutters, and drapery. Jim brings the samples to your home so you see every color in your own light.",
      nearbyAreas: ["salem-nh", "derry-nh", "londonderry-nh", "nashua-nh", "hampstead-nh"],
    },
    {
      slug: "nashua-nh",
      city: "Nashua",
      state: "NH",
      population: 91322,
      distance: "Southern NH",
      description: "Nashua is one of the most active markets Jim serves. Custom window treatments for condos, single-family homes, and lakeside properties, all measured, designed, and installed by hand.",
      nearbyAreas: ["windham-nh", "manchester-nh", "salem-nh", "londonderry-nh", "derry-nh"],
    },
    {
      slug: "manchester-nh",
      city: "Manchester",
      state: "NH",
      population: 115644,
      distance: "Southern NH",
      description: "Manchester is New Hampshire's largest city and a steady market for premium Hunter Douglas treatments. From downtown condos to established neighborhoods, Jim measures and installs everything himself.",
      nearbyAreas: ["bedford-nh", "londonderry-nh", "derry-nh", "nashua-nh", "salem-nh"],
    },
    {
      slug: "derry-nh",
      city: "Derry",
      state: "NH",
      population: 34317,
      distance: "Southern NH",
      description: "Derry homeowners choose Window Fantasies for custom shades, shutters, and motorized shades. One person from measure to install, guaranteed for life.",
      nearbyAreas: ["londonderry-nh", "windham-nh", "salem-nh", "hampstead-nh", "manchester-nh"],
    },
    {
      slug: "londonderry-nh",
      city: "Londonderry",
      state: "NH",
      population: 26368,
      distance: "Southern NH",
      description: "Londonderry families use Jim for everything from a single Luminette to a whole-home Hunter Douglas package. Samples viewed in your home, installed price at your table.",
      nearbyAreas: ["derry-nh", "manchester-nh", "windham-nh", "salem-nh", "bedford-nh"],
    },
    {
      slug: "atkinson-nh",
      city: "Atkinson",
      state: "NH",
      population: 7193,
      distance: "Southern NH",
      description: "Atkinson is one of the closest towns to Jim's Salem office. Custom Hunter Douglas shades, blinds, shutters, and drapery, measured and installed by hand.",
      nearbyAreas: ["salem-nh", "hampstead-nh", "windham-nh", "haverhill-ma", "plaistow-nh"],
    },
    {
      slug: "hampstead-nh",
      city: "Hampstead",
      state: "NH",
      population: 8998,
      distance: "Southern NH",
      description: "Hampstead homeowners rely on Window Fantasies for premium custom window treatments. In-home consultation, guaranteed for life, no showroom to drive to.",
      nearbyAreas: ["atkinson-nh", "derry-nh", "salem-nh", "windham-nh", "plaistow-nh"],
    },
    {
      slug: "plaistow-nh",
      city: "Plaistow",
      state: "NH",
      population: 7609,
      distance: "Southern NH",
      description: "Plaistow homeowners choose Jim for custom Hunter Douglas treatments and repairs. He handles the measure, the design, and the install himself.",
      nearbyAreas: ["atkinson-nh", "haverhill-ma", "salem-nh", "hampstead-nh", "kingston-nh"],
    },
    {
      slug: "kingston-nh",
      city: "Kingston",
      state: "NH",
      population: 6202,
      distance: "Southern NH",
      description: "Kingston homeowners use Window Fantasies for custom shades, shutters, and motorized shades. One accountable person, guaranteed for life.",
      nearbyAreas: ["hampstead-nh", "plaistow-nh", "exeter-nh", "salem-nh", "atkinson-nh"],
    },
    {
      slug: "bedford-nh",
      city: "Bedford",
      state: "NH",
      population: 24011,
      distance: "Southern NH",
      description: "Bedford is home to some of the region's finest properties, and to Goedecke Design, the Hunter Douglas authorized service center. Jim installs and services premium treatments across Bedford.",
      nearbyAreas: ["manchester-nh", "nashua-nh", "londonderry-nh", "derry-nh", "salem-nh"],
    },
    {
      slug: "portsmouth-nh",
      city: "Portsmouth",
      state: "NH",
      population: 21956,
      distance: "Seacoast NH",
      description: "Portsmouth and the Seacoast are a core market for Window Fantasies. Coastal homes, condos, and historic properties, all fitted with custom Hunter Douglas treatments measured and installed by hand.",
      nearbyAreas: ["exeter-nh", "hampton-nh", "stratham-nh", "dover-nh", "newburyport-ma"],
    },
    {
      slug: "exeter-nh",
      city: "Exeter",
      state: "NH",
      population: 16097,
      distance: "Seacoast NH",
      description: "Exeter homeowners choose Jim for custom shades, shutters, and drapery. Samples viewed in your own light, guaranteed for life.",
      nearbyAreas: ["stratham-nh", "hampton-nh", "portsmouth-nh", "kingston-nh", "seabrook-nh"],
    },
    {
      slug: "hampton-nh",
      city: "Hampton",
      state: "NH",
      population: 15853,
      distance: "Seacoast NH",
      description: "Hampton and the beaches are perfect for Palm Beach shutters and solar shades that stand up to sun and salt air. Jim measures and installs it all himself.",
      nearbyAreas: ["seabrook-nh", "exeter-nh", "portsmouth-nh", "stratham-nh", "newburyport-ma"],
    },
    {
      slug: "stratham-nh",
      city: "Stratham",
      state: "NH",
      population: 7255,
      distance: "Seacoast NH",
      description: "Stratham homeowners rely on Window Fantasies for premium custom window treatments. In-home consultation, one person from measure to install.",
      nearbyAreas: ["exeter-nh", "portsmouth-nh", "hampton-nh", "dover-nh", "seabrook-nh"],
    },
    {
      slug: "seabrook-nh",
      city: "Seabrook",
      state: "NH",
      population: 8693,
      distance: "Seacoast NH",
      description: "Seabrook homeowners choose Jim for custom Hunter Douglas treatments and repairs. The same care whether it is one window or the whole home.",
      nearbyAreas: ["hampton-nh", "exeter-nh", "newburyport-ma", "amesbury-ma", "portsmouth-nh"],
    },
    {
      slug: "dover-nh",
      city: "Dover",
      state: "NH",
      population: 32741,
      distance: "Seacoast NH",
      description: "Dover homeowners use Window Fantasies for shades, blinds, shutters, and motorization. Guaranteed for life, serviced personally by Jim.",
      nearbyAreas: ["portsmouth-nh", "stratham-nh", "exeter-nh", "hampton-nh", "newburyport-ma"],
    },
    {
      slug: "methuen-ma",
      city: "Methuen",
      state: "MA",
      population: 53059,
      distance: "Merrimack Valley MA",
      description: "Methuen is Jim's home ground. He spent his firefighting career here, and he serves Methuen homes with custom Hunter Douglas treatments measured and installed by hand.",
      nearbyAreas: ["andover-ma", "haverhill-ma", "lawrence-ma", "salem-nh", "north-andover-ma"],
    },
    {
      slug: "andover-ma",
      city: "Andover",
      state: "MA",
      population: 36569,
      distance: "Merrimack Valley MA",
      description: "Andover's established homes are a strong fit for premium Hunter Douglas shades, shutters, and drapery. Jim brings the showroom to you and installs everything himself.",
      nearbyAreas: ["north-andover-ma", "methuen-ma", "haverhill-ma", "lawrence-ma", "plaistow-nh"],
    },
    {
      slug: "north-andover-ma",
      city: "North Andover",
      state: "MA",
      population: 30915,
      distance: "Merrimack Valley MA",
      description: "North Andover homeowners choose Window Fantasies for custom window treatments, measured and installed by hand, guaranteed for life.",
      nearbyAreas: ["andover-ma", "methuen-ma", "haverhill-ma", "lawrence-ma", "plaistow-nh"],
    },
    {
      slug: "haverhill-ma",
      city: "Haverhill",
      state: "MA",
      population: 67787,
      distance: "Merrimack Valley MA",
      description: "Haverhill homeowners use Jim for custom Hunter Douglas treatments and repairs. Samples viewed in your home, installed price at your table.",
      nearbyAreas: ["methuen-ma", "andover-ma", "north-andover-ma", "plaistow-nh", "atkinson-nh"],
    },
    {
      slug: "lawrence-ma",
      city: "Lawrence",
      state: "MA",
      population: 89143,
      distance: "Merrimack Valley MA",
      description: "Lawrence homeowners rely on Window Fantasies for premium custom treatments. One accountable person, guaranteed for life.",
      nearbyAreas: ["methuen-ma", "andover-ma", "north-andover-ma", "haverhill-ma", "salem-nh"],
    },
    {
      slug: "newburyport-ma",
      city: "Newburyport",
      state: "MA",
      population: 18289,
      distance: "North Shore MA",
      description: "Newburyport's coastal and historic homes are a beautiful fit for custom shutters, sheers, and drapery. Jim measures, designs, and installs it all by hand.",
      nearbyAreas: ["amesbury-ma", "seabrook-nh", "hampton-nh", "haverhill-ma", "portsmouth-nh"],
    },
    {
      slug: "amesbury-ma",
      city: "Amesbury",
      state: "MA",
      population: 17366,
      distance: "North Shore MA",
      description: "Amesbury homeowners choose Jim for custom Hunter Douglas window treatments. Guaranteed for life, serviced personally.",
      nearbyAreas: ["newburyport-ma", "seabrook-nh", "haverhill-ma", "hampton-nh", "plaistow-nh"],
    },
    {
      slug: "boston-ma",
      city: "Boston",
      state: "MA",
      population: 675647,
      distance: "Greater Boston MA",
      description: "Jim serves Boston condos and towers, including the South End, with high-end custom Hunter Douglas treatments and PowerView motorization. There is no place in New England he will not travel.",
      nearbyAreas: ["cambridge-ma", "andover-ma", "lawrence-ma", "methuen-ma", "north-andover-ma"],
    },
    {
      slug: "cambridge-ma",
      city: "Cambridge",
      state: "MA",
      population: 118403,
      distance: "Greater Boston MA",
      description: "Cambridge homeowners and condo owners use Window Fantasies for custom shades, sheers, and motorization. Jim brings the samples to your home and installs everything himself.",
      nearbyAreas: ["boston-ma", "andover-ma", "methuen-ma", "lawrence-ma", "haverhill-ma"],
    },
    {
      slug: "hyannis-ma",
      city: "Hyannis",
      state: "MA",
      population: 14120,
      distance: "Cape Cod MA",
      description: "On Cape Cod, sun and salt air call for Palm Beach shutters and solar shades that will not warp or fade. Jim travels the Cape for custom Hunter Douglas installs, from the bridge to the tip.",
      // Cape Cod has no sibling town pages yet; link the real MA pages so the band renders.
      nearbyAreas: ["boston-ma", "cambridge-ma"],
    },
    {
      slug: "portland-me",
      city: "Portland",
      state: "ME",
      population: 68408,
      distance: "Southern Maine",
      description: "Southern Maine is part of the range. Portland homes and condos get the same custom Hunter Douglas treatments and hand installation as everywhere else Jim serves. Distance may carry a travel charge.",
      // No other Maine pages exist yet; the nearest real pages are the NH Seacoast towns.
      nearbyAreas: ["portsmouth-nh", "dover-nh", "hampton-nh", "exeter-nh", "stratham-nh"],
    },
    {
      slug: "burlington-vt",
      city: "Burlington",
      state: "VT",
      population: 44743,
      distance: "Vermont",
      description: "Vermont is on the map too. Jim travels for the right project, bringing custom Hunter Douglas treatments, motorization, and hand installation to Burlington-area homes. Distance may carry a travel charge.",
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

  stats: [
    { number: "30", suffix: "+", label: "Years in window fashions across New England" },
    { number: "5.0", label: "Star rating on Google, in customers' own words" },
    { number: "1", label: "Person who measures, designs, and installs it all. Jim." },
  ],

  // Answer-first FAQ built from the market's real buyer questions (AEO).
  faq: [
    {
      q: "How much do Hunter Douglas window treatments cost in New Hampshire?",
      a: "Hunter Douglas is a premium, fully custom product, so pricing depends on the window size, the product, and the options. As a rough sense of scale, a single high-end shade can run around $1,600, and many homes have far more than one window. That is exactly why the in-home consultation is free: Jim measures your actual windows and gives you a real installed price at your kitchen table, with no obligation and no surprises. Yes, it is an investment, and yes, it is guaranteed for life.",
      category: "Cost",
    },
    {
      q: "Are Hunter Douglas shades worth the price?",
      a: "For most homeowners, yes. You are buying a Mercedes-Benz for your window: a custom product built for your exact opening, guaranteed for life, and serviced by the person who installed it. They last for years, they hold their look, and options like blackout and motorization solve real problems. Jim will also tell you honestly if a simpler product fits your situation better. He sells you what you deserve, not the most expensive thing on the truck.",
      category: "Value",
    },
    {
      q: "Do you repair Hunter Douglas blinds, even if I did not buy them from you?",
      a: "Yes. Hunter Douglas products are guaranteed for life, so the repair itself is free under warranty, even on treatments you bought elsewhere or from a shop that has closed. The authorized service center is Goedecke Design in Bedford, New Hampshire. You can drive your blind there yourself at no cost, or Jim can take it down, deliver it, and reinstall it for a flat service fee that covers his time and travel. He will tell you that number upfront, before anything happens.",
      category: "Repairs",
    },
    {
      q: "How long does it take to get custom window treatments installed?",
      a: "It starts with a free in-home consultation where Jim measures and helps you choose. Because every treatment is custom-fabricated for your exact windows, there is a build time after you order, and then Jim schedules the install. He will give you a realistic timeline on the visit. Rush situations are worth a conversation. Ask Jim.",
      category: "Timeline",
    },
    {
      q: "Do you offer smart or motorized shades I can control from my phone?",
      a: "Yes. Hunter Douglas PowerView motorization lets you control your shades from your phone, your voice, or a remote, and set them on automatic schedules. You can even adjust them from out of state. Snowbirds run their New England shades from Florida. It is ideal for hard-to-reach windows and for cutting glare and UV automatically. Jim sets it all up and teaches you how to use it.",
      category: "Smart Home",
    },
    {
      q: "Do I need to measure my own windows before the consultation?",
      a: "No. Jim measures every window himself during the free in-home visit. Custom Hunter Douglas products are fabricated to your exact opening, so a precise professional measurement matters, and it is part of the service. All you need to do is book the consultation.",
      category: "Measuring",
    },
    {
      q: "Do you have a showroom I can visit?",
      a: "No showroom, and that is on purpose. A shade looks completely different under store lights than it does in your home at four in the afternoon. So Jim brings the showroom to you. He comes to your home with the real Hunter Douglas samples, holds them in your windows, and shows you how they look in your own light.",
      category: "Consultation",
    },
    {
      q: "What areas do you serve?",
      a: "All of New England. New Hampshire, Massachusetts, Maine, Vermont, and Cape Cod. Jim travels from the tip of the Cape to Maine and Vermont. There is no place in New England he will not go, though longer distances may carry a travel charge. He will tell you upfront.",
      category: "Service Area",
    },
  ],

  // Quiz is not used by Window Fantasies. Kept as an empty-but-valid structure so
  // the type shape holds; the /quiz route is removed and no component renders this.
  quiz: {
    intro: { eyebrow: "", h1: "", subhead: "", ctaStart: "" },
    steps: [],
    results: [],
    valueProof: { heading: "", intro: "", stats: [], sourceNote: "" },
  },

  cta: {
    h1: "Let Jim bring the showroom to you.",
    subhead:
      "The in-home consultation is free. Jim brings the real Hunter Douglas samples, measures your windows, and gives you an honest installed price at your kitchen table. No pressure, no showroom to drive to, guaranteed for life.",
    ctaPrimary: { label: "Request Your Free In-Home Consultation", href: CONSULT_HREF },
    ctaSecondary: { label: "Call Jim", href: `tel:+1${PHONE_TEL}` },
  },

  // [DEMO COPY — pending attorney review] Plain-language, NH governing law.
  legal: {
    privacy: {
      title: "Privacy Policy",
      lastUpdated: "June 30, 2026",
      summary:
        "What information Window Fantasies collects when you request a consultation, how we use it, who we share it with, and the choices you have. Plain language, by design.",
      blocks: [
        { kind: "p", content: "Window Fantasies LLC is a Hunter Douglas Centurion dealer based in Salem, New Hampshire, serving all of New England. This Privacy Policy explains what information we collect when you use our website or request a consultation, how we use it, who we share it with, and the choices you have. We wrote it in plain language on purpose. If anything here is unclear, call (603) 891-5755 and ask." },

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
        { kind: "p", content: "Hunter Douglas products carry a lifetime guarantee, subject to the manufacturer's warranty terms. Warranty repairs are free. If you ask Jim to handle pickup, delivery to the authorized service center, and reinstallation, a flat service fee applies, disclosed to you in advance." },

        { kind: "h2", content: "Governing law" },
        { kind: "p", content: "These terms are governed by the laws of the State of New Hampshire. Any dispute that cannot be resolved by a direct conversation will be handled in the state or federal courts located in New Hampshire. We would always rather pick up the phone and fix it first." },

        { kind: "h2", content: "Contact us" },
        { kind: "p", content: "Window Fantasies LLC, 280 Main Street, Salem, NH 03079. Email windowfantasies@gmail.com or call (603) 891-5755 with any question about these terms." },
      ],
    },
  },
};

export default siteConfig;
