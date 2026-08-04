import { Eyebrow } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FadeUp } from "@/components/animations/FadeUp";
import { CURRENT_PROMOTION } from "@/data/promotion";

/**
 * The current Hunter Douglas promotion.
 *
 * HD's waiver obliges the dealer to advertise their promotions quarterly, so
 * this band exists to satisfy that. Everything it renders comes from
 * src/data/promotion.ts — read the compliance block there before changing copy.
 *
 * ⚠️ This is a CARD, not a Section, ON PURPOSE. The homepage and the product
 * pages both run strict dark/light band alternation ending opposite the footer.
 * A standalone band cannot be inserted into an alternating page — adjacent bands
 * always differ, so there is no seam that fits, and inserting one either creates
 * an LL/DD run or cascades a tone flip through every band below. Measured: as its
 * own cream band the homepage tone string became DLLDLDLDLDLD, an LL failure.
 * Render this INSIDE an existing band of the matching tone.
 *
 * Renders nothing when `active` is false, so ending an offer is a one-line data
 * change rather than a code edit. That matters: the day an offer expires, the
 * person removing it may not be the person who added it.
 *
 * ⚠️ No price, no percentage, and no end date. HD publishes none of those on
 * their own consumer promotions page, and a dealer quoting a term HD has not
 * set is stating a term HD did not set.
 */
export function PromotionCard({ tone = "cream" }: { tone?: "cream" | "base" }) {
  const p = CURRENT_PROMOTION;
  if (!p.active) return null;

  return (
        <FadeUp>
          <div id="current-offer">
          <div
            className="rounded-2xl border p-8 md:p-12 flex flex-col lg:flex-row lg:items-center gap-8"
            style={{
              background: tone === "cream" ? "var(--bg-card-light)" : "var(--bg-card)",
              borderColor: "var(--border-gold)",
            }}
          >
            <div className="flex-1 flex flex-col gap-4">
              <Eyebrow>{p.eyebrow}</Eyebrow>
              <h2
                className="font-display text-h2"
                style={{ color: tone === "cream" ? "var(--text-on-light)" : "var(--text-primary)", lineHeight: 1.15 }}
              >
                {p.headline}
              </h2>
              <p
                className="font-body text-base md:text-lg leading-relaxed max-w-prose"
                style={{ color: tone === "cream" ? "var(--muted-on-light)" : "var(--text-secondary)" }}
              >
                {p.body}
              </p>
              <p
                className="font-body text-sm leading-relaxed max-w-prose"
                style={{ color: tone === "cream" ? "var(--muted-on-light)" : "var(--text-muted)" }}
              >
                {p.termsNote}
              </p>
            </div>

            <div className="flex flex-col gap-4 lg:min-w-[16rem]">
              <ul className="flex flex-col gap-2">
                {p.qualifyingProducts.map((name) => (
                  <li
                    key={name}
                    className="font-body text-[0.95rem] flex gap-2"
                    style={{ color: tone === "cream" ? "var(--muted-on-light)" : "var(--text-secondary)" }}
                  >
                    <span aria-hidden="true" style={{ color: "var(--gold-deep)" }}>✓</span>
                    <span>{name}</span>
                  </li>
                ))}
              </ul>
              <Button href={p.cta.href} variant="primary" size="lg">
                {p.cta.label}
              </Button>
            </div>
          </div>
          </div>
        </FadeUp>
  );
}

export default PromotionCard;
