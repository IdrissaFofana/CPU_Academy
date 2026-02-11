"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Search,
  X,
  MapPin,
  Star,
  Clock,
  CheckCircle2,
  Filter
} from "lucide-react";

interface FilterState {
  search: string;
  specialties: string[];
  locations: string[];
  availableOnly: boolean;
  minRating: number;
  minExperience: number;
  maxExperience: number;
  sortBy: string;
}

interface ExpertFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: Partial<FilterState>) => void;
  onReset: () => void;
  resultsCount: number;
  availableSpecialties: string[];
  availableLocations: string[];
}

export function ExpertFilters({
  filters,
  onFiltersChange,
  onReset,
  resultsCount,
  availableSpecialties,
  availableLocations
}: ExpertFiltersProps) {
  const activeFiltersCount = 
    (filters.search ? 1 : 0) +
    filters.specialties.length +
    filters.locations.length +
    (filters.availableOnly ? 1 : 0) +
    (filters.minRating > 0 ? 1 : 0) +
    (filters.minExperience > 0 || filters.maxExperience < 20 ? 1 : 0);

  const toggleSpecialty = (specialty: string) => {
    const newSpecialties = filters.specialties.includes(specialty)
      ? filters.specialties.filter(s => s !== specialty)
      : [...filters.specialties, specialty];
    onFiltersChange({ specialties: newSpecialties });
  };

  const toggleLocation = (location: string) => {
    const newLocations = filters.locations.includes(location)
      ? filters.locations.filter(l => l !== location)
      : [...filters.locations, location];
    onFiltersChange({ locations: newLocations });
  };

  return (
    <Card className="p-6 border-2 sticky top-24 overflow-y-auto max-h-[calc(100vh-7rem)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-cpu-orange" />
          <h3 className="font-bold text-lg">Filtres</h3>
          {activeFiltersCount > 0 && (
            <Badge className="bg-cpu-orange">{activeFiltersCount}</Badge>
          )}
        </div>
        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="text-gray-600 hover:text-cpu-orange"
          >
            <X className="w-4 h-4 mr-1" />
            Réinitialiser
          </Button>
        )}
      </div>

      {/* Results count */}
      <div className="mb-6 p-3 bg-orange-50 rounded-lg border border-orange-100">
        <p className="text-sm text-center">
          <span className="font-bold text-cpu-orange">{resultsCount}</span>{" "}
          {resultsCount > 1 ? "experts trouvés" : "expert trouvé"}
        </p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <Label htmlFor="search" className="text-sm font-semibold mb-2 flex items-center gap-2">
          <Search className="w-4 h-4" />
          Rechercher
        </Label>
        <div className="relative">
          <Input
            id="search"
            type="text"
            placeholder="Nom ou spécialité..."
            value={filters.search}
            onChange={(e) => onFiltersChange({ search: e.target.value })}
            className="pr-8"
          />
          {filters.search && (
            <button
              onClick={() => onFiltersChange({ search: "" })}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Specialties */}
      <div className="mb-6">
        <Label className="text-sm font-semibold mb-3 block">Spécialités</Label>
        <div className="space-y-2">
          {availableSpecialties.map((specialty) => (
            <label
              key={specialty}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                filters.specialties.includes(specialty)
                  ? "bg-cpu-orange border-cpu-orange"
                  : "border-gray-300 group-hover:border-cpu-orange"
              }`}>
                {filters.specialties.includes(specialty) && (
                  <CheckCircle2 className="w-4 h-4 text-white" />
                )}
              </div>
              <span className="text-sm text-gray-700 group-hover:text-cpu-orange">
                {specialty}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Locations */}
      <div className="mb-6">
        <Label className="text-sm font-semibold mb-3 flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          Localisation
        </Label>
        <div className="space-y-2">
          {availableLocations.map((location) => (
            <label
              key={location}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                filters.locations.includes(location)
                  ? "bg-cpu-orange border-cpu-orange"
                  : "border-gray-300 group-hover:border-cpu-orange"
              }`}>
                {filters.locations.includes(location) && (
                  <CheckCircle2 className="w-4 h-4 text-white" />
                )}
              </div>
              <span className="text-sm text-gray-700 group-hover:text-cpu-orange">
                {location}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div className="mb-6">
        <label className="flex items-center gap-3 cursor-pointer group">
          <div className={`w-12 h-6 rounded-full transition-colors relative ${
            filters.availableOnly ? "bg-cpu-green" : "bg-gray-300"
          }`}>
            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
              filters.availableOnly ? "translate-x-7" : "translate-x-1"
            }`} />
          </div>
          <span className="text-sm font-semibold text-gray-700 group-hover:text-cpu-orange">
            Disponible maintenant
          </span>
        </label>
      </div>

      {/* Rating */}
      <div className="mb-6">
        <Label className="text-sm font-semibold mb-3 flex items-center gap-2">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          Note minimale
        </Label>
        <div className="space-y-3">
          <input
            type="range"
            min="0"
            max="5"
            step="0.5"
            value={filters.minRating}
            onChange={(e) => onFiltersChange({ minRating: parseFloat(e.target.value) })}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-cpu-orange"
          />
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 flex items-center gap-1">
              {filters.minRating === 0 ? "Toutes" : `${filters.minRating}+`}
              <Star className="w-4 h-4 fill-current text-amber-500" />
            </span>
            {filters.minRating > 0 && (
              <button
                onClick={() => onFiltersChange({ minRating: 0 })}
                className="text-xs text-cpu-orange hover:underline"
              >
                Effacer
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Experience */}
      <div className="mb-6">
        <Label className="text-sm font-semibold mb-3 flex items-center gap-2">
          <Clock className="w-4 h-4" />
          Années d'expérience
        </Label>
        <div className="space-y-3">
          <div className="flex gap-2">
            <Input
              type="number"
              min="0"
              max="20"
              value={filters.minExperience}
              onChange={(e) => onFiltersChange({ minExperience: parseInt(e.target.value) || 0 })}
              placeholder="Min"
              className="w-full"
            />
            <Input
              type="number"
              min="0"
              max="20"
              value={filters.maxExperience}
              onChange={(e) => onFiltersChange({ maxExperience: parseInt(e.target.value) || 20 })}
              placeholder="Max"
              className="w-full"
            />
          </div>
          <p className="text-xs text-gray-600 text-center">
            {filters.minExperience === 0 && filters.maxExperience === 20
              ? "Toutes expériences"
              : `${filters.minExperience} - ${filters.maxExperience} ans`}
          </p>
        </div>
      </div>

      {/* Sort */}
      <div className="mb-4">
        <Label htmlFor="sort" className="text-sm font-semibold mb-2 block">
          Trier par
        </Label>
        <select
          id="sort"
          value={filters.sortBy}
          onChange={(e) => onFiltersChange({ sortBy: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cpu-orange"
        >
          <option value="popular">Plus populaires</option>
          <option value="rating">Mieux notés</option>
          <option value="experience">Plus expérimentés</option>
          <option value="formations">Plus de formations</option>
          <option value="alpha">Ordre alphabétique</option>
          <option value="recent">Nouveaux arrivants</option>
        </select>
      </div>

      {/* Active filters summary */}
      {activeFiltersCount > 0 && (
        <div className="pt-4 border-t border-gray-200">
          <p className="text-xs font-semibold text-gray-700 mb-2">Filtres actifs</p>
          <div className="flex flex-wrap gap-2">
            {filters.search && (
              <Badge variant="secondary" className="text-xs">
                "{filters.search}"
                <button
                  onClick={() => onFiltersChange({ search: "" })}
                  className="ml-1"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}
            {filters.specialties.map((specialty) => (
              <Badge key={specialty} variant="secondary" className="text-xs">
                {specialty}
                <button
                  onClick={() => toggleSpecialty(specialty)}
                  className="ml-1"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
            {filters.locations.map((location) => (
              <Badge key={location} variant="secondary" className="text-xs">
                {location}
                <button
                  onClick={() => toggleLocation(location)}
                  className="ml-1"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
            {filters.availableOnly && (
              <Badge variant="secondary" className="text-xs">
                Disponible
                <button
                  onClick={() => onFiltersChange({ availableOnly: false })}
                  className="ml-1"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            )}
          </div>
        </div>
      )}
    </Card>
  );
}

