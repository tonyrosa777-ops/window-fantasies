"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { FadeUp } from "@/components/animations/FadeUp";
import { StaggerContainer, StaggerItem } from "@/components/animations/Stagger";
import { ConsultationClient } from "@/app/request-a-consultation/ConsultationClient";
import {
  SHOWROOM_COPY,
  SHOWROOM_IMAGE_HEIGHT,
  SHOWROOM_IMAGE_WIDTH,
  SHOWROOM_SCENES,
  SHOWROOM_TREATMENTS,
  showroomImage,
} from "@/data/showroom";

/**
 * ShowroomClient: the interactive Virtual Showroom (scene picker + treatment
 * viewer) plus the two bands below it (how-it-works, consultation form). One
 * client component owns all three so the CURRENT scene + treatment selection
 * flows live into ConsultationClient's `context` prop.
 *
 * Motion: crossfade is opacity-only (~300ms), instant under reduced motion.
 * Scene cards stagger in on mount. Tokens only, no white, ZERO em dashes.
 */

const FORM_ANCHOR_ID = "send-to-jim";

export function ShowroomClient() {
  const [sceneSlug, setSceneSlug] = useState(SHOWROOM_SCENES[0].slug);
  const [treatmentSlug, setTreatmentSlug] = useState(SHOWROOM_TREATMENTS[0].slug);
  const reduceMotion = useReducedMotion();

  const scene = SHOWROOM_SCENES.find((s) => s.slug === sceneSlug) ?? SHOWROOM_SCENES[0];
  const treatment =
    SHOWROOM_TREATMENTS.find((t) => t.slug === treatmentSlug) ?? SHOWROOM_TREATMENTS[0];
  const viewerSrc = showroomImage(scene.slug, treatment.slug);
  const viewerAlt =
    treatment.slug === "bare"
      ? `${scene.name}, bare windows before treatment`
      : `${scene.name} with ${treatment.name}`;

  const scrollToForm = () => {
    document
      .getElementById(FORM_ANCHOR_ID)
      ?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  };

  return (
    <>
      {/* ══════════ Showroom band -- LIGHT (photos sit best on the light tone) ══════════ */}
      <Section tone="cream">
        <Container size="wide">
          <FadeUp className="text-center">
            <h2 className="text-h2 font-display" style={{ color: "var(--text-on-light)" }}>
              {SHOWROOM_COPY.pickerHeading}
            </h2>
            <p
              className="mt-4 font-body mx-auto"
              style={{
                color: "var(--muted-on-light)",
                fontSize: "1.0625rem",
                lineHeight: 1.6,
                maxWidth: "52ch",
              }}
            >
              {SHOWROOM_COPY.pickerSub}
            </p>
          </FadeUp>

          {/* Scene picker: 6 photo-led peer-equal cards on a shared grid. Stays
              visible above the viewer so switching rooms is one tap. */}
          <StaggerContainer
            immediate
            staggerDelay={0.08}
            className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 items-stretch"
          >
            {SHOWROOM_SCENES.map((s) => {
              const active = s.slug === scene.slug;
              return (
                <StaggerItem key={s.slug} className="h-full">
                  <button
                    type="button"
                    onClick={() => setSceneSlug(s.slug)}
                    aria-pressed={active}
                    className="h-full w-full overflow-hidden rounded-2xl border text-left transition-all duration-200 hover:-translate-y-px focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-cream)]"
                    style={{
                      background: "var(--bg-card-light)",
                      borderColor: active ? "var(--gold-deep)" : "var(--border-light)",
                      boxShadow: active
                        ? "0 0 0 1px var(--gold-deep), 0 14px 32px rgba(137, 97, 43, 0.22)"
                        : "0 2px 10px rgba(7, 7, 6, 0.08)",
                      cursor: "pointer",
                    }}
                  >
                    {/* Card photo: the scene's shutters variant. */}
                    <img
                      src={showroomImage(s.slug, "shutters")}
                      alt={`${s.name} with Plantation Shutters`}
                      width={SHOWROOM_IMAGE_WIDTH}
                      height={SHOWROOM_IMAGE_HEIGHT}
                      loading="lazy"
                      className="aspect-[3/2] w-full object-cover"
                    />
                    <span className="block p-3 sm:p-4">
                      <span
                        className="font-display block font-semibold"
                        style={{ color: "var(--text-on-light)", fontSize: "1.05rem", lineHeight: 1.25 }}
                      >
                        {s.name}
                      </span>
                      <span
                        className="font-body mt-1 block"
                        style={{ color: "var(--muted-on-light)", fontSize: "0.85rem", lineHeight: 1.5 }}
                      >
                        {s.room}
                      </span>
                    </span>
                  </button>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          {/* Viewer: large 3:2 crossfading image + treatment pills + blurb + CTA. */}
          <div className="mx-auto mt-12 max-w-4xl">
            <div className="text-center">
              <h3 className="text-h3 font-display" style={{ color: "var(--text-on-light)" }}>
                {scene.name}
              </h3>
              <p
                className="mt-2 font-body"
                style={{ color: "var(--muted-on-light)", fontSize: "0.95rem", lineHeight: 1.55 }}
              >
                {scene.room}
              </p>
            </div>

            <div
              className="relative mt-6 aspect-[3/2] w-full overflow-hidden rounded-2xl border"
              style={{ background: "var(--bg-card-light)", borderColor: "var(--border-light)" }}
            >
              <AnimatePresence initial={false}>
                <motion.img
                  key={viewerSrc}
                  src={viewerSrc}
                  alt={viewerAlt}
                  width={SHOWROOM_IMAGE_WIDTH}
                  height={SHOWROOM_IMAGE_HEIGHT}
                  className="absolute inset-0 h-full w-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.3, ease: "easeOut" }}
                />
              </AnimatePresence>
            </div>

            {/* Preload the current scene's other variants so toggles feel instant. */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                width: "1px",
                height: "1px",
                overflow: "hidden",
                opacity: 0,
                pointerEvents: "none",
              }}
            >
              {SHOWROOM_TREATMENTS.filter((t) => t.slug !== treatment.slug).map((t) => (
                <img
                  key={t.slug}
                  src={showroomImage(scene.slug, t.slug)}
                  alt=""
                  width={16}
                  height={16}
                  loading="eager"
                />
              ))}
            </div>

            {/* Treatment toggle pills: 5 peers, gold selected state, 44px+ targets. */}
            <div
              role="group"
              aria-label={SHOWROOM_COPY.treatmentGroupLabel}
              className="mt-6 flex flex-wrap justify-center gap-2.5"
            >
              {SHOWROOM_TREATMENTS.map((t) => {
                const active = t.slug === treatment.slug;
                return (
                  <button
                    key={t.slug}
                    type="button"
                    onClick={() => setTreatmentSlug(t.slug)}
                    aria-pressed={active}
                    className="rounded-full border px-5 py-2.5 font-body text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-cream)]"
                    style={{
                      minHeight: "44px",
                      background: active ? "var(--gold-gradient)" : "var(--cream)",
                      borderColor: active ? "var(--gold-deep)" : "var(--border-light)",
                      color: active ? "var(--ink)" : "var(--text-on-light)",
                      cursor: "pointer",
                    }}
                  >
                    {t.name}
                  </button>
                );
              })}
            </div>

            {/* Treatment blurb, announced politely as pills change. */}
            <p
              aria-live="polite"
              className="mt-4 text-center font-body"
              style={{ color: "var(--muted-on-light)", fontSize: "1rem", lineHeight: 1.6 }}
            >
              {treatment.blurb}
            </p>

            <div className="mt-8 flex justify-center">
              <Button as="button" onClick={scrollToForm} variant="primary" tone="light" size="lg">
                {SHOWROOM_COPY.sendCta}
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* ══════════ How it works band -- DARK (one idea: the three steps) ══════════ */}
      <Section tone="base">
        <Container>
          <FadeUp className="text-center">
            <h2 className="text-h2 font-display" style={{ color: "var(--text-primary)" }}>
              {SHOWROOM_COPY.howItWorksHeading}
            </h2>
          </FadeUp>
          <StaggerContainer
            staggerDelay={0.12}
            className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 items-stretch"
          >
            {SHOWROOM_COPY.howItWorksSteps.map((step) => (
              <StaggerItem key={step.title} className="h-full">
                <div
                  className="h-full rounded-2xl border p-6 text-center"
                  style={{
                    background: "color-mix(in oklab, var(--text-primary) 4%, transparent)",
                    borderColor: "var(--border-dark)",
                  }}
                >
                  <span className="block text-3xl" aria-hidden="true">
                    {step.emoji}
                  </span>
                  <span
                    className="font-display mt-3 block font-semibold"
                    style={{ color: "var(--text-primary)", fontSize: "1.2rem" }}
                  >
                    {step.title}
                  </span>
                  <span
                    className="font-body mt-2 block"
                    style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.6 }}
                  >
                    {step.line}
                  </span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </Section>

      {/* ══════════ Form band -- LIGHT (ends opposite the dark footer) ══════════ */}
      <Section tone="cream" id={FORM_ANCHOR_ID}>
        <Container>
          <FadeUp className="text-center">
            <h2 className="text-h2 font-display" style={{ color: "var(--text-on-light)" }}>
              {SHOWROOM_COPY.formHeading}
            </h2>
            <p
              className="mt-4 font-body mx-auto"
              style={{
                color: "var(--muted-on-light)",
                fontSize: "1.0625rem",
                lineHeight: 1.6,
                maxWidth: "56ch",
              }}
            >
              {SHOWROOM_COPY.formBody}
            </p>
          </FadeUp>
          <div className="mx-auto mt-10 max-w-2xl">
            <ConsultationClient context={`Virtual Showroom: ${scene.name}, ${treatment.name}`} />
          </div>
        </Container>
      </Section>
    </>
  );
}
