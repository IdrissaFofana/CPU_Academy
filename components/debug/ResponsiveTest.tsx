"use client";

import { useMediaQuery } from "@/hooks/useStorage";

export function ResponsiveTest() {
  const isMobile = useMediaQuery("(max-width: 640px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");
  const isDesktop = useMediaQuery("(min-width: 1025px)");

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-slate-900 text-white p-4 rounded-lg text-xs max-w-max shadow-lg">
      <div className="space-y-1">
        <div>Mobile (≤640px): {isMobile ? "✓" : "✗"}</div>
        <div>Tablet (≤1024px): {isTablet ? "✓" : "✗"}</div>
        <div>Desktop (≥1025px): {isDesktop ? "✓" : "✗"}</div>
      </div>
    </div>
  );
}
