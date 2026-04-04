"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { X, Tag, Copy, Check, Clock } from "lucide-react";
import { apiClient } from "@/lib/api/client";
import { API_ENDPOINTS } from "@/lib/api/config";

// ── Palette de 6 dégradés – couleur assignée par hash de l'id ────────────────
const PALETTE = [
  { gradient: "linear-gradient(135deg,#e02020 0%,#b71c1c 100%)", accent: "#b71c1c" }, // rouge
  { gradient: "linear-gradient(135deg,#f57c00 0%,#e65100 100%)", accent: "#e65100" }, // orange
  { gradient: "linear-gradient(135deg,#2e7d32 0%,#1b5e20 100%)", accent: "#1b5e20" }, // vert
  { gradient: "linear-gradient(135deg,#1565c0 0%,#0d47a1 100%)", accent: "#0d47a1" }, // bleu
  { gradient: "linear-gradient(135deg,#6a1b9a 0%,#4a148c 100%)", accent: "#4a148c" }, // violet
  { gradient: "linear-gradient(135deg,#00695c 0%,#004d40 100%)", accent: "#004d40" }, // teal
] as const;

function pickPalette(id: string) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) | 0;
  return PALETTE[Math.abs(h) % PALETTE.length];
}

const ROTATION_MS = 6000;

// ── Interfaces ────────────────────────────────────────────────────────────────

interface Formation {
  id?: string;
  title: string;
  category: string;
  isActive?: boolean;
  dateFin?: string;
  endDate?: string;
  date_fin?: string;
  date?: {
    fin?: string;
    end?: string;
    dateFin?: string;
    endDate?: string;
  };
}

interface Promo {
  id: string;
  nom: string;
  code: string;
  valeur: number;
  typeReduction: string; // "Pourcentage" | "Fixe"
  dateFin?: string;
  scope: string; // "Toutes les formations" | nom de la 1re formation
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function decodeEntities(s: string): string {
  return s
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, "/")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"');
}

function formatReduction(valeur: number, type: string): string {
  if (type === "Pourcentage") return `-${valeur}%`;
  // Fixe → montant en FCFA formaté
  return `-${new Intl.NumberFormat("fr-FR").format(valeur)} FCFA`;
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
  } catch {
    return iso;
  }
}

function isUrgent(dateFin?: string): boolean {
  if (!dateFin) return false;
  const diff = new Date(dateFin).getTime() - Date.now();
  return diff > 0 && diff < 7 * 24 * 60 * 60 * 1000; // < 7 jours
}

function extractFormationEndDate(f: Formation): string | undefined {
  return f.dateFin || f.endDate || f.date_fin || f.date?.fin || f.date?.end || f.date?.dateFin || f.date?.endDate;
}

function isFormationDisplayable(f: Formation): boolean {
  if (f.isActive === false) return false;

  const end = extractFormationEndDate(f);
  if (!end) return true;

  const endTs = new Date(end).getTime();
  if (isNaN(endTs)) return true;

  return endTs >= Date.now();
}

function isCurrentlyActive(item: any): boolean {
  const statut = String(item?.statut ?? "").toLowerCase();
  if (!["active", "actif", "actif"].includes(statut) && statut !== "active") {
    if (statut && statut !== "active") return false;
  }
  const today = Date.now();
  if (item?.dateDebut) {
    const debut = new Date(item.dateDebut).getTime();
    if (!isNaN(debut) && debut > today) return false;
  }
  if (item?.dateFin) {
    const fin = new Date(item.dateFin).getTime();
    if (!isNaN(fin) && fin < today) return false;
  }
  return true;
}

function normalizeArray(payload: any): any[] {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.data?.data)) return payload.data.data;
  return [];
}

