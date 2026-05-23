"use client";

import { Award, Grid3x3, List, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

export type CatalogueQuickTab = "all" | "popular" | "certifiant";

type ViewMode = "grid" | "list" | "compact";

interface CatalogueListingToolbarProps {
  quickTab: CatalogueQuickTab;
  onQuickTabChange: (tab: CatalogueQuickTab) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  showCompactView?: boolean;
}

const QUICK_TABS: Array<{
  id: CatalogueQuickTab;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
}> = [
  { id: "all", label: "Toutes les formations" },
  { id: "popular", label: "Populaires", icon: TrendingUp },
  { id: "certifiant", label: "Certifiantes", icon: Award },
];

export function CatalogueListingToolbar({
  quickTab,
  onQuickTabChange,
  viewMode,
  onViewModeChange,
  showCompactView = false,
}: CatalogueListingToolbarProps) {
  return (
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-2">
        {QUICK_TABS.map((tab) => {
          const isActive = quickTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onQuickTabChange(tab.id)}
              className={cn(
                "inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all",
                isActive
                  ? "bg-cpu-orange text-white shadow-md shadow-orange-500/20"
                  : "text-slate-600 hover:bg-slate-100",
              )}
            >
              {Icon && <Icon className={cn("h-4 w-4", isActive ? "text-white" : "text-slate-500")} />}
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-2 self-end sm:self-auto">
        <button
          type="button"
          onClick={() => onViewModeChange("grid")}
          aria-label="Vue grille"
          aria-pressed={viewMode === "grid"}
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-lg border-2 transition-all",
            viewMode === "grid"
              ? "border-cpu-orange bg-cpu-orange text-white"
              : "border-slate-200 bg-white text-slate-500 hover:border-slate-300",
          )}
        >
          <Grid3x3 className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => onViewModeChange("list")}
          aria-label="Vue liste"
          aria-pressed={viewMode === "list"}
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-lg border-2 transition-all",
            viewMode === "list"
              ? "border-cpu-orange bg-cpu-orange text-white"
              : "border-slate-200 bg-white text-slate-500 hover:border-slate-300",
          )}
        >
          <List className="h-4 w-4" />
        </button>
        {showCompactView && (
          <button
            type="button"
            onClick={() => onViewModeChange("compact")}
            aria-label="Vue compacte"
            aria-pressed={viewMode === "compact"}
            className={cn(
              "hidden h-10 w-10 items-center justify-center rounded-lg border-2 transition-all md:flex",
              viewMode === "compact"
                ? "border-cpu-orange bg-cpu-orange text-white"
                : "border-slate-200 bg-white text-slate-500 hover:border-slate-300",
            )}
          >
            <Grid3x3 className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
