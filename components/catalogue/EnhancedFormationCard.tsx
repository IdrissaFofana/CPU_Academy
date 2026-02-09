import React from 'react';
import { X, Bookmark } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface EnhancedFormationCardProps {
  formation: any;
  isFavorite?: boolean;
  onFavoriteToggle?: (id: string) => void;
}

export function EnhancedFormationCard({ 
  formation, 
  isFavorite = false, 
  onFavoriteToggle 
}: EnhancedFormationCardProps) {
  // Utiliser des valeurs déterministes basées sur l'ID pour éviter l'hydration mismatch
  const formationIdHash = formation.id ? formation.id.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0) : 0;
  const isNew = formationIdHash % 10 === 1; // ~10% des formations
  const isPopular = formation.nbInscrits > 50;
  const isBestSeller = formationIdHash % 10 === 7; // ~10% des formations
  const reviewsCount = 50 + (formationIdHash % 150); // Entre 50 et 200 avis
  
  return (
    <article 
      className={`
        relative group overflow-hidden
        rounded-xl
        bg-white
        border border-slate-100
        hover:border-cpu-orange/30
        hover:shadow-2xl hover:shadow-cpu-orange/10
        shadow-md
        transition-all duration-300
        hover:-translate-y-1
        h-full flex flex-col
      `}
    >
      {/* Badge Container - Top Left */}
      {(isPopular || isNew || isBestSeller) && (
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
          {isNew && (
            <Badge className="bg-cpu-orange text-white text-xs font-semibold">
              🆕 Nouveau
            </Badge>
          )}
          {isPopular && (
            <Badge className="bg-amber-500 text-white text-xs flex items-center gap-1 font-semibold">
              🔥 {formation.nbInscrits || 0} inscrits
            </Badge>
          )}
          {isBestSeller && (
            <Badge className="bg-cpu-green text-white text-xs font-semibold">
              ⭐ Mieux notée
            </Badge>
          )}
        </div>
      )}

      {/* Image - Hover animation */}
      <div className="relative h-48 overflow-hidden bg-gray-200">
        {formation.image ? (
          <Image
            src={formation.image}
            alt={formation.titre}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-cpu-orange/20 to-cpu-green/20 flex items-center justify-center">
            <span className="text-gray-400">Pas d'image</span>
          </div>
        )}
        
        {/* Heart Favorite - Hover reveal */}
        <button
          onClick={(e) => {
            e.preventDefault();
            onFavoriteToggle?.(formation.id);
          }}
          className="absolute top-3 right-3 p-2 bg-white/90 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-cpu-orange/10"
          aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
        >
          <Bookmark 
            size={20} 
            className={isFavorite ? "fill-cpu-orange text-cpu-orange" : "text-gray-400"} 
          />
        </button>
      </div>

      {/* Content - Visual hierarchy */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        {/* Provider + Verification */}
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>📚 {formation.niveau}</span>
          {formation.certifiant && <span className="text-cpu-green font-semibold">✓ Certifié</span>}
        </div>

        {/* Title - Prominent */}
        <h3 className="font-bold text-lg line-clamp-2 hover:text-cpu-orange transition-colors">
          {formation.titre}
        </h3>

        {/* Rating + Social Proof */}
        <div className="flex items-center gap-2">
          <div className="flex gap-0.5">
            {Array(5).fill(0).map((_, i) => (
              <span key={i} className={i < Math.floor(formation.notesMoyenne || 0) ? "text-amber-500 text-lg" : "text-gray-300 text-lg"}>
                ★
              </span>
            ))}
          </div>
          <span className="text-sm font-semibold text-gray-900">
            {(formation.notesMoyenne || 0).toFixed(1)}
          </span>
          <span className="text-xs text-gray-500">
            ({reviewsCount} avis)
          </span>
        </div>

        {/* Meta Info Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
          <div className="flex items-center gap-1">
            <span>⏱️ {formation.duree}h</span>
          </div>
          <div className="flex items-center gap-1">
            <span>👥 {formation.nbInscrits || 0}</span>
          </div>
        </div>

        {/* Price + CTA */}
        <div className="pt-2 flex justify-between items-center mt-auto">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-cpu-orange">
              {formation.gratuit ? "Gratuit" : `${formation.prixPublic || 0}€`}
            </span>
          </div>
          <Button 
            className="cursor-pointer rounded-full px-4 bg-cpu-orange hover:bg-cpu-orange/90 text-white font-semibold" 
            size="sm"
          >
            Voir →
          </Button>
        </div>

        {/* Certification Badge */}
        {formation.certifiant && (
          <div className="mt-2 flex items-center gap-2 px-3 py-1.5 bg-cpu-green/10 rounded-lg border border-cpu-green/30">
            <span className="text-lg">🏆</span>
            <span className="text-xs text-cpu-green font-semibold">
              Certificat inclus
            </span>
          </div>
        )}
      </div>
    </article>
  );
}
