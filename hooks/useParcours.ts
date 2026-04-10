"use client";

import { useEffect, useState } from "react";
import { parcoursService } from "@/lib/api/services/parcours.service";
import { formationService } from "@/lib/api/services/formation.service";
import { getFriendlyApiErrorMessage } from "@/lib/api/error-messages";

function buildParcoursFallbackFromFormations(rawFormations: any[]): any[] {
  const grouped = new Map<string, any[]>();

  for (const formation of rawFormations) {
    const category =
      formation?.category ||
      formation?.secteur ||
      formation?.category?.name ||
      "Parcours Général";

    const key = String(category);
    if (!grouped.has(key)) {
      grouped.set(key, []);
    }
    grouped.get(key)!.push(formation);
  }

  return Array.from(grouped.entries()).map(([name, formations], index) => ({
    id: `fallback-${index}-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    nom: name,
    description: `Parcours dynamique généré à partir des formations de la catégorie ${name}.`,
    formations,
    created_at: new Date().toISOString(),
  }));
}

export function useParcours(autoFetch = true) {
  const [parcours, setParcours] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(autoFetch);
  const [hasFetched, setHasFetched] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchParcours = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await parcoursService.getPublic();
      const items = Array.isArray(response?.data)
        ? response.data
        : Array.isArray((response as any)?.data?.data)
        ? (response as any).data.data
        : [];
      setParcours(items);
    } catch (parcoursErr) {
      // Fallback: derive parcours from public formations when parcours endpoint is unavailable.
      try {
        const formationsResponse = await formationService.getPublic();
        const raw = formationsResponse as any;
        const formations = Array.isArray(raw?.data)
          ? raw.data
          : Array.isArray(raw?.data?.data)
          ? raw.data.data
          : [];

        const fallbackParcours = buildParcoursFallbackFromFormations(formations);
        setParcours(fallbackParcours);
        setError(null);
      } catch (fallbackErr) {
        setError(new Error(getFriendlyApiErrorMessage(fallbackErr || parcoursErr, "default")));
      }
    } finally {
      setIsLoading(false);
      setHasFetched(true);
    }
  };

  useEffect(() => {
    if (autoFetch) {
      fetchParcours();
    }
  }, [autoFetch]);

  return {
    parcours,
    isLoading,
    hasFetched,
    error,
    refetch: fetchParcours,
  };
}
