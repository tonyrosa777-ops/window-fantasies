/**
 * QuizAmbient: the /quiz full-immersion background. Hero-grade but PHOTO-FREE
 * (image-uniqueness rule: no existing image may appear on a second surface).
 *
 * Three layers, all tokens, radial-only, GPU-cheap (transform/opacity):
 *   1. Static layered radial gold pools on the ink base (no motion).
 *   2. A soft breathing orb (12s scale + opacity cycle).
 *   3. ~20 rising ember dots, keyframe rise + fade, deterministic positions
 *      computed from index so SSR and client markup match (never Math.random
 *      in render).
 *
 * Motion budget: embers (1) + orb (1) + the page H1 shimmer (1) = 3 layers max.
 * prefers-reduced-motion: gradients stay, motion stops (globals.css kills all
 * animations globally; the explicit guard below also hides mid-flight embers).
 */

const EMBER_COUNT = 20;

const EMBERS = Array.from({ length: EMBER_COUNT }, (_, i) => ({
  left: (i * 47 + 13) % 100, // percent across the band
  size: 2 + (i % 3), // 2-4px
  delay: -(((i * 37) % 190) / 10), // negative: field is populated on load
  duration: 16 + ((i * 29) % 12), // 16-27s
  drift: ((i * 53) % 44) - 22, // -22..21px horizontal wander
  peak: 0.22 + ((i * 17) % 28) / 100, // 0.22-0.49 max opacity
}));

export function QuizAmbient() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true" style={{ zIndex: 0 }}>
      {/* Layer 1: static layered radial gold pools on ink (radial-only rule). */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            "radial-gradient(ellipse 55% 42% at 22% 22%, color-mix(in oklab, var(--primary) 11%, var(--ink)) 0%, rgba(7, 7, 6, 0) 62%)",
            "radial-gradient(ellipse 62% 50% at 82% 72%, color-mix(in oklab, var(--gold-deep) 22%, var(--ink)) 0%, rgba(7, 7, 6, 0) 65%)",
            "radial-gradient(ellipse 120% 90% at 50% 115%, var(--umber) 0%, var(--ink) 60%)",
          ].join(", "),
          backgroundColor: "var(--ink)",
        }}
      />

      {/* Layer 2: soft breathing orb behind the focal content. */}
      <div
        className="quiz-orb absolute rounded-full"
        style={{
          width: "58vmin",
          height: "58vmin",
          left: "50%",
          top: "34%",
          marginLeft: "-29vmin",
          marginTop: "-29vmin",
          background:
            "radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--primary) 14%, transparent) 0%, transparent 68%)",
        }}
      />

      {/* Layer 3: deterministic rising embers. */}
      {EMBERS.map((e, i) => (
        <span
          key={i}
          className="quiz-ember absolute rounded-full"
          style={{
            left: `${e.left}%`,
            bottom: "-2%",
            width: `${e.size}px`,
            height: `${e.size}px`,
            background: i % 4 === 0 ? "var(--gold-bright)" : "var(--primary)",
            boxShadow: "0 0 6px color-mix(in oklab, var(--primary) 55%, transparent)",
            opacity: 0,
            animation: `quiz-ember-rise ${e.duration}s linear infinite`,
            animationDelay: `${e.delay}s`,
            ["--ember-peak" as string]: e.peak,
            ["--ember-drift" as string]: `${e.drift}px`,
          }}
        />
      ))}

      <style>{`
        @keyframes quiz-ember-rise {
          0%   { transform: translate3d(0, 0, 0); opacity: 0; }
          8%   { opacity: var(--ember-peak, 0.4); }
          72%  { opacity: var(--ember-peak, 0.4); }
          100% { transform: translate3d(var(--ember-drift, 0px), -105vh, 0); opacity: 0; }
        }
        @keyframes quiz-orb-breathe {
          0%, 100% { transform: scale(1); opacity: 0.75; }
          50%      { transform: scale(1.12); opacity: 1; }
        }
        .quiz-orb { animation: quiz-orb-breathe 12s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .quiz-ember { display: none; }
          .quiz-orb { animation: none; }
        }
      `}</style>
    </div>
  );
}