function normalizePromotions(payload: any): Promo[] {
  return normalizeArray(payload)
    .filter(isCurrentlyActive)
    .map((item: any, idx: number) => {
      const nom = decodeEntities(
        String(item?.nom || item?.name || item?.titre || item?.title || `Promotion ${idx + 1}`)
      );
      const code = String(item?.code || "").trim();
      const valeur = parseFloat(item?.valeur ?? 0);
      const typeReduction = String(item?.typeReduction || item?.type_reduction || "Pourcentage");
      const allFormations: Formation[] = item?.formationsConcernees ?? item?.formations ?? [];
      const eligibleFormations = allFormations.filter(isFormationDisplayable);

      if (!item?.appliquer_a_toute_formation && allFormations.length > 0 && eligibleFormations.length === 0) {
        return null;
      }

      let scope = "Toutes les formations";
      if (!item?.appliquer_a_toute_formation) {
        if (eligibleFormations.length === 1) {
          scope = decodeEntities(eligibleFormations[0].title);
        } else if (eligibleFormations.length > 1) {
          scope = `${eligibleFormations.length} formations`;
        } else {
          scope = "Aucune formation disponible";
        }
      } else {
        scope = "Toutes les formations actives";
      }

      return {
        id: String(item?.id || item?._id || `promo-${idx}`),
        nom,
        code,
        valeur,
        typeReduction,
        dateFin: item?.dateFin || item?.date_fin || undefined,
        scope,
      } as Promo;
    })
    .filter(Boolean) as Promo[];
}

// ── Component ─────────────────────────────────────────────────────────────────

