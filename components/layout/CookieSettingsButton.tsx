"use client";

import { useState } from "react";
import { useCookieConsent } from "@/contexts/CookieConsentContext";
import { CookiePreferencesModal } from "@/components/layout/CookieBanner";
import { Settings2 } from "lucide-react";

export function CookieSettingsButton() {
  const { resetConsent } = useCookieConsent();
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    // Si le consentement est déjà donné, ouvre directement les préférences.
    // Si non, reset pour montrer la bannière.
    setShowModal(true);
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="inline-flex items-center gap-1.5 text-slate-400 hover:text-[#F17425] text-xs transition-colors"
        aria-label="Gérer mes cookies"
      >
        <Settings2 className="w-3.5 h-3.5" />
        Gérer mes cookies
      </button>

      <CookiePreferencesModal open={showModal} onOpenChange={setShowModal} />
    </>
  );
}
