"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CardImage, AvatarImage } from "@/components/ui/LazyImage";
import {
  Clock,
  Users,
  Award,
  ChevronRight,
  Star,
  Heart,
  Zap,
  TrendingUp,
  Share2,
  Menu,
  LayoutGrid,
  List
} from "lucide-react";
import type { Parcours } from "@/types";

interface ParcoursCardOptimizedProps {
  parcours: Parcours;
  variant?: "grid" | "list" | "compact";
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
  isNew?: boolean;
  onInscription?: (id: string) => void;
}

// ==================== GRID VIEW (DÉFAUT) ====================
function ParcoursCardGrid({
  parcours,
  isFavorite,
  onToggleFavorite,
  isNew,
  onInscription
}: Omit<ParcoursCardOptimizedProps, "variant">) {
  return (
    <Link href={`/parcours/${parcours.id}`} className="block h-full">
      <Card className="group relative overflow-hidden bg-white h-full shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 border-0">
        {/* CONTAINER PRINCIPAL */}
        <div className="relative h-full flex flex-col">
          {/* ═══════════════════════════════════════════ */}
          {/* SECTION 1: IMAGE (43% = 180px sur 420px)   */}
          {/* ═══════════════════════════════════════════ */}
          <div className="relative h-[180px] overflow-hidden bg-slate-100">
            {/* Colored overlay */}
            <div
              className={`absolute inset-0 ${
                parcours.gradient?.includes('blue') ? 'bg-blue-600' :
                parcours.gradient?.includes('green') ? 'bg-green-600' :
                parcours.gradient?.includes('purple') ? 'bg-purple-600' :
                parcours.gradient?.includes('red') ? 'bg-red-600' :
                'bg-cpu-orange'
              } opacity-90 group-hover:opacity-100 transition-all duration-500`}
            />

            {/* Image avec zoom au hover */}
            {parcours.image && (
              <div className="absolute inset-0 group-hover:scale-110 transition-transform duration-700 mix-blend-overlay">
                <CardImage
                  src={parcours.image}
                  alt={parcours.titre}
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            )}

            {/* Progress bar si commencé */}
            {parcours.tauxCompletion && parcours.tauxCompletion > 0 && (
              <div className="absolute top-0 left-0 right-0 h-1 bg-white/20">
                <div
                  className="h-full bg-cpu-orange transition-all duration-300"
                  style={{ width: `${parcours.tauxCompletion}%` }}
                />
              </div>
            )}

            {/* FLOATING BADGES (Top Left) */}
            <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
              {/* Bestseller Badge */}
              {parcours.nbInscrits && parcours.nbInscrits > 1000 && (
                <Badge className="bg-cpu-orange/90 backdrop-blur-sm text-white border-0 shadow-lg hover:scale-110 transition-transform flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  Bestseller
                </Badge>
              )}

              {/* Top Rated Badge */}
              {parcours.notesMoyenne && parcours.notesMoyenne >= 4.7 && (
                <Badge className="bg-yellow-500/90 backdrop-blur-sm text-white border-0 shadow-lg hover:scale-110 transition-transform flex items-center gap-1">
                  <Star className="w-3 h-3 fill-white" />
                  Top Rated
                </Badge>
              )}

              {/* Nouveau Badge */}
              {isNew && (
                <Badge className="bg-cpu-green/90 backdrop-blur-sm text-white border-0 shadow-lg animate-pulse flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  Nouveau
                </Badge>
              )}
            </div>

            {/* Favori Heart - Top Right */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onToggleFavorite?.(parcours.id);
              }}
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/95 backdrop-blur-sm shadow-lg hover:scale-110 transition-transform flex items-center justify-center z-10"
              aria-label={
                isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"
              }
            >
              <Heart
                className={`w-5 h-5 transition-colors ${
                  isFavorite
                    ? "fill-cpu-orange text-cpu-orange"
                    : "text-slate-400 hover:text-cpu-orange"
                }`}
              />
            </button>

            {/* TITRE OVERLAY (Bottom of image) */}
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-black/60 backdrop-blur-sm">
              <h3 className="text-base font-bold text-white line-clamp-2 group-hover:translate-x-1 transition-transform">
                {parcours.titre}
              </h3>
            </div>
          </div>

          {/* ═════════════════════════════════════════════ */}
          {/* SECTION 2: CONTENT (57% = 240px)           */}
          {/* ═════════════════════════════════════════════ */}
          <div className="flex-1 p-3 flex flex-col justify-between gap-2">
            {/* INSTRUCTEUR & NIVEAU */}
            <div className="flex items-start gap-2">
              <div className="flex-1 min-w-0">
                <p className="text-xs text-slate-500 font-medium truncate">
                  {parcours.instructeur?.nom || "Expert CPU"}
                </p>
                <div className="text-xs">
                  <Badge className="bg-blue-100 text-blue-700 border-0 px-1.5 py-0 text-xs">
                    {parcours.niveau}
                  </Badge>
                </div>
              </div>
            </div>

            {/* RATING + NOMBRE D'AVIS */}
            <div className="flex items-center gap-1.5 text-xs">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < Math.floor(parcours.notesMoyenne || 0)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-slate-300"
                    }`}
                  />
                ))}
              </div>
              <span className="font-semibold text-slate-900">
                {parcours.notesMoyenne || 0}/5
              </span>
              <span className="text-slate-500">({parcours.nbAvis || 0})</span>
            </div>

            {/* QUICK STATS (2 colonnes) */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-1 text-slate-600">
                <Clock className="w-3.5 h-3.5 text-cpu-orange flex-shrink-0" />
                <span className="font-semibold">{parcours.dureeTotal}h</span>
              </div>
              <div className="flex items-center gap-1 text-slate-600">
                <Users className="w-3.5 h-3.5 text-cpu-green flex-shrink-0" />
                <span className="font-semibold">
                  {(parcours.nbInscrits || 0).toLocaleString()}
                </span>
              </div>
            </div>

            {/* BENEFITS (1 line) */}
            <div className="flex items-center gap-1 text-xs text-slate-600 line-clamp-1">
              {parcours.certifiant && (
                <>
                  <Award className="w-3.5 h-3.5 text-yellow-500 flex-shrink-0" />
                  <span>Certificat</span>
                  <span>·</span>
                </>
              )}
              <Badge className="bg-blue-50 text-blue-700 border-0 px-1 py-0 text-xs inline">
                {parcours.format || "Hybride"}
              </Badge>
            </div>

            {/* PRIX + MOMENTUM */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex-1">
                {parcours.gratuit ? (
                  <div className="text-base font-bold text-cpu-green">
                    Gratuit
                  </div>
                ) : (
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg font-bold text-cpu-orange">
                      {parcours.prixMembre?.toLocaleString() || "N/A"}
                    </span>
                    <span className="text-xs text-slate-500">FCFA</span>
                  </div>
                )}
              </div>

              {/* Momentum Badge */}
              {parcours.nbInscritsMonth && parcours.nbInscritsMonth > 0 && (
                <div className="flex items-center gap-1 text-xs text-cpu-green font-semibold bg-cpu-green/10 px-2 py-1 rounded">
                  <TrendingUp className="w-3 h-3" />
                  +{parcours.nbInscritsMonth}
                </div>
              )}
            </div>

            {/* CTA BUTTONS */}
            <div className="flex gap-2 pt-1">
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onInscription?.(parcours.id);
                }}
                className="flex-1 bg-cpu-orange hover:bg-cpu-orange/90 text-white text-sm h-9 font-semibold shadow-md hover:shadow-lg transition-all"
              >
                Inscrire
                <ChevronRight className="w-3.5 h-3.5 ml-1" />
              </Button>

              <Button
                variant="outline"
                className="px-3 h-9 border-slate-200 hover:bg-slate-50"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                title="Partager ce parcours"
              >
                <Share2 className="w-4 h-4 text-slate-600" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}

// ==================== LIST VIEW ====================
function ParcoursCardList({
  parcours,
  isFavorite,
  onToggleFavorite,
  isNew,
  onInscription
}: Omit<ParcoursCardOptimizedProps, "variant">) {
  return (
    <Link href={`/parcours/${parcours.id}`} className="block">
      <Card className="group relative overflow-hidden bg-white shadow-md hover:shadow-lg transition-all border-0">
        <div className="flex items-center gap-4 p-4">
          {/* IMAGE MINI */}
          <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
            <div
              className={`absolute inset-0 bg-gradient-to-br ${
                parcours.gradient || "from-blue-600 to-blue-800"
              } opacity-90`}
            />
            {parcours.image && (
              <CardImage
                src={parcours.image}
                alt={parcours.titre}
                className="absolute inset-0 w-full h-full"
              />
            )}
            {isNew && (
              <div className="absolute top-1 right-1">
                <Badge className="bg-cpu-green text-white border-0 text-xs">
                  <Zap className="w-2.5 h-2.5 mr-0.5" />
                  Nouveau
                </Badge>
              </div>
            )}
          </div>

          {/* INFOS PRINCIPALE */}
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-slate-900 line-clamp-2 text-sm mb-1">
              {parcours.titre}
            </h3>
            <p className="text-xs text-slate-600 mb-2">
              {parcours.instructeur?.nom || "Expert CPU"} · {parcours.niveau}
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-600 mb-2">
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">
                  {parcours.notesMoyenne || 0}/5
                </span>
                <span className="text-slate-500">({parcours.nbAvis || 0})</span>
              </div>
              <span>·</span>
              <span className="font-semibold">{parcours.dureeTotal}h</span>
              <span>·</span>
              <span className="font-semibold">
                {(parcours.nbInscrits || 0).toLocaleString()} inscrits
              </span>
            </div>
          </div>

          {/* PRIX + CTA COLONNE DROITE */}
          <div className="flex-shrink-0 flex flex-col items-end gap-2">
            <div className="text-right">
              {parcours.gratuit ? (
                <div className="text-base font-bold text-cpu-green">Gratuit</div>
              ) : (
                <div className="text-lg font-bold text-cpu-orange">
                  {parcours.prixMembre?.toLocaleString() || "N/A"} FCFA
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <Button
                size="sm"
                className="bg-cpu-orange hover:bg-cpu-orange/90 text-white h-8 text-xs"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onInscription?.(parcours.id);
                }}
              >
                Inscrire
              </Button>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onToggleFavorite?.(parcours.id);
                }}
                className="p-2 rounded hover:bg-slate-100"
              >
                <Heart
                  className={`w-4 h-4 ${
                    isFavorite
                      ? "fill-cpu-orange text-cpu-orange"
                      : "text-slate-400 hover:text-cpu-orange"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}

