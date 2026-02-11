import { useEffect, useState } from "react";

/**
 * Hook pour débounce une valeur avec délai configurable
 * Utile pour éviter les re-rendus excessifs (recherche, filtres)
 * @param value - Valeur à débounce
 * @param delay - Délai en millisecondes (défaut: 300ms)
 * @returns Valeur débounce
 */
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Créer un timer
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Nettoyer le timer précédent si la valeur change
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

