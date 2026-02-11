import { useEffect, useState } from "react";

const SEARCH_HISTORY_KEY = "cpu_catalogue_search_history";
const MAX_HISTORY_ITEMS = 10;

/**
 * Hook pour gérer l'historique des recherches avec localStorage
 * @returns {object} - { history, addSearch, clearHistory }
 */
export function useSearchHistory() {
  const [history, setHistory] = useState<string[]>([]);

  // Charger l'historique au montage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(SEARCH_HISTORY_KEY);
      if (saved) {
        setHistory(JSON.parse(saved));
      }
    } catch (error) {
      console.warn("Erreur lors du chargement de l'historique:", error);
    }
  }, []);

  const addSearch = (query: string) => {
    if (!query.trim()) return;

    setHistory((prev) => {
      // Supprimer le doublon s'il existe
      const filtered = prev.filter((item) => item !== query);
      
      // Ajouter au début et limiter à MAX_HISTORY_ITEMS
      const updated = [query, ...filtered].slice(0, MAX_HISTORY_ITEMS);
      
      // Sauvegarder dans localStorage
      try {
        localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updated));
      } catch (error) {
        console.warn("Erreur lors de la sauvegarde:", error);
      }
      
      return updated;
    });
  };

  const clearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem(SEARCH_HISTORY_KEY);
    } catch (error) {
      console.warn("Erreur lors de la suppression:", error);
    }
  };

  return { history, addSearch, clearHistory };
}

