"use client";

import { useState, useEffect } from "react";

// ==================== useLocalStorage ====================
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isMounted, setIsMounted] = useState(false);

  // Initialize from localStorage only on client
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
    }
    setIsMounted(true);
  }, [key]);

  // Save to localStorage whenever value changes
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);

      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));

        // Dispatch custom event for cross-tab sync
        window.dispatchEvent(
          new CustomEvent("localStorage", {
            detail: { key, value: valueToStore }
          })
        );
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}

// ==================== useFavorites ====================
interface FavoritesData {
  parcours: string[];
  formations: string[];
  lastUpdated: string;
}

export function useFavorites() {
  const [favorites, setFavorites] = useLocalStorage<FavoritesData>("cpu_favorites", {
    parcours: [],
    formations: [],
    lastUpdated: new Date().toISOString()
  });

  const toggleParcoursFavorite = (id: string) => {
    setFavorites((prev) => {
      const isLiked = prev.parcours.includes(id);
      return {
        ...prev,
        parcours: isLiked
          ? prev.parcours.filter((fav) => fav !== id)
          : [...prev.parcours, id],
        lastUpdated: new Date().toISOString()
      };
    });
  };

  const toggleFormationFavorite = (id: string) => {
    setFavorites((prev) => {
      const isLiked = prev.formations.includes(id);
      return {
        ...prev,
        formations: isLiked
          ? prev.formations.filter((fav) => fav !== id)
          : [...prev.formations, id],
        lastUpdated: new Date().toISOString()
      };
    });
  };

  const isParcoursLiked = (id: string) => favorites.parcours.includes(id);
  const isFormationLiked = (id: string) => favorites.formations.includes(id);

  return {
    favorites,
    toggleParcoursFavorite,
    toggleFormationFavorite,
    isParcoursLiked,
    isFormationLiked,
    totalFavorites: favorites.parcours.length + favorites.formations.length
  };
}

// ==================== useViewMode ====================
export function useViewMode(defaultMode: "grid" | "list" | "compact" = "grid") {
  const [viewMode, setViewMode] = useLocalStorage<"grid" | "list" | "compact">(
    "cpu_view_mode",
    defaultMode
  );

  return [viewMode, setViewMode] as const;
}

// ==================== useTelemetry ====================
interface TelemetryEvent {
  type: "view_mode_change" | "favorite_toggle" | "card_click" | "card_impression";
  pageRoute: string;
  viewMode?: "grid" | "list" | "compact";
  timestamp: string;
  userId?: string;
  sessionId: string;
}

export function useTelemetry() {
  const [sessionId] = useLocalStorage<string>(
    "cpu_session_id",
    generateSessionId()
  );

  const trackEvent = (event: Omit<TelemetryEvent, "timestamp" | "sessionId">) => {
    const telemetryEvent: TelemetryEvent = {
      ...event,
      timestamp: new Date().toISOString(),
      sessionId
    };

    // Send to analytics endpoint
    if (typeof window !== "undefined") {
      // Use beacon API for reliability
      navigator.sendBeacon(
        "/api/telemetry",
        JSON.stringify(telemetryEvent)
      );
    }

    // Also log locally for debugging
    console.debug("[Telemetry]", telemetryEvent);
  };

  const trackViewModeChange = (newMode: "grid" | "list" | "compact", route: string) => {
    trackEvent({
      type: "view_mode_change",
      viewMode: newMode,
      pageRoute: route
    });
  };

  const trackFavoriteToggle = (id: string, route: string) => {
    trackEvent({
      type: "favorite_toggle",
      pageRoute: route
    });
  };

  const trackCardClick = (cardId: string, route: string) => {
    trackEvent({
      type: "card_click",
      pageRoute: route
    });
  };

  const trackCardImpression = (route: string, viewMode: "grid" | "list" | "compact") => {
    trackEvent({
      type: "card_impression",
      viewMode,
      pageRoute: route
    });
  };

  return {
    trackEvent,
    trackViewModeChange,
    trackFavoriteToggle,
    trackCardClick,
    trackCardImpression,
    sessionId
  };
}

// ==================== Helper Functions ====================
function generateSessionId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// ==================== useMediaQuery ====================
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);

    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
}

// ==================== usePrefersReducedMotion ====================
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}
