"use client";

import { useMemo, useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import type { FaqItem } from "@/data/site";

/**
 * FaqClient — Radix Accordion of FAQ entries with category filter.
 * ZERO em dashes in user-facing strings (CLAUDE.md §13).
 */

interface Props {
  items: FaqItem[];
  tone?: "dark" | "light";
}

const ALL = "All";

export function FaqClient({ items, tone = "dark" }: Props) {
  const [filter, setFilter] = useState<string>(ALL);
  const isLight = tone === "light";
  const cardBg = isLight ? "var(--bg-card-light)" : "var(--bg-card)";
  const cardBorder = isLight ? "var(--border-light)" : "var(--border-dark)";
  const headingColor = isLight ? "var(--text-on-light)" : "var(--text-primary)";
  const bodyColor = isLight ? "var(--muted-on-light)" : "var(--text-secondary)";
  const inactiveText = isLight ? "var(--muted-on-light)" : "var(--text-secondary)";

  const categories = useMemo(() => {
    const set = new Set<string>();
    items.forEach((i) => {
      if (i.category) set.add(i.category);
    });
    return [ALL, ...Array.from(set)];
  }, [items]);

  const visible = useMemo(() => {
    if (filter === ALL) return items;
    return items.filter((i) => i.category === filter);
  }, [items, filter]);

  return (
    <div>
      {categories.length > 2 && (
        <div className="mb-8 flex flex-wrap gap-2" role="group" aria-label="Filter FAQs by category">
          {categories.map((cat) => {
            const active = filter === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className="font-mono text-xs uppercase tracking-widest px-4 py-2 rounded-md transition-all"
                style={{
                  background: active ? "var(--primary)" : "transparent",
                  color: active ? "var(--bg-base)" : inactiveText,
                  border: `1px solid ${active ? "var(--primary)" : cardBorder}`,
                }}
                aria-pressed={active}
              >
                {cat}
              </button>
            );
          })}
        </div>
      )}

      <Accordion.Root type="single" collapsible className="space-y-3">
        {visible.map((item, i) => {
          const value = `faq-${i}`;
          return (
            <Accordion.Item
              key={value}
              value={value}
              className="rounded-2xl border overflow-hidden"
              style={{
                background: cardBg,
                borderColor: cardBorder,
              }}
            >
              <Accordion.Header className="flex">
                <Accordion.Trigger
                  className="group flex flex-1 items-start justify-between gap-4 w-full text-left px-6 py-5 sm:px-8 sm:py-6 transition-colors hover:[&]:bg-[color-mix(in_oklab,var(--primary)_4%,var(--bg-card))]"
                >
                  <h3
                    className="text-h3 font-display"
                    style={{
                      color: headingColor,
                      lineHeight: 1.3,
                    }}
                  >
                    {item.q}
                  </h3>
                  <span
                    aria-hidden="true"
                    className="flex-shrink-0 mt-1 transition-transform duration-300 group-data-[state=open]:rotate-45 text-2xl leading-none"
                    style={{ color: "var(--primary)" }}
                  >
                    +
                  </span>
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                <div className="px-6 pb-6 sm:px-8 sm:pb-8">
                  <p
                    className="font-body text-base"
                    style={{
                      color: bodyColor,
                      lineHeight: 1.7,
                      maxWidth: "65ch",
                    }}
                  >
                    {item.a}
                  </p>
                  {item.category && (
                    <p
                      className="mt-4 font-mono text-xs uppercase tracking-widest"
                      style={{ color: isLight ? "var(--muted-on-light)" : "var(--text-muted)" }}
                    >
                      Category: {item.category}
                    </p>
                  )}
                </div>
              </Accordion.Content>
            </Accordion.Item>
          );
        })}
      </Accordion.Root>

      {visible.length === 0 && (
        <p
          className="font-body text-center py-8"
          style={{ color: bodyColor }}
        >
          No FAQs in this category yet.
        </p>
      )}
    </div>
  );
}
