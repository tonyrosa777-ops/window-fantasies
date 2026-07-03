"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/data/site";
import {
  QUIZ_INTRO,
  QUIZ_QUESTIONS,
  QUIZ_RESULTS,
  QUIZ_RESULT_SCREEN,
  scoreQuiz,
  type QuizAnswerType,
  type QuizResultKey,
} from "@/data/quiz";
import { ConsultationClient } from "@/app/request-a-consultation/ConsultationClient";
import { Button } from "@/components/ui/Button";

/**
 * QuizClient: the /quiz full-page archetype experience (Window Fantasies).
 *
 * intro -> questions (one at a time, ~350ms auto-advance with a gold glow on
 * the chosen card, direction-aware slide) -> result. NO email gate, NO
 * /api/quiz: the result screen mounts <ConsultationClient /> inline, and that
 * form IS the capture. Repair answers override archetype scoring (quiz.ts).
 *
 * All motion is transform/opacity, guarded by useReducedMotion. Tokens only.
 * ZERO em dashes. Public phone only: (603) 891-5755.
 */

type Phase = "intro" | "question" | "result";

const ADVANCE_MS = 350;

export function QuizClient() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswerType[]>([]);
  const [pendingOption, setPendingOption] = useState<number | null>(null);
  const [direction, setDirection] = useState(1);
  const [resultKey, setResultKey] = useState<QuizResultKey | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const totalQuestions = QUIZ_QUESTIONS.length;
  const question = QUIZ_QUESTIONS[questionIndex];

  const slide = {
    enter: (dir: number) => ({ x: reduceMotion ? 0 : dir * 56, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: reduceMotion ? 0 : dir * -56, opacity: 0 }),
  };

  const start = () => {
    setDirection(1);
    setPhase("question");
  };

  const selectOption = (optionIndex: number) => {
    if (pendingOption !== null) return; // ignore double-taps during the glow
    setPendingOption(optionIndex);

    const chosen = question.options[optionIndex].type;
    const nextAnswers = [...answers.slice(0, questionIndex), chosen];

    timerRef.current = setTimeout(() => {
      setAnswers(nextAnswers);
      setPendingOption(null);
      if (questionIndex === totalQuestions - 1) {
        setResultKey(scoreQuiz(nextAnswers));
        setDirection(1);
        setPhase("result");
      } else {
        setDirection(1);
        setQuestionIndex((i) => i + 1);
      }
    }, ADVANCE_MS);
  };

  /** Back affordance: slices any future answers so re-answering is clean. */
  const goBack = () => {
    if (pendingOption !== null) return;
    setDirection(-1);
    if (questionIndex === 0) {
      setAnswers([]);
      setPhase("intro");
    } else {
      setAnswers((a) => a.slice(0, questionIndex - 1));
      setQuestionIndex((i) => i - 1);
    }
  };

  const startOver = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setDirection(-1);
    setAnswers([]);
    setQuestionIndex(0);
    setPendingOption(null);
    setResultKey(null);
    setPhase("intro");
  };

  const result = resultKey ? QUIZ_RESULTS[resultKey] : null;

  return (
    <div className="relative z-10 mx-auto w-full max-w-3xl px-6 sm:px-8">
      <AnimatePresence mode="wait" custom={direction} initial={false}>
        {/* ══════════════ Intro ══════════════ */}
        {phase === "intro" && (
          <motion.div
            key="intro"
            custom={direction}
            variants={slide}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: reduceMotion ? 0 : 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex min-h-[55vh] flex-col items-center justify-center text-center"
          >
            <p className="eyebrow">{QUIZ_INTRO.eyebrow}</p>
            <h1
              className="hero-shimmer font-display mt-5"
              style={{
                fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)",
                lineHeight: 1.08,
                letterSpacing: "-0.015em",
              }}
            >
              {QUIZ_INTRO.h1}
            </h1>
            <p
              className="font-body mt-6 max-w-xl"
              style={{ color: "var(--text-secondary)", fontSize: "1.125rem", lineHeight: 1.6 }}
            >
              {QUIZ_INTRO.invitation}
            </p>
            <div className="mt-10">
              <Button as="button" onClick={start} size="lg">
                {QUIZ_INTRO.ctaStart}
              </Button>
            </div>
          </motion.div>
        )}

        {/* ══════════════ Questions ══════════════ */}
        {phase === "question" && (
          <motion.div
            key={`question-${questionIndex}`}
            custom={direction}
            variants={slide}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: reduceMotion ? 0 : 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {/* Progress */}
            <div className="mb-10">
              <div className="flex items-baseline justify-between">
                <p
                  className="font-body text-xs uppercase"
                  style={{ color: "var(--primary)", letterSpacing: "0.18em", fontWeight: 600 }}
                >
                  Question {questionIndex + 1} of {totalQuestions}
                </p>
                <button
                  type="button"
                  onClick={goBack}
                  className="font-body text-sm underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] rounded-sm px-2 py-2"
                  style={{ color: "var(--text-secondary)", minHeight: "44px" }}
                >
                  Back
                </button>
              </div>
              <div
                className="mt-2 h-px w-full overflow-hidden rounded-full"
                style={{ background: "var(--border-dark)", height: "2px" }}
                role="progressbar"
                aria-valuemin={1}
                aria-valuemax={totalQuestions}
                aria-valuenow={questionIndex + 1}
                aria-label={`Question ${questionIndex + 1} of ${totalQuestions}`}
              >
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${((questionIndex + 1) / totalQuestions) * 100}%`,
                    background: "var(--gold-gradient)",
                  }}
                />
              </div>
            </div>

            <h2
              className="font-display"
              style={{
                fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
                lineHeight: 1.15,
                color: "var(--text-primary)",
              }}
            >
              {question.question}
            </h2>

            {/* Option cards: peer-equal on a shared grid (symmetry rule A). */}
            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
              {question.options.map((option, i) => {
                const isPending = pendingOption === i;
                const isDimmed = pendingOption !== null && !isPending;
                return (
                  <button
                    key={option.label}
                    type="button"
                    onClick={() => selectOption(i)}
                    className="h-full rounded-lg border p-5 text-left transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--ink)]"
                    style={{
                      minHeight: "44px",
                      background: isPending
                        ? "color-mix(in oklab, var(--primary) 12%, var(--ink))"
                        : "color-mix(in oklab, var(--text-primary) 4%, transparent)",
                      borderColor: isPending ? "var(--primary)" : "var(--border-dark)",
                      boxShadow: isPending
                        ? "0 0 0 1px var(--primary), 0 0 28px color-mix(in oklab, var(--primary) 35%, transparent)"
                        : "none",
                      opacity: isDimmed ? 0.35 : 1,
                      cursor: pendingOption !== null ? "default" : "pointer",
                    }}
                  >
                    <span
                      className="font-body block"
                      style={{
                        color: "var(--text-primary)",
                        fontSize: "1.0625rem",
                        fontWeight: 600,
                        lineHeight: 1.4,
                      }}
                    >
                      {option.label}
                    </span>
                    <span
                      className="font-body mt-2 block"
                      style={{ color: "var(--text-secondary)", fontSize: "0.9375rem", lineHeight: 1.55 }}
                    >
                      {option.detail}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* ══════════════ Result ══════════════ */}
        {phase === "result" && result && (
          <motion.div
            key="result"
            custom={direction}
            variants={slide}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: reduceMotion ? 0 : 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="text-center">
              <p className="eyebrow">{result.eyebrow}</p>
              <p
                className="font-body mt-3 text-sm uppercase"
                style={{ color: "var(--text-secondary)", letterSpacing: "0.18em" }}
              >
                {result.name}
              </p>
              <h1
                className="hero-shimmer font-display mt-4"
                style={{
                  fontSize: "clamp(2.25rem, 4.5vw, 3.75rem)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.015em",
                }}
              >
                {result.headline}
              </h1>
            </div>

            <div className="mx-auto mt-8 max-w-2xl space-y-5">
              {result.body.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 32)}
                  className="font-body"
                  style={{ color: "var(--text-secondary)", fontSize: "1.0938rem", lineHeight: 1.65 }}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Recommendation card */}
            <div
              className="mx-auto mt-10 max-w-2xl rounded-lg border p-6 sm:p-8"
              style={{
                background: "color-mix(in oklab, var(--primary) 7%, var(--ink))",
                borderColor: "var(--border-gold)",
              }}
            >
              <p className="eyebrow">{QUIZ_RESULT_SCREEN.recommendationEyebrow}</p>
              <h2
                className="font-display mt-3"
                style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", lineHeight: 1.2, color: "var(--text-primary)" }}
              >
                {result.recommendation.name}
              </h2>
              <p
                className="font-body mt-3"
                style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: 1.6 }}
              >
                {result.recommendation.reason}
              </p>
              <div className="mt-6">
                <Button href={result.recommendation.href} variant="secondary">
                  {result.recommendation.linkLabel}
                </Button>
              </div>
            </div>

            {/* The conversion moment: the inline consultation form IS the capture. */}
            <div className="mx-auto mt-14 max-w-2xl">
              <h2
                className="font-display text-center"
                style={{ fontSize: "clamp(1.6rem, 3vw, 2.25rem)", lineHeight: 1.2, color: "var(--text-primary)" }}
              >
                {QUIZ_RESULT_SCREEN.formHeading}
              </h2>
              <p
                className="font-body mx-auto mt-4 max-w-xl text-center"
                style={{ color: "var(--text-secondary)", fontSize: "1rem", lineHeight: 1.6 }}
              >
                {QUIZ_RESULT_SCREEN.formBody}
              </p>
              <div className="mt-8">
                <ConsultationClient />
              </div>

              <p
                className="font-body mt-8 text-center"
                style={{ color: "var(--text-secondary)", fontSize: "1rem" }}
              >
                {QUIZ_RESULT_SCREEN.callPrefix}{" "}
                <a
                  href={`tel:+1${siteConfig.business.phone}`}
                  className="phone-display hover:underline"
                  style={{ color: "var(--primary)" }}
                >
                  {siteConfig.business.phoneFormatted}
                </a>
                .
              </p>

              <div className="mt-6 text-center">
                <button
                  type="button"
                  onClick={startOver}
                  className="font-body text-sm underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] rounded-sm px-3 py-2"
                  style={{ color: "var(--text-secondary)", minHeight: "44px" }}
                >
                  {QUIZ_RESULT_SCREEN.startOver}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
