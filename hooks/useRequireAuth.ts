"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSimpleAuth } from "@/contexts/SimpleAuthContext";

export function useRequireAuth() {
  const { isAuthenticated, isReady } = useSimpleAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isReady) return;
    if (!isAuthenticated) {
      const redirect = encodeURIComponent(pathname || "/");
      router.replace(`/connexion?redirect=${redirect}`);
    }
  }, [isAuthenticated, isReady, pathname, router]);

  return {
    isReady,
    isAuthenticated,
    canAccess: isReady && isAuthenticated,
  };
}
