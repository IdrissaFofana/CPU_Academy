"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCookieConsent } from "@/contexts/CookieConsentContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Cookie, Shield } from "lucide-react";

// ─── Catégories gérables ────────────────────────────────────────────
const CATEGORIES = [
  {
    key: "functional" as const,
    label: "Fonctionnels",
    description:
      "Mémorisent vos préférences (thème, favoris, panier, notifications) pour améliorer votre expérience de navigation.",
  },
  {
    key: "analytics" as const,
    label: "Analytiques",
    description:
      "Nous aident à comprendre comment les visiteurs utilisent le site (pages consultées, durée de visite) afin d'améliorer nos contenus.",
  },
  {
    key: "marketing" as const,
    label: "Marketing",
    description:
      "Permettent de vous proposer des offres et des contenus pertinents en lien avec votre profil et vos centres d'intérêt.",
  },
] as const;

// ─── Composant Toggle interne ────────────────────────────────────────
function Toggle({
  checked,
  onChange,
  disabled,
}: {
  checked: boolean;
  onChange?: (v: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      className={`relative inline-flex h-6 w-11 flex-shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#F17425]/40 focus:ring-offset-2 ${
        disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"
      } ${checked ? "bg-[#F17425]" : "bg-gray-200"}`}
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow ring-0 transition-transform duration-200 ${
          checked ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

// ─── Panneau de préférences (modal) ─────────────────────────────────
export function CookiePreferencesModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const { consent, acceptAll, setCustomConsent } = useCookieConsent();

  const [prefs, setPrefs] = useState({
    functional: consent?.functional ?? true,
    analytics: consent?.analytics ?? false,
    marketing: consent?.marketing ?? false,
  });

  // Sync prefs if consent changes externally (e.g., reset)
  useEffect(() => {
    setPrefs({
      functional: consent?.functional ?? true,
      analytics: consent?.analytics ?? false,
      marketing: consent?.marketing ?? false,
    });
  }, [consent]);

  const handleSave = () => {
    setCustomConsent(prefs);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="z-[70] w-[calc(100vw-1rem)] max-w-xl max-h-[calc(100vh-1rem)] sm:max-h-[90vh] overflow-y-auto p-4 sm:p-6 rounded-2xl sm:rounded-3xl">
        <DialogHeader className="pr-10 sm:pr-12">
          <DialogTitle className="flex items-start gap-2 text-base sm:text-lg leading-tight">
            <Shield className="w-5 h-5 mt-0.5 text-[#F17425] flex-shrink-0" />
            Paramètres des cookies
          </DialogTitle>
          <DialogDescription className="text-xs sm:text-sm leading-relaxed">
            Choisissez les cookies que vous autorisez. Les cookies essentiels
            sont toujours actifs car ils sont nécessaires au bon fonctionnement
            du site.{" "}
            <Link
              href="/politique-confidentialite"
              className="text-[#F17425] hover:underline font-medium"
            >
              En savoir plus
            </Link>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 mt-1 sm:mt-2">
          {/* Essentiels — toujours actifs */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-xl">
            <div className="flex-1">
              <p className="font-semibold text-gray-900 text-sm sm:text-[15px]">Essentiels</p>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5 leading-relaxed">
                Indispensables au fonctionnement du site : authentification,
                sécurité, panier d&apos;achat.
              </p>
            </div>
            <div className="flex-shrink-0 self-end sm:self-start pt-0.5">
              <Toggle checked disabled />
            </div>
          </div>

          {/* Catégories gérables */}
          {CATEGORIES.map((cat) => (
            <div
              key={cat.key}
              className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 p-3 sm:p-4 border border-gray-100 rounded-xl hover:border-orange-100 transition-colors"
            >
              <div className="flex-1">
                <p className="font-semibold text-gray-900 text-sm sm:text-[15px]">
                  {cat.label}
                </p>
                <p className="text-xs sm:text-sm text-gray-500 mt-0.5 leading-relaxed">
                  {cat.description}
                </p>
              </div>
              <div className="flex-shrink-0 self-end sm:self-start pt-0.5">
                <Toggle
                  checked={prefs[cat.key]}
                  onChange={(v) =>
                    setPrefs((p) => ({ ...p, [cat.key]: v }))
                  }
                />
              </div>
            </div>
          ))}
        </div>

        <div className="sticky bottom-0 bg-white pt-4 mt-4 border-t border-gray-100">
          <div className="flex flex-col-reverse sm:flex-row gap-2">
          <button
            onClick={handleSave}
            className="flex-1 py-2.5 sm:py-3 text-sm font-semibold text-white bg-[#F17425] hover:bg-orange-600 rounded-xl transition-colors"
          >
            Enregistrer mes choix
          </button>
          <button
            onClick={() => {
              acceptAll();
              onOpenChange(false);
            }}
            className="flex-1 py-2.5 sm:py-3 text-sm font-semibold text-gray-700 border border-gray-200 hover:bg-gray-50 rounded-xl transition-colors"
          >
            Tout accepter
          </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Bannière principale ─────────────────────────────────────────────
export function CookieBanner() {
  const { hasDecided, acceptAll, declineAll } = useCookieConsent();
  const [mounted, setMounted] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Ne pas rendre pendant le SSR ni si le consentement a déjà été donné
  if (!mounted || hasDecided) return null;

  return (
    <>
      {/* ── Bannière ── masquée quand le modal préférences est ouvert */}
      <div className={`fixed inset-x-2 bottom-[68px] sm:inset-x-4 sm:bottom-4 md:left-0 md:right-0 md:bottom-0 z-[60] pb-2 sm:pb-4 md:pb-4 pointer-events-none transition-opacity duration-200 ${showPreferences ? "opacity-0 pointer-events-none" : ""}`}>
        <div className="w-full max-w-sm sm:max-w-2xl lg:max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl sm:rounded-3xl shadow-2xl shadow-black/10 pointer-events-auto overflow-hidden">
          <div className="p-3 sm:p-4 md:p-5">
            <div className="flex flex-col min-[360px]:flex-row items-start gap-3">
              <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 bg-orange-50 rounded-xl flex items-center justify-center">
                <Cookie className="w-4 h-4 sm:w-5 sm:h-5 text-[#F17425]" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 text-[13px] sm:text-[15px] md:text-base leading-tight break-words">
                  Gestion des cookies
                </h3>
                <p className="text-[11px] sm:text-sm text-gray-500 mt-1 leading-5 sm:leading-relaxed break-words">
                  Nous utilisons des cookies pour améliorer votre expérience,
                  mémoriser vos préférences et analyser l&apos;utilisation du site.{" "}
                  <Link
                    href="/politique-confidentialite"
                    className="text-[#F17425] hover:underline font-medium"
                  >
                    En savoir plus
                  </Link>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 min-[430px]:grid-cols-2 sm:flex sm:flex-wrap sm:items-center gap-2 mt-4 w-full">
              <button
                onClick={acceptAll}
                className="w-full sm:w-auto sm:flex-1 px-4 sm:px-5 py-2.5 text-sm font-semibold text-white bg-[#F17425] hover:bg-orange-600 rounded-xl transition-colors"
              >
                Tout accepter
              </button>
              <button
                onClick={() => setShowPreferences(true)}
                className="w-full sm:w-auto sm:flex-1 px-4 sm:px-5 py-2.5 text-sm text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-xl transition-colors border border-gray-200 sm:border-transparent"
              >
                Personnaliser…
              </button>
              {/* Tout refuser — discret, petit, peu visible au premier coup d'œil */}
              <button
                onClick={declineAll}
                className="col-span-full sm:ml-auto justify-self-center sm:justify-self-auto text-[11px] sm:text-xs text-gray-300 hover:text-gray-500 underline underline-offset-2 transition-colors py-1"
              >
                Tout refuser
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Modal préférences ── */}
      <CookiePreferencesModal
        open={showPreferences}
        onOpenChange={setShowPreferences}
      />
    </>
  );
}
