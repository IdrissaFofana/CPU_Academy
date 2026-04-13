"use client";

import { usePathname } from "next/navigation";

/**
 * Wraps page content with a smooth fade+slide-up animation on every route
 * change so each page "enters" gracefully.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div
      key={pathname}
      style={{
        animation: "fadeInUp 420ms ease",
      }}
    >
      {children}
    </div>
  );
}
