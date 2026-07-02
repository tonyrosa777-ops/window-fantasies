import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  size?: "narrow" | "default" | "wide";
}

export function Container({ children, className, size = "default" }: Props) {
  const widths = {
    narrow: "max-w-3xl",
    default: "max-w-6xl",
    wide: "max-w-7xl",
  };
  return <div className={cn("mx-auto px-6 sm:px-8 lg:px-12", widths[size], className)}>{children}</div>;
}
