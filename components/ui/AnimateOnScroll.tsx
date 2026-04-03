"use client";

import { useEffect, useRef, useState } from "react";

export type AnimationVariant =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "zoom"
  | "fade";

interface AnimateOnScrollProps {
  children: React.ReactNode;
  variant?: AnimationVariant;
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
  /** Whether to re-hide when element leaves the viewport (default: false — animate once) */
  once?: boolean;
}

const HIDDEN_STYLES: Record<AnimationVariant, React.CSSProperties> = {
  "fade-up":    { opacity: 0, transform: "translateY(52px)" },
  "fade-down":  { opacity: 0, transform: "translateY(-52px)" },
  "fade-left":  { opacity: 0, transform: "translateX(52px)" },
  "fade-right": { opacity: 0, transform: "translateX(-52px)" },
  "zoom":       { opacity: 0, transform: "scale(0.87)" },
  "fade":       { opacity: 0 },
};

const VISIBLE_STYLE: React.CSSProperties = {
  opacity: 1,
  transform: "translateY(0) translateX(0) scale(1)",
};

export function AnimateOnScroll({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 700,
  threshold = 0.1,
  className,
  once = true,
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If prefers-reduced-motion, show immediately
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...(isVisible ? VISIBLE_STYLE : HIDDEN_STYLES[variant]),
        transition: `opacity ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94), transform ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
        transitionDelay: `${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
