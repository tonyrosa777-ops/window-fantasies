"use client";

/**
 * RisingAsh — ambient ember/ash field for plain-dark (--ink) surfaces.
 *
 * ~22 gold-tinted 2-4px particles rise and fade on a pure CSS keyframe
 * (transform + opacity ONLY, GPU-cheap). Staggered NEGATIVE animation
 * delays mean the field is mid-flight the instant it mounts, never a
 * cold start.
 *
 * DETERMINISM (binding): every per-particle value (left %, size, duration,
 * delay, drift, peak opacity, tint) derives from the particle INDEX via
 * golden-ratio hashing. Math.random is banned here: it would render
 * different values on server vs client and blow up hydration.
 *
 * Reduced motion: the whole field hides (display:none); the surface
 * underneath keeps its own gradient, so nothing goes flat.
 *
 * Usage: parent must be `relative overflow-hidden`; render this as the
 * backdrop layer and lift the content above it with `relative z-10`.
 */

const GOLDEN = 0.618033988749895;

/** Deterministic pseudo-random in [0, 1) from particle index + salt. */
function hash(i: number, salt: number): number {
  const n = (i + 1) * GOLDEN * (salt + 1) * 7.13;
  return n - Math.floor(n);
}

interface RisingAshProps {
  /** Particle count. Default 22. */
  density?: number;
  className?: string;
}

export function RisingAsh({ density = 22, className }: RisingAshProps) {
  const particles = Array.from({ length: density }, (_, i) => {
    const size = 2 + hash(i, 1) * 2; // 2-4px
    const duration = 9 + hash(i, 2) * 7; // 9-16s
    const delay = -hash(i, 3) * duration; // negative: alive immediately
    const left = hash(i, 4) * 100; // 0-100%
    const top = 25 + hash(i, 5) * 80; // start in the lower 3/4 (some below fold)
    const drift = (hash(i, 6) - 0.5) * 48; // -24..24px lateral drift
    const rise = 20 + hash(i, 7) * 16; // 20-36vh climb
    const peak = 0.25 + hash(i, 8) * 0.25; // 0.25-0.5 peak opacity
    // Tint: mostly primary gold, every 3rd particle leans bright (hotter ember).
    const brightMix = i % 3 === 0 ? 55 : 15;

    return (
      <span
        key={i}
        className="absolute rounded-full"
        style={
          {
            left: `${left}%`,
            top: `${top}%`,
            width: `${size}px`,
            height: `${size}px`,
            background: `color-mix(in oklab, var(--gold-bright) ${brightMix}%, var(--primary))`,
            opacity: 0,
            animation: `rising-ash-float ${duration}s linear ${delay}s infinite`,
            "--ash-drift": `${drift}px`,
            "--ash-rise": `${-rise}vh`,
            "--ash-peak": `${peak}`,
          } as React.CSSProperties
        }
      />
    );
  });

  return (
    <div
      aria-hidden="true"
      className={`rising-ash-field pointer-events-none absolute inset-0 overflow-hidden ${className ?? ""}`}
    >
      <style>{`
        @keyframes rising-ash-float {
          0% {
            transform: translate3d(0, 0, 0);
            opacity: 0;
          }
          12% {
            opacity: var(--ash-peak, 0.5);
          }
          65% {
            opacity: calc(var(--ash-peak, 0.5) * 0.55);
          }
          100% {
            transform: translate3d(var(--ash-drift, 0px), var(--ash-rise, -28vh), 0);
            opacity: 0;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .rising-ash-field { display: none; }
        }
      `}</style>
      {particles}
    </div>
  );
}
