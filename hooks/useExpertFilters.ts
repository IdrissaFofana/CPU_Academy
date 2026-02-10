"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";

export interface FilterState {
  search: string;
  specialties: string[];
  locations: string[];
  availableOnly: boolean;
  minRating: number;
  minExperience: number;
  maxExperience: number;
  sortBy: string;
}

interface Expert {
  id: number;
  nom: string;
  specialite: string;
  photo: string;
  localisation: string;
  disponible: boolean;
  rating: number;
  experience: string;
  formations: number;
  certifications: string[];
  domaines: string[];
  studentsCount?: number;
  reviewsCount?: number;
  bio?: string;
  tarif?: string;
  langues?: string[];
  prochaineDispo?: string;
  isTop?: boolean;
  isNew?: boolean;
  [key: string]: any;
}

const defaultFilters: FilterState = {
  search: "",
  specialties: [],
  locations: [],
  availableOnly: false,
  minRating: 0,
  minExperience: 0,
  maxExperience: 20,
  sortBy: "popular"
};

export function useExpertFilters(experts: Expert[]) {
  const router = useRouter();
  
  // Initialize filters with defaults
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  // Sync filters to URL
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (filters.search) params.set("search", filters.search);
    if (filters.specialties.length > 0) params.set("specialties", filters.specialties.join(","));
    if (filters.locations.length > 0) params.set("locations", filters.locations.join(","));
    if (filters.availableOnly) params.set("available", "true");
    if (filters.minRating > 0) params.set("rating", filters.minRating.toString());
    if (filters.minExperience > 0) params.set("minExp", filters.minExperience.toString());
    if (filters.maxExperience < 20) params.set("maxExp", filters.maxExperience.toString());
    if (filters.sortBy !== "popular") params.set("sort", filters.sortBy);
    
    const queryString = params.toString();
    const newUrl = queryString ? `/experts?${queryString}` : "/experts";
    
    router.replace(newUrl, { scroll: false });
  }, [filters, router]);

  // Update specific filters
  const updateFilters = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  // Get available filter options from experts
  const availableSpecialties = useMemo(() => {
    const specialties = new Set(experts.map(e => e.specialite));
    return Array.from(specialties).sort();
  }, [experts]);

  const availableLocations = useMemo(() => {
    const locations = new Set(
      experts.map(e => {
        // Extract city/zone from location (format: "Cocody, Abidjan")
        const parts = e.localisation.split(",");
        return parts[0].trim();
      })
    );
    return Array.from(locations).sort();
  }, [experts]);

  // Apply filters
  const filteredExperts = useMemo(() => {
    let result = [...experts];

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(expert =>
        expert.nom.toLowerCase().includes(searchLower) ||
        expert.specialite.toLowerCase().includes(searchLower)
      );
    }

    // Specialty filter
    if (filters.specialties.length > 0) {
      result = result.filter(expert =>
        filters.specialties.includes(expert.specialite)
      );
    }

    // Location filter
    if (filters.locations.length > 0) {
      result = result.filter(expert => {
        const expertLocation = expert.localisation.split(",")[0].trim();
        return filters.locations.includes(expertLocation);
      });
    }

    // Availability filter
    if (filters.availableOnly) {
      result = result.filter(expert => expert.disponible);
    }

    // Rating filter
    if (filters.minRating > 0) {
      result = result.filter(expert => expert.rating >= filters.minRating);
    }

    // Experience filter
    const experienceYears = (exp: string): number => {
      const match = exp.match(/(\d+)/);
      return match ? parseInt(match[0]) : 0;
    };

    result = result.filter(expert => {
      const years = experienceYears(expert.experience);
      return years >= filters.minExperience && years <= filters.maxExperience;
    });

    // Sort
    switch (filters.sortBy) {
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "experience":
        result.sort((a, b) => 
          experienceYears(b.experience) - experienceYears(a.experience)
        );
        break;
      case "formations":
        result.sort((a, b) => b.formations - a.formations);
        break;
      case "alpha":
        result.sort((a, b) => a.nom.localeCompare(b.nom));
        break;
      case "recent":
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case "popular":
      default:
        // Popular sort: combination of rating, formations, and students
        result.sort((a, b) => {
          const scoreA = (a.rating * 10) + (a.formations * 2) + ((a as any).studentsCount || 0) / 10;
          const scoreB = (b.rating * 10) + (b.formations * 2) + ((b as any).studentsCount || 0) / 10;
          return scoreB - scoreA;
        });
        break;
    }

    return result;
  }, [experts, filters]);

  return {
    filters,
    updateFilters,
    resetFilters,
    filteredExperts,
    resultsCount: filteredExperts.length,
    availableSpecialties,
    availableLocations
  };
}
