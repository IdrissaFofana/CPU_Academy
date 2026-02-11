"use client";

import { Card } from "@/components/ui/card";
import { SHADOWS, TRANSITIONS, RADIUS } from "@/lib/design-tokens";
import { ReactNode } from "react";

interface UnifiedCardProps {
  children: ReactNode;
  variant?: "default" | "elevated" | "flat" | "bordered";
  hover?: boolean;
  clickable?: boolean;
  className?: string;
}

export function UnifiedCard({
  children,
  variant = "default",
  hover = true,
  clickable = false,
  className = "",
}: UnifiedCardProps) {
  const variants = {
    default: `bg-white ${SHADOWS.card} border-0`,
    elevated: `bg-white ${SHADOWS.cardHover} border-0`,
    flat: "bg-white border border-slate-200",
    bordered: "bg-white border-2 border-slate-300",
  };

  const hoverEffect = hover
    ? "hover:-translate-y-1"
    : "";
  
  const cursorEffect = clickable ? "cursor-pointer" : "";

  return (
    <Card
      className={`
        ${variants[variant]}
        ${RADIUS.card}
        ${TRANSITIONS.default}
        ${hoverEffect}
        ${cursorEffect}
        overflow-hidden
        ${className}
      `}
    >
      {children}
    </Card>
  );
}

