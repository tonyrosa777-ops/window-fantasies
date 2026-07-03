"use client";

import { useState } from "react";

/**
 * ROI Calculator -- INTERNAL Optimus sales tool (deleted before launch).
 * Two sliders (average project value, new projects per month) + a package
 * selector. Computes monthly revenue, months to break even for the chosen
 * package, and the 12-month ROI multiple.
 *
 * Elevated-surface discipline (gray-on-gray rule): the widget is a graphite
 * card (var(--bg-card)) with a visible gold border stepping off the dark
 * bg-base band; result tiles step again to espresso (var(--bg-elevated)).
 */

const PACKAGES = [
  { name: "Starter", price: 1500 },
  { name: "Pro", price: 3000 },
  { name: "Premium", price: 5500 },
] as const;

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function RoiCalculator() {
  const [avgValue, setAvgValue] = useState(3500);
  const [projectsPerMonth, setProjectsPerMonth] = useState(4);
  const [packageIndex, setPackageIndex] = useState(1); // Pro pre-selected

  const chosen = PACKAGES[packageIndex];
  const monthlyRevenue = avgValue * projectsPerMonth;
  const breakEvenMonths = chosen.price / monthlyRevenue;
  const roiMultiple = (monthlyRevenue * 12) / chosen.price;

  const breakEvenLabel =
    breakEvenMonths < 1 ? "under 1 month" : `${breakEvenMonths.toFixed(1)} months`;

  return (
    <div
      className="rounded-2xl border p-6 sm:p-10"
      style={{
        background: "var(--bg-card)",
        borderColor: "var(--border-gold)",
        boxShadow: "0 24px 60px rgba(0, 0, 0, 0.45)",
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
        {/* Inputs */}
        <div>
          <div>
            <div className="flex items-baseline justify-between gap-4">
              <label
                htmlFor="roi-avg-value"
                className="font-body font-medium"
                style={{ color: "var(--text-primary)", fontSize: "1rem" }}
              >
                Average project value
              </label>
              <span
                className="font-body font-semibold phone-display"
                style={{ color: "var(--primary)", fontSize: "1.25rem" }}
              >
                {usd.format(avgValue)}
              </span>
            </div>
            <input
              id="roi-avg-value"
              type="range"
              min={500}
              max={10000}
              step={100}
              value={avgValue}
              onChange={(e) => setAvgValue(Number(e.target.value))}
              className="mt-3 w-full h-2 cursor-pointer"
              style={{ accentColor: "var(--primary)" }}
            />
            <div
              className="mt-1 flex justify-between font-body text-xs"
              style={{ color: "var(--text-muted)" }}
            >
              <span>$500</span>
              <span>$10,000</span>
            </div>
          </div>

          <div className="mt-8">
            <div className="flex items-baseline justify-between gap-4">
              <label
                htmlFor="roi-projects"
                className="font-body font-medium"
                style={{ color: "var(--text-primary)", fontSize: "1rem" }}
              >
                New projects per month
              </label>
              <span
                className="font-body font-semibold phone-display"
                style={{ color: "var(--primary)", fontSize: "1.25rem" }}
              >
                {projectsPerMonth}
              </span>
            </div>
            <input
              id="roi-projects"
              type="range"
              min={1}
              max={20}
              step={1}
              value={projectsPerMonth}
              onChange={(e) => setProjectsPerMonth(Number(e.target.value))}
              className="mt-3 w-full h-2 cursor-pointer"
              style={{ accentColor: "var(--primary)" }}
            />
            <div
              className="mt-1 flex justify-between font-body text-xs"
              style={{ color: "var(--text-muted)" }}
            >
              <span>1</span>
              <span>20</span>
            </div>
          </div>

          {/* Package selector */}
          <div className="mt-8">
            <p
              className="font-body font-medium"
              style={{ color: "var(--text-primary)", fontSize: "1rem" }}
            >
              Package
            </p>
            <div className="mt-3 grid grid-cols-3 gap-3" role="group" aria-label="Choose a package">
              {PACKAGES.map((pkg, i) => {
                const selected = i === packageIndex;
                return (
                  <button
                    key={pkg.name}
                    type="button"
                    onClick={() => setPackageIndex(i)}
                    aria-pressed={selected}
                    className="rounded-lg border px-3 py-3 font-body text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]"
                    style={
                      selected
                        ? {
                            background: "var(--gold-gradient)",
                            color: "var(--ink)",
                            borderColor: "var(--primary)",
                          }
                        : {
                            background: "var(--bg-elevated)",
                            color: "var(--text-secondary)",
                            borderColor: "var(--border-dark)",
                          }
                    }
                  >
                    <span className="block">{pkg.name}</span>
                    <span
                      className="block mt-0.5 text-xs font-medium"
                      style={{ color: selected ? "var(--ink)" : "var(--text-muted)" }}
                    >
                      {usd.format(pkg.price)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="flex flex-col justify-center gap-4">
          <div
            className="rounded-xl border p-5 sm:p-6"
            style={{ background: "var(--bg-elevated)", borderColor: "var(--border-dark)" }}
          >
            <p className="eyebrow" style={{ fontSize: "0.7rem" }}>
              Monthly revenue from the site
            </p>
            <p
              className="mt-1 font-display phone-display"
              style={{ color: "var(--text-primary)", fontSize: "2.25rem", lineHeight: 1.1 }}
            >
              {usd.format(monthlyRevenue)}
            </p>
            <p className="mt-1 font-body text-sm" style={{ color: "var(--text-muted)" }}>
              {projectsPerMonth} {projectsPerMonth === 1 ? "project" : "projects"} at{" "}
              {usd.format(avgValue)} each
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              className="rounded-xl border p-5 sm:p-6"
              style={{ background: "var(--bg-elevated)", borderColor: "var(--border-dark)" }}
            >
              <p className="eyebrow" style={{ fontSize: "0.7rem" }}>
                {chosen.name} pays for itself in
              </p>
              <p
                className="mt-1 font-display"
                style={{ color: "var(--primary)", fontSize: "2rem", lineHeight: 1.1 }}
              >
                {breakEvenLabel}
              </p>
            </div>
            <div
              className="rounded-xl border p-5 sm:p-6"
              style={{ background: "var(--bg-elevated)", borderColor: "var(--border-dark)" }}
            >
              <p className="eyebrow" style={{ fontSize: "0.7rem" }}>
                12-month ROI multiple
              </p>
              <p
                className="mt-1 font-display phone-display"
                style={{ color: "var(--primary)", fontSize: "2rem", lineHeight: 1.1 }}
              >
                {roiMultiple.toFixed(1)}x
              </p>
            </div>
          </div>

          <p className="font-body text-sm" style={{ color: "var(--text-muted)", lineHeight: 1.55 }}>
            One new consultation the site captures can carry a whole-home order. These numbers only
            need the site to win a fraction of the searches it is built to own.
          </p>
        </div>
      </div>
    </div>
  );
}
