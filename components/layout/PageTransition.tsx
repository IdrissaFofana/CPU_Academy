"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * Wraps page content with a smooth fade+slide-up animation on every route
 * change so each page "enters" gracefully.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [show, setShow] = useState(true);

  useEffect(() => {
    setShow(false);
    const t = setTimeout(() => setShow(true), 60);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <div
      style={{
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0)" : "translateY(12px)",
        transition: "opacity 450ms ease, transform 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }}
    >
      {children}
    </div>
  );
}
