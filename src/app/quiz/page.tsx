import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { QuizAmbient } from "./QuizAmbient";
import { QuizClient } from "./QuizClient";

/**
 * /quiz: the full-page archetype quiz (full-page-archetype-quiz pattern).
 * Its own dark immersive world beneath the transparent global nav: layered
 * radial gold pools + rising embers + a breathing orb (photo-free by rule).
 * Five questions type the visitor; the result screen mirrors them back and
 * mounts the consultation form inline. No email gate, no /api/quiz.
 */

export const metadata: Metadata = {
  title: "Take the Quiz",
  description: `Five quick questions about your home and your light, and ${siteConfig.business.name} matches you to the right Hunter Douglas treatment. No email required. Free in-home consultation across New England.`,
};

export default function QuizPage() {
  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{ background: "var(--ink)", color: "var(--text-primary)" }}
    >
      <QuizAmbient />
      <div className="relative pt-32 pb-24 sm:pt-36 lg:pt-40">
        <QuizClient />
      </div>
    </div>
  );
}
