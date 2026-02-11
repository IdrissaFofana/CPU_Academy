import { useState, useEffect } from "react";

const FAVORITES_KEY = "cpu_catalogue_favorites";

/**
 * Hook pour gérer les formations favorites avec localStorage
 */
export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  // Charger les favoris au montage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_KEY);
      if (saved) {
        setFavorites(JSON.parse(saved));
      }
    } catch (error) {
      console.warn("Erreur lors du chargement des favoris:", error);
    }
  }, []);

  const toggleFavorite = (formationId: string) => {
    setFavorites((prev) => {
      const updated = prev.includes(formationId)
        ? prev.filter((id) => id !== formationId)
        : [...prev, formationId];

      try {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
      } catch (error) {
        console.warn("Erreur lors de la sauvegarde:", error);
      }

      return updated;
    });
  };

  const isFavorite = (formationId: string) => favorites.includes(formationId);

  return { favorites, toggleFavorite, isFavorite };
}

