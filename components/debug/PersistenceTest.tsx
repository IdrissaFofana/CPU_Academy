"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useFavorites, useViewMode } from "@/hooks/useStorage";

export function PersistenceTest() {
  const { favorites, toggleParcoursFavorite } = useFavorites();
  const [viewMode, setViewMode] = useViewMode();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-20 right-4 z-50 bg-slate-900 text-white p-4 rounded-lg text-xs max-w-sm shadow-lg max-h-96 overflow-y-auto">
      <h3 className="font-bold mb-3">📊 Persistence Test</h3>
      
      {/* View Mode */}
      <div className="mb-4 pb-4 border-b border-slate-700">
        <p className="text-slate-300 mb-2">View Mode: <span className="font-mono text-cpu-orange">{viewMode}</span></p>
        <div className="flex gap-2 flex-wrap">
          {["grid", "list", "compact"].map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode as "grid" | "list" | "compact")}
              className={`px-2 py-1 rounded text-xs ${
                viewMode === mode
                  ? "bg-cpu-orange text-white"
                  : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Favorites */}
      <div>
        <p className="text-slate-300 mb-2">
          Favorites: <span className="font-mono text-cpu-orange">{favorites.parcours.length}</span>
        </p>
        {favorites.parcours.length > 0 ? (
          <div className="space-y-1 mb-3 max-h-40 overflow-y-auto">
            {favorites.parcours.map((id) => (
              <div key={id} className="flex items-center justify-between bg-slate-800 p-2 rounded text-xs">
                <span className="font-mono truncate">{id}</span>
                <button
                  onClick={() => toggleParcoursFavorite(id)}
                  className="text-xs hover:text-red-400"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-500 text-xs mb-3">No favorites saved</p>
        )}

        <button
          onClick={() => toggleParcoursFavorite("parcours-test-1")}
          className="w-full px-2 py-1 bg-cpu-green hover:bg-green-600 text-white rounded text-xs"
        >
          + Add Test Favorite
        </button>
      </div>
    </div>
  );
}