// ==================== COMPACT VIEW ====================
function ParcoursCardCompact({
  parcours,
  isFavorite,
  onToggleFavorite,
  isNew,
  onInscription
}: Omit<ParcoursCardOptimizedProps, "variant">) {
  return (
    <Link href={`/parcours/${parcours.id}`} className="block">
      <Card className="group relative overflow-hidden bg-white shadow-sm hover:shadow-md transition-all border-0">
        <div className="flex items-center gap-3 p-3">
          {/* IMAGE INLINE */}
          <div className="relative w-16 h-16 flex-shrink-0 rounded overflow-hidden bg-slate-100">
            <div
              className={`absolute inset-0 bg-gradient-to-br ${
                parcours.gradient || "from-blue-600 to-blue-800"
              } opacity-90`}
            />
            {parcours.image && (
              <CardImage
                src={parcours.image}
                alt={parcours.titre}
                className="w-full h-full"
              />
            )}
          </div>

          {/* INFOS INLINE */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-slate-900 line-clamp-1 text-sm">
              {parcours.titre}
            </h3>
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <span className="font-semibold">
                {parcours.notesMoyenne || 0}★
              </span>
              <span>{parcours.dureeTotal}h</span>
              <span>{parcours.niveau}</span>
            </div>
          </div>

          {/* PRIX SMALL */}
          <div className="flex-shrink-0 text-right">
            {parcours.gratuit ? (
              <div className="text-xs font-bold text-cpu-green">Gratuit</div>
            ) : (
              <div className="text-sm font-bold text-cpu-orange">
                {parcours.prixMembre
                  ? `${(parcours.prixMembre / 1000).toFixed(0)}k`
                  : "N/A"}
              </div>
            )}
          </div>

          {/* MINI CTA */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleFavorite?.(parcours.id);
            }}
            className="p-2 -mr-2 -my-2"
          >
            <Heart
              className={`w-4 h-4 ${
                isFavorite
                  ? "fill-cpu-orange text-cpu-orange"
                  : "text-slate-300 hover:text-cpu-orange"
              }`}
            />
          </button>
        </div>
      </Card>
    </Link>
  );
}

