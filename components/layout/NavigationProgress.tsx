"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * Thin orange progress bar at the top of the page that animates on every
 * client-side navigation (pathname change). No external library needed.
 */
export function NavigationProgress() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    // Clear any in-flight timers from a previous navigation
    timers.current.forEach(clearTimeout);
    timers.current = [];

    setVisible(true);
    setProgress(15);

    const t1 = setTimeout(() => setProgress(45), 150);
    const t2 = setTimeout(() => setProgress(72), 400);
    const t3 = setTimeout(() => setProgress(96), 750);
    const t4 = setTimeout(() => {
      setProgress(100);
      const t5 = setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 400);
      timers.current.push(t5);
    }, 1050);

    timers.current.push(t1, t2, t3, t4);
    return () => timers.current.forEach(clearTimeout);
  }, [pathname]);

  if (!visible && progress === 0) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[9999] h-[3px] pointer-events-none"
    >
      <div
        className="h-full bg-gradient-to-r from-cpu-orange via-orange-400 to-yellow-300"
        style={{
          width: `${progress}%`,
          boxShadow: "0 0 8px rgba(241,116,37,0.6)",
          transition:
            progress === 100
              ? "width 350ms ease, opacity 350ms ease 200ms"
              : "width 350ms cubic-bezier(0.4, 0, 0.2, 1)",
          opacity: progress === 100 ? 0 : 1,
        }}
      />
    </div>
  );
}
