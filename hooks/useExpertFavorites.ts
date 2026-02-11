"use client";

import { useState, useEffect } from "react";

const EXPERT_FAVORITES_KEY = "cpu_expert_favorites";

/**
 * Hook pour gérer les experts favoris avec localStorage
 */
export function useExpertFavorites() {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load favorites from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem(EXPERT_FAVORITES_KEY);
        if (stored) {
          setFavorites(JSON.parse(stored));
        }
      } catch (error) {
        console.error("Failed to parse favorites:", error);
        setFavorites([]);
      }
      setIsLoaded(true);
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    if (isLoaded && typeof window !== "undefined") {
      try {
        localStorage.setItem(EXPERT_FAVORITES_KEY, JSON.stringify(favorites));
      } catch (error) {
        console.error("Failed to save favorites:", error);
      }
    }
  }, [favorites, isLoaded]);

  const toggleFavorite = (expertId: number) => {
    setFavorites(prev => {
      if (prev.includes(expertId)) {
        return prev.filter(id => id !== expertId);
      } else {
        return [...prev, expertId];
      }
    });
  };

  const isFavorite = (expertId: number): boolean => {
    return favorites.includes(expertId);
  };

  const addFavorite = (expertId: number) => {
    if (!favorites.includes(expertId)) {
      setFavorites(prev => [...prev, expertId]);
    }
  };

  const removeFavorite = (expertId: number) => {
    setFavorites(prev => prev.filter(id => id !== expertId));
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    addFavorite,
    removeFavorite,
    clearFavorites,
    favoritesCount: favorites.length
  };
}

