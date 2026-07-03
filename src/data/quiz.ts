/**
 * quiz.ts: the Window Fantasies archetype quiz. Data layer only, zero UI
 * dependency (full-page-archetype-quiz pattern: data and UI fully decoupled).
 *
 * Four archetypes typed from market-intelligence.md §2 (Susan the renovator,
 * Marcus the snowbird automator, the sleep-guarding household, the
 * sticker-shock-then-quality buyer), plus a REPAIR intent override for the
 * warranty-repair trigger ("a shade broke and the original installer is gone").
 *
 * Voice: Jim's plainspoken warmth (design-system.md §9). Educate, do not sell.
 * Every option `detail` mirrors the visitor's situation back to them; the
 * mirroring does the selling. ZERO em dashes in any string (CLAUDE.md §13).
 * Public phone only: (603) 891-5755.
 */

export type QuizType =
  | "light-sculptor"
  | "smart-home"
  | "sleep-sanctuary"
  | "value-craftsman";

/**
 * "repair" is an intent override, not an archetype. A visitor who tells us
 * something broke gets routed to the repair path no matter how the other
 * answers score (the broken-blind caller is a triage case, not a persona).
 */
export type QuizAnswerType = QuizType | "repair";
export type QuizResultKey = QuizType | "repair";

export interface QuizOption {
  label: string;
  /** The mirror line: restates the visitor's situation back to them. */
  detail: string;
  type: QuizAnswerType;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
}

export interface QuizRecommendation {
  name: string;
  reason: string;
  href: string;
  linkLabel: string;
}

export interface QuizResultContent {
  /** Recognition eyebrow, e.g. "This is you". */
  eyebrow: string;
  /** Named archetype identity. */
  name: string;
  headline: string;
  /** Two short paragraphs that name the visitor's situation back and assert fit. */
  body: string[];
  recommendation: QuizRecommendation;
}

/* ============================================================================
   Intro
   ============================================================================ */

export const QUIZ_INTRO = {
  eyebrow: "A one-minute quiz",
  h1: "What should your windows do for you?",
  invitation:
    "Five quick questions about your home and your light. Honest answers get an honest match, and nobody asks for your email.",
  ctaStart: "Start the Quiz",
} as const;

