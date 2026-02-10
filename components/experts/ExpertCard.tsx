"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  MapPin, 
  Clock, 
  BookOpen, 
  Star, 
  Heart, 
  Mail, 
  Linkedin, 
  Award,
  Users,
  TrendingUp,
  Calendar,
  Languages
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface ExpertCardProps {
  expert: {
    id: number;
    nom: string;
    specialite: string;
    photo: string;
    experience: string;
    formations: number;
    studentsCount?: number;
    rating: number;
    reviewsCount?: number;
    certifications: string[];
    domaines: string[];
    localisation: string;
    disponible: boolean;
    bio?: string;
    tarif?: string;
    langues?: string[];
    prochaineDispo?: string;
    isTop?: boolean;
    isNew?: boolean;
  };
  variant?: "grid" | "list" | "compact";
  onToggleFavorite?: (id: number) => void;
  isFavorite?: boolean;
}

export function ExpertCard({ 
  expert, 
  variant = "grid",
  onToggleFavorite,
  isFavorite = false
}: ExpertCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  if (variant === "compact") {
    return (
      <Card className="group hover:shadow-lg transition-all duration-300 p-4">
        <Link href={`/experts/${expert.id}`} className="block">
          <div className="flex items-center gap-3 mb-3">
            <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src={expert.photo}
                alt={expert.nom}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm truncate">{expert.nom}</h3>
              <p className="text-xs text-gray-600 truncate">{expert.specialite}</p>
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                onToggleFavorite?.(expert.id);
              }}
              className="flex-shrink-0"
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
            </button>
          </div>
          <div className="flex items-center justify-between text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
              <span className="font-semibold">{expert.rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="w-3 h-3" />
              <span>{expert.formations}</span>
            </div>
            <Badge variant={expert.disponible ? "default" : "secondary"} className="text-xs">
              {expert.disponible ? "Dispo" : "Occupé"}
            </Badge>
          </div>
        </Link>
      </Card>
    );
  }

  if (variant === "list") {
    return (
      <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Photo */}
          <div className="relative md:w-64 h-48 md:h-auto flex-shrink-0">
            <Image
              src={expert.photo}
              alt={expert.nom}
              fill
              className="object-cover"
            />
            {(expert.isTop || expert.isNew) && (
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {expert.isTop && (
                  <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0">
                    <Award className="w-3 h-3 mr-1" />
                    Top Formateur
                  </Badge>
                )}
                {expert.isNew && (
                  <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0">
                    Nouveau
                  </Badge>
                )}
              </div>
            )}
            <button
              onClick={() => onToggleFavorite?.(expert.id)}
              className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-transform"
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
            </button>
            {expert.disponible && (
              <Badge className="absolute bottom-4 left-4 bg-green-500 text-white border-0 animate-pulse">
                Disponible
              </Badge>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 p-6">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <Link href={`/experts/${expert.id}`}>
                  <h3 className="text-2xl font-bold text-gray-900 hover:text-cpu-orange transition-colors">
                    {expert.nom}
                  </h3>
                </Link>
                <p className="text-cpu-orange font-medium mb-2">{expert.specialite}</p>
                {expert.bio && (
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{expert.bio}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <div>
                  <div className="font-semibold text-gray-900">{expert.rating}/5</div>
                  <div className="text-xs text-gray-500">{expert.reviewsCount || 0} avis</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-500" />
                <div>
                  <div className="font-semibold text-gray-900">{expert.formations}</div>
                  <div className="text-xs text-gray-500">Formations</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-purple-500" />
                <div>
                  <div className="font-semibold text-gray-900">{expert.experience}</div>
                  <div className="text-xs text-gray-500">Expérience</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-green-500" />
                <div>
                  <div className="font-semibold text-gray-900">{expert.studentsCount || 0}+</div>
                  <div className="text-xs text-gray-500">Étudiants</div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs font-semibold text-gray-700 mb-2">Certifications</p>
                <div className="flex flex-wrap gap-1">
                  {expert.certifications.slice(0, 3).map((cert, i) => (
                    <Badge key={i} variant="outline" className="text-xs bg-blue-50 border-blue-200">
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-700 mb-2">Domaines d'expertise</p>
                <div className="flex flex-wrap gap-1">
                  {expert.domaines.slice(0, 3).map((dom, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {dom}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{expert.localisation}</span>
                </div>
                {expert.tarif && (
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    <span className="font-semibold text-cpu-orange">{expert.tarif}</span>
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/catalogue?expert=${expert.id}`}>
                    <BookOpen className="w-4 h-4 mr-1" />
                    Formations
                  </Link>
                </Button>
                <Button size="sm" className="bg-cpu-orange hover:bg-cpu-orange/90" asChild>
                  <Link href={`/experts/${expert.id}#contact`}>
                    <Mail className="w-4 h-4 mr-1" />
                    Contacter
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  // Grid variant (default)
  return (
    <Card 
      className="group hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Photo */}
      <div className="relative h-56">
        <Image
          src={expert.photo}
          alt={expert.nom}
          fill
          className={`object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {expert.isTop && (
            <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 shadow-lg">
              <Award className="w-3 h-3 mr-1" />
              Top
            </Badge>
          )}
          {expert.isNew && (
            <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0 shadow-lg">
              Nouveau
            </Badge>
          )}
        </div>

        {/* Favorite button */}
        <button
          onClick={() => onToggleFavorite?.(expert.id)}
          className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
        >
          <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
        </button>

        {/* Status */}
        {expert.disponible && (
          <Badge className="absolute bottom-4 left-4 bg-green-500 text-white border-0 shadow-lg animate-pulse">
            Disponible maintenant
          </Badge>
        )}

        {/* Rating overlay */}
        <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1 flex items-center gap-1 shadow-lg">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          <span className="font-bold text-gray-900">{expert.rating}</span>
          <span className="text-xs text-gray-600">({expert.reviewsCount || 0})</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-grow flex flex-col">
        <Link href={`/experts/${expert.id}`}>
          <h3 className="text-xl font-bold text-gray-900 mb-1 hover:text-cpu-orange transition-colors">
            {expert.nom}
          </h3>
        </Link>
        <p className="text-cpu-orange font-medium text-sm mb-3">{expert.specialite}</p>

        {expert.bio && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{expert.bio}</p>
        )}

        <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-500" />
            <span className="text-gray-700">{expert.experience}</span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-gray-500" />
            <span className="text-gray-700">{expert.formations} cours</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-gray-500" />
            <span className="text-gray-700">{expert.studentsCount || 0}+ élèves</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span className="text-gray-700 truncate">{expert.localisation.split(',')[1] || expert.localisation}</span>
          </div>
        </div>

        {/* Certifications */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-700 mb-2">Certifications</p>
          <div className="flex flex-wrap gap-2">
            {expert.certifications.slice(0, 2).map((cert, i) => (
              <Badge key={i} variant="outline" className="text-xs bg-blue-50 border-blue-200">
                {cert}
              </Badge>
            ))}
            {expert.certifications.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{expert.certifications.length - 2}
              </Badge>
            )}
          </div>
        </div>

        {/* Domaines */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-700 mb-2">Expertise</p>
          <div className="flex flex-wrap gap-2">
            {expert.domaines.slice(0, 3).map((dom, i) => (
              <span key={i} className="px-2 py-1 rounded-md bg-gray-50 text-xs text-gray-700 border border-gray-200">
                {dom}
              </span>
            ))}
          </div>
        </div>

        {expert.tarif && (
          <div className="mb-4 flex items-center justify-between bg-orange-50 rounded-lg px-3 py-2">
            <span className="text-xs text-gray-600">Tarif indicatif</span>
            <span className="font-bold text-cpu-orange">{expert.tarif}</span>
          </div>
        )}

        {/* Actions */}
        <div className="mt-auto pt-4 border-t border-gray-100 flex gap-2">
          <Button variant="outline" size="sm" className="flex-1" asChild>
            <Link href={`/catalogue?expert=${expert.id}`}>
              <BookOpen className="w-4 h-4 mr-1" />
              Formations
            </Link>
          </Button>
          <Button size="sm" className="flex-1 bg-cpu-orange hover:bg-cpu-orange/90" asChild>
            <Link href={`/experts/${expert.id}#contact`}>
              <Mail className="w-4 h-4 mr-1" />
              Contacter
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}