export function AnnouncementBar() {
  const [promotions, setPromotions] = useState<Promo[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dismissedIds, setDismissedIds] = useState<Set<string>>(new Set());

  // Bar animation
  const [isMounted, setIsMounted] = useState(false);
  const [isDismissing, setIsDismissing] = useState(false);

  // Content cross-fade
  const [isContentIn, setIsContentIn] = useState(true);

  const [isHovered, setIsHovered] = useState(false);

  // Copied code feedback
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Progress bar via rAF (zero React re-renders per frame)
  const progressBarRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const startRef = useRef<number>(0);

  // ── Fetch ──
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await apiClient.get(API_ENDPOINTS.PROMOTIONS.PUBLIC);
        if (!cancelled) setPromotions(normalizePromotions(res));
      } catch {
        if (!cancelled) setPromotions([]);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  // ── Load dismissed ids after promotions arrive ──
  useEffect(() => {
    if (!promotions.length) return;
    const dismissed = new Set(
      promotions
        .filter((p) => localStorage.getItem(`promo-dismissed-${p.id}`) === "true")
        .map((p) => p.id)
    );
    setDismissedIds(dismissed);
  }, [promotions]);

  const visible = promotions.filter((p) => !dismissedIds.has(p.id));
  const safeIndex = visible.length > 0 ? Math.min(currentIndex, visible.length - 1) : 0;
  const current = visible[safeIndex] ?? null;
  const palette = current ? pickPalette(current.id) : PALETTE[0];

  // ── Enter animation (double rAF) ──
  useEffect(() => {
    if (visible.length > 0 && !isMounted) {
      requestAnimationFrame(() => requestAnimationFrame(() => setIsMounted(true)));
    }
  }, [visible.length, isMounted]);

  // ── Navigate with cross-fade ──
  const goTo = useCallback((index: number) => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (timerRef.current) clearTimeout(timerRef.current);
    if (progressBarRef.current) progressBarRef.current.style.width = "0%";
    setIsContentIn(false);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsContentIn(true);
    }, 280);
  }, []);

  // ── Progress bar + auto-rotation ──
  useEffect(() => {
    if (visible.length <= 1 || isHovered || !current) {
      if (progressBarRef.current) progressBarRef.current.style.width = "0%";
      return;
    }
    if (progressBarRef.current) progressBarRef.current.style.width = "0%";
    startRef.current = performance.now();

    const tick = (now: number) => {
      const pct = Math.min(((now - startRef.current) / ROTATION_MS) * 100, 100);
      if (progressBarRef.current) progressBarRef.current.style.width = `${pct}%`;
      if (pct < 100) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    timerRef.current = setTimeout(() => {
      goTo((safeIndex + 1) % visible.length);
    }, ROTATION_MS);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [safeIndex, visible.length, isHovered, current, goTo]);

  // ── Copy promo code ──
  const handleCopy = useCallback((code: string, id: string) => {
    navigator.clipboard.writeText(code).catch(() => {});
    setCopiedId(id);
    setTimeout(() => setCopiedId((prev) => (prev === id ? null : prev)), 2000);
  }, []);

  // ── Dismiss ──
  const handleDismiss = useCallback(() => {
    if (!current) return;
    const id = current.id;
    const newDismissed = new Set([...dismissedIds, id]);
    localStorage.setItem(`promo-dismissed-${id}`, "true");

    const remaining = promotions.filter((p) => !newDismissed.has(p.id));
    if (remaining.length === 0) {
      setIsMounted(false);
      setIsDismissing(true);
      setTimeout(() => {
        setDismissedIds(newDismissed);
        setIsDismissing(false);
      }, 520);
    } else {
      setIsContentIn(false);
      setTimeout(() => {
        setDismissedIds(newDismissed);
        setCurrentIndex(0);
        setIsContentIn(true);
      }, 280);
    }
  }, [current, dismissedIds, promotions]);

  if (visible.length === 0 && !isDismissing) return null;

  const urgent = isUrgent(current?.dateFin);
  const reduction = current ? formatReduction(current.valeur, current.typeReduction) : "";

  return (
    <div
      className="relative overflow-hidden text-white select-none"
      style={{
        maxHeight: isMounted && !isDismissing ? "52px" : "0px",
        opacity: isMounted && !isDismissing ? 1 : 0,
        background: palette.gradient,
        transition: "max-height 0.5s cubic-bezier(0.4,0,0.2,1), opacity 0.45s ease, background 0.6s ease",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Diagonal shine */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "linear-gradient(110deg,rgba(255,255,255,0.09) 0%,rgba(255,255,255,0) 55%)" }}
      />

      {/* Progress bar */}
      {visible.length > 1 && (
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-black/20">
          <div ref={progressBarRef} className="h-full bg-white/50" style={{ width: "0%" }} />
        </div>
      )}

      {/* Content */}
      <div
        className="px-4 py-0 h-[52px] flex items-center"
        style={{
          opacity: isContentIn ? 1 : 0,
          transform: isContentIn ? "translateY(0)" : "translateY(-5px)",
          transition: "opacity 0.28s ease, transform 0.28s ease",
        }}
      >
        <div className="container mx-auto">
          <div className="relative flex items-center justify-center gap-2 md:gap-3 text-sm min-w-0">

            {/* ── Réduction badge ── */}
            {current && current.valeur > 0 && (
              <span className="shrink-0 rounded-md bg-white/20 px-2 py-0.5 text-xs font-black tracking-tight border border-white/30">
                {reduction}
              </span>
            )}

            {/* ── Nom de la promo ── */}
            <span className="font-semibold truncate max-w-[180px] sm:max-w-xs">
              {current?.nom ?? ""}
            </span>

            {/* ── Séparateur + scope ── */}
            {current && (
              <span className="hidden sm:inline text-white/60 shrink-0 text-[11px]">
                · {current.scope}
              </span>
            )}

            {/* ── Code promo copiable ── */}
            {current?.code && (
              <button
                onClick={() => handleCopy(current.code, current.id)}
                className="hidden sm:flex shrink-0 items-center gap-1.5 rounded-md border border-white/30 bg-white/15 px-2.5 py-0.5 text-[11px] font-mono font-bold tracking-wider transition-all duration-300 hover:bg-white/25 hover:-translate-y-0.5 active:scale-95"
                style={{
                  transform: isContentIn ? "translateX(0px)" : "translateX(8px)",
                }}
                title="Copier le code"
              >
                <Tag className="h-3 w-3 opacity-75" />
                {current.code}
                {copiedId === current.id ? (
                  <Check className="h-3 w-3 text-green-300" />
                ) : (
                  <Copy className="h-3 w-3 opacity-60" />
                )}
              </button>
            )}

            {/* ── Date limite ── */}
            {current?.dateFin && (
              <span
                className={`hidden md:flex shrink-0 items-center gap-1 text-[11px] ${
                  urgent ? "font-bold text-yellow-200" : "text-white/70"
                }`}
              >
                <Clock className="h-3 w-3" />
                {urgent ? "⚡ " : ""}Jusqu'au {formatDate(current.dateFin)}
              </span>
            )}

            {/* ── Dot navigation ── */}
            {visible.length > 1 && (
              <div
                className="hidden lg:flex shrink-0 items-center gap-1.5 ml-1"
                style={{
                  transform: isContentIn ? "translateX(0px)" : "translateX(10px)",
                  transition: "transform 0.3s ease",
                }}
              >
                {visible.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className="rounded-full transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5"
                    style={{
                      width: i === safeIndex ? "16px" : "5px",
                      height: "5px",
                      background: i === safeIndex ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.35)",
                    }}
                    aria-label={`Promotion ${i + 1}`}
                  />
                ))}
              </div>
            )}

            {/* ── Close ── */}
            <button
              onClick={handleDismiss}
              className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full p-1.5 transition-all duration-200 hover:rotate-90 hover:bg-white/20 active:bg-white/30"
              aria-label="Fermer"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

