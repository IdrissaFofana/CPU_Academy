"use client";

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, X, Target, MapPin, Building2, BarChart3, Monitor, Check } from "lucide-react";
import type { Niveau, Format } from "@/types";

type Option = { value: string; label: string };

interface FiltersProps {
  objectifOptions: Option[];
  regionOptions: string[];
  secteurOptions: string[];
  niveauOptions: Niveau[];
  formatOptions: Format[];
  objectif: string;
  setObjectif: (value: string) => void;
  region: string;
  setRegion: (value: string) => void;
  secteur: string;
  setSecteur: (value: string) => void;
  niveau: string;
  setNiveau: (value: string) => void;
  format: string;
  setFormat: (value: string) => void;
  gratuit: boolean | null;
  setGratuit: (value: boolean | null) => void;
  certifiant: boolean | null;
  setCertifiant: (value: boolean | null) => void;
  nombreFiltresActifs: number;
  reinitialiserFiltres: () => void;
  onClose?: () => void;
  isMobile?: boolean;
}

export function CatalogueFilters({
  objectifOptions,
  regionOptions,
  secteurOptions,
  niveauOptions,
  formatOptions,
  objectif,
  setObjectif,
  region,
  setRegion,
  secteur,
  setSecteur,
  niveau,
  setNiveau,
  format,
  setFormat,
  gratuit,
  setGratuit,
  certifiant,
  setCertifiant,
  nombreFiltresActifs,
  reinitialiserFiltres,
  onClose,
  isMobile = false
}: FiltersProps) {
  return (
    <div className="bg-white rounded-2xl p-6 border-2 border-slate-100 shadow-lg h-full overflow-y-auto">
      {/* Filter Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5 text-cpu-orange" />
          <h2 className="text-xl font-bold text-slate-900">Filtres</h2>
        </div>
        <div className="flex items-center gap-2">
          {nombreFiltresActifs > 0 && (
            <Badge className="bg-cpu-orange text-white">
              {nombreFiltresActifs}
            </Badge>
          )}
          {isMobile && onClose && (
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Fermer les filtres"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Objectif */}
      <div className="mb-6">
        <Label htmlFor={isMobile ? "objectif-mobile" : "objectif"} className="mb-3 block text-sm font-semibold text-slate-700 flex items-center gap-2">
          <Target className="w-4 h-4 text-cpu-orange" />
          Objectif métier
        </Label>
        <Select value={objectif} onValueChange={setObjectif}>
          <SelectTrigger id={isMobile ? "objectif-mobile" : "objectif"} className="h-11">
            <SelectValue placeholder="Tous les objectifs" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous</SelectItem>
            {objectifOptions.map((obj) => (
              <SelectItem key={obj.value} value={obj.value}>
                {obj.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Région */}
      <div className="mb-6">
        <Label htmlFor={isMobile ? "region-mobile" : "region"} className="mb-3 block text-sm font-semibold text-slate-700 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-cpu-orange" />
          Région
        </Label>
        <Select value={region} onValueChange={setRegion}>
          <SelectTrigger id={isMobile ? "region-mobile" : "region"} className="h-11">
            <SelectValue placeholder="Toutes les régions" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toutes</SelectItem>
            {regionOptions.map((reg) => (
              <SelectItem key={reg} value={reg}>
                {reg}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Secteur */}
      <div className="mb-6">
        <Label htmlFor={isMobile ? "secteur-mobile" : "secteur"} className="mb-3 block text-sm font-semibold text-slate-700 flex items-center gap-2">
          <Building2 className="w-4 h-4 text-cpu-orange" />
          Secteur
        </Label>
        <Select value={secteur} onValueChange={setSecteur}>
          <SelectTrigger id={isMobile ? "secteur-mobile" : "secteur"} className="h-11">
            <SelectValue placeholder="Tous les secteurs" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous</SelectItem>
            {secteurOptions.map((sect) => (
              <SelectItem key={sect} value={sect}>
                {sect}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Niveau */}
      <div className="mb-6">
        <Label htmlFor={isMobile ? "niveau-mobile" : "niveau"} className="mb-3 block text-sm font-semibold text-slate-700 flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-cpu-orange" />
          Niveau
        </Label>
        <Select value={niveau} onValueChange={setNiveau}>
          <SelectTrigger id={isMobile ? "niveau-mobile" : "niveau"} className="h-11">
            <SelectValue placeholder="Tous les niveaux" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous</SelectItem>
            {niveauOptions.map((niv) => (
              <SelectItem key={niv} value={niv}>
                {niv}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Format */}
      <div className="mb-6">
        <Label htmlFor={isMobile ? "format-mobile" : "format"} className="mb-3 block text-sm font-semibold text-slate-700 flex items-center gap-2">
          <Monitor className="w-4 h-4 text-cpu-orange" />
          Format
        </Label>
        <Select value={format} onValueChange={setFormat}>
          <SelectTrigger id={isMobile ? "format-mobile" : "format"} className="h-11">
            <SelectValue placeholder="Tous les formats" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous</SelectItem>
            {formatOptions.map((fmt) => (
              <SelectItem key={fmt} value={fmt}>
                {fmt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Options booléennes */}
      <div className="space-y-3 mb-6">
        <button
          onClick={() => setGratuit(gratuit === true ? null : true)}
          className={`cursor-pointer w-full p-3 rounded-xl border-2 transition-all duration-300 text-left ${
            gratuit === true
              ? 'border-cpu-orange bg-cpu-orange/10 text-cpu-orange'
              : 'border-slate-200 hover:border-cpu-orange/50'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-semibold">Formations gratuites</span>
            {gratuit === true && <Badge className="bg-cpu-orange text-white text-xs flex items-center gap-1"><Check className="w-3 h-3" /></Badge>}
          </div>
        </button>

        <button
          onClick={() => setCertifiant(certifiant === true ? null : true)}
          className={`cursor-pointer w-full p-3 rounded-xl border-2 transition-all duration-300 text-left ${
            certifiant === true
              ? 'border-cpu-orange bg-cpu-orange/10 text-cpu-orange'
              : 'border-slate-200 hover:border-cpu-orange/50'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="font-semibold">Formations certifiantes</span>
            {certifiant === true && <Badge className="bg-cpu-orange text-white text-xs flex items-center gap-1"><Check className="w-3 h-3" /></Badge>}
          </div>
        </button>
      </div>

      {/* Reset Button */}
      {nombreFiltresActifs > 0 && (
        <Button
          onClick={reinitialiserFiltres}
          variant="outline"
          className="w-full border-2 border-slate-300 hover:border-cpu-orange hover:bg-cpu-orange/10 hover:text-cpu-orange transition-all"
        >
          <X className="w-4 h-4 mr-2" />
          Réinitialiser les filtres
        </Button>
      )}

      {/* Apply Button (Mobile only) */}
      {isMobile && onClose && (
        <Button
          onClick={onClose}
          className="w-full mt-4 bg-cpu-orange hover:bg-cpu-orange/90 text-white"
        >
          Appliquer les filtres
        </Button>
      )}
    </div>
  );
}

