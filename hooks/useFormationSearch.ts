"use client";

import { useState, useCallback } from "react";
import type { FiltresRecherche, Formation } from "@/types";

export function useFormationSearch() {
  const [filtres, setFiltres] = useState<FiltresRecherche>({});
  const [resultats, setResultats] = useState<Formation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const rechercher = useCallback(async (nouveauxFiltres: FiltresRecherche) => {
    setLoading(true);
    setError(null);
    
    try {
      // TODO: Remplacer par appel API réel
      // const response = await fetch('/api/formations/search', {
      //   method: 'POST',
      //   body: JSON.stringify(nouveauxFiltres)
      // });
      // const data = await response.json();
      
      // Simulation temporaire
      await new Promise(resolve => setTimeout(resolve, 500));
      setResultats([]);
      setFiltres(nouveauxFiltres);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur de recherche");
    } finally {
      setLoading(false);
    }
  }, []);

  const reinitialiser = useCallback(() => {
    setFiltres({});
    setResultats([]);
    setError(null);
  }, []);

  const updateFiltre = useCallback((key: keyof FiltresRecherche, value: any) => {
    setFiltres(prev => ({ ...prev, [key]: value }));
  }, []);

  return {
    filtres,
    resultats,
    loading,
    error,
    rechercher,
    reinitialiser,
    updateFiltre,
  };
}