/* ============================================================================
   Questions: in the visitor's voice, about their home, light, sleep, routine.
   Each option's `detail` is the mirror. 5 questions, 4 options each.
   ============================================================================ */

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "trigger",
    question: "What has you thinking about your windows right now?",
    options: [
      {
        label: "We refreshed the room, and now the old blinds look cheap",
        detail:
          "New floors, fresh paint, and suddenly the builder-grade blinds are the worst thing in the room. Jim sees it in almost every home he visits.",
        type: "light-sculptor",
      },
      {
        label: "I have windows I can barely reach, let alone adjust",
        detail:
          "Two-story great rooms, glass over the tub, a whole wall of windows. Beautiful to look at, a chore to operate by hand.",
        type: "smart-home",
      },
      {
        label: "The bedroom never gets dark enough",
        detail:
          "You have felt what one 5am summer sunrise does to a night of sleep. Real blackout is a real thing, and most blinds only pretend.",
        type: "sleep-sanctuary",
      },
      {
        label: "Honestly, something I own just broke",
        detail:
          "Take a breath. If it is Hunter Douglas, the repair is often free under the lifetime warranty, even if you bought it somewhere else. Keep going, your result ends with the fix.",
        type: "repair",
      },
    ],
  },
  {
    id: "afternoon-light",
    question:
      "Picture your main room at four in the afternoon. What do you want the light doing?",
    options: [
      {
        label: "Glowing. Soft and filtered, like the room is lit from within",
        detail:
          "That is the look people point at in magazines. It comes from light passing through fabric, not around it.",
        type: "light-sculptor",
      },
      {
        label: "Whatever I told it to do that morning",
        detail:
          "Shades that moved on schedule before the glare ever hit the TV. You set it once and forget it exists.",
        type: "smart-home",
      },
      {
        label: "Gone, the moment I say so",
        detail:
          "A movie in the afternoon, a nap after a night shift, a nursery at high noon. Dark on demand is the whole assignment.",
        type: "sleep-sanctuary",
      },
      {
        label: "Under control, from something built to take daily use",
        detail:
          "You want the light handled by hardware that still works right in year fifteen. That is a quality question, not a style question.",
        type: "value-craftsman",
      },
    ],
  },
  {
    id: "routine",
    question: "How do window treatments fit into your day right now?",
    options: [
      {
        label: "I mostly leave them alone. They just need to make the room feel right",
        detail:
          "The windows are part of the design, not a control panel. The right treatment does its work quietly, all day.",
        type: "light-sculptor",
      },
      {
        label: "I am up and down all day chasing the sun",
        detail:
          "Open, close, tilt, repeat. That is a job for a schedule, not for you.",
        type: "smart-home",
      },
      {
        label: "I close the bedroom ones tight every night, and light still gets in",
        detail:
          "The glow around the edges, the streetlight stripe on the ceiling. You are not imagining it, most shades leak.",
        type: "sleep-sanctuary",
      },
      {
        label: "I fight with them. Cords, wands, the one that hangs crooked",
        detail:
          "You have replaced cheap blinds before, and you can feel it coming again. That cycle is exactly what buying once ends.",
        type: "value-craftsman",
      },
    ],
  },
  {
    id: "what-matters",
    question: "When you spend real money on the house, what matters most?",
    options: [
      {
        label: "That it feels right. The light, the fabric, the way the room reads",
        detail:
          "You notice the difference between fine and beautiful. Most people do not. You do.",
        type: "light-sculptor",
      },
      {
        label: "That it makes life easier, not just fancier",
        detail:
          "If it cannot run itself, it is one more thing to manage. You are buying back attention, not collecting gadgets.",
        type: "smart-home",
      },
      {
        label: "That the whole house rests better for it",
        detail:
          "Good sleep pays you back every single night. It is hard to say that about most things in a house.",
        type: "sleep-sanctuary",
      },
      {
        label: "That I buy it once, and it is built to outlast me",
        detail:
          "You will pay for quality, you just refuse to pay twice. A lifetime guarantee is not a perk to you, it is the point.",
        type: "value-craftsman",
      },
    ],
  },
  {
    id: "windows",
    question: "And the windows themselves. What are you working with?",
    options: [
      {
        label: "Big and beautiful. The view is the whole point of the room",
        detail:
          "So the treatment has to keep the view and tame the glare at the same time. That is a sheer's job.",
        type: "light-sculptor",
      },
      {
        label: "Tall ones, high ones, or just too many to manage by hand",
        detail:
          "Count them. Past six or eight windows, motorization stops being a luxury and starts being the practical answer.",
        type: "smart-home",
      },
      {
        label: "Bedroom windows that let in every headlight and sunrise",
        detail:
          "Side channels that seal the light gap at the edges exist. Most people have simply never been shown them.",
        type: "sleep-sanctuary",
      },
      {
        label: "Normal windows wearing blinds that keep breaking",
        detail:
          "Nothing wrong with your windows. Everything wrong with what has been hanging on them.",
        type: "value-craftsman",
      },
    ],
  },
];

/* ============================================================================
   Results: recognition eyebrow, named archetype, mirroring body, the fit.
   ============================================================================ */

