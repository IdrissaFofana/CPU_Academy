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
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto z-[70] p-6">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base">
            <Shield className="w-5 h-5 text-[#F17425]" />
            Paramètres des cookies
          </DialogTitle>
          <DialogDescription className="text-sm">
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

        <div className="space-y-3 mt-1">
          {/* Essentiels — toujours actifs */}
          <div className="flex items-start justify-between gap-4 p-3 bg-gray-50 rounded-xl">
            <div className="flex-1">
              <p className="font-semibold text-gray-900 text-sm">Essentiels</p>
              <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                Indispensables au fonctionnement du site : authentification,
                sécurité, panier d&apos;achat.
              </p>
            </div>
            <div className="flex-shrink-0 pt-0.5">
              <Toggle checked disabled />
            </div>
          </div>

          {/* Catégories gérables */}
          {CATEGORIES.map((cat) => (
            <div
              key={cat.key}
              className="flex items-start justify-between gap-4 p-3 border border-gray-100 rounded-xl hover:border-orange-100 transition-colors"
            >
              <div className="flex-1">
                <p className="font-semibold text-gray-900 text-sm">
                  {cat.label}
                </p>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">
                  {cat.description}
                </p>
              </div>
              <div className="flex-shrink-0 pt-0.5">
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

        <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
          <button
            onClick={handleSave}
            className="flex-1 py-2.5 text-sm font-semibold text-white bg-[#F17425] hover:bg-orange-600 rounded-xl transition-colors"
          >
            Enregistrer mes choix
          </button>
          <button
            onClick={() => {
              acceptAll();
              onOpenChange(false);
            }}
            className="flex-1 py-2.5 text-sm font-semibold text-gray-700 border border-gray-200 hover:bg-gray-50 rounded-xl transition-colors"
          >
            Tout accepter
          </button>
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
      <div className={`fixed bottom-16 md:bottom-0 left-0 right-0 z-[60] px-3 pb-3 md:px-4 md:pb-4 pointer-events-none transition-opacity duration-200 ${showPreferences ? "opacity-0 pointer-events-none" : ""}`}>
        <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-2xl shadow-black/10 pointer-events-auto">
          <div className="p-4 md:p-5">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
                <Cookie className="w-5 h-5 text-[#F17425]" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 text-sm md:text-base">
                  Gestion des cookies
                </h3>
                <p className="text-xs md:text-sm text-gray-500 mt-0.5 leading-relaxed">
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

            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-4">
              <button
                onClick={acceptAll}
                className="flex-1 sm:flex-none px-5 py-2.5 text-sm font-semibold text-white bg-[#F17425] hover:bg-orange-600 rounded-xl transition-colors"
              >
                Tout accepter
              </button>
              <button
                onClick={() => setShowPreferences(true)}
                className="flex-1 sm:flex-none px-5 py-2.5 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
              >
                Personnaliser…
              </button>
              {/* Tout refuser — discret, petit, peu visible au premier coup d'œil */}
              <button
                onClick={declineAll}
                className="sm:ml-auto text-[11px] text-gray-300 hover:text-gray-500 underline underline-offset-2 transition-colors py-1"
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
