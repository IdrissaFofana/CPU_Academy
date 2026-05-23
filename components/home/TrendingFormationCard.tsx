"use client";

import { useRouter } from "next/navigation";
import { Clock, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormationCardVisual } from "@/components/formations/FormationCardVisual";
import { extractCategoriesFromFormation } from "@/lib/formation/extractFormationCategories";
import {
  formatFormationCardDuration,
  formatFormationCardRatingLabel,
  formatFormationCardStudentsLabel,
  resolveNiveauDisplayLabel,
} from "@/lib/formation/formatFormationCardDisplay";
import { getModeFallbackImage } from "@/lib/utils";
import type { Formation } from "@/types";

type TrendingFormationCardProps = {
  formation: Formation;
  /** 2e carte de la grille : titre en orange (maquette). */
  highlightTitle?: boolean;
  sessionEnrollmentCounts?: Record<string, number> | null;
  ratingsByFormationId?: Record<string, number> | null;
};

function resolveSectorLabel(formation: Formation, record: Record<string, unknown>): string {
  const categories = extractCategoriesFromFormation(record);
  const name = categories[0]?.name?.trim() || formation.secteur?.trim();
  if (!name) return "Formation CPU";
  if (/^secteur\b/i.test(name)) return name;
  return `Secteur ${name}`;
}

export function TrendingFormationCard({
  formation,
  highlightTitle = false,
  sessionEnrollmentCounts = null,
  ratingsByFormationId = null,
}: TrendingFormationCardProps) {
  const router = useRouter();
  const formationId = String(formation.id);
  const temoignageRating = ratingsByFormationId?.[formationId];

  const formationRecord = {
    ...formation,
    notesMoyenne:
      formation.notesMoyenne && formation.notesMoyenne > 0
        ? formation.notesMoyenne
        : temoignageRating ?? formation.notesMoyenne,
  } as unknown as Record<string, unknown>;

  const sectorLabel = resolveSectorLabel(formation, formationRecord);
  const niveau = resolveNiveauDisplayLabel(formation.niveau);
  const duree = Number(formation.duree ?? 0);
  const description =
    (formation.description || formation.resume || "").trim() ||
    "Formation professionnelle adaptée aux besoins des PME ivoiriennes.";

  const goToDetail = () => router.push(`/formations/${formation.slug}`);

  return (
    <article
      onClick={goToDetail}
      className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
        <FormationCardVisual
          formation={formation}
          fallbackImage={getModeFallbackImage(formation.format, formation.modalite)}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-3 flex min-h-7 items-center justify-between gap-2">
          <span className="inline-flex max-w-[58%] truncate rounded-full bg-orange-50 px-2.5 py-0.5 text-xs font-medium text-orange-700">
            {sectorLabel}
          </span>
          <span className="shrink-0 rounded-full bg-emerald-600 px-2.5 py-0.5 text-xs font-semibold text-white">
            {niveau}
          </span>
        </div>

        <h3
          className={`mb-2 line-clamp-2 min-h-[3.25rem] text-lg font-bold leading-snug ${
            highlightTitle ? "text-orange-600" : "text-slate-900"
          }`}
        >
          {formation.titre}
        </h3>

        <p className="mb-4 line-clamp-2 min-h-[2.5rem] text-sm leading-relaxed text-gray-600">
          {description}
        </p>

        <div className="mb-4 flex items-center justify-between gap-2 text-xs text-slate-500">
          <span className="inline-flex min-w-0 items-center gap-1">
            <Clock className="h-3.5 w-3.5 shrink-0 text-slate-400" aria-hidden />
            <span className="truncate">{formatFormationCardDuration(duree)}</span>
          </span>
          <span className="inline-flex items-center gap-1">
            <Users className="h-3.5 w-3.5 shrink-0 text-slate-400" aria-hidden />
            <span className="font-medium text-slate-600">
              {formatFormationCardStudentsLabel(formationRecord, sessionEnrollmentCounts ?? undefined)}
            </span>
          </span>
          <span className="inline-flex items-center gap-1">
            <Star className="h-3.5 w-3.5 shrink-0 fill-amber-400 text-amber-400" aria-hidden />
            <span className="font-semibold text-slate-700">
              {formatFormationCardRatingLabel(formationRecord)}
            </span>
          </span>
        </div>

        <Button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            goToDetail();
          }}
          className="mt-auto w-full cursor-pointer rounded-lg border-0 bg-orange-500 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-600"
        >
          Voir le détail
        </Button>
      </div>
    </article>
  );
}
