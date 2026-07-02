import { cn } from "@/lib/utils";
import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

interface BaseProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Band tone the button sits on. "light" flips secondary/ghost to ink-gold so
   *  the label stays legible on a cream section (design-system.md §4/§8). */
  tone?: "dark" | "light";
}

interface LinkProps extends BaseProps {
  href: string;
  as?: "link";
  target?: string;
  rel?: string;
}

interface ButtonProps extends BaseProps {
  as: "button";
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}

const base = "inline-flex items-center justify-center font-medium tracking-tight transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-base)]";

const sizes: Record<Size, string> = {
  sm: "text-sm px-4 py-2 rounded-md",
  md: "text-base px-6 py-3 rounded-lg",
  lg: "text-lg px-8 py-4 rounded-lg",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-[var(--primary)] text-[var(--bg-base)] hover:bg-[color-mix(in_oklab,var(--primary)_92%,white)] hover:-translate-y-px hover:shadow-[0_8px_24px_rgba(201,166,107,0.25)]",
  secondary:
    "border-2 border-[var(--primary-muted)] bg-transparent text-[var(--text-primary)] hover:border-[var(--primary)] hover:bg-[color-mix(in_oklab,var(--primary)_10%,transparent)]",
  ghost:
    "bg-transparent text-[var(--primary)] hover:text-[color-mix(in_oklab,var(--primary)_92%,white)] underline-offset-4 hover:underline",
};

/** On cream bands, secondary/ghost need ink-gold so the label stays legible. */
const lightVariants: Partial<Record<Variant, string>> = {
  secondary:
    "border-2 border-[var(--gold-deep)] bg-transparent text-[var(--gold-deep)] hover:bg-[color-mix(in_oklab,var(--gold-deep)_10%,transparent)]",
  ghost:
    "bg-transparent text-[var(--gold-deep)] hover:text-[var(--gold-deep)] underline-offset-4 hover:underline",
};

export function Button(props: LinkProps | ButtonProps) {
  const { variant = "primary", size = "md", className, children, tone = "dark" } = props;
  const variantClass =
    tone === "light" && lightVariants[variant] ? lightVariants[variant]! : variants[variant];
  const classes = cn(base, sizes[size], variantClass, className);

  if ("as" in props && props.as === "button") {
    return (
      <button type={props.type ?? "button"} onClick={props.onClick} disabled={props.disabled} className={classes}>
        {children}
      </button>
    );
  }

  const linkProps = props as LinkProps;
  return (
    <Link href={linkProps.href} target={linkProps.target} rel={linkProps.rel} className={classes}>
      {children}
    </Link>
  );
}
