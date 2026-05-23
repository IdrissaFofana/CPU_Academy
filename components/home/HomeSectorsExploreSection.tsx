"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useFormations } from "@/hooks/useFormations";
import { filterVisiblePublicFormations } from "@/lib/formation/publicCatalogFilter";
import {
  buildCategoriesFromFormations,
  type FormationCategoryRef,
} from "@/lib/formation/extractFormationCategories";
import { cn } from "@/lib/utils";

/** Ordre d’affichage aligné sur la maquette accueil */
const PREFERRED_SECTOR_ORDER = [
  "Numérique",
  "Industrie",
  "Artisanat",
  "Services",
  "Transport",
  "Commerce",
  "BTP",
  "Agriculture",
] as const;

const FALLBACK_SECTORS: FormationCategoryRef[] = PREFERRED_SECTOR_ORDER.map((name) => ({
  id: name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, ""),
  name,
}));

function normalizeKey(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function mergeSectors(apiCategories: FormationCategoryRef[]): FormationCategoryRef[] {
  const byKey = new Map<string, FormationCategoryRef>();

  for (const sector of [...FALLBACK_SECTORS, ...apiCategories]) {
    const key = normalizeKey(sector.name);
    if (!key || byKey.has(key)) continue;
    byKey.set(key, sector);
  }

  const ordered: FormationCategoryRef[] = [];
  for (const label of PREFERRED_SECTOR_ORDER) {
    const match = byKey.get(normalizeKey(label));
    if (match) {
      ordered.push(match);
      byKey.delete(normalizeKey(label));
    }
  }

  const rest = Array.from(byKey.values()).sort((a, b) =>
    a.name.localeCompare(b.name, "fr"),
  );
  return [...ordered, ...rest];
}

export function HomeSectorsExploreSection() {
  const { formations, isLoading } = useFormations({ limit: 500 });

  const sectors = useMemo(() => {
    const visible = filterVisiblePublicFormations(formations as unknown[]);
    const fromApi = buildCategoriesFromFormations(visible);
    return mergeSectors(fromApi);
  }, [formations]);

  return (
    <section
      id="secteurs"
      className="border-t border-slate-100 bg-white py-12 md:py-16"
      aria-labelledby="home-sectors-title"
    >
      <div className="container mx-auto max-w-7xl px-6 lg:px-16">
        <h2
          id="home-sectors-title"
          className="mb-8 text-center text-2xl font-bold text-slate-900 sm:mb-10 sm:text-3xl"
        >
          Explorez par secteur d&apos;activité
        </h2>

        {isLoading && sectors.length === 0 ? (
          <div className="flex flex-wrap items-center justify-center gap-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="h-10 w-28 animate-pulse rounded-full bg-slate-100"
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {sectors.map((sector) => (
              <Link
                key={sector.id}
                href={`/catalogue?category=${encodeURIComponent(sector.id)}`}
                className={cn(
                  "inline-flex items-center justify-center rounded-full border px-5 py-2.5 text-sm font-medium no-underline",
                  "border-slate-200 bg-white text-slate-800 transition-colors duration-200",
                  "hover:border-[#F17425] hover:bg-[#F17425] hover:text-white hover:shadow-sm",
                  "active:border-[#F17425] active:bg-[#F17425] active:text-white",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F17425] focus-visible:ring-offset-2",
                )}
              >
                {sector.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
