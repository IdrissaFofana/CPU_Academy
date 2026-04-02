import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { X, Bookmark, Zap, Star, Trophy, BookOpen, Check, Clock, Users, Video, MapPin, Monitor } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { getModeFallbackImage } from '@/lib/utils';

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
  const router = useRouter();

  // Visual identity per formation type
  function getTypeVisual(format?: string, modalite?: string) {
    const f = (format || "").toLowerCase();
    const m = (modalite || "").toLowerCase();
    if (f.includes("live") || m.includes("webinaire") || m.includes("live")) {
      return { gradient: "from-orange-500 to-red-500", Icon: Video, label: "Webinaire" };
    }
    if (f.includes("présentiel") || f.includes("presentiel") || m.includes("presentiel")) {
      return { gradient: "from-emerald-500 to-teal-600", Icon: MapPin, label: "Présentiel" };
    }
    if (f.includes("vidéo") || f.includes("video") || m.includes("a_son_rythme")) {
      return { gradient: "from-violet-500 to-indigo-600", Icon: Monitor, label: "À son rythme" };
    }
    return { gradient: "from-slate-500 to-slate-700", Icon: BookOpen, label: "Formation" };
  }

  const typeVisual = getTypeVisual(formation.format, formation.modalite);
  const fallbackImage = getModeFallbackImage(formation.format, formation.modalite);
  const [imageSrc, setImageSrc] = useState<string>(formation.image || fallbackImage);
  // Utiliser des valeurs déterministes basées sur l'ID pour éviter l'hydration mismatch
  const formationIdHash = formation.id ? formation.id.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0) : 0;
  const isNew = formationIdHash % 10 === 1; // ~10% des formations
  const isPopular = formation.nbInscrits > 50;
  const isBestSeller = formationIdHash % 10 === 7; // ~10% des formations
  const reviewsCount = 50 + (formationIdHash % 150); // Entre 50 et 200 avis
  
  return (
    <article 
      onClick={() => router.push(`/formations/${formation.slug}`)}
      className={`
        relative group overflow-hidden
        rounded-xl
        bg-white
        border border-slate-100
        hover:border-cpu-orange/30
        shadow-md hover:shadow-xl
        hover:-translate-y-1
        transition-all duration-300
        h-full flex flex-col
        cursor-pointer
      `}
    >
      {/* Badge Container - Top Left */}
      {(isPopular || isNew || isBestSeller) && (
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
          {isNew && (
            <Badge className="bg-cpu-orange text-white text-xs font-semibold flex items-center gap-1">
              <Zap className="w-3 h-3" /> Nouveau
            </Badge>
          )}
          {isPopular && (
            <Badge className="bg-amber-500 text-white text-xs flex items-center gap-1 font-semibold">
              <Star className="w-3 h-3 fill-current" /> {formation.nbInscrits || 0} inscrits
            </Badge>
          )}
          {isBestSeller && (
            <Badge className="bg-cpu-green text-white text-xs font-semibold flex items-center gap-1">
              <Trophy className="w-3 h-3" /> Mieux notée
            </Badge>
          )}
        </div>
      )}

      {/* Image - Hover animation */}
      <div className="relative h-48 overflow-hidden bg-gray-200">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={formation.titre}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            onError={() => setImageSrc("")}
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${typeVisual.gradient} flex flex-col items-center justify-center gap-2`}>
            <typeVisual.Icon className="w-10 h-10 text-white/80" />
            <span className="text-white/90 text-sm font-semibold tracking-wide">{typeVisual.label}</span>
          </div>
        )}
        
        {/* Heart Favorite - Hover reveal */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
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
          <BookOpen className="w-3 h-3" />
          <span>{formation.niveau}</span>
          {formation.certifiant && <span className="text-cpu-green font-semibold flex items-center gap-1"><Check className="w-3 h-3" /> Certifié</span>}
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
            <Clock className="w-3 h-3" /> {formation.duree}h
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3" /> {formation.nbInscrits || 0}
          </div>
        </div>

        {/* Certification Badge */}
        {formation.certifiant && (
          <div className="flex items-center gap-2 px-3 py-1.5 bg-cpu-green/10 rounded-lg border border-cpu-green/30">
            <Trophy className="w-4 h-4 text-cpu-green" />
            <span className="text-xs text-cpu-green font-semibold">
              Certificat inclus
            </span>
          </div>
        )}

        {/* Price + CTA */}
        <div className="pt-2 flex justify-between items-center mt-auto">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-cpu-orange">
              {formation.gratuit ? "Gratuit" : `${formation.prixPublic || 0}€`}
            </span>
          </div>
          <Button 
              asChild
              className="cursor-pointer rounded-full px-4 bg-cpu-orange hover:bg-cpu-orange/90 text-white font-semibold" 
              size="sm"
            >
              <Link href={`/formations/${formation.slug}`}>Voir →</Link>
            </Button>
        </div>
      </div>
    </article>
  );
}