export const QUIZ_RESULTS: Record<QuizResultKey, QuizResultContent> = {
  "light-sculptor": {
    eyebrow: "This is you",
    name: "The Light Perfectionist",
    headline: "You care how a room feels, not just how it looks.",
    body: [
      "You are the person who notices what four o'clock light does to a room. You do not want darkness and you do not want glare, you want the light shaped, softened, and put to work. That is a design decision, and most blind stores never even ask about it.",
      "Jim fits rooms like yours every week. He brings the real fabric to your windows and holds it up in your own afternoon light, because a sheer that glows in a showroom can go flat in your kitchen. You will see the difference before you spend a dollar.",
    ],
    recommendation: {
      name: "Silhouette and Luminette Sheers",
      reason:
        "Soft fabric vanes floating between two sheers turn hard sun into an even glow, with daytime privacy that never costs you the view. It is the signature Hunter Douglas look, and it is built for rooms like yours.",
      href: "/products/shades",
      linkLabel: "See the Shades",
    },
  },
  "smart-home": {
    eyebrow: "This is you",
    name: "The Effortless Home",
    headline: "You want the house to handle it, so you never have to.",
    body: [
      "Schedules, scenes, a phone that runs the whole wall of glass. You are not chasing gadgets, you are done doing a daily chore a motor should be doing. Tall windows, hard-to-reach windows, twenty windows, it is all the same answer.",
      "Hunter Douglas PowerView is motorization done right, and Jim sets up every bit of it. Your shades move on a schedule, react to the sun, answer your voice, and take orders from a beach in Florida. He configures it, teaches you to use it, and answers the phone when you have a question in year five.",
    ],
    recommendation: {
      name: "PowerView Motorization",
      reason:
        "Control from your phone, your voice, or a schedule that runs itself. Ideal for tall and hard-to-reach windows, and for anyone who would rather live in the house than operate it.",
      href: "/services/powerview-automation",
      linkLabel: "See PowerView",
    },
  },
  "sleep-sanctuary": {
    eyebrow: "This is you",
    name: "The Sanctuary Keeper",
    headline: "You protect the sleep in this house.",
    body: [
      "A bedroom that never gets truly dark. A night shift that needs the noon sun gone. A nursery nap that a single sunbeam can end. You are not being fussy, you are guarding the one thing a home owes everyone in it, real rest.",
      "True blackout exists, and most people have never seen it. Duette honeycomb shades with LightLock seal the light gap at the edges, the part ordinary blackout shades leak. Ask Jim to show you at the consultation, in your own bedroom window, so you can see actual dark.",
    ],
    recommendation: {
      name: "Duette Honeycomb with LightLock",
      reason:
        "Cellular shades with side channels that seal out light at the edges, where every other shade leaks. True blackout for bedrooms, nurseries, and day sleepers, with energy savings all year.",
      href: "/products/shades",
      linkLabel: "See the Shades",
    },
  },
  "value-craftsman": {
    eyebrow: "This is you",
    name: "The Buy-It-Once Buyer",
    headline: "You would rather pay for it once than fight it forever.",
    body: [
      "Who knew shades could cost so much? You did your homework, so you already know the answer, and you also know what replacing cheap blinds every five years adds up to. You are not price-shy, you are waste-shy. There is a difference, and Jim respects it.",
      "Hunter Douglas is guaranteed for life, and Jim measures it, installs it, and services it himself. The consultation is free, and the number he gives you at your kitchen table is the real installed price, with your old blinds hauled away included. Straight answers before you spend a dollar, and a person who picks up after.",
    ],
    recommendation: {
      name: "The Free In-Home Consultation",
      reason:
        "Jim measures your actual windows and gives you an honest installed price on the spot, with no obligation. It is the only accurate way to price a custom product, and it costs you nothing.",
      href: "/request-a-consultation",
      linkLabel: "How the Consultation Works",
    },
  },
  repair: {
    eyebrow: "Good news first",
    name: "The Fix Comes First",
    headline: "Something broke. Here is the good news.",
    body: [
      "Hunter Douglas products are guaranteed for life, so the repair itself is often free under warranty. That holds even if you bought the blind somewhere else, or from a shop that closed years ago. A broken cord or a tired motor is not a reason to throw away a shade you love.",
      "You have two honest paths. Drive the blind to Goedecke Design in Bedford, New Hampshire, the authorized service center, and pay nothing. Or have Jim take it down, deliver it, and reinstall it for a flat service fee he tells you upfront, before anything happens.",
    ],
    recommendation: {
      name: "Blind and Shade Repairs",
      reason:
        "Cords, mechanisms, motors, and fabric, handled through the authorized Hunter Douglas service center. Often free under the lifetime warranty, and Jim helps even if you bought it elsewhere.",
      href: "/services/blind-and-shade-repairs",
      linkLabel: "See How Repairs Work",
    },
  },
};

/* ============================================================================
   Result-screen shared strings (the conversion moment).
   ============================================================================ */

export const QUIZ_RESULT_SCREEN = {
  recommendationEyebrow: "The fit",
  formHeading: "Tell Jim what you found. The consultation is free.",
  formBody:
    "Jim brings the real Hunter Douglas samples to your home, measures your windows himself, and gives you an honest installed price at your kitchen table. No pressure, no obligation.",
  callPrefix: "Prefer to talk it through? Call Jim at",
  startOver: "Start over",
} as const;

/* ============================================================================
   Scoring: pure and deterministic.
   ============================================================================ */

/**
 * Tie-break order: earliest entry wins on equal counts. Ordered from the most
 * specific product story to the most general (the consultation), so a split
 * profile lands on the richer, more concrete recommendation.
 */
export const QUIZ_TYPE_ORDER: QuizType[] = [
  "light-sculptor",
  "smart-home",
  "sleep-sanctuary",
  "value-craftsman",
];

/**
 * Pure scorer. Repair overrides everything (see QuizAnswerType); otherwise the
 * most frequent archetype wins, ties broken by QUIZ_TYPE_ORDER.
 */
export function scoreQuiz(answers: QuizAnswerType[]): QuizResultKey {
  if (answers.includes("repair")) return "repair";

  const counts = new Map<QuizType, number>();
  for (const answer of answers) {
    const t = answer as QuizType;
    counts.set(t, (counts.get(t) ?? 0) + 1);
  }

  let winner: QuizType = QUIZ_TYPE_ORDER[0];
  let best = -1;
  for (const t of QUIZ_TYPE_ORDER) {
    const count = counts.get(t) ?? 0;
    if (count > best) {
      best = count;
      winner = t;
    }
  }
  return winner;
}
