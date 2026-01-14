"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FormationModal } from "./FormationModal";
import type { Formation } from "@/types";
import { Clock, MapPin, Users, Star } from "lucide-react";

interface FormationCardProps {
  formation: Formation;
  variant?: "default" | "compact";
}

export function FormationCard({ formation, variant = "default" }: FormationCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const getModaliteBadgeColor = (modalite?: string) => {
    switch (modalite) {
      case "Hybride":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "En ligne":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Présentiel":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getSecteurBadgeColor = (secteur?: string) => {
    if (secteur?.includes("Tertiaire")) return "bg-orange-100 text-orange-600";
    if (secteur?.includes("Quaternaire")) return "bg-orange-100 text-orange-600";
    if (secteur?.includes("Primaire")) return "bg-green-100 text-green-600";
    if (secteur?.includes("Secondaire")) return "bg-blue-100 text-blue-600";
    return "bg-gray-100 text-gray-600";
  };

  const getNiveauBadgeColor = (niveau?: string) => {
    switch (niveau) {
      case "Débutant":
        return "bg-green-500 text-white";
      case "Intermédiaire":
        return "bg-orange-500 text-white";
      case "Avancé":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden animate-slide-up">
      {/* Image de la formation */}
      <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        {formation.image ? (
          <img 
            src={formation.image} 
            alt={formation.titre}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-cpu-orange/10 to-cpu-green/10">
            <span className="text-4xl text-gray-400">📚</span>
          </div>
        )}
        
        {/* Badge modalité en haut à gauche */}
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1 rounded-md text-xs font-medium border ${getModaliteBadgeColor(formation.modalite)}`}>
            {formation.modalite || "Hybride"}
          </span>
        </div>

        {/* Badge certifiant en haut à droite */}
        {formation.badges?.includes("Certifiant") && (
          <div className="absolute top-3 right-3">
            <span className="px-3 py-1 rounded-md text-xs font-medium bg-green-500 text-white border border-green-600">
              Certifiant
            </span>
          </div>
        )}
      </div>

      <CardHeader className="pb-3">
        {/* Badges secteur et niveau */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className={`px-2.5 py-1 rounded text-xs font-medium ${getSecteurBadgeColor(formation.secteur)}`}>
            {formation.secteur || "Secteur Tertiaire"}
          </span>
          <span className={`px-2.5 py-1 rounded text-xs font-medium ${getNiveauBadgeColor(formation.niveau)}`}>
            {formation.niveau || "Intermédiaire"}
          </span>
        </div>

        {/* Titre */}
        <CardTitle className="text-base font-bold line-clamp-2 mb-2 min-h-[2.5rem]">
          {formation.titre}
        </CardTitle>

        {/* Description courte */}
        <CardDescription className="text-xs text-gray-600 line-clamp-2 min-h-[2.5rem] mb-3">
          {formation.description || "Maîtrisez les fondamentaux de la gestion d'entreprise adaptés aux PME ivoiriennes."}
        </CardDescription>

        {/* Métadonnées */}
        <div className="flex items-center gap-4 text-xs text-gray-600 pb-3 border-b border-gray-200">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {formation.duree} semaines
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {formation.region || "Abidjan"}
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" />
            {formation.nbInscrits || 245}
          </span>
        </div>

        {/* Note */}
        {formation.notesMoyenne && (
          <div className="flex items-center gap-1 mt-2">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-semibold">{formation.notesMoyenne}</span>
          </div>
        )}
      </CardHeader>

      <CardContent className="pt-0">
        {/* Prix et CTA */}
        <div className="flex items-center justify-between mb-3">
          <div>
            {formation.gratuit ? (
              <span className="text-lg font-bold text-green-600">Gratuit</span>
            ) : (
              <span className="text-lg font-bold text-gray-900">
                {(formation.prixMembre || formation.prixPublic || 350000)?.toLocaleString()} FCFA
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <a href={`/inscription?formation=${formation.id}`} className="w-full">
            <Button 
              className="cursor-pointer w-full bg-gradient-to-r from-cpu-orange to-cpu-orange/90 hover:from-cpu-orange/90 hover:to-cpu-orange text-white font-bold rounded-md shadow-lg hover:shadow-xl transition-all duration-200" 
            >
              S'inscrire maintenant
            </Button>
          </a>
          <Button 
            className="cursor-pointer w-full border-2 border-cpu-orange text-cpu-orange hover:bg-cpu-orange hover:text-white font-semibold rounded-md shadow-sm hover:shadow-lg transition-all duration-200" 
            onClick={() => setIsModalOpen(true)}
            variant="outline"
          >
            Voir le détail
          </Button>
        </div>
      </CardContent>

      <FormationModal 
        formation={formation}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </Card>
  );
}
