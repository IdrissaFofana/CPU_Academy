"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type CookieCategory = "essential" | "functional" | "analytics" | "marketing";

export interface CookieConsent {
  essential: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
}

interface CookieConsentData {
  version: number;
  timestamp: string;
  consent: CookieConsent;
}

interface CookieConsentState {
  consent: CookieConsent | null;
  hasDecided: boolean;
  acceptAll: () => void;
  declineAll: () => void;
  setCustomConsent: (prefs: Omit<CookieConsent, "essential">) => void;
  isAllowed: (category: CookieCategory) => boolean;
  resetConsent: () => void;
}

const STORAGE_KEY = "cpu_cookie_consent";
const CONSENT_VERSION = 1;

const CookieConsentContext = createContext<CookieConsentState | null>(null);

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<CookieConsent | null>(null);
  const [hasDecided, setHasDecided] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed: CookieConsentData = JSON.parse(raw);
        if (parsed.version === CONSENT_VERSION && parsed.consent) {
          setConsent(parsed.consent);
          setHasDecided(true);
        }
      }
    } catch {
      // ignore storage/parse errors
    }
  }, []);

  const save = (c: CookieConsent) => {
    const data: CookieConsentData = {
      version: CONSENT_VERSION,
      timestamp: new Date().toISOString(),
      consent: c,
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // ignore storage errors
    }
    setConsent(c);
    setHasDecided(true);
  };

  const acceptAll = () =>
    save({ essential: true, functional: true, analytics: true, marketing: true });

  const declineAll = () =>
    save({ essential: true, functional: false, analytics: false, marketing: false });

  const setCustomConsent = (prefs: Omit<CookieConsent, "essential">) =>
    save({ essential: true, ...prefs });

  const isAllowed = (category: CookieCategory): boolean => {
    if (category === "essential") return true;
    return consent?.[category] ?? false;
  };

  const resetConsent = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setConsent(null);
    setHasDecided(false);
  };

  return (
    <CookieConsentContext.Provider
      value={{ consent, hasDecided, acceptAll, declineAll, setCustomConsent, isAllowed, resetConsent }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) throw new Error("useCookieConsent doit être utilisé dans CookieConsentProvider");
  return ctx;
}
