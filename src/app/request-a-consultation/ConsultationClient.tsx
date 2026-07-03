"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { siteConfig } from "@/data/site";

/**
 * ConsultationClient — the Window Fantasies consultation request form.
 *
 * Intent selector kept from the current site: "Purchase Window Treatment" vs
 * "Get Service & Repair" (design-system §11, facts-of-record caller triage).
 * No reCAPTCHA wall. Honeypot field for bots. Posts to /api/contact; on any
 * non-200 it falls back to a warm success state (demo mode) so the page always
 * works before the Resend route is wired.
 *
 * ZERO em dashes in any user-facing string (CLAUDE.md §13).
 */

const ConsultSchema = z.object({
  intent: z.enum(["purchase", "service"]),
  name: z.string().min(2, "Please enter your name."),
  phone: z.string().min(7, "Please enter a phone number so Jim can reach you."),
  email: z.string().email("Please enter a valid email address.").optional().or(z.literal("")),
  town: z.string().min(2, "What town are you in?"),
  message: z.string().optional(),
  // Honeypot — humans never see this; bots fill all inputs.
  website: z.string().max(0).optional(),
});

type ConsultValues = z.infer<typeof ConsultSchema>;
type Status = "idle" | "submitting" | "success" | "error";

export function ConsultationClient() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ConsultValues>({
    defaultValues: {
      intent: "purchase",
      name: "",
      phone: "",
      email: "",
      town: "",
      message: "",
      website: "",
    },
  });

  const intent = watch("intent");

  const onSubmit = async (values: ConsultValues) => {
    const parsed = ConsultSchema.safeParse(values);
    if (!parsed.success) {
      setStatus("error");
      setErrorMessage(parsed.error.issues[0]?.message ?? "Please review the form.");
      return;
    }
    setStatus("submitting");
    setErrorMessage("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...parsed.data,
          company: parsed.data.intent === "service" ? "Service and Repair" : "Purchase Window Treatment",
        }),
      });
      // Success only on a real 200 (route returns { success: true }, or { demo: true }
      // pre-Resend). Any error code (429/502/400/403) must surface, never a silent drop.
      if (!res.ok) {
        const json = await res.json().catch(() => null);
        setStatus("error");
        setErrorMessage(
          json?.error ??
            "Something went wrong sending your request. Please try again, or call Jim directly at (603) 891-5755.",
        );
        return;
      }
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
      setErrorMessage(
        "We could not reach the server. Please try again, or call Jim directly at (603) 891-5755.",
      );
    }
  };

  if (status === "success") {
    return (
      <div
        className="rounded-lg p-6 border"
        style={{
          background: "color-mix(in oklab, var(--primary) 12%, var(--bg-elevated))",
          borderColor: "var(--primary)",
        }}
        role="status"
        aria-live="polite"
      >
        <p className="font-mono text-xs uppercase tracking-widest mb-2" style={{ color: "var(--primary)" }}>
          Request received
        </p>
        <p className="font-body" style={{ color: "var(--text-primary)", fontSize: "1rem", lineHeight: 1.6 }}>
          Thank you. Jim will be in touch personally, usually within 24 hours, to set up your free in-home consultation. If it is easier, call him directly at{" "}
          <a href={`tel:${siteConfig.business.phone}`} className="phone-display hover:underline" style={{ color: "var(--primary)" }}>
            {siteConfig.business.phoneFormatted}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 font-mono text-xs uppercase tracking-widest hover:underline"
          style={{ color: "var(--primary)" }}
        >
          Send another request
        </button>
      </div>
    );
  }

  const fieldClass = "w-full rounded-lg px-4 py-3 font-body transition-colors focus:outline-none focus:ring-2";
  const labelClass = "font-mono text-xs uppercase tracking-widest mb-2 block";
  const fieldStyle = { background: "var(--bg-elevated)", color: "var(--text-primary)", border: "1px solid var(--border-dark)" } as const;

  const renderError = (msg?: string) =>
    msg ? (
      <p className="mt-2 font-body text-sm" style={{ color: "#fda4a4" }} role="alert">
        {msg}
      </p>
    ) : null;

  const intentBtn = (value: "purchase" | "service", label: string, sub: string) => {
    const active = intent === value;
    return (
      <button
        type="button"
        onClick={() => setValue("intent", value)}
        aria-pressed={active}
        className="flex-1 text-left rounded-lg px-5 py-4 border transition-all duration-200"
        style={{
          background: active ? "color-mix(in oklab, var(--primary) 14%, var(--bg-elevated))" : "var(--bg-elevated)",
          borderColor: active ? "var(--primary)" : "var(--border-dark)",
        }}
      >
        <span className="font-display block" style={{ color: "var(--text-primary)", fontSize: "1.05rem" }}>
          {label}
        </span>
        <span className="font-body block mt-1 text-sm" style={{ color: "var(--text-secondary)" }}>
          {sub}
        </span>
      </button>
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {/* Honeypot */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        {...register("website")}
        style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", opacity: 0 }}
      />

      <div>
        <label className={labelClass} style={{ color: "var(--text-secondary)" }}>
          What can Jim help with?
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          {intentBtn("purchase", "Purchase window treatments", "New shades, blinds, shutters, drapery, or motorization")}
          {intentBtn("service", "Service and repair", "Fix or service an existing Hunter Douglas product")}
        </div>
      </div>

      <div>
        <label htmlFor="c-name" className={labelClass} style={{ color: "var(--text-secondary)" }}>
          Name
        </label>
        <input id="c-name" type="text" autoComplete="name" className={fieldClass} style={fieldStyle} {...register("name")} aria-invalid={errors.name ? "true" : "false"} />
        {renderError(errors.name?.message)}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="c-phone" className={labelClass} style={{ color: "var(--text-secondary)" }}>
            Phone
          </label>
          <input id="c-phone" type="tel" autoComplete="tel" className={fieldClass} style={fieldStyle} {...register("phone")} aria-invalid={errors.phone ? "true" : "false"} />
          {renderError(errors.phone?.message)}
        </div>
        <div>
          <label htmlFor="c-town" className={labelClass} style={{ color: "var(--text-secondary)" }}>
            Town
          </label>
          <input id="c-town" type="text" autoComplete="address-level2" className={fieldClass} style={fieldStyle} {...register("town")} aria-invalid={errors.town ? "true" : "false"} />
          {renderError(errors.town?.message)}
        </div>
      </div>

      <div>
        <label htmlFor="c-email" className={labelClass} style={{ color: "var(--text-secondary)" }}>
          Email (optional)
        </label>
        <input id="c-email" type="email" autoComplete="email" className={fieldClass} style={fieldStyle} {...register("email")} />
        {renderError(errors.email?.message)}
      </div>

      <div>
        <label htmlFor="c-message" className={labelClass} style={{ color: "var(--text-secondary)" }}>
          {intent === "service" ? "What needs fixing?" : "Tell Jim about your windows (optional)"}
        </label>
        <textarea
          id="c-message"
          rows={4}
          className={fieldClass}
          style={{ ...fieldStyle, resize: "vertical", minHeight: "110px" }}
          placeholder={
            intent === "service"
              ? "What product, how many, and what broke. Jim will tell you the honest path forward."
              : "Which rooms, how many windows, and anything you already have in mind."
          }
          {...register("message")}
        />
      </div>

      {status === "error" && errorMessage && (
        <div className="rounded-lg p-4 border" style={{ background: "color-mix(in oklab, #f87171 12%, var(--bg-elevated))", borderColor: "#f87171" }} role="alert">
          <p className="font-body" style={{ color: "#fda4a4", fontSize: "0.95rem" }}>
            {errorMessage}
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full sm:w-auto inline-flex items-center justify-center font-semibold transition-all duration-200 px-8 py-4 rounded-lg disabled:opacity-60 disabled:cursor-not-allowed hover:-translate-y-px"
        style={{ background: "var(--primary)", color: "var(--ink)", fontSize: "1rem" }}
      >
        {status === "submitting" ? "Sending..." : "Request My Free Consultation"}
      </button>

      <p className="font-mono text-xs uppercase tracking-widest pt-2" style={{ color: "var(--text-muted)" }}>
        Prefer the phone? Call{" "}
        <a href={`tel:${siteConfig.business.phone}`} className="phone-display hover:underline" style={{ color: "var(--primary)" }}>
          {siteConfig.business.phoneFormatted}
        </a>
      </p>
    </form>
  );
}

export default ConsultationClient;
