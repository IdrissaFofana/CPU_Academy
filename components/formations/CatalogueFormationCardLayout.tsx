"use client";

import type { ReactNode } from "react";
import { Award, Clock, MapPin, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormationCategoryTags } from "@/components/formations/FormationCategoryTags";
import { cn } from "@/lib/utils";
import {
  formatFormationCardDuration,
  formatFormationCardLocation,
  formatFormationCardPrice,
  formatFormationCardRatingLabel,
  formatFormationCardStudentsLabel,
  niveauPillClass,
  resolveNiveauDisplayLabel,
} from "@/lib/formation/formatFormationCardDisplay";

export type CatalogueFormationCardLayoutProps = {
  formation: Record<string, unknown>;
  image: ReactNode;
  formatLabel: string;
  title: string;
  description?: string;
  certifiant?: boolean;
  /** Coin image : panier, promo, etc. */
  imageTopRight?: ReactNode;
  imageTopLeftExtra?: ReactNode;
  priceAmount: number;
  gratuit?: boolean;
  strikethroughPrice?: number;
  ctaLabel: string;
  onCardClick: () => void;
  onCtaClick: (e: React.MouseEvent) => void;
  ctaDisabled?: boolean;
  /** Barre de progression (inscrit) */
  progressPercent?: number;
  className?: string;
  /** Comptes inscrits issus des sessions publiques (agrégation par formation). */
  sessionEnrollmentCounts?: Record<string, number> | null;
};

export function CatalogueFormationCardLayout({
  formation,
  image,
  formatLabel,
  title,
  description,
  certifiant,
  imageTopRight,
  imageTopLeftExtra,
  priceAmount,
  gratuit,
  strikethroughPrice,
  ctaLabel,
  onCardClick,
  onCtaClick,
  ctaDisabled,
  progressPercent,
  className,
  sessionEnrollmentCounts = null,
}: CatalogueFormationCardLayoutProps) {
  const ratingLabel = formatFormationCardRatingLabel(formation);
  const studentsLabel = formatFormationCardStudentsLabel(formation, sessionEnrollmentCounts);
  const duree = Number(formation.duree ?? formation.duration ?? 0);
  const niveau = resolveNiveauDisplayLabel(
    String(formation.niveau ?? formation.level ?? ""),
  );
  const location = formatFormationCardLocation({
    ville: formation.ville as string | undefined,
    region: formation.region as string | undefined,
  });
  const resume =
    description?.trim() ||
    String(formation.resume ?? formation.description ?? "").trim();

  return (
    <article
      onClick={onCardClick}
      className={cn(
        "group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl",
        "border border-slate-100 bg-white shadow-md",
        "transition-all duration-300 hover:-translate-y-1 hover:border-orange-200/80 hover:shadow-xl",
        className,
      )}
    >
      <div className="relative h-44 overflow-hidden bg-slate-100 sm:h-48">
        {image}

        <div className="absolute left-3 top-3 z-10 flex flex-col items-start gap-1.5">
          {imageTopLeftExtra}
        </div>

        <div className="absolute right-3 top-3 z-10 flex flex-col items-end gap-1.5">
          {certifiant && (
            <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow-md">
              <Award className="h-3.5 w-3.5 shrink-0" aria-hidden />
              Certifiante
            </span>
          )}
          {imageTopRight}
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col p-4 sm:p-5">
        {/* Hauteur fixe : tags + niveau alignés sur une même ligne de grille */}
        <div className="mb-3 flex min-h-7 min-w-0 items-start justify-between gap-2">
          <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
            <span className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-xs font-semibold text-slate-700">
              {formatLabel}
            </span>
            <FormationCategoryTags formation={formation} maxVisible={1} size="sm" className="min-w-0" />
          </div>
          <span
            className={cn(
              "shrink-0 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold",
              niveauPillClass(String(formation.niveau ?? formation.level ?? "")),
            )}
          >
            {niveau}
          </span>
        </div>

        {/* Titre : 2 lignes réservées sur toutes les cartes */}
        <h3 className="mb-2 min-h-[2.75rem] line-clamp-2 text-base font-bold leading-snug text-slate-900 transition-colors group-hover:text-cpu-orange">
          {title}
        </h3>

        {/* Description : 2 lignes réservées (vide = espace conservé) */}
        <p className="mb-4 min-h-[2.75rem] line-clamp-2 text-sm leading-relaxed text-slate-500">
          {resume || "\u00A0"}
        </p>

        {/* Métadonnées : grille 2×2 hauteur fixe par ligne */}
        <div className="mb-4 grid grid-cols-2 grid-rows-2 gap-x-3 gap-y-2.5 text-xs text-slate-500">
          <span className="inline-flex min-h-5 min-w-0 items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 shrink-0 text-slate-400" aria-hidden />
            <span className="truncate">{formatFormationCardDuration(duree)}</span>
          </span>
          <span className="inline-flex min-h-5 min-w-0 items-center gap-1.5">
            <Star className="h-3.5 w-3.5 shrink-0 fill-amber-400 text-amber-400" aria-hidden />
            <span className="font-semibold text-slate-700">{ratingLabel}</span>
          </span>
          <span className="inline-flex min-h-5 min-w-0 items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-slate-400" aria-hidden />
            <span className="truncate">{location}</span>
          </span>
          <span className="inline-flex min-h-5 min-w-0 items-center gap-1.5">
            <Users className="h-3.5 w-3.5 shrink-0 text-slate-400" aria-hidden />
            <span className="font-medium text-slate-600">{studentsLabel}</span>
          </span>
        </div>

        {progressPercent != null && progressPercent >= 0 && (
          <div className="mb-4 space-y-1">
            <div className="flex items-center justify-between text-[10px] font-medium text-slate-500">
              <span>Progression</span>
              <span>{Math.min(100, Math.max(0, progressPercent))}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-cpu-orange transition-all duration-500"
                style={{ width: `${Math.min(100, Math.max(0, progressPercent))}%` }}
              />
            </div>
          </div>
        )}

        <div className="mt-auto flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
          <div className="min-w-0">
            <p
              className={cn(
                "text-lg font-bold leading-tight",
                gratuit || priceAmount <= 0 ? "text-emerald-600" : "text-cpu-orange",
              )}
            >
              {formatFormationCardPrice(priceAmount, gratuit)}
            </p>
            {strikethroughPrice != null && strikethroughPrice > priceAmount && priceAmount > 0 && (
              <p className="text-xs text-slate-400 line-through">
                {formatFormationCardPrice(strikethroughPrice)}
              </p>
            )}
          </div>
          <Button
            type="button"
            size="sm"
            disabled={ctaDisabled}
            onClick={onCtaClick}
            className="shrink-0 rounded-xl bg-cpu-orange px-4 font-semibold text-white shadow-sm hover:bg-cpu-orange/90 disabled:opacity-70"
          >
            {ctaLabel}
          </Button>
        </div>
      </div>
    </article>
  );
}
