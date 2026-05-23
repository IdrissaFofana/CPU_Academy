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

export type CatalogueFormationListLayoutProps = {
  formation: Record<string, unknown>;
  image: ReactNode;
  formatLabel: string;
  title: string;
  description?: string;
  certifiant?: boolean;
  imageTopRight?: ReactNode;
  imageTopLeftExtra?: ReactNode;
  priceAmount: number;
  gratuit?: boolean;
  strikethroughPrice?: number;
  ctaLabel: string;
  onCardClick: () => void;
  onCtaClick: (e: React.MouseEvent) => void;
  ctaDisabled?: boolean;
  progressPercent?: number;
  className?: string;
  sessionEnrollmentCounts?: Record<string, number> | null;
};

export function CatalogueFormationListLayout({
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
}: CatalogueFormationListLayoutProps) {
  const ratingLabel = formatFormationCardRatingLabel(formation);
  const studentsLabel = formatFormationCardStudentsLabel(formation, sessionEnrollmentCounts);
  const duree = Number(formation.duree ?? formation.duration ?? 0);
  const niveau = resolveNiveauDisplayLabel(String(formation.niveau ?? formation.level ?? ""));
  const location = formatFormationCardLocation({
    ville: formation.ville as string | undefined,
    region: formation.region as string | undefined,
  });
  const resume =
    description?.trim() || String(formation.resume ?? formation.description ?? "").trim();

  return (
    <article
      onClick={onCardClick}
      className={cn(
        "group flex cursor-pointer flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300",
        "hover:border-orange-200/80 hover:shadow-md sm:flex-row",
        className,
      )}
    >
      {/* Visuel */}
      <div className="relative h-44 w-full shrink-0 overflow-hidden bg-slate-100 sm:h-auto sm:min-h-[11.5rem] sm:w-52 md:w-60 lg:w-64">
        {image}
        <div className="absolute left-3 top-3 z-10 flex flex-col items-start gap-1.5">
          {imageTopLeftExtra}
        </div>
        <div className="absolute right-3 top-3 z-10 flex flex-col items-end gap-1.5">
          {certifiant && (
            <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white shadow">
              <Award className="h-3 w-3 shrink-0" aria-hidden />
              Certifiante
            </span>
          )}
        </div>
      </div>

      {/* Contenu + actions */}
      <div className="flex min-w-0 flex-1 flex-col lg:flex-row">
        <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-xs font-semibold text-slate-700">
              {formatLabel}
            </span>
            <FormationCategoryTags formation={formation} maxVisible={2} size="sm" className="min-w-0" />
            <span
              className={cn(
                "rounded-full border px-2.5 py-0.5 text-[11px] font-semibold",
                niveauPillClass(String(formation.niveau ?? formation.level ?? "")),
              )}
            >
              {niveau}
            </span>
          </div>

          <h3 className="mb-2 line-clamp-2 text-lg font-bold leading-snug text-slate-900 transition-colors group-hover:text-cpu-orange">
            {title}
          </h3>

          <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-slate-500">
            {resume || "Découvrez cette formation professionnelle sur CPU Academy."}
          </p>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 shrink-0 text-slate-400" aria-hidden />
              {formatFormationCardDuration(duree)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-slate-400" aria-hidden />
              <span className="truncate">{location}</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Star className="h-3.5 w-3.5 shrink-0 fill-amber-400 text-amber-400" aria-hidden />
              <span className="font-semibold text-slate-700">{ratingLabel}</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5 shrink-0 text-slate-400" aria-hidden />
              <span className="font-medium text-slate-600">{studentsLabel}</span>
            </span>
          </div>

          {progressPercent != null && progressPercent >= 0 && (
            <div className="mt-3 max-w-md space-y-1">
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
        </div>

        {/* Prix + CTA (colonne droite) */}
        <div
          className="flex shrink-0 flex-row items-center justify-between gap-4 border-t border-slate-100 bg-slate-50/40 px-4 py-4 sm:flex-col sm:items-stretch sm:justify-center sm:border-l sm:border-t-0 sm:px-5 lg:w-48"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="min-w-0 sm:text-right">
            <p
              className={cn(
                "text-xl font-bold leading-tight",
                gratuit || priceAmount <= 0 ? "text-emerald-600" : "text-cpu-orange",
              )}
            >
              {formatFormationCardPrice(priceAmount, gratuit)}
            </p>
            {strikethroughPrice != null && strikethroughPrice > priceAmount && priceAmount > 0 && (
              <p className="text-xs text-slate-400 line-through sm:text-right">
                {formatFormationCardPrice(strikethroughPrice)}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            {imageTopRight}
            <Button
              type="button"
              size="sm"
              disabled={ctaDisabled}
              onClick={onCtaClick}
              className="min-w-[9.5rem] rounded-lg bg-cpu-orange px-4 font-semibold text-white shadow-sm hover:bg-cpu-orange/90 disabled:opacity-70"
            >
              {ctaLabel}
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
