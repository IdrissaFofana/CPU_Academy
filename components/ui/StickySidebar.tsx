"use client";

import { useEffect, useState, ReactNode } from "react";
import { UnifiedCard } from "@/components/ui/UnifiedCard";
import { SHADOWS, TRANSITIONS } from "@/lib/design-tokens";

interface StickySidebarProps {
  children: ReactNode;
  offset?: number;
}

export function StickySidebar({ children, offset = 80 }: StickySidebarProps) {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > offset);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [offset]);

  return (
    <div
      className={`
        sticky top-24
        ${TRANSITIONS.default}
        ${isSticky ? SHADOWS.strong : ""}
      `}
    >
      <UnifiedCard variant="elevated" hover={false}>
        {children}
      </UnifiedCard>
    </div>
  );
}
