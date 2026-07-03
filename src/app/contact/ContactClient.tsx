"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { siteConfig } from "@/data/site";

/**
 * ContactClient — Client form using react-hook-form + zod.
 * Posts to /api/contact (route handler is a Phase 2 wiring task).
 * On non-200 response, shows demo-mode success message with SLA microcopy.
 * ZERO em dashes in any user-facing string (CLAUDE.md §13).
 */

const ContactSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().optional(),
  company: z.string().optional(),
  message: z.string().min(10, "Tell me a bit more about your windows and rooms."),
  // Honeypot — humans never see this field, naive bots fill all visible inputs.
  // Server-side: any non-empty value silently returns 200 (Stage 1J run-2 BUG-3).
  website: z.string().max(0).optional(),
});

type ContactFormValues = z.infer<typeof ContactSchema>;

type Status = "idle" | "submitting" | "success" | "error";

export function ContactClient() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      message: "",
      website: "",
    },
  });

  const validate = (values: ContactFormValues) => {
    const result = ContactSchema.safeParse(values);
    return result;
  };

  const onSubmit = async (values: ContactFormValues) => {
    const parsed = validate(values);
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
        body: JSON.stringify(parsed.data),
      });

      // Success only on a real 200 (route returns { success: true }, or { demo: true }
      // pre-Resend). Any error code must surface so a message is never silently lost.
      if (!res.ok) {
        const json = await res.json().catch(() => null);
        setStatus("error");
        setErrorMessage(
          json?.error ??
            "Something went wrong sending your message. Please try again, or call Jim directly at (603) 891-5755.",
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
          background: "color-mix(in oklab, var(--accent) 12%, var(--bg-elevated))",
          borderColor: "var(--accent)",
        }}
        role="status"
        aria-live="polite"
      >
        <p
          className="font-mono text-xs uppercase tracking-widest mb-2"
          style={{ color: "var(--accent)" }}
        >
          Message Received
        </p>
        <p
          className="font-body"
          style={{ color: "var(--text-primary)", fontSize: "1rem", lineHeight: 1.6 }}
        >
          Form submitted. {siteConfig.hero.trustMicrocopy} I will reply personally from{" "}
          <a
            href={`mailto:${siteConfig.business.email}`}
            style={{ color: "var(--primary)" }}
            className="hover:underline"
          >
            {siteConfig.business.email}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 font-mono text-xs uppercase tracking-widest hover:underline"
          style={{ color: "var(--primary)" }}
        >
          Send another message
        </button>
      </div>
    );
  }

  const fieldClass =
    "w-full rounded-lg px-4 py-3 font-body transition-colors focus:outline-none focus:ring-2";
  const labelClass = "font-mono text-xs uppercase tracking-widest mb-2 block";

  const fieldStyle = {
    background: "var(--bg-elevated)",
    color: "var(--text-primary)",
    border: "1px solid var(--border-dark)",
  } as const;

  const renderError = (msg?: string) =>
    msg ? (
      <p
        className="mt-2 font-body text-sm"
        style={{ color: "#fda4a4" }}
        role="alert"
      >
        {msg}
      </p>
    ) : null;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {/* Honeypot — Stage 1J run-2 BUG-3. Humans never see this; bots fill all inputs. */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        {...register("website")}
        style={{
          position: "absolute",
          left: "-9999px",
          width: "1px",
          height: "1px",
          opacity: 0,
        }}
      />
      <div>
        <label htmlFor="contact-name" className={labelClass} style={{ color: "var(--text-secondary)" }}>
          Name
        </label>
        <input
          id="contact-name"
          type="text"
          autoComplete="name"
          className={fieldClass}
          style={fieldStyle}
          {...register("name", { required: "Please enter your name." })}
          aria-invalid={errors.name ? "true" : "false"}
        />
        {renderError(errors.name?.message)}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="contact-email" className={labelClass} style={{ color: "var(--text-secondary)" }}>
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            className={fieldClass}
            style={fieldStyle}
            {...register("email", { required: "Please enter your email." })}
            aria-invalid={errors.email ? "true" : "false"}
          />
          {renderError(errors.email?.message)}
        </div>

        <div>
          <label htmlFor="contact-phone" className={labelClass} style={{ color: "var(--text-secondary)" }}>
            Phone (optional)
          </label>
          <input
            id="contact-phone"
            type="tel"
            autoComplete="tel"
            className={fieldClass}
            style={fieldStyle}
            {...register("phone")}
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-company" className={labelClass} style={{ color: "var(--text-secondary)" }}>
          Company (optional)
        </label>
        <input
          id="contact-company"
          type="text"
          autoComplete="organization"
          className={fieldClass}
          style={fieldStyle}
          {...register("company")}
        />
      </div>

      <div>
        <label htmlFor="contact-message" className={labelClass} style={{ color: "var(--text-secondary)" }}>
          What can Jim help with?
        </label>
        <textarea
          id="contact-message"
          rows={5}
          className={fieldClass}
          style={{ ...fieldStyle, resize: "vertical", minHeight: "120px" }}
          placeholder="Which rooms and windows, what you are after (shades, blinds, shutters, drapery, motorization), or a repair on a treatment you already own."
          {...register("message", { required: "Tell me a bit about your windows and rooms." })}
          aria-invalid={errors.message ? "true" : "false"}
        />
        {renderError(errors.message?.message)}
      </div>

      {status === "error" && errorMessage && (
        <div
          className="rounded-lg p-4 border"
          style={{
            background: "color-mix(in oklab, #f87171 12%, var(--bg-elevated))",
            borderColor: "#f87171",
          }}
          role="alert"
        >
          <p className="font-body" style={{ color: "#fda4a4", fontSize: "0.95rem" }}>
            {errorMessage}
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full sm:w-auto inline-flex items-center justify-center font-semibold transition-all duration-200 px-8 py-4 rounded-lg disabled:opacity-60 disabled:cursor-not-allowed hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(201,166,107,0.25)]"
        style={{
          background: "var(--primary)",
          color: "var(--bg-base)",
          fontSize: "1rem",
        }}
      >
        {status === "submitting" ? "Sending..." : "Send Message"}
      </button>

      <p
        className="font-mono text-xs uppercase tracking-widest pt-2"
        style={{ color: "var(--text-muted)" }}
      >
        Prefer the phone? Call{" "}
        <a
          href={`tel:${siteConfig.business.phone}`}
          style={{ color: "var(--primary)" }}
          className="phone-display hover:underline"
        >
          {siteConfig.business.phoneFormatted}
        </a>
      </p>
    </form>
  );
}
