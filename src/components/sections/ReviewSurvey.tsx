"use client";

import { useState, useRef, useCallback } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/data/site";
import { Button } from "@/components/ui/Button";

/**
 * ReviewSurvey — the interactive star survey on /testimonials.
 *
 * Flow: pick a rating, then branch.
 *   1-3 stars -> a private note that lands only in Jim's inbox.
 *   4-5 stars -> the review is collected on-site, then one click hands off to the
 *                Google review composer.
 *
 * Ratings collected here are NEVER published or aggregated anywhere on the site.
 * The displayed masonry + the Review/AggregateRating schema stay sourced from the
 * curated real set in siteConfig.testimonials. Both submissions land in Jim's
 * inbox and he promotes one into site.ts by hand if he wants it public. Keeping
 * collection and display separate is deliberate, see the note on the ReviewSurvey
 * interface in site.ts.
 *
 * All copy is read from siteConfig.reviewSurvey (zero hard-coded strings).
 * ZERO em dashes in any rendered string (CLAUDE.md §13).
 */

type Phase = "rating" | "form" | "success";
type Branch = "private" | "public";

const PRIVATE_MAX = 3; // 1-3 routes private, 4-5 routes public

const inputBase =
  "w-full rounded-lg border bg-[rgba(7,7,6,0.45)] px-4 py-3 font-body text-[var(--text-primary)] " +
  "placeholder:text-[var(--text-muted)] transition-colors duration-200 " +
  "focus:outline-none focus:border-[var(--primary)] focus-visible:ring-2 focus-visible:ring-[var(--primary-muted)]";

function Field({
  id,
  label,
  hint,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="font-mono text-xs uppercase tracking-widest"
        style={{ color: "var(--text-secondary)" }}
      >
        {label}
      </label>
      {children}
      {hint ? (
        <p className="font-body text-xs" style={{ color: "var(--text-muted)" }}>
          {hint}
        </p>
      ) : null}
    </div>
  );
}