// ==================== MAIN EXPORT ====================
export function ParcoursCardOptimized({
  variant = "grid",
  ...props
}: ParcoursCardOptimizedProps) {
  switch (variant) {
    case "list":
      return <ParcoursCardList {...props} />;
    case "compact":
      return <ParcoursCardCompact {...props} />;
    default:
      return <ParcoursCardGrid {...props} />;
  }
}

// ==================== VIEW MODE TOGGLE COMPONENT ====================
export function ViewModeToggle({
  viewMode,
  onViewModeChange
}: {
  viewMode: "grid" | "list" | "compact";
  onViewModeChange: (mode: "grid" | "list" | "compact") => void;
}) {
  return (
    <div className="flex items-center gap-2 bg-slate-100 rounded-lg p-1">
      <button
        onClick={() => onViewModeChange("grid")}
        className={`px-3 py-2 rounded transition-all flex items-center gap-1 ${
          viewMode === "grid"
            ? "bg-cpu-orange text-white shadow-md"
            : "text-slate-600 hover:text-slate-900"
        }`}
        title="Vue grille"
      >
        <LayoutGrid className="w-4 h-4" />
        <span className="text-xs hidden sm:inline">Grille</span>
      </button>

      <button
        onClick={() => onViewModeChange("list")}
        className={`px-3 py-2 rounded transition-all flex items-center gap-1 ${
          viewMode === "list"
            ? "bg-cpu-orange text-white shadow-md"
            : "text-slate-600 hover:text-slate-900"
        }`}
        title="Vue liste"
      >
        <List className="w-4 h-4" />
        <span className="text-xs hidden sm:inline">Liste</span>
      </button>

      <button
        onClick={() => onViewModeChange("compact")}
        className={`px-3 py-2 rounded transition-all flex items-center gap-1 ${
          viewMode === "compact"
            ? "bg-cpu-orange text-white shadow-md"
            : "text-slate-600 hover:text-slate-900"
        }`}
        title="Vue compacte"
      >
        <Menu className="w-4 h-4" />
        <span className="text-xs hidden sm:inline">Compact</span>
      </button>
    </div>
  );
}
