"use client";

import { useEffect, useState } from "react";
import { parcoursService } from "@/lib/api/services/parcours.service";
import { getFriendlyApiErrorMessage } from "@/lib/api/error-messages";

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
      const items = Array.isArray(response)
        ? response
        : Array.isArray(response?.data)
        ? response.data
        : Array.isArray((response as any)?.data?.data)
        ? (response as any)?.data?.data
        : [];
      setParcours(items);
    } catch (parcoursErr) {
      setParcours([]);
      setError(new Error(getFriendlyApiErrorMessage(parcoursErr, "default")));
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