export function ReviewSurvey() {
  const copy = siteConfig.reviewSurvey;
  const reduceMotion = useReducedMotion();

  const [phase, setPhase] = useState<Phase>("rating");
  const [rating, setRating] = useState<number | null>(null);
  const [pending, setPending] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [town, setTown] = useState("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const starRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const branch: Branch = rating !== null && rating <= PRIVATE_MAX ? "private" : "public";
  const b = branch === "private" ? copy.privateBranch : copy.publicBranch;

  const selectStar = useCallback(
    (value: number) => {
      if (advanceTimer.current) clearTimeout(advanceTimer.current);
      setPending(value);
      setRating(value);
      // Brief glow on the chosen rating before the form slides in, matching the
      // auto-advance beat used by the archetype quiz.
      advanceTimer.current = setTimeout(
        () => {
          setPending(null);
          setPhase("form");
        },
        reduceMotion ? 0 : 420
      );
    },
    [reduceMotion]
  );

  const onStarKeyDown = (e: React.KeyboardEvent, index: number) => {
    let next: number | null = null;
    if (e.key === "ArrowRight" || e.key === "ArrowUp") next = Math.min(index + 1, 4);
    else if (e.key === "ArrowLeft" || e.key === "ArrowDown") next = Math.max(index - 1, 0);
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = 4;
    if (next === null) return;
    e.preventDefault();
    starRefs.current[next]?.focus();
    setRating(next + 1);
  };

  const resetToRating = () => {
    setPhase("rating");
    setError(null);
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (rating === null || sending) return;
    setSending(true);
    setError(null);
    try {
      const res = await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rating,
          branch,
          name,
          message,
          ...(branch === "private" ? { contact } : { town }),
          website: honeypot,
        }),
      });
      const data = (await res.json()) as { success?: boolean };
      if (!res.ok || !data.success) throw new Error("submit failed");
      setPhase("success");
    } catch {
      setError(copy.errorMessage);
    } finally {
      setSending(false);
    }
  }

  // The star picker fills up to whichever is live: the hover preview, the pending
  // selection, or the committed rating.
  const litThrough = hovered ?? pending ?? rating ?? 0;

  const fade = reduceMotion
    ? { initial: false, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -12 },
      };

  return (
    <div
      className="mx-auto w-full max-w-2xl rounded-2xl border p-6 sm:p-8"
      style={{
        background: "var(--bg-card)",
        borderColor: "var(--border-gold)",
        boxShadow: "0 18px 60px rgba(0,0,0,0.35)",
      }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {/* ---------- 1. Star picker ---------- */}
        {phase === "rating" && (
          <motion.div key="rating" {...fade} transition={{ duration: 0.35, ease: "easeOut" }}>
            <p
              className="text-center font-display"
              style={{ color: "var(--text-primary)", fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
            >
              {copy.starPrompt}
            </p>

            <div
              role="radiogroup"
              aria-label={copy.starPrompt}
              className="mt-7 flex justify-center gap-1 sm:gap-2"
              onMouseLeave={() => setHovered(null)}
            >
              {copy.starLabels.map((label, i) => {
                const value = i + 1;
                const lit = value <= litThrough;
                const isPending = pending === value;
                return (
                  <button
                    key={label}
                    ref={(el) => {
                      starRefs.current[i] = el;
                    }}
                    type="button"
                    role="radio"
                    aria-checked={rating === value}
                    aria-label={label}
                    tabIndex={rating === null ? (i === 0 ? 0 : -1) : rating === value ? 0 : -1}
                    onClick={() => selectStar(value)}
                    onMouseEnter={() => setHovered(value)}
                    onFocus={() => setHovered(value)}
                    onBlur={() => setHovered(null)}
                    onKeyDown={(e) => onStarKeyDown(e, i)}
                    // min-h/min-w 44px: the glyph alone renders a 38x36 hit box on
                    // mobile, under the 44x44 floor (WCAG 2.5.5). A mis-tap here does
                    // not just annoy, it submits the WRONG rating and routes the person
                    // down the wrong branch, and mobile is where most reviews get left.
                    className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-md leading-none transition-transform duration-200 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
                    style={{
                      // The unlit state has to READ as an empty star waiting to be
                      // filled. Painting it --border-dark (0.08 alpha) made the whole
                      // control invisible against the card until hover, so nobody
                      // could tell it was clickable; a neutral gray then read as dead
                      // on a gold-accented band. Outline glyph in muted BRAND gold
                      // gives it an affordance at rest and still reads clearly unlit
                      // next to a solid gold ★.
                      color: lit ? "var(--primary)" : "rgba(205,173,105,0.42)",
                      fontSize: "clamp(2.25rem, 8vw, 3.25rem)",
                      textShadow: lit ? "0 0 22px rgba(205,173,105,0.45)" : "none",
                      transform: isPending && !reduceMotion ? "scale(1.18)" : undefined,
                    }}
                  >
                    <span aria-hidden="true">{lit ? "★" : "☆"}</span>
                  </button>
                );
              })}
            </div>

            <p
              className="mt-5 text-center font-body text-sm transition-colors duration-200"
              style={{
                color: litThrough > 0 ? "var(--primary)" : "var(--text-muted)",
                minHeight: "1.25rem",
              }}
            >
              {litThrough > 0 ? copy.starLabels[litThrough - 1] : copy.starHint}
            </p>
          </motion.div>
        )}

        {/* ---------- 2. Branched form ---------- */}
        {phase === "form" && (
          <motion.div key="form" {...fade} transition={{ duration: 0.35, ease: "easeOut" }}>
            <button
              type="button"
              onClick={resetToRating}
              className="mb-5 font-mono text-xs uppercase tracking-widest transition-colors duration-200 hover:text-[var(--primary)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] rounded"
              style={{ color: "var(--text-muted)" }}
            >
              ← {rating} of 5 stars, change
            </button>

            <h3
              className="font-display"
              style={{ color: "var(--text-primary)", fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
            >
              {b.h3}
            </h3>
            <p
              className="mt-3 font-body"
              style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: 1.65 }}
            >
              {b.body}
            </p>

            <form onSubmit={submit} className="mt-7 flex flex-col gap-5" noValidate>
              {/* Honeypot: hidden from humans, catches naive bots. */}
              <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                <label htmlFor="rs-website">Website</label>
                <input
                  id="rs-website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              <Field id="rs-name" label={b.nameLabel}>
                <input
                  id="rs-name"
                  name="name"
                  type="text"
                  required
                  maxLength={120}
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputBase}
                  style={{ borderColor: "var(--border-dark)" }}
                />
              </Field>

              {branch === "private" ? (
                <Field
                  id="rs-contact"
                  label={copy.privateBranch.contactLabel}
                  hint={copy.privateBranch.contactHint}
                >
                  <input
                    id="rs-contact"
                    name="contact"
                    type="text"
                    required
                    maxLength={254}
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    className={inputBase}
                    style={{ borderColor: "var(--border-dark)" }}
                  />
                </Field>
              ) : (
                <Field id="rs-town" label={copy.publicBranch.townLabel}>
                  <input
                    id="rs-town"
                    name="town"
                    type="text"
                    maxLength={120}
                    value={town}
                    onChange={(e) => setTown(e.target.value)}
                    className={inputBase}
                    style={{ borderColor: "var(--border-dark)" }}
                  />
                </Field>
              )}

              <Field id="rs-message" label={b.messageLabel}>
                <textarea
                  id="rs-message"
                  name="message"
                  rows={5}
                  required={branch === "private"}
                  maxLength={5000}
                  placeholder={b.messagePlaceholder}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={`${inputBase} resize-y`}
                  style={{ borderColor: "var(--border-dark)" }}
                />
              </Field>

              {error ? (
                <p
                  role="alert"
                  className="font-body text-sm"
                  style={{ color: "#E9A5A5", lineHeight: 1.6 }}
                >
                  {error}
                </p>
              ) : null}

              <div className="mt-1">
                <Button as="button" type="submit" variant="primary" size="lg" disabled={sending}>
                  {sending ? b.sendingLabel : b.submitLabel}
                </Button>
              </div>
            </form>
          </motion.div>
        )}

        {/* ---------- 3. Success ---------- */}
        {phase === "success" && (
          <motion.div
            key="success"
            {...fade}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="text-center"
          >
            <div aria-hidden="true" style={{ fontSize: "2.5rem", lineHeight: 1 }}>
              {branch === "private" ? "📬" : "🙏"}
            </div>
            <h3
              className="mt-4 font-display"
              style={{ color: "var(--text-primary)", fontSize: "clamp(1.5rem, 3vw, 2rem)" }}
            >
              {b.successH3}
            </h3>
            <p
              className="mx-auto mt-3 font-body"
              style={{
                color: "var(--text-secondary)",
                fontSize: "1rem",
                lineHeight: 1.65,
                maxWidth: "46ch",
              }}
            >
              {b.successBody}
            </p>

            {branch === "public" ? (
              <div className="mt-8 flex flex-col items-center gap-3">
                <Button
                  href={siteConfig.business.googleReviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="primary"
                  size="lg"
                >
                  {copy.publicBranch.googleCtaLabel}
                </Button>
                <p className="font-body text-xs" style={{ color: "var(--text-muted)" }}>
                  {copy.publicBranch.googleCtaNote}
                </p>
              </div>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ReviewSurvey;
